import { readFileSync, existsSync } from 'node:fs';
import { join, dirname, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DEFAULT_CONFIG_PATH = join(__dirname, '../config/dataset.config.json');

let cachedConfig = null;

export function getDatasetConfig() {
  if (cachedConfig) return cachedConfig;

  const targetPath = process.env.CONFIG_PATH
    ? (isAbsolute(process.env.CONFIG_PATH) ? process.env.CONFIG_PATH : join(process.cwd(), process.env.CONFIG_PATH))
    : DEFAULT_CONFIG_PATH;

  try {
    if (existsSync(targetPath)) {
      const rawData = readFileSync(targetPath, 'utf-8');
      cachedConfig = JSON.parse(rawData);
      return cachedConfig;
    }
  } catch (err) {
    console.error('⚠️ [BRAN Template] Falha ao carregar arquivo de configuração:', err.message);
  }

  // Fallback padrão se arquivo não for encontrado
  return {
    organization: { name: 'BRAN Org', url: 'https://github.com/BRAN-Org' },
    dataset: {
      title: 'BRAN Academic Database Template',
      description: 'API e Dashboard de Dados Acadêmicos',
      entityName: 'articles',
      singularName: 'Artigo',
      pluralName: 'Artigos',
      primaryKey: 'doi'
    },
    schema: { searchFields: ['title', 'abstract'], facets: [] },
    stats: { topLists: [], breakdowns: [] }
  };
}
