import React from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useDeferredSales } from '../../context/DeferredSalesContext';

export function DeferredSalesNavigation() {
  const navigate = useNavigate();
  const { scenarioGroups, selectedGroup, setSelectedGroup, setSelectedScenario } = useDeferredSales();

  const handleGroupSelect = (group: any) => {
    setSelectedGroup(group);
    setSelectedScenario(null);
  };

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 h-full overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="h-8 w-8 p-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="font-semibold text-gray-900">Deferred Sales</h2>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="p-2">
        {scenarioGroups.map((group) => (
          <div key={group.id} className="mb-1">
            <button
              onClick={() => handleGroupSelect(group)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                selectedGroup?.id === group.id
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{group.title}</span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </button>
            
            {/* Scenarios within Group */}
            {selectedGroup?.id === group.id && (
              <div className="ml-4 mt-1 space-y-1">
                {group.scenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => setSelectedScenario(scenario)}
                    className="w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors text-gray-600 hover:bg-gray-100"
                  >
                    {scenario.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
