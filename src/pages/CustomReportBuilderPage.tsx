import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, Eye, X, Save } from 'lucide-react';
import { CustomReportState } from '../types/customBuilder';
import { GRAIN_OPTIONS } from '../data/customBuilderData';
import { BuilderPanel } from '../components/customBuilder/BuilderPanel';
import { BlockManager } from '../components/customBuilder/BlockManager';
import { ReportCanvas } from '../components/reportBlocks/ReportCanvas';
import { MetricCardsDisplay } from '../components/customBuilder/MetricCardsDisplay';

export function CustomReportBuilderPage() {
  console.log('CustomReportBuilderPage: Component loaded');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Initialize state from template data or URL parameters
  const [reportState, setReportState] = useState<CustomReportState>(() => {
    // Check if we have template data from the Template Gallery
    const templateParam = searchParams.get('template');
    let templateData = {};
    
    if (templateParam) {
      try {
        const storedTemplate = localStorage.getItem('selectedTemplate');
        if (storedTemplate) {
          templateData = JSON.parse(storedTemplate);
          console.log('CustomReportBuilder: Loaded template data from localStorage', templateData);
        }
      } catch (error) {
        console.error('CustomReportBuilder: Error parsing template data', error);
        templateData = {};
      }
    }
    
    // If we have valid template data, use it to initialize
    if (templateData && Object.keys(templateData).length > 0 && templateData.grain) {
      console.log('CustomReportBuilder: Initializing from template data', templateData);
      
      return {
        reportName: templateData.name || '',
        description: templateData.description || '',
        selectedGrains: [templateData.grain],
        primaryGrain: templateData.grain,
        selectedMetrics: templateData.selectedMetrics || [],
        selectedDimensions: templateData.selectedDimensions || [],
        filters: [
          {
            id: 'time_period',
            dimension: 'date_range',
            operator: 'between',
            value: { from: '2024-01-01', to: '2024-01-31' },
            label: 'Last 30 days'
          }
        ],
        blocks: templateData.blocks || [
          {
            id: 'default_chart',
            type: 'chart' as const,
            title: 'Chart',
            config: {
              chartType: 'bar',
              metrics: templateData.selectedMetrics || [],
              dimensions: templateData.selectedDimensions || [],
              showLegend: true,
              height: 400
            },
            order: 1
          },
          {
            id: 'default_table',
            type: 'table' as const,
            title: 'Data Table',
            config: {
              metrics: templateData.selectedMetrics || [],
              dimensions: templateData.selectedDimensions || [],
              showSummary: true,
              pageSize: 25,
              sortable: true,
              tableType: 'flat'
            },
            order: 2
          }
        ],
        joinType: 'inner'
      };
    }
    
    // Otherwise, initialize from URL parameters (existing logic)
    const grain = searchParams.get('grain');
    const metrics = searchParams.get('metrics')?.split(',').filter(m => m.trim()) || [];
    const groupBy = searchParams.get('groupBy');
    const name = searchParams.get('name') || '';
    
    console.log('CustomReportBuilder: Initializing from URL params', {
      grain,
      metrics,
      groupBy,
      name
    });
    
    // If no metrics from URL, set some defaults based on grain
    let defaultMetrics = metrics;
    let defaultDimensions = groupBy ? [groupBy] : [];
    
    if (grain && metrics.length === 0) {
      // Set default metrics based on grain
      switch (grain) {
        case 'orders':
          defaultMetrics = ['gross_sales', 'transaction_count'];
          defaultDimensions = defaultDimensions.length > 0 ? defaultDimensions : ['location'];
          break;
        case 'items':
          defaultMetrics = ['item_sales', 'units_sold'];
          defaultDimensions = defaultDimensions.length > 0 ? defaultDimensions : ['item_name'];
          break;
        case 'customers':
          defaultMetrics = ['amount_spend', 'new_visit_count'];
          defaultDimensions = defaultDimensions.length > 0 ? defaultDimensions : ['customer_type'];
          break;
        case 'payments':
          defaultMetrics = ['total_collected', 'no_of_payments'];
          defaultDimensions = defaultDimensions.length > 0 ? defaultDimensions : ['payment_method'];
          break;
        case 'employees':
          defaultMetrics = ['gross_sales', 'transaction_count'];
          defaultDimensions = defaultDimensions.length > 0 ? defaultDimensions : ['employee_name'];
          break;
        case 'discounts':
          defaultMetrics = ['amount_discounted', 'discounts_applied'];
          defaultDimensions = defaultDimensions.length > 0 ? defaultDimensions : ['discount_name'];
          break;
        case 'modifiers':
          defaultMetrics = ['modifier_gross_sales', 'modifier_qty_sold'];
          defaultDimensions = defaultDimensions.length > 0 ? defaultDimensions : ['modifier_name'];
          break;
      }
    }
    
    return {
      reportName: name,
      description: '',
      selectedGrains: grain ? [grain] : [],
      primaryGrain: grain,
      selectedMetrics: defaultMetrics,
      selectedDimensions: defaultDimensions,
      filters: [
        {
          id: 'time_period',
          dimension: 'date_range',
          operator: 'between',
          value: { from: '2024-01-01', to: '2024-01-31' },
          label: 'Last 30 days'
        }
      ],
      blocks: [
        // Default chart and table blocks
        {
          id: 'default_chart',
          type: 'chart' as const,
          title: 'Chart',
          config: {
            chartType: 'bar',
            metrics: defaultMetrics,
            dimensions: defaultDimensions,
            showLegend: true,
            height: 400
          },
          order: 1
        },
        {
          id: 'default_table',
          type: 'table' as const,
          title: 'Data Table',
          config: {
            metrics: defaultMetrics,
            dimensions: defaultDimensions,
            showSummary: true,
            pageSize: 25,
            sortable: true,
            tableType: 'flat'
          },
          order: 2
        }
      ],
      joinType: 'inner'
    };
  });

  const [previewData, setPreviewData] = useState<any>(null);

  // Update report state
  const updateReportState = (updates: Partial<CustomReportState>) => {
    setReportState(prev => ({ ...prev, ...updates }));
  };

  // Auto-update default chart and table blocks when metrics/dimensions change
  useEffect(() => {
    if (reportState.primaryGrain && (reportState.selectedMetrics.length > 0 || reportState.selectedDimensions.length > 0)) {
      setReportState(prev => ({
        ...prev,
        blocks: prev.blocks.map(block => {
          if (block.id === 'default_chart') {
            return {
              ...block,
              config: {
                ...block.config,
                metrics: prev.selectedMetrics,
                dimensions: prev.selectedDimensions
              }
            };
          }
          if (block.id === 'default_table') {
            return {
              ...block,
              config: {
                ...block.config,
                metrics: prev.selectedMetrics,
                dimensions: prev.selectedDimensions
              }
            };
          }
          return block;
        })
      }));
    }
  }, [reportState.selectedMetrics, reportState.selectedDimensions]);

  // Handle grain change
  const handleGrainChange = (grainId: string) => {
    const grain = GRAIN_OPTIONS.find(g => g.id === grainId);
    if (grain) {
      setReportState(prev => ({
        ...prev,
        selectedGrains: [grainId],
        primaryGrain: grainId,
        selectedMetrics: [],
        selectedDimensions: [],
        reportName: prev.reportName || `${grain.name} Analysis`
      }));
    }
  };

  // Generate preview
  useEffect(() => {
    console.log('CustomReportBuilder: Preview effect triggered', {
      selectedGrains: reportState.selectedGrains,
      primaryGrain: reportState.primaryGrain,
      selectedMetrics: reportState.selectedMetrics,
      groupBy: reportState.groupBy,
      blocks: reportState.blocks
    });
    
    if (reportState.primaryGrain && reportState.blocks && reportState.blocks.length > 0) {
      // Create template blocks from the user's configured blocks
      const templateBlocks = [
        // Convert user blocks to template blocks
        ...reportState.blocks.map((block, index) => {
          switch (block.type) {
            case 'chart':
              const chartConfig = block.config as any;
              return {
                id: `chart-${block.id}`,
                type: 'visualization' as const,
                config: {
                  visualization: {
                    type: 'single',
                    charts: [
                      {
                        id: block.id,
                        type: chartConfig.chartType || 'bar',
                        title: block.title,
                        groupBy: chartConfig.dimensions?.[0] || null,
                        metrics: chartConfig.metrics || [],
                        size: 'large'
                      }
                    ],
                    height: chartConfig.height || 400,
                    showLegend: chartConfig.showLegend !== false,
                    showTooltips: true
                  }
                },
                visible: true,
                order: index + 1
              };
            case 'widgets':
              return {
                id: `metrics-${block.id}`,
                type: 'metrics' as const,
                config: {
                  metrics: {
                    layout: 'grid',
                    showTrends: true,
                    showComparisons: false
                  }
                },
                visible: true,
                order: index + 2
              };
            case 'kpi':
              return {
                id: `kpi-${block.id}`,
                type: 'metrics' as const,
                config: {
                  metrics: {
                    layout: 'grid',
                    showTrends: true,
                    showComparisons: false
                  }
                },
                visible: true,
                order: index + 2
              };
            case 'table':
              const tableConfig = block.config as any;
              return {
                id: `table-${block.id}`,
                type: 'table' as const,
                config: {
                  table: {
                    collapsible: true,
                    defaultCollapsed: false,
                    sortable: tableConfig.sortable !== false,
                    filterable: false,
                    exportable: true,
                    pagination: true,
                    pageSize: tableConfig.pageSize || 25,
                    showSummaryRow: tableConfig.showSummary !== false
                  }
                },
                visible: true,
                order: index + 1
              };
            default:
              return null;
          }
        }).filter(Boolean)
      ];

      const tempTemplate = {
        id: 'custom-preview',
        name: reportState.reportName || 'Custom Report',
        description: reportState.description || 'Custom report preview',
        type: 'analysis' as const,
        grain: reportState.primaryGrain,
        defaultGroupBy: reportState.selectedDimensions[0] || null,
        defaultMetrics: reportState.selectedMetrics,
        selectedMetrics: reportState.selectedMetrics,
        selectedDimensions: reportState.selectedDimensions,
        category: 'custom',
        blocks: templateBlocks
      };
      
      console.log('CustomReportBuilder: Generated template', tempTemplate);
      
      setPreviewData(tempTemplate);
    } else {
      setPreviewData(null);
    }
  }, [reportState]);

  const selectedGrain = GRAIN_OPTIONS.find(g => g.id === reportState.primaryGrain);

  const handleSave = () => {
    // Validate required fields
    if (!reportState.reportName?.trim()) {
      alert('Please enter a report name before saving.');
      return;
    }

    if (reportState.selectedMetrics.length === 0) {
      alert('Please select at least one metric before saving.');
      return;
    }

    // Create a saved report object
    const savedReport = {
      id: `custom-${Date.now()}`,
      name: reportState.reportName.trim(),
      description: reportState.description?.trim() || `Custom analysis of ${reportState.selectedGrains.join(', ')} data`,
      grains: reportState.selectedGrains,
      metrics: reportState.selectedMetrics,
      dimensions: reportState.selectedDimensions,
      filters: reportState.filters,
      blocks: reportState.blocks,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      type: 'custom' as const
    };

    // Get existing saved reports from localStorage
    const existingSavedReports = JSON.parse(localStorage.getItem('customSavedReports') || '[]');
    
    // Add the new report
    const updatedSavedReports = [...existingSavedReports, savedReport];
    
    // Save to localStorage
    localStorage.setItem('customSavedReports', JSON.stringify(updatedSavedReports));
    
    console.log('Report saved successfully:', savedReport);
    
    // Show success message (in a real app, you'd use a toast notification)
    alert(`Report "${savedReport.name}" saved successfully!`);
    
    // Navigate back to custom reports page
    navigate('/financial-suite/custom-reports');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/financial-suite/custom-reports/create')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Build Custom Report</h1>
                <p className="text-gray-600">Configure your report settings and see a live preview</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/financial-suite/custom-reports/create')}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Eye className="h-4 w-4" />
                Preview
              </button>
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="h-4 w-4" />
                Save Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="col-span-8">
            <div className="space-y-6">
              {/* Report Details */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Report Name
                    </label>
                    <input
                      type="text"
                      value={reportState.reportName}
                      onChange={(e) => updateReportState({ reportName: e.target.value })}
                      placeholder="Enter report name..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={reportState.description}
                      onChange={(e) => updateReportState({ description: e.target.value })}
                      placeholder="Describe what this report shows..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Live Report Preview */}
              {previewData ? (
                <div className="space-y-6">
                  {/* Metric Cards */}
                  <MetricCardsDisplay blocks={reportState.blocks} data={previewData} />
                  
                  {/* Chart and Table */}
                  <ReportCanvas template={previewData} />
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <Eye className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Configure Your Report</h3>
                  <p className="text-gray-600">Select metrics and dimensions from the right panel to see a live preview</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Builder Controls */}
          <div className="col-span-4">
            <BuilderPanel
              reportState={reportState}
              updateReportState={updateReportState}
              selectedGrain={selectedGrain}
              onGrainChange={handleGrainChange}
              onStartOver={() => navigate('/financial-suite/custom-reports/create')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
