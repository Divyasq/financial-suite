import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Settings, 
  Zap, 
  Database, 
  Upload, 
  Download, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Clock,
  Play,
  Pause,
  Trash2,
  Plus,
  Eye,
  EyeOff,
  Link,
  Unlink,
  Activity
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import {
  mockIntegrationConfigs,
  mockDataCorrelations,
  mockAlertRules,
  mockDataUploads,
  mockSyncStatuses
} from '../data/mockIntegrationSettings';
import {
  IntegrationConfig,
  DataSource,
  DataCorrelation,
  AlertRule,
  DataUpload,
  SyncStatus
} from '../types/integration-settings';

export function IntegrationSettingsPage() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'sources' | 'correlations' | 'alerts' | 'uploads'>('overview');
  const [integrations, setIntegrations] = useState<IntegrationConfig[]>(mockIntegrationConfigs);
  const [correlations, setCorrelations] = useState<DataCorrelation[]>(mockDataCorrelations);
  const [alertRules, setAlertRules] = useState<AlertRule[]>(mockAlertRules);
  const [uploads, setUploads] = useState<DataUpload[]>(mockDataUploads);
  const [syncStatuses, setSyncStatuses] = useState<SyncStatus[]>(mockSyncStatuses);
  const [showApiKeys, setShowApiKeys] = useState<Record<string, boolean>>({});
  const [showAddIntegrationModal, setShowAddIntegrationModal] = useState(false);

  // Handle URL tab parameter
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['overview', 'sources', 'correlations', 'alerts', 'uploads'].includes(tab)) {
      setActiveTab(tab as any);
    }
  }, [searchParams]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': case 'success': case 'completed': return 'text-green-600 bg-green-50';
      case 'error': case 'failed': return 'text-red-600 bg-red-50';
      case 'pending': case 'processing': case 'partial': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': case 'success': case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'error': case 'failed': return <XCircle className="h-4 w-4" />;
      case 'pending': case 'processing': case 'partial': return <Clock className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const toggleIntegration = (id: string) => {
    setIntegrations(prev => prev.map(integration =>
      integration.id === id ? { ...integration, enabled: !integration.enabled } : integration
    ));
  };

  const toggleApiKeyVisibility = (sourceId: string) => {
    setShowApiKeys(prev => ({ ...prev, [sourceId]: !prev[sourceId] }));
  };

  const syncDataSource = (sourceId: string) => {
    // Mock sync operation
    console.log(`Syncing data source: ${sourceId}`);
  };

  const testConnection = (sourceId: string) => {
    // Mock connection test
    console.log(`Testing connection for: ${sourceId}`);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Integration Settings</h1>
          <p className="text-gray-600 mt-1">
            Manage external data sources, API connections, and integration settings
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Sync All
          </Button>
          <Button 
            onClick={() => setShowAddIntegrationModal(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Integration
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'sources', label: 'Data Sources', icon: Database },
            { id: 'correlations', label: 'Correlations', icon: Zap },
            { id: 'alerts', label: 'Alert Rules', icon: AlertTriangle },
            { id: 'uploads', label: 'Data Uploads', icon: Upload }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Integration Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {integrations.map(integration => (
              <div key={integration.id} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{integration.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                      <p className="text-sm text-gray-600">{integration.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleIntegration(integration.id)}
                    className={`p-2 rounded-full ${
                      integration.enabled ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {integration.enabled ? <Link className="h-4 w-4" /> : <Unlink className="h-4 w-4" />}
                  </button>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Data Sources:</span>
                    <span className="font-medium">{integration.dataSources.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Status:</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      integration.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {integration.enabled ? 'Active' : 'Disabled'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Last Updated:</span>
                    <span className="text-gray-600">
                      {new Date(integration.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {integrations.flatMap(i => i.dataSources).filter(ds => ds.status === 'connected').length}
              </div>
              <div className="text-sm text-gray-600">Connected Sources</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{correlations.length}</div>
              <div className="text-sm text-gray-600">Active Correlations</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {alertRules.filter(rule => rule.enabled).length}
              </div>
              <div className="text-sm text-gray-600">Alert Rules</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {uploads.filter(u => u.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-600">Successful Uploads</div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Recent Sync Activity</h3>
            <div className="space-y-4">
              {syncStatuses.slice(0, 5).map((sync, index) => {
                const dataSource = integrations
                  .flatMap(i => i.dataSources)
                  .find(ds => ds.id === sync.dataSourceId);
                
                return (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${getStatusColor(sync.status)}`}>
                        {getStatusIcon(sync.status)}
                      </div>
                      <div>
                        <div className="font-medium">{dataSource?.name || 'Unknown Source'}</div>
                        <div className="text-sm text-gray-600">
                          {sync.recordsProcessed} records processed
                          {sync.recordsSkipped > 0 && `, ${sync.recordsSkipped} skipped`}
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <div>{new Date(sync.lastSync).toLocaleTimeString()}</div>
                      <div>{sync.duration}s</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Data Sources Tab */}
      {activeTab === 'sources' && (
        <div className="space-y-6">
          {integrations.map(integration => (
            <div key={integration.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{integration.icon}</span>
                  <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                </div>
                <button
                  onClick={() => toggleIntegration(integration.id)}
                  className={`px-3 py-1 rounded text-sm ${
                    integration.enabled 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {integration.enabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              <div className="space-y-4">
                {integration.dataSources.map(source => (
                  <div key={source.id} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{source.name}</h4>
                        <p className="text-sm text-gray-600">{source.provider}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(source.status)}`}>
                          {source.status}
                        </span>
                        <Button variant="ghost" size="sm" onClick={() => syncDataSource(source.id)}>
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => testConnection(source.id)}>
                          <Zap className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Sync Frequency:</span>
                        <div className="font-medium capitalize">{source.syncFrequency}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Data Points:</span>
                        <div className="font-medium">{source.dataPoints.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Last Sync:</span>
                        <div className="font-medium">
                          {source.lastSync ? new Date(source.lastSync).toLocaleTimeString() : 'Never'}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Next Sync:</span>
                        <div className="font-medium">
                          {source.nextSync ? new Date(source.nextSync).toLocaleTimeString() : 'N/A'}
                        </div>
                      </div>
                    </div>

                    {source.apiEndpoint && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">API Endpoint:</span>
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {source.apiEndpoint}
                          </code>
                        </div>
                        {source.apiKey && (
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-gray-500">API Key:</span>
                            <div className="flex items-center gap-2">
                              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                                {showApiKeys[source.id] ? source.apiKey : '••••••••••••••••'}
                              </code>
                              <button
                                onClick={() => toggleApiKeyVisibility(source.id)}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                {showApiKeys[source.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {source.errorMessage && (
                      <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center gap-2 text-red-800">
                          <XCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">Error:</span>
                        </div>
                        <p className="text-sm text-red-700 mt-1">{source.errorMessage}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Correlations Tab */}
      {activeTab === 'correlations' && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Data Correlations</h3>
            <div className="space-y-4">
              {correlations.map(correlation => (
                <div key={correlation.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {correlation.primaryMetric} ↔ {correlation.externalFactor}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span>Correlation: {Math.round(correlation.correlationScore * 100)}%</span>
                        <span>Confidence: {Math.round(correlation.confidence * 100)}%</span>
                        <span>Sample: {correlation.sampleSize} data points</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setCorrelations(prev => 
                        prev.map(c => c.id === correlation.id ? {...c, enabled: !c.enabled} : c)
                      )}
                      className={`px-3 py-1 rounded text-sm ${
                        correlation.enabled 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {correlation.enabled ? 'Active' : 'Disabled'}
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-700">Key Insights:</div>
                    <ul className="space-y-1">
                      {correlation.insights.map((insight, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Alert Rules Tab */}
      {activeTab === 'alerts' && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Alert Rules</h3>
            <div className="space-y-4">
              {alertRules.map(rule => (
                <div key={rule.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{rule.name}</h4>
                      <p className="text-sm text-gray-600">{rule.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setAlertRules(prev => 
                          prev.map(r => r.id === rule.id ? {...r, enabled: !r.enabled} : r)
                        )}
                        className={`px-3 py-1 rounded text-sm ${
                          rule.enabled 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {rule.enabled ? 'Active' : 'Disabled'}
                      </button>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Condition:</span>
                      <div className="font-medium">
                        {rule.condition.metric} {rule.condition.operator} {rule.condition.threshold}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">Actions:</span>
                      <div className="font-medium">{rule.actions.length} configured</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Last Triggered:</span>
                      <div className="font-medium">
                        {rule.lastTriggered 
                          ? new Date(rule.lastTriggered).toLocaleDateString()
                          : 'Never'
                        }
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Data Uploads Tab */}
      {activeTab === 'uploads' && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Data Uploads</h3>
              <Button className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload Data
              </Button>
            </div>
            
            <div className="space-y-4">
              {uploads.map(upload => (
                <div key={upload.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{upload.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span>Type: {upload.type.toUpperCase()}</span>
                        <span>Source: {upload.source}</span>
                        <span>Uploaded: {new Date(upload.uploadedAt).toLocaleString()}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(upload.status)}`}>
                      {upload.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Records:</span>
                      <div className="font-medium">{upload.recordsCount.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Errors:</span>
                      <div className={`font-medium ${upload.errorCount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {upload.errorCount}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">Processed:</span>
                      <div className="font-medium">
                        {upload.processedAt 
                          ? new Date(upload.processedAt).toLocaleTimeString()
                          : 'Pending'
                        }
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">Duration:</span>
                      <div className="font-medium">
                        {upload.processedAt && upload.uploadedAt
                          ? `${Math.round((new Date(upload.processedAt).getTime() - new Date(upload.uploadedAt).getTime()) / 1000)}s`
                          : 'N/A'
                        }
                      </div>
                    </div>
                  </div>

                  {upload.errors && upload.errors.length > 0 && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="text-sm font-medium text-red-800 mb-2">Errors:</div>
                      <ul className="space-y-1">
                        {upload.errors.map((error, index) => (
                          <li key={index} className="text-sm text-red-700">• {error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Integration Modal */}
      {showAddIntegrationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Add New Integration</h2>
              <button
                onClick={() => setShowAddIntegrationModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Integration Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Integration Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'weather', name: 'Weather Data', icon: '🌤️', description: 'OpenWeatherMap, WeatherAPI' },
                    { id: 'events', name: 'Local Events', icon: '📅', description: 'Eventbrite, Facebook Events' },
                    { id: 'social', name: 'Social Media', icon: '📱', description: 'Twitter, Instagram, Yelp' },
                    { id: 'economic', name: 'Economic Data', icon: '📊', description: 'FRED, Yahoo Finance' },
                    { id: 'inventory', name: 'Inventory System', icon: '📦', description: 'BevSpot, MarketMan' },
                    { id: 'pos', name: 'POS System', icon: '💳', description: 'Square, Toast, Clover' }
                  ].map(type => (
                    <div
                      key={type.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{type.icon}</span>
                        <div>
                          <h3 className="font-medium text-gray-900">{type.name}</h3>
                          <p className="text-sm text-gray-600">{type.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Configuration Form */}
              <div className="border-t pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Integration Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Weather API Integration"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Provider
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Select a provider...</option>
                      <option>OpenWeatherMap</option>
                      <option>WeatherAPI</option>
                      <option>Eventbrite</option>
                      <option>Facebook Events</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      API Endpoint
                    </label>
                    <input
                      type="url"
                      placeholder="https://api.example.com/v1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      API Key
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your API key"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sync Frequency
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Hourly</option>
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Manual</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Retention (days)
                    </label>
                    <input
                      type="number"
                      defaultValue={30}
                      min={1}
                      max={365}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={() => setShowAddIntegrationModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    // Mock integration creation
                    console.log('Creating new integration...');
                    setShowAddIntegrationModal(false);
                    // Show success message
                    setTimeout(() => {
                      alert('Integration created successfully!');
                    }, 100);
                  }}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Create Integration
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
