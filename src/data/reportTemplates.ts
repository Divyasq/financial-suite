import { ReportTemplate } from '../types/reportBlocks';

export const REPORT_TEMPLATES: Record<string, ReportTemplate> = {
  'sales-summary-v3': {
    id: 'sales-summary-v3',
    name: 'Sales Summary v3',
    description: 'Enhanced sales summary with detailed breakdown and migration notice',
    type: 'dashboard',
    grain: 'orders',
    defaultGroupBy: 'location',
    defaultMetrics: ['gross_sales', 'net_sales', 'transaction_count', 'average_cover_count'],
    category: 'sales',
    blocks: [
      {
        id: 'header',
        type: 'header',
        config: {
          header: {
            title: 'Sales Summary',
            description: 'Enhanced sales summary with detailed breakdown',
            showDataFreshness: true,
            showOptions: true,
            options: ['export', 'print'],
            showMigrationNotice: true,
            migrationNotice: {
              title: 'System Migration Notice',
              date: 'May 2026',
              message: 'Starting May 2026, we\'re moving to a new, more powerful reporting system. The reports below will no longer be available in their current form.',
              actions: [
                { text: 'Auto-Generate New Reports (15)', type: 'secondary' },
                { text: 'Explore New System', type: 'primary' }
              ]
            }
          }
        },
        visible: true,
        order: 1
      },
      {
        id: 'controls',
        type: 'controls',
        config: {
          controls: {
            primary: ['time_period', 'location'],
            secondary: ['filters'],
            showGroupBy: false,
            showMetricSelector: false,
            timeframe: 'Sat, Jun 21 – Fri, Jun 27, 2025'
          }
        },
        visible: true,
        order: 2
      },
      {
        id: 'metrics',
        type: 'metrics',
        config: {
          metrics: {
            layout: 'detailed',
            showTrends: true,
            showComparisons: true,
            primaryMetrics: [
              {
                id: 'total-sales',
                name: 'Total sales',
                value: '$1065.79',
                description: '32 transactions',
                showChart: true,
                chartData: [200, 250, 180, 320, 280, 150, 220]
              }
            ],
            detailedBreakdown: [
              {
                section: 'Gross sales',
                amount: '$1641.20',
                description: '28 transactions',
                items: [
                  { name: 'Items', amount: '$1634.00', description: '20 sales + 8 exchanges' },
                  { name: 'Service charges', amount: '$7.20', description: '3 transactions' }
                ]
              },
              {
                section: 'Returns',
                amount: '($577.00)',
                description: '3 transactions',
                negative: true
              },
              {
                section: 'Discounts & comps',
                amount: '$0.00',
                description: '2 transactions'
              },
              {
                section: 'Net sales',
                amount: '$1064.20',
                description: '30 transactions'
              },
              {
                section: 'Deferred Sales',
                amount: '$0.00'
              },
              {
                section: 'Gift card sales',
                amount: '$0.00',
                description: '5 transactions'
              },
              {
                section: 'Taxes',
                amount: '$1.59',
                description: '28 transactions'
              },
              {
                section: 'Tips',
                amount: '$0.00',
                description: '15 transactions'
              }
            ],
            summarySection: [
              {
                name: 'Total sales',
                amount: '$1065.79',
                description: '32 transactions'
              },
              {
                name: 'Total payments collected',
                amount: '$637.88',
                description: '32 transactions',
                breakdown: [
                  { method: 'Card', amount: '$51.39' },
                  { method: 'Cash', amount: '$586.49' }
                ]
              },
              {
                name: 'Fees',
                amount: '($1.90)',
                negative: true
              }
            ]
          }
        },
        visible: true,
        order: 3
      }
    ]
  },

  'sales-summary': {
    id: 'sales-summary',
    name: 'Sales Summary',
    description: 'Overview of total sales, transactions, and key metrics',
    type: 'dashboard',
    grain: 'orders',
    defaultGroupBy: 'location',
    defaultMetrics: ['gross_sales', 'net_sales', 'transaction_count', 'average_cover_count'],
    category: 'sales',
    blocks: [
      {
        id: 'header',
        type: 'header',
        config: {
          header: {
            title: 'Sales Summary',
            description: 'Overview of total sales, transactions, and key metrics',
            showDataFreshness: true,
            showOptions: true,
            options: ['export', 'print']
          }
        },
        visible: true,
        order: 1
      },
      {
        id: 'controls',
        type: 'controls',
        config: {
          controls: {
            primary: ['time_period', 'location'],
            secondary: ['filters'],
            showGroupBy: false,
            showMetricSelector: false
          }
        },
        visible: true,
        order: 2
      },
      {
        id: 'metrics',
        type: 'metrics',
        config: {
          metrics: {
            layout: 'grid',
            columns: 4,
            showTrends: true,
            showComparisons: true,
            metrics: [
              {
                id: 'gross-sales',
                name: 'Gross Sales',
                value: '$12,450',
                trend: '+12.5%',
                trendDirection: 'up',
                comparison: 'vs last period'
              },
              {
                id: 'net-sales',
                name: 'Net Sales',
                value: '$11,205',
                trend: '+8.3%',
                trendDirection: 'up',
                comparison: 'vs last period'
              },
              {
                id: 'transactions',
                name: 'Transactions',
                value: '342',
                trend: '+15.2%',
                trendDirection: 'up',
                comparison: 'vs last period'
              },
              {
                id: 'avg-order',
                name: 'Avg Order Value',
                value: '$36.40',
                trend: '-2.1%',
                trendDirection: 'down',
                comparison: 'vs last period'
              }
            ]
          }
        },
        visible: true,
        order: 3
      },
      {
        id: 'visualization',
        type: 'visualization',
        config: {
          visualization: {
            type: 'multiple',
            charts: [
              {
                id: 'sales-trend',
                type: 'line',
                title: 'Sales Trend',
                timeframe: 'day',
                metrics: ['gross_sales', 'net_sales'],
                size: 'large'
              },
              {
                id: 'transaction-volume',
                type: 'bar',
                title: 'Transaction Volume',
                timeframe: 'day',
                metrics: ['transaction_count'],
                size: 'medium'
              }
            ],
            showLegend: true,
            showTooltips: true
          }
        },
        visible: true,
        order: 4
      }
    ]
  },

  'category-performance': {
    id: 'category-performance',
    name: 'Category Performance',
    description: 'Sales performance by product categories',
    type: 'analysis',
    grain: 'items',
    defaultGroupBy: 'category',
    defaultMetrics: ['item_sales', 'net_item_sales', 'items_sold', 'units_sold'],
    category: 'sales',
    blocks: [
      {
        id: 'header',
        type: 'header',
        config: {
          header: {
            title: 'Category Performance',
            description: 'Sales performance by product categories',
            showDataFreshness: true,
            showOptions: true,
            options: ['export']
          }
        },
        visible: true,
        order: 1
      },
      {
        id: 'controls',
        type: 'controls',
        config: {
          controls: {
            primary: ['time_period', 'location'],
            secondary: ['group_by', 'metrics', 'filters'],
            showGroupBy: true,
            showMetricSelector: true,
            availableGroupBy: [
              { id: 'category', name: 'Categories' },
              { id: 'category_rollup', name: 'Category Rollup' },
              { id: 'item_type', name: 'Item Type' },
              { id: 'location', name: 'Location' }
            ],
            availableMetrics: [
              { id: 'item_sales', name: 'Item Sales' },
              { id: 'net_item_sales', name: 'Net Item Sales' },
              { id: 'items_sold', name: 'Items Sold' },
              { id: 'units_sold', name: 'Units Sold' }
            ]
          }
        },
        visible: true,
        order: 2
      },
      {
        id: 'visualization',
        type: 'visualization',
        config: {
          visualization: {
            type: 'single',
            charts: [
              {
                id: 'category-performance',
                type: 'bar',
                title: 'Category Performance',
                groupBy: 'category',
                metrics: ['item_sales', 'items_sold'],
                size: 'large'
              }
            ],
            height: 400,
            showLegend: true,
            showTooltips: true
          }
        },
        visible: true,
        order: 3
      },
      {
        id: 'table',
        type: 'table',
        config: {
          table: {
            collapsible: true,
            defaultCollapsed: false,
            sortable: true,
            filterable: false,
            exportable: true,
            pagination: true,
            pageSize: 25,
            showSummaryRow: true
          }
        },
        visible: true,
        order: 4
      }
    ]
  },

  'employee-performance': {
    id: 'employee-performance',
    name: 'Employee Performance',
    description: 'Sales performance by team members',
    type: 'analysis',
    grain: 'orders',
    defaultGroupBy: 'employee',
    defaultMetrics: ['gross_sales', 'net_sales', 'transaction_count', 'tip'],
    category: 'sales',
    blocks: [
      {
        id: 'header',
        type: 'header',
        config: {
          header: {
            title: 'Employee Performance',
            description: 'Sales performance by team members',
            showDataFreshness: true,
            showOptions: true,
            options: ['export']
          }
        },
        visible: true,
        order: 1
      },
      {
        id: 'controls',
        type: 'controls',
        config: {
          controls: {
            primary: ['time_period', 'location'],
            secondary: ['group_by', 'metrics', 'filters'],
            showGroupBy: true,
            showMetricSelector: true,
            availableGroupBy: [
              { id: 'employee', name: 'Employee' },
              { id: 'location', name: 'Location' },
              { id: 'channel', name: 'Channel' },
              { id: 'section', name: 'Section' }
            ],
            availableMetrics: [
              { id: 'gross_sales', name: 'Gross Sales' },
              { id: 'net_sales', name: 'Net Sales' },
              { id: 'transaction_count', name: 'Transaction Count' },
              { id: 'tip', name: 'Tips' },
              { id: 'average_cover_count', name: 'Average Cover Count' }
            ]
          }
        },
        visible: true,
        order: 2
      },
      {
        id: 'visualization',
        type: 'visualization',
        config: {
          visualization: {
            type: 'single',
            charts: [
              {
                id: 'employee-performance',
                type: 'bar',
                title: 'Employee Performance',
                groupBy: 'employee',
                metrics: ['gross_sales', 'transaction_count'],
                size: 'large'
              }
            ],
            height: 400,
            showLegend: true,
            showTooltips: true
          }
        },
        visible: true,
        order: 3
      },
      {
        id: 'table',
        type: 'table',
        config: {
          table: {
            collapsible: true,
            defaultCollapsed: false,
            sortable: true,
            filterable: false,
            exportable: true,
            pagination: true,
            pageSize: 25,
            showSummaryRow: true
          }
        },
        visible: true,
        order: 4
      }
    ]
  },
  'sales-trends': {
    id: 'sales-trends',
    name: 'Sales Trends',
    description: 'Track sales performance over time with multiple chart views',
    type: 'trend',
    grain: 'orders',
    defaultGroupBy: 'order_created',
    defaultMetrics: ['gross_sales', 'net_sales', 'transaction_count', 'average_cover_count'],
    category: 'sales',
    blocks: [
      {
        id: 'header',
        type: 'header',
        config: {
          header: {
            title: 'Sales Trends',
            description: 'Track sales performance over time with multiple chart views',
            showDataFreshness: true,
            showOptions: true,
            options: ['export', 'print']
          }
        },
        visible: true,
        order: 1
      },
      {
        id: 'controls',
        type: 'controls',
        config: {
          controls: {
            primary: ['time_period', 'location'],
            secondary: ['filters'],
            showGroupBy: false,
            showMetricSelector: false
          }
        },
        visible: true,
        order: 2
      },
      {
        id: 'visualization',
        type: 'visualization',
        config: {
          visualization: {
            type: 'multiple',
            charts: [
              {
                id: 'daily-trend',
                type: 'line',
                title: 'Daily Trend',
                timeframe: 'day',
                metrics: ['gross_sales', 'net_sales'],
                size: 'medium'
              },
              {
                id: 'weekly-performance',
                type: 'bar',
                title: 'Weekly Performance',
                timeframe: 'week',
                metrics: ['gross_sales', 'transaction_count'],
                size: 'medium'
              },
              {
                id: 'monthly-overview',
                type: 'area',
                title: 'Monthly Overview',
                timeframe: 'month',
                metrics: ['gross_sales', 'net_sales'],
                size: 'medium'
              }
            ],
            showLegend: true,
            showTooltips: true
          }
        },
        visible: true,
        order: 3
      }
    ]
  },

  'item-analysis': {
    id: 'item-analysis',
    name: 'Item Analysis',
    description: 'Detailed breakdown of individual item performance',
    type: 'analysis',
    grain: 'items',
    defaultGroupBy: 'item_name',
    defaultMetrics: ['item_sales', 'net_item_sales', 'items_sold', 'units_sold'],
    category: 'sales',
    blocks: [
      {
        id: 'header',
        type: 'header',
        config: {
          header: {
            title: 'Item Analysis',
            description: 'Detailed breakdown of individual item performance',
            showDataFreshness: true,
            showOptions: true,
            options: ['export']
          }
        },
        visible: true,
        order: 1
      },
      {
        id: 'controls',
        type: 'controls',
        config: {
          controls: {
            primary: ['time_period', 'location'],
            secondary: ['group_by', 'metrics', 'filters'],
            showGroupBy: true,
            showMetricSelector: true,
            availableGroupBy: [
              { id: 'item_name', name: 'Item Name' },
              { id: 'category', name: 'Categories' },
              { id: 'category_rollup', name: 'Category Rollup' },
              { id: 'item_type', name: 'Item Type' },
              { id: 'item_variation', name: 'Item Variation' },
              { id: 'vendor_name', name: 'Vendor Name' },
              { id: 'channel', name: 'Channel' },
              { id: 'device', name: 'Device' },
              { id: 'employee_collected', name: 'Employee (collected by)' },
              { id: 'employee_attributed', name: 'Employee (attributed to)' },
              { id: 'location', name: 'Location' },
              { id: 'customer_name', name: 'Customer Name' },
              { id: 'customer_type', name: 'Customer Type' },
              { id: 'order_created', name: 'Order Created' },
              { id: 'reporting_category', name: 'Reporting Category' },
              { id: 'menu', name: 'Menu' },
              { id: 'section', name: 'Section' }
            ],
            availableMetrics: [
              { id: 'item_sales', name: 'Item Sales' },
              { id: 'net_item_sales', name: 'Net Item Sales' },
              { id: 'tax', name: 'Tax' },
              { id: 'discount_amount', name: 'Discount Amount' },
              { id: 'comps', name: 'Comps' },
              { id: 'void', name: 'Void' },
              { id: 'items_refunded', name: 'Items Refunded' },
              { id: 'items_sold', name: 'Items Sold' },
              { id: 'units_sold', name: 'Units Sold' },
              { id: 'units_refunded', name: 'Units Refunded' },
              { id: 'returns', name: 'Returns' },
              { id: 'variation_unit_cost', name: 'Variation Unit Cost' }
            ]
          }
        },
        visible: true,
        order: 2
      },
      {
        id: 'visualization',
        type: 'visualization',
        config: {
          visualization: {
            type: 'single',
            charts: [
              {
                id: 'item-performance',
                type: 'bar',
                title: 'Item Performance',
                groupBy: 'item_name',
                metrics: ['item_sales', 'net_item_sales'],
                size: 'large'
              }
            ],
            height: 400,
            showLegend: true,
            showTooltips: true
          }
        },
        visible: true,
        order: 3
      },
      {
        id: 'table',
        type: 'table',
        config: {
          table: {
            collapsible: true,
            defaultCollapsed: false,
            sortable: true,
            filterable: false,
            exportable: true,
            pagination: true,
            pageSize: 25,
            showSummaryRow: true
          }
        },
        visible: true,
        order: 4
      }
    ]
  },

  'discount-analysis': {
    id: 'discount-analysis',
    name: 'Discount Analysis',
    description: 'Analysis of discount usage and impact',
    type: 'analysis',
    grain: 'discounts',
    defaultGroupBy: 'discount_name',
    defaultMetrics: ['amount_discounted', 'discounts_applied', 'orders_discounted', 'items_discounted'],
    category: 'sales',
    blocks: [
      {
        id: 'header',
        type: 'header',
        config: {
          header: {
            title: 'Discount Analysis',
            description: 'Analysis of discount usage and impact',
            showDataFreshness: true,
            showOptions: true,
            options: ['export']
          }
        },
        visible: true,
        order: 1
      },
      {
        id: 'controls',
        type: 'controls',
        config: {
          controls: {
            primary: ['time_period', 'location'],
            secondary: ['group_by', 'metrics', 'filters'],
            showGroupBy: true,
            showMetricSelector: true,
            availableGroupBy: [
              { id: 'discount_name', name: 'Discount Name' },
              { id: 'category', name: 'Categories' },
              { id: 'channel', name: 'Channel' },
              { id: 'device', name: 'Device' },
              { id: 'employee_collected', name: 'Employee (collected by)' },
              { id: 'employee_attributed', name: 'Employee (attributed to)' },
              { id: 'location', name: 'Location' },
              { id: 'customer_name', name: 'Customer Name' },
              { id: 'customer_type', name: 'Customer Type' },
              { id: 'order_created', name: 'Order Created' },
              { id: 'item_name', name: 'Item Name' },
              { id: 'item_type', name: 'Item Type' }
            ],
            availableMetrics: [
              { id: 'amount_discounted', name: 'Amount Discounted' },
              { id: 'discounts_applied', name: 'Discounts Applied' },
              { id: 'orders_discounted', name: 'Orders Discounted' },
              { id: 'items_discounted', name: 'Items Discounted' },
              { id: 'gift_card_amount_discounted', name: 'Gift Card Amount Discounted' },
              { id: 'gift_card_discounts_applied', name: 'Gift Card Discounts Applied' }
            ]
          }
        },
        visible: true,
        order: 2
      },
      {
        id: 'visualization',
        type: 'visualization',
        config: {
          visualization: {
            type: 'single',
            charts: [
              {
                id: 'discount-performance',
                type: 'bar',
                title: 'Discount Usage',
                groupBy: 'discount_name',
                metrics: ['amount_discounted', 'discounts_applied'],
                size: 'large'
              }
            ],
            height: 400,
            showLegend: true,
            showTooltips: true
          }
        },
        visible: true,
        order: 3
      },
      {
        id: 'table',
        type: 'table',
        config: {
          table: {
            collapsible: true,
            defaultCollapsed: false,
            sortable: true,
            filterable: false,
            exportable: true,
            pagination: true,
            pageSize: 25,
            showSummaryRow: true
          }
        },
        visible: true,
        order: 4
      }
    ]
  },

  'modifier-analysis': {
    id: 'modifier-analysis',
    name: 'Modifier Analysis',
    description: 'Analysis of modifier sales and performance',
    type: 'analysis',
    grain: 'modifiers',
    defaultGroupBy: 'modifier_name',
    defaultMetrics: ['modifier_qty_sold', 'modifier_gross_sales', 'modifier_net_sales'],
    category: 'sales',
    blocks: [
      {
        id: 'header',
        type: 'header',
        config: {
          header: {
            title: 'Modifier Analysis',
            description: 'Analysis of modifier sales and performance',
            showDataFreshness: true,
            showOptions: true,
            options: ['export']
          }
        },
        visible: true,
        order: 1
      },
      {
        id: 'controls',
        type: 'controls',
        config: {
          controls: {
            primary: ['time_period', 'location'],
            secondary: ['group_by', 'metrics', 'filters'],
            showGroupBy: true,
            showMetricSelector: true,
            availableGroupBy: [
              { id: 'modifier_name', name: 'Modifier Name' },
              { id: 'modifier_set', name: 'Modifier Set' },
              { id: 'category', name: 'Categories' },
              { id: 'item_name', name: 'Item Name' },
              { id: 'channel', name: 'Channel' },
              { id: 'device', name: 'Device' },
              { id: 'employee_collected', name: 'Employee (collected by)' },
              { id: 'employee_attributed', name: 'Employee (attributed to)' },
              { id: 'location', name: 'Location' },
              { id: 'customer_name', name: 'Customer Name' },
              { id: 'customer_type', name: 'Customer Type' },
              { id: 'order_created', name: 'Order Created' }
            ],
            availableMetrics: [
              { id: 'modifier_qty_sold', name: 'Modifier Qty Sold' },
              { id: 'modifier_gross_sales', name: 'Modifier Gross Sales' },
              { id: 'modifier_net_sales', name: 'Modifier Net Sales' },
              { id: 'modifier_qty_refunded', name: 'Modifier Qty Refunded' },
              { id: 'modifier_refunds', name: 'Modifier Refunds' },
              { id: 'modifier_price', name: 'Modifier Price' }
            ]
          }
        },
        visible: true,
        order: 2
      },
      {
        id: 'visualization',
        type: 'visualization',
        config: {
          visualization: {
            type: 'single',
            charts: [
              {
                id: 'modifier-performance',
                type: 'bar',
                title: 'Modifier Performance',
                groupBy: 'modifier_name',
                metrics: ['modifier_qty_sold', 'modifier_gross_sales'],
                size: 'large'
              }
            ],
            height: 400,
            showLegend: true,
            showTooltips: true
          }
        },
        visible: true,
        order: 3
      },
      {
        id: 'table',
        type: 'table',
        config: {
          table: {
            collapsible: true,
            defaultCollapsed: false,
            sortable: true,
            filterable: false,
            exportable: true,
            pagination: true,
            pageSize: 25,
            showSummaryRow: true
          }
        },
        visible: true,
        order: 4
      }
    ]
  },

  'payment-analysis': {
    id: 'payment-analysis',
    name: 'Payment Analysis',
    description: 'Analysis of payment methods and transaction fees',
    type: 'analysis',
    grain: 'payments',
    defaultGroupBy: 'payment_method',
    defaultMetrics: ['total_collected', 'payment_amount', 'fees', 'tips'],
    category: 'payments',
    blocks: [
      {
        id: 'header',
        type: 'header',
        config: {
          header: {
            title: 'Payment Analysis',
            description: 'Analysis of payment methods and transaction fees',
            showDataFreshness: true,
            showOptions: true,
            options: ['export']
          }
        },
        visible: true,
        order: 1
      },
      {
        id: 'controls',
        type: 'controls',
        config: {
          controls: {
            primary: ['time_period', 'location'],
            secondary: ['group_by', 'metrics', 'filters'],
            showGroupBy: true,
            showMetricSelector: true,
            availableGroupBy: [
              { id: 'payment_method', name: 'Payment Method' },
              { id: 'card_brand', name: 'Card Brand' },
              { id: 'channel', name: 'Channel' },
              { id: 'device', name: 'Device' },
              { id: 'employee_collected', name: 'Employee (collected by)' },
              { id: 'employee_attributed', name: 'Employee (attributed to)' },
              { id: 'location', name: 'Location' },
              { id: 'customer_name', name: 'Customer Name' },
              { id: 'customer_type', name: 'Customer Type' },
              { id: 'order_created', name: 'Order Created' },
              { id: 'transaction_timestamp', name: 'Transaction Timestamp' },
              { id: 'payment_status', name: 'Payment Status' }
            ],
            availableMetrics: [
              { id: 'fees', name: 'Fees' },
              { id: 'no_of_payments', name: 'No. of Payments' },
              { id: 'no_of_refunds', name: 'No. of Refunds' },
              { id: 'total_collected', name: 'Total Collected' },
              { id: 'payment_amount', name: 'Payment Amount' },
              { id: 'tips', name: 'Tips' },
              { id: 'refund_amount', name: 'Refund Amount' },
              { id: 'initial_fee', name: 'Initial Fee' },
              { id: 'cost_of_acceptance', name: 'Cost of Acceptance' },
              { id: 'total_fees_incl_taxes', name: 'Total Fees (incl. taxes)' }
            ]
          }
        },
        visible: true,
        order: 2
      },
      {
        id: 'visualization',
        type: 'visualization',
        config: {
          visualization: {
            type: 'single',
            charts: [
              {
                id: 'payment-performance',
                type: 'pie',
                title: 'Payment Methods',
                groupBy: 'payment_method',
                metrics: ['total_collected'],
                size: 'large'
              }
            ],
            height: 400,
            showLegend: true,
            showTooltips: true
          }
        },
        visible: true,
        order: 3
      },
      {
        id: 'table',
        type: 'table',
        config: {
          table: {
            collapsible: true,
            defaultCollapsed: false,
            sortable: true,
            filterable: false,
            exportable: true,
            pagination: true,
            pageSize: 25,
            showSummaryRow: true
          }
        },
        visible: true,
        order: 4
      }
    ]
  },

  'customer-analysis': {
    id: 'customer-analysis',
    name: 'Customer Analysis',
    description: 'Analysis of customer behavior and spending patterns',
    type: 'analysis',
    grain: 'customers',
    defaultGroupBy: 'customer_type',
    defaultMetrics: ['new_visit_count', 'repeat_visit_count', 'amount_spend', 'average_spend'],
    category: 'customers',
    blocks: [
      {
        id: 'header',
        type: 'header',
        config: {
          header: {
            title: 'Customer Analysis',
            description: 'Analysis of customer behavior and spending patterns',
            showDataFreshness: true,
            showOptions: true,
            options: ['export']
          }
        },
        visible: true,
        order: 1
      },
      {
        id: 'controls',
        type: 'controls',
        config: {
          controls: {
            primary: ['time_period', 'location'],
            secondary: ['group_by', 'metrics', 'filters'],
            showGroupBy: true,
            showMetricSelector: true,
            availableGroupBy: [
              { id: 'customer_type', name: 'Customer Type (New vs Returning)' },
              { id: 'customer', name: 'Customer' },
              { id: 'device', name: 'Device' },
              { id: 'channel', name: 'Channel' },
              { id: 'employee', name: 'Employee' },
              { id: 'location', name: 'Location' },
              { id: 'order_created', name: 'Order Created' },
              { id: 'order_completed', name: 'Order Completed/Fulfilled' },
              { id: 'spend_distribution', name: 'Spend Distribution' },
              { id: 'visit_frequency', name: 'Visit Frequency' },
              { id: 'loyalty_visit', name: 'Loyalty Visit (Loyalty vs non Loyalty)' }
            ],
            availableMetrics: [
              { id: 'new_visit_count', name: 'New Visit Count' },
              { id: 'repeat_visit_count', name: 'Repeat Visit Count' },
              { id: 'amount_spend', name: 'Amount Spend' },
              { id: 'average_spend', name: 'Average Spend' },
              { id: 'spend_distribution_count', name: 'Spend Distribution Count' },
              { id: 'visit_frequency_percent', name: 'Visit Frequency %' },
              { id: 'loyalty_visit_count', name: 'Loyalty Visit Count' }
            ]
          }
        },
        visible: true,
        order: 2
      },
      {
        id: 'visualization',
        type: 'visualization',
        config: {
          visualization: {
            type: 'single',
            charts: [
              {
                id: 'customer-performance',
                type: 'bar',
                title: 'Customer Segments',
                groupBy: 'customer_type',
                metrics: ['new_visit_count', 'repeat_visit_count'],
                size: 'large'
              }
            ],
            height: 400,
            showLegend: true,
            showTooltips: true
          }
        },
        visible: true,
        order: 3
      },
      {
        id: 'table',
        type: 'table',
        config: {
          table: {
            collapsible: true,
            defaultCollapsed: false,
            sortable: true,
            filterable: false,
            exportable: true,
            pagination: true,
            pageSize: 25,
            showSummaryRow: true
          }
        },
        visible: true,
        order: 4
      }
    ]
  },

  'section-sales': {
    id: 'section-sales',
    name: 'Section Sales',
    description: 'Sales performance by restaurant sections',
    type: 'analysis',
    grain: 'orders',
    defaultGroupBy: 'section',
    defaultMetrics: ['gross_sales', 'net_sales', 'transaction_count', 'average_cover_count'],
    category: 'sales',
    blocks: [
      {
        id: 'header',
        type: 'header',
        config: {
          header: {
            title: 'Section Sales',
            description: 'Sales performance by restaurant sections',
            showDataFreshness: true,
            showOptions: true,
            options: ['export']
          }
        },
        visible: true,
        order: 1
      },
      {
        id: 'controls',
        type: 'controls',
        config: {
          controls: {
            primary: ['time_period', 'location'],
            secondary: ['group_by', 'metrics', 'filters'],
            showGroupBy: true,
            showMetricSelector: true,
            availableGroupBy: [
              { id: 'section', name: 'Section' },
              { id: 'order_name', name: 'Order Name' },
              { id: 'device', name: 'Device' },
              { id: 'channel', name: 'Channel' },
              { id: 'employee', name: 'Employee' },
              { id: 'location', name: 'Location' },
              { id: 'customer', name: 'Customer' },
              { id: 'customer_type', name: 'Customer Type' },
              { id: 'order_created', name: 'Order Created' }
            ],
            availableMetrics: [
              { id: 'gross_sales', name: 'Gross Sales' },
              { id: 'net_sales', name: 'Net Sales' },
              { id: 'refunds', name: 'Refunds' },
              { id: 'transaction_count', name: 'Transaction Count' },
              { id: 'discount', name: 'Discount' },
              { id: 'returns', name: 'Returns' },
              { id: 'service_charges', name: 'Service Charges' },
              { id: 'tax', name: 'Tax' },
              { id: 'tip', name: 'Tip' },
              { id: 'average_cover_count', name: 'Average Cover Count' },
              { id: 'covers', name: 'Covers' }
            ]
          }
        },
        visible: true,
        order: 2
      },
      {
        id: 'visualization',
        type: 'visualization',
        config: {
          visualization: {
            type: 'single',
            charts: [
              {
                id: 'section-performance',
                type: 'bar',
                title: 'Section Performance',
                groupBy: 'section',
                metrics: ['gross_sales', 'transaction_count'],
                size: 'large'
              }
            ],
            height: 400,
            showLegend: true,
            showTooltips: true
          }
        },
        visible: true,
        order: 3
      },
      {
        id: 'table',
        type: 'table',
        config: {
          table: {
            collapsible: true,
            defaultCollapsed: false,
            sortable: true,
            filterable: false,
            exportable: true,
            pagination: true,
            pageSize: 25,
            showSummaryRow: true
          }
        },
        visible: true,
        order: 4
      }
    ]
  },

  'order-analysis': {
    id: 'order-analysis',
    name: 'Order Analysis',
    description: 'Detailed analysis of order patterns and performance',
    type: 'analysis',
    grain: 'orders',
    defaultGroupBy: 'channel',
    defaultMetrics: ['gross_sales', 'net_sales', 'transaction_count', 'average_cover_count'],
    category: 'sales',
    blocks: [
      {
        id: 'header',
        type: 'header',
        config: {
          header: {
            title: 'Order Analysis',
            description: 'Detailed analysis of order patterns and performance',
            showDataFreshness: true,
            showOptions: true,
            options: ['export']
          }
        },
        visible: true,
        order: 1
      },
      {
        id: 'controls',
        type: 'controls',
        config: {
          controls: {
            primary: ['time_period', 'location'],
            secondary: ['group_by', 'metrics', 'filters'],
            showGroupBy: true,
            showMetricSelector: true,
            availableGroupBy: [
              { id: 'order_name', name: 'Order Name' },
              { id: 'order_id', name: 'Order ID' },
              { id: 'device', name: 'Device' },
              { id: 'channel', name: 'Channel' },
              { id: 'section', name: 'Section' },
              { id: 'employee', name: 'Employee' },
              { id: 'location', name: 'Location' },
              { id: 'customer', name: 'Customer' },
              { id: 'customer_type', name: 'Customer Type (New, Returning, Loyalty)' },
              { id: 'order_created', name: 'Order Created' },
              { id: 'order_completed', name: 'Order Completed/Fulfilled' },
              { id: 'customer_visit_frequency', name: 'Customer Visit Frequency' }
            ],
            availableMetrics: [
              { id: 'gross_sales', name: 'Gross Sales' },
              { id: 'net_sales', name: 'Net Sales' },
              { id: 'refunds', name: 'Refunds' },
              { id: 'transaction_count', name: 'Transaction Count' },
              { id: 'discount', name: 'Discount' },
              { id: 'returns', name: 'Returns' },
              { id: 'service_charges', name: 'Service Charges (custom + card surcharge)' },
              { id: 'tax', name: 'Tax' },
              { id: 'tip', name: 'Tip' },
              { id: 'average_cover_count', name: 'Average Cover Count' },
              { id: 'covers', name: 'Covers' },
              { id: 'customer_frequency', name: 'Customer Frequency' }
            ]
          }
        },
        visible: true,
        order: 2
      },
      {
        id: 'visualization',
        type: 'visualization',
        config: {
          visualization: {
            type: 'single',
            charts: [
              {
                id: 'order-performance',
                type: 'bar',
                title: 'Order Performance',
                groupBy: 'channel',
                metrics: ['gross_sales', 'transaction_count'],
                size: 'large'
              }
            ],
            height: 400,
            showLegend: true,
            showTooltips: true
          }
        },
        visible: true,
        order: 3
      },
      {
        id: 'table',
        type: 'table',
        config: {
          table: {
            collapsible: true,
            defaultCollapsed: false,
            sortable: true,
            filterable: false,
            exportable: true,
            pagination: true,
            pageSize: 25,
            showSummaryRow: true
          }
        },
        visible: true,
        order: 4
      }
    ]
  },

  'item-profitability': {
    id: 'item-profitability',
    name: 'Item Profitability',
    description: 'Profit margins and cost analysis by menu item',
    type: 'analysis',
    grain: 'items',
    defaultGroupBy: 'item_name',
    defaultMetrics: ['item_sales', 'unit_cost', 'profit_margin', 'profit_margin_percentage'],
    category: 'profitability',
    blocks: [
      {
        id: 'header',
        type: 'header',
        config: {
          header: {
            title: 'Item Profitability',
            description: 'Profit margins and cost analysis by menu item',
            showDataFreshness: true,
            showOptions: true,
            options: ['export']
          }
        },
        visible: true,
        order: 1
      },
      {
        id: 'controls',
        type: 'controls',
        config: {
          controls: {
            primary: ['time_period', 'location'],
            secondary: ['group_by', 'metrics', 'filters'],
            showGroupBy: true,
            showMetricSelector: true,
            availableGroupBy: [
              { id: 'item_name', name: 'Item Name' },
              { id: 'category', name: 'Categories' },
              { id: 'category_rollup', name: 'Category Rollup' },
              { id: 'item_type', name: 'Item Type' },
              { id: 'location', name: 'Location' },
              { id: 'vendor_name', name: 'Vendor Name' }
            ],
            availableMetrics: [
              { id: 'item_sales', name: 'Item Sales' },
              { id: 'unit_cost', name: 'Unit Cost' },
              { id: 'profit_margin', name: 'Profit Margin' },
              { id: 'profit_margin_percentage', name: 'Profit Margin %' },
              { id: 'food_cost_percentage', name: 'Food Cost %' },
              { id: 'units_sold', name: 'Units Sold' }
            ]
          }
        },
        visible: true,
        order: 2
      },
      {
        id: 'visualization',
        type: 'visualization',
        config: {
          visualization: {
            type: 'single',
            charts: [
              {
                id: 'profitability-chart',
                type: 'bar',
                title: 'Item Profitability',
                groupBy: 'item_name',
                metrics: ['profit_margin', 'profit_margin_percentage'],
                size: 'large'
              }
            ],
            height: 400,
            showLegend: true,
            showTooltips: true
          }
        },
        visible: true,
        order: 3
      },
      {
        id: 'table',
        type: 'table',
        config: {
          table: {
            collapsible: true,
            defaultCollapsed: false,
            sortable: true,
            filterable: false,
            exportable: true,
            pagination: true,
            pageSize: 25,
            showSummaryRow: true
          }
        },
        visible: true,
        order: 4
      }
    ]
  },

  'category-profitability': {
    id: 'category-profitability',
    name: 'Category Profitability',
    description: 'Profit margins and food costs by menu category',
    type: 'analysis',
    grain: 'items',
    defaultGroupBy: 'category',
    defaultMetrics: ['item_sales', 'unit_cost', 'profit_margin', 'food_cost_percentage'],
    category: 'profitability',
    blocks: [
      {
        id: 'header',
        type: 'header',
        config: {
          header: {
            title: 'Category Profitability',
            description: 'Profit margins and food costs by menu category',
            showDataFreshness: true,
            showOptions: true,
            options: ['export']
          }
        },
        visible: true,
        order: 1
      },
      {
        id: 'controls',
        type: 'controls',
        config: {
          controls: {
            primary: ['time_period', 'location'],
            secondary: ['group_by', 'metrics', 'filters'],
            showGroupBy: true,
            showMetricSelector: true,
            availableGroupBy: [
              { id: 'category', name: 'Categories' },
              { id: 'category_rollup', name: 'Category Rollup' },
              { id: 'item_type', name: 'Item Type' },
              { id: 'location', name: 'Location' },
              { id: 'vendor_name', name: 'Vendor Name' }
            ],
            availableMetrics: [
              { id: 'item_sales', name: 'Item Sales' },
              { id: 'unit_cost', name: 'Unit Cost' },
              { id: 'profit_margin', name: 'Profit Margin' },
              { id: 'profit_margin_percentage', name: 'Profit Margin %' },
              { id: 'food_cost_percentage', name: 'Food Cost %' },
              { id: 'units_sold', name: 'Units Sold' }
            ]
          }
        },
        visible: true,
        order: 2
      },
      {
        id: 'visualization',
        type: 'visualization',
        config: {
          visualization: {
            type: 'single',
            charts: [
              {
                id: 'category-profitability-chart',
                type: 'bar',
                title: 'Category Profitability',
                groupBy: 'category',
                metrics: ['profit_margin', 'food_cost_percentage'],
                size: 'large'
              }
            ],
            height: 400,
            showLegend: true,
            showTooltips: true
          }
        },
        visible: true,
        order: 3
      },
      {
        id: 'table',
        type: 'table',
        config: {
          table: {
            collapsible: true,
            defaultCollapsed: false,
            sortable: true,
            filterable: false,
            exportable: true,
            pagination: true,
            pageSize: 25,
            showSummaryRow: true
          }
        },
        visible: true,
        order: 4
      }
    ]
  },

  'prime-cost-analysis': {
    id: 'prime-cost-analysis',
    name: 'Prime Cost Analysis',
    description: 'Food cost + labor cost analysis by location',
    type: 'analysis',
    grain: 'orders',
    defaultGroupBy: 'location',
    defaultMetrics: ['gross_sales', 'food_cost', 'labor_cost', 'prime_cost', 'prime_cost_percentage'],
    category: 'profitability',
    blocks: [
      {
        id: 'header',
        type: 'header',
        config: {
          header: {
            title: 'Prime Cost Analysis',
            description: 'Food cost + labor cost analysis by location',
            showDataFreshness: true,
            showOptions: true,
            options: ['export']
          }
        },
        visible: true,
        order: 1
      },
      {
        id: 'controls',
        type: 'controls',
        config: {
          controls: {
            primary: ['time_period', 'location'],
            secondary: ['group_by', 'metrics', 'filters'],
            showGroupBy: true,
            showMetricSelector: true,
            availableGroupBy: [
              { id: 'location', name: 'Location' },
              { id: 'channel', name: 'Channel' },
              { id: 'section', name: 'Section' },
              { id: 'employee', name: 'Employee' },
              { id: 'order_created', name: 'Order Created' }
            ],
            availableMetrics: [
              { id: 'gross_sales', name: 'Gross Sales' },
              { id: 'food_cost', name: 'Food Cost' },
              { id: 'labor_cost', name: 'Labor Cost' },
              { id: 'prime_cost', name: 'Prime Cost' },
              { id: 'prime_cost_percentage', name: 'Prime Cost %' },
              { id: 'labor_cost_percentage', name: 'Labor Cost %' }
            ]
          }
        },
        visible: true,
        order: 2
      },
      {
        id: 'visualization',
        type: 'visualization',
        config: {
          visualization: {
            type: 'single',
            charts: [
              {
                id: 'prime-cost-chart',
                type: 'bar',
                title: 'Prime Cost Analysis',
                groupBy: 'location',
                metrics: ['prime_cost', 'prime_cost_percentage'],
                size: 'large'
              }
            ],
            height: 400,
            showLegend: true,
            showTooltips: true
          }
        },
        visible: true,
        order: 3
      },
      {
        id: 'table',
        type: 'table',
        config: {
          table: {
            collapsible: true,
            defaultCollapsed: false,
            sortable: true,
            filterable: false,
            exportable: true,
            pagination: true,
            pageSize: 25,
            showSummaryRow: true
          }
        },
        visible: true,
        order: 4
      }
    ]
  }
};
