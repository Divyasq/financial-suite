import {
  LaborForecast,
  StaffingOptimization,
  CustomerAnalytics,
  CohortAnalysis,
  SalesForecast,
  ScenarioPlanning,
  PredictiveModel,
  AIInsight,
  AIModel,
  AdvancedAnalyticsMetrics
} from '../types/advanced-analytics';

// Labor Forecasting Data
export const mockLaborForecasts: LaborForecast[] = [
  {
    id: 'lf-001',
    date: '2024-01-15',
    dayOfWeek: 'Monday',
    predictedSales: 8500,
    recommendedStaff: {
      servers: 4,
      kitchen: 3,
      bartenders: 1,
      hosts: 1
    },
    laborCostForecast: 1200,
    laborPercentage: 14.1,
    confidence: 0.87,
    factors: ['Historical Monday performance', 'Weather forecast: Clear', 'No major events']
  },
  {
    id: 'lf-002',
    date: '2024-01-16',
    dayOfWeek: 'Tuesday',
    predictedSales: 9200,
    recommendedStaff: {
      servers: 5,
      kitchen: 3,
      bartenders: 2,
      hosts: 1
    },
    laborCostForecast: 1350,
    laborPercentage: 14.7,
    confidence: 0.82,
    factors: ['Tuesday happy hour promotion', 'Local business meeting scheduled', 'Mild weather expected']
  },
  {
    id: 'lf-003',
    date: '2024-01-17',
    dayOfWeek: 'Wednesday',
    predictedSales: 11800,
    recommendedStaff: {
      servers: 6,
      kitchen: 4,
      bartenders: 2,
      hosts: 2
    },
    laborCostForecast: 1680,
    laborPercentage: 14.2,
    confidence: 0.91,
    factors: ['Mid-week dinner rush', 'Wine tasting event', 'University nearby has evening classes']
  }
];

// Staffing Optimization Data
export const mockStaffingOptimizations: StaffingOptimization[] = [
  {
    id: 'so-001',
    shift: 'morning',
    currentStaffing: {
      servers: 3,
      kitchen: 2,
      bartenders: 1,
      hosts: 1
    },
    optimalStaffing: {
      servers: 2,
      kitchen: 2,
      bartenders: 0,
      hosts: 1
    },
    potentialSavings: 180,
    serviceImpact: 'neutral',
    recommendation: 'Reduce morning servers by 1, eliminate bartender until 11 AM'
  },
  {
    id: 'so-002',
    shift: 'evening',
    currentStaffing: {
      servers: 5,
      kitchen: 3,
      bartenders: 2,
      hosts: 1
    },
    optimalStaffing: {
      servers: 6,
      kitchen: 4,
      bartenders: 2,
      hosts: 2
    },
    potentialSavings: -220,
    serviceImpact: 'positive',
    recommendation: 'Add 1 server and 1 kitchen staff for peak dinner service'
  }
];

// Customer Analytics Data
export const mockCustomerAnalytics: CustomerAnalytics[] = [
  {
    id: 'ca-001',
    customerId: 'cust-12345',
    customerSegment: 'high-value',
    clv: 2850,
    churnProbability: 0.12,
    lastVisit: '2024-01-10',
    visitFrequency: 2.3,
    averageSpend: 67.50,
    preferredItems: ['Ribeye Steak', 'Caesar Salad', 'Craft Beer Selection'],
    recommendedActions: ['Send personalized wine pairing offer', 'Invite to exclusive tasting event']
  },
  {
    id: 'ca-002',
    customerId: 'cust-67890',
    customerSegment: 'at-risk',
    clv: 890,
    churnProbability: 0.78,
    lastVisit: '2023-11-15',
    visitFrequency: 0.4,
    averageSpend: 45.20,
    preferredItems: ['Burger', 'Fries', 'Soda'],
    recommendedActions: ['Send comeback discount', 'Follow up with personalized message', 'Offer loyalty program enrollment']
  },
  {
    id: 'ca-003',
    customerId: 'cust-11111',
    customerSegment: 'regular',
    clv: 1650,
    churnProbability: 0.25,
    lastVisit: '2024-01-08',
    visitFrequency: 1.8,
    averageSpend: 52.30,
    preferredItems: ['Salmon', 'House Salad', 'White Wine'],
    recommendedActions: ['Suggest similar fish dishes', 'Offer wine club membership']
  }
];

// Cohort Analysis Data
export const mockCohortAnalysis: CohortAnalysis[] = [
  {
    cohortMonth: '2023-01',
    customersAcquired: 145,
    retentionRates: {
      month1: 0.68,
      month3: 0.42,
      month6: 0.28,
      month12: 0.18
    },
    revenuePerCohort: {
      month1: 8750,
      month3: 12400,
      month6: 15600,
      month12: 18900
    },
    averageClv: 1890
  },
  {
    cohortMonth: '2023-06',
    customersAcquired: 189,
    retentionRates: {
      month1: 0.72,
      month3: 0.48,
      month6: 0.31,
      month12: 0.22
    },
    revenuePerCohort: {
      month1: 11200,
      month3: 16800,
      month6: 21400,
      month12: 25600
    },
    averageClv: 2140
  }
];

// Sales Forecasting Data
export const mockSalesForecasts: SalesForecast[] = [
  {
    id: 'sf-001',
    date: '2024-01-15',
    predictedSales: 12500,
    confidence: 0.89,
    seasonalAdjustment: 0.95,
    weatherImpact: 1.02,
    eventImpact: 1.0,
    trendComponent: 1.08,
    actualSales: 12180,
    variance: -2.6,
    factors: [
      { name: 'Seasonal Trend', impact: -5, description: 'January typically 5% below average' },
      { name: 'Weather', impact: 2, description: 'Clear weather increases foot traffic' },
      { name: 'Growth Trend', impact: 8, description: 'Consistent 8% monthly growth' }
    ]
  },
  {
    id: 'sf-002',
    date: '2024-01-16',
    predictedSales: 13200,
    confidence: 0.84,
    seasonalAdjustment: 0.96,
    weatherImpact: 0.98,
    eventImpact: 1.15,
    trendComponent: 1.08,
    factors: [
      { name: 'Local Event', impact: 15, description: 'Business conference at nearby hotel' },
      { name: 'Weather', impact: -2, description: 'Light rain expected in evening' },
      { name: 'Tuesday Promotion', impact: 8, description: 'Happy hour specials drive traffic' }
    ]
  }
];

// Scenario Planning Data
export const mockScenarioPlanning: ScenarioPlanning[] = [
  {
    id: 'sp-001',
    scenarioName: 'Menu Price Increase',
    description: 'Increase menu prices by 8% across all items',
    assumptions: {
      priceChange: 8,
      staffingChange: 0,
      marketingSpend: 0,
      seasonalFactor: 1.0,
      competitorAction: 'No response expected'
    },
    projections: {
      salesImpact: -12,
      laborCostImpact: 0,
      profitImpact: 18,
      customerCountImpact: -8
    },
    confidence: 0.76,
    timeframe: '3 months'
  },
  {
    id: 'sp-002',
    scenarioName: 'Staffing Optimization',
    description: 'Optimize staffing based on AI recommendations',
    assumptions: {
      priceChange: 0,
      staffingChange: -12,
      marketingSpend: 0,
      seasonalFactor: 1.0,
      competitorAction: 'None'
    },
    projections: {
      salesImpact: -2,
      laborCostImpact: -12,
      profitImpact: 8,
      customerCountImpact: -1
    },
    confidence: 0.91,
    timeframe: '1 month'
  },
  {
    id: 'sp-003',
    scenarioName: 'Marketing Campaign',
    description: 'Launch targeted social media campaign for lunch specials',
    assumptions: {
      priceChange: 0,
      staffingChange: 5,
      marketingSpend: 2500,
      seasonalFactor: 1.0,
      competitorAction: 'Similar campaign launch'
    },
    projections: {
      salesImpact: 15,
      laborCostImpact: 5,
      profitImpact: 12,
      customerCountImpact: 18
    },
    confidence: 0.68,
    timeframe: '2 months'
  }
];

// Predictive Models Data
export const mockPredictiveModels: PredictiveModel[] = [
  {
    id: 'pm-001',
    modelType: 'sales',
    name: 'Daily Sales Forecaster',
    description: 'Predicts daily sales using historical data, weather, and events',
    accuracy: 0.87,
    lastTrained: '2024-01-10',
    features: ['Historical sales', 'Day of week', 'Weather', 'Local events', 'Seasonality'],
    assumptions: [
      { key: 'Weather Impact', value: '±5% sales variation', impact: 'medium' },
      { key: 'Event Impact', value: '±20% sales variation', impact: 'high' },
      { key: 'Seasonal Pattern', value: 'Consistent year-over-year', impact: 'high' }
    ],
    performance: {
      mape: 8.3,
      rmse: 1250,
      r2Score: 0.89
    }
  },
  {
    id: 'pm-002',
    modelType: 'customer',
    name: 'Customer Churn Predictor',
    description: 'Identifies customers at risk of churning',
    accuracy: 0.82,
    lastTrained: '2024-01-08',
    features: ['Visit frequency', 'Spend pattern', 'Last visit', 'Order variety', 'Seasonal behavior'],
    assumptions: [
      { key: 'Visit Frequency', value: 'Primary churn indicator', impact: 'high' },
      { key: 'Spend Decline', value: '30% decline indicates risk', impact: 'high' },
      { key: 'Seasonal Adjustment', value: 'Account for natural fluctuations', impact: 'medium' }
    ],
    performance: {
      mape: 12.1,
      rmse: 0.18,
      r2Score: 0.84
    }
  }
];

// AI-Generated Insights Data
export const mockAIInsights: AIInsight[] = [
  {
    id: 'ai-001',
    type: 'ai-generated',
    title: 'Lunch Revenue Opportunity Detected',
    description: 'AI analysis reveals untapped lunch revenue potential',
    insight: 'Divya, your lunch sales are 23% below similar restaurants in your area, despite having optimal location and capacity during lunch hours.',
    reasoning: [
      'Analyzed 50+ similar restaurants within 2-mile radius',
      'Your lunch capacity utilization is only 34% vs 67% average',
      'Competitor analysis shows successful lunch promotions',
      'Weather data indicates 78% of lunch hours have favorable conditions'
    ],
    confidence: 0.89,
    severity: 'opportunity',
    category: 'sales',
    timestamp: '2024-01-14 09:15:00',
    dataPoints: [
      { metric: 'Lunch Sales', value: '$2,340/day', trend: 'stable' },
      { metric: 'Market Average', value: '$3,045/day', trend: 'up' },
      { metric: 'Capacity Utilization', value: '34%', trend: 'stable' }
    ],
    recommendations: [
      {
        action: 'Launch express lunch menu with 15-minute guarantee',
        priority: 'high',
        estimatedImpact: '+$705/day revenue',
        timeframe: '2 weeks'
      },
      {
        action: 'Partner with nearby offices for catering deals',
        priority: 'medium',
        estimatedImpact: '+$450/day revenue',
        timeframe: '1 month'
      }
    ],
    modelUsed: 'Revenue Opportunity Detector v2.1',
    isAutonomous: true
  },
  {
    id: 'ai-002',
    type: 'ai-generated',
    title: 'Staff Scheduling Inefficiency Alert',
    description: 'AI detected suboptimal staffing patterns affecting profitability',
    insight: 'Divya, your Thursday evening shift is overstaffed by 1.3 FTE on average, costing $340/week in unnecessary labor.',
    reasoning: [
      'Analyzed 12 weeks of Thursday evening data',
      'Customer arrival patterns show 18% lower volume than scheduled for',
      'Service quality metrics remain high with reduced staff',
      'Competitor staffing data suggests industry best practices'
    ],
    confidence: 0.94,
    severity: 'warning',
    category: 'labor',
    timestamp: '2024-01-14 11:30:00',
    dataPoints: [
      { metric: 'Current Staffing', value: '8.3 FTE', trend: 'stable' },
      { metric: 'Optimal Staffing', value: '7.0 FTE', trend: 'down' },
      { metric: 'Weekly Overspend', value: '$340', trend: 'up' }
    ],
    recommendations: [
      {
        action: 'Reduce Thursday evening staff by 1 server',
        priority: 'high',
        estimatedImpact: '$340/week savings',
        timeframe: 'Next week'
      },
      {
        action: 'Implement dynamic scheduling based on reservations',
        priority: 'medium',
        estimatedImpact: '$150/week additional savings',
        timeframe: '3 weeks'
      }
    ],
    modelUsed: 'Labor Optimization Engine v1.8',
    isAutonomous: true
  },
  {
    id: 'ca-001',
    type: 'configured-alert',
    title: 'High-Value Customer Churn Risk',
    description: 'Configured alert: Customer spending >$2000 hasn\'t visited in 45+ days',
    insight: 'Sarah Johnson (CLV: $2,850) hasn\'t visited in 47 days, exceeding your configured 45-day threshold.',
    reasoning: [
      'Customer meets high-value criteria (CLV >$2000)',
      'Last visit: 47 days ago (exceeds 45-day threshold)',
      'Historical visit frequency: Every 18 days',
      'No recent engagement with marketing campaigns'
    ],
    confidence: 1.0,
    severity: 'critical',
    category: 'customer',
    timestamp: '2024-01-14 14:22:00',
    dataPoints: [
      { metric: 'Customer CLV', value: '$2,850', trend: 'stable' },
      { metric: 'Days Since Visit', value: '47 days', trend: 'up' },
      { metric: 'Churn Probability', value: '78%', trend: 'up' }
    ],
    recommendations: [
      {
        action: 'Send personalized comeback offer (20% off favorite meal)',
        priority: 'high',
        estimatedImpact: 'Retain $2,850 CLV',
        timeframe: 'Today'
      },
      {
        action: 'Schedule personal call from manager',
        priority: 'medium',
        estimatedImpact: 'Improve relationship',
        timeframe: 'This week'
      }
    ],
    alertRule: 'High-Value Customer Absence >45 days',
    isAutonomous: false
  },
  {
    id: 'ca-002',
    type: 'configured-alert',
    title: 'High Comps Alert',
    description: 'Configured alert: Comps exceeded $500 threshold today',
    insight: 'Today\'s comps reached $847, exceeding your configured $500 alert threshold.',
    reasoning: [
      'Comp amount: $847 (threshold: $500)',
      '12 comp transactions recorded today',
      'Manager override used 8 times',
      'Average comp value: $70.58'
    ],
    confidence: 1.0,
    severity: 'critical',
    category: 'financial',
    timestamp: '2024-01-14 16:45:00',
    dataPoints: [
      { metric: 'Comps Today', value: '$847', trend: 'up' },
      { metric: 'Threshold', value: '$500', trend: 'stable' },
      { metric: 'Transactions', value: '12', trend: 'up' }
    ],
    recommendations: [
      {
        action: 'Review comp transactions and reasons',
        priority: 'high',
        estimatedImpact: 'Identify patterns',
        timeframe: 'Today'
      },
      {
        action: 'Update comp policy if needed',
        priority: 'medium',
        estimatedImpact: 'Prevent future overages',
        timeframe: 'This week'
      }
    ],
    alertRule: 'Daily Comps >$500',
    isAutonomous: false
  }
];

// AI Models Data
export const mockAIModels: AIModel[] = [
  {
    id: 'model-001',
    name: 'Revenue Opportunity Detector',
    type: 'anomaly-detection',
    description: 'Identifies untapped revenue opportunities by comparing performance to similar businesses',
    accuracy: 0.89,
    lastUpdated: '2024-01-10',
    dataSource: ['Sales data', 'Competitor benchmarks', 'Market analysis', 'Customer behavior'],
    parameters: {
      lookbackPeriod: 90,
      confidenceThreshold: 0.85,
      marketRadius: 2.0,
      minOpportunitySize: 500
    }
  },
  {
    id: 'model-002',
    name: 'Labor Optimization Engine',
    type: 'forecasting',
    description: 'Optimizes staff scheduling based on predicted demand and service requirements',
    accuracy: 0.94,
    lastUpdated: '2024-01-12',
    dataSource: ['Historical sales', 'Staffing records', 'Service metrics', 'Customer feedback'],
    parameters: {
      forecastHorizon: 14,
      serviceQualityWeight: 0.3,
      costOptimizationWeight: 0.7,
      minimumStaffLevels: { servers: 2, kitchen: 1 }
    }
  }
];

// Advanced Analytics Metrics
export const mockAdvancedAnalyticsMetrics: AdvancedAnalyticsMetrics = {
  forecastAccuracy: 0.87,
  modelPerformance: {
    sales: 0.89,
    labor: 0.94,
    customer: 0.82
  },
  insightsGenerated: 47,
  actionsTaken: 23,
  costSavings: 12450,
  revenueImpact: 8900
};
