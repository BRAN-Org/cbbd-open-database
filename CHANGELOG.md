# Changelog — CBBD Open Database

Todas as alterações notáveis nesta base de dados aberta serão documentadas neste arquivo, seguindo o padrão de governança da **BRAN Org** e a convenção de [Keep a Changelog](https://keepachangelog.com/).

---

## [1.0.0] - 2026-11-03 (Lançamento Inicial & Mapeamento das 31 Edições Históricas)

### Feat
- **Diagnóstico e Mapeamento Histórico (1954–2026)**: Catalogação estruturada de todas as 31 edições históricas do CBBD em `data/cbbd_articles.json`.
- **Mapeamento de Acesso Digital**: Levantamento e vinculação de 16 edições com anais/coleções digitais abertas no Repositório Omeka da FEBAB (1º ao 4º, 6º ao 11º, 25º), Portal de Periódicos RBBD (26º e 27º) e Portal OJS de Eventos (28º ao 31º).
- **Documentação de Lacunas Físicas**: Mapeamento das 15 edições sem anais digitais nos servidores da FEBAB (V CBBD e XII ao XXIV CBBD, período 1983–2011), preservadas em formato impresso e CD-ROM físico sob custódia de bibliotecas depositárias.
- **Distribuição Multimodal de Dados**: Geração dos formatos SQLite3 (`data/cbbd_articles.sqlite`) e CSV com BOM UTF-8 (`data/cbbd_articles.csv`) para consumo analítico e estatístico.
- **REST API Pública & Dashboard Web**: Configuração agnóstica dos endpoints `/api/v1/articles`, `/api/v1/articles/stats` e exportação em streaming nos formatos CSV, BibTeX e RIS.
- **Governança & Proveniência Criptográfica**: Geração de `provenance.json` com hash SHA-256 e classificação `health_level: "RED"` documentando o status de acervo fragmentado e auditoria de integridade.

### Docs
- `README.md`: Síntese de governança com badge de confiabilidade vermelha, alerta metodológico e tabela cronológica completa das 31 edições com links diretos.
- Metadados canônicos adicionados em `.zenodo.json` e `CITATION.cff`.

### Chore / Test
- Configuração de facetas e ordenação em `config/dataset.config.json`.
- Adição da regra de compilação do CBBD no utilitário `scripts/init_event.js`.
- Bateria de testes automatizados (`tests/unit.test.js` e `tests/api.test.js`) validada com 21 testes passando.
