# Guia de Referência da API REST — EBBC Open Database

A **API REST Pública do EBBC Open Database** oferece acesso programático, padronizado e de alta performance a todos os anais históricos do Encontro Brasileiro de Bibliometria e Cientometria (EBBC, 2012–2026), mantida pela **BRAN Org**.

Todos os endpoints operam sob princípios **FAIR** (Findable, Accessible, Interoperable, Reusable) e **BOAI** (Open Access), sem qualquer exigência de autenticação, chave de acesso (API Key) ou cobrança.

---

## 📌 Sumário

1. [Visão Geral & Protocolos](#-visão-geral--protocolos)
2. [Ambientes & URLs Base](#-ambientes--urls-base)
3. [Especificação OpenAPI 3.0](#-especificação-openapi-30)
4. [Endpoints de Consulta & Busca](#-endpoints-de-consulta--busca)
   - [GET /api/v1/articles (Listagem Paginada & Filtros)](#1-get-apiv1articles)
   - [GET /api/v1/articles/:key (Busca Individual por ID ou DOI)](#2-get-apiv1articleskey)
   - [GET /api/v1/articles/by-key (Busca Flexível por Chave)](#3-get-apiv1articlesby-key)
5. [Endpoints de Exportação em Lote](#-endpoints-de-exportação-em-lote)
   - [GET /api/v1/articles/export (JSON, CSV, BibTeX, RIS)](#4-get-apiv1articlesexport)
6. [Endpoints Analíticos & Métricas](#-endpoints-analíticos--métricas)
   - [GET /api/v1/articles/stats (Estatísticas Consolidadas)](#5-get-apiv1articlesstats)
   - [GET /api/v1/articles/stats/correlations (Matriz de Coocorrência)](#6-get-apiv1articlesstatscorrelations)
   - [GET /api/v1/articles/stats/temporal (Séries Temporais Empilhadas)](#7-get-apiv1articlesstatstemporal)
   - [GET /api/v1/articles/stats/pareto (Análise de Pareto / Bradford)](#8-get-apiv1articlesstatspareto)
   - [GET /api/v1/articles/stats/scatter (Dispersão & Tendência)](#9-get-apiv1articlesstatsscatter)
7. [Endpoint de Configuração](#-endpoint-de-configuração)
   - [GET /api/v1/config](#10-get-apiv1config)
8. [Dicionário de Dados do Artigo](#-dicionário-de-dados-do-artigo)
9. [Receitas Prontas para Cientometria (Python & R)](#-receitas-prontas-para-cientometria-python--r)

---

## 🌐 Visão Geral & Protocolos

- **Protocolo**: HTTPS / HTTP/2.
- **Autenticação**: **Nenhuma** (Acesso público irrestrito).
- **CORS**: Habilitado globalmente (`Access-Control-Allow-Origin: *`) para consumo direto por aplicações Web (SPAs), Jupyter Notebooks, Google Colab e scripts em R.
- **Formato Padrão**: `application/json; charset=utf-8`.
- **Formatos Alternativos**:
  - `text/csv; charset=utf-8` (com UTF-8 BOM para compatibilidade nativa com Excel, SPSS e LibreOffice).
  - `application/x-bibtex` (padrão LaTeX / Zotero com campos `eprint` e `url`).
  - `application/x-research-info-systems` (padrão RIS com tag `L1` para PDFs diretos e `UR` para VOSviewer, Mendeley e bibliometrix).
- **Performance**: Todos os dados residem indexados em memória no runtime do servidor, permitindo latências típicas de resposta inferiores a **15ms**.

---

## 🚀 Ambientes & URLs Base

| Ambiente | URL Base | Descrição |
| :--- | :--- | :--- |
| **Produção (Vercel CDN)** | `https://ebbc-open-database.vercel.app/api/v1` | Servido com redundância geográfica e SSL automático |
| **Desenvolvimento Local** | `http://localhost:3000/api/v1` | Execução local via `npm start` |

> **Nota de Compatibilidade**: O prefixo `/api` funciona como um alias idêntico a `/api/v1` (ex: `/api/articles` responde exatamente o mesmo que `/api/v1/articles`).

---

## 📄 Especificação OpenAPI 3.0

A especificação técnica formal no padrão OpenAPI 3.0.3 (Swagger) está disponível diretamente via endpoint JSON:

```bash
# Baixar o contrato formal da API em JSON
curl -s "https://ebbc-open-database.vercel.app/api/v1/openapi.json" | jq .
```

Você pode importar este arquivo diretamente em clientes como **Swagger UI**, **Postman**, **Insomnia**, ou utilizá-lo com geradores de SDKs como `openapi-generator`.

---

## 🔍 Endpoints de Consulta & Busca

### 1. `GET /api/v1/articles`
Retorna a listagem paginada de artigos com suporte a múltiplos filtros facetados, ordenação dinâmica e busca textual global com normalização fonética (insensível a maiúsculas, minúsculas e acentuação).

#### Parâmetros de Query (Query String)

| Parâmetro | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `q` | `string` | — | Busca textual ampla em `title`, `abstract`, `authors` e `keywords`. Ignora acentos (ex: `produção` encontra `producao`). |
| `year` | `string` / `number` | — | Filtro por edição/ano. Permite múltiplos anos separados por vírgula (ex: `?year=2022,2024`). |
| `author` | `string` | — | Filtro por autor (busca por substring ou correspondência exata). |
| `keyword` | `string` | — | Filtro por palavra-chave atribuída. |
| `tool` | `string` | — | Filtro por software/ferramenta metodológica curada (ex: `VOSviewer`, `Bibliometrix`, `Python`, `R`, `CiteSpace`, `Gephi`). |
| `source` | `string` | — | Filtro por fonte de dados bibliográfica (ex: `Web of Science`, `Scopus`, `SciELO`, `Lattes`, `OpenAlex`). |
| `stage` | `string` | — | Filtro por etapa metodológica (ex: `Coleta de Dados`, `Análise de Redes`, `Visualização`). |
| `limit` | `integer` | `20` | Quantidade de registros por página. Use `0` para obter todos os registros sem paginação. |
| `offset` | `integer` | `0` | Quantidade de registros a saltar (deslocamento para paginação). |
| `sort` | `string` | `year` | Campo de ordenação (`year`, `title`, `doi`). |
| `order` | `string` | `desc` | Sentido da ordenação: `asc` (ascendente) ou `desc` (descendente). |

#### Exemplo de Requisição

```bash
curl -G "https://ebbc-open-database.vercel.app/api/v1/articles" \
  --data-urlencode "q=cienciometria" \
  --data-urlencode "year=2024" \
  --data-urlencode "tool=VOSviewer" \
  --data-urlencode "limit=5"
```

#### Exemplo de Resposta (JSON)

```json
{
  "total": 808,
  "filteredCount": 18,
  "limit": 5,
  "offset": 0,
  "results": [
    {
      "id": "ebbc-2024-102",
      "doi": "https://doi.org/10.22477.102",
      "title": "Mapeamento cientométrico das redes de colaboração...",
      "year": 2024,
      "authors": ["Silva, João", "Santos, Maria"],
      "keywords": ["Cientometria", "Colaboração Científica", "VOSviewer"],
      "abstract": "O presente estudo investiga as estruturas de rede...",
      "url": "https://ebbc.inf.br/ojs/index.php/ebbc/article/view/102",
      "pdf_url": "https://ebbc.inf.br/ojs/index.php/ebbc/article/download/102/95",
      "event_name": "Encontro Brasileiro de Bibliometria e Cientometria",
      "edition": "10ª Edição",
      "tools": ["VOSviewer", "R"],
      "data_sources": ["Web of Science"],
      "usage_stages": ["Análise de Redes", "Visualização"],
      "identifies_tool": "N/A",
      "is_refined": true
    }
  ]
}
```

---

### 2. `GET /api/v1/articles/:key`
Recupera um único registro utilizando seu identificador unívoco. A resolução opera em dois passos:
1. **Correspondência Exata**: Verifica correspondência exata com `id`, `doi` completo ou número do DOI.
2. **Fallback Difuso**: Apenas se não houver correspondência exata, realiza busca secundária.

#### Formatos de Chave Suportados

- **ID Canônico**: `ebbc-2022-441`, `ebbc-2012-876`
- **DOI com Notação por Ponto**: `10.22477.01`
- **DOI Canônico Completo**: `https://doi.org/10.22477.01` (pode ser URL-encoded: `https%3A%2F%2Fdoi.org%2F10.22477.01`)
- **Trabalhos sem DOI de Origem**: Consulte pelo ID canônico (`ebbc-2012-876`). O campo `doi` conterá o valor literal `"N/A"`.

#### Exemplo de Requisição por DOI

```bash
curl -s "https://ebbc-open-database.vercel.app/api/v1/articles/10.22477.01" | jq .
```

#### Exemplo de Resposta (HTTP 200 OK)

```json
{
  "id": "ebbc-2022-441",
  "doi": "https://doi.org/10.22477.01",
  "title": "O impacto da produção científica brasileira em “agronomy”: a influência do autor correspondente (2015 a 2019)",
  "year": 2022,
  "authors": [
    "Samile Andrea de Souza Vanz",
    "Sandra Cristina de Oliveira",
    "Maria Cláudia Cabrini Grácio",
    "Zaida Chinchilla-Rodríguez",
    "Domingo DoCampo"
  ],
  "keywords": ["Autor correspondente", "Impacto de citação", "Colaboração científica", "Agronomia"],
  "abstract": "Ciências agrárias constituem uma das áreas mais eficientes e sustentáveis no brasil...",
  "url": "https://ebbc.inf.br/ojs/index.php/ebbc/article/view/441",
  "pdf_url": "https://ebbc.inf.br/ojs/index.php/ebbc/article/download/441/378",
  "event_name": "Encontro Brasileiro de Bibliometria e Cientometria",
  "edition": "8ª Edição",
  "tools": [],
  "identifies_tool": "N/A",
  "usage_stages": [],
  "data_sources": [],
  "is_refined": true
}
```

#### Resposta de Erro (HTTP 404 Not Found)

```json
{
  "error": "Registro com a chave 'doi-inexistente' não encontrado."
}
```

---

### 3. `GET /api/v1/articles/by-key`
Alternativa para sistemas legados que enviam a chave via query string:

```bash
curl -s "https://ebbc-open-database.vercel.app/api/v1/articles/by-key?value=ebbc-2022-441" | jq .
```

---

## 📦 Endpoints de Exportação em Lote

### 4. `GET /api/v1/articles/export`
Gera downloads diretos ou fluxos despaginados do dataset completo ou de subconjuntos filtrados nos 4 principais formatos de intercâmbio acadêmico.

#### Parâmetros de Query

| Parâmetro | Opções | Descrição |
| :--- | :--- | :--- |
| `format` | `json`, `csv`, `bibtex` (ou `bib`), `ris` | Formato do arquivo a ser gerado (padrão: `json`). |
| `q` | `string` | Filtrar os registros antes da exportação. |
| `year`, `author`, `tool`, `source`, `stage` | `string` | Qualquer faceta aceita no endpoint principal de listagem. |
| `limit` | `integer` | Opcional. Se omitido ou definido como `0`, **exporta 100% dos registros** sem corte. |

---

#### 4.1 Exportação JSON (`format=json`)
Retorna um array JSON plano (não encapsulado em `results`), ideal para pipelines de dados em Python ou ingestão em bancos NoSQL:

```bash
curl -s "https://ebbc-open-database.vercel.app/api/v1/articles/export?format=json" > ebbc_completo.json
```

---

#### 4.2 Exportação CSV (`format=csv`)
Gera arquivo tabular compatível com **Microsoft Excel**, **SPSS**, **LibreOffice Calc**, **R** e **Pandas**:
- **Encoding**: UTF-8 com **Byte Order Mark (BOM)**, garantindo que acentos (á, é, ç) abram perfeitamente no Excel sem distorção.
- **Cabeçalho**: `id,title,doi,year,authors,abstract,url,pdf_url,tools,data_sources,usage_stages,event_name,edition`

```bash
curl -s "https://ebbc-open-database.vercel.app/api/v1/articles/export?format=csv&year=2024" -o ebbc_2024.csv
```

---

#### 4.3 Exportação BibTeX (`format=bibtex` ou `format=bib`)
Gera referências acadêmicas formatadas como `@inproceedings{...}` para uso em **LaTeX**, **Overleaf**, **JabRef** e **Zotero**:
- **Campo `url`**: Link oficial do trabalho no OJS.
- **Campo `eprint`**: Link direto para download do texto completo em PDF.
- **Escape**: Caracteres especiais (`&`, `%`, `_`) são tratados automaticamente.

```bash
curl -s "https://ebbc-open-database.vercel.app/api/v1/articles/export?format=bibtex&limit=3"
```

*Trecho retornado:*
```bibtex
@inproceedings{vanz2022o,
  title = {O impacto da produção científica brasileira em “agronomy”...},
  author = {Samile Andrea de Souza Vanz and Sandra Cristina de Oliveira and Maria Cláudia Cabrini Grácio},
  year = {2022},
  booktitle = {Encontro Brasileiro de Bibliometria e Cientometria},
  doi = {10.22477.01},
  url = {https://ebbc.inf.br/ojs/index.php/ebbc/article/view/441},
  eprint = {https://ebbc.inf.br/ojs/index.php/ebbc/article/download/441/378},
  abstract = {Ciências agrárias constituem uma das áreas mais eficientes...},
  keywords = {Autor correspondente, Impacto de citação, Colaboração científica}
}
```

---

#### 4.4 Exportação RIS (`format=ris`)
Gera arquivo Research Information Systems (`TY - CONF ... ER - `) para importação direta em ferramentas de análise de redes bibliométricas (**VOSviewer**, **Citespace**, **Bibliometrix/R**, **Mendeley**, **EndNote**):
- **Tag `L1`**: Link direto do anexo em PDF (permite que o Zotero/Mendeley anexe o PDF automaticamente).
- **Tag `UR`**: URL canônica da publicação.

```bash
curl -s "https://ebbc-open-database.vercel.app/api/v1/articles/export?format=ris&tool=VOSviewer" -o vosviewer_papers.ris
```

---

## 📊 Endpoints Analíticos & Métricas

### 5. `GET /api/v1/articles/stats`
Retorna agregações globais e indicadores calculados em tempo real sobre todo o acervo.

#### Exemplo de Requisição

```bash
curl -s "https://ebbc-open-database.vercel.app/api/v1/articles/stats" | jq .
```

#### Estrutura do Payload Retornado

- `totalRecords`: Contagem total de artigos (808).
- `metrics`:
  - `totalArticles`: Quantidade total catalogada.
  - `uniqueAuthors`: Número de pesquisadores únicos identificados.
  - `uniqueTools`: Quantidade de softwares metodológicos distintos mapeados.
  - `uniqueDataSources`: Quantidade de bases de dados bibliográficas mapeadas.
- `topLists`:
  - `topTools`: Softwares mais citados (VOSviewer, Bibliometrix, CiteSpace, Gephi, Python, R, Pajek, etc.).
  - `topSources`: Fontes mais utilizadas (SciELO, Web of Science, Scopus, Lattes, OpenAlex).
  - `topAuthors`: Autores mais produtivos nas edições históricas.
  - `topKeywords`: Termos mais recorrentes nos trabalhos.
- `breakdowns`:
  - `yearDistribution`: Histórico de publicações por ano/edição (2012 a 2026).
  - `stageBreakdown`: Distribuição dos trabalhos por etapa da metodologia científica.

---

### 6. `GET /api/v1/articles/stats/correlations`
Calcula a matriz de contingência/coocorrência bidimensional entre duas dimensões metodológicas curadas.

#### Parâmetros de Query

| Parâmetro | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `fieldA` | `string` | `tools` | Primeiro eixo da matriz (ex: `tools`, `data_sources`). |
| `fieldB` | `string` | `data_sources` | Segundo eixo da matriz. |
| `limit` | `integer` | `6` | Dimensão máxima da matriz (N x N categorias principais). |

```bash
curl -s "https://ebbc-open-database.vercel.app/api/v1/articles/stats/correlations?fieldA=tools&fieldB=data_sources&limit=5" | jq .
```

*Retorna `{ rows: [...], cols: [...], matrix: [[...]] }`, ideal para heatmaps e grafos bipartidos em D3.js ou NetworkX.*

---

### 7. `GET /api/v1/articles/stats/temporal`
Retorna séries temporais com percentuais calculados ano a ano para análises de evolução tecnológica e metodológica:

```bash
curl -s "https://ebbc-open-database.vercel.app/api/v1/articles/stats/temporal?field=tools&limit=5" | jq .
```

---

### 8. `GET /api/v1/articles/stats/pareto`
Calcula a curva de acumulação e Pareto sobre os autores ou palavras-chave para verificação empírica de leis bibliométricas (ex: Lei de Lotka ou Bradford):

```bash
curl -s "https://ebbc-open-database.vercel.app/api/v1/articles/stats/pareto?field=authors&limit=15" | jq .
```

---

### 9. `GET /api/v1/articles/stats/scatter`
Retorna coordenadas $(x, y)$ agregadas e a equação linear de tendência ($y = ax + b$) para gráficos de dispersão bibliométrica:

```bash
curl -s "https://ebbc-open-database.vercel.app/api/v1/articles/stats/scatter" | jq .
```

---

## ⚙️ Endpoint de Configuração

### 10. `GET /api/v1/config`
Exibe os metadados institucionais da mantenedora, parâmetros do schema e campos ativos de busca.

```bash
curl -s "https://ebbc-open-database.vercel.app/api/v1/config" | jq .
```

---

## 📚 Dicionário de Dados do Artigo

Cada objeto no array `results` obedece rigorosamente ao contrato `schemas/article.v1.schema.json`:

| Campo | Tipo | Nulável | Descrição & Exemplo |
| :--- | :--- | :---: | :--- |
| `id` | `string` | Não | Identificador canônico primário unívoco (`ebbc-2022-441`). Formato: `ebbc-{ano}-{id_ojs}`. |
| `doi` | `string` | Não | DOI oficial com prefixo `https://doi.org/10...`. Se o artigo não possuir DOI na origem, contém rigorosamente `"N/A"`. |
| `title` | `string` | Não | Título completo e limpo do trabalho científico. |
| `year` | `integer` | Não | Ano da conferência ou edição dos anais (`2012` a `2026`). |
| `authors` | `array[string]` | Não | Lista normalizada de nomes dos autores (`["Vanz, Samile", "Grácio, Maria Cláudia"]`). |
| `abstract` | `string` | Não | Texto completo do resumo publicado nos anais. |
| `keywords` | `array[string]` | Não | Lista de termos e palavras-chave atribuídas pelos autores. |
| `url` | `string (URI)` | Não | Link canônico oficial para a página do trabalho no portal OJS do evento. |
| `pdf_url` | `string (URI)` | Não | Link direto para download do texto completo em PDF original. |
| `event_name`| `string` | Não | `"Encontro Brasileiro de Bibliometria e Cientometria"`. |
| `edition` | `string` | Não | Rótulo ordinal da conferência (`"8ª Edição"`, `"10ª Edição"`). |
| `tools` | `array[string]` | Não | Softwares e ferramentas metodológicas identificados no trabalho (ex: `["VOSviewer", "Python"]`). |
| `data_sources`| `array[string]`| Não | Bases de dados utilizadas na pesquisa (ex: `["Web of Science", "SciELO"]`). |
| `usage_stages`| `array[string]`| Não | Etapas de aplicação científica (ex: `["Análise de Redes", "Coleta de Dados"]`). |
| `identifies_tool` | `string` | Não | Classificação auxiliar (`"N/A"` se não aplicável). |
| `is_refined` | `boolean` | Não | `true` indicando que o trabalho passou pelo pipeline de validação e refinamento de metadados. |

---

## 🧪 Receitas Prontas para Cientometria (Python & R)

### Receita 1: Carregamento do Acervo Completo em Python (Pandas)

```python
import pandas as pd
import requests

# 1. Baixar o acervo integral despaginado em JSON
url = "https://ebbc-open-database.vercel.app/api/v1/articles/export?format=json"
data = requests.get(url).json()

# 2. Criar DataFrame Pandas
df = pd.DataFrame(data)

print(f"Total carregado: {len(df)} artigos")
print(f"Período: {df['year'].min()} a {df['year'].max()}")
print(f"Artigos com PDF direto: {df['pdf_url'].notna().sum()}/{len(df)}")

# 3. Softwares mais populares
tools_series = df.explode("tools")["tools"].dropna()
print("\nTop 5 Softwares Metodológicos no EBBC:")
print(tools_series.value_counts().head(5))
```

---

### Receita 2: Extração de PDFs em Lote no Terminal (Bash + curl + jq)

```bash
# Baixar os metadados e extrair uma lista de URLs diretas de PDFs de 2024
curl -s "https://ebbc-open-database.vercel.app/api/v1/articles/export?format=json&year=2024" \
  | jq -r '.[] | "\(.id) \(.pdf_url)"' > pdf_urls_2024.txt

# Download paralelo dos primeiros 5 PDFs
head -n 5 pdf_urls_2024.txt | while read -r id url; do
  echo "Baixando artigo $id..."
  curl -s -L "$url" -o "${id}.pdf"
done
```

---

### Receita 3: Análise em R com `httr` e `jsonlite`

```R
library(httr)
library(jsonlite)

# 1. Consultar a API de estatísticas consolidadas
res <- GET("https://ebbc-open-database.vercel.app/api/v1/articles/stats")
stats <- fromJSON(content(res, "text", encoding = "UTF-8"))

cat("Total de Trabalhos:", stats$totalRecords, "\n")
cat("Autores Únicos:", stats$metrics$uniqueAuthors, "\n")

# 2. Distribuição anual
year_dist <- as.data.frame(stats$breakdowns$yearDistribution)
print(year_dist)

# 3. Baixar exportação RIS para bibliometria no R (bibliometrix)
ris_url <- "https://ebbc-open-database.vercel.app/api/v1/articles/export?format=ris"
download.file(ris_url, destfile = "ebbc_acervo.ris", mode = "wb")
cat("Arquivo RIS salvo com sucesso para ingestão no bibliometrix!\n")
```

---

## 🛡️ Governança & Suporte

A API é mantida sob padrões de **Ciência Aberta** pela equipe da **BRAN Org**. Se você encontrar qualquer inconsistência nos metadados ou desejar sugerir melhorias:

- 🐛 **Reportar Problemas**: [GitHub Issues do EBBC Open Database](https://github.com/BRAN-Org/ebbc-open-database/issues)
- 📦 **Preservação Permanente no CERN/Zenodo**: [DOI: 10.5281/zenodo.23653261](https://doi.org/10.5281/zenodo.23653261)
- 📜 **Licenciamento**: Código fonte sob [GNU GPLv3](https://www.gnu.org/licenses/gpl-3.0.html) e dados sob [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).
