import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Script Utilitário para conversão de CSV bruto em JSON padronizado para a pasta data/
 * Uso: node scripts/convert_csv_to_json.js caminho/para/arquivo.csv [nome_saida.json]
 */
function convertCsvToJson() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log(`
ℹ️ [BRAN Template CLI] Conversor de CSV para JSON
Uso: node scripts/convert_csv_to_json.js <caminho-do-csv> [nome-arquivo-saida.json]

Exemplo:
  node scripts/convert_csv_to_json.js ./meu_dataset.csv dataset_convertido.json
    `);
    process.exit(0);
  }

  const csvPath = args[0];
  const outputFileName = args[1] || 'dataset_converted.json';

  if (!existsSync(csvPath)) {
    console.error(`❌ Erro: Arquivo CSV '${csvPath}' não encontrado.`);
    process.exit(1);
  }

  try {
    const rawContent = readFileSync(csvPath, 'utf-8');
    const lines = rawContent.split(/\r?\n/).filter(line => line.trim().length > 0);

    if (lines.length === 0) {
      console.error('❌ Erro: Arquivo CSV vazio.');
      process.exit(1);
    }

    // Função auxiliar para parsear linha CSV respeitando aspas
    const parseCsvLine = (line) => {
      const result = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim().replace(/^"|"$/g, ''));
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim().replace(/^"|"$/g, ''));
      return result;
    };

    const headers = parseCsvLine(lines[0]);
    const items = [];

    for (let i = 1; i < lines.length; i++) {
      const values = parseCsvLine(lines[i]);
      if (values.length !== headers.length) continue;

      const obj = {};
      headers.forEach((header, idx) => {
        let val = values[idx];
        // Tentar converter listas separadas por vírgula ou ponto-e-vírgula se aplicável
        if (['authors', 'autores', 'keywords', 'palavras_chave', 'tools', 'ferramentas', 'data_sources'].includes(header.toLowerCase())) {
          val = val ? val.split(/[;,]/).map(s => s.trim()).filter(Boolean) : [];
        } else if (header.toLowerCase() === 'year' || header.toLowerCase() === 'ano') {
          val = parseInt(val, 10) || val;
        }
        obj[header] = val;
      });
      items.push(obj);
    }

    const outputPath = join(__dirname, '../data', outputFileName);
    writeFileSync(outputPath, JSON.stringify(items, null, 2), 'utf-8');

    console.log(`✅ Sucesso! ${items.length} registros convertidos e salvos em: ${outputPath}`);
  } catch (err) {
    console.error('❌ Erro na conversão:', err.message);
    process.exit(1);
  }
}

convertCsvToJson();
