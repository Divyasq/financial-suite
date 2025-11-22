import React, { useEffect, useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { PerformanceDashboard } from '../components/ui/PerformanceDashboard';
import { MigrationStatusTracker } from '../components/reports/MigrationStatusTracker';
import { DeferredSalesHeader } from '../components/deferred-sales/DeferredSalesHeader';
import { DeferredSalesFilters } from '../components/deferred-sales/DeferredSalesFilters';
import { SalesSummaryTable } from '../components/deferred-sales/SalesSummaryTable';
import { DailySalesTable } from '../components/deferred-sales/DailySalesTable';
import { useDeferredSales } from '../context/DeferredSalesContext';
import { mockDashboardData } from '../data/mockDashboardData';
import { TrendingUp, BarChart3, FileText, Settings } from 'lucide-react';

export function DashboardPage() {
  const { state, setData } = useDashboard();
  const { selectedScenario, dateRange, getScenarioDataForDate } = useDeferredSales();
  const [activeTab, setActiveTab] = useState('overview');
  const [reportType, setReportType] = useState('Summary');

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
            <PerformanceDashboard data={state.data} />
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
