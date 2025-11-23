// Report Data Types based on Grain Structure

export interface ReportMetric {
  id: string;
  name: string;
  type: 'currency' | 'number' | 'percentage' | 'count';
  format?: string;
}

export interface ReportDimension {
  id: string;
  name: string;
  type: 'string' | 'date' | 'number' | 'category';
}

export interface ReportGrain {
  id: string;
  name: string;
  metrics: ReportMetric[];
  dimensions: ReportDimension[];
}

export interface ReportRow {
  [key: string]: string | number | null;
}

export interface ReportData {
  reportId: string;
  reportName: string;
  grain: string;
  groupByDimension: string;
  selectedMetrics: string[];
  filters: ReportFilter[];
  data: ReportRow[];
  totalRows: number;
  lastUpdated: Date;
}

export interface ReportFilter {
  dimension: string;
  operator: 'equals' | 'contains' | 'between' | 'in' | 'greater_than' | 'less_than';
  value: string | string[] | { from: string; to: string };
}

// Grain Definitions
export const REPORT_GRAINS: Record<string, ReportGrain> = {
  orders: {
    id: 'orders',
    name: 'Orders',
    metrics: [
      { id: 'gross_sales', name: 'Gross Sales', type: 'currency' },
      { id: 'net_sales', name: 'Net Sales', type: 'currency' },
      { id: 'refunds', name: 'Refunds', type: 'currency' },
      { id: 'transaction_count', name: 'Transaction Count', type: 'count' },
      { id: 'discount_amount', name: 'Discount Amount', type: 'currency' },
      { id: 'returns', name: 'Returns', type: 'currency' },
      { id: 'service_charges', name: 'Service Charges', type: 'currency' },
      { id: 'tax', name: 'Tax', type: 'currency' },
      { id: 'tip', name: 'Tip', type: 'currency' },
      { id: 'average_cover_count', name: 'Average Cover Count', type: 'number' },
      { id: 'covers', name: 'Covers', type: 'count' },
      { id: 'customer_frequency', name: 'Customer Frequency', type: 'percentage' }
    ],
    dimensions: [
      { id: 'order_name', name: 'Order Name', type: 'string' },
      { id: 'order_id', name: 'Order ID', type: 'string' },
      { id: 'device', name: 'Device', type: 'string' },
      { id: 'device_nickname', name: 'Device Nickname', type: 'string' },
      { id: 'channel', name: 'Channel', type: 'category' },
      { id: 'section', name: 'Section', type: 'category' },
      { id: 'employee', name: 'Employee', type: 'string' },
      { id: 'location', name: 'Location', type: 'category' },
      { id: 'customer', name: 'Customer', type: 'string' },
      { id: 'customer_type', name: 'Customer Type', type: 'category' },
      { id: 'order_created', name: 'Order Created', type: 'date' },
      { id: 'order_completed', name: 'Order Completed', type: 'date' },
      { id: 'visit_frequency', name: 'Visit Frequency', type: 'category' }
    ]
  },
  items: {
    id: 'items',
    name: 'Items',
    metrics: [
      { id: 'item_sales', name: 'Item Sales', type: 'currency' },
      { id: 'net_item_sales', name: 'Net Item Sales', type: 'currency' },
      { id: 'tax', name: 'Tax', type: 'currency' },
      { id: 'discount_amount', name: 'Discount Amount', type: 'currency' },
      { id: 'comps', name: 'Comps', type: 'currency' },
      { id: 'void_amount', name: 'Void Amount', type: 'currency' },
      { id: 'items_refunded', name: 'Items Refunded', type: 'currency' },
      { id: 'items_sold', name: 'Items Sold', type: 'count' },
      { id: 'units_sold', name: 'Units Sold', type: 'count' },
      { id: 'units_refunded', name: 'Units Refunded', type: 'count' },
      { id: 'returns', name: 'Returns', type: 'currency' },
      { id: 'variation_unit_cost', name: 'Variation Unit Cost', type: 'currency' }
    ],
    dimensions: [
      { id: 'item_name', name: 'Item Name', type: 'string' },
      { id: 'category', name: 'Category', type: 'category' },
      { id: 'category_rollup', name: 'Category Rollup', type: 'category' },
      { id: 'channel', name: 'Channel', type: 'category' },
      { id: 'combo_name', name: 'Combo Name', type: 'string' },
      { id: 'customer_name', name: 'Customer Name', type: 'string' },
      { id: 'customer_type', name: 'Customer Type', type: 'category' },
      { id: 'device', name: 'Device', type: 'string' },
      { id: 'device_nickname', name: 'Device Nickname', type: 'string' },
      { id: 'dining_option', name: 'Dining Option', type: 'category' },
      { id: 'employee_collected', name: 'Employee (Collected)', type: 'string' },
      { id: 'employee_attributed', name: 'Employee (Attributed)', type: 'string' },
      { id: 'item_type', name: 'Item Type', type: 'category' },
      { id: 'item_variation', name: 'Item Variation', type: 'string' },
      { id: 'location', name: 'Location', type: 'category' },
      { id: 'menu', name: 'Menu', type: 'category' },
      { id: 'section', name: 'Section', type: 'category' },
      { id: 'sku', name: 'SKU', type: 'string' },
      { id: 'vendor_name', name: 'Vendor Name', type: 'string' }
    ]
  },
  discounts: {
    id: 'discounts',
    name: 'Discounts',
    metrics: [
      { id: 'amount_discounted', name: 'Amount Discounted', type: 'currency' },
      { id: 'discounts_applied', name: 'Discounts Applied', type: 'count' },
      { id: 'orders_discounted', name: 'Orders Discounted', type: 'count' },
      { id: 'items_discounted', name: 'Items Discounted', type: 'count' },
      { id: 'gift_card_amount_discounted', name: 'Gift Card Amount Discounted', type: 'currency' },
      { id: 'gift_card_discounts_applied', name: 'Gift Card Discounts Applied', type: 'count' }
    ],
    dimensions: [
      { id: 'discount_name', name: 'Discount Name', type: 'string' },
      { id: 'category', name: 'Category', type: 'category' },
      { id: 'item_name', name: 'Item Name', type: 'string' },
      { id: 'employee_collected', name: 'Employee (Collected)', type: 'string' },
      { id: 'employee_attributed', name: 'Employee (Attributed)', type: 'string' },
      { id: 'location', name: 'Location', type: 'category' },
      { id: 'channel', name: 'Channel', type: 'category' },
      { id: 'device', name: 'Device', type: 'string' },
      { id: 'customer_type', name: 'Customer Type', type: 'category' },
      { id: 'order_created', name: 'Order Created', type: 'date' }
    ]
  },
  employees: {
    id: 'employees',
    name: 'Employees',
    metrics: [
      { id: 'gross_sales', name: 'Gross Sales', type: 'currency' },
      { id: 'net_sales', name: 'Net Sales', type: 'currency' },
      { id: 'transaction_count', name: 'Transaction Count', type: 'count' },
      { id: 'items_sold', name: 'Items Sold', type: 'count' },
      { id: 'average_transaction', name: 'Average Transaction', type: 'currency' },
      { id: 'tips_collected', name: 'Tips Collected', type: 'currency' },
      { id: 'hours_worked', name: 'Hours Worked', type: 'number' },
      { id: 'sales_per_hour', name: 'Sales per Hour', type: 'currency' }
    ],
    dimensions: [
      { id: 'employee_name', name: 'Employee Name', type: 'string' },
      { id: 'employee_id', name: 'Employee ID', type: 'string' },
      { id: 'location', name: 'Location', type: 'category' },
      { id: 'section', name: 'Section', type: 'category' },
      { id: 'device', name: 'Device', type: 'string' },
      { id: 'shift_date', name: 'Shift Date', type: 'date' }
    ]
  },
  payments: {
    id: 'payments',
    name: 'Payments',
    metrics: [
      { id: 'fees', name: 'Fees', type: 'currency' },
      { id: 'payment_count', name: 'Number of Payments', type: 'count' },
      { id: 'refund_count', name: 'Number of Refunds', type: 'count' },
      { id: 'total_collected', name: 'Total Collected', type: 'currency' },
      { id: 'payment_amount', name: 'Payment Amount', type: 'currency' },
      { id: 'tips', name: 'Tips', type: 'currency' },
      { id: 'refund_amount', name: 'Refund Amount', type: 'currency' },
      { id: 'initial_fee', name: 'Initial Fee', type: 'currency' },
      { id: 'cost_of_acceptance', name: 'Cost of Acceptance', type: 'currency' },
      { id: 'total_fees', name: 'Total Fees (incl. taxes)', type: 'currency' }
    ],
    dimensions: [
      { id: 'payment_method', name: 'Payment Method', type: 'category' },
      { id: 'card_brand', name: 'Card Brand', type: 'category' },
      { id: 'transaction_id', name: 'Transaction ID', type: 'string' },
      { id: 'payment_id', name: 'Payment ID', type: 'string' },
      { id: 'card_entry_method', name: 'Card Entry Method', type: 'category' },
      { id: 'payment_status', name: 'Payment Status', type: 'category' },
      { id: 'transaction_status', name: 'Transaction Status', type: 'category' },
      { id: 'channel', name: 'Channel', type: 'category' },
      { id: 'device', name: 'Device', type: 'string' },
      { id: 'employee_collected', name: 'Employee (Collected)', type: 'string' },
      { id: 'location', name: 'Location', type: 'category' },
      { id: 'customer_name', name: 'Customer Name', type: 'string' },
      { id: 'transaction_timestamp', name: 'Transaction Timestamp', type: 'date' }
    ]
  }
};

// Report Templates - maps report IDs to their grain and default configuration
export const REPORT_TEMPLATES: Record<string, {
  grain: string;
  defaultGroupBy: string;
  defaultMetrics: string[];
  name: string;
  description: string;
}> = {
  'sales-summary': {
    grain: 'orders',
    defaultGroupBy: 'location',
    defaultMetrics: ['gross_sales', 'net_sales', 'transaction_count', 'tax', 'tip'],
    name: 'Sales Summary',
    description: 'Overview of total sales, transactions, and key metrics'
  },
  'item-analysis': {
    grain: 'items',
    defaultGroupBy: 'item_name',
    defaultMetrics: ['item_sales', 'net_item_sales', 'items_sold', 'units_sold'],
    name: 'Item Analysis',
    description: 'Detailed breakdown of individual item performance'
  },
  'category-performance': {
    grain: 'items',
    defaultGroupBy: 'category',
    defaultMetrics: ['item_sales', 'net_item_sales', 'items_sold', 'discount_amount'],
    name: 'Category Performance',
    description: 'Sales performance by product categories'
  },
  'employee-performance': {
    grain: 'employees',
    defaultGroupBy: 'employee_name',
    defaultMetrics: ['gross_sales', 'net_sales', 'transaction_count', 'tips_collected', 'sales_per_hour'],
    name: 'Employee Performance',
    description: 'Sales performance by team members'
  },
  'payment-methods': {
    grain: 'payments',
    defaultGroupBy: 'payment_method',
    defaultMetrics: ['total_collected', 'payment_count', 'fees', 'tips'],
    name: 'Payment Methods',
    description: 'Breakdown of payment types and methods'
  },
  'discounts': {
    grain: 'discounts',
    defaultGroupBy: 'discount_name',
    defaultMetrics: ['amount_discounted', 'discounts_applied', 'orders_discounted', 'items_discounted'],
    name: 'Discounts',
    description: 'Discount usage and impact analysis'
  }
};
