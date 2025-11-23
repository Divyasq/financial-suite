import { ReportTemplate } from '../types/reportBlocks';

export const REPORT_TEMPLATES: Record<string, ReportTemplate> = {
  'sales-trends': {
    id: 'sales-trends',
    name: 'Sales Trends',
    description: 'Track sales performance over time with multiple chart views',
    type: 'trend',
    grain: 'orders',
    defaultGroupBy: 'order_created',
    defaultMetrics: ['gross_sales', 'net_sales', 'transaction_count', 'average_transaction'],
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
            options: ['export', 'print', 'customize']
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
            maxMetrics: 4,
            layout: 'horizontal',
            showComparison: true,
            showTrends: true
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
        order: 4
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
            options: ['export', 'customize']
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
              { id: 'category', name: 'Category' },
              { id: 'item_type', name: 'Item Type' },
              { id: 'vendor_name', name: 'Vendor' }
            ],
            availableMetrics: [
              { id: 'item_sales', name: 'Item Sales' },
              { id: 'net_item_sales', name: 'Net Item Sales' },
              { id: 'items_sold', name: 'Items Sold' },
              { id: 'units_sold', name: 'Units Sold' },
              { id: 'tax', name: 'Tax' },
              { id: 'discount_amount', name: 'Discount Amount' }
            ]
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
            maxMetrics: 4,
            layout: 'horizontal',
            showComparison: false,
            showTrends: false
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
        order: 4
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
        order: 5
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
    defaultMetrics: ['item_sales', 'net_item_sales', 'items_sold', 'discount_amount'],
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
            options: ['export', 'customize']
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
            secondary: ['metrics', 'filters'],
            showGroupBy: false,
            showMetricSelector: true,
            availableMetrics: [
              { id: 'item_sales', name: 'Item Sales' },
              { id: 'net_item_sales', name: 'Net Item Sales' },
              { id: 'items_sold', name: 'Items Sold' },
              { id: 'units_sold', name: 'Units Sold' },
              { id: 'discount_amount', name: 'Discount Amount' }
            ]
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
            maxMetrics: 4,
            layout: 'horizontal',
            showComparison: false,
            showTrends: false
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
            type: 'single',
            charts: [
              {
                id: 'category-performance',
                type: 'pie',
                title: 'Sales by Category',
                groupBy: 'category',
                metrics: ['item_sales'],
                size: 'large'
              }
            ],
            height: 400,
            showLegend: true,
            showTooltips: true
          }
        },
        visible: true,
        order: 4
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
            pagination: false,
            pageSize: 25,
            showSummaryRow: true
          }
        },
        visible: true,
        order: 5
      }
    ]
  },

  'employee-performance': {
    id: 'employee-performance',
    name: 'Employee Performance',
    description: 'Sales performance by team members',
    type: 'analysis',
    grain: 'employees',
    defaultGroupBy: 'employee_name',
    defaultMetrics: ['gross_sales', 'net_sales', 'transaction_count', 'tips_collected'],
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
            options: ['export', 'customize']
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
            secondary: ['metrics', 'filters'],
            showGroupBy: false,
            showMetricSelector: true,
            availableMetrics: [
              { id: 'gross_sales', name: 'Gross Sales' },
              { id: 'net_sales', name: 'Net Sales' },
              { id: 'transaction_count', name: 'Transaction Count' },
              { id: 'tips_collected', name: 'Tips Collected' },
              { id: 'sales_per_hour', name: 'Sales per Hour' }
            ]
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
            maxMetrics: 4,
            layout: 'horizontal',
            showComparison: true,
            showTrends: true
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
            type: 'single',
            charts: [
              {
                id: 'employee-performance',
                type: 'bar',
                title: 'Sales by Employee',
                groupBy: 'employee_name',
                metrics: ['gross_sales', 'net_sales'],
                size: 'large'
              }
            ],
            height: 400,
            showLegend: true,
            showTooltips: true
          }
        },
        visible: true,
        order: 4
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
        order: 5
      }
    ]
  }
};
