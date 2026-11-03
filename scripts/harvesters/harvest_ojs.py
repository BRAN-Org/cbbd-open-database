#!/usr/bin/env python3
"""
BRAN Org - CBBD Harvester para Edições OJS (2015 a 2026).
Extrai artigos, autores, filiações, resumos e links diretos de PDF.
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

OJS_EDITIONS = {
    "2026": {
        "name": "XXXI CBBD (Curitiba, 2026)",
        "edition": 31,
        "edition_roman": "XXXI",
        "city": "Curitiba",
        "state": "PR",
        "toc_url": "https://portal.febab.org.br/cbbd2026/issue/current",
        "base_url": "https://portal.febab.org.br/cbbd2026"
    },
    "2024": {
        "name": "XXX CBBD (Recife, 2024)",
        "edition": 30,
        "edition_roman": "XXX",
        "city": "Recife",
        "state": "PE",
        "toc_url": "https://portal.febab.org.br/cbbd2024/issue/current",
        "base_url": "https://portal.febab.org.br/cbbd2024"
    },
    "2022": {
        "name": "XXIX CBBD (Formato Virtual, 2022)",
        "edition": 29,
        "edition_roman": "XXIX",
        "city": "Formato Virtual",
        "state": "Online",
        "toc_url": "https://portal.febab.org.br/cbbd2022/issue/current",
        "base_url": "https://portal.febab.org.br/cbbd2022"
    },
    "2019": {
        "name": "XXVIII CBBD (Vitória, 2019)",
        "edition": 28,
        "edition_roman": "XXVIII",
        "city": "Vitória",
        "state": "ES",
        "toc_url": "https://portal.febab.org.br/cbbd2019/issue/current",
        "base_url": "https://portal.febab.org.br/cbbd2019"
    },
    "2017": {
        "name": "XXVII CBBD (Fortaleza, 2017 - RBBD Especial)",
        "edition": 27,
        "edition_roman": "XXVII",
        "city": "Fortaleza",
        "state": "CE",
        "toc_url": "https://rbbd.febab.org.br/rbbd/issue/view/80",
        "base_url": "https://rbbd.febab.org.br/rbbd"
    },
    "2015": {
        "name": "XXVI CBBD (São Paulo, 2015 - RBBD Especial)",
        "edition": 26,
        "edition_roman": "XXVI",
        "city": "São Paulo",
        "state": "SP",
        "toc_url": "https://rbbd.febab.org.br/rbbd/issue/view/73",
        "base_url": "https://rbbd.febab.org.br/rbbd"
    }
}


def clean_text(text: str) -> str:
    if not text:
        return ""
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


def parse_article_page(url: str, meta_info: dict, max_retries: int = 3) -> dict:
    headers = {"User-Agent": "BRAN-Harvester/1.0 (+https://github.com/BRAN-Org/cbbd-open-database)"}
    html = ""
    for attempt in range(max_retries):
        try:
            resp = requests.get(url, headers=headers, verify=False, timeout=12)
            if resp.status_code == 200:
                html = resp.text
                break
        except Exception:
            time.sleep(0.5 * (attempt + 1))
    
    if not html:
        return None

    soup = BeautifulSoup(html, "html.parser")
    
    # 1. Título
    title_meta = soup.find("meta", attrs={"name": "citation_title"})
    if title_meta and title_meta.get("content"):
        title = clean_text(title_meta["content"])
    else:
        h1 = soup.find("h1", class_="page_title") or soup.find("h1")
        title = clean_text(h1.text) if h1 else clean_text(meta_info.get("toc_title", ""))

    if not title:
        return None

    # 2. Autores e Filiações
    author_metas = soup.find_all("meta", attrs={"name": "citation_author"})
    authors = [clean_text(m["content"]) for m in author_metas if m.get("content")]
    if not authors:
        authors_meta = soup.find_all("meta", attrs={"name": "DC.Creator.PersonalName"})
        authors = [clean_text(m["content"]) for m in authors_meta if m.get("content")]
    if not authors and meta_info.get("toc_authors"):
        authors = meta_info.get("toc_authors")
    if not authors:
        authors = ["Autor Não Identificado"]

    affil_metas = soup.find_all("meta", attrs={"name": "citation_author_institution"})
    affiliations = [clean_text(m["content"]) for m in affil_metas if m.get("content")]

    # 3. PDF URL
    pdf_meta = soup.find("meta", attrs={"name": "citation_pdf_url"})
    pdf_url = pdf_meta["content"].strip() if pdf_meta and pdf_meta.get("content") else None
    if not pdf_url:
        pdf_a = soup.find("a", class_=lambda c: c and ("pdf" in c or "obj_galley_link" in c))
        if pdf_a and pdf_a.get("href"):
            pdf_url = pdf_a["href"].strip()

    # 4. Resumo
    abstract = ""
    abstract_div = soup.find(["div", "section"], class_=["item abstract", "abstract", "article-abstract"])
    if abstract_div:
        p = abstract_div.find("p")
        abstract = clean_text(p.text if p else abstract_div.text)
        # Remove prefixo 'Resumo' se redundante
        abstract = re.sub(r'^(Resumo|Abstract)[:\s-]*', '', abstract, flags=re.IGNORECASE).strip()
    
    if not abstract:
        desc_meta = soup.find("meta", attrs={"name": "DC.Description"}) or soup.find("meta", attrs={"name": "description"})
        if desc_meta and desc_meta.get("content"):
            abstract = clean_text(desc_meta["content"])

    # 5. Palavras-chave
    keywords = ["CBBD", "FEBAB", meta_info["city"], str(meta_info["year"])]
    kw_div = soup.find(["div", "section"], class_=["item keywords", "keywords"])
    if kw_div:
        kws = [clean_text(k) for k in re.split(r'[,;•\n]', kw_div.text) if clean_text(k).lower() not in ['palavras-chave', 'keywords']]
        keywords.extend([k for k in kws if len(k) > 2])

    # 6. ID canônico
    article_num = url.rstrip("/").split("/")[-1]
    article_id = f"cbbd-{meta_info['year']}-art-{article_num}"

    return {
        "id": article_id,
        "title": title,
        "authors": authors,
        "affiliations": affiliations,
        "year": int(meta_info["year"]),
        "edition": meta_info["edition"],
        "edition_roman": meta_info["edition_roman"],
        "city": meta_info["city"],
        "state": meta_info["state"],
        "track": meta_info.get("track", ""),
        "abstract": abstract or f"Artigo apresentado no {meta_info['name']}.",
        "keywords": list(dict.fromkeys(keywords)),
        "url": url,
        "pdf_url": pdf_url,
        "has_pdf": bool(pdf_url)
    }


def harvest_edition(edition_key: str, max_workers: int = 6, limit: int = None) -> list:
    if edition_key not in OJS_EDITIONS:
        print(f"❌ Edição '{edition_key}' não encontrada.")
        return []

    ed = OJS_EDITIONS[edition_key]
    print(f"\n=======================================================")
    print(f"🚀 Iniciando extração do {ed['name']}")
    print(f"🔗 TOC URL: {ed['toc_url']}")
    print(f"=======================================================")

    headers = {"User-Agent": "BRAN-Harvester/1.0 (+https://github.com/BRAN-Org/cbbd-open-database)"}
    resp = requests.get(ed["toc_url"], headers=headers, verify=False, timeout=15)
    if resp.status_code != 200:
        print(f"❌ Falha ao carregar TOC: HTTP {resp.status_code}")
        return []

    soup = BeautifulSoup(resp.text, "html.parser")
    
    # Identificar seções / eixos temáticos se existirem
    articles_to_fetch = []
    
    sections = soup.find_all(["div", "section"], class_=["section", "obj_issue_toc_section"])
    if sections:
        for sec in sections:
            h2 = sec.find(["h2", "h3"])
            track_name = clean_text(h2.text) if h2 else ""
            for a in sec.find_all("a", href=lambda h: h and "/article/view/" in h):
                href = a["href"].split("#")[0]
                tail = href.rstrip("/").split("/article/view/")[-1]
                if tail.isdigit():
                    articles_to_fetch.append({
                        "url": href,
                        "track": track_name,
                        "toc_title": clean_text(a.text)
                    })
    else:
        for a in soup.find_all("a", href=lambda h: h and "/article/view/" in h):
            href = a["href"].split("#")[0]
            tail = href.rstrip("/").split("/article/view/")[-1]
            if tail.isdigit():
                articles_to_fetch.append({
                    "url": href,
                    "track": "",
                    "toc_title": clean_text(a.text)
                })

    # Deduplicar URLs
    seen = set()
    unique_fetch = []
    for it in articles_to_fetch:
        if it["url"] not in seen:
            seen.add(it["url"])
            unique_fetch.append(it)

    if limit:
        unique_fetch = unique_fetch[:limit]

    print(f"📋 Total de artigos localizados no sumário: {len(unique_fetch)}")
    results = []
    
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {}
        for it in unique_fetch:
            meta = {
                "year": ed["year"] if "year" in ed else int(edition_key),
                "edition": ed["edition"],
                "edition_roman": ed["edition_roman"],
                "city": ed["city"],
                "state": ed["state"],
                "name": ed["name"],
                "track": it.get("track", ""),
                "toc_title": it.get("toc_title", "")
            }
            f = executor.submit(parse_article_page, it["url"], meta)
            futures[f] = it["url"]

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
    out_file = os.path.join(out_dir, f"ojs_{edition_key}.json")
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)

    print(f"✅ Edição {edition_key} finalizada! {len(results)} artigos salvos em {out_file}\n")
    return results


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Harvester OJS para anais do CBBD")
    parser.add_argument("--edition", choices=list(OJS_EDITIONS.keys()) + ["all"], default="2022", help="Edição para extração")
    parser.add_argument("--limit", type=int, default=None, help="Limitar quantidade de artigos (para testes)")
    parser.add_argument("--workers", type=int, default=6, help="Concorrência paralela")
    args = parser.parse_args()

    if args.edition == "all":
        for k in OJS_EDITIONS:
            harvest_edition(k, max_workers=args.workers, limit=args.limit)
    else:
        harvest_edition(args.edition, max_workers=args.workers, limit=args.limit)
