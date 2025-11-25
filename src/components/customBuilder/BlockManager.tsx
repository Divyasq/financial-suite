import React, { useState } from 'react';
import { Plus, X, BarChart3, Grid3X3, Table, Settings, MessageSquare, Target } from 'lucide-react';
import { CustomReportState, ReportBlock, ChartBlockConfig, WidgetBlockConfig, TableBlockConfig, KPIBlockConfig } from '../../types/customBuilder';

interface BlockManagerProps {
  reportState: CustomReportState;
  updateReportState: (updates: Partial<CustomReportState>) => void;
}

export function BlockManager({ reportState, updateReportState }: BlockManagerProps) {
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [configBlockType, setConfigBlockType] = useState<'chart' | 'widgets' | 'kpi' | 'table' | null>(null);
  const [tempConfig, setTempConfig] = useState<any>({});
  const openBlockConfig = (type: 'chart' | 'widgets' | 'kpi' | 'table') => {
    const order = (reportState.blocks?.length || 0) + 1;
    
    // Set default config based on type
    let defaultConfig: any;
    switch (type) {
      case 'chart':
        defaultConfig = {
          chartType: 'bar',
          metrics: reportState.selectedMetrics.slice(0, 2),
          dimensions: reportState.selectedDimensions.slice(0, 2),
          showLegend: true,
          height: 400
        };
        break;
      case 'widgets':
        defaultConfig = {
          metrics: reportState.selectedMetrics.slice(0, 4),
          layout: 'grid',
          showTrends: true,
          showComparisons: false
        };
        break;
      case 'kpi':
        defaultConfig = {
          prompt: '',
          generatedKPIs: [],
          layout: 'grid',
          showTrends: true
        };
        break;
      case 'table':
        defaultConfig = {
          metrics: reportState.selectedMetrics,
          dimensions: reportState.selectedDimensions,
          showSummary: true,
          pageSize: 25,
          sortable: true,
          tableType: 'flat' // flat or nested
        };
        break;
    }
    
    setConfigBlockType(type);
    setTempConfig(defaultConfig);
    setShowConfigModal(true);
  };

  const addBlockWithConfig = () => {
    if (!configBlockType) return;
    
    const blockId = `block_${Date.now()}`;
    const order = (reportState.blocks?.length || 0) + 1;
    
    let newBlock: ReportBlock;
    
    switch (configBlockType) {
      case 'chart':
        newBlock = {
          id: blockId,
          type: 'chart',
          title: `${tempConfig.chartType.charAt(0).toUpperCase() + tempConfig.chartType.slice(1)} Chart`,
          config: tempConfig as ChartBlockConfig,
          order
        };
        break;
      case 'widgets':
        newBlock = {
          id: blockId,
          type: 'widgets',
          title: `Widgets ${order}`,
          config: tempConfig as WidgetBlockConfig,
          order
        };
        break;
      case 'kpi':
        newBlock = {
          id: blockId,
          type: 'kpi',
          title: `KPI Cards ${order}`,
          config: tempConfig as KPIBlockConfig,
          order
        };
        break;
      case 'table':
        newBlock = {
          id: blockId,
          type: 'table',
          title: `${tempConfig.tableType === 'nested' ? 'Nested' : 'Data'} Table`,
          config: tempConfig as TableBlockConfig,
          order
        };
        break;
    }
    
    updateReportState({
      blocks: [...(reportState.blocks || []), newBlock]
    });
    
    setShowConfigModal(false);
    setConfigBlockType(null);
    setTempConfig({});
  };

  const generateKPIFromPrompt = (prompt: string) => {
    // Mock KPI generation based on prompt
    const mockKPIs = [
      {
        id: 'kpi_1',
        title: 'Total Revenue',
        metric: 'gross_sales',
        description: 'Total sales revenue for the period',
        format: 'currency' as const
      },
      {
        id: 'kpi_2',
        title: 'Order Count',
        metric: 'transaction_count',
        description: 'Number of orders placed',
        format: 'number' as const
      },
      {
        id: 'kpi_3',
        title: 'Average Order Value',
        metric: 'avg_order_value',
        description: 'Average value per order',
        format: 'currency' as const
      }
    ];
    
    setTempConfig(prev => ({
      ...prev,
      generatedKPIs: mockKPIs
    }));
  };

  const removeBlock = (blockId: string) => {
    updateReportState({
      blocks: (reportState.blocks || []).filter(b => b.id !== blockId)
    });
  };

  const getBlockIcon = (type: string) => {
    switch (type) {
      case 'chart':
        return <BarChart3 className="h-5 w-5 text-blue-500" />;
      case 'widgets':
        return <Grid3X3 className="h-5 w-5 text-green-500" />;
      case 'kpi':
        return <Target className="h-5 w-5 text-orange-500" />;
      case 'table':
        return <Table className="h-5 w-5 text-purple-500" />;
      default:
        return null;
    }
  };

  const getBlockTypeLabel = (block: ReportBlock) => {
    switch (block.type) {
      case 'chart':
        const chartConfig = block.config as ChartBlockConfig;
        const chartMetrics = chartConfig.metrics.length;
        const chartDims = chartConfig.dimensions.length;
        return `${chartConfig.chartType} chart • ${chartMetrics} metrics • ${chartDims} dimensions`;
      case 'widgets':
        const widgetConfig = block.config as WidgetBlockConfig;
        return `${widgetConfig.metrics.length} metric cards • ${widgetConfig.layout} layout`;
      case 'kpi':
        const kpiConfig = block.config as KPIBlockConfig;
        return `${kpiConfig.generatedKPIs?.length || 0} KPI cards • AI generated`;
      case 'table':
        const tableConfig = block.config as TableBlockConfig;
        const tableMetrics = tableConfig.metrics.length;
        const tableDims = tableConfig.dimensions.length;
        return `${(tableConfig as any).tableType} table • ${tableMetrics} metrics • ${tableDims} dimensions`;
      default:
        return block.type;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Report Layout</h3>
        <p className="text-sm text-gray-600">
          Your report includes a chart and table by default. Add widgets to enhance it.
        </p>
      </div>

      {/* Current Blocks */}
      {reportState.blocks && reportState.blocks.length > 0 && (
        <div className="space-y-3 mb-6">
          {reportState.blocks
            .sort((a, b) => a.order - b.order)
            .map((block, index) => (
            <div key={block.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-white rounded border">
                  {getBlockIcon(block.type)}
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {index + 1}. {block.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    {getBlockTypeLabel(block)}
                  </div>
                </div>
              </div>
              {/* Only show remove button for non-default blocks */}
              {!['default_chart', 'default_table'].includes(block.id) && (
                <button
                  onClick={() => removeBlock(block.id)}
                  className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                  title="Remove block"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Widgets Section */}
      <div className="border-t border-gray-100 pt-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Add Widgets</h4>
        <p className="text-xs text-gray-500 mb-4">Enhance your report with additional metric cards and KPIs</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => openBlockConfig('widgets')}
            className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mb-2 group-hover:bg-green-200 transition-colors">
              <Grid3X3 className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-sm font-medium text-gray-900 mb-1">Metric Cards</div>
            <div className="text-xs text-gray-500 text-center">
              Add metric widgets
            </div>
          </button>

          <button
            onClick={() => openBlockConfig('kpi')}
            className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors group"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg mb-2 group-hover:bg-orange-200 transition-colors">
              <Target className="h-5 w-5 text-orange-600" />
            </div>
            <div className="text-sm font-medium text-gray-900 mb-1">KPI Cards</div>
            <div className="text-xs text-gray-500 text-center">
              AI-generated KPIs
            </div>
          </button>
        </div>
      </div>

      {/* Configuration Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Configure {configBlockType?.charAt(0).toUpperCase() + configBlockType?.slice(1)} Block
                </h3>
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Chart Configuration */}
              {configBlockType === 'chart' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chart Type
                    </label>
                    <select
                      value={tempConfig.chartType || 'bar'}
                      onChange={(e) => setTempConfig(prev => ({ ...prev, chartType: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="bar">Bar Chart</option>
                      <option value="line">Line Chart</option>
                      <option value="pie">Pie Chart</option>
                      <option value="area">Area Chart</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="showLegend"
                      checked={tempConfig.showLegend || false}
                      onChange={(e) => setTempConfig(prev => ({ ...prev, showLegend: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="showLegend" className="ml-2 text-sm text-gray-700">
                      Show Legend
                    </label>
                  </div>
                </div>
              )}

              {/* KPI Configuration */}
              {configBlockType === 'kpi' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Describe the KPIs you want
                    </label>
                    <textarea
                      value={tempConfig.prompt || ''}
                      onChange={(e) => setTempConfig(prev => ({ ...prev, prompt: e.target.value }))}
                      placeholder="e.g., Show me key performance indicators for sales performance including revenue, order count, and customer metrics"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {tempConfig.prompt && (
                    <button
                      onClick={() => generateKPIFromPrompt(tempConfig.prompt)}
                      className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      Generate KPIs
                    </button>
                  )}
                  {tempConfig.generatedKPIs && tempConfig.generatedKPIs.length > 0 && (
                    <div className="border-t pt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Generated KPIs:</h4>
                      <div className="space-y-2">
                        {tempConfig.generatedKPIs.map((kpi: any) => (
                          <div key={kpi.id} className="p-2 bg-gray-50 rounded text-sm">
                            <div className="font-medium">{kpi.title}</div>
                            <div className="text-gray-600 text-xs">{kpi.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Table Configuration */}
              {configBlockType === 'table' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Table Type
                    </label>
                    <select
                      value={tempConfig.tableType || 'flat'}
                      onChange={(e) => setTempConfig(prev => ({ ...prev, tableType: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="flat">Flat Table</option>
                      <option value="nested">Nested/Grouped Table</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="showSummary"
                      checked={tempConfig.showSummary || false}
                      onChange={(e) => setTempConfig(prev => ({ ...prev, showSummary: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="showSummary" className="ml-2 text-sm text-gray-700">
                      Show Summary Row
                    </label>
                  </div>
                </div>
              )}

              {/* Widget Configuration */}
              {configBlockType === 'widgets' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Layout
                    </label>
                    <select
                      value={tempConfig.layout || 'grid'}
                      onChange={(e) => setTempConfig(prev => ({ ...prev, layout: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="grid">Grid Layout</option>
                      <option value="horizontal">Horizontal Layout</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="showTrends"
                      checked={tempConfig.showTrends || false}
                      onChange={(e) => setTempConfig(prev => ({ ...prev, showTrends: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="showTrends" className="ml-2 text-sm text-gray-700">
                      Show Trend Indicators
                    </label>
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addBlockWithConfig}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Block
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
