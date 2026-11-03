import { queryItems } from './dataManager.js';
import { getDatasetConfig } from './config.js';

/**
 * Sanitiza texto para campos BibTeX escapando caracteres especiais
 */
function escapeBibtex(str) {
  if (!str) return '';
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/{/g, '\\{')
    .replace(/}/g, '\\}');
}

/**
 * Extrai o sobrenome do primeiro autor ou fallback para chave BibTeX
 */
function getCiteKey(item, index) {
  let authorKey = 'bran';
  if (Array.isArray(item.authors) && item.authors.length > 0) {
    const firstAuthor = typeof item.authors[0] === 'object' ? item.authors[0].name : item.authors[0];
    const parts = String(firstAuthor).trim().split(/\s+/);
    authorKey = parts[parts.length - 1].toLowerCase().replace(/[^a-z0-9]/g, '') || 'author';
  }
  const yr = item.year || item.publication_year || 'nodate';
  const cleanId = item.id ? String(item.id).replace(/[^a-zA-Z0-9]/g, '') : `${index + 1}`;
  return `${authorKey}_${yr}_${cleanId}`;
}

/**
 * Converte autores para padrão BibTeX separado por ' and '
 */
function formatBibtexAuthors(authors) {
  if (!authors) return '';
  const list = Array.isArray(authors) ? authors : [authors];
  return list.map(a => {
    const name = typeof a === 'object' ? a.name : a;
    return escapeBibtex(name);
  }).join(' and ');
}

/**
 * Gera arquivo de exportação no formato BibTeX (.bib)
 */
function generateBibtex(items, config) {
  const defaultBooktitle = config.dataset?.title || config.organization?.name || 'BRAN Academic Open Data';
  
  return items.map((item, idx) => {
    const citeKey = getCiteKey(item, idx);
    const yr = item.year || item.publication_year || '';
    const cleanDoi = item.doi ? String(item.doi).replace(/^https?:\/\/(dx\.)?doi\.org\//, '') : '';
    const booktitle = item.event_name || item.issue || defaultBooktitle;
    
    let bib = `@inproceedings{${citeKey},\n`;
    bib += `  title = {${escapeBibtex(item.title)}},\n`;
    if (item.authors) {
      bib += `  author = {${formatBibtexAuthors(item.authors)}},\n`;
    }
    if (yr) {
      bib += `  year = {${yr}},\n`;
    }
    bib += `  booktitle = {${escapeBibtex(booktitle)}},\n`;
    if (cleanDoi && cleanDoi !== 'N/A') {
      bib += `  doi = {${cleanDoi}},\n`;
    }
    if (item.pdf_url || item.url) {
      bib += `  url = {${item.pdf_url || item.url}},\n`;
    }
    if (item.abstract) {
      bib += `  abstract = {${escapeBibtex(item.abstract)}},\n`;
    }
    if (Array.isArray(item.keywords) && item.keywords.length > 0) {
      bib += `  keywords = {${escapeBibtex(item.keywords.join(', '))}},\n`;
    }
    bib += `}\n`;
    return bib;
  }).join('\n');
}

/**
 * Gera arquivo de exportação no formato RIS (.ris) para VOSviewer, Zotero, Mendeley
 */
function generateRis(items, config) {
  const defaultSecondaryTitle = config.dataset?.title || config.organization?.name || 'BRAN Academic Open Data';

  return items.map(item => {
    const yr = item.year || item.publication_year || '';
    const cleanDoi = item.doi ? String(item.doi).replace(/^https?:\/\/(dx\.)?doi\.org\//, '') : '';
    const secTitle = item.event_name || item.issue || defaultSecondaryTitle;

    let ris = `TY  - CONF\n`;
    ris += `TI  - ${item.title || ''}\n`;

    if (Array.isArray(item.authors)) {
      item.authors.forEach(a => {
        const name = typeof a === 'object' ? a.name : a;
        if (name) ris += `AU  - ${name}\n`;
      });
    }

    if (yr) {
      ris += `PY  - ${yr}\n`;
    }

    ris += `T2  - ${secTitle}\n`;

    if (cleanDoi && cleanDoi !== 'N/A') {
      ris += `DO  - ${cleanDoi}\n`;
    }

    if (item.pdf_url || item.url) {
      ris += `UR  - ${item.pdf_url || item.url}\n`;
    }

    if (item.abstract) {
      ris += `AB  - ${item.abstract}\n`;
    }

    if (Array.isArray(item.keywords)) {
      item.keywords.forEach(kw => {
        if (kw) ris += `KW  - ${kw}\n`;
      });
    }

    ris += `ER  - \n`;
    return ris;
  }).join('\n');
}

/**
 * Exporta dados filtrados no formato JSON, CSV, BibTeX ou RIS
 */
export function exportDataset(req, res) {
  // Executa a busca aplicando filtros (sem limite/paginação para exportar o conjunto completo filtrado)
  const queryParams = { ...req.query, limit: 0, offset: 0 };
  const { results } = queryItems(queryParams);
  const config = getDatasetConfig();

  const format = (req.query.format || 'json').toLowerCase();
  const entityName = config.dataset?.entityName || 'dataset';

  if (format === 'csv') {
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename=${entityName}_export.csv`);

    // Inserir BOM UTF-8 (\uFEFF) para garantir suporte correto de acentos no Excel
    res.write('\uFEFF');

    if (results.length === 0) {
      res.write('Nenhum registro encontrado\n');
      return res.end();
    }

    // Descobrir todas as colunas dinamicamente a partir dos objetos
    const keysSet = new Set();
    results.forEach(item => {
      Object.keys(item).forEach(k => keysSet.add(k));
    });
    const headers = Array.from(keysSet);

    // Escrever linha do cabeçalho
    res.write(headers.map(h => `"${h.replace(/"/g, '""')}"`).join(',') + '\n');

    // Escrever cada linha
    results.forEach(item => {
      const row = headers.map(header => {
        let val = item[header];
        if (val === undefined || val === null) val = '';
        if (Array.isArray(val)) val = val.join('; ');
        if (typeof val === 'object') val = JSON.stringify(val);

        const strVal = String(val);
        return `"${strVal.replace(/"/g, '""')}"`;
      });
      res.write(row.join(',') + '\n');
    });

    return res.end();
  } else if (format === 'bibtex' || format === 'bib') {
    res.setHeader('Content-Type', 'application/x-bibtex; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename=${entityName}_export.bib`);
    return res.send(generateBibtex(results, config));
  } else if (format === 'ris') {
    res.setHeader('Content-Type', 'application/x-research-info-systems; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename=${entityName}_export.ris`);
    return res.send(generateRis(results, config));
  } else {
    // Exportação JSON padrão
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=${entityName}_export.json`);
    return res.json(results);
  }
}
