import { Router } from 'express';
import { getDatasetConfig } from './config.js';
import { queryItems, getItemByKey } from './dataManager.js';
import { 
  calculateStats, 
  calculateCooccurrenceMatrix, 
  calculateTemporalStacked, 
  calculateScatterData, 
  calculateParetoData 
} from './statsEngine.js';
import { exportDataset } from './exportEngine.js';

export function createApiRouter() {
  const router = Router();
  const config = getDatasetConfig();
  const entityName = config.dataset?.entityName || 'articles';

  // 1. Configuração pública
  router.get('/config', (req, res) => {
    res.json(getDatasetConfig());
  });

  // 2. Estatísticas consolidadas
  router.get(`/${entityName}/stats`, (req, res) => {
    res.json(calculateStats());
  });

  // 3. Matriz de Coocorrência / Correlações Internas (Heatmap)
  router.get(`/${entityName}/stats/correlations`, (req, res) => {
    const fieldA = req.query.fieldA || 'tools';
    const fieldB = req.query.fieldB || 'data_sources';
    const limit = parseInt(req.query.limit || '6', 10);
    res.json(calculateCooccurrenceMatrix(fieldA, fieldB, limit));
  });

  // 4. Distribuição Temporal 100% Empilhada por Ano
  router.get(`/${entityName}/stats/temporal`, (req, res) => {
    const field = req.query.field || 'tools';
    const limit = parseInt(req.query.limit || '5', 10);
    res.json(calculateTemporalStacked(field, limit));
  });

  // 5. Análise de Dispersão (Scatter Plot)
  router.get(`/${entityName}/stats/scatter`, (req, res) => {
    res.json(calculateScatterData());
  });

  // 6. Análise de Pareto / Bradford
  router.get(`/${entityName}/stats/pareto`, (req, res) => {
    const field = req.query.field || 'authors';
    const limit = parseInt(req.query.limit || '10', 10);
    res.json(calculateParetoData(field, limit));
  });

  // 7. Endpoint de exportação (CSV / JSON)
  router.get(`/${entityName}/export`, (req, res) => {
    exportDataset(req, res);
  });

  // 8. Busca flexível por DOI / ID via wildcard de rota
  router.use(`/${entityName}/by-key`, (req, res, next) => {
    let rawKey = req.path.replace(/^\//, '');
    if (!rawKey && req.query.value) {
      rawKey = req.query.value;
    }

    if (!rawKey) return next();

    const item = getItemByKey(rawKey);
    if (!item) {
      return res.status(404).json({ error: `Registro com a chave '${rawKey}' não encontrado.` });
    }
    return res.json(item);
  });

  // 9. Busca individual por ID/DOI percent-encoded
  router.get(`/${entityName}/:key`, (req, res) => {
    const item = getItemByKey(req.params.key);
    if (!item) {
      return res.status(404).json({ error: `Registro com a chave '${req.params.key}' não encontrado.` });
    }
    return res.json(item);
  });

  // 10. Lista geral de itens com filtros, busca textual, ordenação e paginação
  router.get(`/${entityName}`, (req, res) => {
    const result = queryItems(req.query);
    res.json(result);
  });

  return router;
}
