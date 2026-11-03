#!/usr/bin/env python3
"""
BRAN Org - CRONA Bot: Zenodo Bundle Generator, Synchronizer & Cold Storage Manager.
Gera os bundles de dados abertos (CSV, BibTeX, RIS, SQLite FTS5, Datapackage) e sincroniza
com o Zenodo na publicação de Releases no padrão CalVer (vYYYY.MM).
Suporta também o upload local de Cold Storage (PDFs brutos).
"""

import os
import sys
import json
import csv
import re
import shutil
import sqlite3
import hashlib
import zipfile
import argparse
from datetime import datetime, timezone

ZENODO_API_URL = "https://zenodo.org/api"
CALVER_REGEX = re.compile(r"^v(20[2-9][0-9])\.(0[1-9]|1[0-2])(\.[0-9]+)?$")


def validate_calver(tag: str) -> bool:
    """Valida se a tag de release segue o padrão estrito CalVer da BRAN Org."""
    return bool(CALVER_REGEX.match(tag.strip()))


def escape_bibtex(val):
    if not val:
        return ""
    s = str(val)
    s = s.replace("\\", "\\\\").replace("{", "\\{").replace("}", "\\}")
    return s


def format_bibtex_authors(authors):
    if not authors:
        return ""
    if isinstance(authors, str):
        authors = [a.strip() for a in authors.split(";") if a.strip()]
    cleaned = []
    for a in authors:
        name = a.get("name", str(a)) if isinstance(a, dict) else str(a)
        cleaned.append(escape_bibtex(name.strip()))
    return " and ".join(cleaned)


def get_cite_key(item, index, prefix="bran"):
    author_key = prefix
    authors = item.get("authors")
    if authors:
        if isinstance(authors, list) and len(authors) > 0:
            first = authors[0].get("name", str(authors[0])) if isinstance(authors[0], dict) else str(authors[0])
            parts = str(first).strip().split()
            if parts:
                author_key = re.sub(r"[^a-zA-Z0-9]", "", parts[-1].lower()) or prefix
        elif isinstance(authors, str):
            parts = authors.strip().split()
            if parts:
                author_key = re.sub(r"[^a-zA-Z0-9]", "", parts[0].lower()) or prefix
    yr = str(item.get("year") or item.get("publication_year") or "nodate")
    raw_id = item.get("id") or item.get("doi") or f"rec_{index+1}"
    clean_id = re.sub(r"[^a-zA-Z0-9]", "", str(raw_id))
    if len(clean_id) > 20:
        clean_id = clean_id[-20:]
    return f"{author_key}_{yr}_{clean_id}"


def generate_bibtex_file(items, config, is_journal=False, default_venue="BRAN Academic Open Data"):
    lines = []
    venue = config.get("title", default_venue)

    for idx, item in enumerate(items):
        cite_key = get_cite_key(item, idx, prefix="bran")
        title = escape_bibtex(item.get("title") or "Sem título")
        authors = format_bibtex_authors(item.get("authors"))
        yr = str(item.get("year") or item.get("publication_year") or "")
        doi = item.get("doi") or ""
        clean_doi = re.sub(r"^https?://(dx\.)?doi\.org/", "", doi) if doi and doi != "N/A" else ""
        url = item.get("url") or item.get("pdf_url") or ""
        abstract = escape_bibtex(item.get("abstract") or "")
        
        keywords = item.get("keywords") or []
        if isinstance(keywords, list):
            kw_str = escape_bibtex(", ".join(str(k) for k in keywords if k))
        else:
            kw_str = escape_bibtex(str(keywords))

        if is_journal:
            lines.append(f"@article{{{cite_key},")
            lines.append(f"  title = {{{title}}},")
            if authors:
                lines.append(f"  author = {{{authors}}},")
            lines.append(f"  journal = {{{escape_bibtex(venue)}}},")
            if yr:
                lines.append(f"  year = {{{yr}}},")
            vol = item.get("volume")
            if vol:
                lines.append(f"  volume = {{{vol}}},")
            num = item.get("number") or item.get("issue")
            if num:
                lines.append(f"  number = {{{num}}},")
            if clean_doi:
                lines.append(f"  doi = {{{clean_doi}}},")
            if url:
                lines.append(f"  url = {{{url}}},")
            if abstract:
                lines.append(f"  abstract = {{{abstract}}},")
            if kw_str:
                lines.append(f"  keywords = {{{kw_str}}},")
            lines.append("}\n")
        else:
            booktitle = item.get("event_name") or item.get("issue") or venue
            lines.append(f"@inproceedings{{{cite_key},")
            lines.append(f"  title = {{{title}}},")
            if authors:
                lines.append(f"  author = {{{authors}}},")
            lines.append(f"  booktitle = {{{escape_bibtex(booktitle)}}},")
            if yr:
                lines.append(f"  year = {{{yr}}},")
            if clean_doi:
                lines.append(f"  doi = {{{clean_doi}}},")
            if url:
                lines.append(f"  url = {{{url}}},")
            if abstract:
                lines.append(f"  abstract = {{{abstract}}},")
            if kw_str:
                lines.append(f"  keywords = {{{kw_str}}},")
            lines.append("}\n")

    return "\n".join(lines)


def generate_ris_file(items, config, is_journal=False, default_venue="BRAN Academic Open Data"):
    lines = []
    venue = config.get("title", default_venue)

    for item in items:
        lines.append("TY  - JOUR" if is_journal else "TY  - CONF")
        title = item.get("title") or ""
        lines.append(f"TI  - {title}")

        authors = item.get("authors") or []
        if isinstance(authors, str):
            authors = [a.strip() for a in authors.split(";") if a.strip()]
        for a in authors:
            name = a.get("name", str(a)) if isinstance(a, dict) else str(a)
            if name.strip():
                lines.append(f"AU  - {name.strip()}")

        yr = str(item.get("year") or item.get("publication_year") or "")
        if yr:
            lines.append(f"PY  - {yr}")

        sec_title = item.get("event_name") or item.get("issue") or venue
        lines.append(f"T2  - {sec_title}")

        vol = item.get("volume")
        if vol:
            lines.append(f"VL  - {vol}")

        num = item.get("number") or item.get("issue")
        if num and is_journal:
            lines.append(f"IS  - {num}")

        doi = item.get("doi") or ""
        clean_doi = re.sub(r"^https?://(dx\.)?doi\.org/", "", doi) if doi and doi != "N/A" else ""
        if clean_doi:
            lines.append(f"DO  - {clean_doi}")

        url = item.get("url") or item.get("pdf_url") or ""
        if url:
            lines.append(f"UR  - {url}")

        abstract = item.get("abstract") or ""
        if abstract:
            lines.append(f"AB  - {abstract}")

        keywords = item.get("keywords") or []
        if isinstance(keywords, str):
            keywords = [k.strip() for k in keywords.split(";") if k.strip()]
        for kw in keywords:
            if kw and str(kw).strip():
                lines.append(f"KW  - {str(kw).strip()}")

        lines.append("ER  - \n")

    return "\n".join(lines)


def generate_csv_file(items, file_path):
    if not items:
        with open(file_path, "w", encoding="utf-8-sig") as f:
            f.write("")
        return

    keys_set = []
    seen = set()
    for item in items:
        for k in item.keys():
            if k not in seen:
                seen.add(k)
                keys_set.append(k)

    priority = ["id", "doi", "title", "year", "authors", "abstract", "keywords", "section", "issue", "volume", "number", "url", "pdf_url"]
    headers = [p for p in priority if p in seen] + [k for k in keys_set if k not in priority]

    with open(file_path, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.writer(f, quoting=csv.QUOTE_MINIMAL)
        writer.writerow(headers)
        for item in items:
            row = []
            for h in headers:
                val = item.get(h)
                if val is None:
                    row.append("")
                elif isinstance(val, list):
                    str_elements = []
                    for elem in val:
                        if isinstance(elem, dict):
                            str_elements.append(elem.get("name") or json.dumps(elem, ensure_ascii=False))
                        else:
                            str_elements.append(str(elem))
                    row.append("; ".join(str_elements))
                elif isinstance(val, dict):
                    row.append(json.dumps(val, ensure_ascii=False))
                else:
                    row.append(str(val))
            writer.writerow(row)


def generate_sqlite_file(items, file_path, table_name="articles"):
    if os.path.exists(file_path):
        os.remove(file_path)

    conn = sqlite3.connect(file_path)
    cur = conn.cursor()

    cur.execute(f"""
    CREATE TABLE {table_name} (
        id TEXT,
        doi TEXT,
        title TEXT,
        year INTEGER,
        authors TEXT,
        abstract TEXT,
        keywords TEXT,
        section TEXT,
        issue TEXT,
        url TEXT,
        pdf_url TEXT,
        full_json TEXT
    )
    """)

    cur.execute(f"CREATE INDEX idx_{table_name}_id ON {table_name}(id)")
    cur.execute(f"CREATE INDEX idx_{table_name}_doi ON {table_name}(doi)")
    cur.execute(f"CREATE INDEX idx_{table_name}_year ON {table_name}(year)")
    cur.execute(f"CREATE INDEX idx_{table_name}_title ON {table_name}(title)")

    cur.execute(f"""
    CREATE VIRTUAL TABLE {table_name}_fts USING fts5(
        title,
        abstract,
        authors,
        keywords,
        content='{table_name}',
        content_rowid='rowid'
    )
    """)

    insert_rows = []
    for item in items:
        raw_id = item.get("id") or item.get("doi") or ""
        doi = item.get("doi") or ""
        title = item.get("title") or ""
        try:
            year = int(item.get("year") or item.get("publication_year") or 0)
        except Exception:
            year = 0

        authors = item.get("authors") or []
        if isinstance(authors, list):
            auth_str = "; ".join(a.get("name", str(a)) if isinstance(a, dict) else str(a) for a in authors)
        else:
            auth_str = str(authors)

        abstract = item.get("abstract") or ""
        keywords = item.get("keywords") or []
        if isinstance(keywords, list):
            kw_str = "; ".join(str(k) for k in keywords)
        else:
            kw_str = str(keywords)

        section = item.get("section") or ""
        issue = str(item.get("issue") or "")
        url = item.get("url") or ""
        pdf_url = item.get("pdf_url") or ""
        full_json = json.dumps(item, ensure_ascii=False)

        insert_rows.append((raw_id, doi, title, year, auth_str, abstract, kw_str, section, issue, url, pdf_url, full_json))

    cur.executemany(f"""
    INSERT INTO {table_name} (id, doi, title, year, authors, abstract, keywords, section, issue, url, pdf_url, full_json)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, insert_rows)

    cur.execute(f"""
    INSERT INTO {table_name}_fts(rowid, title, abstract, authors, keywords)
    SELECT rowid, title, abstract, authors, keywords FROM {table_name}
    """)

    conn.commit()
    conn.close()


def generate_datapackage(base_name, count, config, file_path):
    pkg = {
        "profile": "tabular-data-package",
        "name": base_name,
        "title": config.get("title", f"BRAN Org - {base_name}"),
        "description": config.get("description", ""),
        "licenses": [
            {
                "name": "CC-BY-NC-SA-4.0",
                "path": "https://creativecommons.org/licenses/by-nc-sa/4.0/",
                "title": "Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International"
            }
        ],
        "contributors": [
            {
                "title": "BRAN Org",
                "role": "author",
                "organization": "Brazilian Research Archive Network"
            }
        ],
        "resources": [
            {
                "name": f"{base_name}-canonical-json",
                "path": f"{base_name}.json",
                "format": "json",
                "mediatype": "application/json"
            },
            {
                "name": f"{base_name}-tabular-csv",
                "path": f"{base_name}.csv",
                "format": "csv",
                "mediatype": "text/csv"
            },
            {
                "name": f"{base_name}-citations-bibtex",
                "path": f"{base_name}.bib",
                "format": "bib",
                "mediatype": "application/x-bibtex"
            },
            {
                "name": f"{base_name}-citations-ris",
                "path": f"{base_name}.ris",
                "format": "ris",
                "mediatype": "application/x-research-info-systems"
            },
            {
                "name": f"{base_name}-indexed-sqlite",
                "path": f"{base_name}.sqlite",
                "format": "sqlite3",
                "mediatype": "application/x-sqlite3"
            }
        ]
    }
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(pkg, f, indent=2, ensure_ascii=False)


def generate_checksums(directory):
    checksums = []
    for root, dirs, files in os.walk(directory):
        dirs.sort()
        files.sort()
        for f in files:
            if f == "checksums.sha256":
                continue
            fpath = os.path.join(root, f)
            relpath = os.path.relpath(fpath, directory)
            h = hashlib.sha256()
            with open(fpath, "rb") as fp:
                while chunk := fp.read(65536):
                    h.update(chunk)
            checksums.append(f"{h.hexdigest()}  {relpath}")

    with open(os.path.join(directory, "checksums.sha256"), "w", encoding="utf-8") as out:
        out.write("\n".join(checksums) + "\n")


def make_zip(source_dir, output_zip):
    abs_output_zip = os.path.abspath(output_zip)
    if os.path.exists(abs_output_zip):
        os.remove(abs_output_zip)

    # Cria em arquivo temporário para evitar recursão ao varrer o diretório
    tmp_zip = abs_output_zip + ".tmp"
    if os.path.exists(tmp_zip):
        os.remove(tmp_zip)

    with zipfile.ZipFile(tmp_zip, "w", zipfile.ZIP_DEFLATED) as z:
        for root, dirs, files in os.walk(source_dir):
            for file in files:
                fpath = os.path.join(root, file)
                abs_fpath = os.path.abspath(fpath)
                if abs_fpath == abs_output_zip or abs_fpath == tmp_zip or file.endswith(".zip"):
                    continue
                arcname = os.path.relpath(fpath, source_dir)
                z.write(fpath, arcname)

    shutil.move(tmp_zip, abs_output_zip)
    return abs_output_zip


def build_bundle(data_file: str, zenodo_file: str, provenance_file: str, output_dir: str):
    """Gera todos os arquivos do bundle na pasta output_dir."""
    os.makedirs(output_dir, exist_ok=True)
    with open(data_file, "r", encoding="utf-8") as f:
        items = json.load(f)

    zenodo_meta = {}
    if os.path.exists(zenodo_file):
        with open(zenodo_file, "r", encoding="utf-8") as f:
            zenodo_meta = json.load(f)

    base_name = os.path.splitext(os.path.basename(data_file))[0]
    is_journal = "revista" in zenodo_meta.get("title", "").lower() or "journal" in zenodo_meta.get("title", "").lower()

    # 1. Copia o JSON canônico
    canonical_json_path = os.path.join(output_dir, f"{base_name}.json")
    shutil.copyfile(data_file, canonical_json_path)

    # 2. Gera CSV
    csv_path = os.path.join(output_dir, f"{base_name}.csv")
    generate_csv_file(items, csv_path)

    # 3. Gera BibTeX
    bib_path = os.path.join(output_dir, f"{base_name}.bib")
    with open(bib_path, "w", encoding="utf-8") as f:
        f.write(generate_bibtex_file(items, zenodo_meta, is_journal=is_journal))

    # 4. Gera RIS
    ris_path = os.path.join(output_dir, f"{base_name}.ris")
    with open(ris_path, "w", encoding="utf-8") as f:
        f.write(generate_ris_file(items, zenodo_meta, is_journal=is_journal))

    # 5. Gera SQLite
    sqlite_path = os.path.join(output_dir, f"{base_name}.sqlite")
    generate_sqlite_file(items, sqlite_path)

    # 6. Datapackage
    pkg_path = os.path.join(output_dir, "datapackage.json")
    generate_datapackage(base_name, len(items), zenodo_meta, pkg_path)

    # 7. Copia Provenance se existir
    if os.path.exists(provenance_file):
        shutil.copyfile(provenance_file, os.path.join(output_dir, "provenance.json"))

    # 8. Checksums
    generate_checksums(output_dir)

    # 9. ZIP único
    zip_path = os.path.join(output_dir, f"{base_name}-zenodo.zip")
    make_zip(output_dir, zip_path)

    return {
        "base_name": base_name,
        "count": len(items),
        "output_dir": output_dir,
        "zip_path": zip_path,
        "files": [
            f"{base_name}.json",
            f"{base_name}.csv",
            f"{base_name}.bib",
            f"{base_name}.ris",
            f"{base_name}.sqlite",
            "datapackage.json",
            "provenance.json",
            "checksums.sha256",
            f"{base_name}-zenodo.zip"
        ]
    }


def upload_to_zenodo_bucket(bucket_url: str, file_path: str, token: str, filename: str = None):
    """Envia arquivo para o bucket do Zenodo via HTTP PUT."""
    import urllib.request
    if not filename:
        filename = os.path.basename(file_path)

    file_size = os.path.getsize(file_path)
    size_mb = file_size / (1024 * 1024)
    print(f"   ⬆️  Upload para Zenodo: '{filename}' ({size_mb:.2f} MB)...", flush=True)

    target_url = f"{bucket_url}/{filename}"
    with open(file_path, "rb") as fp:
        data = fp.read()

    req = urllib.request.Request(
        target_url,
        data=data,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/octet-stream"
        },
        method="PUT"
    )
    with urllib.request.urlopen(req, timeout=300) as resp:
        if resp.status not in (200, 201):
            raise RuntimeError(f"Falha no upload de {filename}: status {resp.status}")
    print(f"   ✓ Upload concluído com sucesso: {filename}", flush=True)


def get_zenodo_depositions(token: str):
    import urllib.request
    req = urllib.request.Request(
        f"{ZENODO_API_URL}/deposit/depositions",
        headers={"Authorization": f"Bearer {token}"}
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode("utf-8"))


def sync_with_zenodo(bundle_info: dict, zenodo_file: str, provenance_file: str, tag: str, token: str, has_pdf_corpus: bool):
    """Executa a sincronização completa com a API do Zenodo."""
    print("🛰️  CRONA: Conectando à API do Zenodo...", flush=True)
    depos = get_zenodo_depositions(token)
    
    zenodo_meta = {}
    if os.path.exists(zenodo_file):
        with open(zenodo_file, "r", encoding="utf-8") as f:
            zenodo_meta = json.load(f)

    target_title = zenodo_meta.get("title", "").strip().lower()
    base_name = bundle_info["base_name"]

    target_dep = None
    for d in depos:
        d_title = d.get("title", "").strip().lower()
        if target_title and target_title in d_title:
            target_dep = d
            break
        if base_name in d_title or base_name.replace("_articles", "") in d_title:
            target_dep = d
            break

    if not target_dep:
        print(f"⚠️  CRONA: Nenhum depósito encontrado no Zenodo correspondente a '{target_title or base_name}'.", flush=True)
        print("   Verifique as permissões do token ou crie o depósito inicial no Zenodo.", flush=True)
        return False

    dep_id = target_dep["id"]
    print(f"✓ Depósito Zenodo localizado: ID {dep_id} ('{target_dep.get('title')}')", flush=True)

    # Se já publicado e finalizado, cria nova versão
    import urllib.request
    active_dep = target_dep
    if target_dep.get("submitted") and target_dep.get("state") == "done":
        print(f"   Criando nova versão para depósito {dep_id}...", flush=True)
        req_nv = urllib.request.Request(
            f"{ZENODO_API_URL}/deposit/depositions/{dep_id}/actions/newversion",
            headers={"Authorization": f"Bearer {token}"},
            method="POST"
        )
        with urllib.request.urlopen(req_nv, timeout=30) as resp_nv:
            nv_data = json.loads(resp_nv.read().decode("utf-8"))
            draft_url = nv_data["links"]["latest_draft"]

        req_draft = urllib.request.Request(draft_url, headers={"Authorization": f"Bearer {token}"})
        with urllib.request.urlopen(req_draft, timeout=30) as resp_draft:
            active_dep = json.loads(resp_draft.read().decode("utf-8"))

    bucket = active_dep["links"]["bucket"]
    draft_id = active_dep["id"]

    # Upload dos arquivos do bundle
    out_dir = bundle_info["output_dir"]
    for fname in bundle_info["files"]:
        fpath = os.path.join(out_dir, fname)
        if os.path.exists(fpath):
            upload_to_zenodo_bucket(bucket, fpath, token, fname)

    # Atualiza metadados com a versão CalVer
    if zenodo_meta:
        zenodo_meta["version"] = tag
        zenodo_meta["publication_date"] = datetime.now().strftime("%Y-%m-%d")
        payload = json.dumps({"metadata": zenodo_meta}).encode("utf-8")
        req_meta = urllib.request.Request(
            f"{ZENODO_API_URL}/deposit/depositions/{draft_id}",
            data=payload,
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json"
            },
            method="PUT"
        )
        try:
            with urllib.request.urlopen(req_meta, timeout=30) as resp_meta:
                print(f"   ✓ Metadados atualizados com versão '{tag}'.", flush=True)
        except Exception as e:
            print(f"   Aviso ao atualizar metadados: {e}", flush=True)

    # Atualiza provenance.json com registro da sincronização
    if os.path.exists(provenance_file):
        with open(provenance_file, "r", encoding="utf-8") as f:
            prov = json.load(f)

        prov["cold_storage"] = {
            "zenodo_deposit_status": "UPDATED",
            "zenodo_deposit_id": dep_id,
            "metadata_synced_at": datetime.now(timezone.utc).isoformat(),
            "pdf_corpus_pending": has_pdf_corpus,
            "release_tag": tag,
            "notes": "Metadados, SQLite FTS5 e formatos abertos sincronizados no Zenodo pela CRONA."
        }
        with open(provenance_file, "w", encoding="utf-8") as f:
            json.dump(prov, f, indent=2, ensure_ascii=False)
            f.write("\n")
        print(f"   ✓ provenance.json atualizado com status de cold storage (PDF pendente: {has_pdf_corpus}).", flush=True)

    return True


def upload_cold_storage_pdfs(repo_root: str, zenodo_file: str, provenance_file: str, token: str):
    """Envia o acervo pesado de PDFs locais diretamente para o bucket do Zenodo."""
    print("📦 CRONA: Iniciando upload do acervo completo de PDFs (Cold Storage local)...", flush=True)
    pdf_dirs = [
        os.path.join(repo_root, "data", "pdfs"),
        os.path.join(repo_root, "data", "raw")
    ]
    target_dir = None
    for d in pdf_dirs:
        if os.path.exists(d):
            target_dir = d
            break

    if not target_dir:
        print("❌ Nenhum diretório de PDFs encontrado em data/pdfs ou data/raw.", file=sys.stderr)
        return False

    base_name = os.path.basename(os.path.abspath(repo_root))
    zip_name = f"{base_name}-pdfs-cold-storage.zip"
    zip_path = os.path.join(repo_root, zip_name)

    print(f"   Compactando PDFs de '{target_dir}' para '{zip_name}'...", flush=True)
    make_zip(target_dir, zip_path)

    depos = get_zenodo_depositions(token)
    zenodo_meta = {}
    if os.path.exists(zenodo_file):
        with open(zenodo_file, "r", encoding="utf-8") as f:
            zenodo_meta = json.load(f)

    target_title = zenodo_meta.get("title", "").strip().lower()
    target_dep = None
    for d in depos:
        d_title = d.get("title", "").strip().lower()
        if target_title and target_title in d_title:
            target_dep = d
            break
        if base_name in d_title or base_name.replace("-open-database", "") in d_title:
            target_dep = d
            break

    if not target_dep:
        print(f"❌ Depósito no Zenodo não encontrado para {base_name}.", file=sys.stderr)
        return False

    bucket = target_dep["links"]["bucket"]
    upload_to_zenodo_bucket(bucket, zip_path, token, zip_name)

    # Remove zip temporário após o envio
    if os.path.exists(zip_path):
        os.remove(zip_path)

    # Marca pdf_corpus_pending como False no provenance.json
    if os.path.exists(provenance_file):
        with open(provenance_file, "r", encoding="utf-8") as f:
            prov = json.load(f)
        if "cold_storage" not in prov:
            prov["cold_storage"] = {}
        prov["cold_storage"]["pdf_corpus_pending"] = False
        prov["cold_storage"]["pdfs_synced_at"] = datetime.now(timezone.utc).isoformat()
        with open(provenance_file, "w", encoding="utf-8") as f:
            json.dump(prov, f, indent=2, ensure_ascii=False)
            f.write("\n")
        print("   ✓ provenance.json atualizado: pdf_corpus_pending=false.", flush=True)

    print("✨ Acervo de PDFs preservado com sucesso no Zenodo!", flush=True)
    return True


def main():
    parser = argparse.ArgumentParser(description="CRONA Bot - Zenodo Packaging & Sync Engine")
    parser.add_argument("--file", help="Caminho do dataset JSON principal (ex: data/ebbc_articles.json)")
    parser.add_argument("--zenodo-json", default=".zenodo.json", help="Caminho do .zenodo.json")
    parser.add_argument("--provenance", default="provenance.json", help="Caminho do provenance.json")
    parser.add_argument("--tag", help="Tag da release no padrão CalVer (ex: v2026.10)")
    parser.add_argument("--output-dir", default="zenodo_dist", help="Diretório de saída para os pacotes gerados")
    parser.add_argument("--upload", action="store_true", help="Faz o upload dos pacotes para o Zenodo via API")
    parser.add_argument("--full-pdfs", action="store_true", help="Modo local: empacota e envia os PDFs brutos (Cold Storage)")

    args = parser.parse_args()

    # Validação do CalVer se tag for informada
    if args.tag:
        if not validate_calver(args.tag):
            print(f"❌ ERRO: A versão '{args.tag}' não segue o padrão CalVer da BRAN Org.", file=sys.stderr)
            print("   O formato obrigatório é vYYYY.MM (ex: v2026.10 ou revisões v2026.10.1).", file=sys.stderr)
            sys.exit(1)
        print(f"✓ Tag CalVer validada com sucesso: {args.tag}")

    token = os.environ.get("ZENODO_TOKEN")

    if args.full_pdfs:
        if not token:
            print("❌ ERRO: Variável de ambiente ZENODO_TOKEN não configurada.", file=sys.stderr)
            sys.exit(1)
        success = upload_cold_storage_pdfs(
            repo_root=".",
            zenodo_file=args.zenodo_json,
            provenance_file=args.provenance,
            token=token
        )
        sys.exit(0 if success else 1)

    if not args.file:
        # Tenta autodetectar em data/*.json
        import glob
        matches = glob.glob("data/*.json")
        if matches:
            args.file = matches[0]
        else:
            print("❌ ERRO: Nenhum arquivo de dados especificado ou encontrado em data/*.json", file=sys.stderr)
            sys.exit(1)

    print(f"📦 CRONA: Empacotando dados abertos a partir de '{args.file}'...")
    bundle_info = build_bundle(
        data_file=args.file,
        zenodo_file=args.zenodo_json,
        provenance_file=args.provenance,
        output_dir=args.output_dir
    )
    print(f"✓ Bundle gerado com sucesso em '{args.output_dir}':")
    for f in bundle_info["files"]:
        print(f"   - {f}")

    if args.upload:
        if not token:
            print("⚠️  Aviso: ZENODO_TOKEN não configurado. Pacotes gerados localmente sem upload remoto.")
            sys.exit(0)

        # Detecta se repositório tem PDFs locais ou pendentes
        has_pdf_corpus = os.path.exists("data/pdfs") or os.path.exists("data/raw") or "enancib" in args.file.lower()
        success = sync_with_zenodo(
            bundle_info=bundle_info,
            zenodo_file=args.zenodo_json,
            provenance_file=args.provenance,
            tag=args.tag or "v2026.10",
            token=token,
            has_pdf_corpus=has_pdf_corpus
        )
        sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
