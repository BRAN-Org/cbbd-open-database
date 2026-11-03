# Changelog — CBBD Open Database

Todas as alterações notáveis nesta base de dados aberta serão documentadas neste arquivo, seguindo o padrão de governança da **BRAN Org** e a convenção de [Keep a Changelog](https://keepachangelog.com/).

---

## [1.0.0] - 2026-11-03 (Lançamento Inicial & Ingestão Completa dos Anais)

### Feat
- **Ingestão Canônica dos Anais (3.385 Trabalhos)**: Coleta, parsing e consolidação de 3.385 artigos e comunicações científicas de todas as edições digitalizadas do CBBD (1954–2026) em `data/cbbd_articles.json`.
- **Harvester Canônico Automatizado**: Implementação do script `scripts/scrape_cbbd.py` para extração via OAI-PMH (Portal OJS e RBBD) e Dublin Core XML (Repositório Omeka da FEBAB), com forçamento de pilha IPv4 para robustez de rede.
- **Enriquecimento Metodológico**: 3.271 trabalhos catalogados com resumo integral (96,6% de preenchimento), metadados de autoria sanitizados, palavras-chave e URLs de texto completo.
- **Diagnóstico e Mapeamento Histórico (1954–2026)**: Catalogação documental das 31 edições históricas e mapeamento do gap de 15 edições sem anais digitais nos servidores da FEBAB (V CBBD e XII ao XXIV CBBD, período 1983–2011).
- **REST API Pública & Dashboard Web**: Configuração agnóstica dos endpoints `/api/v1/articles`, `/api/v1/articles/stats` e exportação em streaming nos formatos CSV, BibTeX e RIS.
- **Governança & Proveniência Criptográfica**: Geração de `provenance.json` com hash SHA-256 e classificação `health_level: "RED"` documentando o status de acervo fragmentado e auditoria de integridade.

### Docs
- `README.md`: Síntese de governança com badge de confiabilidade vermelha, métricas consolidadas (3.385 trabalhos) e tabela cronológica completa das 31 edições com links diretos.
- Metadados canônicos adicionados em `.zenodo.json` e `CITATION.cff`.

### Chore / Test
- Configuração de facetas (ano, autor, palavra-chave, edição, plataforma, UF) em `config/dataset.config.json`.
- Bateria de testes automatizados (`tests/unit.test.js` e `tests/api.test.js`) validada com 21/21 testes passando.
- Validação de schema (`npm run data:validate` e `npm run data:audit`) concluída com 0 erros.
