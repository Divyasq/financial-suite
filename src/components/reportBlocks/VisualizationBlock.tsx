import React from 'react';
import { VisualizationBlockConfig, ChartConfig } from '../../types/reportBlocks';

interface VisualizationBlockProps {
  config: VisualizationBlockConfig;
  data: any[];
  onChartTypeChange?: (chartId: string, type: string) => void;
}

// Mock chart component with actual visual representation
function MockChart({ config, data }: { config: ChartConfig; data: any[] }) {
  // Add safety checks for config properties
  if (!config) {
    return <div className="p-4 text-gray-500">Chart configuration missing</div>;
  }

  const getChartHeight = () => {
    switch (config.size) {
      case 'small': return 200;
      case 'medium': return 300;
      case 'large': return 400;
      case 'full': return 500;
      default: return 300;
    }
  };

  const getChartColor = (type: string) => {
    switch (type) {
      case 'line': return '#3B82F6';
      case 'bar': return '#10B981';
      case 'area': return '#8B5CF6';
      case 'pie': return '#F59E0B';
      case 'donut': return '#EF4444';
      default: return '#6B7280';
    }
  };

  // Get the primary metric for chart display with safety checks
  const primaryMetric = config.metrics && config.metrics.length > 0 ? config.metrics[0] : 'total_sales';
  const chartData = Array.isArray(data) ? data.slice(0, 8) : []; // Show top 8 items
  
  // Find max value for scaling with safety check
  const maxValue = chartData.length > 0 ? Math.max(...chartData.map(item => Number(item[primaryMetric]) || 0)) : 100;
  
  const formatValue = (value: number) => {
    if (primaryMetric.includes('sales') || primaryMetric.includes('amount') || primaryMetric.includes('collected')) {
      return `$${value.toLocaleString()}`;
    }
    return value.toLocaleString();
  };

  const renderBarChart = () => (
    <div className="space-y-3">
      {chartData.map((item, index) => {
        const value = Number(item[primaryMetric]) || 0;
        const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
        const label = item[config.groupBy] || `Item ${index + 1}`;
        
        return (
          <div key={index} className="flex items-center gap-3">
            <div className="w-20 text-xs text-gray-600 truncate">{label}</div>
            <div className="flex-1 flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                <div
                  className="h-4 rounded-full transition-all duration-300"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: getChartColor(config.type)
                  }}
                />
              </div>
              <div className="w-20 text-xs text-gray-700 text-right">
                {formatValue(value)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderLineChart = () => (
    <div className="relative h-48">
      <svg className="w-full h-full">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(y => (
          <line
            key={y}
            x1="40"
            y1={`${y * 1.6 + 20}%`}
            x2="95%"
            y2={`${y * 1.6 + 20}%`}
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}
        
        {/* Line path */}
        <polyline
          fill="none"
          stroke={getChartColor(config.type)}
          strokeWidth="3"
          points={chartData.map((item, index) => {
            const value = Number(item[primaryMetric]) || 0;
            const x = 40 + (index * (55 / Math.max(chartData.length - 1, 1)));
            const y = 180 - ((value / maxValue) * 140);
            return `${x},${y}`;
          }).join(' ')}
        />
        
        {/* Data points */}
        {chartData.map((item, index) => {
          const value = Number(item[primaryMetric]) || 0;
          const x = 40 + (index * (55 / Math.max(chartData.length - 1, 1)));
          const y = 180 - ((value / maxValue) * 140);
          
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="4"
              fill={getChartColor(config.type)}
            />
          );
        })}
      </svg>
    </div>
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{config.title}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <div 
            className="w-3 h-3 rounded"
            style={{ backgroundColor: getChartColor(config.type) }}
          />
          {config.type.charAt(0).toUpperCase() + config.type.slice(1)} Chart
        </div>
      </div>
      
      <div style={{ height: getChartHeight() - 80 }} className="overflow-hidden">
        {config.type === 'bar' ? renderBarChart() : renderLineChart()}
      </div>
      
      <div className="mt-3 text-xs text-gray-500 text-center">
        {data.length} data points • {primaryMetric.replace('_', ' ')}
        {config.groupBy && ` by ${config.groupBy.replace('_', ' ')}`}
      </div>
    </div>
  );
}

export function VisualizationBlock({ config, data, onChartTypeChange }: VisualizationBlockProps) {
  // Add safety checks for config
  if (!config || !config.charts || config.charts.length === 0) {
    return (
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="p-4 text-gray-500 text-center">
            Chart configuration missing or invalid
          </div>
        </div>
      </div>
    );
  }

  if (config.type === 'single') {
    // Single chart layout
    const chart = config.charts[0];
    return (
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <MockChart config={chart} data={data || []} />
        </div>
      </div>
    );
  }

  if (config.type === 'multiple') {
    // Multiple charts layout (like Sales Trends with 3 charts)
    return (
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {config.charts.map((chart) => (
              <MockChart key={chart.id || Math.random()} config={chart} data={data || []} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (config.type === 'dashboard') {
    // Dashboard layout with custom positioning
    return (
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {config.charts.map((chart) => (
              <div
                key={chart.id || Math.random()}
                className={`${
                  chart.size === 'large' ? 'lg:col-span-2' : 
                  chart.size === 'full' ? 'lg:col-span-3' : ''
                }`}
              >
                <MockChart config={chart} data={data || []} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
