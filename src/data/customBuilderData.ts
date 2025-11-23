import { GrainOption, PromptSuggestion } from '../types/customBuilder';

export const GRAIN_OPTIONS: GrainOption[] = [
  {
    id: 'orders',
    name: 'Orders',
    description: 'Analyze order patterns, sales performance, and transaction data',
    icon: '📦',
    color: 'blue',
    canJoinWith: ['items', 'customers', 'payments', 'employees'],
    metrics: [
      {
        id: 'sales_metrics',
        name: 'Sales Metrics',
        description: 'Revenue and sales performance indicators',
        metrics: [
          { id: 'gross_sales', name: 'Gross Sales', description: 'Total sales before deductions', type: 'currency' },
          { id: 'net_sales', name: 'Net Sales', description: 'Sales after discounts and returns', type: 'currency' },
          { id: 'refunds', name: 'Refunds', description: 'Total refund amount', type: 'currency' },
          { id: 'service_charges', name: 'Service Charges', description: 'Custom and card surcharges', type: 'currency' },
          { id: 'tax', name: 'Tax', description: 'Tax collected', type: 'currency' },
          { id: 'tip', name: 'Tips', description: 'Tips received', type: 'currency' }
        ]
      },
      {
        id: 'volume_metrics',
        name: 'Volume Metrics',
        description: 'Transaction counts and customer metrics',
        metrics: [
          { id: 'transaction_count', name: 'Transaction Count', description: 'Number of transactions', type: 'count' },
          { id: 'average_cover_count', name: 'Average Cover Count', description: 'Average covers per order', type: 'number' },
          { id: 'covers', name: 'Covers', description: 'Total covers served', type: 'count' },
          { id: 'customer_frequency', name: 'Customer Frequency', description: 'Customer visit frequency', type: 'percentage' }
        ]
      },
      {
        id: 'discount_metrics',
        name: 'Discount Metrics',
        description: 'Discount and promotional impact',
        metrics: [
          { id: 'discount_amount', name: 'Discount Amount', description: 'Total discounts applied', type: 'currency' },
          { id: 'returns', name: 'Returns', description: 'Returned items value', type: 'currency' }
        ]
      }
    ],
    dimensions: [
      {
        id: 'order_info',
        name: 'Order Information',
        description: 'Basic order identifiers and details',
        dimensions: [
          { id: 'order_name', name: 'Order Name', description: 'Order identifier', type: 'string' },
          { id: 'order_id', name: 'Order ID', description: 'Unique order ID', type: 'string' },
          { id: 'order_created', name: 'Order Created', description: 'When order was created', type: 'date' },
          { id: 'order_completed', name: 'Order Completed', description: 'When order was fulfilled', type: 'date' }
        ]
      },
      {
        id: 'location_context',
        name: 'Location & Channel',
        description: 'Where and how the order was placed',
        dimensions: [
          { id: 'location', name: 'Location', description: 'Business location', type: 'category' },
          { id: 'section', name: 'Section', description: 'Restaurant section', type: 'category' },
          { id: 'channel', name: 'Channel', description: 'Order channel', type: 'category' },
          { id: 'device', name: 'Device', description: 'POS device used', type: 'string' }
        ]
      },
      {
        id: 'people',
        name: 'People',
        description: 'Customer and employee information',
        dimensions: [
          { id: 'customer', name: 'Customer', description: 'Customer name', type: 'string' },
          { id: 'customer_type', name: 'Customer Type', description: 'New, Returning, Loyalty', type: 'category' },
          { id: 'employee', name: 'Employee', description: 'Staff member', type: 'string' },
          { id: 'customer_visit_frequency', name: 'Visit Frequency', description: 'How often customer visits', type: 'category' }
        ]
      }
    ]
  },
  {
    id: 'items',
    name: 'Items',
    description: 'Analyze product performance, sales by item, and inventory insights',
    icon: '🛍️',
    color: 'green',
    canJoinWith: ['orders', 'customers', 'employees', 'discounts', 'modifiers'],
    metrics: [
      {
        id: 'item_sales',
        name: 'Item Sales',
        description: 'Revenue from item sales',
        metrics: [
          { id: 'item_sales', name: 'Item Sales', description: 'Gross item revenue', type: 'currency' },
          { id: 'net_item_sales', name: 'Net Item Sales', description: 'Item revenue after discounts', type: 'currency' },
          { id: 'tax', name: 'Tax', description: 'Tax on items', type: 'currency' },
          { id: 'variation_unit_cost', name: 'Unit Cost', description: 'Cost per item variation', type: 'currency' }
        ]
      },
      {
        id: 'item_volume',
        name: 'Item Volume',
        description: 'Quantity and unit metrics',
        metrics: [
          { id: 'items_sold', name: 'Items Sold', description: 'Number of items sold', type: 'count' },
          { id: 'units_sold', name: 'Units Sold', description: 'Total units sold', type: 'count' },
          { id: 'items_refunded', name: 'Items Refunded', description: 'Number of items refunded', type: 'count' },
          { id: 'units_refunded', name: 'Units Refunded', description: 'Total units refunded', type: 'count' }
        ]
      },
      {
        id: 'item_adjustments',
        name: 'Adjustments',
        description: 'Discounts, comps, and voids',
        metrics: [
          { id: 'discount_amount', name: 'Discount Amount', description: 'Discounts on items', type: 'currency' },
          { id: 'comps', name: 'Comps', description: 'Complimentary items', type: 'currency' },
          { id: 'void', name: 'Voids', description: 'Voided items', type: 'currency' },
          { id: 'returns', name: 'Returns', description: 'Returned items', type: 'currency' }
        ]
      }
    ],
    dimensions: [
      {
        id: 'product_info',
        name: 'Product Information',
        description: 'Item details and categorization',
        dimensions: [
          { id: 'item_name', name: 'Item Name', description: 'Product name', type: 'string' },
          { id: 'category', name: 'Category', description: 'Product category', type: 'category' },
          { id: 'category_rollup', name: 'Category Rollup', description: 'Parent category', type: 'category' },
          { id: 'item_type', name: 'Item Type', description: 'Type of item', type: 'category' },
          { id: 'item_variation', name: 'Item Variation', description: 'Size, flavor, etc.', type: 'string' },
          { id: 'sku', name: 'SKU', description: 'Stock keeping unit', type: 'string' }
        ]
      },
      {
        id: 'supply_chain',
        name: 'Supply Chain',
        description: 'Vendor and sourcing information',
        dimensions: [
          { id: 'vendor_name', name: 'Vendor Name', description: 'Item supplier', type: 'string' },
          { id: 'vendor_code', name: 'Vendor Code', description: 'Supplier code', type: 'string' },
          { id: 'menu', name: 'Menu', description: 'Menu section', type: 'category' }
        ]
      }
    ]
  },
  {
    id: 'customers',
    name: 'Customers',
    description: 'Analyze customer behavior, spending patterns, and loyalty metrics',
    icon: '👥',
    color: 'purple',
    canJoinWith: ['orders', 'items', 'payments'],
    metrics: [
      {
        id: 'visit_metrics',
        name: 'Visit Metrics',
        description: 'Customer visit patterns',
        metrics: [
          { id: 'new_visit_count', name: 'New Visits', description: 'First-time customer visits', type: 'count' },
          { id: 'repeat_visit_count', name: 'Repeat Visits', description: 'Returning customer visits', type: 'count' },
          { id: 'loyalty_visit_count', name: 'Loyalty Visits', description: 'Loyalty member visits', type: 'count' },
          { id: 'visit_frequency_percent', name: 'Visit Frequency %', description: 'Visit frequency rate', type: 'percentage' }
        ]
      },
      {
        id: 'spend_metrics',
        name: 'Spending Metrics',
        description: 'Customer spending behavior',
        metrics: [
          { id: 'amount_spend', name: 'Total Spend', description: 'Total customer spending', type: 'currency' },
          { id: 'average_spend', name: 'Average Spend', description: 'Average spend per visit', type: 'currency' },
          { id: 'spend_distribution_count', name: 'Spend Distribution', description: 'Spend distribution count', type: 'count' }
        ]
      }
    ],
    dimensions: [
      {
        id: 'customer_profile',
        name: 'Customer Profile',
        description: 'Customer identification and segmentation',
        dimensions: [
          { id: 'customer', name: 'Customer', description: 'Customer name', type: 'string' },
          { id: 'customer_type', name: 'Customer Type', description: 'New vs Returning vs Loyalty', type: 'category' },
          { id: 'spend_distribution', name: 'Spend Distribution', description: 'Spending tier', type: 'category' },
          { id: 'visit_frequency', name: 'Visit Frequency', description: 'How often they visit', type: 'category' },
          { id: 'loyalty_visit', name: 'Loyalty Status', description: 'Loyalty vs non-loyalty', type: 'category' }
        ]
      }
    ]
  },
  {
    id: 'payments',
    name: 'Payments',
    description: 'Analyze payment methods, transaction fees, and processing costs',
    icon: '💳',
    color: 'indigo',
    canJoinWith: ['orders', 'customers'],
    metrics: [
      {
        id: 'payment_volume',
        name: 'Payment Volume',
        description: 'Payment transaction metrics',
        metrics: [
          { id: 'total_collected', name: 'Total Collected', description: 'Total payment amount', type: 'currency' },
          { id: 'payment_amount', name: 'Payment Amount', description: 'Individual payment amounts', type: 'currency' },
          { id: 'no_of_payments', name: 'Number of Payments', description: 'Payment transaction count', type: 'count' },
          { id: 'no_of_refunds', name: 'Number of Refunds', description: 'Refund transaction count', type: 'count' },
          { id: 'refund_amount', name: 'Refund Amount', description: 'Total refunds processed', type: 'currency' }
        ]
      },
      {
        id: 'fees_costs',
        name: 'Fees & Costs',
        description: 'Processing fees and costs',
        metrics: [
          { id: 'fees', name: 'Processing Fees', description: 'Payment processing fees', type: 'currency' },
          { id: 'initial_fee', name: 'Initial Fee', description: 'Base processing fee', type: 'currency' },
          { id: 'cost_of_acceptance', name: 'Cost of Acceptance', description: 'Total acceptance cost', type: 'currency' },
          { id: 'total_fees_incl_taxes', name: 'Total Fees (incl. taxes)', description: 'All fees including taxes', type: 'currency' }
        ]
      },
      {
        id: 'tips',
        name: 'Tips',
        description: 'Tip processing and collection',
        metrics: [
          { id: 'tips', name: 'Tips', description: 'Tips processed', type: 'currency' }
        ]
      }
    ],
    dimensions: [
      {
        id: 'payment_method',
        name: 'Payment Methods',
        description: 'How customers paid',
        dimensions: [
          { id: 'payment_method', name: 'Payment Method', description: 'Credit, Debit, Cash, etc.', type: 'category' },
          { id: 'card_brand', name: 'Card Brand', description: 'Visa, Mastercard, etc.', type: 'category' },
          { id: 'card_entry_method', name: 'Entry Method', description: 'Chip, Swipe, Tap, etc.', type: 'category' }
        ]
      },
      {
        id: 'transaction_details',
        name: 'Transaction Details',
        description: 'Transaction processing information',
        dimensions: [
          { id: 'transaction_id', name: 'Transaction ID', description: 'Unique transaction identifier', type: 'string' },
          { id: 'payment_status', name: 'Payment Status', description: 'Success, Failed, Pending', type: 'category' },
          { id: 'transaction_timestamp', name: 'Transaction Time', description: 'When payment was processed', type: 'date' }
        ]
      }
    ]
  },
  {
    id: 'employees',
    name: 'Employees',
    description: 'Analyze staff performance, sales by employee, and productivity metrics',
    icon: '👨‍🍳',
    color: 'orange',
    canJoinWith: ['orders', 'items', 'customers'],
    metrics: [
      {
        id: 'employee_sales',
        name: 'Employee Sales',
        description: 'Sales performance by staff',
        metrics: [
          { id: 'gross_sales', name: 'Gross Sales', description: 'Total sales by employee', type: 'currency' },
          { id: 'net_sales', name: 'Net Sales', description: 'Net sales by employee', type: 'currency' },
          { id: 'average_transaction', name: 'Average Transaction', description: 'Average transaction size', type: 'currency' },
          { id: 'tips_collected', name: 'Tips Collected', description: 'Tips received by employee', type: 'currency' }
        ]
      },
      {
        id: 'productivity',
        name: 'Productivity',
        description: 'Employee productivity metrics',
        metrics: [
          { id: 'transaction_count', name: 'Transaction Count', description: 'Number of transactions handled', type: 'count' },
          { id: 'items_sold', name: 'Items Sold', description: 'Items sold by employee', type: 'count' },
          { id: 'hours_worked', name: 'Hours Worked', description: 'Hours on shift', type: 'number' },
          { id: 'sales_per_hour', name: 'Sales per Hour', description: 'Hourly sales rate', type: 'currency' }
        ]
      }
    ],
    dimensions: [
      {
        id: 'employee_info',
        name: 'Employee Information',
        description: 'Staff identification and details',
        dimensions: [
          { id: 'employee_name', name: 'Employee Name', description: 'Staff member name', type: 'string' },
          { id: 'employee_id', name: 'Employee ID', description: 'Staff ID number', type: 'string' },
          { id: 'section', name: 'Section', description: 'Work section/area', type: 'category' },
          { id: 'shift_date', name: 'Shift Date', description: 'Date of work shift', type: 'date' }
        ]
      }
    ]
  },
  {
    id: 'discounts',
    name: 'Discounts',
    description: 'Analyze discount usage, promotional impact, and savings offered',
    icon: '🏷️',
    color: 'red',
    canJoinWith: ['orders', 'items', 'customers'],
    metrics: [
      {
        id: 'discount_impact',
        name: 'Discount Impact',
        description: 'Financial impact of discounts',
        metrics: [
          { id: 'amount_discounted', name: 'Amount Discounted', description: 'Total discount value', type: 'currency' },
          { id: 'gift_card_amount_discounted', name: 'Gift Card Discounts', description: 'Gift card discount value', type: 'currency' }
        ]
      },
      {
        id: 'discount_usage',
        name: 'Discount Usage',
        description: 'How often discounts are used',
        metrics: [
          { id: 'discounts_applied', name: 'Discounts Applied', description: 'Number of discount applications', type: 'count' },
          { id: 'orders_discounted', name: 'Orders Discounted', description: 'Orders with discounts', type: 'count' },
          { id: 'items_discounted', name: 'Items Discounted', description: 'Items with discounts', type: 'count' },
          { id: 'gift_card_discounts_applied', name: 'Gift Card Applications', description: 'Gift card discount uses', type: 'count' }
        ]
      }
    ],
    dimensions: [
      {
        id: 'discount_details',
        name: 'Discount Details',
        description: 'Discount types and information',
        dimensions: [
          { id: 'discount_name', name: 'Discount Name', description: 'Name of the discount', type: 'string' },
          { id: 'category', name: 'Category', description: 'Discount category', type: 'category' },
          { id: 'item_name', name: 'Item Name', description: 'Item the discount was applied to', type: 'string' }
        ]
      }
    ]
  },
  {
    id: 'modifiers',
    name: 'Modifiers',
    description: 'Analyze add-ons, customizations, and modifier performance',
    icon: '🔧',
    color: 'yellow',
    canJoinWith: ['items', 'orders'],
    metrics: [
      {
        id: 'modifier_sales',
        name: 'Modifier Sales',
        description: 'Revenue from modifiers',
        metrics: [
          { id: 'modifier_gross_sales', name: 'Modifier Gross Sales', description: 'Total modifier revenue', type: 'currency' },
          { id: 'modifier_net_sales', name: 'Modifier Net Sales', description: 'Net modifier revenue', type: 'currency' },
          { id: 'modifier_price', name: 'Modifier Price', description: 'Individual modifier prices', type: 'currency' },
          { id: 'modifier_refunds', name: 'Modifier Refunds', description: 'Refunded modifier value', type: 'currency' }
        ]
      },
      {
        id: 'modifier_volume',
        name: 'Modifier Volume',
        description: 'Modifier quantity metrics',
        metrics: [
          { id: 'modifier_qty_sold', name: 'Modifier Qty Sold', description: 'Number of modifiers sold', type: 'count' },
          { id: 'modifier_qty_refunded', name: 'Modifier Qty Refunded', description: 'Number of modifiers refunded', type: 'count' }
        ]
      }
    ],
    dimensions: [
      {
        id: 'modifier_details',
        name: 'Modifier Details',
        description: 'Modifier types and organization',
        dimensions: [
          { id: 'modifier_name', name: 'Modifier Name', description: 'Name of the modifier', type: 'string' },
          { id: 'modifier_set', name: 'Modifier Set', description: 'Group of related modifiers', type: 'category' },
          { id: 'item_name', name: 'Item Name', description: 'Item the modifier was added to', type: 'string' }
        ]
      }
    ]
  }
];

export const PROMPT_SUGGESTIONS: PromptSuggestion[] = [
  {
    text: "Show me top selling items",
    grain: "items",
    metrics: ["item_sales", "items_sold"],
    groupBy: "item_name",
    description: "Analyze which items generate the most revenue"
  },
  {
    text: "Compare payment methods",
    grain: "payments",
    metrics: ["total_collected", "no_of_payments"],
    groupBy: "payment_method",
    description: "See how customers prefer to pay"
  },
  {
    text: "Employee performance analysis",
    grain: "employees",
    metrics: ["gross_sales", "transaction_count", "sales_per_hour"],
    groupBy: "employee_name",
    description: "Track staff sales performance"
  },
  {
    text: "Customer spending by type",
    grain: "customers",
    metrics: ["amount_spend", "average_spend", "visit_frequency_percent"],
    groupBy: "customer_type",
    description: "Understand different customer segments"
  },
  {
    text: "Sales by restaurant section",
    grain: "orders",
    metrics: ["gross_sales", "transaction_count"],
    groupBy: "section",
    description: "Compare performance across dining areas"
  },
  {
    text: "Discount impact analysis",
    grain: "discounts",
    metrics: ["amount_discounted", "discounts_applied", "orders_discounted"],
    groupBy: "discount_name",
    description: "Measure promotional effectiveness"
  },
  {
    text: "Popular modifiers and add-ons",
    grain: "modifiers",
    metrics: ["modifier_qty_sold", "modifier_gross_sales"],
    groupBy: "modifier_name",
    description: "See which customizations customers love"
  },
  {
    text: "Category performance breakdown",
    grain: "items",
    metrics: ["item_sales", "items_sold"],
    groupBy: "category",
    description: "Compare product category performance"
  }
];

// Smart prompt parsing patterns
export const PROMPT_PATTERNS = [
  {
    pattern: /top\s+selling\s+items?/i,
    grain: "items",
    metrics: ["item_sales", "items_sold"],
    groupBy: "item_name"
  },
  {
    pattern: /payment\s+method/i,
    grain: "payments",
    metrics: ["total_collected", "no_of_payments"],
    groupBy: "payment_method"
  },
  {
    pattern: /employee\s+performance/i,
    grain: "employees",
    metrics: ["gross_sales", "transaction_count"],
    groupBy: "employee_name"
  },
  {
    pattern: /customer\s+(spending|behavior)/i,
    grain: "customers",
    metrics: ["amount_spend", "average_spend"],
    groupBy: "customer_type"
  },
  {
    pattern: /section\s+sales?/i,
    grain: "orders",
    metrics: ["gross_sales", "transaction_count"],
    groupBy: "section"
  },
  {
    pattern: /discount/i,
    grain: "discounts",
    metrics: ["amount_discounted", "discounts_applied"],
    groupBy: "discount_name"
  },
  {
    pattern: /modifier/i,
    grain: "modifiers",
    metrics: ["modifier_qty_sold", "modifier_gross_sales"],
    groupBy: "modifier_name"
  },
  {
    pattern: /categor/i,
    grain: "items",
    metrics: ["item_sales", "items_sold"],
    groupBy: "category"
  }
];
