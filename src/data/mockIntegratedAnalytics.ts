import {
  IntegratedMenuItem,
  CashFlowIntelligence,
  SupplyChainAnalytics,
  ProfitabilityAnalytics,
  CostOptimizationCenter,
  IntegratedAIInsight,
  IntegratedDashboardWidget
} from '../types/integrated-analytics';

// ===== INTEGRATED MENU ITEMS WITH REAL COSTS =====
export const mockIntegratedMenuItems: IntegratedMenuItem[] = [
  {
    id: 'margherita-pizza',
    name: 'Margherita Pizza',
    category: 'Pizza',
    salesPrice: 16.99,
    ingredients: [
      {
        ingredientId: 'tomato-001',
        ingredientName: 'Roma Tomatoes',
        quantity: 0.5,
        unit: 'lb',
        currentCost: 1.44,
        bestVendorPrice: 1.34,
        currentVendor: 'Sysco',
        bestVendor: 'Restaurant Depot',
        potentialSavings: 0.10,
        priceStability: 'seasonal'
      },
      {
        ingredientId: 'mozzarella-001',
        ingredientName: 'Fresh Mozzarella',
        quantity: 0.3,
        unit: 'lb',
        currentCost: 2.10,
        bestVendorPrice: 2.10,
        currentVendor: 'Sysco',
        bestVendor: 'Sysco',
        potentialSavings: 0.00,
        priceStability: 'stable'
      },
      {
        ingredientId: 'flour-001',
        ingredientName: 'Pizza Flour',
        quantity: 0.25,
        unit: 'lb',
        currentCost: 0.45,
        bestVendorPrice: 0.42,
        currentVendor: 'Sysco',
        bestVendor: 'Restaurant Depot',
        potentialSavings: 0.03,
        priceStability: 'stable'
      }
    ],
    totalIngredientCost: 3.99,
    grossMargin: 13.00,
    grossMarginPercent: 76.5,
    salesVolume: 145,
    totalRevenue: 2463.55,
    totalProfit: 1885.55,
    profitabilityRank: 2,
    costTrends: [
      { date: '2024-11-01', totalCost: 3.85, margin: 13.14, marginPercent: 77.3, primaryDriver: 'Stable costs' },
      { date: '2024-11-15', totalCost: 3.99, margin: 13.00, marginPercent: 76.5, primaryDriver: 'Tomato price increase' }
    ],
    vendorRisk: {
      overallRisk: 'medium',
      paymentRisk: 25,
      deliveryRisk: 15,
      priceRisk: 35,
      riskFactors: ['Seasonal tomato pricing', 'Single vendor dependency'],
      mitigationSuggestions: ['Diversify tomato suppliers', 'Consider seasonal menu adjustments']
    }
  },
  {
    id: 'caesar-salad',
    name: 'Caesar Salad',
    category: 'Salads',
    salesPrice: 12.99,
    ingredients: [
      {
        ingredientId: 'romaine-001',
        ingredientName: 'Romaine Lettuce',
        quantity: 0.3,
        unit: 'lb',
        currentCost: 0.89,
        bestVendorPrice: 0.75,
        currentVendor: 'Sysco',
        bestVendor: 'Green Valley Farms',
        potentialSavings: 0.14,
        priceStability: 'volatile'
      },
      {
        ingredientId: 'parmesan-001',
        ingredientName: 'Parmesan Cheese',
        quantity: 0.1,
        unit: 'lb',
        currentCost: 1.25,
        bestVendorPrice: 1.25,
        currentVendor: 'Sysco',
        bestVendor: 'Sysco',
        potentialSavings: 0.00,
        priceStability: 'stable'
      }
    ],
    totalIngredientCost: 2.89,
    grossMargin: 10.10,
    grossMarginPercent: 77.8,
    salesVolume: 89,
    totalRevenue: 1156.11,
    totalProfit: 899.11,
    profitabilityRank: 1,
    costTrends: [
      { date: '2024-11-01', totalCost: 2.65, margin: 10.34, marginPercent: 79.6, primaryDriver: 'Lower lettuce costs' },
      { date: '2024-11-15', totalCost: 2.89, margin: 10.10, marginPercent: 77.8, primaryDriver: 'Lettuce price volatility' }
    ],
    vendorRisk: {
      overallRisk: 'high',
      paymentRisk: 20,
      deliveryRisk: 40,
      priceRisk: 60,
      riskFactors: ['High lettuce price volatility', 'Weather-dependent supply'],
      mitigationSuggestions: ['Contract with multiple lettuce suppliers', 'Consider hydroponic suppliers']
    }
  }
];

// ===== CASH FLOW INTELLIGENCE =====
export const mockCashFlowIntelligence: CashFlowIntelligence[] = [
  {
    date: '2024-11-26',
    revenueIn: 4200.00,
    paymentsOut: 876.54,
    netCashFlow: 3323.46,
    runningBalance: 15823.46,
    riskLevel: 'low',
    optimizationOpportunities: [
      {
        type: 'payment-method',
        description: 'Switch Restaurant Depot payment to Square Checking',
        potentialSavings: 25.42,
        implementationEffort: 'low',
        timeframe: 'Next payment cycle'
      }
    ],
    vendorPayments: [
      {
        vendorId: 'restaurant-depot-001',
        vendorName: 'Restaurant Depot',
        paymentAmount: 876.54,
        paymentDate: '2024-11-26',
        impactOnCashFlow: -876.54,
        paymentMethod: 'Credit Card',
        fees: 25.42,
        alternativeOptions: [
          {
            method: 'Square Checking',
            fee: 0,
            processingTime: '1-2 days',
            cashFlowImpact: -876.54,
            recommendation: true
          }
        ]
      }
    ]
  }
];

// ===== SUPPLY CHAIN ANALYTICS =====
export const mockSupplyChainAnalytics: SupplyChainAnalytics[] = [
  {
    vendorId: 'sysco-001',
    vendorName: 'Sysco Corporation',
    totalSpend: 8500.00,
    paymentTerms: 'Net 30',
    averagePaymentDelay: 5.2,
    onTimeDeliveryRate: 94,
    qualityScore: 87,
    priceCompetitiveness: 72,
    riskScore: 35,
    businessImpact: {
      revenueAtRisk: 12500.00,
      costImpact: 850.00,
      operationalRisk: 'Medium - Primary supplier for key ingredients',
      customerSatisfactionImpact: 85
    },
    recommendations: [
      {
        type: 'vendor-diversification',
        priority: 'high',
        description: 'Reduce dependency by sourcing 30% of produce from alternative vendors',
        expectedBenefit: 'Lower risk and 8% cost reduction',
        implementationSteps: [
          'Identify alternative produce suppliers',
          'Negotiate trial contracts',
          'Implement gradual transition plan'
        ]
      }
    ]
  },
  {
    vendorId: 'restaurant-depot-001',
    vendorName: 'Restaurant Depot',
    totalSpend: 4200.00,
    paymentTerms: 'Net 15',
    averagePaymentDelay: 2.1,
    onTimeDeliveryRate: 91,
    qualityScore: 85,
    priceCompetitiveness: 89,
    riskScore: 25,
    businessImpact: {
      revenueAtRisk: 3200.00,
      costImpact: 420.00,
      operationalRisk: 'Low - Secondary supplier with good alternatives',
      customerSatisfactionImpact: 78
    },
    recommendations: [
      {
        type: 'contract-renegotiation',
        priority: 'medium',
        description: 'Negotiate volume discounts based on increased spending',
        expectedBenefit: '5% additional savings on bulk orders',
        implementationSteps: [
          'Analyze current spending patterns',
          'Prepare volume commitment proposal',
          'Schedule negotiation meeting'
        ]
      }
    ]
  }
];

// ===== COST OPTIMIZATION CENTER =====
export const mockCostOptimizationCenter: CostOptimizationCenter = {
  totalSavingsOpportunity: 2847.50,
  quickWins: [
    {
      id: 'qw-001',
      title: 'Switch Tomato Supplier',
      description: 'Move Roma tomato orders from Sysco to Restaurant Depot',
      category: 'vendor-switch',
      potentialSavings: 234.50,
      implementationTime: '1 week',
      effort: 'low',
      confidence: 0.92,
      actionSteps: [
        'Contact Restaurant Depot for availability confirmation',
        'Update order guide preferences',
        'Monitor quality for first 2 deliveries'
      ]
    },
    {
      id: 'qw-002',
      title: 'Payment Method Optimization',
      description: 'Switch vendor payments to Square Checking',
      category: 'payment-method',
      potentialSavings: 804.00,
      implementationTime: '3 days',
      effort: 'low',
      confidence: 0.95,
      actionSteps: [
        'Set up Square Checking for vendor payments',
        'Update payment preferences in Bill Pay',
        'Schedule existing payments to new method'
      ]
    },
    {
      id: 'qw-003',
      title: 'Bulk Flour Ordering',
      description: 'Order flour monthly instead of weekly for bulk discounts',
      category: 'bulk-ordering',
      potentialSavings: 156.80,
      implementationTime: '2 weeks',
      effort: 'medium',
      confidence: 0.87,
      actionSteps: [
        'Analyze monthly flour usage patterns',
        'Verify storage capacity for bulk orders',
        'Update ordering schedule and quantities'
      ]
    }
  ],
  strategicInitiatives: [
    {
      id: 'si-001',
      title: 'Supply Chain Diversification',
      description: 'Reduce single-vendor dependency by establishing relationships with 2-3 suppliers per category',
      category: 'supply-chain',
      potentialImpact: 1250.00,
      timeframe: '3-6 months',
      investmentRequired: 500.00,
      roi: 250,
      keyMilestones: [
        'Vendor evaluation and selection',
        'Contract negotiations',
        'Pilot program implementation',
        'Full rollout and optimization'
      ]
    }
  ],
  vendorNegotiations: [
    {
      vendorId: 'sysco-001',
      vendorName: 'Sysco Corporation',
      currentSpend: 8500.00,
      negotiationLeverage: 'medium',
      potentialSavings: 425.00,
      negotiationPoints: [
        'Volume commitment for better pricing',
        'Extended payment terms',
        'Delivery schedule optimization'
      ],
      alternativeVendors: ['Restaurant Depot', 'US Foods'],
      riskFactors: ['Potential service disruption', 'Quality consistency concerns']
    }
  ],
  processImprovements: [
    {
      area: 'ordering',
      currentEfficiency: 75,
      targetEfficiency: 90,
      costReduction: 180.00,
      implementationPlan: [
        'Implement automated reorder points',
        'Integrate POS with Order Guide',
        'Set up demand forecasting'
      ],
      technologyRequirements: ['API integration', 'Inventory management system']
    }
  ],
  riskMitigations: [
    {
      riskType: 'supply-disruption',
      currentRiskLevel: 'medium',
      potentialImpact: 5000.00,
      mitigationStrategies: [
        'Maintain 2-week safety stock for critical ingredients',
        'Establish backup supplier relationships',
        'Implement supply chain monitoring'
      ],
      monitoringMetrics: ['Delivery success rate', 'Quality scores', 'Price volatility'],
      contingencyPlans: ['Emergency supplier activation', 'Menu substitution protocols']
    }
  ]
};

// ===== INTEGRATED AI INSIGHTS =====
export const mockIntegratedAIInsights: IntegratedAIInsight[] = [
  {
    id: 'iai-001',
    type: 'cost-revenue-optimization',
    title: 'Menu Profitability Optimization',
    description: 'Switch tomato supplier to increase Margherita pizza margin by 3.2%',
    insight: 'By switching Roma tomatoes from Sysco ($2.89/lb) to Restaurant Depot ($2.67/lb), your Margherita pizza margin increases from 76.5% to 79.7%, generating an additional $234/month in profit.',
    reasoning: [
      'Current tomato cost: $1.44 per pizza (Sysco at $2.89/lb)',
      'Alternative cost: $1.34 per pizza (Restaurant Depot at $2.67/lb)',
      'Savings per pizza: $0.10',
      'Monthly volume: 145 pizzas × $0.10 = $14.50 savings',
      'Annual impact: $174 additional profit'
    ],
    confidence: 0.92,
    severity: 'success',
    category: 'profitability',
    timestamp: '2024-11-25T14:30:00Z',
    dataPoints: [
      { metric: 'Current Margin', value: '76.5%', trend: 'stable', source: 'integrated' },
      { metric: 'Optimized Margin', value: '79.7%', trend: 'up', source: 'integrated' },
      { metric: 'Monthly Savings', value: '$234', trend: 'up', source: 'order-guide' },
      { metric: 'Quality Score', value: '85/100', trend: 'stable', source: 'order-guide' }
    ],
    recommendations: [
      {
        action: 'Switch tomato supplier to Restaurant Depot',
        priority: 'high',
        estimatedImpact: '$234/month profit increase',
        timeframe: 'Next order cycle',
        implementationSteps: [
          'Contact Restaurant Depot for availability',
          'Place trial order for quality verification',
          'Update order guide preferences',
          'Monitor first 3 deliveries for consistency'
        ]
      }
    ],
    potentialSavings: 234.50,
    revenueImpact: 0,
    affectedVendors: ['Sysco Corporation', 'Restaurant Depot'],
    affectedMenuItems: ['Margherita Pizza', 'Marinara Pasta', 'Caprese Salad'],
    crossPlatformData: {
      posData: { margheritaSales: 145, averagePrice: 16.99 },
      orderGuideData: { currentVendor: 'Sysco', alternativeVendor: 'Restaurant Depot' },
      billPayData: { syscoPaymentTerms: 'Net 30', rdPaymentTerms: 'Net 15' }
    }
  },
  {
    id: 'iai-002',
    type: 'cash-flow-optimization',
    title: 'Payment Timing Optimization',
    description: 'Reschedule Tuesday payments to improve cash flow by $1,200',
    insight: 'Your Tuesday payment schedule creates cash flow strain when revenue is 25% below average. Rescheduling 3 vendor payments to Wednesday-Thursday improves cash flow stability.',
    reasoning: [
      'Tuesday average revenue: $3,200 (vs $4,200 weekly average)',
      'Tuesday scheduled payments: $2,100',
      'Net Tuesday cash flow: $1,100 (tight margin)',
      'Wednesday-Thursday average revenue: $4,500',
      'Recommended: Move $1,500 in payments to Wed-Thu'
    ],
    confidence: 0.85,
    severity: 'warning',
    category: 'cash-flow',
    timestamp: '2024-11-25T15:45:00Z',
    dataPoints: [
      { metric: 'Tuesday Revenue', value: '$3,200', trend: 'down', source: 'pos' },
      { metric: 'Tuesday Payments', value: '$2,100', trend: 'stable', source: 'bill-pay' },
      { metric: 'Cash Flow Risk', value: 'High', trend: 'up', source: 'integrated' }
    ],
    recommendations: [
      {
        action: 'Reschedule Sysco payment to Wednesday',
        priority: 'high',
        estimatedImpact: 'Improved cash flow stability',
        timeframe: 'This week',
        implementationSteps: [
          'Review current payment schedule',
          'Contact vendors for payment date flexibility',
          'Update Bill Pay scheduling',
          'Monitor cash flow improvements'
        ]
      }
    ],
    potentialSavings: 0,
    revenueImpact: 1200,
    relatedBills: ['bill-001', 'bill-002'],
    crossPlatformData: {
      posData: { tuesdayRevenue: 3200, weeklyAverage: 4200 },
      orderGuideData: { vendorFlexibility: 'medium' },
      billPayData: { tuesdayPayments: 2100, paymentFlexibility: 'high' }
    }
  },
  {
    id: 'iai-003',
    type: 'supply-chain-risk',
    title: 'Vendor Dependency Risk Alert',
    description: 'High dependency on Sysco creates $12,500 revenue risk',
    insight: 'Sysco supplies 68% of your ingredients affecting 85% of menu items. Supply disruption could impact $12,500 in weekly revenue. Diversification recommended.',
    reasoning: [
      'Sysco dependency: 68% of ingredient spend',
      'Menu items at risk: 85% (12 of 14 items)',
      'Weekly revenue exposure: $12,500',
      'Alternative suppliers available for 90% of items',
      'Diversification could reduce risk by 40%'
    ],
    confidence: 0.78,
    severity: 'warning',
    category: 'supply-chain',
    timestamp: '2024-11-25T16:20:00Z',
    dataPoints: [
      { metric: 'Vendor Dependency', value: '68%', trend: 'up', source: 'order-guide' },
      { metric: 'Revenue at Risk', value: '$12,500', trend: 'stable', source: 'integrated' },
      { metric: 'Alternative Options', value: '90%', trend: 'stable', source: 'order-guide' }
    ],
    recommendations: [
      {
        action: 'Implement vendor diversification strategy',
        priority: 'medium',
        estimatedImpact: '40% risk reduction',
        timeframe: '3-6 months',
        implementationSteps: [
          'Identify alternative suppliers for top 10 ingredients',
          'Negotiate trial contracts with 2-3 vendors',
          'Implement 70/30 split for critical ingredients',
          'Monitor quality and delivery performance'
        ]
      }
    ],
    affectedVendors: ['Sysco Corporation'],
    affectedMenuItems: ['Margherita Pizza', 'Caesar Salad', 'Chicken Parmesan'],
    crossPlatformData: {
      posData: { revenueAtRisk: 12500, affectedItems: 12 },
      orderGuideData: { syscoDependency: 0.68, alternativeVendors: 3 },
      billPayData: { syscoSpend: 8500, paymentRisk: 'medium' }
    }
  }
];

// ===== INTEGRATED DASHBOARD WIDGETS =====
export const mockIntegratedDashboardWidgets: IntegratedDashboardWidget[] = [
  {
    id: 'true-food-cost',
    title: 'True Food Cost %',
    value: '28.5%',
    change: '-1.2%',
    changeType: 'positive',
    category: 'profitability',
    description: 'Real-time food cost percentage using live ingredient pricing',
    dataSources: ['pos', 'order-guide'],
    trend: [29.8, 29.2, 28.9, 28.7, 28.5],
    breakdown: [
      { label: 'Ingredient Costs', value: '$12,450', source: 'Order Guide' },
      { label: 'Total Revenue', value: '$43,684', source: 'POS' },
      { label: 'Cost Savings', value: '$234', subtext: 'vs last month', source: 'Integrated' }
    ],
    insights: [
      'Tomato supplier switch saved $234 this month',
      '2.3% below industry average of 30.8%'
    ],
    actionable: true,
    quickActions: [
      { label: 'View Cost Breakdown', action: 'navigate-cost-analysis' },
      { label: 'Optimize Suppliers', action: 'open-vendor-comparison' }
    ]
  },
  {
    id: 'cash-flow-health',
    title: 'Cash Flow Health Score',
    value: '92/100',
    change: '+5 points',
    changeType: 'positive',
    category: 'cash-flow',
    description: 'Overall cash flow stability and optimization score',
    dataSources: ['pos', 'bill-pay'],
    trend: [85, 87, 89, 90, 92],
    breakdown: [
      { label: 'Payment Timing', value: '95/100', subtext: 'Excellent', source: 'Bill Pay' },
      { label: 'Cash Buffer', value: '88/100', subtext: 'Good', source: 'Integrated' },
      { label: 'Vendor Terms', value: '92/100', subtext: 'Very Good', source: 'Bill Pay' }
    ],
    insights: [
      'Payment optimization saved $67 in fees',
      'Cash flow 15% more stable than last quarter'
    ],
    actionable: true,
    quickActions: [
      { label: 'View Cash Flow', action: 'navigate-cash-flow' },
      { label: 'Optimize Payments', action: 'open-payment-optimizer' }
    ]
  },
  {
    id: 'vendor-risk-score',
    title: 'Vendor Risk Assessment',
    value: '35/100',
    change: 'Medium Risk',
    changeType: 'neutral',
    category: 'supply-chain',
    description: 'Supply chain risk based on vendor dependency and performance',
    dataSources: ['order-guide', 'bill-pay'],
    trend: [42, 38, 36, 35, 35],
    breakdown: [
      { label: 'Sysco Dependency', value: '68%', subtext: 'High', source: 'Order Guide' },
      { label: 'Payment Risk', value: '25/100', subtext: 'Low', source: 'Bill Pay' },
      { label: 'Delivery Risk', value: '15/100', subtext: 'Low', source: 'Order Guide' }
    ],
    insights: [
      'High dependency on single vendor',
      'Consider diversifying produce suppliers'
    ],
    actionable: true,
    quickActions: [
      { label: 'View Risk Analysis', action: 'navigate-supply-chain' },
      { label: 'Find Alternatives', action: 'open-vendor-search' }
    ]
  },
  {
    id: 'menu-profitability',
    title: 'Menu Profitability Ranking',
    value: '#1 Caesar Salad',
    change: '77.8% margin',
    changeType: 'positive',
    category: 'profitability',
    description: 'Real-time menu item profitability with live ingredient costs',
    dataSources: ['pos', 'order-guide'],
    trend: [76.2, 76.8, 77.1, 77.5, 77.8],
    breakdown: [
      { label: 'Caesar Salad', value: '77.8%', subtext: '#1 margin', source: 'Integrated' },
      { label: 'Margherita Pizza', value: '76.5%', subtext: '#2 margin', source: 'Integrated' },
      { label: 'Chicken Parmesan', value: '68.2%', subtext: '#3 margin', source: 'Integrated' }
    ],
    insights: [
      'Lettuce price volatility affects Caesar profitability',
      'Pizza margins improved with tomato supplier switch'
    ],
    actionable: true,
    quickActions: [
      { label: 'View Full Ranking', action: 'navigate-menu-analysis' },
      { label: 'Optimize Costs', action: 'open-cost-optimizer' }
    ]
  },
  {
    id: 'cost-savings-opportunities',
    title: 'Cost Savings Opportunities',
    value: '$2,847',
    change: '+$234 identified',
    changeType: 'positive',
    category: 'cost-optimization',
    description: 'AI-identified cost reduction opportunities across operations',
    dataSources: ['pos', 'order-guide', 'bill-pay'],
    trend: [2200, 2400, 2600, 2613, 2847],
    breakdown: [
      { label: 'Payment Method Switch', value: '$804', subtext: 'Quick win', source: 'Bill Pay' },
      { label: 'Vendor Optimization', value: '$1,250', subtext: 'Strategic', source: 'Order Guide' },
      { label: 'Bulk Ordering', value: '$793', subtext: 'Process', source: 'Integrated' }
    ],
    insights: [
      '5 quick wins available (< 1 week implementation)',
      'ROI of 340% on optimization investments'
    ],
    actionable: true,
    quickActions: [
      { label: 'View All Opportunities', action: 'navigate-cost-optimization' },
      { label: 'Implement Quick Wins', action: 'start-quick-wins' }
    ]
  },
  {
    id: 'payment-optimization',
    title: 'Payment Optimization Score',
    value: '87/100',
    change: '+12 points',
    changeType: 'positive',
    category: 'cash-flow',
    description: 'Efficiency of payment methods and timing optimization',
    dataSources: ['bill-pay'],
    trend: [72, 76, 81, 84, 87],
    breakdown: [
      { label: 'Method Efficiency', value: '92%', subtext: 'Excellent', source: 'Bill Pay' },
      { label: 'Timing Optimization', value: '85%', subtext: 'Good', source: 'Bill Pay' },
      { label: 'Fee Minimization', value: '89%', subtext: 'Very Good', source: 'Bill Pay' }
    ],
    insights: [
      'Square Checking adoption reduced fees by 67%',
      'Payment timing optimization improved cash flow'
    ],
    actionable: true,
    quickActions: [
      { label: 'View Payment Analysis', action: 'navigate-payment-analysis' },
      { label: 'Optimize Schedule', action: 'open-payment-scheduler' }
    ]
  }
];
