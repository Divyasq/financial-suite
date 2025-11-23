import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download, Filter, Calendar, MapPin, Users, Settings } from 'lucide-react';
import { ReportData, REPORT_GRAINS, REPORT_TEMPLATES } from '../../types/reportData';
import { generateMockReportData, formatReportValue, generateReportSummary } from '../../utils/mockReportData';

interface ReportViewProps {
  reportId: string;
  onBack?: () => void;
}

export function ReportView({ reportId, onBack }: ReportViewProps) {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    // Simulate loading delay
    setLoading(true);
    setTimeout(() => {
      const data = generateMockReportData(reportId);
      setReportData(data);
      setSortColumn(data.selectedMetrics[0]); // Sort by first metric by default
      setLoading(false);
    }, 800);
  }, [reportId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading report data...</p>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Report not found</p>
        </div>
      </div>
    );
  }

  const template = REPORT_TEMPLATES[reportId];
  const grain = REPORT_GRAINS[reportData.grain];
  const summary = generateReportSummary(reportData);

  // Pagination
  const totalPages = Math.ceil(reportData.data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = reportData.data.slice(startIndex, endIndex);

  // Sorting
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const sortedData = [...currentData].sort((a, b) => {
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];
    
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    }
    
    const aStr = String(aVal || '').toLowerCase();
    const bStr = String(bVal || '').toLowerCase();
    
    if (sortDirection === 'asc') {
      return aStr.localeCompare(bStr);
    } else {
      return bStr.localeCompare(aStr);
    }
  });

  const groupByDimension = grain.dimensions.find(d => d.id === reportData.groupByDimension);
  const selectedMetrics = reportData.selectedMetrics.map(id => grain.metrics.find(m => m.id === id)).filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
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
                <h1 className="text-3xl font-bold text-gray-900">{reportData.reportName}</h1>
                <p className="text-gray-600 mt-1">{template?.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="h-4 w-4" />
                Export
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Settings className="h-4 w-4" />
                Customize
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
              <Calendar className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-700">This month</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
              <MapPin className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-700">All locations</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
              <span className="text-sm text-gray-700">Group by: {groupByDimension?.name}</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
              <span className="text-sm text-gray-700">Metrics: {selectedMetrics?.length} selected</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4" />
              Filter by
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {selectedMetrics?.slice(0, 4).map((metric) => {
              if (!metric) return null;
              const summaryData = summary[metric.id];
              return (
                <div key={metric.id} className="bg-white p-4 rounded-lg border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">{metric.name}</h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatReportValue(summaryData?.total, metric.id, reportData.grain)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Avg: {formatReportValue(summaryData?.average, metric.id, reportData.grain)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Report Table */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort(reportData.groupByDimension)}
                  >
                    <div className="flex items-center gap-2">
                      {groupByDimension?.name}
                      {sortColumn === reportData.groupByDimension && (
                        <span className="text-blue-600">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  {selectedMetrics?.map((metric) => (
                    <th 
                      key={metric?.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => metric && handleSort(metric.id)}
                    >
                      <div className="flex items-center gap-2">
                        {metric?.name}
                        {sortColumn === metric?.id && (
                          <span className="text-blue-600">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {row[reportData.groupByDimension]}
                      </div>
                    </td>
                    {selectedMetrics?.map((metric) => (
                      <td key={metric?.id} className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {metric && formatReportValue(row[metric.id], metric.id, reportData.grain)}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(endIndex, reportData.data.length)}</span> of{' '}
                  <span className="font-medium">{reportData.data.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === pageNum
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
