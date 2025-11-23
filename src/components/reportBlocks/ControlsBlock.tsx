import React, { useState } from 'react';
import { Calendar, MapPin, Users, Filter, ChevronDown, BarChart3 } from 'lucide-react';
import { ControlsBlockConfig, ReportFilter } from '../../types/reportBlocks';

interface ControlsBlockProps {
  config: ControlsBlockConfig;
  filters: ReportFilter[];
  groupBy: string;
  selectedMetrics: string[];
  onFilterChange: (filterId: string, value: any) => void;
  onGroupByChange: (groupBy: string) => void;
  onMetricsChange: (metrics: string[]) => void;
}

export function ControlsBlock({
  config,
  filters,
  groupBy,
  selectedMetrics,
  onFilterChange,
  onGroupByChange,
  onMetricsChange
}: ControlsBlockProps) {
  const [showGroupByDropdown, setShowGroupByDropdown] = useState(false);
  const [showMetricsDropdown, setShowMetricsDropdown] = useState(false);

  const getControlIcon = (control: string) => {
    switch (control) {
      case 'time_period':
        return <Calendar className="h-4 w-4 text-gray-600" />;
      case 'location':
        return <MapPin className="h-4 w-4 text-gray-600" />;
      case 'employee':
        return <Users className="h-4 w-4 text-gray-600" />;
      case 'filters':
        return <Filter className="h-4 w-4 text-gray-600" />;
      case 'chart_type':
        return <BarChart3 className="h-4 w-4 text-gray-600" />;
      default:
        return null;
    }
  };

  const getControlLabel = (control: string, value?: string) => {
    switch (control) {
      case 'time_period':
        return value || 'This month';
      case 'location':
        return value || 'All locations';
      case 'employee':
        return value || 'All employees';
      case 'channel':
        return value || 'All channels';
      case 'group_by':
        return `Group by: ${value || 'None'}`;
      case 'metrics':
        return `Metrics: ${selectedMetrics.length} selected`;
      case 'filters':
        return 'Filter by';
      case 'chart_type':
        return value || 'Chart type';
      default:
        return control;
    }
  };

  const renderControl = (control: string, isPrimary: boolean = true) => {
    const filter = filters.find(f => f.id === control);
    const value = filter?.value;

    return (
      <button
        key={control}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
          isPrimary 
            ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            : 'border border-gray-300 hover:bg-gray-50 text-gray-600'
        }`}
        onClick={() => {
          // Handle control click - would open dropdown/modal
          console.log(`Opening ${control} selector`);
        }}
      >
        {getControlIcon(control)}
        <span className="text-sm">{getControlLabel(control, value)}</span>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>
    );
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Primary Controls */}
        <div className="flex items-center gap-4 mb-4">
          {config.primary.map(control => renderControl(control, true))}
        </div>

        {/* Secondary Controls */}
        {config.secondary.length > 0 && (
          <div className="flex items-center gap-4">
            {config.secondary.map(control => {
              // Handle special secondary controls
              if (control === 'group_by' && config.showGroupBy) {
                const groupByOption = config.availableGroupBy?.find(g => g.id === groupBy);
                return (
                  <div key={control} className="relative">
                    <button
                      className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"
                      onClick={() => {
                        setShowGroupByDropdown(!showGroupByDropdown);
                        setShowMetricsDropdown(false);
                      }}
                    >
                      <BarChart3 className="h-4 w-4" />
                      <span className="text-sm">Group by: {groupByOption?.name || 'Item Name'}</span>
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </button>

                    {/* Group By Dropdown */}
                    {showGroupByDropdown && config.availableGroupBy && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <div className="p-2">
                          {config.availableGroupBy.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => {
                                onGroupByChange(option.id);
                                setShowGroupByDropdown(false);
                              }}
                              className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 ${
                                groupBy === option.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                              }`}
                            >
                              {option.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              if (control === 'metrics' && config.showMetricSelector) {
                return (
                  <div key={control} className="relative">
                    <button
                      className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"
                      onClick={() => {
                        setShowMetricsDropdown(!showMetricsDropdown);
                        setShowGroupByDropdown(false);
                      }}
                    >
                      <BarChart3 className="h-4 w-4" />
                      <span className="text-sm">Metrics: {selectedMetrics.length} selected</span>
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </button>

                    {/* Metrics Dropdown */}
                    {showMetricsDropdown && config.availableMetrics && (
                      <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <div className="p-2">
                          <div className="text-xs font-medium text-gray-500 mb-2 px-3">Select Metrics</div>
                          {config.availableMetrics.map((metric) => (
                            <label
                              key={metric.id}
                              className="flex items-center px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={selectedMetrics.includes(metric.id)}
                                onChange={(e) => {
                                  const newMetrics = e.target.checked
                                    ? [...selectedMetrics, metric.id]
                                    : selectedMetrics.filter(m => m !== metric.id);
                                  onMetricsChange(newMetrics);
                                }}
                                className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              />
                              <span className="text-gray-700">{metric.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return renderControl(control, false);
            })}
          </div>
        )}
      </div>
    </div>
  );
}
