import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Brain,
  Target,
  BarChart3,
  PieChart,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';
import {
  mockLaborForecasts,
  mockStaffingOptimizations,
  mockCustomerAnalytics,
  mockCohortAnalysis,
  mockSalesForecasts,
  mockScenarioPlanning,
  mockPredictiveModels,
  mockAdvancedAnalyticsMetrics
} from '../data/mockAdvancedAnalytics';

export function AdvancedAnalyticsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'labor-forecasting', label: 'Labor Forecasting', icon: Users },
    { id: 'customer-analytics', label: 'Customer Analytics', icon: Target },
    { id: 'sales-forecasting', label: 'Sales Forecasting', icon: TrendingUp },
    { id: 'scenario-planning', label: 'Scenario Planning', icon: Brain }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Brain className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-green-600">
              {(mockAdvancedAnalyticsMetrics.forecastAccuracy * 100).toFixed(1)}%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Forecast Accuracy</h3>
          <p className="text-2xl font-bold text-gray-900">87%</p>
          <p className="text-sm text-gray-500">Across all models</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+$12.4K</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Cost Savings</h3>
          <p className="text-2xl font-bold text-gray-900">${mockAdvancedAnalyticsMetrics.costSavings.toLocaleString()}</p>
          <p className="text-sm text-gray-500">This month</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-blue-600">{mockAdvancedAnalyticsMetrics.insightsGenerated}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">AI Insights</h3>
          <p className="text-2xl font-bold text-gray-900">47</p>
          <p className="text-sm text-gray-500">Generated this month</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Activity className="h-6 w-6 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-orange-600">{mockAdvancedAnalyticsMetrics.actionsTaken}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Actions Taken</h3>
          <p className="text-2xl font-bold text-gray-900">23</p>
          <p className="text-sm text-gray-500">From AI recommendations</p>
        </div>
      </div>

      {/* Model Performance */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Model Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(mockAdvancedAnalyticsMetrics.modelPerformance).map(([model, accuracy]) => (
            <div key={model} className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-3">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#3b82f6"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${accuracy * 251.2} 251.2`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-900">{(accuracy * 100).toFixed(0)}%</span>
                </div>
              </div>
              <h4 className="font-medium text-gray-900 capitalize">{model}</h4>
              <p className="text-sm text-gray-500">Model Accuracy</p>
            </div>
          ))}
        </div>
      </div>

      {/* Active Models */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Predictive Models</h3>
        <div className="space-y-4">
          {mockPredictiveModels.map((model) => (
            <div key={model.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{model.name}</h4>
                <p className="text-sm text-gray-600">{model.description}</p>
                <div className="flex items-center mt-2 space-x-4">
                  <span className="text-sm text-gray-500">
                    Accuracy: <span className="font-medium text-green-600">{(model.accuracy * 100).toFixed(1)}%</span>
                  </span>
                  <span className="text-sm text-gray-500">
                    Last trained: {model.lastTrained}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  model.accuracy > 0.85 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {model.accuracy > 0.85 ? 'Excellent' : 'Good'}
                </span>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLaborForecasting = () => (
    <div className="space-y-6">
      {/* Labor Forecast Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Labor Forecast</h3>
          <div className="space-y-4">
            {mockLaborForecasts.map((forecast) => (
              <div key={forecast.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{forecast.dayOfWeek}</h4>
                  <p className="text-sm text-gray-600">
                    Predicted Sales: ${forecast.predictedSales.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Labor %: {forecast.laborPercentage}%
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    ${forecast.laborCostForecast.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {Object.values(forecast.recommendedStaff).reduce((a, b) => a + b, 0)} staff
                  </p>
                  <div className="flex items-center mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-xs text-gray-500">
                      {(forecast.confidence * 100).toFixed(0)}% confidence
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Staffing Optimizations</h3>
          <div className="space-y-4">
            {mockStaffingOptimizations.map((optimization) => (
              <div key={optimization.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900 capitalize">{optimization.shift} Shift</h4>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    optimization.potentialSavings > 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {optimization.potentialSavings > 0 ? '+' : ''}${optimization.potentialSavings}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{optimization.recommendation}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-700">Current</p>
                    <p className="text-gray-600">
                      Servers: {optimization.currentStaffing.servers}, 
                      Kitchen: {optimization.currentStaffing.kitchen}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Optimal</p>
                    <p className="text-gray-600">
                      Servers: {optimization.optimalStaffing.servers}, 
                      Kitchen: {optimization.optimalStaffing.kitchen}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCustomerAnalytics = () => (
    <div className="space-y-6">
      {/* Customer Segments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Analytics</h3>
          <div className="space-y-4">
            {mockCustomerAnalytics.map((customer) => (
              <div key={customer.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-3 ${
                      customer.customerSegment === 'high-value' 
                        ? 'bg-purple-100 text-purple-800'
                        : customer.customerSegment === 'at-risk'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {customer.customerSegment.replace('-', ' ')}
                    </span>
                    <h4 className="font-medium text-gray-900">Customer {customer.customerId.slice(-5)}</h4>
                  </div>
                  <span className="font-bold text-gray-900">${customer.clv.toLocaleString()}</span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">CLV</p>
                    <p className="font-medium">${customer.clv.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Churn Risk</p>
                    <p className={`font-medium ${
                      customer.churnProbability > 0.5 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {(customer.churnProbability * 100).toFixed(0)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Avg Spend</p>
                    <p className="font-medium">${customer.averageSpend}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Frequency</p>
                    <p className="font-medium">{customer.visitFrequency}x/month</p>
                  </div>
                </div>
                
                {customer.recommendedActions.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-2">Recommended Actions:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {customer.recommendedActions.map((action, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cohort Analysis</h3>
          <div className="space-y-4">
            {mockCohortAnalysis.map((cohort) => (
              <div key={cohort.cohortMonth} className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">{cohort.cohortMonth} Cohort</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Customers:</span>
                    <span className="font-medium">{cohort.customersAcquired}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">12M Retention:</span>
                    <span className="font-medium">{(cohort.retentionRates.month12 * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg CLV:</span>
                    <span className="font-medium">${cohort.averageClv.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">12M Revenue:</span>
                    <span className="font-medium">${cohort.revenuePerCohort.month12.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSalesForecasting = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Forecasting with External Context</h3>
        <div className="space-y-4">
          {mockSalesForecasts.map((forecast) => (
            <div key={forecast.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900">{forecast.date}</h4>
                <div className="flex items-center space-x-4">
                  <span className="font-bold text-gray-900">
                    ${forecast.predictedSales.toLocaleString()}
                  </span>
                  {forecast.actualSales && (
                    <span className={`text-sm font-medium ${
                      forecast.variance && forecast.variance > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {forecast.variance && forecast.variance > 0 ? '+' : ''}{forecast.variance}%
                    </span>
                  )}
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-500">
                      {(forecast.confidence * 100).toFixed(0)}% confidence
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-gray-500">Seasonal</p>
                  <p className="font-medium">{((forecast.seasonalAdjustment - 1) * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-gray-500">Weather</p>
                  <p className="font-medium">{((forecast.weatherImpact - 1) * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-gray-500">Events</p>
                  <p className="font-medium">{((forecast.eventImpact - 1) * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-gray-500">Trend</p>
                  <p className="font-medium">{((forecast.trendComponent - 1) * 100).toFixed(1)}%</p>
                </div>
              </div>
              
              <div className="pt-3 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-2">Contributing Factors:</p>
                <div className="space-y-1">
                  {forecast.factors.map((factor, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{factor.name}</span>
                      <span className={`font-medium ${
                        factor.impact > 0 ? 'text-green-600' : factor.impact < 0 ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {factor.impact > 0 ? '+' : ''}{factor.impact}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderScenarioPlanning = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">What-If Scenario Planning</h3>
          <button className="inline-flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Create New Scenario
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockScenarioPlanning.map((scenario) => (
            <div key={scenario.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{scenario.scenarioName}</h4>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {(scenario.confidence * 100).toFixed(0)}% confidence
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{scenario.description}</p>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Key Assumptions:</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {scenario.assumptions.priceChange !== 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price Change:</span>
                        <span className="font-medium">{scenario.assumptions.priceChange > 0 ? '+' : ''}{scenario.assumptions.priceChange}%</span>
                      </div>
                    )}
                    {scenario.assumptions.staffingChange !== 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Staffing:</span>
                        <span className="font-medium">{scenario.assumptions.staffingChange > 0 ? '+' : ''}{scenario.assumptions.staffingChange}%</span>
                      </div>
                    )}
                    {scenario.assumptions.marketingSpend > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Marketing:</span>
                        <span className="font-medium">${scenario.assumptions.marketingSpend}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-2">Projected Impact ({scenario.timeframe}):</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sales:</span>
                      <span className={`font-medium ${
                        scenario.projections.salesImpact > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {scenario.projections.salesImpact > 0 ? '+' : ''}{scenario.projections.salesImpact}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Labor Cost:</span>
                      <span className={`font-medium ${
                        scenario.projections.laborCostImpact < 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {scenario.projections.laborCostImpact > 0 ? '+' : ''}{scenario.projections.laborCostImpact}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Profit:</span>
                      <span className={`font-medium ${
                        scenario.projections.profitImpact > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {scenario.projections.profitImpact > 0 ? '+' : ''}{scenario.projections.profitImpact}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Customers:</span>
                      <span className={`font-medium ${
                        scenario.projections.customerCountImpact > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {scenario.projections.customerCountImpact > 0 ? '+' : ''}{scenario.projections.customerCountImpact}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-4 space-x-2">
                <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                  Run Simulation
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'labor-forecasting':
        return renderLaborForecasting();
      case 'customer-analytics':
        return renderCustomerAnalytics();
      case 'sales-forecasting':
        return renderSalesForecasting();
      case 'scenario-planning':
        return renderScenarioPlanning();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Brain className="h-6 w-6 mr-2 text-purple-600" />
                ✨ Advanced Analytics
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                AI-powered forecasting, predictive analytics, and scenario planning
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                ✨ Premium Feature
              </span>
              <button className="inline-flex items-center justify-center px-3 py-2 text-sm border border-gray-300 bg-white text-blue-600 hover:bg-gray-50 rounded-md font-medium transition-colors">
                📊 Export Analytics
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
}
