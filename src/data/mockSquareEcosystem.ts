import {
  Vendor,
  Ingredient,
  MenuItem,
  OrderGuide,
  ProcurementRecommendation,
  VendorAccount,
  Bill,
  Payment,
  CashFlowProjection,
  APAnalytics,
  SquareEcosystemInsight,
  IntegratedDashboardMetric,
  PaymentMethod
} from '../types/square-ecosystem';

// ===== VENDORS =====
export const mockVendors: Vendor[] = [
  {
    id: 'sysco-001',
    name: 'Sysco Corporation',
    type: 'sysco',
    logo: '🚛',
    rating: 4.2,
    deliveryDays: ['Monday', 'Wednesday', 'Friday'],
    minimumOrder: 150,
    paymentTerms: 'Net 30',
    contact: {
      name: 'Mike Rodriguez',
      phone: '(555) 123-4567',
      email: 'mike.rodriguez@sysco.com'
    },
    performance: {
      onTimeDelivery: 94,
      qualityScore: 87,
      priceCompetitiveness: 72,
      customerService: 89
    }
  },
  {
    id: 'restaurant-depot-001',
    name: 'Restaurant Depot',
    type: 'restaurant-depot',
    logo: '🏪',
    rating: 4.0,
    deliveryDays: ['Tuesday', 'Thursday', 'Saturday'],
    minimumOrder: 100,
    paymentTerms: 'Net 15',
    contact: {
      name: 'Sarah Chen',
      phone: '(555) 987-6543',
      email: 'sarah.chen@restaurantdepot.com'
    },
    performance: {
      onTimeDelivery: 91,
      qualityScore: 85,
      priceCompetitiveness: 89,
      customerService: 82
    }
  },
  {
    id: 'local-produce-001',
    name: 'Green Valley Farms',
    type: 'local',
    logo: '🌱',
    rating: 4.7,
    deliveryDays: ['Monday', 'Wednesday', 'Friday'],
    minimumOrder: 75,
    paymentTerms: 'Net 15',
    contact: {
      name: 'Tom Johnson',
      phone: '(555) 456-7890',
      email: 'tom@greenvalleyfarms.com'
    },
    performance: {
      onTimeDelivery: 96,
      qualityScore: 95,
      priceCompetitiveness: 65,
      customerService: 98
    }
  }
];

// ===== INGREDIENTS =====
export const mockIngredients: Ingredient[] = [
  {
    id: 'tomato-001',
    name: 'Roma Tomatoes',
    category: 'produce',
    unit: 'lb',
    currentPrice: 2.89,
    priceHistory: [
      { date: '2024-11-01', price: 2.45, vendorId: 'sysco-001' },
      { date: '2024-11-15', price: 2.89, vendorId: 'sysco-001' },
      { date: '2024-11-01', price: 2.32, vendorId: 'restaurant-depot-001' },
      { date: '2024-11-15', price: 2.67, vendorId: 'restaurant-depot-001' }
    ],
    vendors: [
      {
        vendorId: 'sysco-001',
        vendorName: 'Sysco Corporation',
        price: 2.89,
        unit: 'lb',
        minimumQuantity: 10,
        bulkDiscounts: [
          { quantity: 25, discountPercent: 5, pricePerUnit: 2.75 },
          { quantity: 50, discountPercent: 10, pricePerUnit: 2.60 }
        ],
        lastUpdated: '2024-11-25',
        availability: 'in-stock'
      },
      {
        vendorId: 'restaurant-depot-001',
        vendorName: 'Restaurant Depot',
        price: 2.67,
        unit: 'lb',
        minimumQuantity: 20,
        bulkDiscounts: [
          { quantity: 40, discountPercent: 8, pricePerUnit: 2.46 }
        ],
        lastUpdated: '2024-11-25',
        availability: 'in-stock'
      }
    ],
    seasonality: [
      { month: 1, averagePrice: 3.20, availability: 'low', qualityRating: 3.2 },
      { month: 6, averagePrice: 2.10, availability: 'high', qualityRating: 4.8 },
      { month: 11, averagePrice: 2.89, availability: 'medium', qualityRating: 4.1 }
    ],
    qualityGrade: 'Grade A',
    shelfLife: 7
  },
  {
    id: 'chicken-breast-001',
    name: 'Boneless Chicken Breast',
    category: 'protein',
    unit: 'lb',
    currentPrice: 4.99,
    priceHistory: [
      { date: '2024-11-01', price: 4.85, vendorId: 'sysco-001' },
      { date: '2024-11-15', price: 4.99, vendorId: 'sysco-001' }
    ],
    vendors: [
      {
        vendorId: 'sysco-001',
        vendorName: 'Sysco Corporation',
        price: 4.99,
        unit: 'lb',
        minimumQuantity: 5,
        bulkDiscounts: [
          { quantity: 20, discountPercent: 7, pricePerUnit: 4.64 }
        ],
        lastUpdated: '2024-11-25',
        availability: 'in-stock'
      }
    ],
    seasonality: [
      { month: 1, averagePrice: 5.20, availability: 'medium', qualityRating: 4.5 }
    ],
    qualityGrade: 'Grade A',
    shelfLife: 3
  }
];

// ===== MENU ITEMS =====
export const mockMenuItems: MenuItem[] = [
  {
    id: 'margherita-pizza',
    name: 'Margherita Pizza',
    category: 'Pizza',
    price: 16.99,
    ingredients: [
      {
        ingredientId: 'tomato-001',
        ingredientName: 'Roma Tomatoes',
        quantity: 0.5,
        unit: 'lb',
        cost: 1.44,
        vendorId: 'sysco-001'
      },
      {
        ingredientId: 'mozzarella-001',
        ingredientName: 'Fresh Mozzarella',
        quantity: 0.3,
        unit: 'lb',
        cost: 2.10,
        vendorId: 'sysco-001'
      }
    ],
    costAnalysis: {
      totalCost: 4.89,
      margin: 12.10,
      marginPercent: 71.2
    }
  }
];

// ===== PAYMENT METHODS =====
export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'square-checking',
    type: 'square-checking',
    name: 'Square Checking',
    fee: 0,
    feeType: 'fixed',
    processingTime: '1-2 business days',
    description: 'Free ACH transfers from Square Checking account'
  },
  {
    id: 'debit-card',
    type: 'debit',
    name: 'Debit Card',
    fee: 0,
    feeType: 'fixed',
    processingTime: 'Instant',
    description: 'Free debit card payments'
  },
  {
    id: 'credit-card',
    type: 'credit',
    name: 'Credit Card',
    fee: 2.9,
    feeType: 'percentage',
    processingTime: 'Instant',
    description: '2.9% fee for credit card payments'
  },
  {
    id: 'ach-transfer',
    type: 'ach',
    name: 'ACH Transfer',
    fee: 1.50,
    feeType: 'fixed',
    processingTime: '2-3 business days',
    description: '$1.50 flat fee for ACH bank transfers'
  }
];

// ===== VENDOR ACCOUNTS =====
export const mockVendorAccounts: VendorAccount[] = [
  {
    id: 'va-sysco-001',
    vendorId: 'sysco-001',
    vendorName: 'Sysco Corporation',
    accountNumber: 'SYS-789456',
    paymentTerms: 'Net 30',
    creditLimit: 15000,
    currentBalance: 3247.89,
    paymentMethods: mockPaymentMethods,
    preferredPaymentMethod: 'square-checking',
    address: {
      street: '1390 Enclave Pkwy',
      city: 'Houston',
      state: 'TX',
      zipCode: '77077'
    }
  },
  {
    id: 'va-restaurant-depot-001',
    vendorId: 'restaurant-depot-001',
    vendorName: 'Restaurant Depot',
    accountNumber: 'RD-123789',
    paymentTerms: 'Net 15',
    currentBalance: 1876.54,
    paymentMethods: mockPaymentMethods,
    preferredPaymentMethod: 'debit-card',
    address: {
      street: '500 Food Center Dr',
      city: 'Bronx',
      state: 'NY',
      zipCode: '10474'
    }
  }
];

// ===== BILLS =====
export const mockBills: Bill[] = [
  {
    id: 'bill-001',
    vendorId: 'sysco-001',
    vendorName: 'Sysco Corporation',
    invoiceNumber: 'SYS-INV-2024-1125',
    amount: 1247.89,
    dueDate: '2024-12-15',
    issueDate: '2024-11-15',
    status: 'pending',
    category: 'inventory',
    description: 'Weekly food delivery - produce and proteins',
    lineItems: [
      {
        id: 'li-001',
        description: 'Roma Tomatoes - 25 lbs',
        quantity: 25,
        unitPrice: 2.75,
        totalPrice: 68.75,
        category: 'produce'
      },
      {
        id: 'li-002',
        description: 'Chicken Breast - 20 lbs',
        quantity: 20,
        unitPrice: 4.64,
        totalPrice: 92.80,
        category: 'protein'
      }
    ]
  },
  {
    id: 'bill-002',
    vendorId: 'restaurant-depot-001',
    vendorName: 'Restaurant Depot',
    invoiceNumber: 'RD-INV-2024-1120',
    amount: 876.54,
    dueDate: '2024-12-05',
    issueDate: '2024-11-20',
    status: 'scheduled',
    category: 'inventory',
    description: 'Bulk dry goods and beverages',
    lineItems: [
      {
        id: 'li-003',
        description: 'Flour - 50 lb bags x 4',
        quantity: 4,
        unitPrice: 28.50,
        totalPrice: 114.00,
        category: 'dry-goods'
      }
    ]
  },
  {
    id: 'bill-003',
    vendorId: 'utility-001',
    vendorName: 'Pacific Gas & Electric',
    invoiceNumber: 'PGE-2024-11',
    amount: 432.18,
    dueDate: '2024-12-01',
    issueDate: '2024-11-01',
    status: 'overdue',
    category: 'utilities',
    description: 'Monthly electricity and gas service',
    lineItems: [
      {
        id: 'li-004',
        description: 'Electricity Usage - 1,250 kWh',
        quantity: 1250,
        unitPrice: 0.28,
        totalPrice: 350.00,
        category: 'utilities'
      }
    ]
  }
];

// ===== CASH FLOW PROJECTIONS =====
export const mockCashFlowProjections: CashFlowProjection[] = [
  {
    date: '2024-11-26',
    incomingRevenue: 4200.00,
    outgoingPayments: 876.54,
    netCashFlow: 3323.46,
    runningBalance: 12500.00,
    projectedBalance: 15823.46,
    riskLevel: 'low'
  },
  {
    date: '2024-11-27',
    incomingRevenue: 3800.00,
    outgoingPayments: 432.18,
    netCashFlow: 3367.82,
    runningBalance: 15823.46,
    projectedBalance: 19191.28,
    riskLevel: 'low'
  },
  {
    date: '2024-12-01',
    incomingRevenue: 4500.00,
    outgoingPayments: 2100.00,
    netCashFlow: 2400.00,
    runningBalance: 18000.00,
    projectedBalance: 20400.00,
    riskLevel: 'medium'
  }
];

// ===== PROCUREMENT RECOMMENDATIONS =====
export const mockProcurementRecommendations: ProcurementRecommendation[] = [
  {
    id: 'rec-001',
    type: 'vendor-switch',
    title: 'Switch Tomato Supplier',
    description: 'Restaurant Depot offers Roma tomatoes 8% cheaper than Sysco',
    potentialSavings: 234.50,
    confidence: 0.92,
    timeframe: 'Next order cycle',
    ingredients: ['Roma Tomatoes'],
    currentVendor: 'Sysco Corporation',
    recommendedVendor: 'Restaurant Depot',
    actionRequired: 'Update order guide and place next tomato order with Restaurant Depot',
    impact: 'high'
  },
  {
    id: 'rec-002',
    type: 'bulk-discount',
    title: 'Bulk Chicken Purchase',
    description: 'Order 20+ lbs of chicken breast to get 7% bulk discount',
    potentialSavings: 89.40,
    confidence: 0.87,
    timeframe: 'This week',
    ingredients: ['Boneless Chicken Breast'],
    currentVendor: 'Sysco Corporation',
    actionRequired: 'Increase chicken order quantity to 20+ lbs',
    impact: 'medium'
  },
  {
    id: 'rec-003',
    type: 'seasonal-timing',
    title: 'Seasonal Produce Timing',
    description: 'Tomato prices typically drop 15% in summer months',
    potentialSavings: 156.80,
    confidence: 0.78,
    timeframe: 'June 2025',
    ingredients: ['Roma Tomatoes', 'Bell Peppers'],
    actionRequired: 'Plan menu adjustments for seasonal price variations',
    impact: 'medium'
  }
];

// ===== SQUARE ECOSYSTEM INSIGHTS =====
export const mockSquareEcosystemInsights: SquareEcosystemInsight[] = [
  {
    id: 'sei-001',
    type: 'procurement-optimization',
    title: 'Vendor Switch Opportunity',
    description: 'Switch produce supplier to save $234/month',
    insight: 'Restaurant Depot consistently offers Roma tomatoes 8% cheaper than Sysco with similar quality ratings.',
    reasoning: [
      'Price difference: $2.67 vs $2.89 per lb (8% savings)',
      'Quality scores: Restaurant Depot 85/100 vs Sysco 87/100',
      'Monthly tomato usage: ~100 lbs',
      'Potential monthly savings: $234'
    ],
    confidence: 0.92,
    severity: 'info',
    category: 'procurement',
    timestamp: '2024-11-25T10:30:00Z',
    dataPoints: [
      { metric: 'Current Cost', value: '$2.89/lb', trend: 'up' },
      { metric: 'Alternative Cost', value: '$2.67/lb', trend: 'stable' },
      { metric: 'Monthly Savings', value: '$234', trend: 'up' }
    ],
    recommendations: [
      {
        action: 'Switch tomato orders to Restaurant Depot',
        priority: 'high',
        estimatedImpact: '$234/month savings',
        timeframe: 'Next order cycle'
      }
    ],
    potentialSavings: 234.50,
    affectedVendors: ['Sysco Corporation', 'Restaurant Depot']
  },
  {
    id: 'sei-002',
    type: 'payment-timing',
    title: 'Cash Flow Optimization',
    description: 'Reschedule 3 vendor payments to avoid Tuesday cash crunch',
    insight: 'Your payment schedule creates cash flow strain on Tuesdays when revenue is typically 25% lower.',
    reasoning: [
      'Tuesday revenue average: $3,200 vs weekly average $4,200',
      'Tuesday scheduled payments: $2,100',
      'Net cash flow on Tuesdays: $1,100 (tight margin)',
      'Recommended: Move 2 payments to Wednesday/Thursday'
    ],
    confidence: 0.85,
    severity: 'warning',
    category: 'cash-flow',
    timestamp: '2024-11-25T11:15:00Z',
    dataPoints: [
      { metric: 'Tuesday Revenue', value: '$3,200', trend: 'down' },
      { metric: 'Tuesday Payments', value: '$2,100', trend: 'stable' },
      { metric: 'Cash Flow Risk', value: 'High', trend: 'up' }
    ],
    recommendations: [
      {
        action: 'Reschedule Sysco payment to Wednesday',
        priority: 'high',
        estimatedImpact: 'Improved cash flow stability',
        timeframe: 'This week'
      }
    ],
    relatedBills: ['bill-001', 'bill-002']
  },
  {
    id: 'sei-003',
    type: 'cost-savings',
    title: 'Payment Method Optimization',
    description: 'Switch to Square Checking to save $67/month in fees',
    insight: 'Using credit cards for vendor payments costs $67/month in fees. Square Checking offers free ACH transfers.',
    reasoning: [
      'Current credit card fees: $67/month (2.9% on $2,310)',
      'Square Checking: $0 fees for ACH transfers',
      'Processing time difference: Instant vs 1-2 days',
      'Annual savings potential: $804'
    ],
    confidence: 0.95,
    severity: 'success',
    category: 'bill-pay',
    timestamp: '2024-11-25T12:00:00Z',
    dataPoints: [
      { metric: 'Monthly Fees', value: '$67', trend: 'up' },
      { metric: 'Square Checking Fees', value: '$0', trend: 'stable' },
      { metric: 'Annual Savings', value: '$804', trend: 'up' }
    ],
    recommendations: [
      {
        action: 'Set up Square Checking for vendor payments',
        priority: 'medium',
        estimatedImpact: '$804 annual savings',
        timeframe: 'Next billing cycle'
      }
    ]
  }
];

// ===== AP ANALYTICS =====
export const mockAPAnalytics: APAnalytics = {
  totalOutstanding: 5556.61,
  averagePaymentCycle: 22,
  vendorCount: 12,
  monthlyPaymentVolume: 18750.00,
  paymentMethodBreakdown: [
    { method: 'Square Checking', volume: 12500.00, fees: 0, percentage: 66.7 },
    { method: 'Credit Card', volume: 4200.00, fees: 121.80, percentage: 22.4 },
    { method: 'Debit Card', volume: 2050.00, fees: 0, percentage: 10.9 }
  ],
  agingReport: {
    current: 3247.89,
    thirtyDays: 1876.54,
    sixtyDays: 432.18,
    ninetyDaysPlus: 0
  },
  topVendorsBySpend: [
    { vendorName: 'Sysco Corporation', monthlySpend: 8500.00, percentage: 45.3 },
    { vendorName: 'Restaurant Depot', monthlySpend: 4200.00, percentage: 22.4 },
    { vendorName: 'Green Valley Farms', monthlySpend: 2800.00, percentage: 14.9 }
  ]
};

// ===== INTEGRATED DASHBOARD METRICS =====
export const mockIntegratedDashboardMetrics: IntegratedDashboardMetric[] = [
  {
    id: 'procurement-savings',
    title: 'Procurement Savings',
    value: '$1,247',
    change: '+18.5%',
    changeType: 'positive',
    category: 'procurement',
    description: 'Monthly cost reductions from vendor optimizations',
    trend: [850, 920, 1050, 1180, 1247],
    breakdown: [
      { label: 'Vendor Switches', value: '$734', subtext: '59% of savings' },
      { label: 'Bulk Discounts', value: '$312', subtext: '25% of savings' },
      { label: 'Seasonal Timing', value: '$201', subtext: '16% of savings' }
    ]
  },
  {
    id: 'payment-schedule',
    title: 'Upcoming Payments',
    value: '$3,247',
    change: '5 vendors',
    changeType: 'neutral',
    category: 'bill-pay',
    description: 'Scheduled vendor payments next 7 days',
    trend: [2800, 3100, 2900, 3400, 3247],
    breakdown: [
      { label: 'Due Today', value: '$0' },
      { label: 'Due This Week', value: '$3,247', subtext: '5 vendors' },
      { label: 'Overdue', value: '$432', subtext: '1 vendor' }
    ]
  },
  {
    id: 'vendor-performance',
    title: 'Vendor Performance',
    value: '87/100',
    change: '+3 points',
    changeType: 'positive',
    category: 'vendor-performance',
    description: 'Average vendor performance score',
    trend: [82, 84, 85, 86, 87],
    breakdown: [
      { label: 'On-Time Delivery', value: '94%', subtext: 'Excellent' },
      { label: 'Quality Score', value: '89%', subtext: 'Good' },
      { label: 'Price Competitiveness', value: '75%', subtext: 'Average' }
    ]
  },
  {
    id: 'cash-flow-health',
    title: 'Cash Flow Health',
    value: '92/100',
    change: 'Excellent',
    changeType: 'positive',
    category: 'cash-flow',
    description: 'Overall cash flow stability score',
    trend: [85, 88, 90, 91, 92],
    breakdown: [
      { label: 'Current Balance', value: '$15,823' },
      { label: 'Weekly Projection', value: '+$2,400', subtext: 'Net positive' },
      { label: 'Risk Level', value: 'Low', subtext: 'Stable operations' }
    ]
  }
];
