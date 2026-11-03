# {{DATASET_TITLE}}

<p align="center">
  <a href="https://doi.org/{{ZENODO_DOI}}"><img src="https://zenodo.org/badge/DOI/{{ZENODO_DOI}}.svg" alt="Zenodo DOI"></a>
  <a href="#-síntese-do-acervo--governança"><img src="{{RELIABILITY_SHIELD}}" alt="Confiabilidade"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/Licen%C3%A7a-CC_BY--NC--SA_4.0-lightgrey.svg" alt="CC BY-NC-SA 4.0"></a>
  <a href="#-como-usar-os-dados"><img src="https://img.shields.io/badge/Formatos-SQLite_%7C_CSV_%7C_JSON-blue.svg" alt="Formatos"></a>
</p>

{{DATASET_DESCRIPTION}}

---

## 📊 Síntese do Acervo & Governança

> [!NOTE]
> **Status de Confiabilidade:** {{RELIABILITY_BADGE}}  
> 📌 **Diagnóstico Metodológico:** {{RELIABILITY_JUSTIFICATION}}

| Métrica / Atributo | Detalhes do Acervo |
| :--- | :--- |
| **Período Histórico** | {{YEAR_RANGE}} |
| **Total de Trabalhos** | **{{TOTAL_RECORDS}} artigos científicos catalogados** |
| **Textos Completos (PDF)** | {{PDF_COUNT_TEXT}} |
| **Integridade Criptográfica** | Hash SHA-256 por arquivo e rastreabilidade estrita (`provenance.json`) |
| **Formatos Disponíveis** | SQLite3 (`.sqlite`), CSV (UTF-8 BOM), JSON, BibTeX (`.bib`), RIS (`.ris`) |
| **Licença dos Dados** | [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) (Uso acadêmico; vedada ingestão por IA comercial) |

---

## 📥 Download do Pacote Consolidado

O acervo bruto, o banco relacional completo e os arquivos individuais estão arquivados permanentemente no **CERN / Zenodo** sob DOI imutável:

- 🔗 **DOI Permanente:** [https://doi.org/{{ZENODO_DOI}}](https://doi.org/{{ZENODO_DOI}})
- 📦 **Conteúdo do .zip:** Banco SQLite3 (`{{PRIMARY_FILE_BASE}}.sqlite`), planilhas CSV consolidadas (`{{PRIMARY_FILE_BASE}}.csv`), metadados estruturados JSON, referências BibTeX/RIS e coleção completa de PDFs.

```bash
# Download direto do pacote completo via terminal
curl -LO "https://zenodo.org/records/{{ZENODO_RECORD_ID}}/files/{{ZENODO_BUNDLE_NAME}}"
unzip {{ZENODO_BUNDLE_NAME}}
```

---

## ⚡ Como Usar os Dados

### Python (Pandas)
```python
import pandas as pd

df = pd.read_json("data/{{PRIMARY_FILE_BASE}}.json")
print(f"Total: {len(df)} artigos | Período: {df['year'].min()} a {df['year'].max()}")
```

### SQLite3 (SQL no terminal)
```bash
sqlite3 data/{{PRIMARY_FILE_BASE}}.sqlite "SELECT year, COUNT(*) as total FROM articles GROUP BY year ORDER BY year;"
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
@misc{{{CITE_KEY}},
  author       = {BRAN Org},
  title        = {{{DATASET_TITLE}}},
  year         = {{{YEAR}}},
  howpublished = {Zenodo},
  doi          = {{{ZENODO_DOI}}},
  url          = {https://doi.org/{{ZENODO_DOI}}}
}
```

**ABNT:**
> BRAN ORG. **{{DATASET_TITLE}}**. Genebra: CERN / Zenodo, {{YEAR}}. DOI: {{ZENODO_DOI}}. Disponível em: &lt;https://doi.org/{{ZENODO_DOI}}&gt;.
