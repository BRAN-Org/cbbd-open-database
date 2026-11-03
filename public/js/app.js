import { SimpleChart, renderMiniSparkline } from './charts.js';

let appConfig = null;
let currentOffset = 0;
const currentLimit = 10;
let currentPalette = 'tokyonight';
let currentChartType = 'auto';
let currentSortDir = 'asc';

const chartInstances = {};

export function getDoiStatus(rawDoi) {
  if (!rawDoi || typeof rawDoi !== 'string') return { isValid: false, isPresent: false, statusText: 'Sem DOI' };
  
  const clean = rawDoi.replace(/^https?:\/\/doi\.org\//i, '').trim();
  const upper = clean.toUpperCase();

  if (!clean || upper === 'N/A' || upper === 'NONE' || upper === 'UNDEFINED' || upper === 'NULL' || clean.includes('0000000')) {
    return { isValid: false, isPresent: false, statusText: 'Sem DOI' };
  }

  const rawUrl = rawDoi.startsWith('http') ? rawDoi : `https://doi.org/${clean}`;

  // Check if DOI starts with 10. and has a slash / (standard CrossRef DOI format)
  if (clean.startsWith('10.') && /^10\.\d{4,9}\/.+$/.test(clean)) {
    return {
      isValid: true,
      isPresent: true,
      cleanDoi: clean,
      doiUrl: rawUrl,
      statusText: 'DOI Verificado (CrossRef)',
      badgeHtml: '<span class="badge-doi-status valid" title="DOI Verificado no CrossRef"><i class="fa-solid fa-circle-check"></i> DOI Verificado</span>'
    };
  }

  // If DOI has dot instead of slash (e.g. 10.22477.109) or non-standard syntax issued on EBBC platform
  return {
    isValid: false,
    isPresent: true,
    cleanDoi: clean,
    doiUrl: rawUrl,
    statusText: 'DOI Original (Não Registrado no CrossRef)',
    badgeHtml: '<span class="badge-doi-status warning" title="DOI original extraído da plataforma EBBC, porém não registrado no CrossRef"><i class="fa-solid fa-triangle-exclamation"></i> DOI Não Registrado</span>'
  };
}

export function resolveArticleUrl(item) {
  if (!item) return null;

  const doiInfo = getDoiStatus(item.doi || item.id);
  if (doiInfo.isPresent) {
    return doiInfo.doiUrl;
  }

  if (item.url && typeof item.url === 'string' && item.url.startsWith('http') && item.url.toUpperCase() !== 'N/A') {
    return item.url.trim();
  }

  if (item.pdf_url && typeof item.pdf_url === 'string' && item.pdf_url.startsWith('http') && item.pdf_url.toUpperCase() !== 'N/A') {
    return item.pdf_url.trim();
  }

  return null;
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', async () => {
    initTabs();
    initModal();
    initDatasetCitationCard();

  try {
    const resConfig = await fetch('/api/v1/config');
    appConfig = await resConfig.json();

    applyConfigToUI(appConfig);
    initToolbarControls();

    await loadStatsDashboard();
    await loadExplorerData();
    initSandbox();
  } catch (err) {
    console.error('⚠️ Falha na inicialização do portal:', err);
  }
});
}

function applyConfigToUI(config) {
  if (!config) return;
  const title = config.dataset?.title || 'OpenData OS';
  const orgName = config.organization?.name || 'BRAN Org';
  const subtitle = config.dataset?.subtitle || 'Acervo e Base de Dados Abertos';
  const description = config.dataset?.description || '';

  document.title = `${title} | ${orgName}`;

  // Header Title & Subtitle
  const headerTitle = document.getElementById('header-title');
  if (headerTitle) {
    headerTitle.innerHTML = `<span>BRAN</span> OpenData`;
  }

  const headerSub = document.getElementById('header-subtitle');
  if (headerSub) headerSub.textContent = subtitle;

  // Home Hero Section
  const homeOrgName = document.getElementById('home-org-name');
  if (homeOrgName) homeOrgName.textContent = 'BRAN Org';

  const homeDatasetTitle = document.getElementById('home-dataset-title');
  if (homeDatasetTitle) homeDatasetTitle.textContent = title;

  const homeDesc = document.getElementById('home-description-text');
  if (homeDesc && description) homeDesc.textContent = description;

  // Footer Info
  const footerOrg = document.getElementById('footer-org-name');
  if (footerOrg) footerOrg.textContent = 'BRAN Org';

  const footerInst = document.getElementById('footer-inst-name');
  if (footerInst) footerInst.textContent = '(Brazilian Research Archive Network)';

  // Badges & External Links (Exibe DOI APENAS se um DOI valido for fornecido)
  const doiText = document.getElementById('badge-doi-text');
  const doiLink = document.getElementById('badge-doi-link');
  const footerDoi = document.getElementById('footer-doi-link');

  const rawDoi = config.dataset?.doi || config.organization?.doiUrl || '';
  const upperDoi = rawDoi ? rawDoi.trim().toUpperCase() : '';
  const isValidDoi = rawDoi && !rawDoi.includes('0000000') && rawDoi.trim() !== '' && upperDoi !== 'N/A' && upperDoi !== 'NONE';

  if (isValidDoi) {
    const cleanDoi = rawDoi.replace('https://doi.org/', '');
    const doiHref = rawDoi.startsWith('http') ? rawDoi : `https://doi.org/${rawDoi}`;
    if (doiText) doiText.innerHTML = `<i class="fa-solid fa-link"></i> DOI: ${cleanDoi}`;
    if (doiLink) { doiLink.href = doiHref; doiLink.style.display = 'inline-flex'; }
    if (footerDoi) { footerDoi.href = doiHref; footerDoi.style.display = 'inline-block'; }
  } else {
    if (doiLink) doiLink.style.display = 'none';
    if (footerDoi) footerDoi.style.display = 'none';
  }

  // Zenodo DOI & Archival Data
  const rawZenodoDoi = config.dataset?.zenodoDoi
    || (config.dataset?.doi && config.dataset.doi.toLowerCase().includes('zenodo') ? config.dataset.doi : '')
    || (config.organization?.doiUrl && config.organization.doiUrl.toLowerCase().includes('zenodo') ? config.organization.doiUrl.replace(/^https?:\/\/doi\.org\//i, '') : '');
  const cleanZenodoDoi = rawZenodoDoi ? rawZenodoDoi.replace(/^https?:\/\/doi\.org\//i, '').trim() : '';
  const zenodoUrl = config.dataset?.zenodoUrl
    || (cleanZenodoDoi ? `https://doi.org/${cleanZenodoDoi}` : '')
    || (config.organization?.doiUrl && config.organization.doiUrl.toLowerCase().includes('zenodo') ? config.organization.doiUrl : '');

  const badgeZenodo = document.getElementById('badge-zenodo-link');
  const badgeZenodoText = document.getElementById('badge-zenodo-text');
  const homeZenodoCard = document.getElementById('home-zenodo-card');
  const homeZenodoBtn = document.getElementById('home-zenodo-btn');
  const homeZenodoDoiText = document.getElementById('home-zenodo-doi-text');
  const homeCitationCard = document.getElementById('home-citation-card');
  const docZenodoBtn = document.getElementById('doc-zenodo-btn');
  const footerZenodo = document.getElementById('footer-zenodo-link');

  if (cleanZenodoDoi) {
    if (badgeZenodo) {
      badgeZenodo.href = zenodoUrl;
      badgeZenodo.style.display = 'inline-flex';
    }
    if (badgeZenodoText) {
      badgeZenodoText.innerHTML = `<i class="fa-solid fa-box-archive"></i> Zenodo: ${escapeHtml(cleanZenodoDoi)}`;
    }
    if (homeZenodoCard) homeZenodoCard.style.display = 'block';
    if (homeZenodoBtn) homeZenodoBtn.href = zenodoUrl;
    if (homeZenodoDoiText) homeZenodoDoiText.textContent = `DOI: ${cleanZenodoDoi}`;
    if (homeCitationCard) homeCitationCard.style.display = 'block';
    if (docZenodoBtn) docZenodoBtn.href = zenodoUrl;
    if (footerZenodo) {
      footerZenodo.href = zenodoUrl;
      footerZenodo.style.display = 'inline-block';
    }

    renderDatasetCitation(config, cleanZenodoDoi, zenodoUrl);
  } else {
    if (badgeZenodo) badgeZenodo.style.display = 'none';
    if (homeZenodoCard) homeZenodoCard.style.display = 'none';
    if (homeCitationCard) homeCitationCard.style.display = 'none';
    if (footerZenodo) footerZenodo.style.display = 'none';
  }

  const githubLink = document.getElementById('badge-github-link');
  const footerGithub = document.getElementById('footer-github-link');
  if (config.organization?.githubUrl) {
    if (githubLink) githubLink.href = config.organization.githubUrl;
    if (footerGithub) footerGithub.href = config.organization.githubUrl;
  }

  const footerIssues = document.getElementById('footer-issues-link');
  if (config.organization?.issuesUrl && footerIssues) {
    footerIssues.href = config.organization.issuesUrl;
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('resize', debounce(() => {
    updateAllCharts();
  }, 150));
}

function initToolbarControls() {
  const paletteSelect = document.getElementById('chart-theme-select');
  const typeSelect = document.getElementById('chart-type-select');

  if (paletteSelect) {
    paletteSelect.addEventListener('change', (e) => {
      currentPalette = e.target.value;
      updateAllCharts();
    });
  }

  if (typeSelect) {
    typeSelect.addEventListener('change', (e) => {
      currentChartType = e.target.value;
      updateAllCharts();
    });
  }
}

async function loadStatsDashboard() {
  if (!appConfig) return;
  const entity = appConfig.dataset?.entityName || 'articles';

  try {
    const res = await fetch(`/api/v1/${entity}/stats`);
    const stats = await res.json();

    // Populate Metrics Summary Cards
    const totalCount = stats.totalRecords || 0;
    const yearCount = stats.breakdowns?.yearDistribution?.data ? Object.keys(stats.breakdowns.yearDistribution.data).length : 0;
    const sectionCount = stats.topLists?.topSections?.data?.length 
      || (stats.breakdowns?.sectionBreakdown?.data ? Object.keys(stats.breakdowns.sectionBreakdown.data).length : 0)
      || stats.topLists?.topSources?.data?.length 
      || stats.topLists?.topTools?.data?.length 
      || 0;
    const authorCount = stats.topLists?.topAuthors?.data?.length || 0;

    const totalEl = document.getElementById('stat-total-articles');
    if (totalEl) totalEl.textContent = totalCount;
    const homeTotal = document.getElementById('home-stat-total');
    if (homeTotal) homeTotal.textContent = totalCount;

    const yearsEl = document.getElementById('stat-unique-years');
    if (yearsEl) yearsEl.textContent = yearCount;
    const homeYears = document.getElementById('home-stat-years');
    if (homeYears) homeYears.textContent = yearCount;

    const sectionsEl = document.getElementById('stat-unique-sections');
    if (sectionsEl) sectionsEl.textContent = sectionCount;
    const homeSections = document.getElementById('home-stat-sections');
    if (homeSections) homeSections.textContent = sectionCount;

    const authorsEl = document.getElementById('stat-unique-authors');
    if (authorsEl) authorsEl.textContent = authorCount;
    const homeAuthors = document.getElementById('home-stat-authors');
    if (homeAuthors) homeAuthors.textContent = authorCount;

    // Renderizar Sparklines nos 4 KPI Cards
    try {
      const rawYears = stats.breakdowns?.yearDistribution?.data || {};
      const sortedYears = Object.keys(rawYears).sort((a, b) => Number(a) - Number(b));
      const yearlyTrend = sortedYears.map(yr => Number(rawYears[yr] || 0));

      if (yearlyTrend.length > 0) {
        renderMiniSparkline('sparkline-total', yearlyTrend, '#7aa2f7');
        const cumulativeYears = sortedYears.map((_, i) => i + 1);
        renderMiniSparkline('sparkline-years', cumulativeYears, '#38bdf8');
      }

      const secData = stats.topLists?.topSections?.data || (stats.breakdowns?.sectionBreakdown?.data ? Object.values(stats.breakdowns.sectionBreakdown.data) : null);
      if (secData && secData.length > 0) {
        const secValues = secData.map(d => typeof d === 'number' ? d : d.count || d.value || 0);
        renderMiniSparkline('sparkline-sections', secValues, '#34d399');
      }

      if (stats.topLists?.topAuthors?.data && stats.topLists.topAuthors.data.length > 0) {
        const authValues = stats.topLists.topAuthors.data.map(d => d.count || d.value || 0);
        renderMiniSparkline('sparkline-authors', authValues, '#f472b6');
      }
    } catch (sparkErr) {
      console.warn('Sparklines não puderam ser renderizados:', sparkErr);
    }

    // Fallbacks para Gráfico 2 (Eixos / Fontes / Etapas)
    let sectionsData = stats.breakdowns?.sectionBreakdown?.data || stats.topLists?.topSections?.data;
    let sectionsTitle = 'Distribuição por Eixo Temático / Seção';
    let sectionsIcon = 'fa-layer-group';

    if (!sectionsData || (Array.isArray(sectionsData) ? sectionsData.length === 0 : Object.keys(sectionsData).length === 0)) {
      if (stats.topLists?.topSources?.data && stats.topLists.topSources.data.length > 0) {
        sectionsData = stats.topLists.topSources.data;
        sectionsTitle = stats.topLists.topSources.label || 'Principais Fontes de Dados';
        sectionsIcon = 'fa-database';
      } else if (stats.breakdowns?.stageBreakdown?.data && Object.keys(stats.breakdowns.stageBreakdown.data).length > 0) {
        sectionsData = stats.breakdowns.stageBreakdown.data;
        sectionsTitle = stats.breakdowns.stageBreakdown.label || 'Etapas Metodológicas';
        sectionsIcon = 'fa-diagram-project';
      } else if (stats.topLists?.topTools?.data && stats.topLists.topTools.data.length > 0) {
        sectionsData = stats.topLists.topTools.data;
        sectionsTitle = stats.topLists.topTools.label || 'Principais Softwares Utilizados';
        sectionsIcon = 'fa-wrench';
      }
    }

    const chart2Header = document.querySelector('[data-chart="sections"]')?.closest('.chart-header')?.querySelector('h3');
    if (chart2Header) {
      chart2Header.innerHTML = `<i class="fa-solid ${sectionsIcon}"></i> <span>${escapeHtml(sectionsTitle)}</span>`;
    }

    // Fallbacks para Gráfico 4 (Palavras-chave / Ferramentas / Fontes)
    let keywordsData = stats.topLists?.topKeywords?.data;
    let keywordsTitle = 'Palavras-chave & Tópicos em Alta';
    let keywordsIcon = 'fa-tags';

    if (!keywordsData || keywordsData.length === 0) {
      if (stats.topLists?.topTools?.data && stats.topLists.topTools.data.length > 0) {
        keywordsData = stats.topLists.topTools.data;
        keywordsTitle = stats.topLists.topTools.label || 'Principais Softwares Utilizados';
        keywordsIcon = 'fa-wrench';
      } else if (stats.topLists?.topSources?.data && stats.topLists.topSources.data.length > 0) {
        keywordsData = stats.topLists.topSources.data;
        keywordsTitle = stats.topLists.topSources.label || 'Principais Fontes de Dados';
        keywordsIcon = 'fa-database';
      }
    }

    const chart4Header = document.querySelector('[data-chart="keywords"]')?.closest('.chart-header')?.querySelector('h3');
    if (chart4Header) {
      chart4Header.innerHTML = `<i class="fa-solid ${keywordsIcon}"></i> <span>${escapeHtml(keywordsTitle)}</span>`;
    }

    // Instanciar os 4 Gráficos Universais
    chartInstances['years'] = new SimpleChart('chart-years');
    chartInstances['sections'] = new SimpleChart('chart-sections');
    chartInstances['authors'] = new SimpleChart('chart-authors');
    chartInstances['keywords'] = new SimpleChart('chart-keywords');

    chartInstances['years_data'] = stats.breakdowns?.yearDistribution?.data;
    chartInstances['sections_data'] = sectionsData;
    chartInstances['authors_data'] = stats.topLists?.topAuthors?.data;
    chartInstances['keywords_data'] = keywordsData;

    updateAllCharts();
    populateSidebarOptions(stats);
  } catch (err) {
    console.error('⚠️ Erro ao carregar dashboard:', err);
  }
}

function updateAllCharts() {
  Object.keys(chartInstances).forEach(key => {
    if (key.endsWith('_data') || !chartInstances[key]) return;
    const chart = chartInstances[key];
    chart.setPalette(currentPalette);
    chart.setChartType(currentChartType);
    
    const data = chartInstances[`${key}_data`];
    if (!data) return;

    chart.render(data);
  });
}

function populateSidebarOptions(stats) {
  // 1. Edições (Ano)
  const yearContainer = document.getElementById('year-checkbox-list');
  if (yearContainer && stats.breakdowns?.yearDistribution?.data) {
    const years = Object.keys(stats.breakdowns.yearDistribution.data).sort((a, b) => b - a);
    yearContainer.innerHTML = '';

    years.forEach(yr => {
      const label = document.createElement('label');
      label.className = 'checkbox-item';
      label.innerHTML = `
        <input type="checkbox" class="year-filter-cb" value="${yr}" checked>
        <span>EBBC ${yr}</span>
      `;
      label.querySelector('input').addEventListener('change', () => {
        currentOffset = 0;
        loadExplorerData();
      });
      yearContainer.appendChild(label);
    });
  }

  // 2. Filtrar por Ferramenta
  const toolSelect = document.getElementById('filter-tool');
  const toolGroup = document.getElementById('filter-tool-group');
  const toolsData = stats.topLists?.topTools?.data;
  if (toolSelect) {
    if (toolsData && toolsData.length > 0) {
      toolSelect.innerHTML = '<option value="">Todas as ferramentas</option>';
      toolsData.forEach(t => {
        if (t.name && t.name !== 'N/A') {
          const opt = document.createElement('option');
          opt.value = t.name;
          opt.textContent = `${t.name} (${t.count})`;
          toolSelect.appendChild(opt);
        }
      });
      if (toolGroup) toolGroup.style.display = 'block';
      toolSelect.onchange = () => { currentOffset = 0; loadExplorerData(); };
    } else {
      if (toolGroup) toolGroup.style.display = 'none';
    }
  }

  // 3. Fonte de Coleta de Dados
  const sourceSelect = document.getElementById('filter-source');
  const sourceGroup = document.getElementById('filter-source-group');
  const sourcesData = stats.topLists?.topSources?.data;
  if (sourceSelect) {
    if (sourcesData && sourcesData.length > 0) {
      sourceSelect.innerHTML = '<option value="">Todas as fontes</option>';
      sourcesData.forEach(s => {
        if (s.name && s.name !== 'N/A') {
          const opt = document.createElement('option');
          opt.value = s.name;
          opt.textContent = `${s.name} (${s.count})`;
          sourceSelect.appendChild(opt);
        }
      });
      if (sourceGroup) sourceGroup.style.display = 'block';
      sourceSelect.onchange = () => { currentOffset = 0; loadExplorerData(); };
    } else {
      if (sourceGroup) sourceGroup.style.display = 'none';
    }
  }

  // 4. Etapa Metodológica
  const stageSelect = document.getElementById('filter-stage');
  const stageGroup = document.getElementById('filter-stage-group');
  const stagesData = stats.breakdowns?.stageBreakdown?.data;
  if (stageSelect) {
    if (stagesData && Object.keys(stagesData).length > 0) {
      stageSelect.innerHTML = '<option value="">Qualquer etapa</option>';
      Object.entries(stagesData).forEach(([st, cnt]) => {
        if (st && st !== 'N/A') {
          const opt = document.createElement('option');
          opt.value = st;
          opt.textContent = `${st} (${cnt})`;
          stageSelect.appendChild(opt);
        }
      });
      if (stageGroup) stageGroup.style.display = 'block';
      stageSelect.onchange = () => { currentOffset = 0; loadExplorerData(); };
    } else {
      if (stageGroup) stageGroup.style.display = 'none';
    }
  }

  // 5. Checkbox: Apenas artigos que usam ferramentas
  const hasToolsCb = document.getElementById('filter-has-tools');
  const hasToolsGroup = document.getElementById('filter-has-tools-group');
  if (hasToolsCb) {
    if (toolsData && toolsData.length > 0) {
      if (hasToolsGroup) hasToolsGroup.style.display = 'block';
      hasToolsCb.onchange = () => { currentOffset = 0; loadExplorerData(); };
    } else {
      if (hasToolsGroup) hasToolsGroup.style.display = 'none';
    }
  }

  // 6. Palavras-chave / Tópicos
  const keywordSelect = document.getElementById('filter-keyword');
  const keywordGroup = document.getElementById('filter-keyword-group');
  const keywordsData = stats.topLists?.topKeywords?.data;
  if (keywordSelect) {
    if (keywordsData && keywordsData.length > 0) {
      keywordSelect.innerHTML = '<option value="">Todas as palavras-chave</option>';
      keywordsData.forEach(k => {
        if (k.name && k.name !== 'N/A') {
          const opt = document.createElement('option');
          opt.value = k.name;
          opt.textContent = `${k.name} (${k.count})`;
          keywordSelect.appendChild(opt);
        }
      });
      if (keywordGroup) keywordGroup.style.display = 'block';
      keywordSelect.onchange = () => { currentOffset = 0; loadExplorerData(); };
    } else {
      if (keywordGroup) keywordGroup.style.display = 'none';
    }
  }

  // 7. Autor / Pesquisador
  const authorSelect = document.getElementById('filter-author');
  if (authorSelect && stats.topLists?.topAuthors?.data) {
    authorSelect.innerHTML = '<option value="">Todos os autores</option>';
    stats.topLists.topAuthors.data.forEach(a => {
      if (a.name && a.name !== 'N/A') {
        const opt = document.createElement('option');
        opt.value = a.name;
        opt.textContent = a.name;
        authorSelect.appendChild(opt);
      }
    });
    authorSelect.onchange = () => { currentOffset = 0; loadExplorerData(); };
  }

  // 8. Eixo Temático / Seção
  const sectionSelect = document.getElementById('filter-section');
  const sectionGroup = document.getElementById('filter-section-group');
  if (sectionSelect) {
    let sections = [];
    if (stats.topLists?.topSections?.data) {
      sections = stats.topLists.topSections.data.map(s => s.name);
    } else if (stats.breakdowns?.sectionBreakdown?.data) {
      sections = Object.keys(stats.breakdowns.sectionBreakdown.data);
    }

    if (sections.length > 0) {
      sectionSelect.innerHTML = '<option value="">Todos os eixos</option>';
      sections.forEach(s => {
        if (s && s !== 'N/A') {
          const opt = document.createElement('option');
          opt.value = s;
          opt.textContent = s;
          sectionSelect.appendChild(opt);
        }
      });
      if (sectionGroup) sectionGroup.style.display = 'block';
      sectionSelect.onchange = () => { currentOffset = 0; loadExplorerData(); };
    } else {
      if (sectionGroup) sectionGroup.style.display = 'none';
    }
  }

  // 9. Sort Select
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.onchange = () => { currentOffset = 0; loadExplorerData(); };
  }

  const sortDirBtn = document.getElementById('btn-sort-dir');
  if (sortDirBtn) {
    sortDirBtn.onclick = () => {
      currentSortDir = currentSortDir === 'asc' ? 'desc' : 'asc';
      sortDirBtn.innerHTML = currentSortDir === 'asc' ? '<i class="fa-solid fa-sort-amount-down"></i>' : '<i class="fa-solid fa-sort-amount-up"></i>';
      currentOffset = 0;
      loadExplorerData();
    };
  }
}

async function loadExplorerData() {
  if (!appConfig) return;
  const entity = appConfig.dataset?.entityName || 'articles';

  const params = new URLSearchParams();
  params.set('limit', currentLimit);
  params.set('offset', currentOffset);
  params.set('order', currentSortDir);

  const searchInput = document.getElementById('search-input');
  if (searchInput && searchInput.value) {
    params.set('search', searchInput.value);
  }

  const selectedYears = Array.from(document.querySelectorAll('.year-filter-cb:checked')).map(cb => cb.value);
  if (selectedYears.length > 0) {
    params.set('year', selectedYears.join(','));
  }

  const toolVal = document.getElementById('filter-tool')?.value;
  if (toolVal) params.set('tool', toolVal);

  const sourceVal = document.getElementById('filter-source')?.value;
  if (sourceVal) params.set('source', sourceVal);

  const stageVal = document.getElementById('filter-stage')?.value;
  if (stageVal) params.set('stage', stageVal);

  const keywordVal = document.getElementById('filter-keyword')?.value;
  if (keywordVal) params.set('keyword', keywordVal);

  const authorVal = document.getElementById('filter-author')?.value;
  if (authorVal) params.set('author', authorVal);

  const sectionVal = document.getElementById('filter-section')?.value;
  if (sectionVal) params.set('section', sectionVal);

  const hasToolsCb = document.getElementById('filter-has-tools');
  if (hasToolsCb && hasToolsCb.checked) {
    params.set('has_tool', 'true');
  }

  const sortVal = document.getElementById('sort-select')?.value;
  if (sortVal) params.set('sort', sortVal);

  try {
    const res = await fetch(`/api/v1/${entity}?${params.toString()}`);
    const data = await res.json();

    renderArticleCards(data.results);
    renderPaginationInfo(data);
    updateExportLinks(params);
  } catch (err) {
    console.error('⚠️ Erro ao carregar explorador:', err);
  }
}

function renderArticleCards(items) {
  const container = document.getElementById('articles-list');
  if (!container) return;

  container.innerHTML = '';

  if (!items || items.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; color: var(--text-secondary); padding: 40px; background: var(--bg-surface); border-radius: var(--border-radius-lg); border: 1px solid var(--border-color); font-family: var(--font-mono);">
        Nenhum trabalho encontrado para os filtros selecionados.
      </div>
    `;
    return;
  }

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'article-card';

    const year = item.year || item.ano || 'N/A';
    const title = item.title || item.titulo || 'Sem título';
    const authors = Array.isArray(item.authors) ? item.authors.join(', ') : (item.authors || 'N/A');

    let badgesHtml = '';
    
    // Eixo Temático / Seção
    if (item.section && item.section !== 'N/A') {
      badgesHtml += `<span class="badge-source">${escapeHtml(item.section)}</span> `;
    }

    // Ferramentas / Softwares (EBBC)
    if (Array.isArray(item.tools)) {
      item.tools.forEach(t => {
        if (t && t !== 'N/A') badgesHtml += `<span class="badge-tool"><i class="fa-solid fa-wrench"></i> ${escapeHtml(t)}</span> `;
      });
    }

    // Fontes de Dados (EBBC)
    if (Array.isArray(item.data_sources)) {
      item.data_sources.forEach(s => {
        if (s && s !== 'N/A') badgesHtml += `<span class="badge-source"><i class="fa-solid fa-database"></i> ${escapeHtml(s)}</span> `;
      });
    }

    // Etapas Metodológicas (EBBC)
    if (Array.isArray(item.usage_stages)) {
      item.usage_stages.forEach(st => {
        if (st && st !== 'N/A') badgesHtml += `<span class="badge-year"><i class="fa-solid fa-diagram-project"></i> ${escapeHtml(st)}</span> `;
      });
    }

    // Palavras-chave / Tópicos
    if (Array.isArray(item.keywords)) {
      item.keywords.forEach(kw => {
        if (kw && kw !== 'N/A') badgesHtml += `<span class="badge-tool">${escapeHtml(kw)}</span> `;
      });
    }

    const doiInfo = getDoiStatus(item.doi || item.id);
    const pdfUrl = (item.pdf_url && item.pdf_url !== 'N/A') ? item.pdf_url : null;

    let linksHeaderHtml = '';
    if (doiInfo.isPresent) {
      if (doiInfo.isValid) {
        linksHeaderHtml += `<a href="${escapeHtml(doiInfo.doiUrl)}" target="_blank" onclick="event.stopPropagation();" class="card-action-link" title="DOI Verificado no CrossRef"><i class="fa-solid fa-link"></i> DOI Verificado</a> `;
      } else {
        linksHeaderHtml += `<a href="${escapeHtml(doiInfo.doiUrl)}" target="_blank" onclick="event.stopPropagation();" class="card-action-link warning" title="DOI Original EBBC (Não registrado no CrossRef)"><i class="fa-solid fa-triangle-exclamation"></i> DOI Não Registrado</a> `;
      }
    } else if (item.url && item.url.startsWith('http')) {
      linksHeaderHtml += `<a href="${escapeHtml(item.url)}" target="_blank" onclick="event.stopPropagation();" class="card-action-link" title="Acessar Publicação"><i class="fa-solid fa-arrow-up-right-from-square"></i> Publicação</a> `;
    }

    if (pdfUrl) {
      linksHeaderHtml += `<a href="${escapeHtml(pdfUrl)}" target="_blank" onclick="event.stopPropagation();" class="card-action-link pdf" title="Baixar PDF"><i class="fa-solid fa-file-pdf"></i> Baixar PDF</a>`;
    }

    card.innerHTML = `
      <div class="article-card-header">
        <span class="badge-year">${year}</span>
        <div class="card-action-links">${linksHeaderHtml}</div>
      </div>
      <h3 class="article-title">${escapeHtml(title)}</h3>
      <p class="article-authors">${escapeHtml(authors)}</p>
      <div class="badge-list">${badgesHtml}</div>
    `;

    card.addEventListener('click', () => openArticleModal(item));
    container.appendChild(card);
  });
  initChartExports();
}

let currentModalItem = null;
let currentCitationFmt = 'bibtex';
let currentCitationMode = 'item'; // 'item' or 'dataset'
let currentDatasetCitationFmt = 'bibtex';

function openArticleModal(item) {
  currentModalItem = item;
  const modal = document.getElementById('article-modal');
  if (!modal) return;

  document.getElementById('modal-year').textContent = item.year || item.ano || 'N/A';
  document.getElementById('modal-title').textContent = item.title || item.titulo || 'Sem título';
  document.getElementById('modal-authors').textContent = Array.isArray(item.authors) ? item.authors.join(', ') : (item.authors || 'N/A');
  document.getElementById('modal-abstract').textContent = item.abstract || 'Resumo não disponível para este registro.';

  // 1. Ferramentas Utilizadas
  const toolsEl = document.getElementById('modal-tools');
  const toolsGroup = document.getElementById('modal-tools-group');
  if (toolsEl) {
    let list = [];
    if (Array.isArray(item.tools)) {
      item.tools.forEach(t => {
        if (t && String(t).toUpperCase() !== 'N/A') {
          list.push(`<span class="badge-tool"><i class="fa-solid fa-wrench"></i> ${escapeHtml(t)}</span>`);
        }
      });
    }
    if (list.length > 0) {
      toolsEl.innerHTML = list.join(' ');
      if (toolsGroup) toolsGroup.style.display = 'block';
    } else {
      toolsEl.innerHTML = '<span style="color: var(--text-secondary); font-size: 13px;">Nenhuma ferramenta detectada</span>';
      if (toolsGroup && (!item.tools || item.tools.length === 0)) {
        toolsGroup.style.display = 'block';
      }
    }
  }

  // 2. Fontes de Coleta de Dados
  const sourcesEl = document.getElementById('modal-sources');
  const sourcesGroup = document.getElementById('modal-sources-group');
  if (sourcesEl) {
    let list = [];
    if (Array.isArray(item.data_sources)) {
      item.data_sources.forEach(s => {
        if (s && String(s).toUpperCase() !== 'N/A') {
          list.push(`<span class="badge-source"><i class="fa-solid fa-database"></i> ${escapeHtml(s)}</span>`);
        }
      });
    }
    if (list.length > 0) {
      sourcesEl.innerHTML = list.join(' ');
      if (sourcesGroup) sourcesGroup.style.display = 'block';
    } else {
      sourcesEl.innerHTML = '<span style="color: var(--text-secondary); font-size: 13px;">Nenhuma fonte especificada</span>';
      if (sourcesGroup && (!item.data_sources || item.data_sources.length === 0)) {
        sourcesGroup.style.display = 'none';
      }
    }
  }

  // 3. Etapas Metodológicas
  const stagesEl = document.getElementById('modal-stages');
  const stagesGroup = document.getElementById('modal-stages-group');
  if (stagesEl) {
    let list = [];
    if (Array.isArray(item.usage_stages)) {
      item.usage_stages.forEach(st => {
        if (st && String(st).toUpperCase() !== 'N/A') {
          list.push(`<span class="badge-year"><i class="fa-solid fa-diagram-project"></i> ${escapeHtml(st)}</span>`);
        }
      });
    }
    if (list.length > 0) {
      stagesEl.innerHTML = list.join(' ');
      if (stagesGroup) stagesGroup.style.display = 'block';
    } else {
      stagesEl.innerHTML = '<span style="color: var(--text-secondary); font-size: 13px;">Não especificado</span>';
      if (stagesGroup && (!item.usage_stages || item.usage_stages.length === 0)) {
        stagesGroup.style.display = 'none';
      }
    }
  }

  // 4. Eixo Temático / Seção
  const sectionsEl = document.getElementById('modal-sections');
  const sectionsGroup = document.getElementById('modal-sections-group');
  if (sectionsEl) {
    if (item.section && String(item.section).toUpperCase() !== 'N/A') {
      sectionsEl.innerHTML = `<span class="badge-source">${escapeHtml(item.section)}</span>`;
      if (sectionsGroup) sectionsGroup.style.display = 'block';
    } else {
      sectionsEl.innerHTML = '<span style="color: var(--text-secondary); font-size: 13px;">Não especificado</span>';
      if (sectionsGroup && !item.section) sectionsGroup.style.display = 'none';
    }
  }

  // 5. Palavras-chave
  const keywordsEl = document.getElementById('modal-keywords');
  const keywordsGroup = document.getElementById('modal-keywords-group');
  if (keywordsEl) {
    let list = [];
    if (Array.isArray(item.keywords)) {
      item.keywords.forEach(k => {
        if (k && String(k).toUpperCase() !== 'N/A') {
          list.push(`<span class="badge-tool">${escapeHtml(k)}</span>`);
        }
      });
    }
    if (list.length > 0) {
      keywordsEl.innerHTML = list.join(' ');
      if (keywordsGroup) keywordsGroup.style.display = 'block';
    } else {
      keywordsEl.innerHTML = '<span style="color: var(--text-secondary); font-size: 13px;">Não especificado</span>';
      if (keywordsGroup && (!item.keywords || item.keywords.length === 0)) {
        keywordsGroup.style.display = 'none';
      }
    }
  }

  // 6. DOI Text Container e Link
  const doiInfo = getDoiStatus(item.doi || item.id);
  const doiTextContainer = document.getElementById('modal-doi-text-container');
  const doiLink = document.getElementById('modal-doi-link');

  if (doiTextContainer) {
    if (doiInfo.isPresent) {
      doiTextContainer.innerHTML = `<i class="fa-solid fa-link"></i> DOI: <a href="${escapeHtml(doiInfo.doiUrl)}" target="_blank" style="color: var(--text-primary); text-decoration: underline; word-break: break-all;">https://doi.org/${escapeHtml(doiInfo.cleanDoi)}</a> ${doiInfo.badgeHtml}`;
    } else {
      doiTextContainer.innerHTML = '<span style="font-size: 12px; color: var(--text-secondary);"><i class="fa-solid fa-circle-info"></i> Sem DOI cadastrado</span>';
    }
  }

  if (doiLink) {
    if (doiInfo.isPresent) {
      doiLink.href = doiInfo.doiUrl;
      doiLink.style.display = 'inline-block';
      if (doiInfo.isValid) {
        doiLink.innerHTML = `<i class="fa-solid fa-arrow-up-right-from-square"></i> Acessar DOI (CrossRef)`;
      } else {
        doiLink.innerHTML = `<i class="fa-solid fa-arrow-up-right-from-square"></i> Acessar DOI (Original EBBC)`;
      }
    } else if (item.url && item.url.startsWith('http')) {
      doiLink.href = item.url;
      doiLink.style.display = 'inline-block';
      doiLink.innerHTML = `<i class="fa-solid fa-arrow-up-right-from-square"></i> Acessar Publicação`;
    } else {
      doiLink.style.display = 'none';
    }
  }

  const pdfLink = document.getElementById('modal-pdf-link');
  if (pdfLink) {
    if (item.pdf_url && item.pdf_url !== 'N/A') {
      pdfLink.href = item.pdf_url;
      pdfLink.style.display = 'inline-block';
    } else {
      pdfLink.style.display = 'none';
    }
  }

  // Reset modal citation mode to item
  currentCitationMode = 'item';
  const btnCiteModeItem = document.getElementById('btn-cite-mode-item');
  const btnCiteModeDataset = document.getElementById('btn-cite-mode-dataset');
  if (btnCiteModeItem && btnCiteModeDataset) {
    btnCiteModeItem.classList.add('active');
    btnCiteModeItem.style.background = 'rgba(255,255,255,0.08)';
    btnCiteModeItem.style.color = 'var(--text-primary)';
    btnCiteModeDataset.classList.remove('active');
    btnCiteModeDataset.style.background = 'transparent';
    btnCiteModeDataset.style.color = 'var(--text-secondary)';
  }

  const rawZenodoDoi = appConfig?.dataset?.zenodoDoi
    || (appConfig?.dataset?.doi && appConfig.dataset.doi.toLowerCase().includes('zenodo') ? appConfig.dataset.doi : '')
    || (appConfig?.organization?.doiUrl && appConfig.organization.doiUrl.toLowerCase().includes('zenodo') ? appConfig.organization.doiUrl.replace(/^https?:\/\/doi\.org\//i, '') : '');
  const cleanZenodoDoi = rawZenodoDoi ? rawZenodoDoi.replace(/^https?:\/\/doi\.org\//i, '').trim() : '';
  const zenodoUrl = appConfig?.dataset?.zenodoUrl
    || (cleanZenodoDoi ? `https://doi.org/${cleanZenodoDoi}` : '');

  const modalZenodoNote = document.getElementById('modal-zenodo-archive-note');
  const modalZenodoLink = document.getElementById('modal-zenodo-archive-link');
  if (cleanZenodoDoi && modalZenodoNote && modalZenodoLink) {
    modalZenodoLink.href = zenodoUrl;
    modalZenodoLink.textContent = `DOI: ${cleanZenodoDoi}`;
    modalZenodoNote.style.display = 'block';
  } else if (modalZenodoNote) {
    modalZenodoNote.style.display = 'none';
  }

  updateCitationBox();
  modal.classList.add('active');
}

export function generateDatasetCitation(config, zenodoDoi, zenodoUrl, fmt = 'bibtex') {
  const title = config?.dataset?.title || 'Academic Open Database';
  const orgName = config?.organization?.name || 'BRAN Org';
  const year = '2026';
  const doi = zenodoDoi || '10.5281/zenodo.23593583';
  const url = zenodoUrl || `https://doi.org/${doi}`;
  const citeKey = `bran_${doi.replace(/[^a-zA-Z0-9]/g, '_')}`;

  if (fmt === 'bibtex') {
    return `@misc{${citeKey},\n  title        = {${title}},\n  author       = {${orgName}},\n  year         = {${year}},\n  howpublished = {Zenodo},\n  doi          = {${doi}},\n  url          = {${url}},\n  note         = {Preservação permanente de banco relacional SQLite3, CSV, JSON e textos completos em PDF}\n}`;
  } else if (fmt === 'apa') {
    return `${orgName}. (${year}). ${title} [Data set]. Zenodo. ${url}`;
  } else if (fmt === 'abnt') {
    const orgUpper = orgName.toUpperCase();
    return `${orgUpper}. ${title}: base de dados aberta e preservação integral. Genebra: CERN / Zenodo, ${year}. DOI: ${doi}. Disponível em: <${url}>.`;
  }
  return '';
}

function renderDatasetCitation(config, zenodoDoi, zenodoUrl) {
  const contentEl = document.getElementById('dataset-citation-content');
  if (!contentEl) return;
  contentEl.textContent = generateDatasetCitation(config, zenodoDoi, zenodoUrl, currentDatasetCitationFmt);
}

function updateCitationBox() {
  if (!currentModalItem) return;
  const item = currentModalItem;
  const citationEl = document.getElementById('citation-content');
  if (!citationEl) return;

  const rawZenodoDoi = appConfig?.dataset?.zenodoDoi
    || (appConfig?.dataset?.doi && appConfig.dataset.doi.toLowerCase().includes('zenodo') ? appConfig.dataset.doi : '')
    || (appConfig?.organization?.doiUrl && appConfig.organization.doiUrl.toLowerCase().includes('zenodo') ? appConfig.organization.doiUrl.replace(/^https?:\/\/doi\.org\//i, '') : '');
  const cleanZenodoDoi = rawZenodoDoi ? rawZenodoDoi.replace(/^https?:\/\/doi\.org\//i, '').trim() : '';
  const zenodoUrl = appConfig?.dataset?.zenodoUrl
    || (cleanZenodoDoi ? `https://doi.org/${cleanZenodoDoi}` : '')
    || (appConfig?.organization?.doiUrl && appConfig.organization.doiUrl.toLowerCase().includes('zenodo') ? appConfig.organization.doiUrl : '');

  // Mode: Cite Dataset on Zenodo
  if (currentCitationMode === 'dataset') {
    citationEl.textContent = generateDatasetCitation(appConfig, cleanZenodoDoi, zenodoUrl, currentCitationFmt);
    return;
  }

  // Mode: Cite Item
  const authors = Array.isArray(item.authors) ? item.authors : (item.authors ? [item.authors] : ['Autor Desconhecido']);
  const year = item.year || item.ano || '2024';
  const title = item.title || item.titulo || 'Sem título';
  const rawDoi = (item.doi && item.doi !== 'N/A') ? item.doi : (item.id && item.id !== 'N/A' ? item.id : '');
  const doiInfo = getDoiStatus(rawDoi);
  const doiUrl = resolveArticleUrl(item) || (doiInfo.isPresent ? doiInfo.doiUrl : (cleanZenodoDoi ? zenodoUrl : ''));
  const doiKey = rawDoi ? rawDoi.replace(/[^a-zA-Z0-9]/g, '_') : 'item_' + year;

  if (currentCitationFmt === 'bibtex') {
    let bib = `@article{${doiKey},\n  title     = {${title}},\n  author    = {${authors.join(' and ')}},\n  year      = {${year}}`;
    if (doiInfo.isValid) {
      bib += `,\n  doi       = {${doiInfo.cleanDoi}}`;
    } else if (cleanZenodoDoi) {
      bib += `,\n  doi       = {${cleanZenodoDoi}}`;
    }
    if (doiUrl) {
      bib += `,\n  url       = {${doiUrl}}`;
    }
    if (cleanZenodoDoi) {
      bib += `,\n  note      = {Acervo completo preservado no CERN/Zenodo sob DOI ${cleanZenodoDoi}}`;
    }
    bib += `\n}`;
    citationEl.textContent = bib;
  } else if (currentCitationFmt === 'apa') {
    let apa = `${authors.join(', ')} (${year}). ${title}.`;
    if (doiUrl) apa += ` ${doiUrl}`;
    if (!doiInfo.isValid && cleanZenodoDoi) {
      apa += ` (Zenodo Archive: ${cleanZenodoDoi})`;
    }
    citationEl.textContent = apa;
  } else if (currentCitationFmt === 'abnt') {
    const abntAuthors = authors.map(a => {
      const parts = String(a).trim().split(' ');
      const last = parts.pop().toUpperCase();
      return `${last}, ${parts.join(' ')}`;
    }).join('; ');
    let abnt = `${abntAuthors}. ${title}. ${year}.`;
    if (doiUrl) {
      abnt += ` Disponível em: <${doiUrl}>.`;
    }
    if (cleanZenodoDoi) {
      abnt += ` Preservado no Zenodo sob DOI: ${cleanZenodoDoi}.`;
    }
    citationEl.textContent = abnt;
  }
}

function initModal() {
  const modal = document.getElementById('article-modal');
  const closeBtn = document.getElementById('btn-close-modal');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  // Citation mode buttons (Artigo vs Dataset no Zenodo)
  const btnCiteModeItem = document.getElementById('btn-cite-mode-item');
  const btnCiteModeDataset = document.getElementById('btn-cite-mode-dataset');

  if (btnCiteModeItem && btnCiteModeDataset) {
    btnCiteModeItem.addEventListener('click', () => {
      currentCitationMode = 'item';
      btnCiteModeItem.classList.add('active');
      btnCiteModeItem.style.background = 'rgba(255,255,255,0.08)';
      btnCiteModeItem.style.color = 'var(--text-primary)';
      btnCiteModeDataset.classList.remove('active');
      btnCiteModeDataset.style.background = 'transparent';
      btnCiteModeDataset.style.color = 'var(--text-secondary)';
      updateCitationBox();
    });

    btnCiteModeDataset.addEventListener('click', () => {
      currentCitationMode = 'dataset';
      btnCiteModeDataset.classList.add('active');
      btnCiteModeDataset.style.background = 'rgba(255,255,255,0.08)';
      btnCiteModeDataset.style.color = 'var(--text-primary)';
      btnCiteModeItem.classList.remove('active');
      btnCiteModeItem.style.background = 'transparent';
      btnCiteModeItem.style.color = 'var(--text-secondary)';
      updateCitationBox();
    });
  }

  // Citation format tabs
  document.querySelectorAll('.citation-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.citation-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCitationFmt = tab.getAttribute('data-fmt');
      updateCitationBox();
    });
  });

  const copyCitationBtn = document.getElementById('btn-copy-citation');
  if (copyCitationBtn) {
    copyCitationBtn.addEventListener('click', () => {
      const citationEl = document.getElementById('citation-content');
      if (citationEl) {
        navigator.clipboard.writeText(citationEl.textContent);
        copyCitationBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copiado!';
        setTimeout(() => copyCitationBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copiar Citação', 2000);
      }
    });
  }
}

function initDatasetCitationCard() {
  const datasetCitationTabs = document.querySelectorAll('.dataset-citation-tab');
  datasetCitationTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      datasetCitationTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentDatasetCitationFmt = tab.getAttribute('data-fmt');
      if (appConfig) {
        const rawZenodoDoi = appConfig.dataset?.zenodoDoi
          || (appConfig.dataset?.doi && appConfig.dataset.doi.toLowerCase().includes('zenodo') ? appConfig.dataset.doi : '')
          || (appConfig.organization?.doiUrl && appConfig.organization.doiUrl.toLowerCase().includes('zenodo') ? appConfig.organization.doiUrl.replace(/^https?:\/\/doi\.org\//i, '') : '');
        const cleanZenodoDoi = rawZenodoDoi ? rawZenodoDoi.replace(/^https?:\/\/doi\.org\//i, '').trim() : '';
        const zenodoUrl = appConfig.dataset?.zenodoUrl
          || (cleanZenodoDoi ? `https://doi.org/${cleanZenodoDoi}` : '')
          || (appConfig.organization?.doiUrl && appConfig.organization.doiUrl.toLowerCase().includes('zenodo') ? appConfig.organization.doiUrl : '');
        renderDatasetCitation(appConfig, cleanZenodoDoi, zenodoUrl);
      }
    });
  });

  const copyDatasetBtn = document.getElementById('btn-copy-dataset-citation');
  if (copyDatasetBtn) {
    copyDatasetBtn.addEventListener('click', () => {
      const el = document.getElementById('dataset-citation-content');
      if (el) {
        navigator.clipboard.writeText(el.textContent);
        copyDatasetBtn.innerHTML = '<i class="fa-solid fa-check"></i> Citação Copiada!';
        setTimeout(() => copyDatasetBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copiar Citação do Dataset', 2000);
      }
    });
  }

  const copyZenodoDoiBtn = document.getElementById('btn-copy-zenodo-doi');
  if (copyZenodoDoiBtn) {
    copyZenodoDoiBtn.addEventListener('click', () => {
      const doiTextEl = document.getElementById('home-zenodo-doi-text');
      if (doiTextEl) {
        const clean = doiTextEl.textContent.replace('DOI: ', '').trim();
        navigator.clipboard.writeText(clean);
        copyZenodoDoiBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
        setTimeout(() => copyZenodoDoiBtn.innerHTML = '<i class="fa-regular fa-copy"></i>', 2000);
      }
    });
  }
}

function initChartExports() {
  document.querySelectorAll('.btn-chart-export').forEach(btn => {
    btn.addEventListener('click', () => {
      const chartKey = btn.getAttribute('data-chart');
      const format = (btn.getAttribute('data-format') || 'png').toLowerCase();
      if (chartInstances[chartKey]) {
        const cardHeader = btn.closest('.chart-card')?.querySelector('.chart-header h3 span');
        const titleText = cardHeader ? cardHeader.textContent.trim() : 'Gráfico Estatístico';
        if (format === 'svg') {
          chartInstances[chartKey].exportSVG(`grafico-${chartKey}.svg`);
        } else {
          chartInstances[chartKey].exportPNG(titleText, `grafico-${chartKey}.png`);
        }
      }
    });
  });
}

function renderPaginationInfo(data) {
  const displayedCount = document.getElementById('displayed-count');
  const filteredCount = document.getElementById('filtered-count');
  const pageIndicator = document.getElementById('page-indicator');
  const prevBtn = document.getElementById('btn-prev');
  const nextBtn = document.getElementById('btn-next');

  const start = data.offset + 1;
  const end = Math.min(data.offset + data.limit, data.filteredCount);
  const totalPages = Math.ceil(data.filteredCount / currentLimit) || 1;
  const currentPage = Math.floor(data.offset / currentLimit) + 1;

  if (displayedCount) displayedCount.textContent = `${start}-${end}`;
  if (filteredCount) filteredCount.textContent = data.filteredCount;
  if (pageIndicator) pageIndicator.textContent = `Pág. ${currentPage} de ${totalPages}`;

  if (prevBtn) {
    prevBtn.disabled = data.offset <= 0;
    prevBtn.onclick = () => {
      if (currentOffset > 0) {
        currentOffset -= currentLimit;
        loadExplorerData();
      }
    };
  }

  if (nextBtn) {
    nextBtn.disabled = data.offset + data.limit >= data.filteredCount;
    nextBtn.onclick = () => {
      currentOffset += currentLimit;
      loadExplorerData();
    };
  }
}

function updateExportLinks(params) {
  if (!appConfig) return;
  const entity = appConfig.dataset?.entityName || 'articles';

  const exportParams = new URLSearchParams(params);
  exportParams.delete('limit');
  exportParams.delete('offset');

  const jsonBtn = document.getElementById('btn-export-json');
  if (jsonBtn) {
    exportParams.set('format', 'json');
    jsonBtn.href = `/api/v1/${entity}/export?${exportParams.toString()}`;
  }

  const csvBtn = document.getElementById('btn-export-csv');
  if (csvBtn) {
    exportParams.set('format', 'csv');
    csvBtn.href = `/api/v1/${entity}/export?${exportParams.toString()}`;
  }

  const bibBtn = document.getElementById('btn-export-bibtex');
  if (bibBtn) {
    exportParams.set('format', 'bibtex');
    bibBtn.href = `/api/v1/${entity}/export?${exportParams.toString()}`;
  }

  const risBtn = document.getElementById('btn-export-ris');
  if (risBtn) {
    exportParams.set('format', 'ris');
    risBtn.href = `/api/v1/${entity}/export?${exportParams.toString()}`;
  }
}

function initSandbox() {
  const executeBtn = document.getElementById('btn-execute-api');
  const endpointSelect = document.getElementById('playground-endpoint-select');
  const badgeEl = document.getElementById('playground-status-badge');
  const codeEl = document.getElementById('sandbox-code');

  if (executeBtn && endpointSelect) {
    executeBtn.addEventListener('click', async () => {
      const path = endpointSelect.value;
      const t0 = performance.now();
      executeBtn.disabled = true;
      executeBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Executando...';

      try {
        const res = await fetch(path);
        const t1 = performance.now();
        const latency = Math.round(t1 - t0);
        const data = await res.json();

        if (badgeEl) {
          badgeEl.className = 'playground-status';
          badgeEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> HTTP ${res.status} OK (${latency}ms)`;
        }

        if (codeEl) {
          codeEl.textContent = JSON.stringify(data, null, 2);
        }
      } catch (err) {
        if (badgeEl) {
          badgeEl.className = 'playground-status error';
          badgeEl.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Erro na Requisição`;
        }
        if (codeEl) {
          codeEl.textContent = `// Erro ao conectar à API:\n${err.message}`;
        }
      } finally {
        executeBtn.disabled = false;
        executeBtn.innerHTML = '<i class="fa-solid fa-play"></i> Executar Requisição';
      }
    });
  }

  const langSelect = document.getElementById('sandbox-lang');
  if (langSelect) {
    langSelect.addEventListener('change', updateSandboxCode);
  }

  const copyBtn = document.getElementById('sandbox-copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const textToCopy = codeEl ? codeEl.textContent : '';
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy);
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copiado!';
        setTimeout(() => copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copiar Código', 2000);
      }
    });
  }

  const docLinks = document.querySelectorAll('.docs-menu-link');
  docLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetDocId = link.getAttribute('data-doc');
      
      docLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      document.querySelectorAll('.doc-card').forEach(card => card.classList.remove('active'));
      document.getElementById(targetDocId)?.classList.add('active');
    });
  });

  updateSandboxCode();
}

function updateSandboxCode() {
  if (!appConfig) return;
  const entity = appConfig.dataset?.entityName || 'articles';
  const baseUrl = window.location.origin;

  const lang = document.getElementById('sandbox-lang')?.value || 'curl';
  const targetUrl = `${baseUrl}/api/v1/${entity}?limit=10`;

  const codeEl = document.getElementById('sandbox-code');
  if (!codeEl) return;

  if (lang === 'curl') {
    codeEl.textContent = `curl -X GET "${targetUrl}" \\\n  -H "Accept: application/json"`;
  } else if (lang === 'javascript') {
    codeEl.textContent = `// Requisição em JavaScript (Fetch API)\nfetch("${targetUrl}")\n  .then(response => response.json())\n  .then(data => console.log(data));`;
  } else if (lang === 'python') {
    codeEl.textContent = `# Requisição em Python (Requests)\nimport requests\n\nurl = "${targetUrl}"\nresponse = requests.get(url)\ndata = response.json()\nprint(data)`;
  } else if (lang === 'node') {
    codeEl.textContent = `// Requisição em Node.js (Axios)\nconst axios = require('axios');\n\naxios.get("${targetUrl}")\n  .then(response => console.log(response.data))\n  .catch(error => console.error(error));`;
  } else if (lang === 'r') {
    codeEl.textContent = `# Requisição em R (httr & jsonlite)\nlibrary(httr)\nlibrary(jsonlite)\n\nres <- GET("${targetUrl}")\ndata <- fromJSON(content(res, "text"))\nprint(data)`;
  }
}

function switchTab(tabId) {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(b => {
    if (b.getAttribute('data-tab') === tabId) {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });

  tabPanels.forEach(p => {
    if (p.id === tabId) {
      p.classList.add('active');
    } else {
      p.classList.remove('active');
    }
  });

  if (tabId === 'dashboard-tab' || tabId === 'home-tab') {
    setTimeout(() => {
      updateAllCharts();
    }, 50);
  }
}

function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      switchTab(target);
      window.location.hash = target;
    });
  });

  const hash = window.location.hash?.replace('#', '');
  if (hash && document.getElementById(hash)) {
    switchTab(hash);
  }

  const btnHeroExplore = document.getElementById('btn-hero-explore');
  if (btnHeroExplore) {
    btnHeroExplore.addEventListener('click', () => switchTab('explorer-tab'));
  }

  const btnHeroStats = document.getElementById('btn-hero-stats');
  if (btnHeroStats) {
    btnHeroStats.addEventListener('click', () => switchTab('dashboard-tab'));
  }

  const topSearchInput = document.getElementById('top-quick-search');
  const searchInput = document.getElementById('search-input');

  if (topSearchInput) {
    topSearchInput.addEventListener('input', debounce(() => {
      const val = topSearchInput.value;
      if (searchInput) searchInput.value = val;
      switchTab('explorer-tab');
      currentOffset = 0;
      loadExplorerData();
    }, 300));
  }

  if (searchInput) {
    searchInput.addEventListener('input', debounce(() => {
      if (topSearchInput) topSearchInput.value = searchInput.value;
      currentOffset = 0;
      loadExplorerData();
    }, 300));
  }

  const clearBtn = document.getElementById('btn-clear-filters');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (topSearchInput) topSearchInput.value = '';
      document.querySelectorAll('.year-filter-cb').forEach(cb => cb.checked = true);

      const toolSelect = document.getElementById('filter-tool');
      if (toolSelect) toolSelect.value = '';

      const sourceSelect = document.getElementById('filter-source');
      if (sourceSelect) sourceSelect.value = '';

      const stageSelect = document.getElementById('filter-stage');
      if (stageSelect) stageSelect.value = '';

      const keywordSelect = document.getElementById('filter-keyword');
      if (keywordSelect) keywordSelect.value = '';

      const authorSelect = document.getElementById('filter-author');
      if (authorSelect) authorSelect.value = '';

      const sectionSelect = document.getElementById('filter-section');
      if (sectionSelect) sectionSelect.value = '';

      const hasToolsCb = document.getElementById('filter-has-tools');
      if (hasToolsCb) hasToolsCb.checked = false;

      currentOffset = 0;
      loadExplorerData();
    });
  }
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
