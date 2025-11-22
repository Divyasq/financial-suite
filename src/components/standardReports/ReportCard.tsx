import React, { useState } from 'react';
import { Star, Settings, Eye, Users, Clock, TrendingUp } from 'lucide-react';
import { StandardReport } from '../../types/standardReports';

interface ReportCardProps {
  report: StandardReport;
  isPinned: boolean;
  onTogglePin: (reportId: string) => void;
  onViewReport: (reportId: string) => void;
  onCustomizeReport: (reportId: string) => void;
}

export function ReportCard({
  report,
  isPinned,
  onTogglePin,
  onViewReport,
  onCustomizeReport
}: ReportCardProps) {
  const [showViews, setShowViews] = useState(false);

  const formatUsageCount = (count: number) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  const formatLastUsed = (date?: Date) => {
    if (!date) return 'Never';
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          <div className="text-2xl">{report.icon}</div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{report.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{report.description}</p>
          </div>
        </div>
        
        <button
          onClick={() => onTogglePin(report.id)}
          className={`p-1.5 rounded-lg transition-colors ${
            isPinned
              ? 'text-yellow-500 hover:bg-yellow-50'
              : 'text-gray-400 hover:text-yellow-500 hover:bg-gray-50'
          }`}
        >
          <Star className={`h-4 w-4 ${isPinned ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Usage Stats */}
      <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <TrendingUp className="h-3 w-3" />
          <span>{formatUsageCount(report.usageCount || 0)} uses</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{formatLastUsed(report.lastUsed)}</span>
        </div>
        {report.hasCustomViews && (
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>Custom views</span>
          </div>
        )}
      </div>

      {/* Views Section */}
      {report.hasCustomViews && (
        <div className="mb-4">
          <button
            onClick={() => setShowViews(!showViews)}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            {showViews ? 'Hide views' : 'Show views'} ({report.views?.length || 3})
          </button>
          
          {showViews && (
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded text-xs">
                <span className="flex items-center gap-2">
                  <Eye className="h-3 w-3" />
                  Default View
                </span>
                <button className="text-blue-600 hover:text-blue-800">View</button>
              </div>
              <div className="flex items-center justify-between p-2 bg-blue-50 rounded text-xs">
                <span className="flex items-center gap-2">
                  <Users className="h-3 w-3" />
                  My View (Jan 15)
                </span>
                <button className="text-blue-600 hover:text-blue-800">View</button>
              </div>
              <div className="flex items-center justify-between p-2 bg-green-50 rounded text-xs">
                <span className="flex items-center gap-2">
                  <Users className="h-3 w-3" />
                  Team: "With Profit" (shared)
                </span>
                <button className="text-blue-600 hover:text-blue-800">View</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onViewReport(report.id)}
          className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          View Report
        </button>
        <button
          onClick={() => onCustomizeReport(report.id)}
          className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-1"
        >
          <Settings className="h-4 w-4" />
          Customize
        </button>
      </div>

      {/* Save View Button (appears on hover for default reports) */}
      {!report.hasCustomViews && (
        <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-full text-xs text-gray-500 hover:text-gray-700 py-1">
            + Save as Custom View
          </button>
        </div>
      )}
    </div>
  );
}
