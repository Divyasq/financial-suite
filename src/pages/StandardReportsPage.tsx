import React, { useState } from 'react';
import { Search, Settings, Star, Clock, Lightbulb, Filter } from 'lucide-react';
import { useStandardReports } from '../hooks/useStandardReports';
import { CategorySection } from '../components/standardReports/CategorySection';
import { CategoryCustomizationPanel } from '../components/standardReports/CategoryCustomizationPanel';
import { ReportCard } from '../components/standardReports/ReportCard';

export function StandardReportsPage() {
  const {
    reports,
    searchTerm,
    setSearchTerm,
    selectedBusinessType,
    businessTypePresets,
    preferences,
    toggleCategoryVisibility,
    reorderCategories,
    toggleReportPin,
    toggleReportVisibility,
    applyBusinessTypePreset,
    resetToDefaults,
    trackReportUsage,
    getReportsByCategory,
    getPinnedReports,
    getRecentReports,
    getVisibleCategories,
    getSuggestionsForBusinessType
  } = useStandardReports();

  const [showCustomization, setShowCustomization] = useState(false);
  const [activeView, setActiveView] = useState<'categories' | 'favorites' | 'recent'>('categories');

  const visibleCategories = getVisibleCategories();
  const pinnedReports = getPinnedReports();
  const recentReports = getRecentReports();
  const suggestions = getSuggestionsForBusinessType();

  const handleViewReport = (reportId: string) => {
    trackReportUsage(reportId);
    
    // Map report IDs to their actual report pages
    const reportRoutes: Record<string, string> = {
      'sales-summary': '/financial-suite/reports/sales-summary',
      'item-analysis': '/financial-suite/reports/item-analysis',
      'sales-trends': '/financial-suite/reports/sales-trends',
      'category-performance': '/financial-suite/reports/category-performance',
      'employee-performance': '/financial-suite/reports/employee-performance',
      'modifier-sales': '/financial-suite/reports/modifier-sales',
      'section-sales': '/financial-suite/reports/section-sales',
      'vendor-sales': '/financial-suite/reports/vendor-sales',
      'gift-cards': '/financial-suite/reports/gift-cards',
      'sales-taxes': '/financial-suite/reports/sales-taxes',
      'fees': '/financial-suite/reports/fees',
      'service-charges': '/financial-suite/reports/service-charges',
      'reconciliation': '/financial-suite/reports/reconciliation',
      'payment-methods': '/financial-suite/reports/payment-methods',
      'transaction-status': '/financial-suite/reports/transaction-status',
      'cash-reports': '/financial-suite/reports/cash-reports',
      'discounts': '/financial-suite/reports/discounts',
      'comps': '/financial-suite/reports/comps',
      'voids': '/financial-suite/reports/voids',
      'activity-log': '/financial-suite/reports/activity-log',
      'labor-vs-sales': '/financial-suite/reports/labor-vs-sales',
      'kitchen-performance': '/financial-suite/reports/kitchen-performance',
      'team-performance': '/financial-suite/reports/team-performance',
      'future-bookings': '/financial-suite/reports/future-bookings',
      'traffic-sources': '/financial-suite/reports/traffic-sources',
      'purchase-funnel': '/financial-suite/reports/purchase-funnel',
      'cost-of-goods-sold': '/financial-suite/reports/cost-of-goods-sold',
      'inventory-by-category': '/financial-suite/reports/inventory-by-category',
      'projected-profit': '/financial-suite/reports/projected-profit',
      'inventory-sell-through': '/financial-suite/reports/inventory-sell-through',
      'aging-inventory': '/financial-suite/reports/aging-inventory'
    };

    const route = reportRoutes[reportId];
    if (route) {
      // For now, we'll navigate to a generic report page with the report ID
      // In a real app, each report would have its own dedicated page
      window.open(`${route}?reportId=${reportId}`, '_blank');
    } else {
      // Fallback - open in new tab with report ID
      console.log('Opening report:', reportId);
      alert(`Opening ${reportId} report (placeholder - would navigate to actual report)`);
    }
  };

  const handleCustomizeReport = (reportId: string) => {
    // Navigate to report customization
    console.log('Customizing report:', reportId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Standard Reports</h1>
              <p className="text-gray-600 mt-1">
                Pre-built reports for your business insights
              </p>
            </div>
            <button
              onClick={() => setShowCustomization(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Settings className="h-4 w-4" />
              Customize Categories
            </button>
          </div>

          {/* Quick Actions Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveView('categories')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    activeView === 'categories'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Categories
                </button>
                <button
                  onClick={() => setActiveView('favorites')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    activeView === 'favorites'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Star className="h-4 w-4 inline mr-1" />
                  Favorites ({pinnedReports.length})
                </button>
                <button
                  onClick={() => setActiveView('recent')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    activeView === 'recent'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Clock className="h-4 w-4 inline mr-1" />
                  Recent
                </button>
              </div>
            </div>

            {/* Business Type Indicator */}
            {selectedBusinessType && (
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm">
                <span>
                  {businessTypePresets.find(p => p.id === selectedBusinessType)?.icon}
                </span>
                <span>
                  {businessTypePresets.find(p => p.id === selectedBusinessType)?.name} Setup
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Suggestions */}
        {(suggestions.hiddenCategories.length > 0 || suggestions.unpinnedRecommended.length > 0) && (
          <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-900 mb-2">Suggestions for your business</h3>
                {suggestions.hiddenCategories.length > 0 && (
                  <p className="text-sm text-blue-800 mb-2">
                    Consider showing: {suggestions.hiddenCategories.map(cat => cat.name).join(', ')}
                  </p>
                )}
                {suggestions.unpinnedRecommended.length > 0 && (
                  <p className="text-sm text-blue-800">
                    Popular reports for {businessTypePresets.find(p => p.id === selectedBusinessType)?.name.toLowerCase()}: {suggestions.unpinnedRecommended.map(r => r.name).join(', ')}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Content Views */}
        {activeView === 'categories' && (
          <div>
            {visibleCategories.length > 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Report
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Usage
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {visibleCategories.map((category) => {
                      const categoryReports = getReportsByCategory(category.id);
                      return categoryReports.map((report, index) => (
                        <tr 
                          key={report.id} 
                          className="hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => handleViewReport(report.id)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="text-2xl mr-3">{report.icon}</span>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{report.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-600 max-w-md">{report.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {category.name}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {report.usageCount || 0} uses
                          </td>
                        </tr>
                      ));
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No categories visible</h3>
                <p className="text-gray-600 mb-6">
                  All report categories are currently hidden. Show some categories to see your reports.
                </p>
                <button
                  onClick={() => setShowCustomization(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Show Categories
                </button>
              </div>
            )}
          </div>
        )}

        {activeView === 'favorites' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Favorite Reports</h2>
              <p className="text-gray-600">Your pinned and most-used reports</p>
            </div>
            
            {pinnedReports.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pinnedReports.map((report) => (
                  <ReportCard
                    key={report.id}
                    report={report}
                    isPinned={true}
                    onTogglePin={toggleReportPin}
                    onViewReport={handleViewReport}
                    onCustomizeReport={handleCustomizeReport}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No favorite reports yet</h3>
                <p className="text-gray-600">
                  Click the star icon on any report to add it to your favorites
                </p>
              </div>
            )}
          </div>
        )}

        {activeView === 'recent' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Recent Reports</h2>
              <p className="text-gray-600">Reports you've used recently</p>
            </div>
            
            {recentReports.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentReports.map((report) => (
                  <ReportCard
                    key={report.id}
                    report={report}
                    isPinned={pinnedReports.some(p => p.id === report.id)}
                    onTogglePin={toggleReportPin}
                    onViewReport={handleViewReport}
                    onCustomizeReport={handleCustomizeReport}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No recent reports</h3>
                <p className="text-gray-600">
                  Reports you view will appear here for quick access
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Customization Panel */}
      {showCustomization && (
        <CategoryCustomizationPanel
          categories={visibleCategories}
          reports={reports}
          preferences={preferences}
          businessTypePresets={businessTypePresets}
          selectedBusinessType={selectedBusinessType}
          onToggleVisibility={toggleCategoryVisibility}
          onToggleReportVisibility={toggleReportVisibility}
          onReorderCategories={reorderCategories}
          onApplyPreset={applyBusinessTypePreset}
          onReset={resetToDefaults}
          onClose={() => setShowCustomization(false)}
        />
      )}
    </div>
  );
}
