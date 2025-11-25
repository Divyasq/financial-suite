import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Star, 
  Download, 
  Eye, 
  User, 
  Calendar,
  BarChart3,
  TrendingUp,
  Award,
  Heart
} from 'lucide-react';

interface ReportTemplate {
  id: string;
  reportId: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  isPublic: boolean;
  author: string;
  createdAt: string;
  usageCount: number;
  rating: number;
  reportConfig: any;
  preview: {
    metrics: string[];
    type: string;
    filters: number;
  };
}

const mockTemplates: ReportTemplate[] = [
  {
    id: 'template_1',
    reportId: '1',
    title: 'Weekly Sales Performance Dashboard',
    description: 'Comprehensive weekly sales analysis with key performance indicators, trends, and comparisons. Perfect for weekly business reviews.',
    category: 'sales',
    tags: ['sales', 'weekly', 'performance', 'kpi'],
    isPublic: true,
    author: 'Sarah Wilson',
    createdAt: '2025-01-20T10:00:00Z',
    usageCount: 127,
    rating: 4.8,
    reportConfig: {},
    preview: {
      metrics: ['Gross Sales', 'Net Sales', 'Transaction Count', 'Average Order Value'],
      type: 'dashboard',
      filters: 3
    }
  },
  {
    id: 'template_2',
    reportId: '2',
    title: 'Product Category Deep Dive',
    description: 'Analyze product category performance with detailed breakdowns, profit margins, and inventory insights.',
    category: 'inventory',
    tags: ['inventory', 'categories', 'profit', 'analysis'],
    isPublic: true,
    author: 'Mike Chen',
    createdAt: '2025-01-18T14:30:00Z',
    usageCount: 89,
    rating: 4.6,
    reportConfig: {},
    preview: {
      metrics: ['Sales by Category', 'Units Sold', 'Profit Margin', 'Inventory Turnover'],
      type: 'table',
      filters: 5
    }
  },
  {
    id: 'template_3',
    reportId: '3',
    title: 'Customer Behavior Analytics',
    description: 'Understand customer purchasing patterns, frequency, and lifetime value. Great for marketing and retention strategies.',
    category: 'customer',
    tags: ['customer', 'behavior', 'retention', 'marketing'],
    isPublic: true,
    author: 'Emma Rodriguez',
    createdAt: '2025-01-15T09:15:00Z',
    usageCount: 156,
    rating: 4.9,
    reportConfig: {},
    preview: {
      metrics: ['Customer Frequency', 'Repeat Rate', 'Lifetime Value', 'Acquisition Cost'],
      type: 'chart',
      filters: 4
    }
  },
  {
    id: 'template_4',
    reportId: '4',
    title: 'Labor Cost Optimization',
    description: 'Track labor costs, productivity metrics, and scheduling efficiency. Essential for managing labor expenses.',
    category: 'labor',
    tags: ['labor', 'costs', 'productivity', 'scheduling'],
    isPublic: true,
    author: 'David Park',
    createdAt: '2025-01-12T16:45:00Z',
    usageCount: 73,
    rating: 4.4,
    reportConfig: {},
    preview: {
      metrics: ['Labor Cost %', 'Hours Worked', 'Productivity Score', 'Overtime Hours'],
      type: 'dashboard',
      filters: 6
    }
  },
  {
    id: 'template_5',
    reportId: '5',
    title: 'Competitive Benchmarking Suite',
    description: 'Compare your performance against competitors with market positioning, pricing analysis, and opportunity identification.',
    category: 'benchmarking',
    tags: ['benchmarking', 'competitive', 'market', 'pricing'],
    isPublic: true,
    author: 'Alex Thompson',
    createdAt: '2025-01-10T11:20:00Z',
    usageCount: 94,
    rating: 4.7,
    reportConfig: {},
    preview: {
      metrics: ['Market Position', 'Price Premium', 'Performance Score', 'Opportunity Value'],
      type: 'dashboard',
      filters: 8
    }
  },
  {
    id: 'template_6',
    reportId: '6',
    title: 'Financial Health Scorecard',
    description: 'Monitor key financial metrics including cash flow, profitability, and cost ratios. Perfect for monthly financial reviews.',
    category: 'financial',
    tags: ['financial', 'profitability', 'cash-flow', 'ratios'],
    isPublic: true,
    author: 'Lisa Chang',
    createdAt: '2025-01-08T13:10:00Z',
    usageCount: 112,
    rating: 4.5,
    reportConfig: {},
    preview: {
      metrics: ['Gross Margin', 'Cash Flow', 'Cost Ratios', 'ROI'],
      type: 'dashboard',
      filters: 4
    }
  }
];

export function TemplateGalleryPage() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<ReportTemplate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popular');

  useEffect(() => {
    // Load templates from localStorage and combine with mock data
    const savedTemplates = JSON.parse(localStorage.getItem('reportTemplates') || '[]');
    const allTemplates = [...mockTemplates, ...savedTemplates];
    setTemplates(allTemplates);
  }, []);

  const handleUseTemplate = (template: ReportTemplate) => {
    console.log('handleUseTemplate called with:', template);
    
    try {
      // Create a comprehensive template configuration based on the template
      const templateConfig = createTemplateConfig(template);
      console.log('Generated template config:', templateConfig);
      
      // Store the template data for use in the custom builder
      localStorage.setItem('selectedTemplate', JSON.stringify(templateConfig));
      console.log('Stored template in localStorage');
      
      // Navigate to custom builder with template data
      const targetUrl = '/financial-suite/custom-reports/builder?template=' + template.id;
      console.log('Navigating to:', targetUrl);
      
      // Try using window.location as a fallback
      window.location.href = targetUrl;
    } catch (error) {
      console.error('Error in handleUseTemplate:', error);
    }
  };

  const createTemplateConfig = (template: ReportTemplate) => {
    const baseConfig = {
      id: `template_${template.id}_${Date.now()}`,
      name: `${template.title} (Copy)`,
      description: template.description,
      templateId: template.id,
    };

    // Configure based on template category and specific template
    switch (template.id) {
      case 'template_1': // Weekly Sales Performance Dashboard
        return {
          ...baseConfig,
          grain: 'orders',
          selectedMetrics: ['total_sales', 'net_sales', 'order_count', 'average_order_value'],
          selectedDimensions: ['time_period', 'location', 'service_mode'],
          blocks: [
            {
              id: 'kpi-1',
              type: 'kpi',
              config: {
                title: 'Weekly Performance KPIs',
                metrics: ['total_sales', 'order_count', 'average_order_value']
              }
            },
            {
              id: 'chart-1',
              type: 'chart',
              config: {
                chartType: 'line',
                primaryMetric: 'total_sales',
                groupBy: 'time_period'
              }
            },
            {
              id: 'table-1',
              type: 'table',
              config: {
                showPagination: true,
                sortable: true
              }
            }
          ]
        };

      case 'template_2': // Product Category Deep Dive
        return {
          ...baseConfig,
          grain: 'items',
          selectedMetrics: ['quantity_sold', 'revenue_per_item', 'profit_margin', 'inventory_turnover'],
          selectedDimensions: ['item_category', 'item_type', 'location'],
          blocks: [
            {
              id: 'chart-1',
              type: 'chart',
              config: {
                chartType: 'bar',
                primaryMetric: 'quantity_sold',
                groupBy: 'item_category'
              }
            },
            {
              id: 'chart-2',
              type: 'chart',
              config: {
                chartType: 'line',
                primaryMetric: 'profit_margin',
                groupBy: 'item_category'
              }
            },
            {
              id: 'table-1',
              type: 'table',
              config: {
                showPagination: true,
                sortable: true
              }
            }
          ]
        };

      case 'template_3': // Customer Behavior Analytics
        return {
          ...baseConfig,
          grain: 'customers',
          selectedMetrics: ['total_sales', 'visit_frequency', 'average_order_value', 'lifetime_value'],
          selectedDimensions: ['customer_segment', 'acquisition_channel', 'loyalty_tier'],
          blocks: [
            {
              id: 'kpi-1',
              type: 'kpi',
              config: {
                title: 'Customer Insights',
                metrics: ['visit_frequency', 'average_order_value', 'lifetime_value']
              }
            },
            {
              id: 'chart-1',
              type: 'chart',
              config: {
                chartType: 'bar',
                primaryMetric: 'total_sales',
                groupBy: 'customer_segment'
              }
            },
            {
              id: 'table-1',
              type: 'table',
              config: {
                showPagination: true,
                sortable: true
              }
            }
          ]
        };

      case 'template_4': // Labor Cost Optimization
        return {
          ...baseConfig,
          grain: 'orders',
          selectedMetrics: ['labor_cost', 'labor_hours', 'productivity_score', 'labor_percentage'],
          selectedDimensions: ['time_period', 'location', 'shift_type'],
          blocks: [
            {
              id: 'kpi-1',
              type: 'kpi',
              config: {
                title: 'Labor Efficiency Metrics',
                metrics: ['labor_cost', 'productivity_score', 'labor_percentage']
              }
            },
            {
              id: 'chart-1',
              type: 'chart',
              config: {
                chartType: 'line',
                primaryMetric: 'labor_cost',
                groupBy: 'time_period'
              }
            },
            {
              id: 'chart-2',
              type: 'chart',
              config: {
                chartType: 'bar',
                primaryMetric: 'productivity_score',
                groupBy: 'location'
              }
            },
            {
              id: 'table-1',
              type: 'table',
              config: {
                showPagination: true,
                sortable: true
              }
            }
          ]
        };

      case 'template_5': // Competitive Benchmarking Suite
        return {
          ...baseConfig,
          grain: 'orders',
          selectedMetrics: ['market_share', 'price_comparison', 'performance_score', 'competitive_index'],
          selectedDimensions: ['competitor', 'market_segment', 'time_period'],
          blocks: [
            {
              id: 'kpi-1',
              type: 'kpi',
              config: {
                title: 'Market Position',
                metrics: ['market_share', 'performance_score', 'competitive_index']
              }
            },
            {
              id: 'chart-1',
              type: 'chart',
              config: {
                chartType: 'bar',
                primaryMetric: 'price_comparison',
                groupBy: 'competitor'
              }
            },
            {
              id: 'chart-2',
              type: 'chart',
              config: {
                chartType: 'line',
                primaryMetric: 'market_share',
                groupBy: 'time_period'
              }
            },
            {
              id: 'table-1',
              type: 'table',
              config: {
                showPagination: true,
                sortable: true
              }
            }
          ]
        };

      case 'template_6': // Financial Health Scorecard
        return {
          ...baseConfig,
          grain: 'orders',
          selectedMetrics: ['revenue', 'costs', 'profit_margin', 'cash_flow'],
          selectedDimensions: ['time_period', 'cost_center', 'location'],
          blocks: [
            {
              id: 'kpi-1',
              type: 'kpi',
              config: {
                title: 'Financial Health Overview',
                metrics: ['revenue', 'profit_margin', 'cash_flow']
              }
            },
            {
              id: 'chart-1',
              type: 'chart',
              config: {
                chartType: 'line',
                primaryMetric: 'profit_margin',
                groupBy: 'time_period'
              }
            },
            {
              id: 'chart-2',
              type: 'chart',
              config: {
                chartType: 'bar',
                primaryMetric: 'costs',
                groupBy: 'cost_center'
              }
            },
            {
              id: 'table-1',
              type: 'table',
              config: {
                showPagination: true,
                sortable: true
              }
            }
          ]
        };

      default:
        // Default configuration for user-created templates
        return {
          ...baseConfig,
          grain: 'orders',
          selectedMetrics: ['total_sales', 'order_count', 'average_order_value'],
          selectedDimensions: ['time_period', 'location'],
          blocks: [
            {
              id: 'chart-1',
              type: 'chart',
              config: {
                chartType: 'bar',
                primaryMetric: 'total_sales',
                groupBy: 'time_period'
              }
            },
            {
              id: 'table-1',
              type: 'table',
              config: {
                showPagination: true,
                sortable: true
              }
            }
          ]
        };
    }
  };

  const handlePreviewTemplate = (template: ReportTemplate) => {
    // Show template preview modal or navigate to preview page
    console.log('Previewing template:', template);
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.usageCount - a.usageCount;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'name':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'sales': return '💰';
      case 'operations': return '⚙️';
      case 'labor': return '👥';
      case 'inventory': return '📦';
      case 'customer': return '🎯';
      case 'financial': return '📊';
      case 'benchmarking': return '🏆';
      default: return '📈';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'sales': return 'Sales & Revenue';
      case 'operations': return 'Operations';
      case 'labor': return 'Labor & Staffing';
      case 'inventory': return 'Inventory';
      case 'customer': return 'Customer Analytics';
      case 'financial': return 'Financial Analysis';
      case 'benchmarking': return 'Benchmarking';
      default: return 'Other';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">🎨 Template Gallery</h1>
              <p className="text-sm text-gray-600 mt-1">
                Discover and use community-created report templates
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/financial-suite/custom-reports')}
                className="inline-flex items-center justify-center px-4 py-2 text-sm border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 rounded-md font-medium transition-colors"
              >
                📋 My Reports
              </button>
              <button
                onClick={() => navigate('/financial-suite/custom-reports/create')}
                className="inline-flex items-center justify-center px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md font-medium transition-colors"
              >
                ➕ Create New
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="sales">Sales & Revenue</option>
                <option value="operations">Operations</option>
                <option value="labor">Labor & Staffing</option>
                <option value="inventory">Inventory</option>
                <option value="customer">Customer Analytics</option>
                <option value="financial">Financial Analysis</option>
                <option value="benchmarking">Benchmarking</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
            
            <div className="text-sm text-gray-600">
              {sortedTemplates.length} templates found
            </div>
          </div>
        </div>
      </div>

      {/* Template Grid */}
      <div className="p-6">
        {sortedTemplates.length === 0 ? (
          <div className="text-center py-12">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || categoryFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Be the first to share a template with the community!'
              }
            </p>
            <button
              onClick={() => navigate('/financial-suite/custom-reports/create')}
              className="inline-flex items-center justify-center px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md font-medium transition-colors"
            >
              ➕ Create Template
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTemplates.map((template) => (
              <div key={template.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                {/* Template Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">
                      {getCategoryIcon(template.category)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                        {template.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {getCategoryName(template.category)}
                        </span>
                        {template.usageCount > 100 && (
                          <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Popular
                          </span>
                        )}
                        {template.rating >= 4.8 && (
                          <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full flex items-center">
                            <Award className="h-3 w-3 mr-1" />
                            Top Rated
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {template.description}
                </p>

                {/* Preview Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Metrics:</span>
                    <span className="font-medium text-gray-900">{template.preview.metrics.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Type:</span>
                    <span className="font-medium text-gray-900 capitalize">{template.preview.type}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Filters:</span>
                    <span className="font-medium text-gray-900">{template.preview.filters}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {template.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                  {template.tags.length > 3 && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      +{template.tags.length - 3} more
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{template.author}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Download className="h-4 w-4" />
                      <span>{template.usageCount}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {renderStars(template.rating)}
                      <span className="ml-1">{template.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePreviewTemplate(template)}
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 rounded-md font-medium transition-colors"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </button>
                  <button
                    onClick={() => handleUseTemplate(template)}
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md font-medium transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Use Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
