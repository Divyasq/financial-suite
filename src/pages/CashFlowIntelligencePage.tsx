import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar, 
  AlertTriangle,
  CheckCircle,
  Zap,
  CreditCard,
  Clock,
  Target,
  Activity,
  BarChart3
} from 'lucide-react';
import {
  mockCashFlowIntelligence,
  mockIntegratedAIInsights,
  mockIntegratedDashboardWidgets
} from '../data/mockIntegratedAnalytics';

export function CashFlowIntelligencePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  const tabs = [
    { id: 'overview', label: 'Cash Flow Overview', icon: '💰' },
    { id: 'optimization', label: 'Payment Optimization', icon: '⚡' },
    { id: 'forecasting', label: 'Cash Flow Forecasting', icon: '📈' },
    { id: 'vendor-timing', label: 'Vendor Payment Timing', icon: '⏰' },
    { id: 'ai-insights', label: 'AI Insights', icon: '🤖' }
  ];

  const cashFlowInsights = mockIntegratedAIInsights.filter(
    insight => insight.category === 'cash-flow'
  );

  const cashFlowWidgets = mockIntegratedDashboardWidgets.filter(
    widget => widget.category === 'cash-flow'
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Cash Flow Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cashFlowWidgets.map((widget) => (
          <div key={widget.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-600" />
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
                {widget.breakdown.slice(0, 3).map((item, index) => (
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

      {/* Cash Flow Timeline */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">💰 Cash Flow Timeline - Next 7 Days</h3>
          <div className="flex items-center space-x-2">
            <select 
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-3 py-1"
            >
              <option value="week">Next 7 Days</option>
              <option value="month">Next 30 Days</option>
              <option value="quarter">Next 90 Days</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
            const revenue = [4200, 3200, 4500, 4800, 5200, 5800, 4100][index];
            const payments = [876, 2100, 450, 1200, 800, 0, 300][index];
            const netFlow = revenue - payments;
            const riskLevel = netFlow < 1000 ? 'high' : netFlow < 2000 ? 'medium' : 'low';
            
            return (
              <div key={day} className={`border rounded-lg p-4 ${
                riskLevel === 'high' ? 'border-red-200 bg-red-50' :
                riskLevel === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                'border-green-200 bg-green-50'
              }`}>
                <div className="text-center mb-3">
                  <p className="text-sm font-medium text-gray-900">{day}</p>
                  <p className="text-xs text-gray-500">Nov {26 + index}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="text-center">
                    <p className="text-xs text-gray-600">Revenue In</p>
                    <p className="text-sm font-semibold text-green-600">+${revenue.toLocaleString()}</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs text-gray-600">Payments Out</p>
                    <p className="text-sm font-semibold text-red-600">-${payments.toLocaleString()}</p>
                  </div>
                  
                  <div className="text-center border-t pt-2">
                    <p className="text-xs text-gray-600">Net Flow</p>
                    <p className={`text-sm font-bold ${
                      netFlow >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      ${netFlow.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                      riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {riskLevel.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Cash Flow Insights */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">🤖 AI Cash Flow Insights</h3>
          <button 
            onClick={() => setActiveTab('ai-insights')}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            View All Insights →
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {cashFlowInsights.slice(0, 2).map((insight) => (
            <div key={insight.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mr-3">
                    <Zap className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{insight.title}</h4>
                    <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
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
                <span className="text-sm font-medium text-blue-600">
                  {insight.revenueImpact ? `Impact: $${insight.revenueImpact}` : 'Optimization Available'}
                </span>
                <button className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Apply Optimization
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method Analysis */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">💳 Payment Method Impact Analysis</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Current Payment Distribution</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Square Checking</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">$12,500 (66.7%)</p>
                  <p className="text-xs text-green-600">$0 fees</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Credit Card</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">$4,200 (22.4%)</p>
                  <p className="text-xs text-red-600">$121.80 fees</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Debit Card</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">$2,050 (10.9%)</p>
                  <p className="text-xs text-green-600">$0 fees</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Optimization Opportunities</h4>
            <div className="space-y-3">
              <div className="p-3 border border-green-200 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-green-900">Switch to Square Checking</span>
                  <span className="text-sm font-bold text-green-600">$804/year</span>
                </div>
                <p className="text-xs text-green-700">Move all credit card payments to free Square Checking</p>
              </div>
              
              <div className="p-3 border border-blue-200 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-900">Payment Timing Optimization</span>
                  <span className="text-sm font-bold text-blue-600">$1,200/year</span>
                </div>
                <p className="text-xs text-blue-700">Align payment schedule with revenue patterns</p>
              </div>
              
              <div className="p-3 border border-purple-200 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-purple-900">Vendor Term Negotiation</span>
                  <span className="text-sm font-bold text-purple-600">$600/year</span>
                </div>
                <p className="text-xs text-purple-700">Extend payment terms for better cash flow</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOptimization = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">⚡ Payment Optimization Center</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="border border-green-200 rounded-lg p-4 bg-green-50">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-green-900">Immediate Actions</h4>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="space-y-3">
              <div className="p-3 border border-green-300 bg-white rounded">
                <p className="text-sm font-medium text-gray-900">Switch Restaurant Depot Payment</p>
                <p className="text-xs text-gray-600 mb-2">Credit Card → Square Checking</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-green-600">Save $25.42</span>
                  <button className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700">
                    Apply
                  </button>
                </div>
              </div>
              
              <div className="p-3 border border-green-300 bg-white rounded">
                <p className="text-sm font-medium text-gray-900">Reschedule Tuesday Payments</p>
                <p className="text-xs text-gray-600 mb-2">Move $1,500 to Wednesday</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-green-600">Improve Flow</span>
                  <button className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700">
                    Schedule
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-blue-900">Short-term Optimizations</h4>
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div className="space-y-3">
              <div className="p-3 border border-blue-300 bg-white rounded">
                <p className="text-sm font-medium text-gray-900">Negotiate Extended Terms</p>
                <p className="text-xs text-gray-600 mb-2">Sysco: Net 30 → Net 45</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-blue-600">15 days buffer</span>
                  <button className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                    Contact
                  </button>
                </div>
              </div>
              
              <div className="p-3 border border-blue-300 bg-white rounded">
                <p className="text-sm font-medium text-gray-900">Setup Auto-Pay</p>
                <p className="text-xs text-gray-600 mb-2">Automate recurring payments</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-blue-600">Reduce delays</span>
                  <button className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                    Configure
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-purple-900">Strategic Initiatives</h4>
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <div className="space-y-3">
              <div className="p-3 border border-purple-300 bg-white rounded">
                <p className="text-sm font-medium text-gray-900">Cash Flow Credit Line</p>
                <p className="text-xs text-gray-600 mb-2">$10K emergency buffer</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-purple-600">Risk mitigation</span>
                  <button className="px-2 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700">
                    Explore
                  </button>
                </div>
              </div>
              
              <div className="p-3 border border-purple-300 bg-white rounded">
                <p className="text-sm font-medium text-gray-900">Revenue-Based Payments</p>
                <p className="text-xs text-gray-600 mb-2">Dynamic payment scheduling</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-purple-600">Smart timing</span>
                  <button className="px-2 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700">
                    Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ROI Calculator */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Optimization ROI Calculator</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <p className="text-2xl font-bold text-green-600">$2,604</p>
            <p className="text-sm text-gray-600">Annual Savings Potential</p>
          </div>
          
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">2 weeks</p>
            <p className="text-sm text-gray-600">Implementation Time</p>
          </div>
          
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">1,302%</p>
            <p className="text-sm text-gray-600">ROI</p>
          </div>
          
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <p className="text-2xl font-bold text-orange-600">$200</p>
            <p className="text-sm text-gray-600">Implementation Cost</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'optimization': return renderOptimization();
      case 'forecasting':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Cash Flow Forecasting</h3>
            <p className="text-gray-600">Advanced cash flow forecasting with seasonal adjustments coming soon...</p>
          </div>
        );
      case 'vendor-timing':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">⏰ Vendor Payment Timing</h3>
            <p className="text-gray-600">Detailed vendor payment timing optimization coming soon...</p>
          </div>
        );
      case 'ai-insights':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🤖 AI Cash Flow Insights</h3>
            <div className="space-y-4">
              {cashFlowInsights.map((insight) => (
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
                    <span className="text-sm font-medium text-blue-600">
                      Impact: ${insight.revenueImpact}
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
              <h1 className="text-2xl font-bold text-gray-900">Cash Flow Intelligence</h1>
              <p className="text-sm text-gray-600 mt-1">
                AI-powered cash flow optimization with integrated Bill Pay and revenue data
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="inline-flex items-center justify-center px-3 py-2 text-sm border border-gray-300 bg-white text-blue-600 hover:bg-gray-50 rounded-md font-medium transition-colors">
                📊 Cash Flow Report
              </button>
              <button className="inline-flex items-center justify-center px-3 py-2 text-sm border border-gray-300 bg-white text-blue-600 hover:bg-gray-50 rounded-md font-medium transition-colors">
                ⚙️ Payment Settings
              </button>
              <button className="inline-flex items-center justify-center px-3 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md font-medium transition-colors">
                🚀 Optimize Cash Flow
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
