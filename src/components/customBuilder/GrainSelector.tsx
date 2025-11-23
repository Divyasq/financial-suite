import React from 'react';
import { GrainOption } from '../../types/customBuilder';

interface GrainSelectorProps {
  grains: GrainOption[];
  selectedGrain: string | null;
  onGrainSelect: (grainId: string) => void;
}

export function GrainSelector({ grains, selectedGrain, onGrainSelect }: GrainSelectorProps) {
  const getColorClasses = (color: string, isSelected: boolean) => {
    const colorMap = {
      blue: isSelected 
        ? 'bg-blue-50 border-blue-200 text-blue-700' 
        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50',
      green: isSelected 
        ? 'bg-green-50 border-green-200 text-green-700' 
        : 'border-gray-200 hover:border-green-300 hover:bg-green-50',
      purple: isSelected 
        ? 'bg-purple-50 border-purple-200 text-purple-700' 
        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50',
      indigo: isSelected 
        ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
        : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50',
      orange: isSelected 
        ? 'bg-orange-50 border-orange-200 text-orange-700' 
        : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50',
      red: isSelected 
        ? 'bg-red-50 border-red-200 text-red-700' 
        : 'border-gray-200 hover:border-red-300 hover:bg-red-50',
      yellow: isSelected 
        ? 'bg-yellow-50 border-yellow-200 text-yellow-700' 
        : 'border-gray-200 hover:border-yellow-300 hover:bg-yellow-50'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose Your Data Source</h3>
        <p className="text-gray-600">What type of data do you want to analyze?</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {grains.map((grain) => {
          const isSelected = selectedGrain === grain.id;
          return (
            <button
              key={grain.id}
              onClick={() => onGrainSelect(grain.id)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${getColorClasses(grain.color, isSelected)}`}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{grain.icon}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 mb-1">{grain.name}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">{grain.description}</p>
                  
                  {/* Metrics count */}
                  <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                    <span>{grain.metrics.reduce((acc, group) => acc + group.metrics.length, 0)} metrics</span>
                    <span>{grain.dimensions.reduce((acc, group) => acc + group.dimensions.length, 0)} dimensions</span>
                  </div>
                  
                  {/* Join capabilities */}
                  {grain.canJoinWith.length > 0 && (
                    <div className="mt-2">
                      <span className="text-xs text-gray-500">
                        Can join with: {grain.canJoinWith.slice(0, 2).join(', ')}
                        {grain.canJoinWith.length > 2 && ` +${grain.canJoinWith.length - 2} more`}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Help text */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="text-blue-500">💡</div>
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Not sure which to choose?</h4>
            <p className="text-sm text-blue-700">
              Start with <strong>Orders</strong> for sales analysis, <strong>Items</strong> for product performance, 
              or <strong>Customers</strong> for behavior insights. You can always join data sources later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
