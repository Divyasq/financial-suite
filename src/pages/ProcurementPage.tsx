import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle, 
  DollarSign,
  Truck,
  Star,
  Clock,
  Target,
  Zap
} from 'lucide-react';
import {
  mockVendors,
  mockIngredients,
  mockMenuItems,
  mockProcurementRecommendations,
  mockSquareEcosystemInsights
} from '../data/mockSquareEcosystem';

export function ProcurementPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedVendor, setSelectedVendor] = useState('all');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'vendors', label: 'Vendor Comparison', icon: '🏪' },
    { id: 'ingredients', label: 'Ingredient Tracking', icon: '🥕' },
    { id: 'menu-analysis', label: 'Menu Analysis', icon: '📋' },
    { id: 'recommendations', label: 'AI Recommendations', icon: '🤖' }
  ];

  const procurementInsights = mockSquareEcosystemInsights.filter(
    insight => insight.category === 'procurement'
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+$1,247</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Monthly Savings</h3>
          <p className="text-2xl font-bold text-gray-900">$1,247</p>
          <p className="text-xs text-gray-500 mt-1">From vendor optimizations</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Truck className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-600">3 vendors</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Active Vendors</h3>
          <p className="text-2xl font-bold text-gray-900">3</p>
          <p className="text-xs text-gray-500 mt-1">Sysco, Restaurant Depot, Local</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Target className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-orange-600">87/100</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Vendor Performance</h3>
          <p className="text-2xl font-bold text-gray-900">87/100</p>
          <p className="text-xs text-gray-500 mt-1">Average across all vendors</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Zap className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-purple-600">5 active</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">AI Recommendations</h3>
          <p className="text-2xl font-bold text-gray-900">5</p>
          <p className="text-xs text-gray-500 mt-1">Potential savings opportunities</p>
        </div>
      </div>

      {/* AI Recommendations Preview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">🤖 AI Procurement Insights</h3>
          <button 
            onClick={() => setActiveTab('recommendations')}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            View All →
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {procurementInsights.slice(0, 2).map((insight) => (
            <div key={insight.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mr-3">
                    <Zap className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{insight.title}</h4>
                    <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                      AI Insight
                    </span>
                  </div>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {(insight.confidence * 100).toFixed(0)}%
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
              
              {insight.potentialSavings && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-600">
                    Potential Savings: ${insight.potentialSavings}
                  </span>
                  <button className="px-3 py-1.5 text-xs bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                    Apply Recommendation
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Price Trends */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Recent Price Trends</h3>
        <div className="space-y-4">
          {mockIngredients.slice(0, 3).map((ingredient) => (
            <div key={ingredient.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  🥕
                </div>
                <div>
                  <p className="font-medium text-gray-900">{ingredient.name}</p>
                  <p className="text-sm text-gray-500">{ingredient.category}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-semibold text-gray-900">${ingredient.currentPrice}/{ingredient.unit}</p>
                <div className="flex items-center text-sm">
                  {ingredient.priceHistory.length > 1 && 
                   ingredient.currentPrice > ingredient.priceHistory[0].price ? (
                    <>
                      <TrendingUp className="w-4 h-4 text-red-500 mr-1" />
                      <span className="text-red-500">
                        +{(((ingredient.currentPrice - ingredient.priceHistory[0].price) / ingredient.priceHistory[0].price) * 100).toFixed(1)}%
                      </span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-green-500">Stable</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderVendorComparison = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">🏪 Vendor Performance Comparison</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {mockVendors.map((vendor) => (
            <div key={vendor.id} className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{vendor.logo}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">{vendor.name}</h4>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-gray-600">{vendor.rating}/5</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">On-Time Delivery</span>
                  <span className="font-medium">{vendor.performance.onTimeDelivery}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Quality Score</span>
                  <span className="font-medium">{vendor.performance.qualityScore}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price Competitiveness</span>
                  <span className="font-medium">{vendor.performance.priceCompetitiveness}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Customer Service</span>
                  <span className="font-medium">{vendor.performance.customerService}%</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Payment Terms</span>
                  <span className="font-medium">{vendor.paymentTerms}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Min Order</span>
                  <span className="font-medium">${vendor.minimumOrder}</span>
                </div>
              </div>
              
              <button className="w-full mt-4 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Price Comparison Table */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">💰 Price Comparison Matrix</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Ingredient</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Sysco</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Restaurant Depot</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Best Price</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Savings</th>
              </tr>
            </thead>
            <tbody>
              {mockIngredients.map((ingredient) => {
                const syscoPrice = ingredient.vendors.find(v => v.vendorId === 'sysco-001')?.price;
                const rdPrice = ingredient.vendors.find(v => v.vendorId === 'restaurant-depot-001')?.price;
                const bestPrice = Math.min(...ingredient.vendors.map(v => v.price));
                const worstPrice = Math.max(...ingredient.vendors.map(v => v.price));
                const savings = worstPrice - bestPrice;
                
                return (
                  <tr key={ingredient.id} className="border-b border-gray-100">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className="mr-2">🥕</span>
                        <div>
                          <p className="font-medium text-gray-900">{ingredient.name}</p>
                          <p className="text-sm text-gray-500">per {ingredient.unit}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {syscoPrice ? (
                        <span className={`font-medium ${syscoPrice === bestPrice ? 'text-green-600' : 'text-gray-900'}`}>
                          ${syscoPrice.toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {rdPrice ? (
                        <span className={`font-medium ${rdPrice === bestPrice ? 'text-green-600' : 'text-gray-900'}`}>
                          ${rdPrice.toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-semibold text-green-600">${bestPrice.toFixed(2)}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-medium text-green-600">${savings.toFixed(2)}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderRecommendations = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">🤖 AI Procurement Recommendations</h3>
        
        <div className="space-y-4">
          {mockProcurementRecommendations.map((rec) => (
            <div key={rec.id} className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mr-4">
                    {rec.type === 'vendor-switch' && '🔄'}
                    {rec.type === 'bulk-discount' && '📦'}
                    {rec.type === 'seasonal-timing' && '🌱'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h4 className="font-semibold text-gray-900 mr-3">{rec.title}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        rec.impact === 'high' ? 'bg-red-100 text-red-800' :
                        rec.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {rec.impact.toUpperCase()} IMPACT
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{rec.description}</p>
                    <p className="text-sm text-gray-500 mb-3">{rec.actionRequired}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-green-600">
                          Potential Savings: ${rec.potentialSavings}
                        </span>
                        <span className="text-sm text-gray-500">
                          Confidence: {(rec.confidence * 100).toFixed(0)}%
                        </span>
                        <span className="text-sm text-gray-500">
                          Timeframe: {rec.timeframe}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <button className="px-3 py-1.5 text-xs bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                    Apply
                  </button>
                  <button className="px-3 py-1.5 text-xs border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'vendors': return renderVendorComparison();
      case 'recommendations': return renderRecommendations();
      case 'ingredients':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🥕 Ingredient Tracking</h3>
            <p className="text-gray-600">Detailed ingredient cost tracking and inventory management coming soon...</p>
          </div>
        );
      case 'menu-analysis':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Menu Analysis</h3>
            <p className="text-gray-600">AI-powered menu cost analysis and profitability insights coming soon...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Square Order Guide Integration</h1>
              <p className="text-sm text-gray-600 mt-1">
                AI-powered procurement intelligence and vendor management
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="inline-flex items-center justify-center px-3 py-2 text-sm border border-gray-300 bg-white text-blue-600 hover:bg-gray-50 rounded-md font-medium transition-colors">
                📥 Import Menu
              </button>
              <button className="inline-flex items-center justify-center px-3 py-2 text-sm border border-gray-300 bg-white text-blue-600 hover:bg-gray-50 rounded-md font-medium transition-colors">
                📊 Generate Report
              </button>
              <button className="inline-flex items-center justify-center px-3 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md font-medium transition-colors">
                ➕ Add Vendor
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
                    ? 'border-blue-500 text-blue-600'
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
