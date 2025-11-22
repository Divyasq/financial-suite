import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Settings } from 'lucide-react';
import { ReportCategory, StandardReport } from '../../types/standardReports';
import { ReportCard } from './ReportCard';

interface CategorySectionProps {
  category: ReportCategory;
  reports: StandardReport[];
  pinnedReports: string[];
  onTogglePin: (reportId: string) => void;
  onViewReport: (reportId: string) => void;
  onCustomizeReport: (reportId: string) => void;
  onCustomizeCategory?: () => void;
}

export function CategorySection({
  category,
  reports,
  pinnedReports,
  onTogglePin,
  onViewReport,
  onCustomizeReport,
  onCustomizeCategory
}: CategorySectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

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
    <div className="mb-8">
      {/* Category Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-3 text-left group"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{category.icon}</span>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700">
                {category.name}
              </h2>
              <p className="text-sm text-gray-600">{category.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(category.color)}`}>
              {reports.length} reports
            </span>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </button>

        {onCustomizeCategory && (
          <button
            onClick={onCustomizeCategory}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Settings className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Reports Grid */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              isPinned={pinnedReports.includes(report.id)}
              onTogglePin={onTogglePin}
              onViewReport={onViewReport}
              onCustomizeReport={onCustomizeReport}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {isExpanded && reports.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-2">📊</div>
          <p>No reports found in this category</p>
        </div>
      )}
    </div>
  );
}
