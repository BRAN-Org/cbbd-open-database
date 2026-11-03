# BRAN Web Database Template

<p align="center">
  <a href="https://github.com/BRAN-Org"><img src="https://img.shields.io/badge/BRAN%20Org-Open%20Data-blue.svg?logo=github" alt="BRAN Org"></a>
  <a href="provenance.json"><img src="https://img.shields.io/badge/Identifica%C3%A7%C3%A3o-100%25-brightgreen.svg" alt="Identificação"></a>
  <a href="schemas/article.v1.schema.json"><img src="https://img.shields.io/badge/Schema-article.v1-blue.svg" alt="Schema"></a>
  <a href="https://www.budapestopenaccessinitiative.org/"><img src="https://img.shields.io/badge/BOAI-Signatory-orange.svg" alt="BOAI Signatory"></a>
  <a href="https://www.go-fair.org/fair-principles/"><img src="https://img.shields.io/badge/FAIR-Compliant-green.svg" alt="FAIR Principles"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/Code-GPLv3-blue.svg" alt="GPLv3"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/Data-CC_BY--NC--SA_4.0-lightgrey.svg" alt="CC BY-NC-SA 4.0"></a>
</p>

Template padrão da **[BRAN Org](https://github.com/BRAN-Org)** para publicação de bases de dados acadêmicas e científicas abertas. Fornece uma **API REST pública de alta performance** e um **Dashboard Web interativo com gráficos SVG nativos**, sem necessidade de bundlers ou transpiladores pesados.

---

## ⚡ Recursos e Arquitetura

- **Zero-Build & Alta Performance**: Desenvolvido em Node.js com ES Modules (`"type": "module"`), dependendo apenas de `express` e `cors`.
- **Agnóstico a Dados**: Entidade, esquemas, facetas de busca, ordenação e filtros configurados centralmente via `config/dataset.config.json`.
- **Contratos Canônicos (JSON Schema)**: Validação estrita de schemas de artigos (`schemas/article.v1.schema.json`) e proveniência criptográfica (`schemas/provenance.v1.schema.json`).
- **REST API Pública**:
  - `GET /api/v1/:entity`: Busca textual global (`?q=`), filtros facetados, ordenação e paginação.
  - `GET /api/v1/:entity/stats`: Estatísticas consolidadas e distribuições temporais em tempo real.
  - `GET /api/v1/:entity/:key`: Consulta exata por ID ou DOI.
  - `GET /api/v1/:entity/export`: Streaming nos formatos CSV (BOM UTF-8 para Excel), JSON, BibTeX e RIS.
- **Painel Web com Gráficos SVG Nativos**: Visualizações vetoriais responsivas via [`pure-svg-charts`](https://github.com/GabrielBaiano/pure-svg-charts) com exportação SVG/PNG e API Sandbox com gerador de código (cURL, Python, JS).
- **Auditoria Automatizada (CRONA Bot)**: Scripts integrados para conferência estrita de integridade de dados e resolução de identificadores persistentes.

---

## 🚀 Como Criar uma Nova Base de Dados a Partir Deste Template

### 1. Clonar e Instalar
```bash
git clone https://github.com/BRAN-Org/bran-web-database-template.git meu-evento-open-database
cd meu-evento-open-database
npm install
```

### 2. Configurar o Dataset (`config/dataset.config.json`)
Defina os metadados do evento, entidade e facetas de busca:
```json
{
  "dataset": {
    "title": "Nome do Evento / Periódico Open Database",
    "description": "Descrição sucinta do acervo histórico e dos metadados.",
    "version": "1.0.0",
    "entityName": "articles",
    "primaryKey": "id",
    "secondaryKey": "doi"
  },
  "schema": {
    "searchFields": ["title", "abstract", "authors", "keywords"],
    "facets": [
      { "key": "year", "label": "Ano", "type": "number", "targetField": "year" },
      { "key": "author", "label": "Autor", "type": "string", "targetField": "authors" }
    ]
  }
}
```

### 3. Inserir Dados e Proveniência
- Insira o arquivo JSON estruturado em `data/<nome>_articles.json`.
- Registre o hash SHA-256 e metadados de extração em `provenance.json`.

### 4. Gerar README Inicial do Evento
```bash
# Gera o README.md conciso pré-formatado a partir de EVENT_README_TEMPLATE.md
npm run init:event
```

### 5. Validar Integridade e Testar
```bash
# Validar conformidade de schemas e hashes SHA-256
npm run data:validate

# Rodar auditoria profunda com CRONA Bot engine
npm run data:audit

# Executar suite de testes nativa (Node 20+ LTS)
npm test

# Iniciar servidor localmente
npm start
```
Acesse no navegador: `http://localhost:3000`

---

## 📁 Estrutura do Repositório

```
bran-web-database-template/
├── config/                  # dataset.config.json (configurações do evento e campos)
├── data/                    # Dataset de produção (ex: evento_articles.json)
├── schemas/                 # Schemas canônicos JSON Schema (article e provenance)
├── public/                  # Portal estático (HTML, CSS e bundle pure-svg-charts)
├── scripts/                 # Validadores, conversor CSV, auditoria CRONA e bundles
├── src/                     # Núcleo da API (dataManager, statsEngine, routes, exportEngine)
├── tests/                   # Testes unitários e testes de integração REST
├── .templatesyncignore      # Arquivos protegidos contra sobrescrita na sincronização
├── EVENT_README_TEMPLATE.md # Template conciso para os repositórios filhos de eventos
└── server.js                # Servidor Express principal
```

---

## 🔄 Sincronização Automática com Repositórios Filhos (Template Sync)

O repositório utiliza o GitHub Action `actions-template-sync` para propagar atualizações de infraestrutura (`src/`, `public/`, `schemas/`, `tests/`) para todos os repositórios de bases derivados da organização:

- **Arquivos Protegidos:** Diretórios de dados (`data/`), mock de testes (`mock/`), configurações locais (`config/dataset.config.json`), `README.md`, `provenance.json` e `package.json` são preservados via `.templatesyncignore`.
- **Integridade Garantida:** Cada PR de sincronização passa pelo `Template Sync Guard` e `CRONA Guard` para assegurar que nenhum dado de produção seja afetado.

---

## ⚖️ Licenciamento

- **Código e Engine:** [GNU General Public License v3.0 (GPL-3.0)](https://www.gnu.org/licenses/gpl-3.0.html) — Garante software livre e auditável.
- **Dados e Metadados Científicos:** [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/) — Livre para pesquisa acadêmica; vedado uso ou raspagem para modelos comerciais de IA sem autorização.