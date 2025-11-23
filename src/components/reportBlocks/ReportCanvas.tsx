import React, { useState, useEffect } from 'react';
import { ReportTemplate, ReportState, ReportFilter } from '../../types/reportBlocks';
import { HeaderBlock } from './HeaderBlock';
import { ControlsBlock } from './ControlsBlock';
import { MetricsBlock } from './MetricsBlock';
import { VisualizationBlock } from './VisualizationBlock';
import { TableBlock } from './TableBlock';
import { generateMockReportData, generateReportSummary } from '../../utils/mockReportData';
import { REPORT_GRAINS } from '../../types/reportData';

interface ReportCanvasProps {
  template: ReportTemplate;
  onBack?: () => void;
  onCustomize?: () => void;
}

export function ReportCanvas({ template, onBack, onCustomize }: ReportCanvasProps) {
  const [reportState, setReportState] = useState<ReportState>({
    templateId: template.id,
    filters: [
      { id: 'time_period', name: 'Time Period', type: 'date_range', value: 'this_month' },
      { id: 'location', name: 'Location', type: 'multi_select', value: ['all'] },
    ],
    groupBy: template.defaultGroupBy,
    selectedMetrics: template.defaultMetrics,
    chartTypes: {},
    timeframe: 'day',
    location: ['all'],
    customizations: {}
  });

  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Generate mock data based on template
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockData = generateMockReportData(template.id);
      setReportData(mockData);
      setLoading(false);
    }, 800);
  }, [template.id, reportState.filters, reportState.groupBy, reportState.selectedMetrics]);

  const handleFilterChange = (filterId: string, value: any) => {
    setReportState(prev => ({
      ...prev,
      filters: prev.filters.map(f => 
        f.id === filterId ? { ...f, value } : f
      )
    }));
  };

  const handleGroupByChange = (groupBy: string) => {
    setReportState(prev => ({ ...prev, groupBy }));
  };

  const handleMetricsChange = (metrics: string[]) => {
    setReportState(prev => ({ ...prev, selectedMetrics: metrics }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading report...</p>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Failed to load report data</p>
        </div>
      </div>
    );
  }

  const grain = REPORT_GRAINS[template.grain];
  const summary = generateReportSummary(reportData);

  // Convert summary to metrics format
  const metricsData = reportState.selectedMetrics.map(metricId => {
    const metric = grain.metrics.find(m => m.id === metricId);
    const summaryData = summary[metricId];
    
    return {
      id: metricId,
      name: metric?.name || metricId,
      value: summaryData?.total || 0,
      previousValue: summaryData?.total ? summaryData.total * 0.9 : undefined,
      change: summaryData?.total ? summaryData.total * 0.1 : undefined,
      changePercent: Math.random() * 20 - 10, // Mock percentage change
      format: metric?.type || 'number'
    };
  });

  // Prepare table columns
  const tableColumns = [
    {
      id: reportState.groupBy,
      name: grain.dimensions.find(d => d.id === reportState.groupBy)?.name || reportState.groupBy,
      type: 'string' as const,
      sortable: true
    },
    ...reportState.selectedMetrics.map(metricId => {
      const metric = grain.metrics.find(m => m.id === metricId);
      return {
        id: metricId,
        name: metric?.name || metricId,
        type: metric?.type || 'number' as const,
        sortable: true
      };
    })
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Render blocks in order */}
      {template.blocks
        .filter(block => block.visible)
        .sort((a, b) => a.order - b.order)
        .map(block => {
          switch (block.type) {
            case 'header':
              return (
                <HeaderBlock
                  key={block.id}
                  config={block.config.header!}
                  onBack={onBack}
                  onCustomize={onCustomize}
                  onExport={() => console.log('Export')}
                  onPrint={() => console.log('Print')}
                  onShare={() => console.log('Share')}
                  onSave={() => console.log('Save')}
                />
              );

            case 'controls':
              return (
                <ControlsBlock
                  key={block.id}
                  config={block.config.controls!}
                  filters={reportState.filters}
                  groupBy={reportState.groupBy}
                  selectedMetrics={reportState.selectedMetrics}
                  onFilterChange={handleFilterChange}
                  onGroupByChange={handleGroupByChange}
                  onMetricsChange={handleMetricsChange}
                />
              );

            case 'metrics':
              // Skip metrics blocks - not needed for standard reports
              return null;

            case 'visualization':
              return (
                <VisualizationBlock
                  key={block.id}
                  config={block.config.visualization!}
                  data={reportData.data}
                />
              );

            case 'table':
              return (
                <TableBlock
                  key={block.id}
                  config={block.config.table!}
                  columns={tableColumns}
                  data={reportData.data}
                  grain={template.grain}
                  groupByColumn={reportState.groupBy}
                />
              );

            default:
              return null;
          }
        })}
    </div>
  );
}
