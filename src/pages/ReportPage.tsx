import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ReportCanvas } from '../components/reportBlocks/ReportCanvas';
import { REPORT_TEMPLATES } from '../data/reportTemplates';

// ReportPage - handles both standard and custom reports

// Mock custom reports data with proper metrics and dimensions for data generation
const mockCustomReports = [
  {
    id: '1',
    name: 'Weekly Performance Dashboard',
    description: 'Comprehensive weekly sales and performance metrics',
    type: 'dashboard',
    status: 'active',
    createdBy: 'John Doe',
    createdAt: '2025-01-15',
    lastModified: '2025-01-20',
    lastRun: '2 hours ago',
    metrics: ['gross_sales', 'net_sales', 'transaction_count', 'average_order_value'],
    dimensions: ['location', 'order_created'],
    grain: 'orders',
    filters: 3,
    isShared: true
  },
  {
    id: '2',
    name: 'Product Category Analysis',
    description: 'Deep dive into product category performance',
    type: 'table',
    status: 'active',
    createdBy: 'Jane Smith',
    createdAt: '2025-01-10',
    lastModified: '2025-01-18',
    lastRun: '1 day ago',
    metrics: ['item_sales', 'units_sold', 'profit_margin'],
    dimensions: ['category', 'item_name'],
    grain: 'items',
    filters: 5,
    isShared: false
  },
  {
    id: '3',
    name: 'Customer Behavior Trends',
    description: 'Analysis of customer purchasing patterns',
    type: 'chart',
    status: 'draft',
    createdBy: 'Mike Johnson',
    createdAt: '2025-01-22',
    lastModified: '2025-01-25',
    metrics: ['new_visit_count', 'repeat_visit_count', 'amount_spend'],
    dimensions: ['customer_type', 'order_created'],
    grain: 'customers',
    filters: 2,
    isShared: false
  },
  {
    id: '4',
    name: 'Monthly Revenue Breakdown',
    description: 'Detailed monthly revenue analysis with comparisons',
    type: 'dashboard',
    status: 'active',
    createdBy: 'Sarah Wilson',
    createdAt: '2025-01-05',
    lastModified: '2025-01-23',
    lastRun: '3 hours ago',
    metrics: ['gross_sales', 'net_sales', 'transaction_count'],
    dimensions: ['order_created', 'channel'],
    grain: 'orders',
    filters: 4,
    isShared: true
  },
  {
    id: '5',
    name: 'Labor Cost Optimization',
    description: 'Track labor costs, productivity metrics, and scheduling efficiency',
    type: 'dashboard',
    status: 'active',
    createdBy: 'David Park',
    createdAt: '2025-01-12',
    lastModified: '2025-01-24',
    lastRun: '5 hours ago',
    metrics: ['labor_cost', 'labor_cost_percentage', 'gross_sales'],
    dimensions: ['location', 'employee'],
    grain: 'orders',
    filters: 6,
    isShared: false
  },
  {
    id: '6',
    name: 'Competitive Pricing Analysis',
    description: 'Compare menu prices against local competitors',
    type: 'table',
    status: 'active',
    createdBy: 'Alex Thompson',
    createdAt: '2025-01-08',
    lastModified: '2025-01-22',
    lastRun: '1 day ago',
    metrics: ['item_sales', 'profit_margin_percentage', 'units_sold'],
    dimensions: ['item_name', 'category'],
    grain: 'items',
    filters: 8,
    isShared: true
  },
  {
    id: '7',
    name: 'Inventory Turnover Report',
    description: 'Monitor inventory levels, waste, and reorder points',
    type: 'chart',
    status: 'active',
    createdBy: 'Lisa Chang',
    createdAt: '2025-01-14',
    lastModified: '2025-01-21',
    lastRun: '6 hours ago',
    metrics: ['units_sold', 'item_sales', 'profit_margin'],
    dimensions: ['item_name', 'category'],
    grain: 'items',
    filters: 4,
    isShared: false
  },
  {
    id: '8',
    name: 'Peak Hours Analysis',
    description: 'Identify busy periods and optimize staffing',
    type: 'chart',
    status: 'draft',
    createdBy: 'Carlos Martinez',
    createdAt: '2025-01-19',
    lastModified: '2025-01-25',
    metrics: ['gross_sales', 'transaction_count', 'average_cover_count'],
    dimensions: ['order_created', 'location'],
    grain: 'orders',
    filters: 3,
    isShared: false
  },
  {
    id: '9',
    name: 'Delivery Performance Metrics',
    description: 'Track delivery times, driver performance, and customer satisfaction',
    type: 'dashboard',
    status: 'active',
    createdBy: 'Emma Rodriguez',
    createdAt: '2025-01-11',
    lastModified: '2025-01-20',
    lastRun: '4 hours ago',
    metrics: ['gross_sales', 'transaction_count', 'tip'],
    dimensions: ['channel', 'employee'],
    grain: 'orders',
    filters: 5,
    isShared: true
  },
  {
    id: '10',
    name: 'Seasonal Menu Performance',
    description: 'Analyze seasonal item popularity and profitability',
    type: 'table',
    status: 'active',
    createdBy: 'Robert Kim',
    createdAt: '2025-01-06',
    lastModified: '2025-01-19',
    lastRun: '2 days ago',
    metrics: ['item_sales', 'units_sold', 'profit_margin_percentage'],
    dimensions: ['item_name', 'category'],
    grain: 'items',
    filters: 7,
    isShared: false
  },
  {
    id: '11',
    name: 'Payment Method Analysis',
    description: 'Track payment preferences and processing costs',
    type: 'chart',
    status: 'active',
    createdBy: 'Michelle Wu',
    createdAt: '2025-01-13',
    lastModified: '2025-01-24',
    lastRun: '8 hours ago',
    metrics: ['total_collected', 'fees', 'payment_amount'],
    dimensions: ['payment_method', 'location'],
    grain: 'payments',
    filters: 3,
    isShared: false
  },
  {
    id: '12',
    name: 'Customer Loyalty Insights',
    description: 'Deep dive into loyalty program effectiveness and customer retention',
    type: 'dashboard',
    status: 'draft',
    createdBy: 'James Wilson',
    createdAt: '2025-01-17',
    lastModified: '2025-01-25',
    metrics: ['new_visit_count', 'repeat_visit_count', 'amount_spend'],
    dimensions: ['customer_type', 'loyalty_visit'],
    grain: 'customers',
    filters: 4,
    isShared: false
  }
];

export function ReportPage() {
  const params = useParams<{ reportId?: string; id?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [template, setTemplate] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Handle both route parameter names: reportId (for standard reports) and id (for custom reports)
  const reportId = params.reportId || params.id;

  useEffect(() => {
    if (!reportId) {
      setLoading(false);
      return;
    }

    // Check if this is a custom report (from custom-reports path)
    const isCustomReport = location.pathname.includes('/custom-reports/view/');
    
    if (isCustomReport) {
      // Load custom report from localStorage and mock data
      const savedReports = JSON.parse(localStorage.getItem('customSavedReports') || '[]');
      
      // Check both saved reports and mock reports
      let customReport = savedReports.find((report: any) => report.id === reportId);
      
      if (!customReport) {
        customReport = mockCustomReports.find((report: any) => report.id === reportId);
      }
      
      if (customReport) {
        // Convert custom report to template format
        const customTemplate = {
          id: customReport.id,
          name: customReport.name,
          description: customReport.description,
          type: 'analysis' as const,
          grain: customReport.grain || 'orders',
          defaultGroupBy: customReport.dimensions?.[0] || null,
          defaultMetrics: customReport.metrics || [],
          selectedMetrics: customReport.metrics || [],
          selectedDimensions: customReport.dimensions || [],
          category: 'custom',
          blocks: [
            // Header block
            {
              id: 'header',
              type: 'header' as const,
              config: {
                header: {
                  title: customReport.name,
                  description: customReport.description,
                  showDataFreshness: true,
                  showOptions: true,
                  options: ['export', 'print']
                }
              },
              visible: true,
              order: 1
            },
            // Controls block
            {
              id: 'controls',
              type: 'controls' as const,
              config: {
                controls: {
                  primary: ['time_period', 'location'],
                  secondary: ['group_by', 'metrics', 'filters'],
                  showGroupBy: true,
                  showMetricSelector: true
                }
              },
              visible: true,
              order: 2
            },
            // Visualization block
            {
              id: 'chart-1',
              type: 'visualization' as const,
              config: {
                visualization: {
                  type: 'single',
                  charts: [
                    {
                      id: 'main-chart',
                      type: 'bar',
                      title: customReport.name,
                      groupBy: customReport.dimensions?.[0] || null,
                      metrics: customReport.metrics || [],
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
            // Table block
            {
              id: 'table-1',
              type: 'table' as const,
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
        };
        setTemplate(customTemplate);
      }
    } else {
      // Load standard report template
      const standardTemplate = REPORT_TEMPLATES[reportId];
      if (standardTemplate) {
        setTemplate(standardTemplate);
      }
    }
    
    setLoading(false);
  }, [reportId, location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading report...</p>
        </div>
      </div>
    );
  }

  if (!reportId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Report Not Found</h1>
          <p className="text-gray-600 mb-4">The requested report could not be found.</p>
          <button
            onClick={() => navigate('/financial-suite/custom-reports')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Reports
          </button>
        </div>
      </div>
    );
  }

  if (!template) {
    const isCustomReport = location.pathname.includes('/custom-reports/view/');
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isCustomReport ? 'Custom Report Not Found' : 'Report Template Not Found'}
          </h1>
          <p className="text-gray-600 mb-4">
            {isCustomReport 
              ? `The custom report "${reportId}" could not be found.`
              : `The report template for "${reportId}" is not available yet.`
            }
          </p>
          <button
            onClick={() => navigate(isCustomReport ? '/financial-suite/custom-reports' : '/financial-suite/standard-reports')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isCustomReport ? 'Back to Custom Reports' : 'Back to Standard Reports'}
          </button>
        </div>
      </div>
    );
  }

  const isCustomReport = location.pathname.includes('/custom-reports/view/');

  return (
    <ReportCanvas 
      template={template}
      onBack={() => navigate(isCustomReport ? '/financial-suite/custom-reports' : '/financial-suite/standard-reports')}
      onCustomize={() => {
        if (isCustomReport) {
          navigate(`/financial-suite/custom-reports/edit/${reportId}`);
        } else {
          // Navigate to custom builder with this template
          navigate(`/financial-suite/custom-reports/create?template=${reportId}`);
        }
      }}
    />
  );
}
