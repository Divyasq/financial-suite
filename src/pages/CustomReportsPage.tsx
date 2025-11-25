import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Copy, 
  Trash2, 
  Calendar,
  User,
  BarChart3,
  Eye,
  Share2
} from 'lucide-react';
// Removed problematic UI component imports

interface CustomReport {
  id: string;
  name: string;
  description: string;
  type: 'dashboard' | 'table' | 'chart';
  status: 'active' | 'draft' | 'archived';
  createdBy: string;
  createdAt: string;
  lastModified: string;
  lastRun?: string;
  metrics: string[];
  filters: number;
  isShared: boolean;
}

const mockCustomReports: CustomReport[] = [
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

export function CustomReportsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedReportForSharing, setSelectedReportForSharing] = useState<CustomReport | null>(null);
  const [templateData, setTemplateData] = useState({
    title: '',
    description: '',
    category: 'sales',
    tags: '',
    isPublic: true
  });

  // Load reports from localStorage (in real app, this would be from API)
  const [customReports, setCustomReports] = useState<CustomReport[]>(() => {
    const savedReports = localStorage.getItem('customSavedReports');
    const autoGeneratedReports = savedReports ? JSON.parse(savedReports) : [];
    // Convert saved reports to match CustomReport interface
    const convertedReports = autoGeneratedReports.map((report: any) => ({
      id: report.id,
      name: report.name,
      description: report.description,
      type: 'dashboard' as const, // Default type for custom reports
      status: 'active' as const,
      createdBy: 'You',
      createdAt: new Date(report.createdAt).toLocaleDateString(),
      lastModified: new Date(report.updatedAt).toLocaleDateString(),
      lastRun: undefined,
      metrics: report.metrics || [],
      filters: report.filters?.length || 0,
      isShared: false
    }));
    return [...mockCustomReports, ...convertedReports];
  });

  // Refresh reports when component mounts or when navigating back
  React.useEffect(() => {
    const savedReports = localStorage.getItem('customSavedReports');
    const autoGeneratedReports = savedReports ? JSON.parse(savedReports) : [];
    // Convert saved reports to match CustomReport interface
    const convertedReports = autoGeneratedReports.map((report: any) => ({
      id: report.id,
      name: report.name,
      description: report.description,
      type: 'dashboard' as const, // Default type for custom reports
      status: 'active' as const,
      createdBy: 'You',
      createdAt: new Date(report.createdAt).toLocaleDateString(),
      lastModified: new Date(report.updatedAt).toLocaleDateString(),
      lastRun: undefined,
      metrics: report.metrics || [],
      filters: report.filters?.length || 0,
      isShared: false
    }));
    setCustomReports([...mockCustomReports, ...convertedReports]);
  }, []);

  const handleCreateReport = () => {
    navigate('/financial-suite/custom-reports/create');
  };

  const handleEditReport = (reportId: string) => {
    navigate(`/financial-suite/custom-reports/edit/${reportId}`);
  };

  const handleViewReport = (reportId: string) => {
    console.log('handleViewReport called with:', reportId);
    const targetUrl = `/financial-suite/custom-reports/view/${reportId}`;
    console.log('Navigating to:', targetUrl);
    
    // Try using window.location as a fallback
    window.location.href = targetUrl;
  };

  const handleDuplicateReport = (reportId: string) => {
    console.log('Duplicating report:', reportId);
  };

  const handleDeleteReport = (reportId: string) => {
    // Remove from both mock data and localStorage
    const updatedReports = customReports.filter(report => report.id !== reportId);
    setCustomReports(updatedReports);
    
    // Update localStorage (only remove custom saved reports, not mock ones)
    const savedReports = JSON.parse(localStorage.getItem('customSavedReports') || '[]');
    const updatedSavedReports = savedReports.filter((report: any) => report.id !== reportId);
    localStorage.setItem('customSavedReports', JSON.stringify(updatedSavedReports));
  };

  const handleShareAsTemplate = (report: CustomReport) => {
    setSelectedReportForSharing(report);
    setTemplateData({
      title: report.name,
      description: report.description,
      category: 'sales',
      tags: report.metrics.join(', '),
      isPublic: true
    });
    setShowShareModal(true);
  };

  const handlePublishTemplate = () => {
    if (!selectedReportForSharing) return;

    // Create template object
    const template = {
      id: `template_${Date.now()}`,
      reportId: selectedReportForSharing.id,
      title: templateData.title,
      description: templateData.description,
      category: templateData.category,
      tags: templateData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      isPublic: templateData.isPublic,
      author: selectedReportForSharing.createdBy,
      createdAt: new Date().toISOString(),
      usageCount: 0,
      rating: 0,
      reportConfig: selectedReportForSharing, // In real app, this would be the full report configuration
      preview: {
        metrics: selectedReportForSharing.metrics,
        type: selectedReportForSharing.type,
        filters: selectedReportForSharing.filters
      }
    };

    // Save to localStorage (in real app, this would be API call)
    const existingTemplates = JSON.parse(localStorage.getItem('reportTemplates') || '[]');
    const updatedTemplates = [...existingTemplates, template];
    localStorage.setItem('reportTemplates', JSON.stringify(updatedTemplates));

    // Update the report to show it's shared
    const updatedReports = customReports.map(report => 
      report.id === selectedReportForSharing.id 
        ? { ...report, isShared: true }
        : report
    );
    setCustomReports(updatedReports);

    // Close modal and reset
    setShowShareModal(false);
    setSelectedReportForSharing(null);
    setTemplateData({
      title: '',
      description: '',
      category: 'sales',
      tags: '',
      isPublic: true
    });

    // Show success message (in real app, you'd use a toast notification)
    alert('Template published successfully! Other users can now discover and use your report template.');
  };

  const filteredReports = customReports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'dashboard': return BarChart3;
      case 'table': return Filter;
      case 'chart': return BarChart3;
      default: return BarChart3;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Custom Reports</h1>
              <p className="text-sm text-gray-600 mt-1">
                Create and manage your custom analytics reports
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/financial-suite/templates')}
                className="inline-flex items-center justify-center px-4 py-2 text-sm border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 rounded-md font-medium transition-colors"
              >
                🎨 Browse Templates
              </button>
              <button
                onClick={handleCreateReport}
                className="inline-flex items-center justify-center px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md font-medium transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Report
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
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div className="text-sm text-gray-600">
              {filteredReports.length} of {customReports.length} reports
            </div>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="p-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Modified
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Run
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReports.map((report) => {
                  const TypeIcon = getTypeIcon(report.type);
                  return (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <TypeIcon className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleViewReport(report.id)}
                                className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors text-left"
                              >
                                {report.name}
                              </button>
                              {report.isShared && (
                                <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 border border-gray-300 rounded-full">
                                  Shared
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {report.description}
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-xs text-gray-500">
                                {report.metrics.length} metrics
                              </span>
                              <span className="text-xs text-gray-500">
                                {report.filters} filters
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 border border-gray-300 rounded-full capitalize">
                          {report.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{report.createdBy}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{report.lastModified}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">
                          {report.lastRun || 'Never'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleViewReport(report.id)}
                            className="inline-flex items-center justify-center px-3 py-1 text-sm border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEditReport(report.id)}
                            className="inline-flex items-center justify-center px-3 py-1 text-sm border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleShareAsTemplate(report)}
                            className="inline-flex items-center justify-center px-3 py-1 text-sm border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                          >
                            <Share2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteReport(report.id)}
                            className="inline-flex items-center justify-center px-3 py-1 text-sm border border-gray-300 bg-white text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {filteredReports.length === 0 && (
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Get started by creating your first custom report'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <button
                  onClick={handleCreateReport}
                  className="inline-flex items-center justify-center px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md font-medium transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Report
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Share as Template Modal */}
      {showShareModal && selectedReportForSharing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">🚀 Share as Template</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Report Preview */}
              <div className="p-4 bg-gray-50 rounded-lg border">
                <h4 className="font-medium text-gray-900 mb-2">Report Preview</h4>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{selectedReportForSharing.name}</div>
                    <div className="text-sm text-gray-600">{selectedReportForSharing.description}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{selectedReportForSharing.metrics.length} metrics</span>
                  <span>{selectedReportForSharing.filters} filters</span>
                  <span className="capitalize">{selectedReportForSharing.type} type</span>
                </div>
              </div>

              {/* Template Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Template Title *
                  </label>
                  <input
                    type="text"
                    value={templateData.title}
                    onChange={(e) => setTemplateData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Weekly Sales Performance Dashboard"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={templateData.description}
                    onChange={(e) => setTemplateData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe what this template does and when to use it..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={templateData.category}
                      onChange={(e) => setTemplateData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="sales">Sales & Revenue</option>
                      <option value="operations">Operations</option>
                      <option value="labor">Labor & Staffing</option>
                      <option value="inventory">Inventory</option>
                      <option value="customer">Customer Analytics</option>
                      <option value="financial">Financial Analysis</option>
                      <option value="benchmarking">Benchmarking</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={templateData.tags}
                      onChange={(e) => setTemplateData(prev => ({ ...prev, tags: e.target.value }))}
                      placeholder="sales, weekly, performance"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={templateData.isPublic}
                    onChange={(e) => setTemplateData(prev => ({ ...prev, isPublic: e.target.checked }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isPublic" className="text-sm text-gray-700">
                    Make this template public (visible to all users)
                  </label>
                </div>
              </div>

              {/* Community Guidelines */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h5 className="font-medium text-blue-900 mb-2">📋 Community Guidelines</h5>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Provide clear, descriptive titles and descriptions</li>
                  <li>• Use relevant tags to help others discover your template</li>
                  <li>• Ensure your template works with common data scenarios</li>
                  <li>• Consider adding usage instructions in the description</li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm text-gray-600">
                  By sharing, you're contributing to the community! 🎉
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowShareModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePublishTemplate}
                    disabled={!templateData.title.trim() || !templateData.description.trim()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    🚀 Publish Template
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
