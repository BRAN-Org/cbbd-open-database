import { getAllItems } from './dataManager.js';
import { getDatasetConfig } from './config.js';

/**
 * Calcula estatísticas consolidadas e análises cientométricas de correlação
 * 100% em memória utilizando apenas os dados internos do evento.
 */
export function calculateStats() {
  const items = getAllItems();
  const config = getDatasetConfig();

  const total = items.length;
  const stats = {
    totalRecords: total,
    entityName: config.dataset?.pluralName || 'Registros',
    topLists: {},
    breakdowns: {},
    metrics: {},
    pareto: calculateParetoData('tools', 10),
    temporalStacked: calculateTemporalStacked('tools', 5)
  };

  if (total === 0) return stats;

  // 1. Processar listas dos mais frequentes (Top Lists)
  const topListSpecs = config.stats?.topLists || [];
  for (const spec of topListSpecs) {
    const counts = {};
    items.forEach(item => {
      const val = item[spec.sourceField];
      if (Array.isArray(val)) {
        val.forEach(v => {
          if (v) {
            const clean = String(v).trim();
            counts[clean] = (counts[clean] || 0) + 1;
          }
        });
      } else if (val) {
        const clean = String(val).trim();
        counts[clean] = (counts[clean] || 0) + 1;
      }
    });

    const sortedArray = Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, spec.limit || 10);

    stats.topLists[spec.key] = {
      label: spec.label,
      data: sortedArray
    };
  }

  // 2. Processar distribuições (Breakdowns)
  const breakdownSpecs = config.stats?.breakdowns || [];
  for (const spec of breakdownSpecs) {
    const counts = {};
    items.forEach(item => {
      const val = item[spec.sourceField];
      if (Array.isArray(val)) {
        val.forEach(v => {
          if (v) {
            const clean = String(v).trim();
            counts[clean] = (counts[clean] || 0) + 1;
          }
        });
      } else if (val !== undefined && val !== null) {
        const clean = String(val).trim();
        counts[clean] = (counts[clean] || 0) + 1;
      }
    });

    stats.breakdowns[spec.key] = {
      label: spec.label,
      data: counts
    };
  }

  // 3. Métricas adicionais (ex: % de uso de ferramentas)
  const recordsWithTools = items.filter(i => Array.isArray(i.tools) && i.tools.length > 0).length;
  stats.metrics.recordsWithTools = recordsWithTools;
  stats.metrics.toolAdoptionRate = parseFloat(((recordsWithTools / total) * 100).toFixed(2));

  return stats;
}

/**
 * Matriz de Coocorrência 2D (Heatmap) entre duas facetas internas (ex: tools x data_sources)
 */
export function calculateCooccurrenceMatrix(fieldA = 'tools', fieldB = 'data_sources', limit = 6) {
  const items = getAllItems();
  
  // Encontrar os top elementos do fieldA e fieldB
  const getTop = (field) => {
    const counts = {};
    items.forEach(item => {
      const vals = Array.isArray(item[field]) ? item[field] : (item[field] ? [item[field]] : []);
      vals.forEach(v => {
        const clean = String(v).trim();
        counts[clean] = (counts[clean] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(e => e[0]);
  };

  const topA = getTop(fieldA);
  const topB = getTop(fieldB);

  const matrix = {};
  topA.forEach(a => {
    matrix[a] = {};
    topB.forEach(b => {
      matrix[a][b] = 0;
    });
  });

  items.forEach(item => {
    const valsA = Array.isArray(item[fieldA]) ? item[fieldA] : (item[fieldA] ? [item[fieldA]] : []);
    const valsB = Array.isArray(item[fieldB]) ? item[fieldB] : (item[fieldB] ? [item[fieldB]] : []);

    valsA.forEach(a => {
      const cleanA = String(a).trim();
      if (matrix[cleanA]) {
        valsB.forEach(b => {
          const cleanB = String(b).trim();
          if (matrix[cleanA][cleanB] !== undefined) {
            matrix[cleanA][cleanB]++;
          }
        });
      }
    });
  });

  return {
    rows: topA,
    cols: topB,
    matrix
  };
}

/**
 * Distribuição Temporal 100% Empilhada por Ano (Ano x Ferramentas/Categorias)
 */
export function calculateTemporalStacked(field = 'tools', topLimit = 5) {
  const items = getAllItems();
  
  // Descobrir anos disponíveis
  const years = Array.from(new Set(items.map(i => i.year).filter(Boolean))).sort((a, b) => a - b);
  
  // Descobrir top categorias
  const counts = {};
  items.forEach(item => {
    const vals = Array.isArray(item[field]) ? item[field] : (item[field] ? [item[field]] : []);
    vals.forEach(v => {
      const clean = String(v).trim();
      counts[clean] = (counts[clean] || 0) + 1;
    });
  });

  const topCategories = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topLimit)
    .map(e => e[0]);

  const series = topCategories.map(cat => {
    const dataByYear = years.map(yr => {
      const yearItems = items.filter(i => i.year === yr);
      const totalYearItems = yearItems.length || 1;
      const catCount = yearItems.filter(i => {
        const vals = Array.isArray(i[field]) ? i[field] : (i[field] ? [i[field]] : []);
        return vals.map(v => String(v).trim()).includes(cat);
      }).length;
      
      const percentage = parseFloat(((catCount / totalYearItems) * 100).toFixed(1));
      return { year: yr, count: catCount, percentage };
    });

    return {
      name: cat,
      data: dataByYear
    };
  });

  return { years, categories: topCategories, series };
}

/**
 * Análise de Dispersão (Scatter Plot): Autores por Artigo vs. Ferramentas Utilizadas
 */
export function calculateScatterData() {
  const items = getAllItems();
  const points = items.map(item => {
    const authorCount = Array.isArray(item.authors) ? item.authors.length : 1;
    const toolCount = Array.isArray(item.tools) ? item.tools.length : 0;
    const sourceCount = Array.isArray(item.data_sources) ? item.data_sources.length : 0;

    return {
      title: item.title,
      doi: item.doi || item.id,
      x: authorCount,
      y: toolCount + sourceCount // Índice de diversidade metodológica
    };
  });

  // Regressão Linear Simples (y = mx + b)
  const n = points.length;
  if (n === 0) return { points: [], slope: 0, intercept: 0 };

  const sumX = points.reduce((acc, p) => acc + p.x, 0);
  const sumY = points.reduce((acc, p) => acc + p.y, 0);
  const sumXY = points.reduce((acc, p) => acc + (p.x * p.y), 0);
  const sumXX = points.reduce((acc, p) => acc + (p.x * p.x), 0);

  const denom = (n * sumXX - sumX * sumX);
  const slope = denom !== 0 ? (n * sumXY - sumX * sumY) / denom : 0;
  const intercept = n !== 0 ? (sumY - slope * sumX) / n : 0;

  return {
    points,
    trendline: { slope, intercept }
  };
}

/**
 * Análise de Pareto / Bradford (Distribuição acumulada de Frequência)
 */
export function calculateParetoData(field = 'tools', limit = 10) {
  const items = getAllItems();
  const counts = {};
  let totalOccurrences = 0;

  items.forEach(item => {
    const vals = Array.isArray(item[field]) ? item[field] : (item[field] ? [item[field]] : []);
    vals.forEach(v => {
      const clean = String(v).trim();
      if (clean) {
        counts[clean] = (counts[clean] || 0) + 1;
        totalOccurrences++;
      }
    });
  });

  const sorted = Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);

  let cumulative = 0;
  const paretoItems = sorted.map(item => {
    cumulative += item.count;
    const cumulativePercent = totalOccurrences > 0 
      ? parseFloat(((cumulative / totalOccurrences) * 100).toFixed(1))
      : 0;

    return {
      name: item.name,
      count: item.count,
      cumulativePercent,
      cumulativePercentage: cumulativePercent
    };
  });

  const pareto80Index = paretoItems.findIndex(i => i.cumulativePercent >= 80);

  return {
    totalOccurrences,
    items: paretoItems,
    data: paretoItems,
    pareto80Index: pareto80Index !== -1 ? pareto80Index : Math.max(0, paretoItems.length - 1)
  };
}
