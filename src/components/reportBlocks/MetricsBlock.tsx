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

  // Handle status layout (for reconciliation success message)
  if (config.layout === 'status' && (config as any).statusMessage) {
    const statusMessage = (config as any).statusMessage;
    return (
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className={`flex items-center gap-3 p-4 rounded-lg border ${
          statusMessage.type === 'success' 
            ? 'bg-green-50 border-green-200 text-green-800'
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <span className="text-lg font-semibold">{statusMessage.icon}</span>
          <div>
            <h3 className="font-semibold">{statusMessage.title}</h3>
            <p className="text-sm opacity-90">{statusMessage.description}</p>
          </div>
        </div>
      </div>
    );
  }

  // Handle reconciliation layout (for detailed breakdown)
  if (config.layout === 'reconciliation' && (config as any).reconciliationSections) {
    const sections = (config as any).reconciliationSections;
    return (
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white rounded-lg border border-gray-200">
          {sections.map((section: any, index: number) => (
            <div key={section.id} className={`flex items-center justify-between p-4 ${
              index !== sections.length - 1 ? 'border-b border-gray-100' : ''
            }`}>
              <div className="flex items-center gap-2">
                {section.isCollapsible && (
                  <span className="text-gray-400 text-sm">▼</span>
                )}
                <span className={`${section.isBold ? 'font-semibold' : 'font-normal'} text-gray-900`}>
                  {section.name}
                </span>
              </div>
              <span className={`font-mono text-right ${
                section.negative ? 'text-red-600' : 'text-gray-900'
              } ${section.isBold ? 'font-semibold' : 'font-normal'}`}>
                {section.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Handle detailed layout (for sales summary breakdown)
  if (config.layout === 'detailed' && (config as any).detailedBreakdown) {
    const breakdown = (config as any).detailedBreakdown;
    const primaryMetrics = (config as any).primaryMetrics || [];
    const summarySection = (config as any).summarySection || [];
    
    return (
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Primary Metrics */}
        {primaryMetrics.map((metric: any) => (
          <div key={metric.id} className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{metric.value}</h2>
                <p className="text-sm text-gray-600">{metric.description}</p>
              </div>
              {metric.showChart && (
                <div className="w-24 h-12 bg-blue-100 rounded flex items-center justify-center">
                  <span className="text-xs text-blue-600">📊</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Detailed Breakdown */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          {breakdown.map((item: any, index: number) => (
            <div key={index} className={`p-4 ${
              index !== breakdown.length - 1 ? 'border-b border-gray-100' : ''
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-gray-900">{item.section}</span>
                  {item.description && (
                    <p className="text-sm text-gray-500">{item.description}</p>
                  )}
                </div>
                <span className={`font-mono ${
                  item.negative ? 'text-red-600' : 'text-gray-900'
                }`}>
                  {item.amount}
                </span>
              </div>
              {item.items && item.items.length > 0 && (
                <div className="mt-2 ml-4">
                  {item.items.map((subItem: any, subIndex: number) => (
                    <div key={subIndex} className="flex justify-between text-sm text-gray-600 py-1">
                      <span>{subItem.name}</span>
                      <span>{subItem.amount}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary Section */}
        {summarySection.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200">
            {summarySection.map((item: any, index: number) => (
              <div key={index} className={`p-4 ${
                index !== summarySection.length - 1 ? 'border-b border-gray-100' : ''
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-gray-900">{item.name}</span>
                    {item.description && (
                      <p className="text-sm text-gray-500">{item.description}</p>
                    )}
                  </div>
                  <span className={`font-mono ${
                    item.negative ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {item.amount}
                  </span>
                </div>
                {item.breakdown && (
                  <div className="mt-2 ml-4">
                    {item.breakdown.map((subItem: any, subIndex: number) => (
                      <div key={subIndex} className="flex justify-between text-sm text-gray-600 py-1">
                        <span>{subItem.method}</span>
                        <span>{subItem.amount}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Default grid layout
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
