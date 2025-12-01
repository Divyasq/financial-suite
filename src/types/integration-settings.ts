// Integration Settings Types

export interface DataSource {
  id: string;
  name: string;
  type: 'weather' | 'events' | 'economic' | 'competitor' | 'social' | 'inventory';
  provider: string;
  status: 'connected' | 'disconnected' | 'error' | 'pending';
  lastSync: string;
  nextSync: string;
  syncFrequency: 'realtime' | 'hourly' | 'daily' | 'weekly';
  apiEndpoint?: string;
  apiKey?: string;
  configuration: Record<string, any>;
  dataPoints: number;
  errorMessage?: string;
}

export interface IntegrationConfig {
  id: string;
  category: 'external-data' | 'inventory' | 'pos' | 'marketing' | 'finance';
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
  dataSources: DataSource[];
  settings: Record<string, any>;
  lastUpdated: string;
}

export interface DataCorrelation {
  id: string;
  primaryMetric: string;
  externalFactor: string;
  correlationScore: number;
  confidence: number;
  sampleSize: number;
  timeframe: string;
  insights: string[];
  enabled: boolean;
}

export interface AlertRule {
  id: string;
  name: string;
  description: string;
  dataSource: string;
  condition: {
    metric: string;
    operator: '>' | '<' | '=' | '>=' | '<=' | '!=';
    threshold: number;
    timeframe: string;
  };
  actions: {
    type: 'email' | 'sms' | 'webhook' | 'dashboard';
    target: string;
    message: string;
  }[];
  enabled: boolean;
  lastTriggered?: string;
}

export interface DataUpload {
  id: string;
  name: string;
  type: 'csv' | 'json' | 'xml' | 'api';
  source: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  uploadedAt: string;
  processedAt?: string;
  recordsCount: number;
  errorCount: number;
  errors?: string[];
}

export interface SyncStatus {
  dataSourceId: string;
  status: 'success' | 'partial' | 'failed';
  lastSync: string;
  nextSync: string;
  recordsProcessed: number;
  recordsSkipped: number;
  errors: string[];
  duration: number;
}
