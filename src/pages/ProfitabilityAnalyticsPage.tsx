import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target, 
  AlertTriangle,
  CheckCircle,
  Zap,
  ShoppingCart,
  CreditCard,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import {
  mockIntegratedMenuItems,
  mockIntegratedAIInsights,
  mockIntegratedDashboardWidgets
} from '../data/mockIntegratedAnalytics';

export function ProfitabilityAnalyticsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Profitability Overview', icon: '📊' },
    { id: 'menu-analysis', label: 'Menu Analysis', icon: '📋' },
    { id: 'cost-optimization', label: 'Cost Optimization', icon: '💰' },
    { id: 'vendor-impact', label: 'Vendor Impact', icon: '🏪' },
    { id: 'ai-insights', label: 'AI Insights', icon: '🤖' }
  ];

  const profitabilityInsights = mockIntegratedAIInsights.filter(
    insight => insight.category === 'profitability' || insight.category === 'cost-optimization'
  );

  const profitabilityWidgets = mockIntegratedDashboardWidgets.filter(
    widget => widget.category === 'profitability' || widget.category === 'cost-optimization'
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Profitability Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {profitabilityWidgets.map((widget) => (
          <div key={widget.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <span className={`text-sm font-medium ${
                widget.changeType === 'positive' ? 'text-green-600' : 
                widget.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {widget.change}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{widget.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{widget.value}</p>
            <p className="text-xs text-gray-500 mt-1">{widget.description}</p>
            
            {widget.breakdown && (
              <div className="mt-4 space-y-2">
                {widget.breakdown.slice(0, 2).map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-medium text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Integrated AI Insights */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">🤖 AI Profitability Insights</h3>
          <button 
            onClick={() => setActiveTab('ai-insights')}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            View All Insights →
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {profitabilityInsights.slice(0, 2).map((insight) => (
            <div key={insight.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mr-3">
                    <Zap className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{insight.title}</h4>
                    <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                      AI Insight
                    </span>
                  </div>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {(insight.confidence * 100).toFixed(0)}%
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
              
              <div className="grid grid-cols-3 gap-2 mb-3">
                {insight.dataPoints.slice(0, 3).map((point, index) => (
                  <div key={index} className="text-center p-2 bg-gray-50 rounded">
                    <p className="text-xs text-gray-500 mb-1">{point.metric}</p>
                    <p className="text-sm font-semibold text-gray-900">{point.value}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-600">
                  {insight.potentialSavings ? `Savings: $${insight.potentialSavings}` : 
                   insight.revenueImpact ? `Impact: $${insight.revenueImpact}` : 'Optimization Available'}
                </span>
                <button className="px-3 py-1.5 text-xs bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                  Apply Insight
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cross-Platform Data Integration */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Integrated Data Sources</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
            <div className="flex items-center mb-3">
              <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
              <h4 className="font-medium text-blue-900">POS Data</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-blue-700">Menu Item Sales</span>
                <span className="font-medium text-blue-900">Real-time</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-blue-700">Revenue by Item</span>
                <span className="font-medium text-blue-900">$43,684</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-blue-700">Transaction Volume</span>
                <span className="font-medium text-blue-900">1,247</span>
              </div>
            </div>
          </div>

          <div className="border border-green-200 rounded-lg p-4 bg-green-50">
            <div className="flex items-center mb-3">
              <ShoppingCart className="w-5 h-5 text-green-600 mr-2" />
              <h4 className="font-medium text-green-900">Order Guide Data</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-green-700">Ingredient Costs</span>
                <span className="font-medium text-green-900">Live Pricing</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-green-700">Vendor Comparisons</span>
                <span className="font-medium text-green-900">3 Vendors</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-green-700">Cost Optimization</span>
                <span className="font-medium text-green-900">$2,847</span>
              </div>
            </div>
          </div>

          <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
            <div className="flex items-center mb-3">
              <CreditCard className="w-5 h-5 text-purple-600 mr-2" />
              <h4 className="font-medium text-purple-900">Bill Pay Data</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-purple-700">Payment Timing</span>
                <span className="font-medium text-purple-900">Optimized</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-purple-700">Cash Flow Impact</span>
                <span className="font-medium text-purple-900">92/100</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-purple-700">Fee Optimization</span>
                <span className="font-medium text-purple-900">$804 saved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMenuAnalysis = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">📋 Real-Time Menu Profitability Analysis</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Menu Item</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Sales Price</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Ingredient Cost</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Gross Margin</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Margin %</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Volume</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Total Profit</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Optimization</th>
              </tr>
            </thead>
            <tbody>
              {mockIntegratedMenuItems.map((item, index) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-medium text-blue-600">#{item.profitabilityRank}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center font-medium text-gray-900">
                    ${item.salesPrice.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="font-medium text-gray-900">${item.totalIngredientCost.toFixed(2)}</span>
                    <div className="text-xs text-gray-500">
                      {item.ingredients.reduce((sum, ing) => sum + ing.potentialSavings, 0) > 0 && (
                        <span className="text-green-600">
                          Save ${item.ingredients.reduce((sum, ing) => sum + ing.potentialSavings, 0).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center font-medium text-gray-900">
                    ${item.grossMargin.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`font-semibold ${
                      item.grossMarginPercent >= 75 ? 'text-green-600' :
                      item.grossMarginPercent >= 65 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {item.grossMarginPercent.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-medium text-gray-900">
                    {item.salesVolume}
                  </td>
                  <td className="py-3 px-4 text-center font-semibold text-green-600">
                    ${item.totalProfit.toFixed(0)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {item.ingredients.some(ing => ing.potentialSavings > 0) ? (
                      <button className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                        Optimize
                      </button>
                    ) : (
                      <span className="text-xs text-green-600 font-medium">Optimized</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ingredient Cost Breakdown */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🥕 Ingredient Cost Analysis</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockIntegratedMenuItems.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">{item.name}</h4>
              <div className="space-y-3">
                {item.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">{ingredient.ingredientName}</p>
                      <p className="text-xs text-gray-500">
                        {ingredient.quantity} {ingredient.unit} from {ingredient.currentVendor}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">${ingredient.currentCost.toFixed(2)}</p>
                      {ingredient.potentialSavings > 0 && (
                        <p className="text-xs text-green-600">
                          Save ${ingredient.potentialSavings.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCostOptimization = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">💰 Cost Optimization Opportunities</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="border border-green-200 rounded-lg p-4 bg-green-50">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-green-900">Quick Wins</h4>
              <span className="text-sm font-medium text-green-600">$1,195</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-green-700">Vendor Switch</span>
                <span className="font-medium text-green-900">$234</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-green-700">Payment Method</span>
                <span className="font-medium text-green-900">$804</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-green-700">Bulk Ordering</span>
                <span className="font-medium text-green-900">$157</span>
              </div>
            </div>
            <button className="w-full mt-3 px-3 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
              Implement All
            </button>
          </div>

          <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-blue-900">Strategic Initiatives</h4>
              <span className="text-sm font-medium text-blue-600">$1,250</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-blue-700">Vendor Diversification</span>
                <span className="font-medium text-blue-900">$850</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-blue-700">Contract Renegotiation</span>
                <span className="font-medium text-blue-900">$400</span>
              </div>
            </div>
            <button className="w-full mt-3 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              Plan Implementation
            </button>
          </div>

          <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-purple-900">Process Improvements</h4>
              <span className="text-sm font-medium text-purple-600">$402</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-purple-700">Ordering Automation</span>
                <span className="font-medium text-purple-900">$180</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-purple-700">Inventory Optimization</span>
                <span className="font-medium text-purple-900">$222</span>
              </div>
            </div>
            <button className="w-full mt-3 px-3 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
              Assess ROI
            </button>
          </div>
        </div>
      </div>

      {/* Implementation Timeline */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">⏱️ Implementation Timeline</h3>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-4"></div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Week 1: Quick Wins Implementation</p>
              <p className="text-sm text-gray-600">Switch payment methods, update vendor preferences</p>
            </div>
            <span className="text-sm font-medium text-green-600">$1,195 savings</span>
          </div>
          
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-4"></div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Month 1-3: Strategic Initiatives</p>
              <p className="text-sm text-gray-600">Vendor diversification, contract negotiations</p>
            </div>
            <span className="text-sm font-medium text-blue-600">$1,250 savings</span>
          </div>
          
          <div className="flex items-center">
            <div className="w-4 h-4 bg-purple-500 rounded-full mr-4"></div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Month 3-6: Process Improvements</p>
              <p className="text-sm text-gray-600">Automation implementation, system integration</p>
            </div>
            <span className="text-sm font-medium text-purple-600">$402 savings</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'menu-analysis': return renderMenuAnalysis();
      case 'cost-optimization': return renderCostOptimization();
      case 'vendor-impact':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🏪 Vendor Impact Analysis</h3>
            <p className="text-gray-600">Detailed vendor impact on menu profitability coming soon...</p>
          </div>
        );
      case 'ai-insights':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🤖 AI Profitability Insights</h3>
            <div className="space-y-4">
              {profitabilityInsights.map((insight) => (
                <div key={insight.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {(insight.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{insight.insight}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-600">
                      Impact: ${insight.potentialSavings || insight.revenueImpact}
                    </span>
                    <button className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default: return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Profitability Analytics</h1>
              <p className="text-sm text-gray-600 mt-1">
                Real-time profitability analysis with integrated Order Guide and Bill Pay data
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="inline-flex items-center justify-center px-3 py-2 text-sm border border-gray-300 bg-white text-blue-600 hover:bg-gray-50 rounded-md font-medium transition-colors">
                📊 Export Analysis
              </button>
              <button className="inline-flex items-center justify-center px-3 py-2 text-sm border border-gray-300 bg-white text-blue-600 hover:bg-gray-50 rounded-md font-medium transition-colors">
                ⚙️ Configure Alerts
              </button>
              <button className="inline-flex items-center justify-center px-3 py-2 text-sm bg-green-600 text-white hover:bg-green-700 rounded-md font-medium transition-colors">
                🚀 Optimize Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
}
