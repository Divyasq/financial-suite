import React, { useState } from 'react';
import { ChevronDown, ChevronRight, RotateCcw, Plus, X, Grid3X3, Target, GripVertical, Sparkles } from 'lucide-react';
import { CustomReportState, GrainOption, ReportBlock, WidgetBlockConfig, KPIBlockConfig } from '../../types/customBuilder';

interface BuilderPanelProps {
  reportState: CustomReportState;
  updateReportState: (updates: Partial<CustomReportState>) => void;
  selectedGrain: GrainOption | undefined;
  onGrainChange: (grainId: string) => void;
  onStartOver: () => void;
}

export function BuilderPanel({ 
  reportState, 
  updateReportState, 
  selectedGrain, 
  onGrainChange,
  onStartOver 
}: BuilderPanelProps) {
  const [expandedSections, setExpandedSections] = useState({
    grain: true,
    metrics: true,
    groupBy: true,
    filters: false,
    visualization: false,
    layout: false
  });

  const [draggedDimension, setDraggedDimension] = useState<string | null>(null);
  const [showMetricModal, setShowMetricModal] = useState(false);
  const [metricPrompt, setMetricPrompt] = useState('');

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleMetricToggle = (metricId: string) => {
    const isSelected = reportState.selectedMetrics.includes(metricId);
    const newMetrics = isSelected
      ? reportState.selectedMetrics.filter(id => id !== metricId)
      : [...reportState.selectedMetrics, metricId];
    
    updateReportState({ selectedMetrics: newMetrics });
  };

  const handleDimensionToggle = (dimensionId: string) => {
    const isSelected = reportState.selectedDimensions.includes(dimensionId);
    const newDimensions = isSelected
      ? reportState.selectedDimensions.filter(id => id !== dimensionId)
      : [...reportState.selectedDimensions, dimensionId];
    
    updateReportState({ selectedDimensions: newDimensions });
  };

  const addFilter = () => {
    const newFilter = {
      id: `filter_${Date.now()}`,
      dimension: '',
      operator: 'equals' as const,
      value: '',
      label: 'New Filter'
    };
    updateReportState({
      filters: [...reportState.filters, newFilter]
    });
  };

  const removeFilter = (filterId: string) => {
    updateReportState({
      filters: reportState.filters.filter(f => f.id !== filterId)
    });
  };

  const handleCreateMetricCard = () => {
    if (!metricPrompt.trim()) return;

    const blockId = `metric_card_${Date.now()}`;
    const order = (reportState.blocks?.length || 0) + 1;
    
    // Parse the prompt to generate metric cards
    const generatedCards = generateMetricCardsFromPrompt(metricPrompt);
    
    const newBlock: ReportBlock = {
      id: blockId,
      type: 'kpi',
      title: generatedCards.length > 1 ? 'Custom Metric Cards' : generatedCards[0]?.title || 'Metric Card',
      config: {
        prompt: metricPrompt,
        generatedKPIs: generatedCards,
        layout: 'horizontal',
        showTrends: true
      } as KPIBlockConfig,
      order
    };
    
    updateReportState({
      blocks: [...(reportState.blocks || []), newBlock]
    });
    
    // Close modal and reset
    setShowMetricModal(false);
    setMetricPrompt('');
  };

  const generateMetricCardsFromPrompt = (prompt: string) => {
    // Simple prompt parsing - in a real app, this would use AI
    const lowercasePrompt = prompt.toLowerCase();
    const cards = [];
    
    // Average Order Value
    if (lowercasePrompt.includes('average order value')) {
      cards.push({
        id: 'avg_order_value',
        title: 'Average Order Value',
        metric: 'gross_sales',
        description: 'Average value per order',
        format: 'currency' as const
      });
    }
    
    // Cover Count (simple)
    if (lowercasePrompt.includes('cover count') && !lowercasePrompt.includes('average')) {
      cards.push({
        id: 'cover_count',
        title: 'Cover Count',
        metric: 'transaction_count',
        description: 'Total number of covers served',
        format: 'number' as const
      });
    }
    
    // Average Cover Count
    if (lowercasePrompt.includes('average cover count')) {
      cards.push({
        id: 'avg_cover_count',
        title: 'Average Cover Count',
        metric: 'transaction_count',
        description: 'Average covers per transaction',
        format: 'number' as const
      });
    }
    
    // Total Sales Revenue
    if (lowercasePrompt.includes('total sales revenue') || (lowercasePrompt.includes('total') && lowercasePrompt.includes('sales'))) {
      cards.push({
        id: 'total_sales',
        title: 'Total Sales Revenue',
        metric: 'gross_sales',
        description: 'Total sales for the period',
        format: 'currency' as const
      });
    }
    
    // Customer Satisfaction Score
    if (lowercasePrompt.includes('customer satisfaction')) {
      cards.push({
        id: 'customer_satisfaction',
        title: 'Customer Satisfaction Score',
        metric: 'gross_sales',
        description: 'Average customer rating',
        format: 'number' as const
      });
    }
    
    // Peak Hour Performance
    if (lowercasePrompt.includes('peak hour')) {
      cards.push({
        id: 'peak_hour_performance',
        title: 'Peak Hour Performance',
        metric: 'gross_sales',
        description: 'Sales during peak hours',
        format: 'currency' as const
      });
    }
    
    // Table Turnover Rate
    if (lowercasePrompt.includes('table turnover') || lowercasePrompt.includes('turnover rate')) {
      cards.push({
        id: 'table_turnover',
        title: 'Table Turnover Rate',
        metric: 'transaction_count',
        description: 'Average table turns per hour',
        format: 'number' as const
      });
    }
    
    // Food Cost Percentage
    if (lowercasePrompt.includes('food cost')) {
      cards.push({
        id: 'food_cost_percentage',
        title: 'Food Cost Percentage',
        metric: 'gross_sales',
        description: 'Food cost as % of sales',
        format: 'percentage' as const
      });
    }
    
    // Labor Cost Ratio
    if (lowercasePrompt.includes('labor cost')) {
      cards.push({
        id: 'labor_cost_ratio',
        title: 'Labor Cost Ratio',
        metric: 'gross_sales',
        description: 'Labor cost as % of sales',
        format: 'percentage' as const
      });
    }
    
    // Daily Transaction Volume
    if (lowercasePrompt.includes('daily transaction') || lowercasePrompt.includes('transaction volume')) {
      cards.push({
        id: 'daily_transactions',
        title: 'Daily Transaction Volume',
        metric: 'transaction_count',
        description: 'Total transactions per day',
        format: 'number' as const
      });
    }
    
    // Growth Rate (fallback)
    if (lowercasePrompt.includes('growth') || lowercasePrompt.includes('increase')) {
      cards.push({
        id: 'growth_rate',
        title: 'Growth Rate',
        metric: reportState.selectedMetrics[0] || 'gross_sales',
        description: 'Period over period growth',
        format: 'percentage' as const
      });
    }
    
    // Default card if no matches
    if (cards.length === 0) {
      cards.push({
        id: 'custom_metric',
        title: 'Custom Metric',
        metric: reportState.selectedMetrics[0] || 'gross_sales',
        description: prompt,
        format: 'number' as const
      });
    }
    
    return cards;
  };

  const removeWidget = (blockId: string) => {
    updateReportState({
      blocks: (reportState.blocks || []).filter(b => b.id !== blockId)
    });
  };

  const reorderDimensions = (fromIndex: number, toIndex: number) => {
    const newDimensions = [...reportState.selectedDimensions];
    const [movedDimension] = newDimensions.splice(fromIndex, 1);
    newDimensions.splice(toIndex, 0, movedDimension);
    updateReportState({ selectedDimensions: newDimensions });
  };

  const removeDimension = (dimensionId: string) => {
    const newDimensions = reportState.selectedDimensions.filter(id => id !== dimensionId);
    updateReportState({ selectedDimensions: newDimensions });
  };

  // Get dimension details by ID
  const getDimensionDetails = (dimensionId: string) => {
    if (!selectedGrain) return null;
    for (const group of selectedGrain.dimensions) {
      const dimension = group.dimensions.find(d => d.id === dimensionId);
      if (dimension) return dimension;
    }
    return null;
  };



  const SectionHeader = ({ 
    title, 
    section, 
    count 
  }: { 
    title: string; 
    section: keyof typeof expandedSections; 
    count?: number;
  }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center gap-2">
        <span className="font-medium text-gray-900">{title}</span>
        {count !== undefined && (
          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
            {count} selected
          </span>
        )}
      </div>
      {expandedSections[section] ? (
        <ChevronDown className="h-4 w-4 text-gray-500" />
      ) : (
        <ChevronRight className="h-4 w-4 text-gray-500" />
      )}
    </button>
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 h-fit sticky top-6">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900">Build Your Report</h3>
          <button
            onClick={onStartOver}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            title="Start Over"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
        <p className="text-sm text-gray-600">Configure your report settings</p>
      </div>

      {/* Data Source Section */}
      <div className="border-b border-gray-200">
        <SectionHeader title="Data Source" section="grain" />
        {expandedSections.grain && (
          <div className="p-4 pt-0">
            {selectedGrain ? (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-xl">{selectedGrain.icon}</span>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{selectedGrain.name}</div>
                  <div className="text-sm text-gray-600">{selectedGrain.description}</div>
                </div>
                <button
                  onClick={onStartOver}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Change
                </button>
              </div>
            ) : (
              <div className="text-sm text-gray-500 text-center py-4">
                No data source selected
              </div>
            )}
          </div>
        )}
      </div>

      {/* Metrics Section */}
      {selectedGrain && (
        <div className="border-b border-gray-200">
          <SectionHeader title="Metrics" section="metrics" count={reportState.selectedMetrics.length} />
          {expandedSections.metrics && (
            <div className="p-4 pt-0">
              <div className="max-h-64 overflow-y-auto mb-4">
                {selectedGrain.metrics.map((group) => (
                  <div key={group.id} className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">{group.name}</h4>
                    <div className="space-y-2">
                      {group.metrics.map((metric) => (
                        <label
                          key={metric.id}
                          className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={reportState.selectedMetrics.includes(metric.id)}
                            onChange={() => handleMetricToggle(metric.id)}
                            className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900">{metric.name}</div>
                            <div className="text-xs text-gray-500">{metric.description}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              

            </div>
          )}
        </div>
      )}

      {/* Dimensions Section */}
      {selectedGrain && (
        <div className="border-b border-gray-200">
          <SectionHeader title="Dimensions" section="groupBy" count={reportState.selectedDimensions.length} />
          {expandedSections.groupBy && (
            <div className="p-4 pt-0 max-h-64 overflow-y-auto">
              {/* Selected Dimensions (in order) */}
              {reportState.selectedDimensions.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Dimensions (Drag to reorder)</h4>
                  <div className="space-y-1">
                    {reportState.selectedDimensions.map((dimensionId, index) => {
                      const dimension = getDimensionDetails(dimensionId);
                      if (!dimension) return null;
                      
                      return (
                        <div
                          key={dimensionId}
                          draggable
                          onDragStart={() => setDraggedDimension(dimensionId)}
                          onDragEnd={() => setDraggedDimension(null)}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault();
                            if (draggedDimension && draggedDimension !== dimensionId) {
                              const fromIndex = reportState.selectedDimensions.indexOf(draggedDimension);
                              const toIndex = reportState.selectedDimensions.indexOf(dimensionId);
                              reorderDimensions(fromIndex, toIndex);
                            }
                          }}
                          className={`flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded cursor-move transition-all ${
                            draggedDimension === dimensionId ? 'opacity-50 scale-95' : ''
                          }`}
                        >
                          <GripVertical className="h-4 w-4 text-gray-400" />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900">{dimension.name}</div>
                            <div className="text-xs text-gray-500">Order: {index + 1}</div>
                          </div>
                          <button
                            onClick={() => removeDimension(dimensionId)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Available Dimensions */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Available Dimensions</h4>
                {selectedGrain.dimensions.map((group) => (
                  <div key={group.id} className="mb-4">
                    <h5 className="text-xs font-medium text-gray-600 mb-1">{group.name}</h5>
                    <div className="space-y-1">
                      {group.dimensions
                        .filter(dimension => !reportState.selectedDimensions.includes(dimension.id))
                        .map((dimension) => (
                        <label
                          key={dimension.id}
                          className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={reportState.selectedDimensions.includes(dimension.id)}
                            onChange={() => handleDimensionToggle(dimension.id)}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900">{dimension.name}</div>
                            <div className="text-xs text-gray-500">{dimension.description}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Filters Section */}
      <div className="border-b border-gray-200">
        <SectionHeader title="Filters" section="filters" count={reportState.filters.length} />
        {expandedSections.filters && (
          <div className="p-4 pt-0">
            <div className="space-y-2 mb-3">
              {reportState.filters.map((filter) => (
                <div key={filter.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-700 flex-1">{filter.label}</span>
                  <button
                    onClick={() => removeFilter(filter.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={addFilter}
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Filter
            </button>
          </div>
        )}
      </div>

      {/* Widgets Section */}
      {selectedGrain && reportState.selectedMetrics.length > 0 && (
        <div>
          <div className="p-4 border-b border-gray-200">
            <h4 className="font-medium text-gray-900 mb-1">Add Widgets</h4>
            <p className="text-xs text-gray-500">Enhance your report with additional insights</p>
          </div>
          <div className="p-4 space-y-3">
            <button
              onClick={() => setShowMetricModal(true)}
              className="w-full flex items-center gap-3 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded group-hover:bg-blue-200 transition-colors">
                <Sparkles className="h-4 w-4 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900">Metric Cards</div>
                <div className="text-xs text-gray-500">Create custom metric cards with AI</div>
              </div>
            </button>

            {/* Show existing widgets */}
            {reportState.blocks.filter(b => ['widgets', 'kpi'].includes(b.type)).length > 0 && (
              <div className="border-t pt-3 mt-4">
                <h5 className="text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">Added Widgets</h5>
                <div className="space-y-2">
                  {reportState.blocks
                    .filter(b => ['widgets', 'kpi'].includes(b.type))
                    .map((block) => (
                    <div key={block.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        {block.type === 'widgets' ? (
                          <Grid3X3 className="h-4 w-4 text-green-500" />
                        ) : (
                          <Target className="h-4 w-4 text-orange-500" />
                        )}
                        <span className="text-sm text-gray-700">{block.title}</span>
                      </div>
                      <button
                        onClick={() => removeWidget(block.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Metric Card Modal */}
      {showMetricModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Create Metric Cards</h3>
              <button
                onClick={() => setShowMetricModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe the metrics you want to see
                </label>
                <textarea
                  value={metricPrompt}
                  onChange={(e) => setMetricPrompt(e.target.value)}
                  placeholder="e.g., average order value, total sales, cover count..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="border-t pt-4">
                <p className="text-sm font-medium text-gray-700 mb-3">Or choose from common metrics:</p>
                <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
                  {[
                    'Average Order Value',
                    'Cover Count',
                    'Average Cover Count',
                    'Total Sales Revenue',
                    'Customer Satisfaction Score',
                    'Peak Hour Performance',
                    'Table Turnover Rate',
                    'Food Cost Percentage',
                    'Labor Cost Ratio',
                    'Daily Transaction Volume'
                  ].map((example) => (
                    <button
                      key={example}
                      onClick={() => setMetricPrompt(example.toLowerCase())}
                      className="text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  onClick={() => setShowMetricModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateMetricCard}
                  disabled={!metricPrompt.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Create Cards
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
