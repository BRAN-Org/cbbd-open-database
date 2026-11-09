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
| **Formatos Disponíveis** | SQLite3 (`.sqlite`), CSV (UTF-8 BOM), JSON estruturado |
| **Licença dos Dados** | [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) (Uso acadêmico; vedada ingestão por IA comercial) |

---

## 📥 Download do Pacote Consolidado (Zenodo)

O acervo bruto, o banco relacional completo e os arquivos individuais estão arquivados permanentemente no **CERN / Zenodo** sob DOI imutável:

- 🔗 **DOI Permanente:** [https://doi.org/{{ZENODO_DOI}}](https://doi.org/{{ZENODO_DOI}})
- 📦 **Conteúdo do .zip:** Banco SQLite3 (`{{PRIMARY_FILE_BASE}}.sqlite`), planilhas CSV consolidadas (`{{PRIMARY_FILE_BASE}}.csv`), metadados estruturados JSON, referências BibTeX/RIS e dicionário de dados.

```bash
# Download direto do pacote completo via terminal
curl -LO "https://zenodo.org/records/{{ZENODO_RECORD_ID}}/files/{{ZENODO_BUNDLE_NAME}}"
unzip {{ZENODO_BUNDLE_NAME}}
```

---

## ⚡ Como Usar os Dados

### Python (Pandas & SQLite3)
```python
import pandas as pd
import sqlite3

# Leitura via CSV
df = pd.read_csv("data/{{PRIMARY_FILE_BASE}}.csv")
print(f"Total: {len(df)} artigos | Período: {df['year'].min()} a {df['year'].max()}")

# Busca Full-Text via SQLite3
conn = sqlite3.connect("data/{{PRIMARY_FILE_BASE}}.sqlite")
res = conn.execute("SELECT title, year, authors FROM articles_fts WHERE articles_fts MATCH 'informacao'")
print(res.fetchall()[:5])
```

### R
```R
library(readr)
df <- read_csv("data/{{PRIMARY_FILE_BASE}}.csv")
summary(df$year)
```

### DuckDB
```sql
SELECT year, count(*) as total
FROM 'data/{{PRIMARY_FILE_BASE}}.csv'
GROUP BY year
ORDER BY year DESC;
```

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
