import React, { useState } from 'react';
import { 
  ChefHat, 
  Calculator, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle, 
  Package, 
  DollarSign,
  Clock,
  Trash2,
  Plus,
  Search,
  Filter,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Zap,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  Wifi,
  WifiOff,
  Database,
  Upload,
  Settings
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import {
  mockIngredients,
  mockRecipes,
  mockWasteEntries,
  mockCostVariances,
  mockProfitabilityAnalysis,
  mockWastePatterns,
  mockInventoryItems
} from '../data/mockIngredientTracking';

export function IngredientTrackingPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'recipes' | 'costs' | 'inventory' | 'analytics'>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate summary metrics
  const totalIngredients = mockIngredients.length;
  const activeRecipes = mockRecipes.filter(r => r.isActive).length;
  const totalWasteCost = mockWasteEntries.reduce((sum, entry) => sum + entry.cost, 0);
  const avgMargin = mockRecipes.reduce((sum, recipe) => sum + recipe.margin, 0) / mockRecipes.length;
  const highVarianceItems = mockCostVariances.filter(v => v.impact === 'high').length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Advanced Ingredient Tracking</h1>
          <p className="text-gray-600 mt-1">
            Recipe costing, waste analysis, and inventory optimization
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Sync Inventory
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Recipe
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'recipes', label: 'Recipe Management', icon: ChefHat },
            { id: 'costs', label: 'Cost Analysis', icon: Calculator },
            { id: 'inventory', label: 'Inventory Integration', icon: Package },
            { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 }
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
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Ingredients</p>
                  <p className="text-2xl font-bold text-gray-900">{totalIngredients}</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-xs text-gray-500 mt-2">Across all categories</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Recipes</p>
                  <p className="text-2xl font-bold text-gray-900">{activeRecipes}</p>
                </div>
                <ChefHat className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-xs text-gray-500 mt-2">Ready for production</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Waste Cost (Today)</p>
                  <p className="text-2xl font-bold text-red-600">${totalWasteCost.toFixed(2)}</p>
                </div>
                <Trash2 className="h-8 w-8 text-red-600" />
              </div>
              <p className="text-xs text-red-500 mt-2">↑ 12% from yesterday</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Margin</p>
                  <p className="text-2xl font-bold text-green-600">{avgMargin.toFixed(1)}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-xs text-green-500 mt-2">↑ 2.3% this week</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Cost Alerts</p>
                  <p className="text-2xl font-bold text-orange-600">{highVarianceItems}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
              <p className="text-xs text-orange-500 mt-2">Require attention</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="flex items-center gap-2 justify-start p-4 h-auto">
                <ChefHat className="h-5 w-5 text-blue-600" />
                <div className="text-left">
                  <div className="font-medium">Recipe Builder</div>
                  <div className="text-sm text-gray-500">Create new recipes</div>
                </div>
              </Button>
              
              <Button variant="outline" className="flex items-center gap-2 justify-start p-4 h-auto">
                <Calculator className="h-5 w-5 text-green-600" />
                <div className="text-left">
                  <div className="font-medium">Cost Calculator</div>
                  <div className="text-sm text-gray-500">Analyze recipe costs</div>
                </div>
              </Button>
              
              <Button variant="outline" className="flex items-center gap-2 justify-start p-4 h-auto">
                <Trash2 className="h-5 w-5 text-red-600" />
                <div className="text-left">
                  <div className="font-medium">Waste Tracker</div>
                  <div className="text-sm text-gray-500">Log waste entries</div>
                </div>
              </Button>
              
              <Button variant="outline" className="flex items-center gap-2 justify-start p-4 h-auto">
                <Package className="h-5 w-5 text-purple-600" />
                <div className="text-left">
                  <div className="font-medium">Inventory Sync</div>
                  <div className="text-sm text-gray-500">Update stock levels</div>
                </div>
              </Button>
            </div>
          </div>

          {/* Top Recipes by Profitability */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Top Recipes by Margin</h3>
              <div className="space-y-4">
                {mockRecipes
                  .sort((a, b) => b.margin - a.margin)
                  .slice(0, 5)
                  .map(recipe => (
                    <div key={recipe.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{recipe.name}</div>
                        <div className="text-sm text-gray-600">Cost: ${recipe.costPerPortion.toFixed(2)}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">{recipe.margin.toFixed(1)}%</div>
                        <div className="text-sm text-gray-500">${recipe.suggestedPrice.toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Waste Hotspots</h3>
              <div className="space-y-4">
                {mockWastePatterns.map((pattern, index) => {
                  const ingredient = mockIngredients.find(ing => ing.id === pattern.ingredientId);
                  return (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{ingredient?.name}</div>
                        <div className="text-sm text-gray-600">
                          {pattern.wasteReasons[0].reason}: {pattern.wasteReasons[0].percentage}%
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-red-600">{pattern.averageWastePercentage.toFixed(1)}%</div>
                        <div className="text-sm text-gray-500">${pattern.costImpact.toFixed(2)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Cost Variance Alerts */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Cost Variance Alerts</h3>
            <div className="space-y-3">
              {mockCostVariances.map((variance, index) => {
                const ingredient = mockIngredients.find(ing => ing.id === variance.ingredientId);
                return (
                  <div key={index} className="flex items-center justify-between p-4 border-l-4 border-orange-400 bg-orange-50 rounded-r-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      <div>
                        <div className="font-medium text-gray-900">{ingredient?.name}</div>
                        <div className="text-sm text-gray-600">{variance.reason}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-orange-600">+{variance.variance.toFixed(1)}%</div>
                      <div className="text-sm text-gray-500">+${variance.varianceAmount.toFixed(2)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Recipe Management Tab */}
      {activeTab === 'recipes' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Recipe
            </Button>
          </div>

          {/* Recipe Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockRecipes
              .filter(recipe => 
                recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                recipe.category.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(recipe => (
                <div key={recipe.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{recipe.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">{recipe.category}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      recipe.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {recipe.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Cost per portion:</span>
                      <span className="font-medium">${recipe.costPerPortion.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Suggested price:</span>
                      <span className="font-medium">${recipe.suggestedPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Margin:</span>
                      <span className={`font-medium ${
                        recipe.margin > 70 ? 'text-green-600' : 
                        recipe.margin > 50 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {recipe.margin.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Prep time:</span>
                      <span className="font-medium">{recipe.prepTime + recipe.cookTime} min</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Popularity:</span>
                      <span className="font-medium">{recipe.popularity}/100</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      {recipe.tags?.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Edit Recipe
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Calculator className="h-3 w-3" />
                      Recalc
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Cost Analysis Tab */}
      {activeTab === 'costs' && (
        <div className="space-y-6">
          {/* Cost Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-green-600">-2.3%</span>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Total Food Cost</h3>
              <p className="text-2xl font-bold text-gray-900">$2,847.32</p>
              <p className="text-xs text-gray-500 mt-1">This week</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <span className="text-sm font-medium text-green-600">+1.8%</span>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Cost Per Portion</h3>
              <p className="text-2xl font-bold text-gray-900">$4.23</p>
              <p className="text-xs text-gray-500 mt-1">Average across all recipes</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                </div>
                <span className="text-sm font-medium text-red-600">+12.5%</span>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Price Volatility</h3>
              <p className="text-2xl font-bold text-gray-900">8 Items</p>
              <p className="text-xs text-gray-500 mt-1">High variance this month</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-green-600">On Target</span>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Budget Performance</h3>
              <p className="text-2xl font-bold text-gray-900">97.2%</p>
              <p className="text-xs text-gray-500 mt-1">Of monthly budget used</p>
            </div>
          </div>

          {/* Cost Variance Analysis */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Cost Variance Analysis</h3>
              <div className="flex items-center gap-2">
                <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option>Last 30 days</option>
                  <option>Last 7 days</option>
                  <option>This month</option>
                </select>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {mockCostVariances.map((variance, index) => {
                const ingredient = mockIngredients.find(ing => ing.id === variance.ingredientId);
                return (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${
                        variance.impact === 'high' ? 'bg-red-500' :
                        variance.impact === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <div>
                        <h4 className="font-medium text-gray-900">{ingredient?.name}</h4>
                        <p className="text-sm text-gray-600">{variance.reason}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-4">
                        <div className="text-sm">
                          <span className="text-gray-500">Expected: </span>
                          <span className="font-medium">${variance.expectedCost.toFixed(2)}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Actual: </span>
                          <span className="font-medium">${variance.actualCost.toFixed(2)}</span>
                        </div>
                        <div className={`font-bold ${variance.variance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {variance.variance > 0 ? '+' : ''}{variance.variance.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Price Trend Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Price Trends (Last 30 Days)</h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Interactive price trend chart</p>
                  <p className="text-sm text-gray-500">Showing ingredient price movements</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Cost Distribution by Category</h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Category cost breakdown</p>
                  <p className="text-sm text-gray-500">Proteins, Produce, Dairy, etc.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cost Optimization Recommendations */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">💡 Cost Optimization Recommendations</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <TrendingDown className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900">Switch to Seasonal Supplier</h4>
                  <p className="text-sm text-green-700">Roma Tomatoes: Switch to local supplier during summer months. Potential savings: $0.90/lb (32% reduction)</p>
                  <button className="text-sm text-green-600 hover:text-green-800 mt-2 font-medium">View Details →</button>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Bulk Purchase Opportunity</h4>
                  <p className="text-sm text-blue-700">Arborio Rice: 15% discount available for orders over 50 lbs. Current usage: 12 lbs/week</p>
                  <button className="text-sm text-blue-600 hover:text-blue-800 mt-2 font-medium">Calculate Savings →</button>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900">Recipe Optimization</h4>
                  <p className="text-sm text-yellow-700">Mushroom Risotto: Consider reducing portion size by 10% or adjusting ingredient ratios to improve margin</p>
                  <button className="text-sm text-yellow-600 hover:text-yellow-800 mt-2 font-medium">Optimize Recipe →</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Integration Tab */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          {/* Integration Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Database className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">BevSpot</h3>
                    <p className="text-sm text-gray-600">Inventory Management</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">Connected</span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Sync:</span>
                  <span className="font-medium">2 minutes ago</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Items Synced:</span>
                  <span className="font-medium">247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status:</span>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Sync Now
                </Button>
                <Button size="sm" variant="outline">
                  <Settings className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">MarketMan</h3>
                    <p className="text-sm text-gray-600">Procurement & Costing</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">Connected</span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Sync:</span>
                  <span className="font-medium">5 minutes ago</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Recipes Synced:</span>
                  <span className="font-medium">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status:</span>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Sync Now
                </Button>
                <Button size="sm" variant="outline">
                  <Settings className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Activity className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Square POS</h3>
                    <p className="text-sm text-gray-600">Sales & Usage Data</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <WifiOff className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-600">Pending</span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Sync:</span>
                  <span className="font-medium">1 hour ago</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Transactions:</span>
                  <span className="font-medium">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status:</span>
                  <span className="text-yellow-600 font-medium">Syncing</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Retry Sync
                </Button>
                <Button size="sm" variant="outline">
                  <Settings className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* Current Inventory Levels */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Current Inventory Levels</h3>
              <div className="flex items-center gap-2">
                <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option>All Categories</option>
                  <option>Proteins</option>
                  <option>Produce</option>
                  <option>Dairy</option>
                  <option>Grains</option>
                </select>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {mockIngredients.map((ingredient, index) => {
                const inventoryItem = mockInventoryItems.find(item => item.ingredientId === ingredient.id);
                const stockLevel = inventoryItem?.currentStock || Math.random() * 50 + 10;
                const isLowStock = stockLevel < 15;
                const daysUntilExpiry = inventoryItem?.expirationDate 
                  ? Math.ceil((new Date(inventoryItem.expirationDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                  : Math.floor(Math.random() * 14) + 1;

                return (
                  <div key={ingredient.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${
                        isLowStock ? 'bg-red-500' : stockLevel < 25 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <div>
                        <h4 className="font-medium text-gray-900">{ingredient.name}</h4>
                        <p className="text-sm text-gray-600 capitalize">{ingredient.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {stockLevel.toFixed(1)} {ingredient.unit}
                        </div>
                        <div className={`text-xs ${isLowStock ? 'text-red-600' : 'text-gray-500'}`}>
                          {isLowStock ? 'Low Stock' : 'In Stock'}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          ${ingredient.costPerUnit.toFixed(2)}/{ingredient.unit}
                        </div>
                        <div className="text-xs text-gray-500">
                          Current Price
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${daysUntilExpiry <= 3 ? 'text-red-600' : daysUntilExpiry <= 7 ? 'text-yellow-600' : 'text-gray-900'}`}>
                          {daysUntilExpiry} days
                        </div>
                        <div className="text-xs text-gray-500">
                          Until expiry
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Reorder
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Usage Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Usage vs Projected</h3>
              <div className="space-y-4">
                {mockIngredients.slice(0, 4).map((ingredient, index) => {
                  const projected = Math.random() * 20 + 10;
                  const actual = projected * (0.8 + Math.random() * 0.4);
                  const variance = ((actual - projected) / projected) * 100;

                  return (
                    <div key={ingredient.id} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{ingredient.name}</div>
                        <div className="text-sm text-gray-600">This week</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right text-sm">
                          <div>Projected: {projected.toFixed(1)} {ingredient.unit}</div>
                          <div>Actual: {actual.toFixed(1)} {ingredient.unit}</div>
                        </div>
                        <div className={`font-bold text-sm ${variance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {variance > 0 ? '+' : ''}{variance.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Reorder Recommendations</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-900">Urgent: Organic Spinach</h4>
                    <p className="text-sm text-red-700">Current: 8.2 lbs | Recommended: 25 lbs</p>
                    <button className="text-sm text-red-600 hover:text-red-800 mt-1 font-medium">Order Now →</button>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-900">Soon: Chicken Breast</h4>
                    <p className="text-sm text-yellow-700">Current: 25.5 lbs | Recommended: 40 lbs</p>
                    <button className="text-sm text-yellow-600 hover:text-yellow-800 mt-1 font-medium">Schedule Order →</button>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <Target className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Optimal: Mozzarella Cheese</h4>
                    <p className="text-sm text-blue-700">Current: 12.0 lbs | Status: Well stocked</p>
                    <button className="text-sm text-blue-600 hover:text-blue-800 mt-1 font-medium">View Details →</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Integration Setup */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">🔗 Add New Integration</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <Database className="h-8 w-8 text-purple-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">Toast POS</h4>
                    <p className="text-sm text-gray-600">Restaurant POS System</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full">
                  Connect
                </Button>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <Package className="h-8 w-8 text-green-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">Resy POS</h4>
                    <p className="text-sm text-gray-600">Reservation & POS</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full">
                  Connect
                </Button>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <Activity className="h-8 w-8 text-blue-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">Custom API</h4>
                    <p className="text-sm text-gray-600">Custom Integration</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full">
                  Configure
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics & Reports Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Report Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Cost Reports</h3>
                  <p className="text-sm text-gray-600">12 reports</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">Ingredient costs, variance analysis, and budget tracking</p>
              <Button size="sm" variant="outline" className="w-full">
                View Reports
              </Button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Profitability</h3>
                  <p className="text-sm text-gray-600">8 reports</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">Recipe margins, profit analysis, and pricing optimization</p>
              <Button size="sm" variant="outline" className="w-full">
                View Reports
              </Button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Trash2 className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Waste Analysis</h3>
                  <p className="text-sm text-gray-600">6 reports</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">Waste tracking, cost impact, and reduction strategies</p>
              <Button size="sm" variant="outline" className="w-full">
                View Reports
              </Button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Activity className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Usage Analytics</h3>
                  <p className="text-sm text-gray-600">10 reports</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">Consumption patterns, forecasting, and inventory optimization</p>
              <Button size="sm" variant="outline" className="w-full">
                View Reports
              </Button>
            </div>
          </div>

          {/* Recent Reports */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Recent Reports</h3>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Report
              </Button>
            </div>

            <div className="space-y-4">
              {[
                {
                  name: 'Weekly Cost Variance Analysis',
                  type: 'Cost Report',
                  lastRun: '2 hours ago',
                  status: 'completed',
                  insights: '3 high-variance items identified'
                },
                {
                  name: 'Recipe Profitability Ranking',
                  type: 'Profitability',
                  lastRun: '1 day ago',
                  status: 'completed',
                  insights: 'Mushroom Risotto margin improved by 5.2%'
                },
                {
                  name: 'Waste Pattern Analysis',
                  type: 'Waste Analysis',
                  lastRun: '2 days ago',
                  status: 'completed',
                  insights: 'Spinach waste reduced by 18% this week'
                },
                {
                  name: 'Seasonal Forecasting Report',
                  type: 'Usage Analytics',
                  lastRun: '3 days ago',
                  status: 'scheduled',
                  insights: 'Winter pricing adjustments recommended'
                }
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${
                      report.status === 'completed' ? 'bg-green-500' : 
                      report.status === 'scheduled' ? 'bg-blue-500' : 'bg-gray-500'
                    }`}></div>
                    <div>
                      <h4 className="font-medium text-gray-900">{report.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{report.type}</span>
                        <span>•</span>
                        <span>Last run: {report.lastRun}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{report.insights}</div>
                      <div className={`text-xs ${
                        report.status === 'completed' ? 'text-green-600' : 
                        report.status === 'scheduled' ? 'text-blue-600' : 'text-gray-600'
                      }`}>
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Performance Metrics</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Food Cost %</span>
                    <span className="text-sm font-bold text-green-600">28.5%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '71.5%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Target: 30%</span>
                    <span>Industry Avg: 32%</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Waste Reduction</span>
                    <span className="text-sm font-bold text-green-600">-15.2%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '84.8%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>vs Last Month</span>
                    <span>Goal: -20%</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Recipe Optimization</span>
                    <span className="text-sm font-bold text-blue-600">67%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '67%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Recipes Optimized</span>
                    <span>Target: 80%</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Forecast Accuracy</span>
                    <span className="text-sm font-bold text-purple-600">89.3%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{width: '89.3%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Last 30 Days</span>
                    <span>Target: 85%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Trending Insights</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900">Margin Improvement</h4>
                    <p className="text-sm text-green-700">Caesar Salad recipe optimization increased margin by 4.2% this week</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <Target className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Forecast Accuracy</h4>
                    <p className="text-sm text-blue-700">Chicken breast usage prediction was 96% accurate this week</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-900">Cost Alert</h4>
                    <p className="text-sm text-yellow-700">Olive oil prices trending up 8% - consider bulk purchasing</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <Zap className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-purple-900">Efficiency Gain</h4>
                    <p className="text-sm text-purple-700">New supplier integration reduced ordering time by 35%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Custom Report Builder */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">🛠️ Custom Report Builder</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Data Sources</h4>
                <div className="space-y-2">
                  {['Ingredients', 'Recipes', 'Costs', 'Waste', 'Inventory', 'Sales'].map(source => (
                    <label key={source} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700">{source}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Time Period</h4>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mb-3">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>Custom range</option>
                </select>
                
                <h4 className="font-medium text-gray-900 mb-3">Report Type</h4>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option>Summary Report</option>
                  <option>Detailed Analysis</option>
                  <option>Trend Analysis</option>
                  <option>Comparison Report</option>
                </select>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Output Format</h4>
                <div className="space-y-2 mb-4">
                  {['PDF', 'Excel', 'CSV', 'Dashboard'].map(format => (
                    <label key={format} className="flex items-center gap-2">
                      <input type="radio" name="format" className="border-gray-300" />
                      <span className="text-sm text-gray-700">{format}</span>
                    </label>
                  ))}
                </div>
                
                <Button className="w-full">
                  Generate Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
