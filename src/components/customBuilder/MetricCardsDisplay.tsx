import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { ReportBlock, KPIBlockConfig } from '../../types/customBuilder';

interface MetricCardsDisplayProps {
  blocks: ReportBlock[];
  data?: any;
}

export function MetricCardsDisplay({ blocks, data }: MetricCardsDisplayProps) {
  const metricBlocks = blocks.filter(block => block.type === 'kpi');
  
  if (metricBlocks.length === 0) {
    return null;
  }

  const formatValue = (value: number, format: 'currency' | 'number' | 'percentage') => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(value);
      case 'percentage':
        return `${value.toFixed(1)}%`;
      case 'number':
      default:
        return new Intl.NumberFormat('en-US').format(value);
    }
  };

  const generateMockValue = (metric: string, format: 'currency' | 'number' | 'percentage') => {
    switch (format) {
      case 'currency':
        return Math.random() * 10000 + 1000; // $1K - $11K
      case 'percentage':
        return Math.random() * 20 + 5; // 5% - 25%
      case 'number':
      default:
        return Math.random() * 100 + 10; // 10 - 110
    }
  };

  const generateTrend = () => {
    const trends = ['up', 'down', 'neutral'];
    return trends[Math.floor(Math.random() * trends.length)];
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  // Flatten all KPIs from all blocks
  const allKPIs = metricBlocks.flatMap(block => {
    const config = block.config as KPIBlockConfig;
    return config.generatedKPIs || [];
  });

  if (allKPIs.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <div className="flex overflow-x-auto gap-4 pb-2">
        {allKPIs.map((kpi) => {
          const value = generateMockValue(kpi.metric, kpi.format);
          const trend = generateTrend();
          const trendValue = Math.random() * 10 + 1; // 1-11%
          
          return (
            <div
              key={kpi.id}
              className="flex-shrink-0 bg-white rounded-lg border border-gray-200 p-4 min-w-[200px] hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-900 leading-tight">
                  {kpi.title}
                </h4>
                <div className="flex items-center gap-1">
                  {getTrendIcon(trend)}
                </div>
              </div>
              
              <div className="mb-1">
                <span className="text-2xl font-bold text-gray-900">
                  {formatValue(value, kpi.format)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-600 truncate flex-1 mr-2">
                  {kpi.description}
                </p>
                <div className={`flex items-center gap-1 text-xs ${getTrendColor(trend)}`}>
                  <span>{trendValue.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {allKPIs.length > 3 && (
        <div className="text-xs text-gray-500 mt-2 text-center">
          Scroll horizontally to see more cards →
        </div>
      )}
    </div>
  );
}
