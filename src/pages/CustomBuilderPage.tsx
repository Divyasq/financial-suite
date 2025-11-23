import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, Sparkles, Save, Eye, X } from 'lucide-react';
import { CustomReportState, ParsedPrompt } from '../types/customBuilder';
import { GRAIN_OPTIONS, PROMPT_SUGGESTIONS, PROMPT_PATTERNS } from '../data/customBuilderData';
import { GrainSelector } from '../components/customBuilder/GrainSelector';
import { PromptInterface } from '../components/customBuilder/PromptInterface';
import { BuilderPanel } from '../components/customBuilder/BuilderPanel';
import { ReportCanvas } from '../components/reportBlocks/ReportCanvas';
import { REPORT_TEMPLATES } from '../data/reportTemplates';

export function CustomBuilderPage() {
  const navigate = useNavigate();
  
  const [reportState, setReportState] = useState<CustomReportState>({
    reportName: '',
    description: '',
    selectedGrain: null,
    selectedMetrics: [],
    groupBy: null,
    filters: [
      {
        id: 'time_period',
        dimension: 'date_range',
        operator: 'between',
        value: { from: '2024-01-01', to: '2024-01-31' },
        label: 'Last 30 days'
      }
    ],
    chartType: 'bar',
    showTable: true,
    showMetricCards: false,
    dashboardMode: false
  });

  const [showPrompt, setShowPrompt] = useState(true);
  const [promptValue, setPromptValue] = useState('');
  const [suggestions, setSuggestions] = useState(PROMPT_SUGGESTIONS);
  const [previewData, setPreviewData] = useState<any>(null);

  // Parse natural language prompt
  const parsePrompt = (prompt: string): ParsedPrompt | null => {
    const lowerPrompt = prompt.toLowerCase();
    
    for (const pattern of PROMPT_PATTERNS) {
      if (pattern.pattern.test(lowerPrompt)) {
        return {
          grain: pattern.grain,
          metrics: pattern.metrics,
          groupBy: pattern.groupBy,
          filters: [],
          confidence: 0.8,
          explanation: `Detected ${pattern.grain} analysis with ${pattern.metrics.join(', ')} grouped by ${pattern.groupBy}`
        };
      }
    }
    
    return null;
  };

  // Handle prompt submission
  const handlePromptSubmit = (prompt: string) => {
    const parsed = parsePrompt(prompt);
    if (parsed) {
      setReportState(prev => ({
        ...prev,
        selectedGrain: parsed.grain,
        selectedMetrics: parsed.metrics,
        groupBy: parsed.groupBy,
        reportName: prompt.charAt(0).toUpperCase() + prompt.slice(1)
      }));
      setShowPrompt(false);
    }
  };

  // Handle grain selection
  const handleGrainSelect = (grainId: string) => {
    const grain = GRAIN_OPTIONS.find(g => g.id === grainId);
    if (grain) {
      setReportState(prev => ({
        ...prev,
        selectedGrain: grainId,
        selectedMetrics: [],
        groupBy: null,
        reportName: prev.reportName || `${grain.name} Analysis`
      }));
      setShowPrompt(false);
    }
  };

  // Update report state
  const updateReportState = (updates: Partial<CustomReportState>) => {
    setReportState(prev => ({ ...prev, ...updates }));
  };

  // Generate preview
  useEffect(() => {
    if (reportState.selectedGrain && reportState.selectedMetrics.length > 0 && reportState.groupBy) {
      // Create a temporary template for preview
      const tempTemplate = {
        id: 'custom-preview',
        name: reportState.reportName || 'Custom Report',
        description: reportState.description || 'Custom report preview',
        type: 'analysis' as const,
        grain: reportState.selectedGrain,
        defaultGroupBy: reportState.groupBy,
        defaultMetrics: reportState.selectedMetrics,
        category: 'custom',
        blocks: [
          {
            id: 'header',
            type: 'header' as const,
            config: {
              header: {
                title: reportState.reportName || 'Custom Report',
                description: reportState.description || 'Custom report preview',
                showDataFreshness: true,
                showOptions: true,
                options: ['export']
              }
            },
            visible: true,
            order: 1
          },
          {
            id: 'controls',
            type: 'controls' as const,
            config: {
              controls: {
                primary: ['time_period', 'location'],
                secondary: ['filters'],
                showGroupBy: false,
                showMetricSelector: false
              }
            },
            visible: true,
            order: 2
          },
          {
            id: 'visualization',
            type: 'visualization' as const,
            config: {
              visualization: {
                type: 'single',
                charts: [
                  {
                    id: 'custom-chart',
                    type: reportState.chartType,
                    title: `${reportState.reportName} Chart`,
                    groupBy: reportState.groupBy,
                    metrics: reportState.selectedMetrics,
                    size: 'large'
                  }
                ],
                height: 400,
                showLegend: true,
                showTooltips: true
              }
            },
            visible: true,
            order: 3
          },
          ...(reportState.showTable ? [{
            id: 'table',
            type: 'table' as const,
            config: {
              table: {
                collapsible: true,
                defaultCollapsed: false,
                sortable: true,
                filterable: false,
                exportable: true,
                pagination: true,
                pageSize: 25,
                showSummaryRow: true
              }
            },
            visible: true,
            order: 4
          }] : [])
        ]
      };
      
      setPreviewData(tempTemplate);
    }
  }, [reportState]);

  const selectedGrain = GRAIN_OPTIONS.find(g => g.id === reportState.selectedGrain);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/financial-suite/standard-reports')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Create Custom Report</h1>
                <p className="text-gray-600">Build a custom report with your preferred metrics, filters, and visualizations</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <X className="h-4 w-4" />
                Cancel
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Eye className="h-4 w-4" />
                Preview
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
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
            {showPrompt ? (
              <div className="space-y-6">
                {/* Prompt Interface */}
                <PromptInterface
                  value={promptValue}
                  onChange={setPromptValue}
                  onSubmit={handlePromptSubmit}
                  suggestions={suggestions}
                />
                
                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-50 text-gray-500">OR</span>
                  </div>
                </div>

                {/* Grain Selection */}
                <GrainSelector
                  grains={GRAIN_OPTIONS}
                  selectedGrain={reportState.selectedGrain}
                  onGrainSelect={handleGrainSelect}
                />
              </div>
            ) : (
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

                {/* Preview Area */}
                {previewData ? (
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                      <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
                      <p className="text-sm text-gray-600">This is how your report will look</p>
                    </div>
                    <ReportCanvas template={previewData} />
                  </div>
                ) : (
                  <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <div className="text-gray-400 mb-4">
                      <Sparkles className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Building Your Report</h3>
                    <p className="text-gray-600">Select metrics and dimensions from the right panel to see a live preview</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Panel - Builder Controls */}
          <div className="col-span-4">
            <BuilderPanel
              reportState={reportState}
              updateReportState={updateReportState}
              selectedGrain={selectedGrain}
              onGrainChange={handleGrainSelect}
              onStartOver={() => {
                setShowPrompt(true);
                setReportState(prev => ({
                  ...prev,
                  selectedGrain: null,
                  selectedMetrics: [],
                  groupBy: null,
                  reportName: '',
                  description: ''
                }));
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
