import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function BenchmarkingPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('competitive-landscape');
  const [showCompetitorModal, setShowCompetitorModal] = useState(false);
  const [selectedCompetitors, setSelectedCompetitors] = useState([
    { id: 'marios-bistro', name: "Mario's Bistro", rating: 4.8, avgPrice: '$22', distance: '0.3 mi', trend: '+15%', selected: true },
    { id: 'garden-cafe', name: "The Garden Café", rating: 4.6, avgPrice: '$19', distance: '0.7 mi', trend: '+8%', selected: true },
    { id: 'sunset-grill', name: "Sunset Grill", rating: 4.3, avgPrice: '$16', distance: '1.2 mi', trend: '-3%', selected: true }
  ]);
  
  const [availableCompetitors] = useState([
    { id: 'pizza-palace', name: "Tony's Pizza Palace", rating: 4.2, avgPrice: '$14', distance: '0.5 mi', trend: '+5%', selected: false },
    { id: 'steakhouse-prime', name: "Prime Steakhouse", rating: 4.7, avgPrice: '$35', distance: '0.9 mi', trend: '+12%', selected: false },
    { id: 'taco-fiesta', name: "Taco Fiesta", rating: 4.1, avgPrice: '$12', distance: '1.1 mi', trend: '+3%', selected: false },
    { id: 'sushi-zen', name: "Sushi Zen", rating: 4.5, avgPrice: '$28', distance: '1.3 mi', trend: '+7%', selected: false },
    { id: 'burger-barn', name: "The Burger Barn", rating: 4.0, avgPrice: '$15', distance: '1.5 mi', trend: '-1%', selected: false },
    { id: 'fine-dining-oak', name: "Oak Fine Dining", rating: 4.9, avgPrice: '$45', distance: '0.8 mi', trend: '+18%', selected: false }
  ]);

  const handleCompetitorToggle = (competitorId: string) => {
    setSelectedCompetitors(prev => 
      prev.map(comp => 
        comp.id === competitorId 
          ? { ...comp, selected: !comp.selected }
          : comp
      )
    );
  };

  const handleAddCompetitor = (competitor: any) => {
    setSelectedCompetitors(prev => [...prev, { ...competitor, selected: true }]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">🏆 Benchmarking</h1>
              <p className="text-sm text-gray-600 mt-1">
                Competitive intelligence and market analysis for your restaurant
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                PRO FEATURE
              </div>
              <button 
                onClick={() => navigate('/financial-suite/upgrade')}
                className="inline-flex items-center justify-center px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md font-medium transition-colors"
              >
                🚀 Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'competitive-landscape', label: '🗺️ Competitive Landscape', description: 'Market map & competitor profiles' },
              { id: 'pricing-intelligence', label: '💰 Pricing Intelligence', description: 'Menu pricing analysis & optimization' },
              { id: 'performance-benchmarks', label: '📊 Performance Benchmarks', description: 'Operational & financial metrics' },
              { id: 'market-intelligence', label: '🎯 Market Intelligence', description: 'Trends, insights & opportunities' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div>{tab.label}</div>
                  <div className="text-xs text-gray-400 mt-1">{tab.description}</div>
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {activeTab === 'competitive-landscape' && (
          <div className="space-y-8">
            {/* Market Overview */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Market Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-gray-600">Similar Restaurants</div>
                  <div className="text-xs text-gray-500 mt-1">within 2-mile radius</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">#3</div>
                  <div className="text-sm text-gray-600">Your Market Rank</div>
                  <div className="text-xs text-gray-500 mt-1">up from #5 last month</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">$42K</div>
                  <div className="text-sm text-gray-600">Market Opportunity</div>
                  <div className="text-xs text-gray-500 mt-1">untapped revenue potential</div>
                </div>
              </div>
            </div>

            {/* Competitive Map */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Competitive Map</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700">View Full Map →</button>
              </div>
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <div className="text-4xl mb-4">🗺️</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Interactive Market Map</h3>
                <p className="text-gray-600 mb-4">
                  See all competitors plotted by location, pricing, and performance metrics
                </p>
                <button 
                  onClick={() => navigate('/financial-suite/upgrade')}
                  className="inline-flex items-center justify-center px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md font-medium transition-colors"
                >
                  🔓 Unlock Interactive Map
                </button>
              </div>
            </div>

            {/* Top Competitors */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Top Competitors</h2>
                <button 
                  onClick={() => setShowCompetitorModal(true)}
                  className="inline-flex items-center justify-center px-3 py-2 text-sm border border-gray-300 bg-white text-blue-600 hover:bg-gray-50 rounded-md font-medium transition-colors"
                >
                  ⚙️ Manage Competitors
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { name: "Mario's Bistro", rating: 4.8, avgPrice: '$22', distance: '0.3 mi', trend: '+15%' },
                  { name: "The Garden Café", rating: 4.6, avgPrice: '$19', distance: '0.7 mi', trend: '+8%' },
                  { name: "Your Restaurant", rating: 4.5, avgPrice: '$18', distance: '—', trend: '+12%', isYou: true },
                  { name: "Sunset Grill", rating: 4.3, avgPrice: '$16', distance: '1.2 mi', trend: '-3%' }
                ].map((competitor, index) => (
                  <div key={index} className={`flex items-center justify-between p-4 rounded-lg border ${
                    competitor.isYou ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        competitor.isYou ? 'bg-blue-600' : index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{competitor.name}</div>
                        <div className="text-sm text-gray-500">{competitor.distance} • ⭐ {competitor.rating}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">{competitor.avgPrice}</div>
                      <div className={`text-sm ${competitor.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {competitor.trend}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pricing-intelligence' && (
          <div className="space-y-8">
            {/* Pricing Overview */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Pricing Analysis</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-xl font-bold text-blue-600">$18.50</div>
                  <div className="text-sm text-gray-600">Your Avg Entrée</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-xl font-bold text-gray-600">$16.80</div>
                  <div className="text-sm text-gray-600">Market Average</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-xl font-bold text-green-600">+10.1%</div>
                  <div className="text-sm text-gray-600">Price Premium</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-xl font-bold text-purple-600">$2,400</div>
                  <div className="text-sm text-gray-600">Revenue Opportunity</div>
                </div>
              </div>
            </div>

            {/* Menu Price Matrix */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Menu Price Matrix</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700">Export Analysis →</button>
              </div>
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Detailed Menu Comparison</h3>
                <p className="text-gray-600 mb-4">
                  Side-by-side pricing analysis of every menu item vs competitors
                </p>
                <button 
                  onClick={() => navigate('/financial-suite/upgrade')}
                  className="inline-flex items-center justify-center px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md font-medium transition-colors"
                >
                  🔓 Unlock Full Matrix
                </button>
              </div>
            </div>

            {/* Pricing Opportunities */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Pricing Opportunities</h2>
              <div className="space-y-4">
                {[
                  { 
                    category: 'Appetizers', 
                    opportunity: 'Underpriced by 8%', 
                    potential: '+$800/month',
                    recommendation: 'Consider increasing appetizer prices to match market average',
                    severity: 'medium'
                  },
                  { 
                    category: 'Desserts', 
                    opportunity: 'Premium positioning', 
                    potential: '+$400/month',
                    recommendation: 'Your dessert prices are 15% above market - maintain premium',
                    severity: 'low'
                  },
                  { 
                    category: 'Wine Selection', 
                    opportunity: 'Major gap detected', 
                    potential: '+$1,200/month',
                    recommendation: 'Competitors offer 20% more wine options at higher margins',
                    severity: 'high'
                  }
                ].map((item, index) => (
                  <div key={index} className={`p-4 rounded-lg border-l-4 ${
                    item.severity === 'high' ? 'bg-red-50 border-red-400' :
                    item.severity === 'medium' ? 'bg-yellow-50 border-yellow-400' :
                    'bg-green-50 border-green-400'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{item.category}</div>
                        <div className="text-sm text-gray-600 mt-1">{item.recommendation}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">{item.potential}</div>
                        <div className="text-sm text-gray-500">{item.opportunity}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'performance-benchmarks' && (
          <div className="space-y-8">
            {/* Performance Scorecard */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Scorecard</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { metric: 'Service Speed', score: 85, percentile: '85th', trend: '+5' },
                  { metric: 'Customer Satisfaction', score: 82, percentile: '75th', trend: '+2' },
                  { metric: 'Operational Efficiency', score: 71, percentile: '60th', trend: '-1' },
                  { metric: 'Digital Adoption', score: 68, percentile: '55th', trend: '+8' }
                ].map((item, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{item.score}/100</div>
                    <div className="text-sm text-gray-600">{item.metric}</div>
                    <div className="text-xs text-gray-500 mt-1">{item.percentile} percentile</div>
                    <div className={`text-xs mt-1 ${item.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {item.trend} vs last month
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Operational Metrics</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Average Service Time', value: '12 min', benchmark: '15 min', status: 'good' },
                    { label: 'Table Turn Rate', value: '2.3/night', benchmark: '1.8/night', status: 'excellent' },
                    { label: 'Order Accuracy', value: '94%', benchmark: '91%', status: 'good' },
                    { label: 'Peak Wait Time', value: '18 min', benchmark: '25 min', status: 'excellent' }
                  ].map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{metric.label}</div>
                        <div className="text-sm text-gray-500">Industry avg: {metric.benchmark}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{metric.value}</div>
                        <div className={`text-xs ${
                          metric.status === 'excellent' ? 'text-green-600' : 
                          metric.status === 'good' ? 'text-blue-600' : 'text-yellow-600'
                        }`}>
                          {metric.status === 'excellent' ? '🏆 Excellent' : 
                           metric.status === 'good' ? '✅ Above Average' : '⚠️ Needs Work'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Metrics</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Sales per Sq Ft', value: '$450', benchmark: '$380', status: 'excellent' },
                    { label: 'Average Check Size', value: '$42', benchmark: '$38', status: 'good' },
                    { label: 'Labor Cost %', value: '28%', benchmark: '32%', status: 'excellent' },
                    { label: 'Food Cost %', value: '31%', benchmark: '30%', status: 'average' }
                  ].map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{metric.label}</div>
                        <div className="text-sm text-gray-500">Industry avg: {metric.benchmark}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{metric.value}</div>
                        <div className={`text-xs ${
                          metric.status === 'excellent' ? 'text-green-600' : 
                          metric.status === 'good' ? 'text-blue-600' : 'text-yellow-600'
                        }`}>
                          {metric.status === 'excellent' ? '🏆 Excellent' : 
                           metric.status === 'good' ? '✅ Above Average' : '⚠️ Needs Work'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'market-intelligence' && (
          <div className="space-y-8">
            {/* Market Trends */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Market Trends</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { 
                    trend: 'Plant-Based Options', 
                    growth: '+40%', 
                    adoption: '8/12 competitors',
                    opportunity: 'High',
                    description: 'Growing demand for vegetarian/vegan menu items'
                  },
                  { 
                    trend: 'Delivery Integration', 
                    growth: '+25%', 
                    adoption: '10/12 competitors',
                    opportunity: 'Medium',
                    description: 'Third-party delivery partnerships expanding'
                  },
                  { 
                    trend: 'Happy Hour Extensions', 
                    growth: '+15%', 
                    adoption: '6/12 competitors',
                    opportunity: 'High',
                    description: 'Extended happy hour times gaining popularity'
                  }
                ].map((item, index) => (
                  <div key={index} className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{item.trend}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.opportunity === 'High' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.opportunity} Opportunity
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-600 font-medium">{item.growth} growth</span>
                      <span className="text-gray-500">{item.adoption}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Competitive Intelligence */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Competitive Activity</h2>
              <div className="space-y-4">
                {[
                  {
                    competitor: "Mario's Bistro",
                    activity: 'Menu Update',
                    description: 'Added 3 new pasta dishes, increased appetizer prices by 12%',
                    impact: 'Medium',
                    date: '2 days ago'
                  },
                  {
                    competitor: 'The Garden Café',
                    activity: 'Promotion Launch',
                    description: 'Started "Wine Wednesday" - 50% off all wines',
                    impact: 'High',
                    date: '1 week ago'
                  },
                  {
                    competitor: 'Sunset Grill',
                    activity: 'Hours Extension',
                    description: 'Extended weekend hours until 2 AM',
                    impact: 'Low',
                    date: '2 weeks ago'
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      item.impact === 'High' ? 'bg-red-400' :
                      item.impact === 'Medium' ? 'bg-yellow-400' : 'bg-green-400'
                    }`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{item.competitor}</h4>
                        <span className="text-sm text-gray-500">{item.date}</span>
                      </div>
                      <div className="text-sm text-blue-600 font-medium mt-1">{item.activity}</div>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Recommendations */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Strategic Recommendations</h2>
              <div className="space-y-4">
                {[
                  {
                    priority: 'High',
                    action: 'Launch Plant-Based Menu Section',
                    rationale: 'Market demand growing 40% with only 67% competitor adoption',
                    timeline: '2-4 weeks',
                    impact: '$2,400/month potential'
                  },
                  {
                    priority: 'Medium',
                    action: 'Extend Happy Hour to 7 PM',
                    rationale: 'Only 50% of competitors offer extended hours',
                    timeline: '1 week',
                    impact: '$800/month potential'
                  },
                  {
                    priority: 'Low',
                    action: 'Review Appetizer Pricing',
                    rationale: 'Currently 8% below market average',
                    timeline: '2 weeks',
                    impact: '$600/month potential'
                  }
                ].map((item, index) => (
                  <div key={index} className={`p-4 rounded-lg border-l-4 ${
                    item.priority === 'High' ? 'bg-red-50 border-red-400' :
                    item.priority === 'Medium' ? 'bg-yellow-50 border-yellow-400' :
                    'bg-green-50 border-green-400'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.priority === 'High' ? 'bg-red-100 text-red-800' :
                            item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {item.priority} Priority
                          </span>
                          <span className="text-sm text-gray-500">{item.timeline}</span>
                        </div>
                        <h4 className="font-medium text-gray-900 mt-2">{item.action}</h4>
                        <p className="text-sm text-gray-600 mt-1">{item.rationale}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="font-bold text-green-600">{item.impact}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Manage Competitors Modal */}
      {showCompetitorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">⚙️ Manage Competitors</h3>
              <button
                onClick={() => setShowCompetitorModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Currently Selected Competitors */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">
                  Selected Competitors ({selectedCompetitors.filter(c => c.selected).length})
                </h4>
                <div className="space-y-3">
                  {selectedCompetitors.filter(c => c.selected).map((competitor) => (
                    <div key={competitor.id} className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                          {competitor.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{competitor.name}</div>
                          <div className="text-sm text-gray-500">
                            {competitor.distance} • ⭐ {competitor.rating} • {competitor.avgPrice}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${
                          competitor.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {competitor.trend}
                        </span>
                        <button
                          onClick={() => handleCompetitorToggle(competitor.id)}
                          className="px-3 py-1 text-xs bg-red-100 text-red-700 hover:bg-red-200 rounded-md transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Available Competitors */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">
                  Available Competitors
                </h4>
                <div className="space-y-3">
                  {availableCompetitors.map((competitor) => (
                    <div key={competitor.id} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold">
                          {competitor.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{competitor.name}</div>
                          <div className="text-sm text-gray-500">
                            {competitor.distance} • ⭐ {competitor.rating} • {competitor.avgPrice}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${
                          competitor.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {competitor.trend}
                        </span>
                        <button
                          onClick={() => handleAddCompetitor(competitor)}
                          className="px-3 py-1 text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-md transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Smart Suggestions */}
            <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
              <h5 className="font-medium text-gray-900 mb-2">🤖 Smart Suggestions</h5>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• <strong>Prime Steakhouse</strong> - High-end competitor with 18% growth trend</p>
                <p>• <strong>Sushi Zen</strong> - Different cuisine but similar price point and customer base</p>
                <p>• <strong>Oak Fine Dining</strong> - Top performer in your area (4.9★ rating)</p>
              </div>
            </div>

            {/* Filter Options */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>Filter by:</span>
                <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
                  Distance
                </button>
                <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
                  Price Range
                </button>
                <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
                  Rating
                </button>
                <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
                  Cuisine Type
                </button>
              </div>
              <button
                onClick={() => setShowCompetitorModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
