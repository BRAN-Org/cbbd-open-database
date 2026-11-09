#!/usr/bin/env python3
"""
BRAN Org - Dataset Builder & Compiler
Single-command CLI to validate, compile, and hash academic datasets:
1. Validates <dataset>_articles.json against schemas/article.v1.schema.json
2. Compiles <dataset>_articles.csv (RFC 4180 UTF-8 with BOM for Excel/R)
3. Compiles <dataset>_articles.sqlite (SQLite3 with B-Tree indexes & FTS5 full-text search)
4. Calculates SHA-256 checksums and updates provenance.json
"""

import os
import sys
import json
import csv
import glob
import sqlite3
import hashlib
from datetime import datetime, timezone

def sha256_file(filepath):
    h = hashlib.sha256()
    with open(filepath, "rb") as f:
        while chunk := f.read(65536):
            h.update(chunk)
    return h.hexdigest()

def validate_schema(items, schema_path):
    print(f"🔍 Validando {len(items)} registros contra o schema...")
    try:
        import jsonschema
        with open(schema_path, "r", encoding="utf-8") as sf:
            schema = json.load(sf)
        jsonschema.validate(instance=items, schema=schema)
        print("✅ Validação de schema concluída com 100% de conformidade.")
        return True
    except ImportError:
        print("⚠️ jsonschema não instalado. Executando validação estrutural nativa...")
        for i, it in enumerate(items):
            if not isinstance(it, dict):
                raise ValueError(f"Registro #{i} não é um objeto JSON.")
            if not it.get("title") or len(str(it.get("title")).strip()) < 3:
                raise ValueError(f"Registro #{i} possui título ausente ou inválido.")
            if not it.get("authors") or not isinstance(it.get("authors"), list) or len(it.get("authors")) == 0:
                raise ValueError(f"Registro #{i} ('{it.get('title')[:30]}...') não possui lista de autores.")
            if not it.get("id") and not it.get("doi"):
                raise ValueError(f"Registro #{i} órfão: não possui 'id' nem 'doi'.")
        print("✅ Validação estrutural nativa concluída com sucesso.")
        return True

def generate_csv_file(items, file_path):
    print(f"📊 Gerando CSV canônico: {os.path.basename(file_path)}...")
    if not items:
        with open(file_path, "w", encoding="utf-8-sig") as f:
            f.write("")
        return

    priority = [
        "id", "doi", "title", "year", "authors", "abstract",
        "keywords", "section", "issue", "volume", "number",
        "url", "pdf_url"
    ]
    seen_keys = set()
    for item in items:
        seen_keys.update(item.keys())

    headers = [p for p in priority if p in seen_keys] + sorted([k for k in seen_keys if k not in priority])

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
    print(f"✅ CSV gerado com sucesso ({os.path.getsize(file_path):,} bytes).")

def generate_sqlite_file(items, file_path, table_name="articles"):
    print(f"🗄️  Compilando banco relacional SQLite3 com FTS5: {os.path.basename(file_path)}...")
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
        raw_id = str(item.get("id") or item.get("doi") or "")
        doi = str(item.get("doi") or "")
        title = str(item.get("title") or "")
        try:
            year = int(item.get("year") or item.get("publication_year") or 0)
        except Exception:
            year = 0

        authors = item.get("authors") or []
        if isinstance(authors, list):
            auth_str = "; ".join(a.get("name", str(a)) if isinstance(a, dict) else str(a) for a in authors)
        else:
            auth_str = str(authors)

        abstract = str(item.get("abstract") or "")
        keywords = item.get("keywords") or []
        if isinstance(keywords, list):
            kw_str = "; ".join(str(k) for k in keywords)
        else:
            kw_str = str(keywords)

        section = str(item.get("section") or "")
        issue = str(item.get("issue") or "")
        url = str(item.get("url") or "")
        pdf_url = str(item.get("pdf_url") or "")
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
    print(f"✅ SQLite3 gerado com sucesso ({os.path.getsize(file_path):,} bytes).")

def update_provenance(prov_path, json_path, csv_path, sqlite_path, items):
    if not os.path.exists(prov_path):
        print(f"⚠️ {prov_path} não encontrado, gerando novo manifesto...")
        prov = {
            "$schema": "https://raw.githubusercontent.com/BRAN-Org/schemas/main/schemas/provenance.v1.schema.json",
            "dataset_id": os.path.basename(json_path).replace(".json", ""),
            "source_url": "https://github.com/BRAN-Org",
            "scraped_at": datetime.now(timezone.utc).isoformat(),
            "extractor_name": "bran-harvester",
            "extractor_version": "1.0.0",
            "health_level": "VERIFIED_AUDITED",
            "methodology_disclaimer": "Dados coletados sob o protocolo de proveniência e ciência aberta da BRAN Org."
        }
    else:
        with open(prov_path, "r", encoding="utf-8") as pf:
            prov = json.load(pf)

    total = len(items)
    missing_doi = sum(1 for it in items if not it.get("doi") or str(it.get("doi")).strip().upper() in ["", "N/A", "NONE"])
    missing_abs = sum(1 for it in items if not it.get("abstract") or len(str(it.get("abstract")).strip()) == 0)

    json_sha = sha256_file(json_path)
    csv_sha = sha256_file(csv_path)
    sqlite_sha = sha256_file(sqlite_path)

    new_checksums = {
        os.path.basename(json_path): json_sha,
        os.path.basename(csv_path): csv_sha,
        os.path.basename(sqlite_path): sqlite_sha
    }

    if (
        prov.get("checksums") == new_checksums
        and prov.get("total_records") == total
        and prov.get("missing_doi_count") == missing_doi
        and prov.get("missing_abstract_count") == missing_abs
        and prov.get("raw_data_sha256") == json_sha
    ):
        print(f"🔒 Provenance já está sincronizado ({prov_path}): checksums coincidem.")
        return

    prov["total_records"] = total
    prov["missing_doi_count"] = missing_doi
    prov["missing_abstract_count"] = missing_abs
    prov["raw_data_sha256"] = json_sha
    prov["last_audited_at"] = datetime.now(timezone.utc).isoformat()
    prov["checksums"] = new_checksums

    with open(prov_path, "w", encoding="utf-8") as pf:
        json.dump(prov, pf, indent=2, ensure_ascii=False)
        pf.write("\n")

    print(f"🔒 Provenance atualizado ({prov_path}): SHA-256 = {json_sha[:16]}...")

def main():
    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    data_dir = os.path.join(repo_root, "data")
    schemas_dir = os.path.join(repo_root, "schemas")
    schema_path = os.path.join(schemas_dir, "article.v1.schema.json")
    prov_path = os.path.join(repo_root, "provenance.json")

    target_json = None
    if len(sys.argv) > 1 and sys.argv[1].endswith(".json"):
        target_json = os.path.abspath(sys.argv[1])
    else:
        json_files = glob.glob(os.path.join(data_dir, "*_articles.json")) or glob.glob(os.path.join(data_dir, "*.json"))
        if json_files:
            target_json = sorted(json_files)[0]

    if not target_json or not os.path.exists(target_json):
        print("❌ Nenhum arquivo de dados JSON encontrado em data/.")
        sys.exit(1)

    print(f"🚀 Iniciando build do dataset a partir de: {os.path.relpath(target_json, repo_root)}")
    with open(target_json, "r", encoding="utf-8") as f:
        data = json.load(f)

    items = data if isinstance(data, list) else data.get("articles") or data.get("items") or []
    if not items:
        print("❌ Dataset vazio ou estrutura de lista não reconhecida.")
        sys.exit(1)

    # 1. Validar Schema
    validate_schema(items, schema_path)

    # 2. Gerar CSV
    base_name = os.path.splitext(target_json)[0]
    csv_path = f"{base_name}.csv"
    generate_csv_file(items, csv_path)

    # 3. Gerar SQLite3
    sqlite_path = f"{base_name}.sqlite"
    generate_sqlite_file(items, sqlite_path)

    # 4. Atualizar Provenance
    update_provenance(prov_path, target_json, csv_path, sqlite_path, items)

    print("\n✨ Build concluído com sucesso!")
    print(f"   📄 JSON:   {os.path.basename(target_json)} ({os.path.getsize(target_json):,} bytes)")
    print(f"   📊 CSV:    {os.path.basename(csv_path)} ({os.path.getsize(csv_path):,} bytes)")
    print(f"   🗄️  SQLite: {os.path.basename(sqlite_path)} ({os.path.getsize(sqlite_path):,} bytes)")
    print(f"   📦 Total:  {len(items):,} artigos processados.")

if __name__ == "__main__":
    main()
