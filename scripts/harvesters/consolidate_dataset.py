#!/usr/bin/env python3
"""
BRAN Org - Consolidador de Dados do CBBD.
Lê todos os lotes brutos em data/raw/, unifica com os registros canônicos de edições,
gera CSV com BOM UTF-8, banco SQLite3 e atualiza provenance.json.
"""

import os
import sys
import glob
import json
import csv
import sqlite3
import hashlib
from datetime import datetime, timezone

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
DATA_DIR = os.path.join(PROJECT_ROOT, "data")
RAW_DIR = os.path.join(DATA_DIR, "raw")
ARTICLES_JSON = os.path.join(DATA_DIR, "cbbd_articles.json")
ARTICLES_CSV = os.path.join(DATA_DIR, "cbbd_articles.csv")
ARTICLES_SQLITE = os.path.join(DATA_DIR, "cbbd_articles.sqlite")
PROVENANCE_JSON = os.path.join(PROJECT_ROOT, "provenance.json")


def consolidate():
    print("🔄 [BRAN Consolidator] Iniciando consolidação do acervo do CBBD...")

    # 1. Carregar registros existentes em data/cbbd_articles.json
    existing_items = []
    if os.path.exists(ARTICLES_JSON):
        try:
            with open(ARTICLES_JSON, "r", encoding="utf-8") as f:
                existing_items = json.load(f)
        except Exception as e:
            print(f"⚠️ Erro ao carregar {ARTICLES_JSON}: {e}")

    # Separar os 31 registros marco de edições (IDs no formato cbbd-YYYY-edNN)
    edition_landmarks = [it for it in existing_items if "-ed" in it.get("id", "")]
    print(f"🏛️ Registros canônicos de edições preservados: {len(edition_landmarks)}")

    # 2. Carregar todos os arquivos de data/raw/*.json
    harvested_items = []
    raw_files = glob.glob(os.path.join(RAW_DIR, "*.json"))
    print(f"📂 Lotes de extração encontrados em data/raw/: {len(raw_files)}")

    for rf in raw_files:
        try:
            with open(rf, "r", encoding="utf-8") as f:
                batch = json.load(f)
                if isinstance(batch, list):
                    harvested_items.extend(batch)
                    print(f"  └─ {os.path.basename(rf)}: {len(batch)} itens")
        except Exception as e:
            print(f"⚠️ Erro ao ler {rf}: {e}")

    # 3. Unificar e deduplicar por ID
    all_dict = {}
    # Primeiro os marcos de edições
    for ed in edition_landmarks:
        all_dict[ed["id"]] = ed

    # Depois os artigos colhidos
    for art in harvested_items:
        art_id = art["id"]
        # Normalizar campos obrigatórios
        if not art.get("title"):
            continue
        if not art.get("authors"):
            art["authors"] = ["Autor Não Identificado"]
        all_dict[art_id] = art

    consolidated = list(all_dict.values())
    # Ordenar por ano e por ID
    consolidated.sort(key=lambda x: (x.get("year", 0), x.get("id", "")))

    print(f"📦 Total consolidado em memória: {len(consolidated)} registros.")

    # 4. Salvar data/cbbd_articles.json
    with open(ARTICLES_JSON, "w", encoding="utf-8") as f:
        json.dump(consolidated, f, indent=2, ensure_ascii=False)
    print(f"✅ Salvo: {ARTICLES_JSON}")

    # 5. Salvar data/cbbd_articles.csv (UTF-8 BOM)
    fieldnames = [
        "id", "title", "edition", "edition_roman", "year", "city", "state",
        "theme", "track", "status", "availability", "platform", "url", "pdf_url",
        "has_pdf", "authors", "affiliations", "keywords", "abstract", "notes"
    ]

    with open(ARTICLES_CSV, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
        writer.writeheader()
        for it in consolidated:
            row = dict(it)
            row["authors"] = "; ".join(it.get("authors", [])) if isinstance(it.get("authors"), list) else str(it.get("authors", ""))
            row["affiliations"] = "; ".join(it.get("affiliations", [])) if isinstance(it.get("affiliations"), list) else str(it.get("affiliations", ""))
            row["keywords"] = "; ".join(it.get("keywords", [])) if isinstance(it.get("keywords"), list) else str(it.get("keywords", ""))
            writer.writerow(row)
    print(f"✅ Salvo: {ARTICLES_CSV}")

    # 6. Salvar data/cbbd_articles.sqlite
    if os.path.exists(ARTICLES_SQLITE):
        os.remove(ARTICLES_SQLITE)

    conn = sqlite3.connect(ARTICLES_SQLITE)
    cur = conn.cursor()
    cur.execute("""
    CREATE TABLE articles (
        id TEXT PRIMARY KEY,
        title TEXT,
        edition INTEGER,
        edition_roman TEXT,
        year INTEGER,
        city TEXT,
        state TEXT,
        theme TEXT,
        track TEXT,
        status TEXT,
        availability TEXT,
        platform TEXT,
        url TEXT,
        pdf_url TEXT,
        has_pdf INTEGER,
        authors TEXT,
        affiliations TEXT,
        keywords TEXT,
        abstract TEXT,
        notes TEXT
    )
    """)
    cur.execute("CREATE INDEX idx_articles_year ON articles(year);")
    cur.execute("CREATE INDEX idx_articles_edition ON articles(edition);")

    for it in consolidated:
        cur.execute("""
        INSERT INTO articles VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            it["id"],
            it.get("title"),
            it.get("edition"),
            it.get("edition_roman"),
            it.get("year"),
            it.get("city"),
            it.get("state"),
            it.get("theme", ""),
            it.get("track", ""),
            it.get("status", ""),
            it.get("availability", ""),
            it.get("platform", ""),
            it.get("url"),
            it.get("pdf_url"),
            1 if it.get("has_pdf") else 0,
            "; ".join(it.get("authors", [])) if isinstance(it.get("authors"), list) else str(it.get("authors", "")),
            "; ".join(it.get("affiliations", [])) if isinstance(it.get("affiliations"), list) else str(it.get("affiliations", "")),
            "; ".join(it.get("keywords", [])) if isinstance(it.get("keywords"), list) else str(it.get("keywords", "")),
            it.get("abstract", ""),
            it.get("notes", "")
        ))

    conn.commit()
    conn.close()
    print(f"✅ Salvo: {ARTICLES_SQLITE}")

    # 7. Atualizar provenance.json
    with open(ARTICLES_JSON, "rb") as f:
        sha256_hash = hashlib.sha256(f.read()).hexdigest()

    if os.path.exists(PROVENANCE_JSON):
        with open(PROVENANCE_JSON, "r", encoding="utf-8") as f:
            prov = json.load(f)
        prov["total_records"] = len(consolidated)
        prov["raw_data_sha256"] = sha256_hash
        prov["last_audit_at"] = datetime.now(timezone.utc).isoformat()
        with open(PROVENANCE_JSON, "w", encoding="utf-8") as f:
            json.dump(prov, f, indent=2, ensure_ascii=False)
        print(f"✅ Provenance atualizado com {len(consolidated)} registros e SHA-256 {sha256_hash[:12]}...")

    print("🏁 [BRAN Consolidator] Consolidação concluída com sucesso!\n")


if __name__ == "__main__":
    consolidate()
