import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DollarSign, 
  TrendingUp, 
  RefreshCw, 
  ShoppingCart,
  Plus,
  BarChart3,
  Calendar,
  Filter,
  Download,
  FileText
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useDashboard } from '../context/DashboardContext';
import { PerformanceDashboard } from '../components/ui/PerformanceDashboard';
import { MigrationStatusTracker } from '../components/reports/MigrationStatusTracker';
import { DeferredSalesHeader } from '../components/deferred-sales/DeferredSalesHeader';
import { DeferredSalesFilters } from '../components/deferred-sales/DeferredSalesFilters';
import { SalesSummaryTable } from '../components/deferred-sales/SalesSummaryTable';
import { DailySalesTable } from '../components/deferred-sales/DailySalesTable';
import { useDeferredSales } from '../context/DeferredSalesContext';
import { mockDashboardData } from '../data/mockDashboardData';

interface MetricWidget {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<any>;
  route: string;
}

const metricWidgets: MetricWidget[] = [
  {
    id: 'gross-sales',
    title: 'Gross Sales',
    value: '$12,234.56',
    change: '+12.5%',
    changeType: 'positive',
    icon: DollarSign,
    route: '/financial-suite/reports/sales-summary'
  },
  {
    id: 'net-sales',
    title: 'Net Sales',
    value: '$11,456.78',
    change: '+8.3%',
    changeType: 'positive',
    icon: TrendingUp,
    route: '/financial-suite/reports/sales-summary'
  },
  {
    id: 'returns',
    title: 'Returns',
    value: '$777.78',
    change: '-2.1%',
    changeType: 'negative',
    icon: RefreshCw,
    route: '/financial-suite/reports/sales-summary'
  },
  {
    id: 'transaction-count',
    title: 'Transaction Count',
    value: '1,234',
    change: '+15.7%',
    changeType: 'positive',
    icon: ShoppingCart,
    route: '/financial-suite/reports/sales-summary'
  }
];

export function FinancialSuitePage() {
  const { state, setData } = useDashboard();
  const { selectedScenario, dateRange, getScenarioDataForDate } = useDeferredSales();
  const [activeTab, setActiveTab] = useState('overview');
  const [reportType, setReportType] = useState('Summary');
  const navigate = useNavigate();

  useEffect(() => {
    // Load mock dashboard data
    setData(mockDashboardData);
  }, [setData]);

  // Get the scenario data adjusted for the selected date range
  const displayScenario = selectedScenario 
    ? getScenarioDataForDate(selectedScenario, dateRange)
    : null;

  const handleReportTypeChange = (newReportType: string) => {
    setReportType(newReportType);
  };

  const handleCreateCustomReport = () => {
    navigate('/financial-suite/custom-reports/create');
  };

  const handleViewReports = () => {
    navigate('/financial-suite/reports');
  };

  const handleWidgetClick = (widget: MetricWidget) => {
    navigate(widget.route);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'deferred-sales', label: 'Deferred Sales', icon: BarChart3 },
    { id: 'migration-status', label: 'Migration Status', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Financial Suite Dashboard
          </h1>
          <p className="text-gray-600">
            Comprehensive overview of your business performance, deferred sales, and system migration progress
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {activeTab === 'overview' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Business Performance Overview
              </h2>
              <p className="text-gray-600">
                Key metrics and insights for your Square business
              </p>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              </div>
              <div className="flex space-x-4">
                <Button onClick={handleCreateCustomReport} className="flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Custom Report
                </Button>
                <Button variant="outline" onClick={handleViewReports}>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View All Reports
                </Button>
              </div>
            </div>

            {/* Key Metrics Dashboard */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Key Metrics</h3>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Widget
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metricWidgets.map((widget) => {
                  const Icon = widget.icon;
                  return (
                    <Card 
                      key={widget.id}
                      className="p-6 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleWidgetClick(widget)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Icon className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className={`text-sm font-medium ${
                          widget.changeType === 'positive' 
                            ? 'text-green-600' 
                            : widget.changeType === 'negative'
                            ? 'text-red-600'
                            : 'text-gray-600'
                        }`}>
                          {widget.change}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-600 mb-1">
                          {widget.title}
                        </h4>
                        <p className="text-2xl font-bold text-gray-900">
                          {widget.value}
                        </p>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Reports */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">Recent Reports</h4>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div>
                      <p className="font-medium text-gray-900">Sales Summary</p>
                      <p className="text-sm text-gray-600">Last run: 2 hours ago</p>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div>
                      <p className="font-medium text-gray-900">Items Performance</p>
                      <p className="text-sm text-gray-600">Last run: 1 day ago</p>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium text-gray-900">Customer Analysis</p>
                      <p className="text-sm text-gray-600">Last run: 3 days ago</p>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </div>
              </Card>

              {/* Custom Reports */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">Custom Reports</h4>
                  <Button variant="outline" size="sm" onClick={handleCreateCustomReport}>
                    Create New
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div>
                      <p className="font-medium text-gray-900">Weekly Performance Dashboard</p>
                      <p className="text-sm text-gray-600">Created: 1 week ago</p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div>
                      <p className="font-medium text-gray-900">Product Category Analysis</p>
                      <p className="text-sm text-gray-600">Created: 2 weeks ago</p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">Start building custom reports tailored to your business needs</p>
                    <Button onClick={handleCreateCustomReport}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Custom Report
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'deferred-sales' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Deferred Sales Management
              </h2>
              <p className="text-gray-600">
                Track and manage deferred sales scenarios and revenue recognition
              </p>
            </div>

            {/* Deferred Sales Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <DeferredSalesFilters onReportTypeChange={handleReportTypeChange} />
            </div>

            {/* Deferred Sales Content */}
            {displayScenario ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {reportType === 'Daily' ? (
                  <DailySalesTable 
                    scenario={displayScenario} 
                    dateRange={dateRange} 
                  />
                ) : (
                  <SalesSummaryTable
                    salesSections={displayScenario.salesSections}
                    paymentSections={displayScenario.paymentSections}
                  />
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
                <div className="text-center">
                  <div className="p-4 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Deferred Sales Scenario</h3>
                  <p className="text-gray-600 mb-6">Choose a scenario from the filters above to view detailed sales data and analytics.</p>
                  <div className="bg-gray-50 rounded-lg p-4 text-left max-w-md mx-auto">
                    <h4 className="font-medium text-gray-900 mb-2">Available Scenarios:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Gift Card Sales Tracking</li>
                      <li>• Partial Payment Processing</li>
                      <li>• Catering Revenue Recognition</li>
                      <li>• Payment Method Analysis</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'migration-status' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                SDP Migration Status
              </h2>
              <p className="text-gray-600">
                Track the progress of report migrations to the new SDP platform
              </p>
            </div>
            <MigrationStatusTracker />
          </div>
        )}
      </div>
    </div>
  );
}
