import {
  Ingredient,
  Recipe,
  RecipeIngredient,
  InventoryItem,
  WasteEntry,
  Supplier,
  CostVariance,
  ProfitabilityAnalysis,
  ForecastData,
  ForecastFactor,
  WastePattern,
  SeasonalTrend,
  BudgetPlan,
  PriceHistory
} from '../types/ingredient-tracking';

// Mock Ingredients
export const mockIngredients: Ingredient[] = [
  {
    id: 'ing-001',
    name: 'Chicken Breast',
    category: 'protein',
    unit: 'lbs',
    costPerUnit: 4.50,
    supplier: 'Fresh Farm Meats',
    supplierSku: 'FFM-CB-001',
    lastUpdated: new Date('2024-11-20'),
    allergens: [],
    shelfLife: 5,
    storageTemp: 'refrigerated',
    seasonality: 'year_round',
    priceHistory: [
      { date: new Date('2024-10-01'), price: 4.25, supplier: 'Fresh Farm Meats', reason: 'market_change' },
      { date: new Date('2024-11-01'), price: 4.50, supplier: 'Fresh Farm Meats', reason: 'seasonal' }
    ]
  },
  {
    id: 'ing-002',
    name: 'Organic Spinach',
    category: 'produce',
    unit: 'lbs',
    costPerUnit: 3.25,
    supplier: 'Green Valley Farms',
    supplierSku: 'GVF-SP-002',
    lastUpdated: new Date('2024-11-22'),
    allergens: [],
    shelfLife: 7,
    storageTemp: 'refrigerated',
    seasonality: 'spring',
    priceHistory: [
      { date: new Date('2024-09-01'), price: 2.85, supplier: 'Green Valley Farms', reason: 'seasonal' },
      { date: new Date('2024-11-01'), price: 3.25, supplier: 'Green Valley Farms', reason: 'seasonal' }
    ]
  },
  {
    id: 'ing-003',
    name: 'Mozzarella Cheese',
    category: 'dairy',
    unit: 'lbs',
    costPerUnit: 5.75,
    supplier: 'Dairy Fresh Co',
    supplierSku: 'DFC-MOZ-003',
    lastUpdated: new Date('2024-11-21'),
    allergens: ['milk'],
    shelfLife: 14,
    storageTemp: 'refrigerated',
    seasonality: 'year_round',
    priceHistory: [
      { date: new Date('2024-10-15'), price: 5.50, supplier: 'Dairy Fresh Co', reason: 'supplier_change' },
      { date: new Date('2024-11-15'), price: 5.75, supplier: 'Dairy Fresh Co', reason: 'market_change' }
    ]
  },
  {
    id: 'ing-004',
    name: 'Extra Virgin Olive Oil',
    category: 'oil',
    unit: 'liters',
    costPerUnit: 12.50,
    supplier: 'Mediterranean Imports',
    supplierSku: 'MI-EVOO-004',
    lastUpdated: new Date('2024-11-19'),
    allergens: [],
    shelfLife: 365,
    storageTemp: 'room_temp',
    seasonality: 'year_round',
    priceHistory: [
      { date: new Date('2024-09-01'), price: 11.75, supplier: 'Mediterranean Imports', reason: 'quality_grade' },
      { date: new Date('2024-11-01'), price: 12.50, supplier: 'Mediterranean Imports', reason: 'market_change' }
    ]
  },
  {
    id: 'ing-005',
    name: 'Roma Tomatoes',
    category: 'produce',
    unit: 'lbs',
    costPerUnit: 2.85,
    supplier: 'Sunny Acres Farm',
    supplierSku: 'SAF-RT-005',
    lastUpdated: new Date('2024-11-23'),
    allergens: [],
    shelfLife: 5,
    storageTemp: 'room_temp',
    seasonality: 'summer',
    priceHistory: [
      { date: new Date('2024-08-01'), price: 1.95, supplier: 'Sunny Acres Farm', reason: 'seasonal' },
      { date: new Date('2024-11-01'), price: 2.85, supplier: 'Sunny Acres Farm', reason: 'seasonal' }
    ]
  },
  {
    id: 'ing-006',
    name: 'Arborio Rice',
    category: 'grain',
    unit: 'lbs',
    costPerUnit: 3.20,
    supplier: 'Grain Masters',
    supplierSku: 'GM-AR-006',
    lastUpdated: new Date('2024-11-18'),
    allergens: [],
    shelfLife: 730,
    storageTemp: 'room_temp',
    seasonality: 'year_round',
    priceHistory: [
      { date: new Date('2024-10-01'), price: 3.10, supplier: 'Grain Masters', reason: 'market_change' },
      { date: new Date('2024-11-01'), price: 3.20, supplier: 'Grain Masters', reason: 'supplier_change' }
    ]
  }
];

// Mock Recipes
export const mockRecipes: Recipe[] = [
  {
    id: 'recipe-001',
    name: 'Grilled Chicken Caesar Salad',
    category: 'entree',
    description: 'Fresh romaine lettuce with grilled chicken breast, parmesan, and house caesar dressing',
    ingredients: [
      { ingredientId: 'ing-001', quantity: 0.25, unit: 'lbs', cost: 1.13, wastePercentage: 10, actualCost: 1.24, notes: 'Trimming waste' },
      { ingredientId: 'ing-002', quantity: 0.125, unit: 'lbs', cost: 0.41, wastePercentage: 15, actualCost: 0.47, notes: 'Cleaning waste' },
      { ingredientId: 'ing-004', quantity: 0.02, unit: 'liters', cost: 0.25, wastePercentage: 5, actualCost: 0.26, notes: 'Minimal waste' }
    ],
    yield: 1,
    yieldUnit: 'portions',
    laborTime: 8,
    laborCost: 2.67, // $20/hour
    totalIngredientCost: 1.97,
    totalCost: 4.64,
    costPerPortion: 4.64,
    suggestedPrice: 16.95,
    margin: 72.6,
    difficulty: 'easy',
    prepTime: 5,
    cookTime: 8,
    instructions: ['Season chicken breast', 'Grill for 6-8 minutes', 'Slice and serve over salad'],
    tags: ['healthy', 'protein', 'gluten-free'],
    lastUpdated: new Date('2024-11-20'),
    isActive: true,
    popularity: 85
  },
  {
    id: 'recipe-002',
    name: 'Margherita Pizza',
    category: 'entree',
    description: 'Classic pizza with fresh mozzarella, tomatoes, and basil',
    ingredients: [
      { ingredientId: 'ing-003', quantity: 0.125, unit: 'lbs', cost: 0.72, wastePercentage: 8, actualCost: 0.78 },
      { ingredientId: 'ing-005', quantity: 0.1, unit: 'lbs', cost: 0.29, wastePercentage: 12, actualCost: 0.32 },
      { ingredientId: 'ing-004', quantity: 0.015, unit: 'liters', cost: 0.19, wastePercentage: 3, actualCost: 0.20 }
    ],
    yield: 1,
    yieldUnit: 'portions',
    laborTime: 12,
    laborCost: 4.00,
    totalIngredientCost: 1.30,
    totalCost: 5.30,
    costPerPortion: 5.30,
    suggestedPrice: 18.95,
    margin: 72.0,
    difficulty: 'medium',
    prepTime: 15,
    cookTime: 12,
    instructions: ['Prepare dough', 'Add sauce and toppings', 'Bake at 450°F'],
    tags: ['vegetarian', 'italian', 'popular'],
    lastUpdated: new Date('2024-11-19'),
    isActive: true,
    popularity: 92
  },
  {
    id: 'recipe-003',
    name: 'Mushroom Risotto',
    category: 'entree',
    description: 'Creamy arborio rice with wild mushrooms and parmesan',
    ingredients: [
      { ingredientId: 'ing-006', quantity: 0.25, unit: 'lbs', cost: 0.80, wastePercentage: 5, actualCost: 0.84 },
      { ingredientId: 'ing-003', quantity: 0.1, unit: 'lbs', cost: 0.58, wastePercentage: 8, actualCost: 0.63 },
      { ingredientId: 'ing-004', quantity: 0.025, unit: 'liters', cost: 0.31, wastePercentage: 5, actualCost: 0.33 }
    ],
    yield: 1,
    yieldUnit: 'portions',
    laborTime: 25,
    laborCost: 8.33,
    totalIngredientCost: 1.80,
    totalCost: 10.13,
    costPerPortion: 10.13,
    suggestedPrice: 24.95,
    margin: 59.4,
    difficulty: 'hard',
    prepTime: 10,
    cookTime: 25,
    instructions: ['Toast rice', 'Add stock gradually', 'Stir constantly', 'Finish with cheese'],
    tags: ['vegetarian', 'comfort_food', 'premium'],
    lastUpdated: new Date('2024-11-18'),
    isActive: true,
    popularity: 68
  }
];

// Mock Inventory Items
export const mockInventoryItems: InventoryItem[] = [
  {
    id: 'inv-001',
    ingredientId: 'ing-001',
    currentStock: 25.5,
    unit: 'lbs',
    location: 'Walk-in Cooler A',
    expirationDate: new Date('2024-11-28'),
    batchNumber: 'FFM-241120-01',
    purchaseDate: new Date('2024-11-20'),
    purchaseCost: 4.50,
    supplier: 'Fresh Farm Meats',
    qualityGrade: 'premium',
    storageCondition: 'refrigerated'
  },
  {
    id: 'inv-002',
    ingredientId: 'ing-002',
    currentStock: 8.2,
    unit: 'lbs',
    location: 'Produce Cooler',
    expirationDate: new Date('2024-11-26'),
    batchNumber: 'GVF-241122-02',
    purchaseDate: new Date('2024-11-22'),
    purchaseCost: 3.25,
    supplier: 'Green Valley Farms',
    qualityGrade: 'premium',
    storageCondition: 'refrigerated'
  },
  {
    id: 'inv-003',
    ingredientId: 'ing-003',
    currentStock: 12.0,
    unit: 'lbs',
    location: 'Dairy Cooler',
    expirationDate: new Date('2024-12-05'),
    batchNumber: 'DFC-241121-03',
    purchaseDate: new Date('2024-11-21'),
    purchaseCost: 5.75,
    supplier: 'Dairy Fresh Co',
    qualityGrade: 'standard',
    storageCondition: 'refrigerated'
  }
];

// Mock Waste Entries
export const mockWasteEntries: WasteEntry[] = [
  {
    id: 'waste-001',
    ingredientId: 'ing-002',
    quantity: 1.2,
    unit: 'lbs',
    reason: 'spoilage',
    cost: 3.90,
    date: new Date('2024-11-22'),
    location: 'Produce Cooler',
    reportedBy: 'Kitchen Manager',
    notes: 'Wilted leaves, past expiration',
    preventable: true
  },
  {
    id: 'waste-002',
    ingredientId: 'ing-001',
    quantity: 0.8,
    unit: 'lbs',
    reason: 'prep_waste',
    cost: 3.60,
    date: new Date('2024-11-21'),
    location: 'Prep Kitchen',
    reportedBy: 'Prep Cook',
    notes: 'Trimming fat and unusable portions',
    preventable: false
  },
  {
    id: 'waste-003',
    ingredientId: 'ing-005',
    quantity: 2.1,
    unit: 'lbs',
    reason: 'quality_issue',
    cost: 5.99,
    date: new Date('2024-11-20'),
    location: 'Receiving',
    reportedBy: 'Sous Chef',
    notes: 'Bruised and overripe on delivery',
    preventable: true
  }
];

// Mock Suppliers
export const mockSuppliers: Supplier[] = [
  {
    id: 'sup-001',
    name: 'Fresh Farm Meats',
    contactInfo: {
      phone: '(555) 123-4567',
      email: 'orders@freshfarmmeats.com',
      address: '123 Farm Road, Countryside, ST 12345'
    },
    paymentTerms: 'Net 30',
    deliverySchedule: ['Monday', 'Wednesday', 'Friday'],
    minimumOrder: 500,
    qualityRating: 4.8,
    reliabilityRating: 4.9,
    priceCompetitiveness: 4.2,
    specialties: ['Organic Meats', 'Free Range Poultry', 'Grass Fed Beef'],
    certifications: ['USDA Organic', 'Humane Certified']
  },
  {
    id: 'sup-002',
    name: 'Green Valley Farms',
    contactInfo: {
      phone: '(555) 234-5678',
      email: 'sales@greenvalley.com',
      address: '456 Valley Lane, Greentown, ST 23456'
    },
    paymentTerms: 'Net 15',
    deliverySchedule: ['Tuesday', 'Thursday', 'Saturday'],
    minimumOrder: 200,
    qualityRating: 4.6,
    reliabilityRating: 4.7,
    priceCompetitiveness: 4.5,
    specialties: ['Organic Produce', 'Seasonal Vegetables', 'Herbs'],
    certifications: ['USDA Organic', 'Local Certified']
  }
];

// Mock Cost Variances
export const mockCostVariances: CostVariance[] = [
  {
    ingredientId: 'ing-001',
    expectedCost: 4.25,
    actualCost: 4.50,
    variance: 5.9,
    varianceAmount: 0.25,
    date: new Date('2024-11-20'),
    reason: 'Seasonal price increase',
    impact: 'medium'
  },
  {
    ingredientId: 'ing-002',
    expectedCost: 3.00,
    actualCost: 3.25,
    variance: 8.3,
    varianceAmount: 0.25,
    date: new Date('2024-11-22'),
    reason: 'Weather impact on crop yield',
    impact: 'high'
  }
];

// Mock Profitability Analysis
export const mockProfitabilityAnalysis: ProfitabilityAnalysis[] = [
  {
    recipeId: 'recipe-001',
    period: 'daily',
    unitsSold: 45,
    revenue: 762.75,
    ingredientCost: 88.65,
    laborCost: 120.15,
    totalCost: 208.80,
    grossProfit: 553.95,
    marginPercentage: 72.6,
    trend: 'stable'
  },
  {
    recipeId: 'recipe-002',
    period: 'daily',
    unitsSold: 38,
    revenue: 720.10,
    ingredientCost: 49.40,
    laborCost: 152.00,
    totalCost: 201.40,
    grossProfit: 518.70,
    marginPercentage: 72.0,
    trend: 'increasing'
  }
];

// Mock Forecast Data
export const mockForecastData: ForecastData[] = [
  {
    ingredientId: 'ing-001',
    period: 'month',
    predictedPrice: 4.75,
    confidence: 0.85,
    factors: [
      { type: 'seasonal', impact: 8, description: 'Winter demand increase' },
      { type: 'market', impact: 5, description: 'Feed cost inflation' },
      { type: 'supply_chain', impact: 3, description: 'Transportation costs' }
    ],
    seasonalAdjustment: 12,
    trendDirection: 'up'
  },
  {
    ingredientId: 'ing-002',
    period: 'month',
    predictedPrice: 2.95,
    confidence: 0.72,
    factors: [
      { type: 'seasonal', impact: -15, description: 'Winter growing season' },
      { type: 'weather', impact: 10, description: 'Potential frost damage' }
    ],
    seasonalAdjustment: -8,
    trendDirection: 'down'
  }
];

// Mock Waste Patterns
export const mockWastePatterns: WastePattern[] = [
  {
    ingredientId: 'ing-002',
    averageWastePercentage: 18.5,
    wasteReasons: [
      { reason: 'spoilage', percentage: 65 },
      { reason: 'prep_waste', percentage: 25 },
      { reason: 'quality_issue', percentage: 10 }
    ],
    costImpact: 156.80,
    trend: 'worsening',
    recommendations: [
      'Reduce order quantities for spinach',
      'Implement FIFO rotation system',
      'Negotiate quality guarantees with supplier'
    ]
  },
  {
    ingredientId: 'ing-001',
    averageWastePercentage: 8.2,
    wasteReasons: [
      { reason: 'prep_waste', percentage: 70 },
      { reason: 'spoilage', percentage: 20 },
      { reason: 'accident', percentage: 10 }
    ],
    costImpact: 89.40,
    trend: 'stable',
    recommendations: [
      'Train staff on proper trimming techniques',
      'Consider purchasing pre-trimmed options'
    ]
  }
];

// Mock Seasonal Trends
export const mockSeasonalTrends: SeasonalTrend[] = [
  {
    ingredientId: 'ing-005',
    season: 'summer',
    averagePrice: 1.95,
    priceVariation: 0.25,
    availability: 'high',
    qualityRating: 4.8
  },
  {
    ingredientId: 'ing-005',
    season: 'winter',
    averagePrice: 2.85,
    priceVariation: 0.45,
    availability: 'low',
    qualityRating: 3.9
  },
  {
    ingredientId: 'ing-002',
    season: 'spring',
    averagePrice: 2.65,
    priceVariation: 0.35,
    availability: 'high',
    qualityRating: 4.6
  },
  {
    ingredientId: 'ing-002',
    season: 'winter',
    averagePrice: 3.45,
    priceVariation: 0.55,
    availability: 'medium',
    qualityRating: 4.1
  }
];

// Mock Budget Plan
export const mockBudgetPlan: BudgetPlan = {
  id: 'budget-001',
  name: 'Q1 2025 Ingredient Budget',
  period: 'quarterly',
  startDate: new Date('2025-01-01'),
  endDate: new Date('2025-03-31'),
  categories: [
    {
      category: 'Proteins',
      budgetAmount: 15000,
      actualAmount: 14250,
      variance: -5.0,
      ingredients: ['ing-001']
    },
    {
      category: 'Produce',
      budgetAmount: 8000,
      actualAmount: 8750,
      variance: 9.4,
      ingredients: ['ing-002', 'ing-005']
    },
    {
      category: 'Dairy',
      budgetAmount: 6000,
      actualAmount: 5890,
      variance: -1.8,
      ingredients: ['ing-003']
    }
  ],
  totalBudget: 29000,
  actualSpend: 28890,
  variance: -0.4
};
