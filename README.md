# CBBD Open Data - Anais e Trabalhos Científicos (1954–2026)

<p align="center">
  <a href="https://doi.org/10.5281/zenodo.pending"><img src="https://zenodo.org/badge/DOI/10.5281/zenodo.pending.svg" alt="Zenodo DOI"></a>
  <a href="#-síntese-do-acervo--governança"><img src="https://img.shields.io/badge/Confiabilidade-Cr%C3%ADtico%20%7C%20Acervo%20Fragmentado-red" alt="Confiabilidade"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/Licen%C3%A7a-CC_BY--NC--SA_4.0-lightgrey.svg" alt="CC BY-NC-SA 4.0"></a>
  <a href="#-como-usar-os-dados"><img src="https://img.shields.io/badge/Formatos-SQLite_%7C_CSV_%7C_JSON-blue.svg" alt="Formatos"></a>
</p>

Base de dados aberta contendo todos os 3.385 trabalhos científicos publicados nos anais das edições digitalizadas do Congresso Brasileiro de Biblioteconomia, Documentação e Ciência da Informação (CBBD, 1954–2026), promovido pela FEBAB, integrando o diagnóstico documental de preservação digital de todas as 31 edições históricas.

---

## 📊 Síntese do Acervo & Governança

> [!WARNING]
> **Status de Confiabilidade:** 🔴 **Crítico | Acervo Fragmentado (Grandes Lacunas Digitais)**  
> 📌 **Diagnóstico Metodológico:** O CBBD possui 31 edições históricas (1954–2026), porém apenas 16 edições possuem anais ou coleções digitais ativas (1º ao 4º, 6º ao 11º no repositório Omeka; 25º na coleção Omeka; 26º e 27º em suplementos da RBBD; e 28º a 31º no portal OJS de eventos), totalizando **3.385 artigos catalogados**. As edições do 12º ao 24º CBBD (1983–2011) e o 5º CBBD (1967) não possuem anais digitais centralizados pela FEBAB (circulação apenas em anais impressos e CD-ROMs físicos fora de linha sob custódia de bibliotecas depositárias).

| Métrica / Atributo | Detalhes do Acervo |
| :--- | :--- |
| **Período Histórico** | 1954–2026 (31 Edições Históricas) |
| **Total de Trabalhos** | **3.385 artigos científicos catalogados** |
| **Cobertura de Resumos** | 3.271 trabalhos com resumo integral catalogado (96,6% de preenchimento) |
| **Textos Completos** | Links diretos para páginas de publicação e arquivos nos servidores da FEBAB |
| **Integridade Criptográfica** | Hash SHA-256 por arquivo e rastreabilidade estrita (`provenance.json`) |
| **Formatos Disponíveis** | JSON, SQLite3 (`.sqlite`), CSV (UTF-8 BOM), BibTeX (`.bib`), RIS (`.ris`) |
| **Licença dos Dados** | [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) (Uso acadêmico; vedada ingestão por IA comercial) |

---

## 🏛️ Mapeamento Histórico das 31 Edições (1954–2026)

| Edição | Ano | Sede | Situação do Acervo | Plataforma / Link Direto |
| :---: | :---: | :--- | :--- | :--- |
| **01º** | 1954 | Recife – PE | 🟢 Digitalizado | [Repositório Omeka (Coleção 7)](http://repositorio.febab.org.br/collections/show/7) |
| **02º** | 1959 | Salvador – BA | 🟢 Digitalizado | [Repositório Omeka (Coleção 9)](http://repositorio.febab.org.br/collections/show/9) |
| **03º** | 1961 | Curitiba – PR | 🟢 Digitalizado | [Repositório Omeka (Coleção 10)](http://repositorio.febab.org.br/collections/show/10) |
| **04º** | 1963 | Fortaleza – CE | 🟢 Digitalizado | [Repositório Omeka (Coleção 11)](http://repositorio.febab.org.br/collections/show/11) |
| **05º** | 1967 | São Paulo – SP | 🔴 Lacuna Digital | Acervo Impresso Físico (Bibliotecas Depositárias) |
| **06º** | 1971 | Belo Horizonte – MG | 🟢 Digitalizado | [Repositório Omeka (Coleção 15)](http://repositorio.febab.org.br/collections/show/15) |
| **07º** | 1973 | Belém – PA | 🟢 Digitalizado | [Repositório Omeka (Coleção 16)](http://repositorio.febab.org.br/collections/show/16) |
| **08º** | 1975 | Brasília – DF | 🟢 Digitalizado | [Repositório Omeka (Coleção 17)](http://repositorio.febab.org.br/collections/show/17) |
| **09º** | 1977 | Porto Alegre – RS | 🟢 Digitalizado | [Repositório Omeka (Coleção 18)](http://repositorio.febab.org.br/collections/show/18) |
| **10º** | 1979 | Curitiba – PR | 🟢 Digitalizado | [Repositório Omeka (Coleção 20)](http://repositorio.febab.org.br/collections/show/20) |
| **11º** | 1982 | João Pessoa – PB | 🟢 Digitalizado | [Repositório Omeka (Coleção 21)](http://repositorio.febab.org.br/collections/show/21) |
| **12º** | 1983 | Balneário Camboriú – SC | 🔴 Lacuna Digital | Acervo Impresso Físico (Bibliotecas Depositárias) |
| **13º** | 1985 | Vitória – ES | 🔴 Lacuna Digital | Acervo Impresso Físico (Bibliotecas Depositárias) |
| **14º** | 1987 | Recife – PE | 🔴 Lacuna Digital | Acervo Impresso Físico (Bibliotecas Depositárias) |
| **15º** | 1989 | Rio de Janeiro – RJ | 🔴 Lacuna Digital | Acervo Impresso Físico (Bibliotecas Depositárias) |
| **16º** | 1991 | Salvador – BA | 🔴 Lacuna Digital | Acervo Impresso Físico (Bibliotecas Depositárias) |
| **17º** | 1994 | Belo Horizonte – MG | 🔴 Lacuna Digital | Acervo Impresso Físico (Bibliotecas Depositárias) |
| **18º** | 1997 | São Luís – MA | 🔴 Lacuna Digital | Acervo Impresso Físico (Bibliotecas Depositárias) |
| **19º** | 2000 | Porto Alegre – RS | 🔴 Lacuna Digital | CD-ROM / Mídia Física (Sem servidor online) |
| **20º** | 2002 | Fortaleza – CE | 🔴 Lacuna Digital | CD-ROM / Mídia Física (Sem servidor online) |
| **21º** | 2005 | Curitiba – PR | 🔴 Lacuna Digital | CD-ROM / Mídia Física (Sem servidor online) |
| **22º** | 2007 | Brasília – DF | 🔴 Lacuna Digital | CD-ROM / Mídia Física (Sem servidor online) |
| **23º** | 2009 | Bonito – MS | 🔴 Lacuna Digital | Hotsite Descontinuado / Artigos na [BRAPCI](https://brapci.inf.br) |
| **24º** | 2011 | Maceió – AL | 🔴 Lacuna Digital | Hotsite Descontinuado / Artigos na [BRAPCI](https://brapci.inf.br) |
| **25º** | 2013 | Florianópolis – SC | 🟢 Digitalizado | [Repositório Omeka (Coleção 8)](http://repositorio.febab.org.br/collections/show/8) |
| **26º** | 2015 | São Paulo – SP | 🟢 Digitalizado | [RBBD v. 11 Especial](https://rbbd.febab.org.br/rbbd/issue/view/73) / [Omeka (Coleção 19)](http://repositorio.febab.org.br/collections/show/19) |
| **27º** | 2017 | Fortaleza – CE | 🟢 Digitalizado | [RBBD v. 13 Especial](https://rbbd.febab.org.br/rbbd/issue/view/80) / [Omeka (Coleção 23)](http://repositorio.febab.org.br/collections/show/23) |
| **28º** | 2019 | Vitória – ES | 🟢 Digitalizado | [Portal OJS FEBAB](https://portal.febab.org.br/cbbd2019/issue/current) / [Omeka (Coleção 24)](http://repositorio.febab.org.br/collections/show/24) |
| **29º** | 2022 | Formato Virtual | 🟢 Digitalizado | [Portal OJS FEBAB](https://portal.febab.org.br/cbbd2022/issue/current) / [RBBD v. 18 Premiados](https://rbbd.febab.org.br/rbbd/issue/view/98) |
| **30º** | 2024 | Recife – PE | 🟢 Digitalizado | [Portal OJS FEBAB (70 Anos)](https://portal.febab.org.br/cbbd2024/issue/current) |
| **31º** | 2026 | Curitiba – PR | 🟢 Digitalizado | [Portal OJS FEBAB (Antropoceno)](https://portal.febab.org.br/cbbd2026/issue/current) |

---

## 📥 Download do Pacote Consolidado

O acervo bruto, o banco relacional completo e os arquivos individuais estão arquivados permanentemente no **CERN / Zenodo** sob DOI imutável:

- 🔗 **DOI Permanente:** [https://doi.org/10.5281/zenodo.pending](https://doi.org/10.5281/zenodo.pending)
- 📦 **Conteúdo do .zip:** Banco SQLite3 (`cbbd_articles.sqlite`), planilhas CSV consolidadas (`cbbd_articles.csv`), metadados estruturados JSON, referências BibTeX/RIS e coleção completa de PDFs.

```bash
# Download direto do pacote completo via terminal
curl -LO "https://zenodo.org/records/pending/files/cbbd-open-database-zenodo.zip"
unzip cbbd-open-database-zenodo.zip
```

---

## ⚡ Como Usar os Dados

### Python (Pandas)
```python
import pandas as pd

df = pd.read_json("data/cbbd_articles.json")
print(f"Total: {len(df)} artigos | Período: {df['year'].min()} a {df['year'].max()}")
```

### SQLite3 (SQL no terminal)
```bash
sqlite3 data/cbbd_articles.sqlite "SELECT year, COUNT(*) as total FROM articles GROUP BY year ORDER BY year;"
```

---

## 🌐 API REST Pública

Endpoints públicos e gratuitos (sem necessidade de chave de autenticação):

| Método | Endpoint | Finalidade |
| :--- | :--- | :--- |
| `GET` | `/api/v1/articles` | Busca textual (`?q=`), filtros facetados (`?year=`, `?author=`) e paginação |
| `GET` | `/api/v1/articles/:key` | Consulta individual por ID ou DOI |
| `GET` | `/api/v1/articles/stats` | Métricas consolidadas, rankings de autores e palavras-chave |
| `GET` | `/api/v1/articles/export?format=csv` | Download instantâneo dos dados filtrados em CSV (BOM UTF-8) |

> **Executar localmente:** `npm install && npm start` (disponível em `http://localhost:3000`).

---

## 📖 Como Citar Este Dataset

```bibtex
@misc{cbbd_open_database_2026,
  author       = {BRAN Org},
  title        = {CBBD Open Data - Mapeamento e Diagnóstico dos Anais (1954–2026)},
  year         = {2026},
  howpublished = {Zenodo},
  doi          = {10.5281/zenodo.pending},
  url          = {https://doi.org/10.5281/zenodo.pending}
}
```

**ABNT:**
> BRAN ORG. **CBBD Open Data - Mapeamento e Diagnóstico dos Anais (1954–2026)**. Genebra: CERN / Zenodo, 2026. DOI: 10.5281/zenodo.pending. Disponível em: &lt;https://doi.org/10.5281/zenodo.pending&gt;.
