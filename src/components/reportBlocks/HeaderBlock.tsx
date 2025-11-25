import React, { useState } from 'react';
import { ChevronLeft, Download, Printer, Share2, Save, Settings, Sparkles } from 'lucide-react';
import { HeaderBlockConfig } from '../../types/reportBlocks';
import { AISummarizerModal } from './AISummarizerModal';

interface HeaderBlockProps {
  config: HeaderBlockConfig;
  reportData?: any;
  reportType?: string;
  reportGrain?: string;
  onBack?: () => void;
  onExport?: () => void;
  onPrint?: () => void;
  onShare?: () => void;
  onSave?: () => void;
  onCustomize?: () => void;
}

export function HeaderBlock({
  config,
  reportData,
  reportType = 'analysis',
  reportGrain = 'orders',
  onBack,
  onExport,
  onPrint,
  onShare,
  onSave,
  onCustomize
}: HeaderBlockProps) {
  const [showAISummarizer, setShowAISummarizer] = useState(false);

  const handleOptionClick = (option: string) => {
    switch (option) {
      case 'export':
        onExport?.();
        break;
      case 'print':
        onPrint?.();
        break;
      case 'share':
        onShare?.();
        break;
      case 'save':
        onSave?.();
        break;
      case 'customize':
        onCustomize?.();
        break;
      case 'ai-insights':
        setShowAISummarizer(true);
        break;
    }
  };

  const getOptionIcon = (option: string) => {
    switch (option) {
      case 'export':
        return <Download className="h-4 w-4" />;
      case 'print':
        return <Printer className="h-4 w-4" />;
      case 'share':
        return <Share2 className="h-4 w-4" />;
      case 'save':
        return <Save className="h-4 w-4" />;
      case 'customize':
        return <Settings className="h-4 w-4" />;
      case 'ai-insights':
        return <Sparkles className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getOptionLabel = (option: string) => {
    switch (option) {
      case 'export':
        return 'Export';
      case 'print':
        return 'Print';
      case 'share':
        return 'Share';
      case 'save':
        return 'Save';
      case 'customize':
        return 'Customize';
      case 'ai-insights':
        return 'AI Insights';
      default:
        return option;
    }
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{config.title}</h1>
              <div className="flex items-center gap-4 mt-1">
                <p className="text-gray-600">{config.description}</p>
                {config.showDataFreshness && (
                  <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">
                    Updated 2 min ago
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* AI Insights Button - Always visible */}
            <button
              onClick={() => setShowAISummarizer(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
            >
              <Sparkles className="h-4 w-4" />
              AI Insights
            </button>

            {config.showOptions && (
              <>
                {config.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionClick(option)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      option === 'customize'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'text-gray-600 hover:text-gray-800 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {getOptionIcon(option)}
                    {getOptionLabel(option)}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {/* AI Summarizer Modal */}
      <AISummarizerModal
        isOpen={showAISummarizer}
        onClose={() => setShowAISummarizer(false)}
        reportTitle={config.title}
        reportData={reportData}
        reportType={reportType}
        reportGrain={reportGrain}
      />
    </div>
  );
}
