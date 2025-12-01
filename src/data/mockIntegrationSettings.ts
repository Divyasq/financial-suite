import { 
  DataSource, 
  IntegrationConfig, 
  DataCorrelation, 
  AlertRule, 
  DataUpload,
  SyncStatus 
} from '../types/integration-settings';

export const mockDataSources: DataSource[] = [
  {
    id: 'weather_openweather',
    name: 'OpenWeatherMap',
    type: 'weather',
    provider: 'OpenWeatherMap API',
    status: 'connected',
    lastSync: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    nextSync: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
    syncFrequency: 'hourly',
    apiEndpoint: 'https://api.openweathermap.org/data/2.5',
    configuration: {
      location: 'San Francisco, CA',
      units: 'imperial',
      includeForecast: true,
      forecastDays: 7
    },
    dataPoints: 168, // 7 days * 24 hours
  },
  {
    id: 'events_eventbrite',
    name: 'Eventbrite',
    type: 'events',
    provider: 'Eventbrite API',
    status: 'connected',
    lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    nextSync: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(),
    syncFrequency: 'daily',
    apiEndpoint: 'https://www.eventbriteapi.com/v3',
    configuration: {
      radius: '5mi',
      categories: ['food-and-drink', 'music', 'sports-and-fitness', 'business'],
      minAttendees: 100
    },
    dataPoints: 47,
  },
  {
    id: 'competitor_yelp',
    name: 'Yelp Business API',
    type: 'competitor',
    provider: 'Yelp Fusion API',
    status: 'connected',
    lastSync: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    nextSync: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(),
    syncFrequency: 'daily',
    apiEndpoint: 'https://api.yelp.com/v3',
    configuration: {
      radius: '2mi',
      categories: 'restaurants',
      priceRange: '$,$$,$$$',
      minReviews: 50
    },
    dataPoints: 23,
  },
  {
    id: 'economic_fred',
    name: 'Federal Reserve Economic Data',
    type: 'economic',
    provider: 'FRED API',
    status: 'connected',
    lastSync: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    nextSync: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    syncFrequency: 'weekly',
    apiEndpoint: 'https://api.stlouisfed.org/fred',
    configuration: {
      indicators: ['UNRATE', 'CPIAUCSL', 'PAYEMS'],
      region: 'CA',
      frequency: 'monthly'
    },
    dataPoints: 36, // 3 years of monthly data
  },
  {
    id: 'social_twitter',
    name: 'Twitter Sentiment',
    type: 'social',
    provider: 'Twitter API v2',
    status: 'error',
    lastSync: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    nextSync: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    syncFrequency: 'hourly',
    apiEndpoint: 'https://api.twitter.com/2',
    configuration: {
      keywords: ['restaurant', 'dining', 'food delivery'],
      location: 'San Francisco',
      sentimentAnalysis: true
    },
    dataPoints: 0,
    errorMessage: 'API rate limit exceeded. Retrying in 1 hour.'
  }
];

export const mockIntegrationConfigs: IntegrationConfig[] = [
  {
    id: 'external_data',
    category: 'external-data',
    name: 'External Data Integration',
    description: 'Weather, events, and market data for enhanced business insights',
    icon: '🌤️',
    enabled: true,
    dataSources: mockDataSources.filter(ds => ['weather', 'events', 'economic', 'social'].includes(ds.type)),
    settings: {
      autoCorrelation: true,
      alertThreshold: 0.7,
      forecastDays: 7,
      dataRetention: 90
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'inventory_systems',
    category: 'inventory',
    name: 'Inventory Management',
    description: 'Integration with BevSpot, MarketMan, and other inventory systems',
    icon: '📦',
    enabled: false,
    dataSources: [
      {
        id: 'bevspot_api',
        name: 'BevSpot',
        type: 'inventory',
        provider: 'BevSpot API',
        status: 'disconnected',
        lastSync: '',
        nextSync: '',
        syncFrequency: 'daily',
        configuration: {
          syncInventory: true,
          syncPricing: true,
          syncWaste: true
        },
        dataPoints: 0
      },
      {
        id: 'marketman_api',
        name: 'MarketMan',
        type: 'inventory',
        provider: 'MarketMan API',
        status: 'disconnected',
        lastSync: '',
        nextSync: '',
        syncFrequency: 'daily',
        configuration: {
          syncIngredients: true,
          syncRecipes: true,
          syncCosts: true
        },
        dataPoints: 0
      }
    ],
    settings: {
      costingMethod: 'FIFO',
      wasteThreshold: 5,
      reorderPoint: 20,
      autoReorder: false
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'pos_integration',
    category: 'pos',
    name: 'POS System Integration',
    description: 'Real-time sales data from Square, Toast, and other POS systems',
    icon: '💳',
    enabled: true,
    dataSources: [
      {
        id: 'square_pos',
        name: 'Square POS',
        type: 'pos' as any,
        provider: 'Square API',
        status: 'connected',
        lastSync: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        nextSync: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
        syncFrequency: 'realtime',
        configuration: {
          syncTransactions: true,
          syncInventory: true,
          syncCustomers: false
        },
        dataPoints: 1247
      }
    ],
    settings: {
      realtimeSync: true,
      batchSize: 100,
      retryAttempts: 3
    },
    lastUpdated: new Date().toISOString()
  }
];

export const mockDataCorrelations: DataCorrelation[] = [
  {
    id: 'weather_sales_correlation',
    primaryMetric: 'Daily Sales Revenue',
    externalFactor: 'Temperature',
    correlationScore: 0.73,
    confidence: 0.89,
    sampleSize: 90,
    timeframe: 'Last 3 months',
    insights: [
      'Sales increase 2.3% for every 10°F above 65°F',
      'Optimal temperature range: 70-80°F shows highest sales',
      'Rainy days reduce sales by average of 15%'
    ],
    enabled: true
  },
  {
    id: 'events_foottraffic_correlation',
    primaryMetric: 'Foot Traffic',
    externalFactor: 'Local Events (within 1 mile)',
    correlationScore: 0.84,
    confidence: 0.92,
    sampleSize: 45,
    timeframe: 'Last 6 months',
    insights: [
      'Events with 1000+ attendees increase foot traffic by 35%',
      'Sports events have highest impact on evening sales',
      'Food festivals can increase sales by up to 60%'
    ],
    enabled: true
  },
  {
    id: 'economic_spending_correlation',
    primaryMetric: 'Average Transaction Value',
    externalFactor: 'Local Employment Rate',
    correlationScore: 0.67,
    confidence: 0.78,
    sampleSize: 24,
    timeframe: 'Last 2 years',
    insights: [
      '1% increase in employment correlates with 3% higher spending',
      'Economic confidence affects premium item sales',
      'Discretionary spending follows employment trends with 2-month lag'
    ],
    enabled: true
  }
];

export const mockAlertRules: AlertRule[] = [
  {
    id: 'weather_storm_alert',
    name: 'Severe Weather Alert',
    description: 'Alert when severe weather is forecasted',
    dataSource: 'weather_openweather',
    condition: {
      metric: 'weather_severity',
      operator: '>=',
      threshold: 7,
      timeframe: 'next_24_hours'
    },
    actions: [
      {
        type: 'email',
        target: 'manager@restaurant.com',
        message: 'Severe weather forecasted. Consider adjusting staffing and inventory.'
      },
      {
        type: 'dashboard',
        target: 'action_center',
        message: 'Severe weather alert - Review staffing and delivery operations'
      }
    ],
    enabled: true,
    lastTriggered: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'high_impact_event_alert',
    name: 'High Impact Event Alert',
    description: 'Alert when major events are detected nearby',
    dataSource: 'events_eventbrite',
    condition: {
      metric: 'event_attendees',
      operator: '>',
      threshold: 5000,
      timeframe: 'next_7_days'
    },
    actions: [
      {
        type: 'email',
        target: 'operations@restaurant.com',
        message: 'Major event detected. Prepare for increased demand.'
      }
    ],
    enabled: true
  }
];

export const mockDataUploads: DataUpload[] = [
  {
    id: 'upload_1',
    name: 'Historical Weather Data',
    type: 'csv',
    source: 'weather_backup_2024.csv',
    status: 'completed',
    uploadedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    processedAt: new Date(Date.now() - 2 * 60 * 60 * 1000 + 5 * 60 * 1000).toISOString(),
    recordsCount: 8760, // 1 year hourly data
    errorCount: 0
  },
  {
    id: 'upload_2',
    name: 'Local Events Database',
    type: 'json',
    source: 'events_q4_2024.json',
    status: 'processing',
    uploadedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    recordsCount: 0,
    errorCount: 0
  },
  {
    id: 'upload_3',
    name: 'Competitor Pricing Data',
    type: 'csv',
    source: 'competitor_prices.csv',
    status: 'failed',
    uploadedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    processedAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    recordsCount: 0,
    errorCount: 15,
    errors: [
      'Invalid price format in row 23',
      'Missing restaurant ID in row 45',
      'Duplicate entry for restaurant "Mario\'s Bistro"'
    ]
  }
];

export const mockSyncStatuses: SyncStatus[] = [
  {
    dataSourceId: 'weather_openweather',
    status: 'success',
    lastSync: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    nextSync: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
    recordsProcessed: 24,
    recordsSkipped: 0,
    errors: [],
    duration: 2.3
  },
  {
    dataSourceId: 'events_eventbrite',
    status: 'partial',
    lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    nextSync: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(),
    recordsProcessed: 15,
    recordsSkipped: 3,
    errors: ['Event "Summer Festival" missing location data'],
    duration: 5.7
  },
  {
    dataSourceId: 'social_twitter',
    status: 'failed',
    lastSync: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    nextSync: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    recordsProcessed: 0,
    recordsSkipped: 0,
    errors: ['API rate limit exceeded', 'Authentication failed'],
    duration: 0.1
  }
];
