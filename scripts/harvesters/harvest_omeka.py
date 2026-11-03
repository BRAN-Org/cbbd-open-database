#!/usr/bin/env python3
"""
BRAN Org - CBBD Harvester para Acervo Histórico do Omeka (repositorio.febab.org.br).
Extrai artigos, trabalhos e relatórios das coleções digitalizadas da FEBAB.
"""

import os
import sys
import re
import json
import time
import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
import requests
from bs4 import BeautifulSoup
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

OMEKA_COLLECTIONS = {
    "2013": {"col_id": 8, "edition": 25, "edition_roman": "XXV", "name": "XXV CBBD (Florianópolis, 2013)", "city": "Florianópolis", "state": "SC"},
    "1982": {"col_id": 21, "edition": 11, "edition_roman": "XI", "name": "XI CBBD (João Pessoa, 1982)", "city": "João Pessoa", "state": "PB"},
    "1979": {"col_id": 20, "edition": 10, "edition_roman": "X", "name": "X CBBD (Curitiba, 1979)", "city": "Curitiba", "state": "PR"},
    "1977": {"col_id": 18, "edition": 9, "edition_roman": "IX", "name": "IX CBBD (Porto Alegre, 1977)", "city": "Porto Alegre", "state": "RS"},
    "1975": {"col_id": 17, "edition": 8, "edition_roman": "VIII", "name": "VIII CBBD (Brasília, 1975)", "city": "Brasília", "state": "DF"},
    "1973": {"col_id": 16, "edition": 7, "edition_roman": "VII", "name": "VII CBBD (Belém, 1973)", "city": "Belém", "state": "PA"},
    "1971": {"col_id": 15, "edition": 6, "edition_roman": "VI", "name": "VI CBBD (Belo Horizonte, 1971)", "city": "Belo Horizonte", "state": "MG"},
    "1963": {"col_id": 11, "edition": 4, "edition_roman": "IV", "name": "IV CBBD (Fortaleza, 1963)", "city": "Fortaleza", "state": "CE"},
    "1961": {"col_id": 10, "edition": 3, "edition_roman": "III", "name": "III CBBD (Curitiba, 1961)", "city": "Curitiba", "state": "PR"},
    "1959": {"col_id": 9, "edition": 2, "edition_roman": "II", "name": "II CBBD (Salvador, 1959)", "city": "Salvador", "state": "BA"},
    "1954": {"col_id": 7, "edition": 1, "edition_roman": "I", "name": "I CBBD (Recife, 1954)", "city": "Recife", "state": "PE"}
}


def clean_text(text: str) -> str:
    if not text:
        return ""
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


def parse_omeka_item(item_url: str, meta: dict, max_retries: int = 3) -> dict:
    headers = {"User-Agent": "BRAN-Harvester/1.0 (+https://github.com/BRAN-Org/cbbd-open-database)"}
    html = ""
    for attempt in range(max_retries):
        try:
            resp = requests.get(item_url, headers=headers, timeout=12)
            if resp.status_code == 200:
                html = resp.text
                break
        except Exception:
            time.sleep(0.5 * (attempt + 1))
            
    if not html:
        return None

    soup = BeautifulSoup(html, "html.parser")
    
    h1 = soup.find("h1")
    title = clean_text(h1.text) if h1 else ""
    if not title or title.lower() in ["comissão científica", "normas para submissão de trabalhos"]:
        return None

    # Extrair campos Dublin Core
    creators = []
    subject = ""
    abstract = ""
    date_str = str(meta["year"])

    for el in soup.find_all("div", id=lambda i: i and "dublin-core" in i):
        el_id = el.get("id", "")
        txt = clean_text(el.find("div", class_="element-text").text if el.find("div", class_="element-text") else "")
        if "creator" in el_id and txt:
            creators.append(txt)
        elif "subject" in el_id and txt:
            subject = txt
        elif "description" in el_id and txt:
            abstract = txt
        elif "date" in el_id and txt:
            date_str = txt

    if not creators:
        creators = ["FEBAB / Comissão Organizadora"]

    # Identificar anexo de arquivo se houver
    pdf_url = None
    for a in soup.find_all("a", href=True):
        href = a["href"]
        if "/files/original/" in href or href.lower().endswith(".pdf"):
            pdf_url = href
            break

    item_num = item_url.rstrip("/").split("/")[-1]
    item_id = f"cbbd-{meta['year']}-omeka-{item_num}"

    keywords = ["CBBD", "FEBAB", meta["city"], str(meta["year"])]
    if subject:
        keywords.append(clean_text(subject))

    return {
        "id": item_id,
        "title": title,
        "authors": creators,
        "affiliations": [],
        "year": int(meta["year"]),
        "edition": meta["edition"],
        "edition_roman": meta["edition_roman"],
        "city": meta["city"],
        "state": meta["state"],
        "track": subject,
        "abstract": abstract or f"Trabalho catalogado no acervo histórico do {meta['name']} (Repositório FEBAB).",
        "keywords": list(dict.fromkeys(keywords)),
        "url": item_url,
        "pdf_url": pdf_url,
        "has_pdf": bool(pdf_url)
    }


def harvest_collection(year_key: str, max_workers: int = 6, limit: int = None) -> list:
    if year_key not in OMEKA_COLLECTIONS:
        print(f"❌ Coleção Omeka para o ano '{year_key}' não encontrada.")
        return []

    info = OMEKA_COLLECTIONS[year_key]
    col_id = info["col_id"]
    browse_url = f"http://repositorio.febab.org.br/items/browse?collection={col_id}"
    print(f"\n=======================================================")
    print(f"🏛️ Iniciando extração do acervo Omeka: {info['name']}")
    print(f"🔗 URL da Coleção: {browse_url}")
    print(f"=======================================================")

    headers = {"User-Agent": "BRAN-Harvester/1.0 (+https://github.com/BRAN-Org/cbbd-open-database)"}
    resp = requests.get(browse_url, headers=headers, timeout=15)
    if resp.status_code != 200:
        print(f"❌ Erro ao acessar coleção Omeka: HTTP {resp.status_code}")
        return []

    soup = BeautifulSoup(resp.text, "html.parser")
    items_divs = soup.find_all("div", class_="item")
    item_urls = []
    
    for it in items_divs:
        a = it.find("a", href=lambda h: h and "/items/show/" in h)
        if a:
            full_url = f"http://repositorio.febab.org.br{a['href']}" if a['href'].startswith("/") else a['href']
            if full_url not in item_urls:
                item_urls.append(full_url)

    if limit:
        item_urls = item_urls[:limit]

    print(f"📋 Total de itens localizados na coleção: {len(item_urls)}")
    results = []

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {}
        meta = {
            "year": int(year_key),
            "edition": info["edition"],
            "edition_roman": info["edition_roman"],
            "city": info["city"],
            "state": info["state"],
            "name": info["name"]
        }
        for u in item_urls:
            f = executor.submit(parse_omeka_item, u, meta)
            futures[f] = u

        done = 0
        total = len(futures)
        for f in as_completed(futures):
            res = f.result()
            done += 1
            if res:
                results.append(res)
            if done % 25 == 0 or done == total:
                print(f"⏳ Progresso: {done}/{total} ({len(results)} coletados com sucesso)")

    # Salvar em data/raw/
    out_dir = os.path.join(os.path.dirname(__file__), "..", "..", "data", "raw")
    os.makedirs(out_dir, exist_ok=True)
    out_file = os.path.join(out_dir, f"omeka_{year_key}.json")
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)

    print(f"✅ Coleção Omeka {year_key} finalizada! {len(results)} registros salvos em {out_file}\n")
    return results


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Harvester Omeka para acervo histórico do CBBD")
    parser.add_argument("--year", choices=list(OMEKA_COLLECTIONS.keys()) + ["all"], default="2013", help="Ano da coleção")
    parser.add_argument("--limit", type=int, default=None, help="Limitar quantidade de itens")
    parser.add_argument("--workers", type=int, default=6, help="Concorrência paralela")
    args = parser.parse_args()

    if args.year == "all":
        for y in OMEKA_COLLECTIONS:
            harvest_collection(y, max_workers=args.workers, limit=args.limit)
    else:
        harvest_collection(args.year, max_workers=args.workers, limit=args.limit)
