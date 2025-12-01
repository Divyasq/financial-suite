// Integrated Analytics Types - Cross-Platform Data Models

import { Ingredient, VendorPricing, Bill, Payment, CashFlowProjection } from './square-ecosystem';

// ===== CROSS-PLATFORM ANALYTICS =====

export interface IntegratedMenuItem {
  id: string;
  name: string;
  category: string;
  salesPrice: number;
  ingredients: IntegratedIngredientCost[];
  totalIngredientCost: number;
  grossMargin: number;
  grossMarginPercent: number;
  salesVolume: number;
  totalRevenue: number;
  totalProfit: number;
  profitabilityRank: number;
  costTrends: CostTrend[];
  vendorRisk: VendorRiskAssessment;
}

export interface IntegratedIngredientCost {
  ingredientId: string;
  ingredientName: string;
  quantity: number;
  unit: string;
  currentCost: number;
  bestVendorPrice: number;
  currentVendor: string;
  bestVendor: string;
  potentialSavings: number;
  priceStability: 'stable' | 'volatile' | 'seasonal';
}

export interface CostTrend {
  date: string;
  totalCost: number;
  margin: number;
  marginPercent: number;
  primaryDriver: string; // e.g., "Tomato price increase"
}

export interface VendorRiskAssessment {
  overallRisk: 'low' | 'medium' | 'high';
  paymentRisk: number; // 0-100
  deliveryRisk: number; // 0-100
  priceRisk: number; // 0-100
  riskFactors: string[];
  mitigationSuggestions: string[];
}

export interface CashFlowIntelligence {
  date: string;
  revenueIn: number;
  paymentsOut: number;
  netCashFlow: number;
  runningBalance: number;
  riskLevel: 'low' | 'medium' | 'high';
  optimizationOpportunities: CashFlowOptimization[];
  vendorPayments: VendorPaymentImpact[];
}

export interface CashFlowOptimization {
  type: 'payment-timing' | 'vendor-terms' | 'payment-method';
  description: string;
  potentialSavings: number;
  implementationEffort: 'low' | 'medium' | 'high';
  timeframe: string;
}

export interface VendorPaymentImpact {
  vendorId: string;
  vendorName: string;
  paymentAmount: number;
  paymentDate: string;
  impactOnCashFlow: number;
  paymentMethod: string;
  fees: number;
  alternativeOptions: PaymentAlternative[];
}

export interface PaymentAlternative {
  method: string;
  fee: number;
  processingTime: string;
  cashFlowImpact: number;
  recommendation: boolean;
}

export interface SupplyChainAnalytics {
  vendorId: string;
  vendorName: string;
  totalSpend: number;
  paymentTerms: string;
  averagePaymentDelay: number;
  onTimeDeliveryRate: number;
  qualityScore: number;
  priceCompetitiveness: number;
  riskScore: number;
  businessImpact: SupplyChainImpact;
  recommendations: SupplyChainRecommendation[];
}

export interface SupplyChainImpact {
  revenueAtRisk: number;
  costImpact: number;
  operationalRisk: string;
  customerSatisfactionImpact: number;
}

export interface SupplyChainRecommendation {
  type: 'vendor-diversification' | 'payment-optimization' | 'contract-renegotiation';
  priority: 'high' | 'medium' | 'low';
  description: string;
  expectedBenefit: string;
  implementationSteps: string[];
}

export interface ProfitabilityAnalytics {
  menuItems: IntegratedMenuItem[];
  categoryAnalysis: CategoryProfitability[];
  vendorImpactAnalysis: VendorProfitabilityImpact[];
  seasonalTrends: SeasonalProfitabilityTrend[];
  optimizationOpportunities: ProfitabilityOptimization[];
}

export interface CategoryProfitability {
  category: string;
  totalRevenue: number;
  totalCost: number;
  grossMargin: number;
  marginPercent: number;
  itemCount: number;
  averageMargin: number;
  topPerformingItems: string[];
  underperformingItems: string[];
}

export interface VendorProfitabilityImpact {
  vendorId: string;
  vendorName: string;
  ingredientsSupplied: string[];
  menuItemsAffected: string[];
  totalCostImpact: number;
  marginImpact: number;
  priceCompetitiveness: number;
  qualityImpact: number;
  switchingOpportunity: VendorSwitchOpportunity;
}

export interface VendorSwitchOpportunity {
  recommendedVendor: string;
  potentialSavings: number;
  marginImprovement: number;
  riskAssessment: string;
  implementationComplexity: 'low' | 'medium' | 'high';
}

export interface SeasonalProfitabilityTrend {
  month: number;
  monthName: string;
  averageMargin: number;
  topCategories: string[];
  costDrivers: string[];
  recommendations: string[];
}

export interface ProfitabilityOptimization {
  type: 'menu-pricing' | 'ingredient-sourcing' | 'menu-engineering' | 'vendor-optimization';
  priority: 'high' | 'medium' | 'low';
  description: string;
  affectedItems: string[];
  potentialImpact: number;
  implementationSteps: string[];
  timeframe: string;
  confidence: number;
}

export interface CostOptimizationCenter {
  totalSavingsOpportunity: number;
  quickWins: QuickWinOpportunity[];
  strategicInitiatives: StrategicOptimization[];
  vendorNegotiations: VendorNegotiationOpportunity[];
  processImprovements: ProcessImprovement[];
  riskMitigations: RiskMitigation[];
}

export interface QuickWinOpportunity {
  id: string;
  title: string;
  description: string;
  category: 'vendor-switch' | 'payment-method' | 'bulk-ordering' | 'timing-optimization';
  potentialSavings: number;
  implementationTime: string;
  effort: 'low' | 'medium' | 'high';
  confidence: number;
  actionSteps: string[];
}

export interface StrategicOptimization {
  id: string;
  title: string;
  description: string;
  category: 'supply-chain' | 'menu-engineering' | 'vendor-relationships' | 'technology';
  potentialImpact: number;
  timeframe: string;
  investmentRequired: number;
  roi: number;
  keyMilestones: string[];
}

export interface VendorNegotiationOpportunity {
  vendorId: string;
  vendorName: string;
  currentSpend: number;
  negotiationLeverage: 'high' | 'medium' | 'low';
  potentialSavings: number;
  negotiationPoints: string[];
  alternativeVendors: string[];
  riskFactors: string[];
}

export interface ProcessImprovement {
  area: 'ordering' | 'receiving' | 'payment-processing' | 'inventory-management';
  currentEfficiency: number;
  targetEfficiency: number;
  costReduction: number;
  implementationPlan: string[];
  technologyRequirements: string[];
}

export interface RiskMitigation {
  riskType: 'supply-disruption' | 'price-volatility' | 'vendor-dependency' | 'cash-flow';
  currentRiskLevel: 'low' | 'medium' | 'high';
  potentialImpact: number;
  mitigationStrategies: string[];
  monitoringMetrics: string[];
  contingencyPlans: string[];
}

// ===== INTEGRATED AI INSIGHTS =====

export interface IntegratedAIInsight {
  id: string;
  type: 'cost-revenue-optimization' | 'cash-flow-optimization' | 'supply-chain-risk' | 'profitability-enhancement';
  title: string;
  description: string;
  insight: string;
  reasoning: string[];
  confidence: number;
  severity: 'critical' | 'warning' | 'info' | 'success';
  category: 'profitability' | 'cash-flow' | 'supply-chain' | 'cost-optimization';
  timestamp: string;
  dataPoints: {
    metric: string;
    value: string;
    trend: 'up' | 'down' | 'stable';
    source: 'pos' | 'order-guide' | 'bill-pay' | 'integrated';
  }[];
  recommendations: {
    action: string;
    priority: 'high' | 'medium' | 'low';
    estimatedImpact: string;
    timeframe: string;
    implementationSteps: string[];
  }[];
  potentialSavings?: number;
  revenueImpact?: number;
  affectedVendors?: string[];
  affectedMenuItems?: string[];
  relatedBills?: string[];
  crossPlatformData: {
    posData: any;
    orderGuideData: any;
    billPayData: any;
  };
}

// ===== DASHBOARD WIDGETS =====

export interface IntegratedDashboardWidget {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  category: 'profitability' | 'cash-flow' | 'supply-chain' | 'cost-optimization';
  description: string;
  dataSources: ('pos' | 'order-guide' | 'bill-pay')[];
  trend: number[];
  breakdown?: {
    label: string;
    value: string;
    subtext?: string;
    source?: string;
  }[];
  insights?: string[];
  actionable: boolean;
  quickActions?: {
    label: string;
    action: string;
  }[];
}
