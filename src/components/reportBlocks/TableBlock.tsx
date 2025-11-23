import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowUpDown, Download } from 'lucide-react';
import { TableBlockConfig } from '../../types/reportBlocks';
import { formatReportValue } from '../../utils/mockReportData';

interface TableColumn {
  id: string;
  name: string;
  type: 'string' | 'currency' | 'number' | 'percentage';
  sortable?: boolean;
}

interface TableBlockProps {
  config: TableBlockConfig;
  columns: TableColumn[];
  data: any[];
  grain: string;
  groupByColumn: string;
}

export function TableBlock({ config, columns, data, grain, groupByColumn }: TableBlockProps) {
  const [isCollapsed, setIsCollapsed] = useState(config.defaultCollapsed);
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (columnId: string) => {
    if (!config.sortable) return;
    
    if (sortColumn === columnId) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnId);
      setSortDirection('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;
    
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

  // Pagination
  const totalPages = Math.ceil(sortedData.length / config.pageSize);
  const startIndex = (currentPage - 1) * config.pageSize;
  const endIndex = startIndex + config.pageSize;
  const currentData = config.pagination ? sortedData.slice(startIndex, endIndex) : sortedData;

  // Calculate summary row if needed
  const summaryRow = config.showSummaryRow ? columns.reduce((acc, col) => {
    if (col.type !== 'string' && col.id !== groupByColumn) {
      const values = data.map(row => Number(row[col.id]) || 0);
      acc[col.id] = values.reduce((sum, val) => sum + val, 0);
    } else if (col.id === groupByColumn) {
      acc[col.id] = 'Total';
    }
    return acc;
  }, {} as any) : null;

  if (config.collapsible && isCollapsed) {
    return (
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => setIsCollapsed(false)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronDown className="h-5 w-5" />
            <span className="font-medium">Show Data Table ({data.length} rows)</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Table Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            {config.collapsible && (
              <button
                onClick={() => setIsCollapsed(true)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ChevronUp className="h-5 w-5" />
                <span className="font-medium">Hide Table</span>
              </button>
            )}
            <h3 className="text-lg font-semibold text-gray-900">
              Data Table ({data.length} rows)
            </h3>
          </div>
          
          {config.exportable && (
            <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          )}
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.id}
                      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                        config.sortable && column.sortable !== false ? 'cursor-pointer hover:bg-gray-100' : ''
                      }`}
                      onClick={() => handleSort(column.id)}
                    >
                      <div className="flex items-center gap-2">
                        {column.name}
                        {config.sortable && column.sortable !== false && (
                          <ArrowUpDown className="h-4 w-4 text-gray-400" />
                        )}
                        {sortColumn === column.id && (
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
                {currentData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {columns.map((column) => (
                      <td key={column.id} className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${
                          column.id === groupByColumn ? 'font-medium text-gray-900' : 'text-gray-900'
                        }`}>
                          {column.type === 'string' 
                            ? row[column.id]
                            : formatReportValue(row[column.id], column.id, grain)
                          }
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
                
                {/* Summary Row */}
                {summaryRow && (
                  <tr className="bg-gray-50 border-t-2 border-gray-200">
                    {columns.map((column) => (
                      <td key={column.id} className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          {column.type === 'string' && column.id === groupByColumn
                            ? summaryRow[column.id]
                            : summaryRow[column.id] !== undefined
                            ? formatReportValue(summaryRow[column.id], column.id, grain)
                            : ''
                          }
                        </div>
                      </td>
                    ))}
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {config.pagination && totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(endIndex, data.length)}</span> of{' '}
                  <span className="font-medium">{data.length}</span> results
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
