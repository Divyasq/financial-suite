// Custom Report Builder Types

export interface CustomReportState {
  // Report Details
  reportName: string;
  description: string;
  
  // Data Source - Now supports multiple grains
  selectedGrains: string[];
  primaryGrain: string | null; // The main grain for grouping
  
  // Metrics Selection
  selectedMetrics: string[];
  
  // Dimensions (multiple selection)
  selectedDimensions: string[];
  
  // Filters
  filters: CustomReportFilter[];
  
  // Block-based Layout
  blocks: ReportBlock[];
  
  // Join Configuration
  joinType: 'inner' | 'left' | 'right' | 'full';
}

export interface ReportBlock {
  id: string;
  type: 'chart' | 'widgets' | 'kpi' | 'table';
  title: string;
  config: ChartBlockConfig | WidgetBlockConfig | KPIBlockConfig | TableBlockConfig;
  order: number;
}

export interface ChartBlockConfig {
  chartType: 'bar' | 'line' | 'pie' | 'area';
  metrics: string[];
  dimensions: string[];
  showLegend: boolean;
  height: number;
}

export interface WidgetBlockConfig {
  metrics: string[];
  layout: 'horizontal' | 'grid';
  showTrends: boolean;
  showComparisons: boolean;
}

export interface KPIBlockConfig {
  prompt: string;
  generatedKPIs: {
    id: string;
    title: string;
    metric: string;
    description: string;
    format: 'currency' | 'number' | 'percentage';
  }[];
  layout: 'horizontal' | 'grid';
  showTrends: boolean;
}

export interface TableBlockConfig {
  metrics: string[];
  dimensions: string[];
  showSummary: boolean;
  pageSize: number;
  sortable: boolean;
}

export interface CustomReportFilter {
  id: string;
  dimension: string;
  operator: 'equals' | 'contains' | 'between' | 'in' | 'greater_than' | 'less_than';
  value: string | string[] | { from: string; to: string };
  label: string;
}

export interface GrainOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  metrics: MetricGroup[];
  dimensions: DimensionGroup[];
  canJoinWith: string[];
}

export interface MetricGroup {
  id: string;
  name: string;
  description: string;
  metrics: {
    id: string;
    name: string;
    description: string;
    type: 'currency' | 'number' | 'percentage' | 'count';
  }[];
}

export interface DimensionGroup {
  id: string;
  name: string;
  description: string;
  dimensions: {
    id: string;
    name: string;
    description: string;
    type: 'string' | 'date' | 'number' | 'category';
  }[];
}

export interface PromptSuggestion {
  text: string;
  grain: string;
  metrics: string[];
  groupBy: string;
  description: string;
}

export interface ParsedPrompt {
  grain: string;
  metrics: string[];
  groupBy: string;
  filters: CustomReportFilter[];
  confidence: number;
  explanation: string;
}

// Chart Configuration
export interface ChartConfig {
  type: 'bar' | 'line' | 'pie' | 'area' | 'table';
  title: string;
  showLegend: boolean;
  showTooltips: boolean;
  height?: number;
}

// Template for saving custom reports
export interface CustomReportTemplate {
  id: string;
  name: string;
  description: string;
  grain: string;
  metrics: string[];
  groupBy: string;
  filters: CustomReportFilter[];
  chartConfig: ChartConfig;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  tags: string[];
  isPublic: boolean;
}
