import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight } from 'lucide-react';
import { PromptSuggestion } from '../../types/customBuilder';

interface PromptInterfaceProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (prompt: string) => void;
  suggestions: PromptSuggestion[];
}

export function PromptInterface({ value, onChange, onSubmit, suggestions }: PromptInterfaceProps) {
  const [showSuggestions, setShowSuggestions] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value.trim());
    }
  };

  const handleSuggestionClick = (suggestion: PromptSuggestion) => {
    onChange(suggestion.text);
    onSubmit(suggestion.text);
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full mb-4">
          <Sparkles className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-700">AI-Powered Report Builder</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">What do you want to analyze?</h3>
        <p className="text-gray-600">Describe your analysis in plain English, and we'll build the perfect report for you</p>
      </div>

      {/* Prompt Input */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={handleInputFocus}
            placeholder="e.g., Show me top selling items by category..."
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
          <button
            type="submit"
            disabled={!value.trim()}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <ArrowRight className={`h-5 w-5 ${value.trim() ? 'text-blue-600 hover:text-blue-700' : 'text-gray-400'}`} />
          </button>
        </div>
      </form>

      {/* Suggestions */}
      {showSuggestions && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Popular Analysis Ideas:</h4>
          <div className="grid grid-cols-1 gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
              >
                <div className="flex-1">
                  <div className="font-medium text-gray-900 group-hover:text-blue-700">
                    {suggestion.text}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {suggestion.description}
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Examples */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Example Prompts:</h4>
        <div className="space-y-1 text-sm text-gray-600">
          <div>• "Compare payment methods by total collected"</div>
          <div>• "Show employee performance with sales per hour"</div>
          <div>• "Analyze customer spending by loyalty status"</div>
          <div>• "Top modifiers by quantity sold"</div>
        </div>
      </div>
    </div>
  );
}
