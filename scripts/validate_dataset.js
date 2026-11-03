import { loadData } from '../src/dataManager.js';
import { getDatasetConfig } from '../src/config.js';

/**
 * Validador de dados para garantir integridade antes do deploy
 */
function validateDataset() {
  console.log('🔍 [BRAN Template CLI] Iniciando validação dos datasets na pasta data/...\n');
  const items = loadData();
  const config = getDatasetConfig();

  if (items.length === 0) {
    console.error('❌ NENHUM REGISTRO ENCONTRADO na pasta data/. Adicione arquivos .json válidos.');
    process.exit(1);
  }

  let warnings = 0;
  let errors = 0;

  const primaryKey = config.dataset?.primaryKey || 'doi';
  console.log(`📋 Chave Primária esperada: '${primaryKey}'`);
  console.log(`📋 Total de registros encontrados: ${items.length}\n`);

  items.forEach((item, index) => {
    // Check primary key
    if (!item[primaryKey] && !item.id) {
      console.warn(`⚠️ Aviso [Item #${index + 1}]: Não possui '${primaryKey}' nem 'id'.`);
      warnings++;
    }

    // Check title
    if (!item.title && !item.titulo) {
      console.error(`❌ Erro [Item #${index + 1}]: Campo obrigatório 'title' está ausente.`);
      errors++;
    }

    // Check year
    if (!item.year && !item.ano) {
      console.warn(`⚠️ Aviso [Item #${index + 1}]: Campo 'year' está ausente.`);
      warnings++;
    }
  });

  console.log('-------------------------------------------------------');
  console.log(`📊 Resultado da Validação: ${errors} erros, ${warnings} avisos.`);

  if (errors > 0) {
    console.error('❌ Falha na validação do dataset. Corrija os erros acima.');
    process.exit(1);
  } else {
    console.log('✅ Validação concluída com sucesso! Dataset pronto para uso.');
  }
}

validateDataset();
