// Square Order Guide & Bill Pay Integration Types

// ===== PROCUREMENT INTELLIGENCE (ORDER GUIDE) =====

export interface Vendor {
  id: string;
  name: string;
  type: 'sysco' | 'restaurant-depot' | 'local' | 'specialty';
  logo?: string;
  rating: number;
  deliveryDays: string[];
  minimumOrder: number;
  paymentTerms: string;
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  performance: {
    onTimeDelivery: number;
    qualityScore: number;
    priceCompetitiveness: number;
    customerService: number;
  };
}

export interface Ingredient {
  id: string;
  name: string;
  category: 'produce' | 'protein' | 'dairy' | 'dry-goods' | 'beverages' | 'other';
  unit: string;
  currentPrice: number;
  priceHistory: PricePoint[];
  vendors: VendorPricing[];
  seasonality: SeasonalTrend[];
  qualityGrade?: string;
  shelfLife?: number;
}

export interface VendorPricing {
  vendorId: string;
  vendorName: string;
  price: number;
  unit: string;
  minimumQuantity: number;
  bulkDiscounts: BulkDiscount[];
  lastUpdated: string;
  availability: 'in-stock' | 'limited' | 'out-of-stock';
}

export interface BulkDiscount {
  quantity: number;
  discountPercent: number;
  pricePerUnit: number;
}

export interface PricePoint {
  date: string;
  price: number;
  vendorId: string;
}

export interface SeasonalTrend {
  month: number;
  averagePrice: number;
  availability: 'high' | 'medium' | 'low';
  qualityRating: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  ingredients: MenuIngredient[];
  costAnalysis: {
    totalCost: number;
    margin: number;
    marginPercent: number;
  };
}

export interface MenuIngredient {
  ingredientId: string;
  ingredientName: string;
  quantity: number;
  unit: string;
  cost: number;
  vendorId: string;
}

export interface OrderGuide {
  id: string;
  name: string;
  vendorId: string;
  items: OrderGuideItem[];
  totalEstimatedCost: number;
  lastUpdated: string;
  frequency: 'daily' | 'weekly' | 'bi-weekly' | 'monthly';
}

export interface OrderGuideItem {
  ingredientId: string;
  ingredientName: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  totalCost: number;
  lastOrderDate?: string;
  averageWeeklyUsage: number;
}

export interface ProcurementRecommendation {
  id: string;
  type: 'vendor-switch' | 'bulk-discount' | 'seasonal-timing' | 'menu-optimization';
  title: string;
  description: string;
  potentialSavings: number;
  confidence: number;
  timeframe: string;
  ingredients: string[];
  currentVendor?: string;
  recommendedVendor?: string;
  actionRequired: string;
  impact: 'high' | 'medium' | 'low';
}

// ===== BILL PAY & ACCOUNTS PAYABLE =====

export interface VendorAccount {
  id: string;
  vendorId: string;
  vendorName: string;
  accountNumber?: string;
  paymentTerms: string;
  creditLimit?: number;
  currentBalance: number;
  paymentMethods: PaymentMethod[];
  bankingInfo?: BankingInfo;
  taxId?: string;
  address: Address;
  preferredPaymentMethod: string;
}

export interface PaymentMethod {
  id: string;
  type: 'square-checking' | 'debit' | 'credit' | 'ach' | 'check';
  name: string;
  fee: number;
  feeType: 'fixed' | 'percentage';
  processingTime: string;
  description: string;
}

export interface BankingInfo {
  bankName: string;
  routingNumber: string;
  accountNumber: string;
  accountType: 'checking' | 'savings';
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Bill {
  id: string;
  vendorId: string;
  vendorName: string;
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  issueDate: string;
  status: 'pending' | 'scheduled' | 'paid' | 'overdue' | 'disputed';
  category: 'inventory' | 'utilities' | 'rent' | 'services' | 'equipment' | 'other';
  description: string;
  paymentSchedule?: PaymentSchedule;
  lineItems: BillLineItem[];
}

export interface BillLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  category: string;
}

export interface PaymentSchedule {
  id: string;
  billId: string;
  scheduledDate: string;
  amount: number;
  paymentMethodId: string;
  recurring: boolean;
  frequency?: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly';
  nextPaymentDate?: string;
  autoPayEnabled: boolean;
}

export interface Payment {
  id: string;
  billId: string;
  vendorId: string;
  amount: number;
  paymentDate: string;
  paymentMethodId: string;
  paymentMethodType: string;
  fee: number;
  status: 'processing' | 'completed' | 'failed' | 'cancelled';
  confirmationNumber?: string;
  notes?: string;
}

export interface CashFlowProjection {
  date: string;
  incomingRevenue: number;
  outgoingPayments: number;
  netCashFlow: number;
  runningBalance: number;
  projectedBalance: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface APAnalytics {
  totalOutstanding: number;
  averagePaymentCycle: number;
  vendorCount: number;
  monthlyPaymentVolume: number;
  paymentMethodBreakdown: {
    method: string;
    volume: number;
    fees: number;
    percentage: number;
  }[];
  agingReport: {
    current: number;
    thirtyDays: number;
    sixtyDays: number;
    ninetyDaysPlus: number;
  };
  topVendorsBySpend: {
    vendorName: string;
    monthlySpend: number;
    percentage: number;
  }[];
}

// ===== INTEGRATION & AI INSIGHTS =====

export interface SquareEcosystemInsight {
  id: string;
  type: 'procurement-optimization' | 'payment-timing' | 'cash-flow-alert' | 'vendor-performance' | 'cost-savings';
  title: string;
  description: string;
  insight: string;
  reasoning: string[];
  confidence: number;
  severity: 'critical' | 'warning' | 'info' | 'success';
  category: 'procurement' | 'bill-pay' | 'cash-flow' | 'vendor-management';
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
  potentialSavings?: number;
  affectedVendors?: string[];
  relatedBills?: string[];
}

export interface IntegratedDashboardMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  category: 'procurement' | 'bill-pay' | 'cash-flow' | 'vendor-performance';
  description: string;
  trend: number[];
  breakdown?: {
    label: string;
    value: string;
    subtext?: string;
  }[];
}
