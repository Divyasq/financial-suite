import React, { useState, useEffect } from 'react';
import { Plus, Mail, FileText, Calendar, Play, Pause, Trash2, Download, Search, Filter, Grid, List } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ScheduledExport, CreateScheduledExportData } from '../types/scheduled-exports';
import { mockScheduledExports } from '../data/mockScheduledExports';

export function ScheduledExportsPage() {
  const [exports, setExports] = useState<ScheduledExport[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [frequencyFilter, setFrequencyFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  useEffect(() => {
    // Load from localStorage or use mock data
    const saved = localStorage.getItem('scheduledExports');
    if (saved) {
      setExports(JSON.parse(saved));
    } else {
      setExports(mockScheduledExports);
      localStorage.setItem('scheduledExports', JSON.stringify(mockScheduledExports));
    }
  }, []);

  const saveExports = (newExports: ScheduledExport[]) => {
    setExports(newExports);
    localStorage.setItem('scheduledExports', JSON.stringify(newExports));
  };

  const toggleExportStatus = (id: string) => {
    const updated = exports.map(exp => 
      exp.id === id 
        ? { ...exp, isActive: !exp.isActive, status: exp.isActive ? 'paused' : 'active' as const }
        : exp
    );
    saveExports(updated);
  };

  const deleteExport = (id: string) => {
    const updated = exports.filter(exp => exp.id !== id);
    saveExports(updated);
    showToast('Scheduled export deleted', 'success');
  };

  const runExportNow = (exportItem: ScheduledExport) => {
    showToast(`Generating ${exportItem.format.toUpperCase()} export...`, 'info');
    
    setTimeout(() => {
      showToast(`${exportItem.reportType} export sent to ${exportItem.email}`, 'success');
      
      // Update last run time
      const updated = exports.map(exp => 
        exp.id === exportItem.id 
          ? { ...exp, lastRun: new Date().toISOString().split('T')[0] }
          : exp
      );
      saveExports(updated);
    }, 2000);
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter exports based on search and filters
  const filteredExports = exports.filter(exportItem => {
    const matchesSearch = exportItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exportItem.reportType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exportItem.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || exportItem.status === statusFilter;
    const matchesFrequency = frequencyFilter === 'all' || exportItem.frequency === frequencyFilter;
    
    return matchesSearch && matchesStatus && matchesFrequency;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Scheduled Exports</h1>
          <p className="text-gray-600 mt-1">Automatically export reports via email</p>
        </div>
        <Button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Schedule Export
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search exports by name, report type, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="failed">Failed</option>
            </select>

            <select
              value={frequencyFilter}
              onChange={(e) => setFrequencyFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Frequencies</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>

            <div className="flex border border-gray-300 rounded-md">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
                title="List view"
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 border-l border-gray-300 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
                title="Grid view"
              >
                <Grid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
          <span>{filteredExports.length} of {exports.length} exports</span>
          <span>{filteredExports.filter(e => e.status === 'active').length} active</span>
          <span>{filteredExports.filter(e => e.status === 'paused').length} paused</span>
        </div>
      </div>

      {/* Export List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
        {filteredExports.map((exportItem) => (
          <div key={exportItem.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{exportItem.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {exportItem.frequency}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {exportItem.email}
                    </span>
                    <span className="uppercase font-medium">
                      {exportItem.format}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(exportItem.status)}`}>
                  {exportItem.status}
                </span>
                
                <div className="text-right text-sm text-gray-600">
                  <div>Next: {new Date(exportItem.nextRun).toLocaleDateString()}</div>
                  {exportItem.lastRun && (
                    <div>Last: {new Date(exportItem.lastRun).toLocaleDateString()}</div>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => runExportNow(exportItem)}
                    className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700"
                    title="Run now"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExportStatus(exportItem.id)}
                    className="h-8 w-8 p-0"
                    title={exportItem.isActive ? "Pause" : "Resume"}
                  >
                    {exportItem.isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteExport(exportItem.id)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty States */}
      {exports.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No scheduled exports</h3>
          <p className="text-gray-600 mb-4">Create your first scheduled export to automatically receive reports via email.</p>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Schedule Export
          </Button>
        </div>
      )}

      {exports.length > 0 && filteredExports.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No exports match your filters</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search terms or filters to find what you're looking for.</p>
          <div className="flex justify-center gap-3">
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setFrequencyFilter('all');
              }}
            >
              Clear Filters
            </Button>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Export
            </Button>
          </div>
        </div>
      )}

      {showCreateModal && (
        <CreateExportModal 
          onClose={() => setShowCreateModal(false)}
          onSave={(data) => {
            const newExport: ScheduledExport = {
              id: Date.now().toString(),
              ...data,
              isActive: true,
              createdAt: new Date().toISOString().split('T')[0],
              nextRun: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              status: 'active'
            };
            saveExports([...exports, newExport]);
            setShowCreateModal(false);
            showToast('Scheduled export created successfully!', 'success');
          }}
        />
      )}

      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg max-w-sm ${
          toast.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
          toast.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
          'bg-blue-50 border-blue-200 text-blue-800'
        }`}>
          <span className="flex-1 text-sm font-medium">{toast.message}</span>
          <button onClick={() => setToast(null)} className="p-1 hover:bg-white/20 rounded">
            ×
          </button>
        </div>
      )}
    </div>
  );
}

function CreateExportModal({ onClose, onSave }: {
  onClose: () => void;
  onSave: (data: CreateScheduledExportData) => void;
}) {
  const [formData, setFormData] = useState<CreateScheduledExportData>({
    name: '',
    reportType: 'Sales Summary',
    frequency: 'weekly',
    format: 'pdf',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Schedule Export</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Export Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="e.g., Weekly Sales Report"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Report Type
            </label>
            <select
              value={formData.reportType}
              onChange={(e) => setFormData({...formData, reportType: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <optgroup label="📊 Sales Reports">
                <option>Sales Summary</option>
                <option>Sales by Category</option>
                <option>Sales by Location</option>
                <option>Sales Trends</option>
                <option>Item Performance</option>
              </optgroup>
              <optgroup label="💰 Financial Reports">
                <option>Reconciliation</option>
                <option>Cash Summary</option>
                <option>Payment Methods</option>
                <option>Tax Summary</option>
                <option>Profit & Loss</option>
              </optgroup>
              <optgroup label="👥 Operations Reports">
                <option>Labor Summary</option>
                <option>Service Performance</option>
                <option>Void Analysis</option>
                <option>Discount Analysis</option>
                <option>Customer Analytics</option>
              </optgroup>
              <optgroup label="📈 Custom Reports">
                <option>Weekly Performance Dashboard</option>
                <option>Monthly Business Review</option>
                <option>Custom Report</option>
              </optgroup>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Frequency
            </label>
            <select
              value={formData.frequency}
              onChange={(e) => setFormData({...formData, frequency: e.target.value as any})}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Format
            </label>
            <select
              value={formData.format}
              onChange={(e) => setFormData({...formData, format: e.target.value as any})}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="pdf">PDF</option>
              <option value="csv">CSV</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="manager@business.com"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Schedule Export
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
