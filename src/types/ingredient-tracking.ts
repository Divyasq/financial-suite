// Advanced Ingredient Tracking - Core Types

export interface Ingredient {
  id: string;
  name: string;
  category: 'protein' | 'produce' | 'dairy' | 'grain' | 'spice' | 'beverage' | 'condiment' | 'oil';
  unit: 'lbs' | 'oz' | 'cups' | 'tbsp' | 'tsp' | 'each' | 'gallons' | 'liters' | 'kg' | 'grams';
  costPerUnit: number;
  supplier: string;
  supplierSku?: string;
  lastUpdated: Date;
  allergens?: string[];
  shelfLife?: number; // days
  storageTemp?: 'frozen' | 'refrigerated' | 'room_temp';
  seasonality?: 'spring' | 'summer' | 'fall' | 'winter' | 'year_round';
  priceHistory: PriceHistory[];
}

export interface PriceHistory {
  date: Date;
  price: number;
  supplier: string;
  reason?: 'market_change' | 'seasonal' | 'supplier_change' | 'quality_grade';
}

export interface RecipeIngredient {
  ingredientId: string;
  quantity: number;
  unit: string;
  cost: number; // calculated
  wastePercentage: number; // prep waste (5-15%)
  actualCost: number; // cost including waste
  notes?: string;
  isOptional?: boolean;
}

export interface Recipe {
  id: string;
  name: string;
  category: 'appetizer' | 'entree' | 'dessert' | 'beverage' | 'side' | 'sauce' | 'prep_item';
  description?: string;
  ingredients: RecipeIngredient[];
  yield: number; // portions produced
  yieldUnit: 'portions' | 'cups' | 'lbs' | 'each';
  laborTime: number; // minutes
  laborCost: number; // calculated
  totalIngredientCost: number; // calculated
  totalCost: number; // ingredients + labor
  costPerPortion: number; // calculated
  suggestedPrice: number;
  margin: number; // percentage
  difficulty: 'easy' | 'medium' | 'hard';
  prepTime: number; // minutes
  cookTime: number; // minutes
  instructions?: string[];
  tags?: string[];
  lastUpdated: Date;
  isActive: boolean;
  popularity?: number; // sales ranking
}

export interface InventoryItem {
  id: string;
  ingredientId: string;
  currentStock: number;
  unit: string;
  location: string;
  expirationDate?: Date;
  batchNumber?: string;
  purchaseDate: Date;
  purchaseCost: number;
  supplier: string;
  qualityGrade?: 'premium' | 'standard' | 'economy';
  storageCondition: 'frozen' | 'refrigerated' | 'dry_storage' | 'walk_in';
}

export interface WasteEntry {
  id: string;
  ingredientId: string;
  quantity: number;
  unit: string;
  reason: 'spoilage' | 'prep_waste' | 'customer_return' | 'accident' | 'over_prep' | 'quality_issue';
  cost: number;
  date: Date;
  location: string;
  reportedBy: string;
  notes?: string;
  preventable: boolean;
}

export interface UsageData {
  id: string;
  ingredientId: string;
  recipeId?: string;
  quantityUsed: number;
  unit: string;
  date: Date;
  location: string;
  shift: 'morning' | 'afternoon' | 'evening' | 'overnight';
  actualCost: number;
  source: 'pos' | 'manual' | 'inventory_system';
}

export interface Supplier {
  id: string;
  name: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  paymentTerms: string;
  deliverySchedule: string[];
  minimumOrder: number;
  qualityRating: number; // 1-5
  reliabilityRating: number; // 1-5
  priceCompetitiveness: number; // 1-5
  specialties: string[];
  certifications?: string[]; // organic, local, etc.
}

export interface CostVariance {
  ingredientId: string;
  expectedCost: number;
  actualCost: number;
  variance: number; // percentage
  varianceAmount: number; // dollar amount
  date: Date;
  reason?: string;
  impact: 'low' | 'medium' | 'high';
}

export interface ProfitabilityAnalysis {
  recipeId: string;
  period: 'daily' | 'weekly' | 'monthly';
  unitsSold: number;
  revenue: number;
  ingredientCost: number;
  laborCost: number;
  totalCost: number;
  grossProfit: number;
  marginPercentage: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

// Integration Types
export interface BevSpotData {
  inventoryItems: InventoryItem[];
  wasteEntries: WasteEntry[];
  lastSync: Date;
  syncStatus: 'success' | 'error' | 'pending';
}

export interface MarketManData {
  ingredients: Ingredient[];
  recipes: Recipe[];
  costUpdates: PriceHistory[];
  lastSync: Date;
  syncStatus: 'success' | 'error' | 'pending';
}

export interface POSData {
  salesItems: SalesItem[];
  menuItems: MenuItem[];
  usageData: UsageData[];
  lastSync: Date;
  syncStatus: 'success' | 'error' | 'pending';
}

export interface SalesItem {
  id: string;
  recipeId: string;
  quantity: number;
  price: number;
  date: Date;
  location: string;
}

export interface MenuItem {
  id: string;
  name: string;
  recipeId?: string;
  price: number;
  category: string;
  isActive: boolean;
}

// Analytics & Forecasting Types
export interface ForecastData {
  ingredientId: string;
  period: 'week' | 'month' | 'quarter';
  predictedPrice: number;
  confidence: number; // 0-1
  factors: ForecastFactor[];
  seasonalAdjustment: number;
  trendDirection: 'up' | 'down' | 'stable';
}

export interface ForecastFactor {
  type: 'seasonal' | 'market' | 'weather' | 'demand' | 'supply_chain';
  impact: number; // percentage impact
  description: string;
}

export interface BudgetPlan {
  id: string;
  name: string;
  period: 'monthly' | 'quarterly' | 'yearly';
  startDate: Date;
  endDate: Date;
  categories: BudgetCategory[];
  totalBudget: number;
  actualSpend: number;
  variance: number;
}

export interface BudgetCategory {
  category: string;
  budgetAmount: number;
  actualAmount: number;
  variance: number;
  ingredients: string[]; // ingredient IDs
}

export interface WastePattern {
  ingredientId: string;
  averageWastePercentage: number;
  wasteReasons: { reason: string; percentage: number }[];
  costImpact: number;
  trend: 'improving' | 'worsening' | 'stable';
  recommendations: string[];
}

export interface SeasonalTrend {
  ingredientId: string;
  season: 'spring' | 'summer' | 'fall' | 'winter';
  averagePrice: number;
  priceVariation: number;
  availability: 'high' | 'medium' | 'low';
  qualityRating: number;
}
