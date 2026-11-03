#!/usr/bin/env python3
"""
BRAN Org - CRONA Audit & DOI Integrity Engine
Motor de auditoria de dados, validação de esquemas e checagem de integridade de DOIs para o bot CRONA.
Suporta execução em PRs (triagem em 3 níveis: Erro Fatal, Inline Review, Auto-Approve) e auditoria periódica.
"""

import os
import sys
import json
import re
import time
import hashlib
import argparse
import urllib.request
import urllib.error
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

USER_AGENT = "BRAN-CronaBot/1.0 (+https://github.com/BRAN-Org; mailto:curation@bran.org)"
DOI_REGEX = re.compile(r"(10\.\d{4,9}/[-._;()/:,A-Za-z0-9]+)")
STICKY_MARKER = "<!-- id: crona-integrity-report -->"


def calculate_sha256(filepath):
    """Calcula hash criptográfico SHA-256 do arquivo."""
    sha = hashlib.sha256()
    with open(filepath, "rb") as f:
        while chunk := f.read(65536):
            sha.update(chunk)
    return sha.hexdigest()


def extract_clean_doi(raw_doi):
    """Extrai e normaliza o identificador DOI."""
    if not raw_doi or not isinstance(raw_doi, str):
        return None
    raw_doi = raw_doi.strip()
    match = DOI_REGEX.search(raw_doi)
    if match:
        return match.group(1).rstrip(".")
    return None


class HeadRequest(urllib.request.Request):
    def get_method(self):
        return "HEAD"


def resolve_doi(raw_doi, timeout=12, max_retries=2):
    """
    Testa se um DOI resolve na DOI Foundation (https://doi.org/<doi>)
    ou na API da CrossRef.
    """
    if not raw_doi or not isinstance(raw_doi, str) or raw_doi.strip().upper() in ("", "N/A", "NONE", "NULL"):
        return {
            "doi": raw_doi,
            "clean_doi": None,
            "status": "NO_DOI",
            "http_code": None,
            "target_url": None,
            "error": "Sem DOI na fonte original"
        }

    clean_doi = extract_clean_doi(raw_doi)
    if not clean_doi:
        return {
            "doi": raw_doi,
            "clean_doi": None,
            "status": "INVALID_FORMAT",
            "http_code": None,
            "target_url": None,
            "error": f"Sintaxe de DOI inválida ('{raw_doi}' não segue o padrão 10.xxxx/...)"
        }

    doi_url = f"https://doi.org/{clean_doi}"
    headers = {
        "User-Agent": USER_AGENT,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
    }

    for attempt in range(max_retries + 1):
        try:
            req = HeadRequest(doi_url, headers=headers)
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                status = resp.status
                target_url = resp.geturl()
                return {
                    "doi": raw_doi,
                    "clean_doi": clean_doi,
                    "status": "VALID" if status < 400 else "ERROR",
                    "http_code": status,
                    "target_url": target_url,
                    "error": None
                }
        except urllib.error.HTTPError as e:
            if e.code in (403, 405):
                try:
                    req_get = urllib.request.Request(doi_url, headers=headers)
                    with urllib.request.urlopen(req_get, timeout=timeout) as resp:
                        return {
                            "doi": raw_doi,
                            "clean_doi": clean_doi,
                            "status": "VALID",
                            "http_code": resp.status,
                            "target_url": resp.geturl(),
                            "error": None
                        }
                except urllib.error.HTTPError as e_get:
                    e = e_get
                except Exception as ex_get:
                    return {
                        "doi": raw_doi,
                        "clean_doi": clean_doi,
                        "status": "CONNECTION_FAILED",
                        "http_code": None,
                        "target_url": None,
                        "error": str(ex_get)
                    }

            if e.code == 404:
                try:
                    cr_url = f"https://api.crossref.org/works/{clean_doi}"
                    cr_req = urllib.request.Request(cr_url, headers={"User-Agent": USER_AGENT})
                    with urllib.request.urlopen(cr_req, timeout=timeout) as cr_resp:
                        if cr_resp.status == 200:
                            return {
                                "doi": raw_doi,
                                "clean_doi": clean_doi,
                                "status": "VALID",
                                "http_code": 200,
                                "target_url": cr_url,
                                "error": "Registrado na CrossRef (fallback)"
                            }
                except Exception:
                    pass

                return {
                    "doi": raw_doi,
                    "clean_doi": clean_doi,
                    "status": "BROKEN_404",
                    "http_code": 404,
                    "target_url": None,
                    "error": "404 Not Found: DOI não registrado ou inativo"
                }

            if e.code == 429:
                time.sleep(1.5 * (attempt + 1))
                continue

            return {
                "doi": raw_doi,
                "clean_doi": clean_doi,
                "status": "HTTP_ERROR",
                "http_code": e.code,
                "target_url": None,
                "error": f"HTTP {e.code}: {e.reason}"
            }
        except urllib.error.URLError as e:
            if attempt < max_retries:
                time.sleep(1.0)
                continue
            return {
                "doi": raw_doi,
                "clean_doi": clean_doi,
                "status": "CONNECTION_FAILED",
                "http_code": None,
                "target_url": None,
                "error": f"Falha de rede/DNS: {e.reason}"
            }
        except Exception as e:
            return {
                "doi": raw_doi,
                "clean_doi": clean_doi,
                "status": "ERROR",
                "http_code": None,
                "target_url": None,
                "error": str(e)
            }

    return {
        "doi": raw_doi,
        "clean_doi": clean_doi,
        "status": "TIMEOUT",
        "http_code": None,
        "target_url": None,
        "error": "Timeout após tentativas de resolução"
    }


def find_property_line(item_idx, prop_name, raw_lines):
    """Localiza a linha exata de uma propriedade dentro do arquivo JSON."""
    obj_starts = [i for i, l in enumerate(raw_lines, 1) if l.strip() == '{' or l.strip().startswith('{"')]
    if item_idx < len(obj_starts):
        start_line = obj_starts[item_idx]
        end_line = obj_starts[item_idx + 1] if item_idx + 1 < len(obj_starts) else len(raw_lines)
        if prop_name:
            for line_num in range(start_line, end_line):
                if f'"{prop_name}":' in raw_lines[line_num - 1]:
                    return line_num
        return start_line
    return 1


def validate_json_schema_detailed(data, schema_path, raw_lines=None, rel_path=""):
    """
    Valida dataset com jsonschema e gera lista de erros com linha exata
    para postagem como inline comments de Code Review no PR.
    """
    if not os.path.exists(schema_path):
        return True, [], "Arquivo de schema não encontrado localmente."

    try:
        import jsonschema
    except ImportError:
        return True, [], "jsonschema não instalado (validação pulada)."

    try:
        with open(schema_path, "r", encoding="utf-8") as sf:
            schema = json.load(sf)

        validator = jsonschema.Draft202012Validator(schema)
        errors = list(validator.iter_errors(data))

        if not errors:
            return True, [], "Em estrita conformidade com o schema JSON."

        inline_comments = []
        for err in errors[:20]: # limita a 20 para não sobrecarregar
            path_parts = list(err.path)
            item_idx = path_parts[0] if path_parts and isinstance(path_parts[0], int) else 0
            prop_name = path_parts[1] if len(path_parts) > 1 and isinstance(path_parts[1], str) else None
            
            line_no = find_property_line(item_idx, prop_name, raw_lines) if raw_lines else 1
            path_str = " -> ".join([str(p) for p in path_parts]) or "item"
            
            inline_comments.append({
                "path": rel_path,
                "line": line_no,
                "body": f"Inconsistência no campo `{path_str}`: {err.message}"
            })

        summary_msg = f"{len(errors)} inconsistência(s) de schema encontrada(s)."
        return False, inline_comments, summary_msg

    except Exception as e:
        return False, [], f"Erro no validador de schema: {e}"


def classify_identifier(record: dict) -> str:
    """
    Classifica a tipologia do identificador de um registro acadêmico conforme a Taxonomia BRAN:
    - DOI: Digital Object Identifier formal (10.xxxx/...)
    - OJS_INTERNAL_ID: ID numérico de submissão do Open Journal/Conference Systems (ex: '51')
    - HANDLE_SYSTEM: Handle persistente CNRI / DSpace (hdl: ou hdl.handle.net)
    - CANONICAL_SLUG: Slug estruturado determinístico do acervo (ex: 'dgz-v00-n00-a01')
    - CONTENT_HASH: Hash de conteúdo criptográfico (SHA-256 / MD5)
    - UUID_IDENTIFIER: UUIDv4 / UUIDv5
    - PERMALINK_URI: URL de página ou PDF quando ausente outro código
    - ORPHAN_UNIDENTIFIED: Sem identificador algum (violação estrutural de proveniência)
    """
    raw_doi = record.get("doi")
    if raw_doi and isinstance(raw_doi, str) and raw_doi.strip() and raw_doi.strip().upper() not in ("N/A", "NONE", "NULL"):
        return "DOI"

    raw_id = record.get("id")
    if raw_id is not None:
        raw_id_str = str(raw_id).strip()
        if raw_id_str and raw_id_str.upper() not in ("N/A", "NONE", "NULL"):
            if raw_id_str.isdigit():
                return "OJS_INTERNAL_ID"
            if "hdl.handle.net" in raw_id_str or raw_id_str.lower().startswith("hdl:"):
                return "HANDLE_SYSTEM"
            if re.match(r"^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$", raw_id_str):
                return "UUID_IDENTIFIER"
            if raw_id_str.lower().startswith("sha256:") or (len(raw_id_str) == 64 and all(c in "0123456789abcdefABCDEF" for c in raw_id_str)):
                return "CONTENT_HASH"
            return "CANONICAL_SLUG"

    if record.get("url") or record.get("pdf_url"):
        return "PERMALINK_URI"

    return "ORPHAN_UNIDENTIFIED"


def audit_dataset_dois(records, max_workers=6, sample_limit=None):
    """
    Testa e audita a integridade e identificadores do dataset acadêmico.
    Classifica cada registro segundo a Taxonomia de Identificadores da BRAN Org:
    - DOIs (resolução em rede na DOI Foundation / CrossRef)
    - Identificadores Nativos OJS/PKP
    - Slugs Canônicos de Acervo Histórico
    - Handles (DSpace / CNRI)
    - Permalinks / URIs
    - Registros Órfãos (sem identificador)
    """
    total_records = len(records)
    id_counts = {
        "DOI_RESOLVED": 0,
        "DOI_UNRESOLVED": 0,
        "OJS_INTERNAL_ID": 0,
        "CANONICAL_SLUG": 0,
        "HANDLE_SYSTEM": 0,
        "UUID_IDENTIFIER": 0,
        "CONTENT_HASH": 0,
        "PERMALINK_URI": 0,
        "ORPHAN_UNIDENTIFIED": 0,
    }

    records_with_doi = []
    for r in records:
        cat = classify_identifier(r)
        if cat == "DOI":
            records_with_doi.append(r)
        else:
            id_counts[cat] = id_counts.get(cat, 0) + 1

    total_with_doi = len(records_with_doi)

    if sample_limit and sample_limit < total_with_doi:
        records_to_check = records_with_doi[:sample_limit]
    else:
        records_to_check = records_with_doi

    total_checked = len(records_to_check)
    valid_count = 0
    broken_count = 0
    invalid_format_count = 0
    results = []

    if total_checked > 0:
        print(f"🔬 CRONA: Iniciando checagem de {total_checked} DOIs ativos (de {total_with_doi} registros com DOI, concorrência={max_workers})...")
        with ThreadPoolExecutor(max_workers=max_workers) as executor:
            future_to_record = {
                executor.submit(resolve_doi, rec.get("doi")): rec
                for rec in records_to_check
            }

            for future in as_completed(future_to_record):
                rec = future_to_record[future]
                try:
                    res = future.result()
                except Exception as exc:
                    res = {
                        "doi": rec.get("doi"),
                        "clean_doi": None,
                        "status": "EXCEPTION",
                        "http_code": None,
                        "target_url": None,
                        "error": str(exc)
                    }

                res["title"] = rec.get("title", "Sem título")
                res["year"] = rec.get("year") or rec.get("publication_year")
                res["url"] = rec.get("url")
                res["pdf_url"] = rec.get("pdf_url")
                results.append(res)

                if res["status"] == "VALID":
                    valid_count += 1
                elif res["status"] == "INVALID_FORMAT":
                    invalid_format_count += 1
                    broken_count += 1
                else:
                    broken_count += 1
    else:
        non_doi_identified = total_records - id_counts["ORPHAN_UNIDENTIFIED"]
        print(f"ℹ️  CRONA: Nenhum registro com DOI para checagem de rede ({non_doi_identified} registros identificados via OJS ID, Slugs ou Permalinks).")

    id_counts["DOI_RESOLVED"] = valid_count
    id_counts["DOI_UNRESOLVED"] = broken_count

    if total_checked > 0:
        resolution_rate = round(valid_count / total_checked, 4)
    else:
        resolution_rate = 1.0

    orphan_count = id_counts["ORPHAN_UNIDENTIFIED"]
    identified_count = total_records - orphan_count
    global_id_rate = round(identified_count / total_records, 4) if total_records > 0 else 1.0

    broken_items = [r for r in results if r["status"] not in ("VALID", "NO_DOI")]

    return {
        "total_records": total_records,
        "identified_count": identified_count,
        "global_id_rate": global_id_rate,
        "orphan_count": orphan_count,
        "id_counts": id_counts,
        "total_with_doi": total_with_doi,
        "total_checked": total_checked,
        "valid_count": valid_count,
        "broken_count": broken_count,
        "invalid_format_count": invalid_format_count,
        "resolution_rate": resolution_rate,
        "broken_items": broken_items,
        "results": results
    }


def generate_pr_markdown_report(schema_status, doi_summary, file_path):
    """Gera o relatório formatado em Markdown com marcador sticky para o bot CRONA."""
    schema_valid = schema_status["valid"]
    dois_clean = doi_summary["broken_count"] == 0
    orphans_clean = doi_summary["orphan_count"] == 0
    total_records = doi_summary["total_records"]
    identified_count = doi_summary["identified_count"]
    global_id_rate = doi_summary["global_id_rate"]
    total_with_doi = doi_summary["total_with_doi"]
    id_counts = doi_summary["id_counts"]

    if schema_valid and dois_clean and orphans_clean:
        badge = "🟢 **Aprovado (100% íntegro — tudo pronto pro merge)**"
        voice_quote = "Dei uma olhada nos dados e na linha temporal... tudo em ordem e sem anomalias. Tudo pronto pro merge."
    elif schema_valid and (not dois_clean or not orphans_clean):
        if not orphans_clean:
            badge = "🟡 **Aprovado com ressalvas (artigos sem identificador detectados)**"
            voice_quote = "O schema tá válido, mas encontrei registros sem identificador único... precisamos ajustar pra não perder a rastreabilidade."
        else:
            badge = "🟡 **Aprovado com ressalvas (links inativos na fonte original)**"
            voice_quote = "O schema tá íntegro, mas encontrei alguns links inativos na fonte original... listei abaixo para conferência."
    else:
        badge = "🔴 **Ajustes necessários (inconsistências de schema)**"
        voice_quote = "Detectei anomalias no schema nas linhas marcadas... dá uma olhada nos comentários inline pra gente ajustar."

    if total_with_doi > 0:
        res_rate_str = f"`{doi_summary['resolution_rate'] * 100:.1f}%` ({doi_summary['valid_count']}/{doi_summary['total_checked']})"
    else:
        res_rate_str = "`N/A` *(Acervo sem emissão de DOIs globais)*"

    lines = [
        STICKY_MARKER,
        "### Integridade e Validação do Acervo\n",
        f"> *\"{voice_quote}\"*\n",
        f"**Arquivo auditado:** `{file_path}`  ",
        f"**Status da revisão:** {badge}\n",
        "| Métrica de Auditoria | Status / Valor | Detalhes |",
        "| :--- | :--- | :--- |",
        f"| **Conformidade Estrutural (Schema JSON)** | {'✅ Válido' if schema_valid else '❌ Inconsistente'} | {schema_status.get('message', '')} |",
        f"| **Total de Artigos Catalogados** | `{total_records}` | Registros no dataset |",
        f"| **Taxa Global de Identificação** | `{global_id_rate * 100:.1f}%` | {identified_count}/{total_records} registros com ID persistente ou canônico |",
        f"| **Identificadores DOI (CrossRef / Datacite)** | `{total_with_doi}` | {doi_summary['valid_count']} ativos / {doi_summary['broken_count']} inativos na fonte |",
        f"| **Identificadores Nativos (OJS / PKP ID)** | `{id_counts.get('OJS_INTERNAL_ID', 0)}` | IDs de submissão do sistema de anais |",
        f"| **Identificadores de Acervo (Slugs)** | `{id_counts.get('CANONICAL_SLUG', 0)}` | Slugs estruturados determinísticos (`vXX-nXX-aXX`) |",
        f"| **Identificadores Handle (DSpace)** | `{id_counts.get('HANDLE_SYSTEM', 0)}` | Repositórios institucionais (CNRI Handle) |",
        f"| **Permalinks / URIs Canônicas** | `{id_counts.get('PERMALINK_URI', 0)}` | URLs diretas sem código atribuído |",
        f"| **Artigos Órfãos (Sem ID nem DOI)** | `{id_counts.get('ORPHAN_UNIDENTIFIED', 0)}` | {'Nenhum (100% rastreável)' if id_counts.get('ORPHAN_UNIDENTIFIED', 0) == 0 else '⚠️ Registros sem identificação'} |",
        f"| **Taxa de Resolução de DOIs Existentes** | {res_rate_str} | Baseado nos DOIs atribuídos |\n"
    ]

    if not schema_valid:
        lines.append("#### Inconsistências de Schema")
        lines.append(f"> {schema_status['message']}")
        lines.append("> *Comentários foram inseridos nas linhas correspondentes com detalhes do erro.*\n")

    if doi_summary["broken_items"]:
        lines.append("#### DOIs Não Resolvidos na Fonte (Informativo / Soft Fail)")
        lines.append("| Ano | DOI | Erro / Resposta HTTP | Título |")
        lines.append("| :--- | :--- | :--- | :--- |")
        for item in doi_summary["broken_items"][:25]:
            title_clean = (item.get("title") or "")[:55] + ("..." if len(item.get("title") or "") > 55 else "")
            lines.append(f"| {item.get('year') or '-'} | `{item.get('doi')}` | `{item.get('error') or item.get('status')}` | {title_clean} |")
        if len(doi_summary["broken_items"]) > 25:
            lines.append(f"\n*(Mostrando 25 de {len(doi_summary['broken_items'])} links mortos na fonte)*")
        lines.append("\n> **Nota:** Links mortos na fonte primária são documentados sem impedir o merge.")
    elif id_counts.get('ORPHAN_UNIDENTIFIED', 0) == 0 and total_with_doi == 0:
        lines.append(f"> **Nota de Preservação:** Este acervo utiliza identificadores canônicos determinísticos (`{identified_count}` registros identificados via OJS ID, Slugs de Acervo ou Handles). Os links diretos e textos completos foram preservados.")

    return "\n".join(lines)


def generate_fatal_error_report(file_path, err_msg):
    """Gera relatório quando o arquivo JSON nem sequer parseia (Nível 1)."""
    return f"""{STICKY_MARKER}
### Erro de Sintaxe JSON

> *"Erro crítico na leitura do arquivo... a sintaxe JSON está corrompida. Corrija a formatação para prosseguir com a auditoria."*

**Arquivo auditado:** `{file_path}`  
**Status:** ❌ **Arquivo corrompido ou mal formatado**

O parser JSON não conseguiu ler o arquivo:

```text
{err_msg}
```

#### Como corrigir:
1. Verifique se há vírgulas extras, aspas abertas ou chaves desbalanceadas.
2. Valide localmente com `python3 -m json.tool {file_path}` ou um linter JSON.
3. Suba um novo commit na branch para atualizar o PR.
"""


def update_provenance_file(provenance_path, doi_summary, raw_data_sha256=None):
    """Atualiza o provenance.json da base com os dados da auditoria realizada."""
    if not os.path.exists(provenance_path):
        print(f"⚠️ provenance.json não encontrado em {provenance_path}")
        return False

    with open(provenance_path, "r", encoding="utf-8") as f:
        prov = json.load(f)

    now_iso = datetime.now(timezone.utc).isoformat()
    prov["doi_resolution_rate"] = doi_summary["resolution_rate"]
    prov["global_identification_rate"] = doi_summary.get("global_id_rate", 1.0)
    prov["identifiers_breakdown"] = doi_summary.get("id_counts", {})
    prov["last_audit_at"] = now_iso

    if raw_data_sha256:
        prov["raw_data_sha256"] = raw_data_sha256

    if "audit_history" not in prov:
        prov["audit_history"] = []

    audit_entry = {
        "timestamp": now_iso,
        "auditor": "crona-bot[bot]",
        "total_records": doi_summary.get("total_records", 0),
        "total_checked": doi_summary["total_checked"],
        "valid_count": doi_summary["valid_count"],
        "broken_count": doi_summary["broken_count"],
        "resolution_rate": doi_summary["resolution_rate"],
        "global_identification_rate": doi_summary.get("global_id_rate", 1.0),
        "identifiers_breakdown": doi_summary.get("id_counts", {})
    }
    prov["audit_history"].append(audit_entry)

    if doi_summary["broken_count"] == 0 and doi_summary.get("orphan_count", 0) == 0:
        prov["health_level"] = "HIGH_FIDELITY"
    elif doi_summary["resolution_rate"] >= 0.8 and doi_summary.get("orphan_count", 0) == 0:
        prov["health_level"] = "YELLOW"
    else:
        prov["health_level"] = "ORANGE"

    with open(provenance_path, "w", encoding="utf-8") as f:
        json.dump(prov, f, indent=2, ensure_ascii=False)
        f.write("\n")

    print(f"✅ provenance.json atualizado. Nível: {prov['health_level']}")
    return True


def main():
    parser = argparse.ArgumentParser(description="CRONA Audit & DOI Engine")
    parser.add_argument("--file", nargs="*", help="Caminho do arquivo JSON de dataset (ex: data/ebbc_articles.json)")
    parser.add_argument("--provenance", help="Caminho do provenance.json")
    parser.add_argument("--schema", help="Caminho do schema JSON para validação")
    parser.add_argument("--sample", type=int, help="Número máximo de DOIs para testar")
    parser.add_argument("--concurrency", type=int, default=6, help="Concorrência de requisições")
    parser.add_argument("--output-json", help="Arquivo para salvar o resultado estruturado em JSON")
    parser.add_argument("--output-md", help="Arquivo para salvar o relatório em Markdown")
    parser.add_argument("--output-review", help="Arquivo JSON de revisão para o GitHub PR Review API")
    parser.add_argument("--update-provenance", action="store_true", help="Atualiza provenance.json")

    args = parser.parse_args()

    target_file = None
    if args.file:
        for f in args.file:
            if "_articles.json" in f:
                target_file = f
                break
        if not target_file:
            target_file = args.file[0]

    if not target_file or not os.path.exists(target_file):
        print(f"❌ Erro: Arquivo {target_file} inexistente.")
        sys.exit(1)

    args.file = target_file
    print(f"🚀 CRONA: Lendo dataset {args.file}...")
    try:
        with open(args.file, "r", encoding="utf-8") as f:
            raw_text = f.read()
            data = json.loads(raw_text)
            raw_lines = raw_text.splitlines()
    except json.JSONDecodeError as jde:
        # NÍVEL 1: ERRO FATAL DE SINTAXE
        err_msg = f"JSONDecodeError: {jde.msg} na linha {jde.lineno}, coluna {jde.colno}"
        print(f"🚨 ERRO FATAL: {err_msg}")
        fatal_md = generate_fatal_error_report(args.file, err_msg)
        
        if args.output_md:
            with open(args.output_md, "w", encoding="utf-8") as f:
                f.write(fatal_md)
        if args.output_review:
            review_payload = {
                "decision": "FATAL_ERROR",
                "event": "COMMENT",
                "summary": fatal_md,
                "comments": []
            }
            with open(args.output_review, "w", encoding="utf-8") as f:
                json.dump(review_payload, f, indent=2)

        summary_file = os.getenv("GITHUB_STEP_SUMMARY")
        if summary_file and os.path.exists(summary_file):
            with open(summary_file, "a", encoding="utf-8") as sf:
                sf.write(fatal_md + "\n")

        sys.exit(2)

    if not isinstance(data, list):
        data = [data]

    # NÍVEL 2: VALIDAÇÃO DE SCHEMA COM DETECÇÃO DE LINHA
    schema_status = {"valid": True, "message": "Nenhum schema informado."}
    inline_comments = []
    if args.schema:
        print(f"📐 CRONA: Validando contra {args.schema}...")
        valid, comments, msg = validate_json_schema_detailed(data, args.schema, raw_lines=raw_lines, rel_path=args.file)
        schema_status = {"valid": valid, "message": msg}
        inline_comments = comments
        if not valid:
            print(f"❌ {msg}")
        else:
            print(f"✅ {msg}")

    # RESOLUÇÃO DE DOIS (Soft Fail)
    doi_summary = audit_dataset_dois(data, max_workers=args.concurrency, sample_limit=args.sample)
    print(f"📊 Resumo: {doi_summary['valid_count']}/{doi_summary['total_checked']} DOIs ativos ({doi_summary['resolution_rate']*100:.1f}%)")

    # DECISÃO DO CODE REVIEW (NÍVEL 2 OU NÍVEL 3)
    if schema_status["valid"]:
        review_event = "APPROVE"  # NÍVEL 3: AUTO-APPROVE!
    else:
        review_event = "REQUEST_CHANGES"  # NÍVEL 2: RESSALVAS / BLOQUEIO ATÉ AJUSTE DE SCHEMA

    # RELATÓRIO MARKDOWN STICKY
    md_content = generate_pr_markdown_report(schema_status, doi_summary, args.file)

    if args.output_md:
        with open(args.output_md, "w", encoding="utf-8") as f:
            f.write(md_content)
        print(f"📝 Relatório Markdown salvo em {args.output_md}")

    # GITHUB STEP SUMMARY
    summary_file = os.getenv("GITHUB_STEP_SUMMARY")
    if summary_file and os.path.exists(summary_file):
        with open(summary_file, "a", encoding="utf-8") as sf:
            sf.write(md_content + "\n")

    # REVIEW PAYLOAD PARA A GITHUB API
    if args.output_review:
        review_payload = {
            "decision": review_event,
            "event": review_event,
            "summary": md_content,
            "comments": inline_comments
        }
        with open(args.output_review, "w", encoding="utf-8") as f:
            json.dump(review_payload, f, indent=2, ensure_ascii=False)
        print(f"Review Payload salvo em {args.output_review} (Decisão: {review_event})")

    # RELATÓRIO JSON GERAL
    if args.output_json:
        report_data = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "schema_status": schema_status,
            "doi_summary": doi_summary,
            "review_decision": review_event
        }
        with open(args.output_json, "w", encoding="utf-8") as f:
            json.dump(report_data, f, indent=2, ensure_ascii=False)

    # ATUALIZAÇÃO DO PROVENANCE
    if args.update_provenance and args.provenance:
        file_hash = calculate_sha256(args.file)
        update_provenance_file(args.provenance, doi_summary, raw_data_sha256=file_hash)

    # Exit code: 0 se schema passou, 1 se schema falhou
    sys.exit(0 if schema_status["valid"] else 1)


if __name__ == "__main__":
    main()
