/**
 * Componente de Gráficos Vetoriais Nativos em SVG (Zero-Dependency)
 * Desenvolvido para o ecossistema BRAN Org com tecnologia pure-svg-charts.
 * Suporta Barras, Linhas Suaves (Catmull-Rom Bézier), Rosca (Donut),
 * Sparklines KPI, temas visuais reativos e exportação direta em vetor SVG e imagem PNG (2x).
 */
import {
  mountChart,
  unmountChart,
  renderBarChart,
  renderLineChart,
  renderDonutChart,
  renderSparkline,
  CHART_VARIANTS,
  exportChartAsImage
} from './pure-svg-charts.bundle.js';

const PALETTE_MAP = {
  tokyonight: 'tokyonight',
  cyberpunk: 'cyberpunk',
  glass: 'glass',
  default: 'default',
  paper: 'paper',
  terminal: 'terminal',
  // Mapeamentos retrocompatíveis
  simeon: 'tokyonight',
  neon: 'cyberpunk',
  pastel: 'glass',
  apple: 'default',
  monochrome: 'terminal'
};

export class SimpleChart {
  constructor(containerId) {
    this.containerId = typeof containerId === 'string' ? containerId : (containerId?.id || '');
    this.container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
    if (!this.container) return;

    this.palette = 'tokyonight';
    this.chartType = 'auto'; // 'auto' usa o melhor tipo conceitual para o dado
    this.lastData = null;
    this.lastLabelKey = 'name';
    this.lastValueKey = 'count';
  }

  setPalette(paletteName) {
    this.palette = PALETTE_MAP[paletteName] || (CHART_VARIANTS[paletteName] ? paletteName : 'tokyonight');
  }

  setChartType(type) {
    this.chartType = type || 'auto';
  }

  getResolvedChartType() {
    if (this.chartType !== 'auto') {
      if (this.chartType === 'radar') return 'donut';
      return this.chartType;
    }

    // Modo Automático (Smart Defaults cientométricos):
    // - Histórico de Anos: Linha Bézier contínua com gradiente
    // - Seções / Eixos: Rosca / Donut proporcional
    // - Autores / Pesquisadores: Barras de ranking de frequência
    // - Palavras-chave: Barras de frequência
    if (this.containerId === 'chart-years') return 'line';
    if (this.containerId === 'chart-sections') return 'donut';
    if (this.containerId === 'chart-authors') return 'bar';
    if (this.containerId === 'chart-keywords') return 'bar';
    return 'bar';
  }

  getContainerHeight() {
    if (!this.container) return 240;
    const h = this.container.clientHeight || this.container.offsetHeight;
    return h > 50 ? h : 240;
  }

  render(data, labelKey = 'name', valueKey = 'count') {
    if (!this.container || !data) return;
    this.lastData = data;
    this.lastLabelKey = labelKey;
    this.lastValueKey = valueKey;

    const resolvedType = this.getResolvedChartType();
    const height = this.getContainerHeight();

    // 1. Suporte a Séries Múltiplas Empilhadas (Multi-Series Stacked)
    if (data.series && Array.isArray(data.series)) {
      const formattedSeries = data.series.map((s, idx) => ({
        id: s.id || `series-${idx}`,
        name: s.name,
        color: s.color,
        data: s.data.map(d => ({
          label: String(d.year || d.label || d[labelKey]),
          value: Number(d.count ?? d.value ?? 0)
        }))
      }));

      if (resolvedType === 'bar') {
        renderBarChart(this.container, {
          series: formattedSeries,
          stacked: true,
          showLegend: true,
          variant: this.palette,
          card: false,
          responsive: true,
          height,
          radius: 6,
          valueFormatter: (v) => `${Number(v).toLocaleString()} trab.`
        });
      } else {
        renderLineChart(this.container, {
          series: formattedSeries,
          stacked: true,
          showLegend: true,
          variant: this.palette,
          card: false,
          responsive: true,
          height,
          smooth: true,
          curvature: 0.25,
          fillGradient: true,
          crosshair: true,
          valueFormatter: (v) => `${Number(v).toLocaleString()} trab.`
        });
      }
      return;
    }

    // 2. Normalização de dados univariados
    let items = [];
    if (Array.isArray(data)) {
      items = data.map((item, idx) => {
        if (typeof item === 'number') {
          return { label: `Item ${idx + 1}`, value: item };
        }
        const label = String(item[labelKey] || item.name || item.label || `Item ${idx + 1}`);
        const val = Number(item[valueKey] ?? item.count ?? item.value ?? 0);
        return { label, value: Number.isFinite(val) ? val : 0 };
      });
    } else if (typeof data === 'object') {
      items = Object.entries(data).map(([key, val]) => ({
        label: String(key),
        value: Number.isFinite(Number(val)) ? Number(val) : 0
      }));
    }

    if (items.length === 0) {
      unmountChart(this.container);
      return;
    }

    // 3. Renderização conforme tipo resolvido
    if (resolvedType === 'line') {
      renderLineChart(this.container, {
        data: items,
        variant: this.palette,
        card: false,
        responsive: true,
        height,
        smooth: true,
        curvature: 0.25,
        fillGradient: true,
        crosshair: true,
        showZeroLine: true,
        animated: true,
        valueFormatter: (v) => `${Number(v).toLocaleString()} trab.`
      });
    } else if (resolvedType === 'donut') {
      // Rosca: agrupa a partir do 8º item em "Outros" para legibilidade
      const maxSlices = 7;
      let donutSlices = items.slice(0, maxSlices).map(it => ({
        label: it.label,
        value: it.value
      }));
      if (items.length > maxSlices) {
        const othersCount = items.slice(maxSlices).reduce((acc, curr) => acc + curr.value, 0);
        if (othersCount > 0) {
          donutSlices.push({ label: 'Outros', value: othersCount });
        }
      }
      const totalCount = donutSlices.reduce((acc, curr) => acc + curr.value, 0);

      renderDonutChart(this.container, {
        data: donutSlices,
        variant: this.palette,
        card: false,
        size: Math.min(height, 240),
        innerRadiusRatio: 0.65,
        centerLabel: 'Total',
        centerValue: String(totalCount),
        showLegend: true,
        animated: true,
        valueFormatter: (v) => `${Number(v).toLocaleString()} trab.`
      });
    } else {
      // Barras (ranking / contagem)
      renderBarChart(this.container, {
        data: items,
        variant: this.palette,
        card: false,
        responsive: true,
        height,
        radius: 6,
        showValues: items.length <= 12,
        showZeroLine: true,
        animated: true,
        valueFormatter: (v) => `${Number(v).toLocaleString()} trab.`
      });
    }
  }

  async exportSVG(filename = 'grafico.svg') {
    if (!this.container) return;
    const baseName = filename.replace(/\.svg$/i, '');
    await exportChartAsImage(this.container, 'svg', baseName);
  }

  async exportPNG(chartTitle = 'Gráfico Estatístico', filename = 'grafico.png') {
    if (!this.container) return;
    const baseName = filename.replace(/\.png$/i, '');
    const isLight = this.palette === 'paper';
    const bg = isLight ? '#f8fafc' : '#0b0f17';
    await exportChartAsImage(this.container, 'png', baseName, {
      scale: 2,
      background: bg
    });
  }

  destroy() {
    if (this.container) {
      unmountChart(this.container);
    }
  }
}

/**
 * Utilitário para renderizar mini-gráficos de tendência (Sparklines)
 * em cards de KPIs e painéis resumidos.
 */
export function renderMiniSparkline(containerId, data = [], color = '#7aa2f7') {
  const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
  if (!container || !data || data.length === 0) return;

  renderSparkline(container, {
    data,
    width: 96,
    height: 32,
    color,
    smooth: true,
    fillArea: true,
    showEndDot: true
  });
}

export const PureSvgChart = SimpleChart;
export { CHART_VARIANTS, exportChartAsImage, renderSparkline };
