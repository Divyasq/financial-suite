import { StandardReport, ReportCategory, BusinessTypePreset } from '../types/standardReports';

export const standardReports: StandardReport[] = [
  // Sales Reports
  {
    id: 'sales-summary-v3',
    name: 'Sales Summary',
    description: 'Enhanced sales summary with detailed breakdown and migration notice',
    category: 'sales',
    icon: '📊',
    isDefault: true,
    usageCount: 245,
    hasCustomViews: true
  },
  {
    id: 'item-analysis',
    name: 'Item Analysis',
    description: 'Detailed breakdown of individual item performance',
    category: 'sales',
    icon: '🛍️',
    usageCount: 189,
    hasCustomViews: true
  },
  {
    id: 'sales-trends',
    name: 'Sales Trends',
    description: 'Track sales performance over time',
    category: 'sales',
    icon: '📈',
    usageCount: 156
  },
  {
    id: 'category-performance',
    name: 'Category Performance',
    description: 'Sales performance by product categories',
    category: 'sales',
    icon: '🏷️',
    usageCount: 134
  },
  {
    id: 'employee-performance',
    name: 'Employee Performance',
    description: 'Sales performance by team members',
    category: 'sales',
    icon: '👥',
    usageCount: 98
  },
  {
    id: 'modifier-analysis',
    name: 'Modifier Analysis',
    description: 'Analysis of modifier sales and performance',
    category: 'sales',
    icon: '🔧',
    usageCount: 67
  },
  {
    id: 'order-analysis',
    name: 'Order Analysis',
    description: 'Detailed analysis of order patterns and performance',
    category: 'sales',
    icon: '🛒',
    usageCount: 85
  },
  {
    id: 'section-sales',
    name: 'Section Sales',
    description: 'Sales performance by restaurant sections',
    category: 'sales',
    icon: '🏪',
    usageCount: 45
  },
  {
    id: 'vendor-sales',
    name: 'Vendor Sales',
    description: 'Sales performance by vendor/supplier',
    category: 'sales',
    icon: '🏭',
    usageCount: 32
  },
  {
    id: 'gift-cards',
    name: 'Gift Cards',
    description: 'Gift card sales and redemption tracking',
    category: 'sales',
    icon: '🎁',
    usageCount: 28
  },

  // Accounting Reports
  {
    id: 'sales-taxes',
    name: 'Sales Taxes',
    description: 'Tax collection and reporting',
    category: 'accounting',
    icon: '🧾',
    usageCount: 87
  },
  {
    id: 'fees',
    name: 'Fees',
    description: 'Processing fees and charges breakdown',
    category: 'accounting',
    icon: '💳',
    usageCount: 65
  },
  {
    id: 'service-charges',
    name: 'Service Charges',
    description: 'Automatic service charges and gratuities',
    category: 'accounting',
    icon: '🔄',
    usageCount: 43
  },
  {
    id: 'reconciliation',
    name: 'Reconciliation',
    description: 'Daily reconciliation and cash management',
    category: 'accounting',
    icon: '⚖️',
    usageCount: 156
  },

  // Payment Reports
  {
    id: 'payment-methods',
    name: 'Payment Methods',
    description: 'Breakdown of payment types and methods',
    category: 'payments',
    icon: '💰',
    usageCount: 198
  },
  {
    id: 'transaction-status',
    name: 'Transaction Status',
    description: 'Status of all payment transactions',
    category: 'payments',
    icon: '📋',
    usageCount: 145
  },
  {
    id: 'cash-reports',
    name: 'Cash Reports',
    description: 'Cash handling and drawer management',
    category: 'payments',
    icon: '💵',
    usageCount: 123
  },
  {
    id: 'payment-analysis',
    name: 'Payment Analysis',
    description: 'Analysis of payment methods and transaction fees',
    category: 'payments',
    icon: '💳',
    usageCount: 125
  },
  {
    id: 'discount-analysis',
    name: 'Discount Analysis',
    description: 'Analysis of discount usage and impact',
    category: 'payments',
    icon: '🏷️',
    usageCount: 89
  },
  {
    id: 'comps',
    name: 'Comps',
    description: 'Complimentary items and void tracking',
    category: 'payments',
    icon: '🎁',
    usageCount: 67
  },
  {
    id: 'voids',
    name: 'Voids',
    description: 'Voided transactions and reasons',
    category: 'payments',
    icon: '❌',
    usageCount: 54
  },

  // Operations Reports
  {
    id: 'activity-log',
    name: 'Activity Log',
    description: 'System activity and user actions',
    category: 'operations',
    icon: '📝',
    usageCount: 76
  },
  {
    id: 'labor-vs-sales',
    name: 'Labor vs Sales',
    description: 'Labor cost analysis against sales performance',
    category: 'operations',
    icon: '⚖️',
    usageCount: 134
  },
  {
    id: 'kitchen-performance',
    name: 'Kitchen Performance',
    description: 'Kitchen efficiency and order fulfillment',
    category: 'operations',
    icon: '👨‍🍳',
    usageCount: 98
  },
  {
    id: 'team-performance',
    name: 'Team Performance',
    description: 'Overall team productivity metrics',
    category: 'operations',
    icon: '👥',
    usageCount: 87
  },
  {
    id: 'customer-analysis',
    name: 'Customer Analysis',
    description: 'Analysis of customer behavior and spending patterns',
    category: 'operations',
    icon: '👤',
    usageCount: 78
  },
  {
    id: 'future-bookings',
    name: 'Future Bookings',
    description: 'Upcoming reservations and bookings',
    category: 'operations',
    icon: '📅',
    usageCount: 45
  },

  // Online Reports
  {
    id: 'traffic-sources',
    name: 'Traffic & Sources',
    description: 'Online traffic and customer acquisition',
    category: 'online',
    icon: '🌐',
    usageCount: 67
  },
  {
    id: 'purchase-funnel',
    name: 'Purchase Funnel',
    description: 'Online purchase conversion analysis',
    category: 'online',
    icon: '🔄',
    usageCount: 43
  },

  // Inventory Reports
  {
    id: 'cost-of-goods-sold',
    name: 'Cost of Goods Sold',
    description: 'COGS analysis and profit margins',
    category: 'inventory',
    icon: '📦',
    usageCount: 123
  },
  {
    id: 'inventory-by-category',
    name: 'Inventory by Category',
    description: 'Inventory levels by product category',
    category: 'inventory',
    icon: '📊',
    usageCount: 98
  },
  {
    id: 'projected-profit',
    name: 'Projected Profit',
    description: 'Profit projections based on current inventory',
    category: 'inventory',
    icon: '💹',
    usageCount: 76
  },
  {
    id: 'inventory-sell-through',
    name: 'Inventory Sell-Through',
    description: 'Inventory turnover and sell-through rates',
    category: 'inventory',
    icon: '🔄',
    usageCount: 65
  },
  {
    id: 'aging-inventory',
    name: 'Aging Inventory',
    description: 'Inventory age analysis and waste tracking',
    category: 'inventory',
    icon: '⏰',
    usageCount: 54
  },

  // Profitability Reports
  {
    id: 'item-profitability',
    name: 'Item Profitability',
    description: 'Unit cost analysis and profit margins by item',
    category: 'profitability',
    icon: '💰',
    usageCount: 89
  },
  {
    id: 'category-profitability',
    name: 'Category Profitability',
    description: 'Profitability analysis by product category',
    category: 'profitability',
    icon: '📊',
    usageCount: 76
  },
  {
    id: 'prime-cost-analysis',
    name: 'Prime Cost Analysis',
    description: 'Combined food and labor cost analysis',
    category: 'profitability',
    icon: '🎯',
    usageCount: 65
  }
];

export const reportCategories: ReportCategory[] = [
  {
    id: 'sales',
    name: 'Sales',
    description: 'Revenue, transactions, and sales performance',
    icon: '💰',
    isVisible: true,
    order: 1,
    reportCount: 9,
    color: 'blue'
  },
  {
    id: 'accounting',
    name: 'Accounting',
    description: 'Financial reporting and reconciliation',
    icon: '📊',
    isVisible: true,
    order: 2,
    reportCount: 4,
    color: 'green'
  },
  {
    id: 'payments',
    name: 'Payments',
    description: 'Payment processing and transaction analysis',
    icon: '💳',
    isVisible: true,
    order: 3,
    reportCount: 6,
    color: 'purple'
  },
  {
    id: 'operations',
    name: 'Operations',
    description: 'Operational efficiency and performance',
    icon: '🏭',
    isVisible: true,
    order: 4,
    reportCount: 5,
    color: 'orange'
  },
  {
    id: 'online',
    name: 'Online',
    description: 'Digital sales and online performance',
    icon: '🌐',
    isVisible: true,
    order: 5,
    reportCount: 2,
    color: 'indigo'
  },
  {
    id: 'inventory',
    name: 'Inventory',
    description: 'Stock management and cost analysis',
    icon: '📦',
    isVisible: true,
    order: 6,
    reportCount: 5,
    color: 'red'
  },
  {
    id: 'profitability',
    name: 'Profitability',
    description: 'Cost analysis and profit margin reporting',
    icon: '💰',
    isVisible: true,
    order: 7,
    reportCount: 3,
    color: 'emerald'
  }
];

export const businessTypePresets: BusinessTypePreset[] = [
  {
    id: 'restaurant',
    name: 'Full-Service Restaurant',
    description: 'Sit-down restaurants with table service and kitchen operations',
    icon: '🍽️',
    categories: ['sales', 'accounting', 'payments', 'operations', 'profitability'],
    recommendedReports: [
      'sales-summary-v3', 'item-analysis', 'employee-performance', 
      'kitchen-performance', 'labor-vs-sales', 'section-sales', 'item-profitability', 'prime-cost-analysis'
    ]
  },
  {
    id: 'quick-service',
    name: 'Quick Service Restaurant',
    description: 'Fast food, fast casual, and counter service restaurants',
    icon: '🍔',
    categories: ['sales', 'operations', 'payments', 'accounting', 'profitability'],
    recommendedReports: [
      'sales-summary-v3', 'sales-trends', 'item-analysis', 'modifier-sales',
      'employee-performance', 'payment-methods', 'kitchen-performance', 'item-profitability'
    ]
  },
  {
    id: 'coffee-shop',
    name: 'Coffee Shop & Cafe',
    description: 'Coffee shops, cafes, and beverage-focused businesses',
    icon: '☕',
    categories: ['sales', 'operations', 'payments', 'accounting'],
    recommendedReports: [
      'sales-summary-v3', 'sales-trends', 'item-analysis', 'modifier-sales',
      'employee-performance', 'payment-methods'
    ]
  },
  {
    id: 'bar-nightlife',
    name: 'Bar & Nightlife',
    description: 'Bars, pubs, nightclubs, and entertainment venues',
    icon: '🍻',
    categories: ['sales', 'operations', 'payments', 'accounting'],
    recommendedReports: [
      'sales-summary-v3', 'sales-trends', 'item-analysis', 'employee-performance',
      'section-sales', 'modifier-sales', 'comps'
    ]
  },
  {
    id: 'retail-store',
    name: 'Retail Store',
    description: 'Physical retail stores with inventory management',
    icon: '🛍️',
    categories: ['sales', 'inventory', 'payments', 'accounting', 'profitability'],
    recommendedReports: [
      'sales-summary-v3', 'item-analysis', 'category-performance', 'vendor-sales',
      'inventory-by-category', 'cost-of-goods-sold', 'gift-cards', 'item-profitability', 'category-profitability'
    ]
  },
  {
    id: 'beauty-wellness',
    name: 'Beauty & Wellness',
    description: 'Salons, spas, fitness studios, and wellness services',
    icon: '💅',
    categories: ['sales', 'operations', 'payments', 'accounting'],
    recommendedReports: [
      'sales-summary-v3', 'employee-performance', 'service-charges',
      'gift-cards', 'future-bookings', 'team-performance'
    ]
  },
  {
    id: 'food-truck',
    name: 'Food Truck & Mobile',
    description: 'Mobile food vendors and pop-up businesses',
    icon: '🚚',
    categories: ['sales', 'payments', 'accounting'],
    recommendedReports: [
      'sales-summary-v3', 'sales-trends', 'item-analysis', 'payment-methods',
      'modifier-sales', 'reconciliation'
    ]
  },
  {
    id: 'professional-services',
    name: 'Professional Services',
    description: 'Consulting, legal, medical, and other professional services',
    icon: '💼',
    categories: ['sales', 'operations', 'payments', 'accounting'],
    recommendedReports: [
      'sales-summary-v3', 'employee-performance', 'service-charges',
      'future-bookings', 'team-performance', 'fees'
    ]
  },
  {
    id: 'multi-location',
    name: 'Multi-Location Business',
    description: 'Multiple locations, franchises, or enterprise operations',
    icon: '🏢',
    categories: ['sales', 'accounting', 'payments', 'operations', 'inventory', 'profitability'],
    recommendedReports: [
      'sales-summary-v3', 'item-analysis', 'category-performance', 'employee-performance',
      'reconciliation', 'inventory-by-category', 'labor-vs-sales', 'prime-cost-analysis'
    ]
  },
  {
    id: 'custom',
    name: 'Custom Setup',
    description: 'Choose your own categories and reports based on your specific needs',
    icon: '🎯',
    categories: ['sales', 'accounting', 'payments', 'operations', 'online', 'inventory', 'profitability'],
    recommendedReports: []
  }
];
