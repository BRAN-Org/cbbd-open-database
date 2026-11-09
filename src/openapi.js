/**
 * BRAN Org - OpenAPI 3.0 Specification Generator
 * Gera documento OpenAPI 3.0.3 dinamicamente a partir das configurações do dataset.
 */
export function generateOpenApiSpec(config) {
  const entity = config.dataset?.entityName || 'articles';
  const singular = config.dataset?.singularName || 'Artigo';
  const plural = config.dataset?.pluralName || 'Artigos';
  const title = config.dataset?.title || 'BRAN Academic Open Data API';
  const description = config.dataset?.description || 'API REST pública para acesso a dados acadêmicos e cientométricos.';
  const version = config.dataset?.version || '1.0.0';

  return {
    openapi: '3.0.3',
    info: {
      title: `${title} - REST API`,
      description: `${description}\n\nDisponibilizado pela **${config.organization?.name || 'BRAN Org'}** sob princípios FAIR e BOAI. Sem necessidade de autenticação (API pública aberta).`,
      version: version,
      contact: {
        name: config.organization?.name || 'BRAN Org',
        url: config.organization?.url || 'https://github.com/BRAN-Org'
      },
      license: {
        name: 'CC BY-NC-SA 4.0 / GNU GPLv3',
        url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/'
      }
    },
    servers: [
      {
        url: '/api/v1',
        description: 'Endpoint canônico da API v1'
      },
      {
        url: '/api',
        description: 'Alias de compatibilidade'
      }
    ],
    tags: [
      { name: plural, description: `Operações e consultas de ${plural.toLowerCase()}` },
      { name: 'Analytics', description: 'Métricas, correlações e estatísticas consolidadas' },
      { name: 'Export', description: 'Exportação em lote nos formatos JSON, CSV, BibTeX e RIS' },
      { name: 'Config', description: 'Metadados da base, instituição e facetas de busca' }
    ],
    paths: {
      [`/${entity}`]: {
        get: {
          tags: [plural],
          summary: `Listar ${plural.toLowerCase()} com filtros e paginação`,
          description: `Retorna uma lista paginada de ${plural.toLowerCase()} aplicando busca textual global (?q=), filtros facetados (?year=, ?author=, etc.) e ordenação configurável.`,
          operationId: `list${plural}`,
          parameters: [
            { name: 'q', in: 'query', description: 'Busca textual insensível a caixa e acentos em título, resumo, autores e palavras-chave', required: false, schema: { type: 'string' } },
            { name: 'year', in: 'query', description: 'Filtrar por ano/edição (permite múltiplos anos separados por vírgula, ex: 2022,2024)', required: false, schema: { type: 'string' } },
            { name: 'author', in: 'query', description: 'Filtrar por nome de autor', required: false, schema: { type: 'string' } },
            { name: 'keyword', in: 'query', description: 'Filtrar por palavra-chave ou tópico', required: false, schema: { type: 'string' } },
            { name: 'tool', in: 'query', description: 'Filtrar por software/ferramenta metodológica (ex: VOSviewer, Bibliometrix, Python, R)', required: false, schema: { type: 'string' } },
            { name: 'source', in: 'query', description: 'Filtrar por fonte de dados utilizada (ex: SciELO, Web of Science, Scopus)', required: false, schema: { type: 'string' } },
            { name: 'stage', in: 'query', description: 'Filtrar por etapa metodológica (ex: Coleta, Limpeza, Análise de Redes)', required: false, schema: { type: 'string' } },
            { name: 'limit', in: 'query', description: 'Quantidade de registros por página (padrão: 20; 0 para exportação integral despaginada)', required: false, schema: { type: 'integer', default: 20 } },
            { name: 'offset', in: 'query', description: 'Deslocamento da paginação (padrão: 0)', required: false, schema: { type: 'integer', default: 0 } },
            { name: 'sort', in: 'query', description: 'Campo de ordenação (title, year, doi)', required: false, schema: { type: 'string', default: 'year' } },
            { name: 'order', in: 'query', description: 'Direção da ordenação (asc ou desc)', required: false, schema: { type: 'string', enum: ['asc', 'desc'], default: 'desc' } }
          ],
          responses: {
            '200': {
              description: 'Lista de registros paginados com contadores totais',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/PaginatedResponse' }
                }
              }
            }
          }
        }
      },
      [`/${entity}/{key}`]: {
        get: {
          tags: [plural],
          summary: `Obter um ${singular.toLowerCase()} individual por ID ou DOI`,
          description: `Recupera um trabalho específico utilizando seu identificador canônico estruturado (ex: ebbc-2022-441) ou DOI (ex: 10.22477.01 ou URL-encoded). Prioriza correspondência exata.`,
          operationId: `get${singular}ByKey`,
          parameters: [
            { name: 'key', in: 'path', required: true, description: 'ID canônico ou DOI do registro', schema: { type: 'string' } }
          ],
          responses: {
            '200': {
              description: 'Registro encontrado',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Article' }
                }
              }
            },
            '404': {
              description: 'Registro não encontrado',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' }
                }
              }
            }
          }
        }
      },
      [`/${entity}/by-key`]: {
        get: {
          tags: [plural],
          summary: `Buscar ${singular.toLowerCase()} por valor de chave flexível`,
          description: 'Alternativa para busca por chave via query param ?value= ou wildcard de caminho.',
          operationId: `get${singular}ByQueryKey`,
          parameters: [
            { name: 'value', in: 'query', required: false, description: 'ID ou DOI para consulta', schema: { type: 'string' } }
          ],
          responses: {
            '200': { description: 'Registro encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Article' } } } },
            '404': { description: 'Registro não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        }
      },
      [`/${entity}/export`]: {
        get: {
          tags: ['Export'],
          summary: `Exportar ${plural.toLowerCase()} em formatos padronizados`,
          description: `Exporta o acervo integral ou filtrado nos formatos JSON estruturado, CSV com BOM UTF-8 (compatível com Excel/SPSS/R), BibTeX (.bib com URLs e eprint de PDFs para Zotero/LaTeX) ou RIS (para VOSviewer, Mendeley e Bibliometrix).`,
          operationId: 'exportDataset',
          parameters: [
            { name: 'format', in: 'query', required: false, description: 'Formato do arquivo exportado', schema: { type: 'string', enum: ['json', 'csv', 'bibtex', 'bib', 'ris'], default: 'json' } },
            { name: 'q', in: 'query', description: 'Filtrar exportação por busca textual', schema: { type: 'string' } },
            { name: 'year', in: 'query', description: 'Filtrar exportação por ano(s)', schema: { type: 'string' } },
            { name: 'author', in: 'query', description: 'Filtrar exportação por autor', schema: { type: 'string' } },
            { name: 'tool', in: 'query', description: 'Filtrar exportação por software', schema: { type: 'string' } },
            { name: 'source', in: 'query', description: 'Filtrar exportação por fonte de dados', schema: { type: 'string' } },
            { name: 'stage', in: 'query', description: 'Filtrar exportação por etapa', schema: { type: 'string' } },
            { name: 'limit', in: 'query', description: 'Limite de registros a exportar (padrão: todos quando omitido ou 0)', schema: { type: 'integer' } }
          ],
          responses: {
            '200': {
              description: 'Arquivo gerado para download ou payload JSON despaginado',
              content: {
                'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Article' } } },
                'text/csv': { schema: { type: 'string', format: 'binary' } },
                'application/x-bibtex': { schema: { type: 'string' } },
                'application/x-research-info-systems': { schema: { type: 'string' } }
              }
            }
          }
        }
      },
      [`/${entity}/stats`]: {
        get: {
          tags: ['Analytics'],
          summary: 'Obter métricas e agregações consolidadas',
          description: 'Calcula em tempo real totais, distribuições por ano, rankings das ferramentas mais usadas, fontes de dados, autores mais frequentes e análise de Pareto.',
          operationId: 'getStats',
          responses: {
            '200': {
              description: 'Métricas analíticas consolidadas',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/StatsResponse' } } }
            }
          }
        }
      },
      [`/${entity}/stats/correlations`]: {
        get: {
          tags: ['Analytics'],
          summary: 'Matriz de coocorrência 2D entre metadados curados',
          description: 'Gera a matriz de contingência/coocorrência bidimensional entre dois campos facetados (ex: tools x data_sources), ideal para grafos de rede cientométrica e mapas de calor.',
          operationId: 'getCorrelations',
          parameters: [
            { name: 'fieldA', in: 'query', description: 'Primeiro campo da matriz', schema: { type: 'string', default: 'tools' } },
            { name: 'fieldB', in: 'query', description: 'Segundo campo da matriz', schema: { type: 'string', default: 'data_sources' } },
            { name: 'limit', in: 'query', description: 'Dimensão máxima da matriz (N x N)', schema: { type: 'integer', default: 6 } }
          ],
          responses: {
            '200': {
              description: 'Matriz de correlações com eixos e valores numéricos',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      rows: { type: 'array', items: { type: 'string' } },
                      cols: { type: 'array', items: { type: 'string' } },
                      matrix: { type: 'array', items: { type: 'array', items: { type: 'integer' } } }
                    }
                  }
                }
              }
            }
          }
        }
      },
      [`/${entity}/stats/temporal`]: {
        get: {
          tags: ['Analytics'],
          summary: 'Distribuição temporal normalizada 100% por ano',
          description: 'Calcula proporções percentuais e frequências absolutas de termos selecionados ao longo dos anos para visualizações empilhadas.',
          operationId: 'getTemporalDistribution',
          parameters: [
            { name: 'field', in: 'query', description: 'Campo analisado (ex: tools, data_sources)', schema: { type: 'string', default: 'tools' } },
            { name: 'limit', in: 'query', description: 'Quantidade máxima de categorias no ranking', schema: { type: 'integer', default: 5 } }
          ],
          responses: {
            '200': {
              description: 'Séries temporais anuais',
              content: { 'application/json': { schema: { type: 'object' } } }
            }
          }
        }
      },
      [`/${entity}/stats/scatter`]: {
        get: {
          tags: ['Analytics'],
          summary: 'Dados de dispersão com linha de tendência',
          description: 'Gera coordenadas (x, y) e equação linear de tendência para análises de correlação.',
          operationId: 'getScatterData',
          responses: {
            '200': { description: 'Pontos e regressão linear', content: { 'application/json': { schema: { type: 'object' } } } }
          }
        }
      },
      [`/${entity}/stats/pareto`]: {
        get: {
          tags: ['Analytics'],
          summary: 'Análise de Pareto / Lei de Bradford',
          description: 'Calcula a concentração de frequência e o percentual cumulativo de termos ou autores para testes de leis bibliométricas.',
          operationId: 'getParetoData',
          parameters: [
            { name: 'field', in: 'query', description: 'Campo analisado (ex: authors, keywords, tools)', schema: { type: 'string', default: 'authors' } },
            { name: 'limit', in: 'query', description: 'Tamanho da amostra', schema: { type: 'integer', default: 10 } }
          ],
          responses: {
            '200': { description: 'Curva de Pareto acumulada', content: { 'application/json': { schema: { type: 'object' } } } }
          }
        }
      },
      '/config': {
        get: {
          tags: ['Config'],
          summary: 'Configuração pública do acervo',
          description: 'Metadados institucionais da organização mantenedora, parâmetros de busca, campos canônicos e facetas configuradas.',
          operationId: 'getConfig',
          responses: {
            '200': { description: 'Configuração estruturada', content: { 'application/json': { schema: { type: 'object' } } } }
          }
        }
      },
      '/openapi.json': {
        get: {
          tags: ['Config'],
          summary: 'Especificação OpenAPI 3.0 em JSON',
          description: 'Arquivo machine-readable para importação no Swagger UI, Postman, Insomnia ou geração de SDKs.',
          operationId: 'getOpenApiSpec',
          responses: {
            '200': { description: 'Documento OpenAPI 3.0.3', content: { 'application/json': { schema: { type: 'object' } } } }
          }
        }
      }
    },
    components: {
      schemas: {
        Article: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'ebbc-2022-441', description: 'Identificador canônico unívoco do trabalho' },
            doi: { type: 'string', example: 'https://doi.org/10.22477.01', description: 'DOI canônico atribuído na origem ou "N/A" se inexistente' },
            title: { type: 'string', example: 'O impacto da produção científica brasileira...', description: 'Título completo do trabalho' },
            year: { type: 'integer', example: 2022, description: 'Ano de realização / publicação dos anais' },
            authors: { type: 'array', items: { type: 'string' }, example: ['Samile Andrea de Souza Vanz'], description: 'Lista de autores' },
            keywords: { type: 'array', items: { type: 'string' }, example: ['Bibliometria', 'Cientometria'], description: 'Palavras-chave' },
            abstract: { type: 'string', description: 'Texto integral do resumo' },
            url: { type: 'string', format: 'uri', example: 'https://ebbc.inf.br/ojs/index.php/ebbc/article/view/441', description: 'Página oficial do artigo no OJS' },
            pdf_url: { type: 'string', format: 'uri', example: 'https://ebbc.inf.br/ojs/index.php/ebbc/article/download/441/378', description: 'Link direto para download do texto completo em PDF' },
            event_name: { type: 'string', example: 'Encontro Brasileiro de Bibliometria e Cientometria', description: 'Nome do evento científico' },
            edition: { type: 'string', example: '8ª Edição', description: 'Edição do evento' },
            tools: { type: 'array', items: { type: 'string' }, example: ['VOSviewer', 'Bibliometrix'], description: 'Softwares metodológicos identificados' },
            data_sources: { type: 'array', items: { type: 'string' }, example: ['Web of Science', 'SciELO'], description: 'Bases de dados bibliográficas consultadas' },
            usage_stages: { type: 'array', items: { type: 'string' }, example: ['Coleta', 'Análise de Redes'], description: 'Etapas de aplicação metodológica' },
            identifies_tool: { type: 'string', example: 'N/A' },
            is_refined: { type: 'boolean', example: true }
          }
        },
        PaginatedResponse: {
          type: 'object',
          properties: {
            total: { type: 'integer', example: 808, description: 'Total de trabalhos no acervo' },
            filteredCount: { type: 'integer', example: 42, description: 'Total de trabalhos que atendem aos filtros ativos' },
            limit: { type: 'integer', example: 20, description: 'Limite de registros por página' },
            offset: { type: 'integer', example: 0, description: 'Deslocamento da página atual' },
            results: { type: 'array', items: { $ref: '#/components/schemas/Article' } }
          }
        },
        StatsResponse: {
          type: 'object',
          properties: {
            totalRecords: { type: 'integer', example: 808 },
            entityName: { type: 'string', example: 'articles' },
            metrics: { type: 'object' },
            topLists: { type: 'object' },
            breakdowns: { type: 'object' },
            temporalStacked: { type: 'object' },
            pareto: { type: 'object' }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'Registro não encontrado' }
          }
        }
      }
    }
  };
}
