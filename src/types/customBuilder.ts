// Custom Report Builder Types

export interface CustomReportState {
  // Report Details
  reportName: string;
  description: string;
  
  // Data Source
  selectedGrain: string | null;
  
  // Metrics Selection
  selectedMetrics: string[];
  
  // Grouping & Dimensions
  groupBy: string | null;
  
  // Filters
  filters: CustomReportFilter[];
  
  // Visualization
  chartType: 'bar' | 'line' | 'pie' | 'area' | 'table';
  
  // Layout Options
  showTable: boolean;
  showMetricCards: boolean;
  dashboardMode: boolean;
  
  // Join Configuration (for advanced cross-grain reports)
  joinGrains?: string[];
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
