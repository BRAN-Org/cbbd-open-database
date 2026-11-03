#!/usr/bin/env python3
"""
CBBD Harvester & Scientific Proceedings Pipeline - BRAN Org Standard
Script de extração, normalização, enriquecimento e auditoria dos anais do
Congresso Brasileiro de Biblioteconomia, Documentação e Ciência da Informação (CBBD 1954 - 2026).

Coleta artigos individuais a partir de:
- Repositório Omeka FEBAB (DCMES-XML) - Coleções históricas (1954 a 2019)
- Portal OJS de Eventos FEBAB (OAI-PMH) - Edições recentes (2019, 2022, 2024, 2026)
- Portal RBBD FEBAB (OAI-PMH) - Suplementos especiais (2015, 2017, 2024)
"""

import os
import sys
import json
import time
import re
import html
import socket
import urllib.request
import urllib.parse
import urllib.error
import xml.etree.ElementTree as ET

# Forçar resolução IPv4 para contornar problemas de rota IPv6 nos servidores da FEBAB
_orig_getaddrinfo = socket.getaddrinfo
def _getaddrinfo_ipv4(host, port, family=0, type=0, proto=0, flags=0):
    return _orig_getaddrinfo(host, port, family=socket.AF_INET, type=type, proto=proto, flags=flags)
socket.getaddrinfo = _getaddrinfo_ipv4

USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 (BRAN Org Harvester)"

OMEKA_COLLECTIONS = [
    {"col": 7, "year": 1954, "edition": "01", "city": "Recife", "state": "PE"},
    {"col": 9, "year": 1959, "edition": "02", "city": "Salvador", "state": "BA"},
    {"col": 10, "year": 1961, "edition": "03", "city": "Curitiba", "state": "PR"},
    {"col": 11, "year": 1963, "edition": "04", "city": "Fortaleza", "state": "CE"},
    {"col": 15, "year": 1971, "edition": "06", "city": "Belo Horizonte", "state": "MG"},
    {"col": 16, "year": 1973, "edition": "07", "city": "Belém", "state": "PA"},
    {"col": 17, "year": 1975, "edition": "08", "city": "Brasília", "state": "DF"},
    {"col": 18, "year": 1977, "edition": "09", "city": "Porto Alegre", "state": "RS"},
    {"col": 20, "year": 1979, "edition": "10", "city": "Curitiba", "state": "PR"},
    {"col": 21, "year": 1982, "edition": "11", "city": "João Pessoa", "state": "PB"},
    {"col": 8, "year": 2013, "edition": "25", "city": "Florianópolis", "state": "SC"},
    {"col": 19, "year": 2015, "edition": "26", "city": "São Paulo", "state": "SP"},
    {"col": 23, "year": 2017, "edition": "27", "city": "Fortaleza", "state": "CE"},
    {"col": 24, "year": 2019, "edition": "28", "city": "Vitória", "state": "ES"},
]

OJS_SETS = [
    {"set": "cbbd2019", "year": 2019, "edition": "28", "city": "Vitória", "state": "ES"},
    {"set": "cbbd2022", "year": 2022, "edition": "29", "city": "Virtual", "state": "BR"},
    {"set": "cbbd2024", "year": 2024, "edition": "30", "city": "Recife", "state": "PE"},
    {"set": "cbbd2026", "year": 2026, "edition": "31", "city": "Curitiba", "state": "PR"},
]

RBBD_SETS = [
    {"set": "rbbd:CBBD", "year": 2015, "edition": "26", "city": "São Paulo", "state": "SP"},
    {"set": "rbbd:CBBD2017", "year": 2017, "edition": "27", "city": "Fortaleza", "state": "CE"},
    {"set": "rbbd:CBBD+2024", "year": 2024, "edition": "30", "city": "Recife", "state": "PE"},
]

def fetch_url(url, retries=3, delay=1.0, timeout=25):
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                return resp.read()
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(delay * (attempt + 1))
            else:
                print(f"⚠️ Falha ao acessar {url}: {e}", file=sys.stderr, flush=True)
                return None

def clean_text(text):
    if not text:
        return ""
    text = html.unescape(text)
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()

def clean_author_name(name):
    if not name:
        return ""
    name = html.unescape(name)
    name = re.sub(r"<[^>]+>", "", name)
    name = re.sub(r"\s*\([^)]*\)", "", name)
    name = re.sub(r"\s+", " ", name).strip()
    # Inverter "Sobrenome, Nome" -> "Nome Sobrenome"
    if "," in name:
        parts = [p.strip() for p in name.split(",", 1)]
        if len(parts) == 2 and parts[1]:
            name = f"{parts[1]} {parts[0]}"
        elif len(parts) == 1:
            name = parts[0]
    return name.strip()

def normalize_title(title):
    if not title:
        return ""
    norm = title.lower()
    norm = re.sub(r"[^\w\s]", "", norm)
    norm = re.sub(r"\s+", " ", norm).strip()
    return norm

def extract_omeka_abstract(raw):
    if not raw:
        return ""
    m = re.search(r"var str = '([^']*)';", raw, re.DOTALL)
    if not m:
        m = re.search(r'var str = "([^"]*)";', raw, re.DOTALL)
    if m:
        text = m.group(1)
    else:
        text = re.sub(r"<[^>]+>", " ", raw)
    text = html.unescape(text)
    text = re.sub(r"\s+", " ", text).strip()
    if "linkifyHtml" in text or "var options" in text or len(text) < 15:
        return ""
    return text

def harvest_omeka_collection(meta):
    col = meta["col"]
    url = f"http://repositorio.febab.org.br/items/browse?collection={col}&output=dcmes-xml"
    print(f"📦 Coletando Omeka Coleção {col} (Ano {meta['year']}, Edição {meta['edition']})...", flush=True)
    xml_data = fetch_url(url, timeout=30)
    if not xml_data:
        return []

    try:
        root = ET.fromstring(xml_data)
    except Exception as e:
        print(f"❌ Erro ao parsear XML da coleção {col}: {e}", flush=True)
        return []

    ns = {'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#', 'dc': 'http://purl.org/dc/elements/1.1/'}
    descriptions = root.findall('rdf:Description', ns)
    articles = []

    for d in descriptions:
        about = d.attrib.get('{http://www.w3.org/1999/02/22-rdf-syntax-ns#}about', '')
        title_el = d.find('dc:title', ns)
        title = clean_text(title_el.text) if title_el is not None and title_el.text else ""
        if not title or len(title) < 3:
            continue

        item_id_match = re.search(r'/items/show/(\d+)', about)
        item_id = item_id_match.group(1) if item_id_match else str(len(articles) + 1)
        canonical_id = f"cbbd-{meta['year']}-{item_id}"

        creators = [clean_author_name(c.text) for c in d.findall('dc:creator', ns) if c.text]
        clean_creators = [c for c in creators if c and len(c) > 2]
        if not clean_creators:
            clean_creators = ["FEBAB"]

        date_el = d.find('dc:date', ns)
        year = meta["year"]
        if date_el is not None and date_el.text:
            m_year = re.search(r'\b(19\d\d|20\d\d)\b', date_el.text)
            if m_year:
                year = int(m_year.group(1))

        desc_el = d.find('dc:description', ns)
        abstract = extract_omeka_abstract(desc_el.text) if desc_el is not None and desc_el.text else ""

        subjects = []
        for s in d.findall('dc:subject', ns):
            if s.text:
                st = clean_text(s.text)
                if st and st not in subjects:
                    subjects.append(st)

        articles.append({
            "id": canonical_id,
            "title": title,
            "authors": clean_creators,
            "year": year,
            "abstract": abstract,
            "keywords": subjects,
            "event_name": "Congresso Brasileiro de Biblioteconomia e Documentação",
            "edition": meta["edition"],
            "city": meta["city"],
            "state": meta["state"],
            "url": about or f"http://repositorio.febab.org.br/items/show/{item_id}",
            "pdf_url": "",
            "source_platform": "Omeka FEBAB"
        })

    print(f"   ✓ Coleção {col}: {len(articles)} trabalhos extraídos.", flush=True)
    return articles

def harvest_oai_set(base_url, meta, platform_name="OJS FEBAB"):
    set_name = meta["set"]
    print(f"📦 Coletando OAI set '{set_name}' ({platform_name}, Ano {meta['year']})...", flush=True)
    articles = []
    token = None
    page = 1

    ns = {
        'oai': 'http://www.openarchives.org/OAI/2.0/',
        'dc': 'http://purl.org/dc/elements/1.1/',
        'oai_dc': 'http://www.openarchives.org/OAI/2.0/oai_dc/'
    }

    while True:
        if token:
            url = f"{base_url}?verb=ListRecords&resumptionToken={urllib.parse.quote(token)}"
        else:
            url = f"{base_url}?verb=ListRecords&metadataPrefix=oai_dc&set={urllib.parse.quote(set_name)}"

        xml_data = fetch_url(url, timeout=30)
        if not xml_data:
            break

        try:
            root = ET.fromstring(xml_data)
        except Exception as e:
            print(f"❌ Erro ao parsear OAI XML ({set_name}, página {page}): {e}", flush=True)
            break

        records = root.findall('.//oai:record', ns)
        page_count = 0
        for r in records:
            header = r.find('oai:header', ns)
            if header is not None and header.attrib.get('status') == 'deleted':
                continue

            meta_dc = r.find('.//oai_dc:dc', ns)
            if meta_dc is None:
                continue

            title_el = meta_dc.find('dc:title', ns)
            title = clean_text(title_el.text) if title_el is not None and title_el.text else ""
            if not title or len(title) < 3:
                continue

            creators = [clean_author_name(c.text) for c in meta_dc.findall('dc:creator', ns) if c.text]
            clean_creators = [c for c in creators if c and len(c) > 2]
            if not clean_creators:
                clean_creators = ["FEBAB"]

            date_el = meta_dc.find('dc:date', ns)
            year = meta["year"]
            if date_el is not None and date_el.text:
                m_year = re.search(r'\b(19\d\d|20\d\d)\b', date_el.text)
                if m_year:
                    year = int(m_year.group(1))

            desc_el = meta_dc.find('dc:description', ns)
            abstract = clean_text(desc_el.text) if desc_el is not None and desc_el.text else ""

            subjects = []
            for s in meta_dc.findall('dc:subject', ns):
                if s.text:
                    st = clean_text(s.text)
                    if st and st not in subjects:
                        subjects.append(st)

            idents = [clean_text(i.text) for i in meta_dc.findall('dc:identifier', ns) if i.text]
            article_url = ""
            doi = None
            raw_id = None

            for i in idents:
                if "doi.org" in i or i.startswith("10."):
                    m_doi = re.search(r'(10\.\d{4,9}/[-._;()/:,A-Za-z0-9]+)', i)
                    if m_doi:
                        doi = m_doi.group(1)
                elif "/article/view/" in i and not article_url:
                    article_url = i
                    m_id = re.search(r'/article/view/(\d+)', i)
                    if m_id:
                        raw_id = m_id.group(1)

            relations = [clean_text(r.text) for r in meta_dc.findall('dc:relation', ns) if r.text]
            pdf_url = ""
            for rel in relations:
                if "/article/view/" in rel:
                    pdf_url = rel
                    break

            if not article_url and idents:
                article_url = idents[0]

            if doi:
                canonical_id = f"https://doi.org/{doi}"
            elif raw_id:
                canonical_id = f"cbbd-{year}-{raw_id}"
            else:
                canonical_id = f"cbbd-{year}-{len(articles) + 1}"

            articles.append({
                "id": canonical_id,
                "title": title,
                "authors": clean_creators,
                "year": year,
                "abstract": abstract,
                "keywords": subjects,
                "event_name": "Congresso Brasileiro de Biblioteconomia e Documentação",
                "edition": meta["edition"],
                "city": meta["city"],
                "state": meta["state"],
                "url": article_url,
                "pdf_url": pdf_url,
                "source_platform": platform_name
            })
            page_count += 1

        token_el = root.find('.//oai:resumptionToken', ns)
        if token_el is not None and token_el.text and token_el.text.strip():
            token = token_el.text.strip()
            print(f"      página {page}: +{page_count} itens coletados (total: {len(articles)})...", flush=True)
            page += 1
            time.sleep(0.3)
        else:
            break

    print(f"   ✓ Set '{set_name}': {len(articles)} trabalhos extraídos.", flush=True)
    return articles

def consolidate_and_deduplicate(all_articles):
    print("\n🔄 Consolidando e deduplicando acervo...", flush=True)
    seen = {}
    deduped = []

    for a in all_articles:
        norm = normalize_title(a["title"])
        key = (norm, a["year"])

        if key not in seen:
            seen[key] = a
            deduped.append(a)
        else:
            existing = seen[key]
            # Mesclar metadados se o novo for mais completo
            if not existing.get("abstract") and a.get("abstract"):
                existing["abstract"] = a["abstract"]
            if not existing.get("pdf_url") and a.get("pdf_url"):
                existing["pdf_url"] = a["pdf_url"]
            for kw in a.get("keywords", []):
                if kw not in existing.get("keywords", []):
                    existing.setdefault("keywords", []).append(kw)

    # Ordenação canônica decrescente por ano e crescente por título
    deduped.sort(key=lambda x: (-x["year"], x["title"]))
    return deduped

def main():
    print("===================================================================", flush=True)
    print("🚀 BRAN Org: Harvester Canônico dos Anais do CBBD (1954–2026)", flush=True)
    print("===================================================================\n", flush=True)

    all_harvested = []

    # 1. Coleta Omeka (1954–2019)
    for meta in OMEKA_COLLECTIONS:
        items = harvest_omeka_collection(meta)
        all_harvested.extend(items)
        time.sleep(0.2)

    # 2. Coleta Portal OJS (2019, 2022, 2024, 2026)
    ojs_base = "https://portal.febab.org.br/index.php/index/oai"
    for meta in OJS_SETS:
        items = harvest_oai_set(ojs_base, meta, platform_name="Portal OJS FEBAB")
        all_harvested.extend(items)
        time.sleep(0.3)

    # 3. Coleta RBBD (2015, 2017, 2024)
    rbbd_base = "https://rbbd.febab.org.br/rbbd/oai"
    for meta in RBBD_SETS:
        items = harvest_oai_set(rbbd_base, meta, platform_name="Revista RBBD")
        all_harvested.extend(items)
        time.sleep(0.3)

    print(f"\n📊 Total bruto de registros coletados: {len(all_harvested)}", flush=True)
    consolidated = consolidate_and_deduplicate(all_harvested)
    print(f"✅ Total consolidado e deduplicado: {len(consolidated)} trabalhos científicos.", flush=True)

    # Salvar dataset principal
    out_path = os.path.join(os.path.dirname(__file__), "..", "data", "cbbd_articles.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(consolidated, f, indent=2, ensure_ascii=False)
        f.write("\n")

    print(f"\n💾 Arquivo salvo com sucesso em: {out_path}", flush=True)
    print("===================================================================", flush=True)

if __name__ == "__main__":
    main()
