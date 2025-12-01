import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  DollarSign, 
  AlertCircle,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Cloud,
  Thermometer,
  Zap,
  RefreshCw
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import {
  mockForecastData,
  mockSeasonalTrends,
  mockBudgetPlan,
  mockIngredients
} from '../data/mockIngredientTracking';

export function ForecastingPage() {
  const [activeTab, setActiveTab] = useState<'price-trends' | 'seasonal' | 'demand' | 'budget'>('price-trends');
  const [timeHorizon, setTimeHorizon] = useState<'week' | 'month' | 'quarter'>('month');

  // Calculate forecast summary metrics
  const avgConfidence = mockForecastData.reduce((sum, f) => sum + f.confidence, 0) / mockForecastData.length;
  const upwardTrends = mockForecastData.filter(f => f.trendDirection === 'up').length;
  const downwardTrends = mockForecastData.filter(f => f.trendDirection === 'down').length;
  const stableTrends = mockForecastData.filter(f => f.trendDirection === 'stable').length;

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600 bg-green-50';
    if (confidence >= 0.6) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'up': return <TrendingUp className="h-4 w-4 text-red-600" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-green-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getFactorIcon = (type: string) => {
    switch (type) {
      case 'weather': return <Cloud className="h-4 w-4" />;
      case 'seasonal': return <Calendar className="h-4 w-4" />;
      case 'market': return <BarChart3 className="h-4 w-4" />;
      case 'demand': return <Target className="h-4 w-4" />;
      case 'supply_chain': return <Zap className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ingredient Price Forecasting</h1>
          <p className="text-gray-600 mt-1">
            Predictive analytics for ingredient costs, seasonal trends, and budget planning
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={timeHorizon}
            onChange={(e) => setTimeHorizon(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">1 Week</option>
            <option value="month">1 Month</option>
            <option value="quarter">3 Months</option>
          </select>
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Update Forecasts
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Confidence</p>
              <p className="text-2xl font-bold text-gray-900">{(avgConfidence * 100).toFixed(0)}%</p>
            </div>
            <Target className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Forecast accuracy</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Price Increases</p>
              <p className="text-2xl font-bold text-red-600">{upwardTrends}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-red-600" />
          </div>
          <p className="text-xs text-red-500 mt-2">Ingredients trending up</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Price Decreases</p>
              <p className="text-2xl font-bold text-green-600">{downwardTrends}</p>
            </div>
            <TrendingDown className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-xs text-green-500 mt-2">Ingredients trending down</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Stable Prices</p>
              <p className="text-2xl font-bold text-gray-600">{stableTrends}</p>
            </div>
            <Activity className="h-8 w-8 text-gray-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Minimal price change</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'price-trends', label: 'Price Trends', icon: TrendingUp },
            { id: 'seasonal', label: 'Seasonal Analysis', icon: Calendar },
            { id: 'demand', label: 'Demand Forecasting', icon: Target },
            { id: 'budget', label: 'Budget Planning', icon: DollarSign }
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

      {/* Price Trends Tab */}
      {activeTab === 'price-trends' && (
        <div className="space-y-6">
          {/* Forecast Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockForecastData.map((forecast, index) => {
              const ingredient = mockIngredients.find(ing => ing.id === forecast.ingredientId);
              const currentPrice = ingredient?.costPerUnit || 0;
              const priceChange = forecast.predictedPrice - currentPrice;
              const percentChange = (priceChange / currentPrice) * 100;

              return (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{ingredient?.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">{ingredient?.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(forecast.trendDirection)}
                      <span className={`px-2 py-1 rounded text-xs ${getConfidenceColor(forecast.confidence)}`}>
                        {(forecast.confidence * 100).toFixed(0)}% confidence
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Current Price</p>
                      <p className="text-lg font-bold text-gray-900">${currentPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Predicted Price</p>
                      <p className={`text-lg font-bold ${
                        priceChange > 0 ? 'text-red-600' : priceChange < 0 ? 'text-green-600' : 'text-gray-900'
                      }`}>
                        ${forecast.predictedPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Price Change</span>
                      <span className={`font-medium ${
                        priceChange > 0 ? 'text-red-600' : priceChange < 0 ? 'text-green-600' : 'text-gray-600'
                      }`}>
                        {priceChange > 0 ? '+' : ''}{priceChange.toFixed(2)} ({percentChange > 0 ? '+' : ''}{percentChange.toFixed(1)}%)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Key Factors:</p>
                    {forecast.factors.slice(0, 3).map((factor, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          {getFactorIcon(factor.type)}
                          <span className="text-gray-600 capitalize">{factor.type.replace('_', ' ')}</span>
                        </div>
                        <span className={`font-medium ${
                          factor.impact > 0 ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {factor.impact > 0 ? '+' : ''}{factor.impact}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Forecast Chart Placeholder */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Price Trend Visualization</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Interactive price trend charts</p>
                <p className="text-sm text-gray-500">Historical data + forecasted prices</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Seasonal Analysis Tab */}
      {activeTab === 'seasonal' && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Seasonal Price Patterns</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockSeasonalTrends.reduce((acc, trend) => {
                const existing = acc.find(item => item.ingredientId === trend.ingredientId);
                if (existing) {
                  existing.seasons.push(trend);
                } else {
                  acc.push({ ingredientId: trend.ingredientId, seasons: [trend] });
                }
                return acc;
              }, [] as any[]).map((item, index) => {
                const ingredient = mockIngredients.find(ing => ing.id === item.ingredientId);
                const seasons = ['spring', 'summer', 'fall', 'winter'];
                
                return (
                  <div key={index} className="border border-gray-100 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">{ingredient?.name}</h4>
                    
                    <div className="space-y-2">
                      {seasons.map(season => {
                        const seasonData = item.seasons.find((s: any) => s.season === season);
                        const currentPrice = ingredient?.costPerUnit || 0;
                        const seasonPrice = seasonData?.averagePrice || currentPrice;
                        const priceChange = ((seasonPrice - currentPrice) / currentPrice) * 100;
                        
                        return (
                          <div key={season} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center gap-2">
                              <span className="capitalize font-medium text-sm">{season}</span>
                              <span className={`px-2 py-1 rounded text-xs ${
                                seasonData?.availability === 'high' ? 'bg-green-100 text-green-800' :
                                seasonData?.availability === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {seasonData?.availability || 'unknown'}
                              </span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">${seasonPrice.toFixed(2)}</div>
                              <div className={`text-xs ${
                                priceChange > 0 ? 'text-red-600' : priceChange < 0 ? 'text-green-600' : 'text-gray-600'
                              }`}>
                                {priceChange > 0 ? '+' : ''}{priceChange.toFixed(1)}%
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Seasonal Recommendations */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Seasonal Purchasing Recommendations</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <TrendingDown className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900">Stock Up on Summer Produce</h4>
                  <p className="text-sm text-green-700">Tomatoes are 32% cheaper in summer. Consider preserving or menu planning.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900">Winter Price Spikes Expected</h4>
                  <p className="text-sm text-yellow-700">Leafy greens typically increase 25% in winter. Plan menu adjustments.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Budget Planning Tab */}
      {activeTab === 'budget' && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">{mockBudgetPlan.name}</h3>
              <span className={`px-3 py-1 rounded text-sm ${
                mockBudgetPlan.variance < 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {mockBudgetPlan.variance > 0 ? '+' : ''}{mockBudgetPlan.variance.toFixed(1)}% variance
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <p className="text-sm text-gray-500">Total Budget</p>
                <p className="text-2xl font-bold text-gray-900">${mockBudgetPlan.totalBudget.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Actual Spend</p>
                <p className="text-2xl font-bold text-blue-600">${mockBudgetPlan.actualSpend.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Remaining</p>
                <p className="text-2xl font-bold text-green-600">
                  ${(mockBudgetPlan.totalBudget - mockBudgetPlan.actualSpend).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {mockBudgetPlan.categories.map((category, index) => (
                <div key={index} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{category.category}</h4>
                    <span className={`px-2 py-1 rounded text-xs ${
                      category.variance < 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {category.variance > 0 ? '+' : ''}{category.variance.toFixed(1)}%
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Budget: ${category.budgetAmount.toLocaleString()}</span>
                    <span>Actual: ${category.actualAmount.toLocaleString()}</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        category.variance < 0 ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min((category.actualAmount / category.budgetAmount) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Forecast */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Next Quarter Forecast</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Budget vs Actual Spending Trends</p>
                <p className="text-sm text-gray-500">Projected costs based on current usage</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Demand Forecasting Tab */}
      {activeTab === 'demand' && (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Demand Forecasting</h3>
          <p className="text-gray-600 mb-4">
            Predict ingredient demand based on sales patterns, seasonality, and external factors.
          </p>
          <Button>Coming Soon</Button>
        </div>
      )}
    </div>
  );
}
