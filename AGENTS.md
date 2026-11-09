# Protocolo de Atuação para Agentes e Desenvolvedores (AGENTS.md)

Instruções obrigatórias para agentes de IA e desenvolvedores que atuam neste repositório de base de dados acadêmica da **BRAN Org**.

---

## 1. Natureza do Repositório (FAIR Data Package)

Este repositório é um **pacote de dados acadêmicos puros (Data-as-Code)**.
- **Não contém servidor web, Express, frontend ou Vercel**: A API e interface são centralizadas no portal da organização.
- **Arquivos canônicos de dados (`data/`)**:
  - `<dataset>_articles.json`: Matriz principal em JSON estruturado.
  - `<dataset>_articles.csv`: Tabela RFC 4180 UTF-8 com BOM (compatível com Excel/R).
  - `<dataset>_articles.sqlite`: Banco relacional SQLite3 com busca textual FTS5.
- **Manifesto de proveniência (`provenance.json`)**: Guarda os metadados da coleta, taxa de identificação e hashes SHA-256 de todos os arquivos.

---

## 2. Regras de Ouro (Invioláveis)

1. **Zero DOIs Inventados**: Nunca invente identificadores. Se o artigo original não possui DOI emitido pela editora/evento:
   - Defina `doi: "N/A"`.
   - Defina obrigatoriamente `id: "<evento>-<ano>-<slug_ou_id_origem>"` (ex: `cbbd-2024-art001`).
   - Artigos sem `id` e sem `doi` violam o schema e reprovam no CI da CRONA.
2. **Fidelidade Criptográfica (SHA-256)**: Nunca edite os hashes manualmente no `provenance.json`. Sempre execute o build determinístico para que o script calcule os hashes reais.
3. **Respeito aos Schemas**: Os dados devem satisfazer 100% de [`schemas/article.v1.schema.json`](schemas/article.v1.schema.json).
4. **Commits Convencionais**: Padrão estrito Conventional Commits (`feat(data): ...`, `fix(metadata): ...`, `chore(audit): ...`). Zero menções a conversas ou prompts nos commits.
5. **Versionamento CalVer**: Tags de release seguem estritamente `vYYYY.MM` (ex: `v2026.11`).

---

## 3. Fluxo de Trabalho do Agente

### Passo 1: Extração ou Atualização de Dados
Quando minerar ou sanitizar artigos:
- Escreva o script de extração em `scripts/` (ex: `scrape_<evento>.py`).
- Salve a matriz em `data/<dataset>_articles.json`.

### Passo 2: Compilação dos Formatos Derivados
Execute o pipeline unificado de build:
```bash
python3 scripts/build_dataset.py
```
O script valida o schema JSON, compila o `.csv`, compila o `.sqlite` e atualiza os hashes SHA-256 no `provenance.json`.

### Passo 3: Geração e Preenchimento da Documentação (`README.md`)
Nunca escreva o `README.md` com corporativismos, badges inflados ou suposições:
1. Verifique os metadados no `.zenodo.json` (título e descrição do acervo).
2. Execute o gerador automático:
   ```bash
   python3 scripts/init_event.py
   ```
3. O script lê o arquivo [`EVENT_README_TEMPLATE.md`](EVENT_README_TEMPLATE.md), calcula automaticamente a contagem real de trabalhos, intervalo de anos, quantidade de PDFs preservados e compila o `README.md` padronizado.
4. Ajuste manualmente apenas o **Badge de Confiabilidade** e sua justificativa metodológica no topo do `README.md`:
   - 🟢 **Auditado e Validado**: Cobertura censitária, DOIs conferidos na íntegra.
   - 🟠 **Em Averiguação**: Acervo sob auditoria cruzada ou saneamento ativo.
   - 🟡 **Fiel à Fonte (Incompleto)**: 100% fiel ao portal original, mas a fonte primária possui lacunas históricas (ex: ausência de digitalização das primeiras edições).
   - 🔴 **Crítico | Acervo Fragmentado**: Grandes lacunas documentais na origem.

### Passo 4: Verificação da CRONA antes do Commit
Rode a auditoria local:
```bash
python3 scripts/crona_audit_engine.py --file data/<dataset>_articles.json --schema schemas/article.v1.schema.json --provenance provenance.json
```
Se a saída for `✅ Em estrita conformidade com o schema JSON`, os dados estão prontos para envio via PR ou push na `main`.
