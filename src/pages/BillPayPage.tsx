import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Calendar, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  Zap,
  PiggyBank
} from 'lucide-react';
import {
  mockVendorAccounts,
  mockBills,
  mockCashFlowProjections,
  mockAPAnalytics,
  mockPaymentMethods,
  mockSquareEcosystemInsights
} from '../data/mockSquareEcosystem';

export function BillPayPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'bills', label: 'Bills & Payments', icon: '💳' },
    { id: 'vendors', label: 'Vendor Management', icon: '🏢' },
    { id: 'cash-flow', label: 'Cash Flow', icon: '💰' },
    { id: 'analytics', label: 'AP Analytics', icon: '📈' }
  ];

  const billPayInsights = mockSquareEcosystemInsights.filter(
    insight => insight.category === 'bill-pay' || insight.category === 'cash-flow'
  );

  const upcomingBills = mockBills.filter(bill => 
    bill.status === 'pending' || bill.status === 'scheduled'
  );

  const overdueBills = mockBills.filter(bill => bill.status === 'overdue');

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-sm font-medium text-red-600">{overdueBills.length} overdue</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Outstanding Bills</h3>
          <p className="text-2xl font-bold text-gray-900">${mockAPAnalytics.totalOutstanding.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">Across {mockAPAnalytics.vendorCount} vendors</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-600">This week</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Upcoming Payments</h3>
          <p className="text-2xl font-bold text-gray-900">${upcomingBills.reduce((sum, bill) => sum + bill.amount, 0).toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">{upcomingBills.length} bills due</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <PiggyBank className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">Monthly</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Payment Savings</h3>
          <p className="text-2xl font-bold text-gray-900">$804</p>
          <p className="text-xs text-gray-500 mt-1">Annual savings potential</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-purple-600">{mockAPAnalytics.averagePaymentCycle} days</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Avg Payment Cycle</h3>
          <p className="text-2xl font-bold text-gray-900">{mockAPAnalytics.averagePaymentCycle}</p>
          <p className="text-xs text-gray-500 mt-1">Days to pay bills</p>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">🤖 AI Bill Pay Insights</h3>
          <button 
            onClick={() => setActiveTab('analytics')}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            View All Analytics →
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {billPayInsights.slice(0, 2).map((insight) => (
            <div key={insight.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mr-3">
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
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-600">
                  {insight.potentialSavings ? `Savings: $${insight.potentialSavings}` : 'Optimization Available'}
                </span>
                <button className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Apply Suggestion
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Schedule Calendar */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📅 Payment Schedule - Next 7 Days</h3>
        
        <div className="grid grid-cols-7 gap-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
            const dayBills = index === 1 ? [mockBills[0]] : index === 3 ? [mockBills[1]] : [];
            const dayTotal = dayBills.reduce((sum, bill) => sum + bill.amount, 0);
            
            return (
              <div key={day} className="border border-gray-200 rounded-lg p-3">
                <div className="text-center mb-2">
                  <p className="text-sm font-medium text-gray-900">{day}</p>
                  <p className="text-xs text-gray-500">Nov {26 + index}</p>
                </div>
                
                {dayBills.length > 0 ? (
                  <div className="space-y-2">
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">${dayTotal.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{dayBills.length} bill{dayBills.length > 1 ? 's' : ''}</p>
                    </div>
                    {dayBills.map((bill) => (
                      <div key={bill.id} className="bg-gray-50 rounded p-2">
                        <p className="text-xs font-medium text-gray-900 truncate">{bill.vendorName}</p>
                        <p className="text-xs text-gray-500">${bill.amount}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-400">No payments</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment Method Breakdown */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">💳 Payment Method Analysis</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Monthly Volume by Method</h4>
            <div className="space-y-3">
              {mockAPAnalytics.paymentMethodBreakdown.map((method) => (
                <div key={method.method} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                    <span className="text-sm text-gray-700">{method.method}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">${method.volume.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{method.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Fee Comparison</h4>
            <div className="space-y-3">
              {mockPaymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{method.name}</p>
                    <p className="text-xs text-gray-500">{method.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {method.fee === 0 ? 'FREE' : 
                       method.feeType === 'percentage' ? `${method.fee}%` : `$${method.fee}`}
                    </p>
                    <p className="text-xs text-gray-500">{method.processingTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBillsAndPayments = () => (
    <div className="space-y-6">
      {/* Bills Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Bills */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">📋 Upcoming Bills</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              Schedule Payment
            </button>
          </div>
          
          <div className="space-y-4">
            {upcomingBills.map((bill) => (
              <div key={bill.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{bill.vendorName}</p>
                      <p className="text-sm text-gray-500">Invoice: {bill.invoiceNumber}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${bill.amount.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Due: {new Date(bill.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    bill.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    bill.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {bill.status.toUpperCase()}
                  </span>
                  
                  <div className="flex space-x-2">
                    <button className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Pay Now
                    </button>
                    <button className="px-3 py-1.5 text-xs border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overdue Bills */}
        <div className="bg-white rounded-lg border border-red-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-red-900">⚠️ Overdue Bills</h3>
            <button className="text-sm text-red-600 hover:text-red-800 font-medium">
              Pay All Overdue
            </button>
          </div>
          
          {overdueBills.length > 0 ? (
            <div className="space-y-4">
              {overdueBills.map((bill) => (
                <div key={bill.id} className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-red-900">{bill.vendorName}</p>
                        <p className="text-sm text-red-600">Invoice: {bill.invoiceNumber}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-red-900">${bill.amount.toLocaleString()}</p>
                      <p className="text-sm text-red-600">
                        {Math.ceil((new Date().getTime() - new Date(bill.dueDate).getTime()) / (1000 * 60 * 60 * 24))} days overdue
                      </p>
                    </div>
                  </div>
                  
                  <button className="w-full px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                    Pay Immediately
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <p className="text-green-600 font-medium">No overdue bills!</p>
              <p className="text-sm text-gray-500">All payments are up to date</p>
            </div>
          )}
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">💰 Recent Payment History</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Vendor</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Method</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Fee</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-900">Nov 20, 2024</td>
                <td className="py-3 px-4 text-gray-900">Green Valley Farms</td>
                <td className="py-3 px-4 font-medium text-gray-900">$1,234.56</td>
                <td className="py-3 px-4 text-gray-600">Square Checking</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    COMPLETED
                  </span>
                </td>
                <td className="py-3 px-4 text-green-600 font-medium">$0.00</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-900">Nov 18, 2024</td>
                <td className="py-3 px-4 text-gray-900">Pacific Gas & Electric</td>
                <td className="py-3 px-4 font-medium text-gray-900">$432.18</td>
                <td className="py-3 px-4 text-gray-600">Credit Card</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    PROCESSING
                  </span>
                </td>
                <td className="py-3 px-4 text-red-600 font-medium">$12.53</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCashFlow = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">💰 Cash Flow Projection - Next 30 Days</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {mockCashFlowProjections.slice(0, 3).map((projection, index) => (
            <div key={projection.date} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{new Date(projection.date).toLocaleDateString()}</h4>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  projection.riskLevel === 'low' ? 'bg-green-100 text-green-800' :
                  projection.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {projection.riskLevel.toUpperCase()} RISK
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Revenue In</span>
                  <span className="font-medium text-green-600">+${projection.incomingRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Payments Out</span>
                  <span className="font-medium text-red-600">-${projection.outgoingPayments.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm border-t pt-2">
                  <span className="text-gray-600">Net Cash Flow</span>
                  <span className={`font-semibold ${
                    projection.netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    ${projection.netCashFlow.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Projected Balance</span>
                  <span className="font-semibold text-gray-900">${projection.projectedBalance.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cash Flow Chart Placeholder */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Cash Flow Trend</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">Interactive cash flow chart coming soon</p>
            <p className="text-sm text-gray-500">Revenue vs Payments over time</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'bills': return renderBillsAndPayments();
      case 'cash-flow': return renderCashFlow();
      case 'vendors':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🏢 Vendor Management</h3>
            <p className="text-gray-600">Comprehensive vendor account management and banking info coming soon...</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 AP Analytics</h3>
            <p className="text-gray-600">Advanced accounts payable analytics and reporting coming soon...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Square Bill Pay Integration</h1>
              <p className="text-sm text-gray-600 mt-1">
                Comprehensive accounts payable management and cash flow optimization
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
                💳 Pay Bills
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
