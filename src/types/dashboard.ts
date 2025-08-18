export interface DashboardMetric {
  id: string;
  label: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  href?: string;
}

export interface CustomerStats {
  totalCustomers: number;
  returningCustomers: number;
  avgVisitsPerCustomer: number;
  avgSpentPerVisit: string;
  positiveFeedback: number;
  negativeFeedback: number;
}

export interface PaymentType {
  id: string;
  name: string;
  amount: string;
  percentage: number;
  color: string;
}

export interface DashboardData {
  selectedDate: string;
  keyMetrics: DashboardMetric[];
  customerStats: CustomerStats;
  paymentTypes: PaymentType[];
  hasItemsSales: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  isActive?: boolean;
}
