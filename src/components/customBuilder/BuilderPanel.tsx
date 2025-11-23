import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Settings, RotateCcw, Plus, X } from 'lucide-react';
import { CustomReportState, GrainOption } from '../../types/customBuilder';

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

  const handleGroupByChange = (dimensionId: string) => {
    updateReportState({ groupBy: dimensionId });
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
            <div className="p-4 pt-0 max-h-64 overflow-y-auto">
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
          )}
        </div>
      )}

      {/* Group By Section */}
      {selectedGrain && (
        <div className="border-b border-gray-200">
          <SectionHeader title="Group By" section="groupBy" />
          {expandedSections.groupBy && (
            <div className="p-4 pt-0 max-h-64 overflow-y-auto">
              {selectedGrain.dimensions.map((group) => (
                <div key={group.id} className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">{group.name}</h4>
                  <div className="space-y-1">
                    {group.dimensions.map((dimension) => (
                      <label
                        key={dimension.id}
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="groupBy"
                          checked={reportState.groupBy === dimension.id}
                          onChange={() => handleGroupByChange(dimension.id)}
                          className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
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

      {/* Visualization Section */}
      <div className="border-b border-gray-200">
        <SectionHeader title="Visualization" section="visualization" />
        {expandedSections.visualization && (
          <div className="p-4 pt-0">
            <div className="space-y-2">
              {[
                { id: 'bar', name: 'Bar Chart', icon: '📊' },
                { id: 'line', name: 'Line Chart', icon: '📈' },
                { id: 'pie', name: 'Pie Chart', icon: '🥧' },
                { id: 'area', name: 'Area Chart', icon: '📉' }
              ].map((chart) => (
                <label
                  key={chart.id}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                >
                  <input
                    type="radio"
                    name="chartType"
                    checked={reportState.chartType === chart.id}
                    onChange={() => updateReportState({ chartType: chart.id as any })}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-lg">{chart.icon}</span>
                  <span className="text-sm font-medium text-gray-900">{chart.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Layout Section */}
      <div>
        <SectionHeader title="Layout Options" section="layout" />
        {expandedSections.layout && (
          <div className="p-4 pt-0">
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={reportState.showTable}
                  onChange={(e) => updateReportState({ showTable: e.target.checked })}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-900">Show Data Table</span>
              </label>
              
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={reportState.showMetricCards}
                  onChange={(e) => updateReportState({ showMetricCards: e.target.checked })}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-900">Show Metric Cards</span>
              </label>
              
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={reportState.dashboardMode}
                  onChange={(e) => updateReportState({ dashboardMode: e.target.checked })}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-900">Dashboard Layout</span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
