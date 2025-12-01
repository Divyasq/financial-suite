// Advanced Analytics Type Definitions
export interface LaborForecast {
  id: string;
  date: string;
  dayOfWeek: string;
  predictedSales: number;
  recommendedStaff: {
    servers: number;
    kitchen: number;
    bartenders: number;
    hosts: number;
  };
  laborCostForecast: number;
  laborPercentage: number;
  confidence: number;
  factors: string[];
}

export interface StaffingOptimization {
  id: string;
  shift: 'morning' | 'afternoon' | 'evening' | 'late';
  currentStaffing: {
    servers: number;
    kitchen: number;
    bartenders: number;
    hosts: number;
  };
  optimalStaffing: {
    servers: number;
    kitchen: number;
    bartenders: number;
    hosts: number;
  };
  potentialSavings: number;
  serviceImpact: 'positive' | 'neutral' | 'negative';
  recommendation: string;
}

export interface CustomerAnalytics {
  id: string;
  customerId: string;
  customerSegment: 'high-value' | 'regular' | 'occasional' | 'at-risk' | 'new';
  clv: number; // Customer Lifetime Value
  churnProbability: number;
  lastVisit: string;
  visitFrequency: number;
  averageSpend: number;
  preferredItems: string[];
  recommendedActions: string[];
}

export interface CohortAnalysis {
  cohortMonth: string;
  customersAcquired: number;
  retentionRates: {
    month1: number;
    month3: number;
    month6: number;
    month12: number;
  };
  revenuePerCohort: {
    month1: number;
    month3: number;
    month6: number;
    month12: number;
  };
  averageClv: number;
}

export interface SalesForecast {
  id: string;
  date: string;
  predictedSales: number;
  confidence: number;
  seasonalAdjustment: number;
  weatherImpact: number;
  eventImpact: number;
  trendComponent: number;
  actualSales?: number;
  variance?: number;
  factors: {
    name: string;
    impact: number;
    description: string;
  }[];
}

export interface ScenarioPlanning {
  id: string;
  scenarioName: string;
  description: string;
  assumptions: {
    priceChange: number;
    staffingChange: number;
    marketingSpend: number;
    seasonalFactor: number;
    competitorAction: string;
  };
  projections: {
    salesImpact: number;
    laborCostImpact: number;
    profitImpact: number;
    customerCountImpact: number;
  };
  confidence: number;
  timeframe: string;
}

export interface PredictiveModel {
  id: string;
  modelType: 'sales' | 'labor' | 'customer' | 'inventory';
  name: string;
  description: string;
  accuracy: number;
  lastTrained: string;
  features: string[];
  assumptions: {
    key: string;
    value: string;
    impact: 'high' | 'medium' | 'low';
  }[];
  performance: {
    mape: number; // Mean Absolute Percentage Error
    rmse: number; // Root Mean Square Error
    r2Score: number;
  };
}

// AI-Generated Insights vs Configured Alerts
export interface AIInsight {
  id: string;
  type: 'ai-generated' | 'configured-alert';
  title: string;
  description: string;
  insight: string;
  reasoning: string[];
  confidence: number;
  severity: 'critical' | 'warning' | 'info' | 'opportunity';
  category: 'sales' | 'labor' | 'customer' | 'inventory' | 'financial' | 'operational';
  timestamp: string;
  dataPoints: {
    metric: string;
    value: string;
    trend: 'up' | 'down' | 'stable';
  }[];
  recommendations: {
    action: string;
    priority: 'high' | 'medium' | 'low';
    estimatedImpact: string;
    timeframe: string;
  }[];
  modelUsed?: string; // Only for AI-generated
  alertRule?: string; // Only for configured alerts
  isAutonomous: boolean;
}

export interface AIModel {
  id: string;
  name: string;
  type: 'forecasting' | 'classification' | 'clustering' | 'anomaly-detection';
  description: string;
  accuracy: number;
  lastUpdated: string;
  dataSource: string[];
  parameters: {
    [key: string]: any;
  };
}

export interface AdvancedAnalyticsMetrics {
  forecastAccuracy: number;
  modelPerformance: {
    sales: number;
    labor: number;
    customer: number;
  };
  insightsGenerated: number;
  actionsTaken: number;
  costSavings: number;
  revenueImpact: number;
}
