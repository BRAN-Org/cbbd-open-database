# Guia de Contribuição e Manutenção — Database Web Template

> **Diretrizes para Alterações Estruturais, Frontend, Layouts e APIs das Bases de Dados da BRAN Org**

Este repositório é o **TEMPLATE BASE OFICIAL** utilizado pela **BRAN Org** para instanciar e gerenciar bases de dados acadêmicas (como `ebbc-open-database`, `enancib-open-database`, `abec-open-database`, etc.).

---

## Regra de Ouro da Arquitetura de Templates

> **NUNCA altere o layout, estilos CSS, componentes de interface, servidor backend (`server.js`) ou scripts de infraestrutura diretamente em um repositório de base de dados final.**
> 
> **Todas as mudanças estruturais e visuais DEVEM ser realizadas NESTE REPOSITÓRIO TEMPLATE.**

Quando uma alteração é aprovada e mesclada na branch `main` deste template, o robô de sincronização (*GitHub Template Sync*) propaga automaticamente as melhorias de código e layout para **TODAS** as bases de dados ativas da organização!

---

## Papel dos Bots no Ciclo de Vida da Base

- **CRONA (`@crona-bot`)**: Mantém a governança de dados. Em todo PR que toque dados ou proveniência, a CRONA faz a validação formal de schema, executa testes de resolução de DOIs e submete aprovação automática (`APPROVE`) quando tudo estiver conforme.
- **BRAN (`@bran-bot`)**: Valida commits semânticos e executa os testes automatizados do servidor web (`npm test`).

---

## Como Contribuir com Mudanças no Template

### 1. Ambiente Local
1. Clone este repositório template:
   ```bash
   git clone https://github.com/BRAN-Org/bran-web-database-template.git
   cd bran-web-database-template
   ```
2. Instale as dependências e inicie o ambiente de desenvolvimento local:
   ```bash
   npm install
   npm run dev
   ```
3. Teste os componentes de visualização com os dados de demonstração contidos em `mock/` ou `data/`.
4. Para rodar a auditoria de integridade localmente (idêntica à executada pela CRONA):
   ```bash
   npm run data:audit
   ```

### 2. Cuidados com o `.templatesyncignore`
Ao adicionar novos arquivos de infraestrutura ao template, certifique-se de respeitar o arquivo `.templatesyncignore`:
- Pastas e arquivos como `data/`, `provenance.json` e `config/dataset.config.json` contêm dados **específicos de cada evento/acervo** e são ignorados pelo sync para não sobrescrever os dados reais das bases de dados consumidoras.

### 3. Submetendo Alterações no Template
1. Crie uma branch descritiva a partir da `development`:
   ```bash
   git checkout -b feat/novo-header-responsivo development
   ```
2. Garanta que o servidor `server.js` e as rotas de API continuam passando nos testes (`npm test`).
3. Abra o Pull Request com destino à branch **`development`** (`base: development`).
4. Após homologação na `development`, o merge na `main` dispara o *Template Sync* que atualiza todas as bases de dados da organização.

---

Obrigado por ajudar a evoluir a infraestrutura visual e tecnológica da BRAN Org!
