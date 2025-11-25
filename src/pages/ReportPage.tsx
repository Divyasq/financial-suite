import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ReportCanvas } from '../components/reportBlocks/ReportCanvas';
import { REPORT_TEMPLATES } from '../data/reportTemplates';

// ReportPage - handles both standard and custom reports

// Mock custom reports data (same as in CustomReportsPage.tsx)
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
    metrics: ['Gross Sales', 'Net Sales', 'Transaction Count', 'Average Order Value'],
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
    metrics: ['Sales by Category', 'Units Sold', 'Profit Margin'],
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
    metrics: ['Customer Frequency', 'Repeat Purchase Rate', 'Customer Lifetime Value'],
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
    metrics: ['Monthly Revenue', 'YoY Growth', 'Revenue by Channel'],
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
    metrics: ['Labor Cost %', 'Hours Worked', 'Productivity Score', 'Overtime Hours'],
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
    metrics: ['Price Premium', 'Market Position', 'Competitor Gap', 'Revenue Impact'],
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
    metrics: ['Inventory Turnover', 'Waste %', 'Stock Levels', 'Reorder Alerts'],
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
    metrics: ['Hourly Sales', 'Customer Count', 'Wait Times', 'Staff Efficiency'],
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
    metrics: ['Delivery Time', 'Driver Rating', 'Order Accuracy', 'Customer Feedback'],
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
    metrics: ['Seasonal Sales', 'Item Popularity', 'Profit Margin', 'Customer Preference'],
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
    metrics: ['Payment Distribution', 'Processing Fees', 'Transaction Speed', 'Failed Payments'],
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
    metrics: ['Loyalty Enrollment', 'Reward Redemption', 'Repeat Visits', 'Program ROI'],
    filters: 4,
    isShared: false
  }
];

export function ReportPage() {
  const { reportId } = useParams<{ reportId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [template, setTemplate] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('=== ReportPage Debug ===');
    console.log('reportId:', JSON.stringify(reportId));
    console.log('reportId type:', typeof reportId);
    console.log('reportId length:', reportId?.length);
    console.log('pathname:', location.pathname);
    console.log('Available templates:', Object.keys(REPORT_TEMPLATES));
    console.log('Template exists for reportId:', !!REPORT_TEMPLATES[reportId || '']);
    
    if (!reportId) {
      console.log('ReportPage: No reportId provided');
      setLoading(false);
      return;
    }

    // Check if this is a custom report (from custom-reports path)
    const isCustomReport = location.pathname.includes('/custom-reports/view/');
    console.log('ReportPage: isCustomReport:', isCustomReport);
    
    if (isCustomReport) {
      // Load custom report from localStorage and mock data
      const savedReports = JSON.parse(localStorage.getItem('customSavedReports') || '[]');
      console.log('ReportPage: savedReports from localStorage:', savedReports);
      console.log('ReportPage: mockCustomReports available:', mockCustomReports.length, 'reports');
      console.log('ReportPage: looking for reportId:', reportId);
      
      // Check both saved reports and mock reports
      let customReport = savedReports.find((report: any) => report.id === reportId);
      console.log('ReportPage: found in savedReports:', customReport);
      
      if (!customReport) {
        customReport = mockCustomReports.find((report: any) => report.id === reportId);
        console.log('ReportPage: found in mockCustomReports:', customReport);
      }
      
      if (customReport) {
        console.log('ReportPage: Using custom report:', customReport);
        // Convert custom report to template format
        const customTemplate = {
          id: customReport.id,
          name: customReport.name,
          description: customReport.description,
          type: 'analysis' as const,
          grain: customReport.grains?.[0] || 'orders',
          defaultGroupBy: customReport.dimensions?.[0] || null,
          defaultMetrics: customReport.metrics || [],
          selectedMetrics: customReport.metrics || [],
          selectedDimensions: customReport.dimensions || [],
          category: 'custom',
          blocks: [
            // Convert blocks or create default ones
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
              order: 1
            },
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
              order: 2
            }
          ]
        };
        setTemplate(customTemplate);
      }
    } else {
      // Load standard report template
      console.log('ReportPage: Loading standard report template for:', reportId);
      console.log('ReportPage: Available templates:', Object.keys(REPORT_TEMPLATES));
      const standardTemplate = REPORT_TEMPLATES[reportId];
      console.log('ReportPage: Found template:', !!standardTemplate, standardTemplate?.name);
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
