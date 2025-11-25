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
    groupBy: template.selectedDimensions?.[0] || template.defaultGroupBy,
    selectedMetrics: template.selectedMetrics || template.defaultMetrics,
    chartTypes: {},
    timeframe: 'day',
    location: ['all'],
    customizations: {}
  });

  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Update report state when template changes
  useEffect(() => {
    setReportState(prev => ({
      ...prev,
      groupBy: template.selectedDimensions?.[0] || template.defaultGroupBy,
      selectedMetrics: template.selectedMetrics || template.defaultMetrics,
    }));
  }, [template.selectedMetrics, template.selectedDimensions, template.defaultMetrics, template.defaultGroupBy]);

  // Generate mock data based on template
  useEffect(() => {
    console.log('ReportCanvas: Generating data for template', template.id, template);
    setLoading(true);
    setTimeout(() => {
      try {
        const mockData = generateMockReportData(template.id, template);
        console.log('ReportCanvas: Generated mock data', mockData);
        setReportData(mockData);
        setLoading(false);
      } catch (error) {
        console.error('ReportCanvas: Error generating mock data', error);
        setReportData(null);
        setLoading(false);
      }
    }, 10); // Very fast for testing
  }, [template, reportState.filters]);

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
          <p className="text-sm text-gray-500 mt-2">Template: {template.id}</p>
          <p className="text-sm text-gray-500">Grain: {template.grain}</p>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Failed to load report data</p>
          <p className="text-sm text-gray-500 mt-2">Template: {template.id}</p>
          <p className="text-sm text-gray-500">Grain: {template.grain}</p>
          <p className="text-sm text-gray-500">Metrics: {template.defaultMetrics?.join(', ')}</p>
          <p className="text-sm text-gray-500">Group By: {template.defaultGroupBy}</p>
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

  // Prepare table columns - include all dimensions and metrics
  const selectedDimensions = template.selectedDimensions || (reportState.groupBy ? [reportState.groupBy] : []);
  
  console.log('ReportCanvas: Table column generation', {
    selectedDimensions,
    selectedMetrics: reportState.selectedMetrics,
    templateSelectedDimensions: template.selectedDimensions,
    templateSelectedMetrics: template.selectedMetrics
  });
  
  const tableColumns = [
    // Add all dimension columns
    ...selectedDimensions.map(dimensionId => {
      const dimension = grain.dimensions.find(d => d.id === dimensionId);
      return {
        id: dimensionId,
        name: dimension?.name || dimensionId.replace('_', ' '),
        type: 'string' as const,
        sortable: true
      };
    }),
    // Add all metric columns
    ...reportState.selectedMetrics.map(metricId => {
      const metric = grain.metrics.find(m => m.id === metricId);
      return {
        id: metricId,
        name: metric?.name || metricId.replace('_', ' '),
        type: metric?.type || 'number' as const,
        sortable: true
      };
    })
  ];
  
  console.log('ReportCanvas: Generated table columns', tableColumns);

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
                  reportData={reportData}
                  reportType={template.type}
                  reportGrain={template.grain}
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
