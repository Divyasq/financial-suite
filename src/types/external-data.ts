// External Data Integration Types

export interface WeatherData {
  id: string;
  date: string;
  temperature: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'snowy' | 'foggy';
  humidity: number;
  windSpeed: number;
  precipitation: number;
  uvIndex: number;
  visibility: number;
  description: string;
  icon: string;
}

export interface LocalEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  category: 'sports' | 'concert' | 'festival' | 'conference' | 'holiday' | 'local' | 'business';
  attendeeCount: number;
  distance: number; // miles from restaurant
  impact: 'high' | 'medium' | 'low';
  source: string;
}

export interface SalesCorrelation {
  date: string;
  sales: number;
  weather: WeatherData;
  events: LocalEvent[];
  correlationScore: number;
  insights: string[];
}

export interface WeatherImpact {
  condition: string;
  avgSalesMultiplier: number;
  confidence: number;
  sampleSize: number;
  insights: string[];
}

export interface EventImpact {
  category: string;
  avgSalesMultiplier: number;
  confidence: number;
  sampleSize: number;
  insights: string[];
}

export interface ExternalDataInsight {
  id: string;
  type: 'weather' | 'event' | 'correlation' | 'forecast';
  title: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
  confidence: number;
  actionable: boolean;
  recommendations: string[];
  data: any;
  createdAt: string;
}

export interface BusinessForecast {
  date: string;
  predictedSales: number;
  confidence: number;
  factors: {
    weather: {
      condition: string;
      impact: number;
    };
    events: {
      count: number;
      impact: number;
    };
    historical: {
      dayOfWeek: string;
      seasonality: number;
    };
  };
  recommendations: string[];
}

export interface CompetitorData {
  id: string;
  name: string;
  distance: number;
  priceRange: string;
  rating: number;
  reviewCount: number;
  popularTimes: { [hour: string]: number };
  menuHighlights: string[];
  promotions: string[];
  lastUpdated: string;
}

export interface MarketTrend {
  id: string;
  category: string;
  trend: 'rising' | 'falling' | 'stable';
  changePercent: number;
  timeframe: string;
  description: string;
  source: string;
  relevance: number;
}

export interface EconomicIndicator {
  id: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
  lastUpdated: string;
}
