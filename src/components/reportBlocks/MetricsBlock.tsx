import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { MetricsBlockConfig } from '../../types/reportBlocks';
import { formatReportValue } from '../../utils/mockReportData';

interface MetricData {
  id: string;
  name: string;
  value: number;
  previousValue?: number;
  change?: number;
  changePercent?: number;
  format: 'currency' | 'number' | 'percentage';
}

interface MetricsBlockProps {
  config: MetricsBlockConfig;
  metrics: MetricData[];
  grain: string;
}

export function MetricsBlock({ config, metrics, grain }: MetricsBlockProps) {
  const getTrendIcon = (change?: number) => {
    if (!change) return <Minus className="h-4 w-4 text-gray-400" />;
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  const getTrendColor = (change?: number) => {
    if (!change) return 'text-gray-500';
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-500';
  };

  const formatChange = (change?: number, changePercent?: number) => {
    if (changePercent !== undefined) {
      return `${changePercent > 0 ? '+' : ''}${changePercent.toFixed(1)}%`;
    }
    if (change !== undefined) {
      return `${change > 0 ? '+' : ''}${formatReportValue(change, 'currency', grain)}`;
    }
    return '';
  };

  const displayedMetrics = metrics.slice(0, config.maxMetrics);

  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className={`grid gap-4 ${
          config.layout === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
        }`}>
          {displayedMetrics.map((metric) => (
            <div
              key={metric.id}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-500">{metric.name}</h3>
                {config.showTrends && getTrendIcon(metric.change)}
              </div>
              
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-gray-900">
                  {formatReportValue(metric.value, metric.id, grain)}
                </p>
                {config.showTrends && metric.change !== undefined && (
                  <span className={`text-sm font-medium ${getTrendColor(metric.change)}`}>
                    {formatChange(metric.change, metric.changePercent)}
                  </span>
                )}
              </div>
              
              {config.showComparison && metric.previousValue !== undefined && (
                <p className="text-sm text-gray-600 mt-1">
                  vs {formatReportValue(metric.previousValue, metric.id, grain)} last period
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
