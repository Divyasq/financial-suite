import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { ParsedPrompt } from '../types/customBuilder';
import { GRAIN_OPTIONS, PROMPT_SUGGESTIONS, PROMPT_PATTERNS } from '../data/customBuilderData';
import { GrainSelector } from '../components/customBuilder/GrainSelector';
import { PromptInterface } from '../components/customBuilder/PromptInterface';

export function CustomBuilderPage() {
  console.log('CustomBuilderPage: Component loaded');
  const navigate = useNavigate();
  
  const [promptValue, setPromptValue] = useState('');
  const [suggestions] = useState(PROMPT_SUGGESTIONS);

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
      // Navigate to builder with prompt data
      const params = new URLSearchParams({
        grain: parsed.grain,
        metrics: parsed.metrics.join(','),
        groupBy: parsed.groupBy,
        name: prompt.charAt(0).toUpperCase() + prompt.slice(1)
      });
      navigate(`/financial-suite/custom-reports/builder?${params.toString()}`);
    }
  };

  // Handle grain selection
  const handleGrainSelect = (grainId: string) => {
    const grain = GRAIN_OPTIONS.find(g => g.id === grainId);
    if (grain) {
      // Navigate to builder with grain data
      const params = new URLSearchParams({
        grain: grainId,
        name: `${grain.name} Analysis`
      });
      navigate(`/financial-suite/custom-reports/builder?${params.toString()}`);
    }
  };



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
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
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Side-by-Side Layout */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Prompt Interface */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Describe Your Report</h2>
                <p className="text-gray-600 mb-6">Tell us what you want to analyze and we'll build it for you</p>
              </div>
              
              <PromptInterface
                value={promptValue}
                onChange={setPromptValue}
                onSubmit={handlePromptSubmit}
                suggestions={suggestions}
              />
            </div>

            {/* Mobile Divider - Show between sections on mobile only */}
            <div className="lg:hidden relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 py-1 bg-gray-50 text-gray-500 font-medium">OR</span>
              </div>
            </div>

            {/* Right Side - Data Source Selection */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Choose Your Data Source</h2>
                <p className="text-gray-600 mb-6">Select what type of data you want to analyze</p>
              </div>
              
              <GrainSelector
                grains={GRAIN_OPTIONS}
                selectedGrain={null}
                onGrainSelect={handleGrainSelect}
              />
            </div>
          </div>

          {/* Vertical Divider - Only show on large screens */}
          <div className="hidden lg:flex absolute left-1/2 top-0 bottom-0 items-center justify-center transform -translate-x-1/2">
            <div className="flex flex-col items-center h-full justify-center">
              <div className="w-px h-24 bg-gray-300" />
              <div className="px-3 py-2 bg-gray-50 text-gray-500 text-sm font-medium rounded-full border shadow-sm">
                OR
              </div>
              <div className="w-px h-24 bg-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
