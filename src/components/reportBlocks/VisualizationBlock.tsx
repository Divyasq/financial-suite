import React from 'react';
import { VisualizationBlockConfig, ChartConfig } from '../../types/reportBlocks';

interface VisualizationBlockProps {
  config: VisualizationBlockConfig;
  data: any[];
  onChartTypeChange?: (chartId: string, type: string) => void;
}

// Mock chart component - in real implementation, you'd use a charting library like Chart.js, D3, or Recharts
function MockChart({ config, data }: { config: ChartConfig; data: any[] }) {
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
      
      <div 
        className="flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg"
        style={{ height: getChartHeight() }}
      >
        <div className="text-center">
          <div className="text-4xl mb-2">📊</div>
          <p className="text-gray-500 text-sm">
            {config.type.charAt(0).toUpperCase() + config.type.slice(1)} Chart
          </p>
          <p className="text-gray-400 text-xs mt-1">
            {data.length} data points • {config.metrics.join(', ')}
          </p>
          {config.timeframe && (
            <p className="text-gray-400 text-xs">
              Grouped by {config.timeframe}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function VisualizationBlock({ config, data, onChartTypeChange }: VisualizationBlockProps) {
  if (config.type === 'single') {
    // Single chart layout
    const chart = config.charts[0];
    return (
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <MockChart config={chart} data={data} />
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
              <MockChart key={chart.id} config={chart} data={data} />
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
                key={chart.id}
                className={`${
                  chart.size === 'large' ? 'lg:col-span-2' : 
                  chart.size === 'full' ? 'lg:col-span-3' : ''
                }`}
              >
                <MockChart config={chart} data={data} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
