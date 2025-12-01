import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  MapPin,
  Clock,
  Users,
  DollarSign,
  Zap,
  Eye,
  RefreshCw
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import {
  mockWeatherData,
  mockLocalEvents,
  mockWeatherImpacts,
  mockEventImpacts,
  mockExternalDataInsights,
  mockBusinessForecasts,
  mockCompetitorData,
  mockMarketTrends,
  mockEconomicIndicators
} from '../data/mockExternalData';
import {
  WeatherData,
  LocalEvent,
  ExternalDataInsight,
  BusinessForecast,
  CompetitorData,
  MarketTrend,
  EconomicIndicator
} from '../types/external-data';

export function ExternalDataPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'weather' | 'events' | 'market' | 'insights'>('overview');
  const [weatherData, setWeatherData] = useState<WeatherData[]>(mockWeatherData);
  const [events, setEvents] = useState<LocalEvent[]>(mockLocalEvents);
  const [insights, setInsights] = useState<ExternalDataInsight[]>(mockExternalDataInsights);
  const [forecasts, setForecasts] = useState<BusinessForecast[]>(mockBusinessForecasts);
  const [competitors, setCompetitors] = useState<CompetitorData[]>(mockCompetitorData);
  const [trends, setTrends] = useState<MarketTrend[]>(mockMarketTrends);
  const [economicData, setEconomicData] = useState<EconomicIndicator[]>(mockEconomicIndicators);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const currentWeather = weatherData[weatherData.length - 1];
  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());
  const criticalInsights = insights.filter(insight => insight.impact !== 'neutral');

  const refreshData = () => {
    setLastUpdated(new Date());
    // In a real app, this would fetch fresh data from APIs
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'text-green-600 bg-green-50';
      case 'negative': return 'text-red-600 bg-red-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive': return <TrendingUp className="h-4 w-4" />;
      case 'negative': return <TrendingDown className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'rising': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'falling': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">External Data Integration</h1>
          <p className="text-gray-600 mt-1">
            Weather, events, and market data to enhance business insights
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
          <Button onClick={refreshData} variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: Eye },
            { id: 'weather', label: 'Weather Impact', icon: Cloud },
            { id: 'events', label: 'Local Events', icon: Calendar },
            { id: 'market', label: 'Market Data', icon: TrendingUp },
            { id: 'insights', label: 'AI Insights', icon: Zap }
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
          {/* Current Conditions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Current Weather */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Current Weather</h3>
                <span className="text-2xl">{currentWeather?.icon}</span>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold">{currentWeather?.temperature}°F</div>
                <div className="text-sm text-gray-600 capitalize">{currentWeather?.condition}</div>
                <div className="text-xs text-gray-500">{currentWeather?.description}</div>
              </div>
            </div>

            {/* Next Event */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Next Major Event</h3>
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              {upcomingEvents[0] && (
                <div className="space-y-2">
                  <div className="font-medium">{upcomingEvents[0].title}</div>
                  <div className="text-sm text-gray-600">
                    {new Date(upcomingEvents[0].date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Users className="h-3 w-3" />
                    {upcomingEvents[0].attendeeCount.toLocaleString()} expected
                  </div>
                </div>
              )}
            </div>

            {/* Business Forecast */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Today's Forecast</h3>
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              {forecasts[0] && (
                <div className="space-y-2">
                  <div className="text-2xl font-bold">
                    ${forecasts[0].predictedSales.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    {Math.round(forecasts[0].confidence * 100)}% confidence
                  </div>
                  <div className="text-xs text-gray-500">
                    Based on weather, events & historical data
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Critical Insights */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Critical Insights & Recommendations</h3>
            <div className="space-y-4">
              {criticalInsights.slice(0, 3).map(insight => (
                <div key={insight.id} className="flex items-start gap-3 p-4 rounded-lg border border-gray-100">
                  <div className={`p-2 rounded-full ${getImpactColor(insight.impact)}`}>
                    {getImpactIcon(insight.impact)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{insight.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                    <div className="mt-2">
                      <span className="text-xs text-gray-500">
                        Confidence: {Math.round(insight.confidence * 100)}%
                      </span>
                      {insight.actionable && (
                        <span className="ml-3 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Actionable
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{upcomingEvents.length}</div>
              <div className="text-sm text-gray-600">Upcoming Events</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {trends.filter(t => t.trend === 'rising').length}
              </div>
              <div className="text-sm text-gray-600">Rising Trends</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{competitors.length}</div>
              <div className="text-sm text-gray-600">Tracked Competitors</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {insights.filter(i => i.actionable).length}
              </div>
              <div className="text-sm text-gray-600">Actionable Insights</div>
            </div>
          </div>
        </div>
      )}

      {/* Weather Tab */}
      {activeTab === 'weather' && (
        <div className="space-y-6">
          {/* Weather Impact Analysis */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Weather Impact on Sales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockWeatherImpacts.map(impact => (
                <div key={impact.condition} className="p-4 border border-gray-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="capitalize font-medium">{impact.condition}</span>
                    <span className="text-2xl">
                      {mockWeatherData.find(w => w.condition === impact.condition)?.icon}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className={`text-lg font-bold ${
                      impact.avgSalesMultiplier > 1 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {impact.avgSalesMultiplier > 1 ? '+' : ''}
                      {Math.round((impact.avgSalesMultiplier - 1) * 100)}%
                    </div>
                    <div className="text-xs text-gray-500">
                      {Math.round(impact.confidence * 100)}% confidence
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7-Day Weather Forecast */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">7-Day Business Forecast</h3>
            <div className="space-y-4">
              {forecasts.slice(0, 7).map((forecast, index) => (
                <div key={forecast.date} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-sm font-medium w-20">
                      {index === 0 ? 'Today' : new Date(forecast.date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {mockWeatherData.find(w => w.condition === forecast.factors.weather.condition)?.icon}
                      </span>
                      <span className="text-sm text-gray-600 capitalize">
                        {forecast.factors.weather.condition}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-medium">${forecast.predictedSales.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">
                        {Math.round(forecast.confidence * 100)}% confidence
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs ${
                      forecast.factors.weather.impact > 0.05 ? 'bg-green-100 text-green-800' :
                      forecast.factors.weather.impact < -0.05 ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {forecast.factors.weather.impact > 0.05 ? 'Weather Boost' :
                       forecast.factors.weather.impact < -0.05 ? 'Weather Impact' : 'Normal'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Events Tab */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          {/* Event Impact Analysis */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Event Impact Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockEventImpacts.map(impact => (
                <div key={impact.category} className="p-4 border border-gray-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="capitalize font-medium">{impact.category}</span>
                    <span className="text-lg">
                      {impact.category === 'sports' ? '🏀' :
                       impact.category === 'concert' ? '🎵' :
                       impact.category === 'festival' ? '🎪' : '🏢'}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg font-bold text-green-600">
                      +{Math.round((impact.avgSalesMultiplier - 1) * 100)}%
                    </div>
                    <div className="text-xs text-gray-500">
                      {Math.round(impact.confidence * 100)}% confidence
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Upcoming Local Events</h3>
            <div className="space-y-4">
              {upcomingEvents.map(event => (
                <div key={event.id} className="flex items-start gap-4 p-4 border border-gray-100 rounded-lg">
                  <div className="text-2xl">
                    {event.category === 'sports' ? '🏀' :
                     event.category === 'concert' ? '🎵' :
                     event.category === 'festival' ? '🎪' :
                     event.category === 'business' ? '🏢' : '📅'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {event.startTime} - {event.endTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.distance} mi away
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {event.attendeeCount.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs ${
                        event.impact === 'high' ? 'bg-red-100 text-red-800' :
                        event.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {event.impact} impact
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Market Tab */}
      {activeTab === 'market' && (
        <div className="space-y-6">
          {/* Market Trends */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Market Trends</h3>
            <div className="space-y-4">
              {trends.map(trend => (
                <div key={trend.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getTrendIcon(trend.trend)}
                    <div>
                      <div className="font-medium">{trend.category}</div>
                      <div className="text-sm text-gray-600">{trend.description}</div>
                      <div className="text-xs text-gray-500">{trend.source} • {trend.timeframe}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${
                      trend.trend === 'rising' ? 'text-green-600' : 
                      trend.trend === 'falling' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {trend.trend === 'rising' ? '+' : trend.trend === 'falling' ? '-' : ''}
                      {Math.abs(trend.changePercent)}%
                    </div>
                    <div className="text-xs text-gray-500">
                      {Math.round(trend.relevance * 100)}% relevant
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Economic Indicators */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Economic Indicators</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {economicData.map(indicator => (
                <div key={indicator.id} className="p-4 border border-gray-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{indicator.name}</span>
                    <div className={`p-1 rounded-full ${getImpactColor(indicator.impact)}`}>
                      {getImpactIcon(indicator.impact)}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg font-bold">{indicator.value}</div>
                    <div className={`text-sm ${
                      indicator.change > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {indicator.change > 0 ? '+' : ''}{indicator.change} ({indicator.changePercent > 0 ? '+' : ''}{indicator.changePercent}%)
                    </div>
                    <div className="text-xs text-gray-500">{indicator.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Competitor Analysis */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Competitor Analysis</h3>
            <div className="space-y-4">
              {competitors.map(competitor => (
                <div key={competitor.id} className="p-4 border border-gray-100 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{competitor.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span>{competitor.priceRange}</span>
                        <span>⭐ {competitor.rating} ({competitor.reviewCount} reviews)</span>
                        <span>{competitor.distance} mi away</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium mb-2">Menu Highlights</div>
                      <div className="flex flex-wrap gap-1">
                        {competitor.menuHighlights.map((item, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-2">Current Promotions</div>
                      <div className="space-y-1">
                        {competitor.promotions.map((promo, index) => (
                          <div key={index} className="text-xs text-gray-600">• {promo}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* AI Insights Tab */}
      {activeTab === 'insights' && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">AI-Generated Insights & Recommendations</h3>
            <div className="space-y-6">
              {insights.map(insight => (
                <div key={insight.id} className="border border-gray-100 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${getImpactColor(insight.impact)}`}>
                        {getImpactIcon(insight.impact)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{insight.title}</h4>
                        <p className="text-gray-600 mt-1">{insight.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        {Math.round(insight.confidence * 100)}% confidence
                      </span>
                      {insight.actionable && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Actionable
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {insight.recommendations.length > 0 && (
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Recommendations:</h5>
                      <ul className="space-y-1">
                        {insight.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {insight.data && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <div className="text-xs text-gray-600">
                        Additional Data: {JSON.stringify(insight.data, null, 2)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
