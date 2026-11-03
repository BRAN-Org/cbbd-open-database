import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getDatasetConfig } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DEFAULT_DATA_DIR = join(__dirname, '../data');

let loadedItems = [];

/**
 * Normaliza string para comparação case-insensitive sem acentos
 */
export function normalizeString(str) {
  if (!str) return '';
  return String(str)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/**
 * Carrega todos os arquivos JSON do diretório de dados em memória
 */
export function loadData() {
  if (loadedItems.length > 0) return loadedItems;

  const targetDir = process.env.DATASET_DIR
    ? (isAbsolute(process.env.DATASET_DIR) ? process.env.DATASET_DIR : join(process.cwd(), process.env.DATASET_DIR))
    : DEFAULT_DATA_DIR;

  const items = [];
  try {
    if (existsSync(targetDir)) {
      const files = readdirSync(targetDir).filter(f => f.endsWith('.json'));
      for (const file of files) {
        const filePath = join(targetDir, file);
        try {
          const raw = readFileSync(filePath, 'utf-8');
          const data = JSON.parse(raw);
          if (Array.isArray(data)) {
            items.push(...data);
          } else if (data && typeof data === 'object') {
            items.push(data);
          }
        } catch (err) {
          console.error(`⚠️ Erro ao ler arquivo ${file}:`, err.message);
        }
      }
    }
  } catch (err) {
    console.error('⚠️ Erro ao acessar diretório data:', err.message);
  }

  loadedItems = items;
  console.log(`📦 [BRAN Template] Total de registros carregados em memória (${targetDir}): ${loadedItems.length}`);
  return loadedItems;
}

/**
 * Força recarregamento do cache (útil para testes ou atualização de arquivos)
 */
export function reloadData() {
  loadedItems = [];
  return loadData();
}

/**
 * Retorna todos os itens
 */
export function getAllItems() {
  if (loadedItems.length === 0) loadData();
  return loadedItems;
}

/**
 * Executa consultas com busca textual, filtros por facetas, ordenação e paginação
 */
export function queryItems(params = {}) {
  let items = [...getAllItems()];
  const config = getDatasetConfig();
  const searchFields = config.schema?.searchFields || ['title', 'abstract'];

  // 1. Busca textual global
  if (params.search) {
    const term = normalizeString(params.search);
    items = items.filter(item => {
      return searchFields.some(field => {
        const val = item[field];
        if (!val) return false;
        if (Array.isArray(val)) {
          return val.some(v => normalizeString(v).includes(term));
        }
        return normalizeString(val).includes(term);
      });
    });
  }

  // 2. Filtros dinâmicos por Faceta (config/dataset.config.json)
  const facets = config.schema?.facets || [];
  for (const facet of facets) {
    const queryVal = params[facet.key];
    if (queryVal !== undefined && queryVal !== null && queryVal !== '') {
      const target = facet.targetField || facet.key;
      
      if (facet.type === 'number') {
        const nums = String(queryVal).split(',').map(n => parseInt(n.trim(), 10)).filter(n => !isNaN(n));
        if (nums.length > 0) {
          items = items.filter(item => nums.includes(item[target]));
        }
      } else {
        const strVal = normalizeString(queryVal);
        items = items.filter(item => {
          const val = item[target];
          if (!val) return false;
          if (Array.isArray(val)) {
            return val.some(v => normalizeString(v).includes(strVal));
          }
          return normalizeString(val).includes(strVal);
        });
      }
    }
  }

  // Filtro extra genérico para booleano has_tool ou similares
  if (params.has_tool !== undefined) {
    const isTrue = params.has_tool === 'true' || params.has_tool === '1';
    items = items.filter(item => {
      const tools = item.tools || [];
      return isTrue ? tools.length > 0 : tools.length === 0;
    });
  }

  const totalFiltered = items.length;

  // 3. Ordenação (Sort & Order)
  const sortKey = params.sort || config.dataset?.primaryKey || 'title';
  const order = (params.order || 'asc').toLowerCase();

  items.sort((a, b) => {
    let valA = a[sortKey] ?? '';
    let valB = b[sortKey] ?? '';

    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();

    if (valA < valB) return order === 'asc' ? -1 : 1;
    if (valA > valB) return order === 'asc' ? 1 : -1;
    return 0;
  });

  // 4. Paginação
  const limit = params.limit ? parseInt(params.limit, 10) : 20;
  const offset = params.offset ? parseInt(params.offset, 10) : 0;

  const paginatedResults = (limit > 0)
    ? items.slice(offset, offset + limit)
    : items;

  return {
    total: getAllItems().length,
    filteredCount: totalFiltered,
    limit: limit > 0 ? limit : totalFiltered,
    offset,
    results: paginatedResults
  };
}

/**
 * Busca um item individual por DOI, ID ou Título
 */
export function getItemByKey(rawKey) {
  if (!rawKey) return null;
  const items = getAllItems();
  
  let cleanKey;
  try {
    cleanKey = decodeURIComponent(rawKey).trim();
  } catch {
    cleanKey = rawKey.trim();
  }

  const normKey = normalizeString(cleanKey);

  return items.find(item => {
    // 1. Checa ID
    if (item.id && normalizeString(item.id) === normKey) return true;

    // 2. Checa DOI
    if (item.doi) {
      const normDoi = normalizeString(item.doi);
      if (normDoi === normKey) return true;
      if (normDoi.includes(normKey) || normKey.includes(normDoi)) return true;
    }

    // 3. Checa Título exato/normalizado
    if (item.title && normalizeString(item.title) === normKey) return true;

    return false;
  }) || null;
}
