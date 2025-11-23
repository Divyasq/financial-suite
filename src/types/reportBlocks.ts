// Core Block System Types

export interface ReportBlock {
  id: string;
  type: 'header' | 'controls' | 'metrics' | 'visualization' | 'table';
  config: BlockConfig;
  visible: boolean;
  order: number;
}

export interface BlockConfig {
  header?: HeaderBlockConfig;
  controls?: ControlsBlockConfig;
  metrics?: MetricsBlockConfig;
  visualization?: VisualizationBlockConfig;
  table?: TableBlockConfig;
}

export interface HeaderBlockConfig {
  title: string;
  description: string;
  showDataFreshness: boolean;
  showOptions: boolean;
  options: ('export' | 'print' | 'share' | 'save' | 'customize')[];
}

export interface ControlsBlockConfig {
  primary: ('time_period' | 'location' | 'channel' | 'employee')[];
  secondary: ('filters' | 'group_by' | 'metrics' | 'chart_type')[];
  showGroupBy: boolean;
  showMetricSelector: boolean;
  availableGroupBy?: { id: string; name: string; }[];
  availableMetrics?: { id: string; name: string; }[];
}

export interface MetricsBlockConfig {
  maxMetrics: number;
  layout: 'horizontal' | 'grid';
  showComparison: boolean;
  showTrends: boolean;
}

export interface VisualizationBlockConfig {
  type: 'single' | 'multiple' | 'dashboard';
  charts: ChartConfig[];
  height?: number;
  showLegend?: boolean;
  showTooltips?: boolean;
}

export interface ChartConfig {
  id: string;
  type: 'line' | 'bar' | 'area' | 'pie' | 'donut' | 'scatter';
  title: string;
  timeframe?: 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';
  groupBy?: string;
  metrics: string[];
  size?: 'small' | 'medium' | 'large' | 'full';
  position?: { row: number; col: number; };
}

export interface TableBlockConfig {
  collapsible: boolean;
  defaultCollapsed: boolean;
  sortable: boolean;
  filterable: boolean;
  exportable: boolean;
  pagination: boolean;
  pageSize: number;
  showSummaryRow: boolean;
}

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: 'trend' | 'analysis' | 'summary' | 'dashboard';
  grain: string;
  defaultGroupBy: string;
  defaultMetrics: string[];
  blocks: ReportBlock[];
  category: string;
}

export interface ReportFilter {
  id: string;
  name: string;
  type: 'date_range' | 'select' | 'multi_select' | 'text' | 'number_range';
  value: any;
  options?: { id: string; name: string; }[];
}

export interface ReportState {
  templateId: string;
  filters: ReportFilter[];
  groupBy: string;
  selectedMetrics: string[];
  chartTypes: Record<string, string>;
  timeframe: string;
  location: string[];
  customizations: Record<string, any>;
}
