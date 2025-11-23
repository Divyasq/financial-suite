import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { X, Settings, Eye, EyeOff, GripVertical, RotateCcw } from 'lucide-react';
import { ReportCategory, BusinessTypePreset, StandardReport, UserPreferences } from '../../types/standardReports';

interface CategoryCustomizationPanelProps {
  categories: ReportCategory[];
  reports: StandardReport[];
  preferences: UserPreferences;
  businessTypePresets: BusinessTypePreset[];
  selectedBusinessType: string;
  onToggleVisibility: (categoryId: string) => void;
  onToggleReportVisibility: (reportId: string) => void;
  onReorderCategories: (startIndex: number, endIndex: number) => void;
  onApplyPreset: (presetId: string) => void;
  onReset: () => void;
  onClose: () => void;
}

export function CategoryCustomizationPanel({
  categories,
  reports,
  preferences,
  businessTypePresets,
  selectedBusinessType,
  onToggleVisibility,
  onToggleReportVisibility,
  onReorderCategories,
  onApplyPreset,
  onReset,
  onClose
}: CategoryCustomizationPanelProps) {
  const [activeTab, setActiveTab] = useState<'organize' | 'presets'>('organize');

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    onReorderCategories(result.source.index, result.destination.index);
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.icon || '📊';
  };

  const getCategoryColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200',
      indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      red: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Settings className="h-6 w-6 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-900">Customize Categories</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('organize')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'organize'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Organize Categories
          </button>
          <button
            onClick={() => setActiveTab('presets')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'presets'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Business Type Presets
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {activeTab === 'organize' && (
            <div className="space-y-6">
              <p className="text-sm text-gray-600 mb-4">
                Show or hide individual reports by category. Changes are saved automatically.
              </p>

              {categories.map((category) => {
                const categoryReports = reports.filter(report => report.category === category.id);
                const hiddenReports = preferences.hiddenReports || [];
                
                return (
                  <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Category Header */}
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{category.icon}</span>
                          <div>
                            <h3 className="font-medium text-gray-900">{category.name}</h3>
                            <p className="text-sm text-gray-500">
                              {categoryReports.length - hiddenReports.filter(id => 
                                categoryReports.some(r => r.id === id)
                              ).length} of {categoryReports.length} reports visible
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => onToggleVisibility(category.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            category.isVisible
                              ? 'text-blue-600 hover:bg-blue-100'
                              : 'text-gray-400 hover:bg-gray-200'
                          }`}
                        >
                          {category.isVisible ? (
                            <Eye className="h-5 w-5" />
                          ) : (
                            <EyeOff className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    {/* Reports List */}
                    {category.isVisible && (
                      <div className="divide-y divide-gray-100">
                        {categoryReports.map((report) => (
                          <div key={report.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-lg">{report.icon}</span>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-900">{report.name}</h4>
                                  <p className="text-xs text-gray-500">{report.description}</p>
                                </div>
                              </div>
                              <button
                                onClick={() => onToggleReportVisibility(report.id)}
                                className={`p-1.5 rounded transition-colors ${
                                  !hiddenReports.includes(report.id)
                                    ? 'text-green-600 hover:bg-green-100'
                                    : 'text-gray-400 hover:bg-gray-200'
                                }`}
                              >
                                {!hiddenReports.includes(report.id) ? (
                                  <Eye className="h-4 w-4" />
                                ) : (
                                  <EyeOff className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'presets' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                Quick setup based on your business type. This will show/hide categories and pin recommended reports.
              </p>

              <div className="grid grid-cols-1 gap-3">
                {businessTypePresets.map((preset) => (
                  <div
                    key={preset.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedBusinessType === preset.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => onApplyPreset(preset.id)}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{preset.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{preset.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{preset.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {preset.categories.map((categoryId) => (
                            <span
                              key={categoryId}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                            >
                              <span>{getCategoryIcon(categoryId)}</span>
                              {categories.find(cat => cat.id === categoryId)?.name}
                            </span>
                          ))}
                        </div>
                      </div>
                      {selectedBusinessType === preset.id && (
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Reset to Defaults
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
