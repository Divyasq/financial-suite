import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface MetricWidget {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  route: string;
  description?: string;
  breakdown?: Array<{
    label: string;
    value: string;
    subtext?: string;
  }>;
}

interface ActionAlert {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'info' | 'success';
  timestamp: string;
  primaryAction: {
    label: string;
    route: string;
  };
  secondaryAction?: {
    label: string;
    route: string;
  };
  icon: string;
  metric?: string;
}

const defaultMetricWidgets: MetricWidget[] = [
  {
    id: 'gross-sales',
    title: 'Gross Sales',
    value: '$12,234.56',
    change: '+12.5%',
    changeType: 'positive',
    route: '/financial-suite/reports/sales-summary',
    description: 'Total sales before deductions'
  },
  {
    id: 'market-position',
    title: 'Market Position',
    value: '#3 of 12',
    change: '↗️ +2 positions',
    changeType: 'positive',
    route: '/financial-suite/benchmarking',
    description: 'Your rank among similar restaurants in your area',
    breakdown: [
      { label: 'Similar Restaurants', value: '12', subtext: 'in 2-mile radius' },
      { label: 'Your Ranking', value: '#3', subtext: 'up from #5' },
      { label: 'Top Performer', value: "Mario's Bistro", subtext: '4.8★ rating' },
      { label: '🔓 Unlock Details', value: 'Upgrade →', subtext: 'See full analysis' }
    ]
  },
  {
    id: 'price-check',
    title: 'Price Check',
    value: '$18.50',
    change: '+10% vs local',
    changeType: 'neutral',
    route: '/financial-suite/benchmarking/pricing',
    description: 'Your average entrée vs local market',
    breakdown: [
      { label: 'Your Average Entrée', value: '$18.50' },
      { label: 'Local Average', value: '$16.80', subtext: 'within 1 mile' },
      { label: 'Price Premium', value: '+10.1%', subtext: 'above market' },
      { label: '🔓 Full Analysis', value: 'Upgrade →', subtext: 'Menu optimization' }
    ]
  },
  {
    id: 'performance-score',
    title: 'Performance Score',
    value: '78/100',
    change: 'Above Average',
    changeType: 'positive',
    route: '/financial-suite/benchmarking/performance',
    description: 'Overall performance vs industry benchmarks',
    breakdown: [
      { label: 'Service Speed', value: '85/100', subtext: 'Excellent' },
      { label: 'Customer Satisfaction', value: '82/100', subtext: 'Good' },
      { label: 'Operational Efficiency', value: '71/100', subtext: 'Average' },
      { label: '🔓 Detailed Breakdown', value: 'Upgrade →', subtext: 'Improvement areas' }
    ]
  }
];

const sampleActionAlerts: ActionAlert[] = [
  {
    id: 'high-comps-alert',
    title: 'High Comps Alert',
    description: 'Comps granted over $1,000 on Wednesday',
    severity: 'critical',
    timestamp: '2 minutes ago',
    primaryAction: {
      label: 'View Transactions',
      route: '/financial-suite/reports/transactions?filter=comps&date=wednesday'
    },
    secondaryAction: {
      label: 'Review Policy',
      route: '/financial-suite/settings/comp-policy'
    },
    icon: '🚨',
    metric: '$1,247'
  },
  {
    id: 'top-item-drop',
    title: 'Top Item Sales Drop',
    description: 'Signature Burger sales down 28% vs. last week',
    severity: 'warning',
    timestamp: '15 minutes ago',
    primaryAction: {
      label: 'View Trends Report',
      route: '/financial-suite/reports/item-trends?item=signature-burger'
    },
    secondaryAction: {
      label: 'Check Inventory',
      route: '/financial-suite/inventory/signature-burger'
    },
    icon: '📉',
    metric: '-28%'
  },
  {
    id: 'labor-cost-spike',
    title: 'Labor Cost Spike',
    description: 'Labor percentage at 32% vs. 28% target',
    severity: 'warning',
    timestamp: '1 hour ago',
    primaryAction: {
      label: 'Optimize Scheduling',
      route: '/financial-suite/reports/labor-analysis'
    },
    secondaryAction: {
      label: 'Manager Alert',
      route: '/financial-suite/alerts/send-manager'
    },
    icon: '⚠️',
    metric: '32%'
  },
  {
    id: 'void-spike',
    title: 'Void Activity Spike',
    description: 'Voids increased 300% vs. yesterday same time',
    severity: 'critical',
    timestamp: '5 minutes ago',
    primaryAction: {
      label: 'Investigate Voids',
      route: '/financial-suite/reports/voids?date=today'
    },
    secondaryAction: {
      label: 'Manager Override Log',
      route: '/financial-suite/reports/manager-overrides'
    },
    icon: '🔍',
    metric: '+300%'
  }
];

export function FinancialSuitePage() {
  const navigate = useNavigate();
  const [metricWidgets, setMetricWidgets] = useState<MetricWidget[]>(() => {
    const saved = localStorage.getItem('dashboardWidgets');
    return saved ? JSON.parse(saved) : defaultMetricWidgets;
  });
  const [showWidgetModal, setShowWidgetModal] = useState(false);
  const [widgetPrompt, setWidgetPrompt] = useState('');
  
  // Action Center state
  const [actionAlerts, setActionAlerts] = useState<ActionAlert[]>(() => {
    const saved = localStorage.getItem('actionAlerts');
    return saved ? JSON.parse(saved) : sampleActionAlerts;
  });
  const [showActionCenter, setShowActionCenter] = useState(true);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertPrompt, setAlertPrompt] = useState('');

  // Save widgets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('dashboardWidgets', JSON.stringify(metricWidgets));
  }, [metricWidgets]);

  // Save alerts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('actionAlerts', JSON.stringify(actionAlerts));
  }, [actionAlerts]);

  const handleWidgetClick = (widget: MetricWidget) => {
    navigate(widget.route);
  };

  const handleCreateWidget = () => {
    if (!widgetPrompt.trim()) return;

    const newWidget = generateWidgetFromPrompt(widgetPrompt);
    setMetricWidgets(prev => [...prev, newWidget]);
    
    // Close modal and reset
    setShowWidgetModal(false);
    setWidgetPrompt('');
  };

  const handleCreateAlert = () => {
    if (!alertPrompt.trim()) return;

    const newAlert = generateAlertFromPrompt(alertPrompt);
    setActionAlerts(prev => [...prev, newAlert]);
    
    // Close modal and reset
    setShowAlertModal(false);
    setAlertPrompt('');
  };

  const handleDeleteAlert = (alertId: string) => {
    setActionAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const handleDeleteWidget = (widgetId: string) => {
    setMetricWidgets(prev => prev.filter(widget => widget.id !== widgetId));
  };

  const generateAlertFromPrompt = (prompt: string): ActionAlert => {
    const lowercasePrompt = prompt.toLowerCase();
    const alertId = `alert_${Date.now()}`;
    
    // High Comps Alert
    if (lowercasePrompt.includes('comp') || lowercasePrompt.includes('discount over')) {
      const threshold = lowercasePrompt.match(/\$?(\d+)/)?.[1] || '500';
      return {
        id: alertId,
        title: 'High Comps Alert',
        description: `Comps granted over $${threshold} detected`,
        severity: 'critical',
        timestamp: 'Just now',
        primaryAction: {
          label: 'View Transactions',
          route: '/financial-suite/reports/transactions?filter=comps'
        },
        secondaryAction: {
          label: 'Review Policy',
          route: '/financial-suite/settings/comp-policy'
        },
        icon: '🚨',
        metric: `$${threshold}+`
      };
    }
    
    // Labor Cost Alert
    if (lowercasePrompt.includes('labor') || lowercasePrompt.includes('staff cost')) {
      const threshold = lowercasePrompt.match(/(\d+)%/)?.[1] || '30';
      return {
        id: alertId,
        title: 'Labor Cost Alert',
        description: `Labor percentage exceeded ${threshold}% target`,
        severity: 'warning',
        timestamp: 'Just now',
        primaryAction: {
          label: 'Optimize Scheduling',
          route: '/financial-suite/reports/labor-analysis'
        },
        secondaryAction: {
          label: 'Manager Alert',
          route: '/financial-suite/alerts/send-manager'
        },
        icon: '⚠️',
        metric: `${threshold}%+`
      };
    }
    
    // Sales Drop Alert
    if (lowercasePrompt.includes('sales drop') || lowercasePrompt.includes('revenue down')) {
      const threshold = lowercasePrompt.match(/(\d+)%/)?.[1] || '20';
      return {
        id: alertId,
        title: 'Sales Drop Alert',
        description: `Sales declined ${threshold}% vs. previous period`,
        severity: 'warning',
        timestamp: 'Just now',
        primaryAction: {
          label: 'View Trends Report',
          route: '/financial-suite/reports/sales-trends'
        },
        secondaryAction: {
          label: 'Check Promotions',
          route: '/financial-suite/promotions'
        },
        icon: '📉',
        metric: `-${threshold}%`
      };
    }
    
    // Void Spike Alert
    if (lowercasePrompt.includes('void') || lowercasePrompt.includes('cancellation')) {
      return {
        id: alertId,
        title: 'Void Spike Alert',
        description: 'Unusual void activity detected',
        severity: 'critical',
        timestamp: 'Just now',
        primaryAction: {
          label: 'Investigate Voids',
          route: '/financial-suite/reports/voids'
        },
        secondaryAction: {
          label: 'Manager Override Log',
          route: '/financial-suite/reports/manager-overrides'
        },
        icon: '🔍',
        metric: '+300%'
      };
    }
    
    // Cash Variance Alert
    if (lowercasePrompt.includes('cash') || lowercasePrompt.includes('drawer')) {
      const threshold = lowercasePrompt.match(/\$?(\d+)/)?.[1] || '50';
      return {
        id: alertId,
        title: 'Cash Variance Alert',
        description: `Cash drawer variance over $${threshold}`,
        severity: 'critical',
        timestamp: 'Just now',
        primaryAction: {
          label: 'Audit Cash Activity',
          route: '/financial-suite/reports/cash-audit'
        },
        secondaryAction: {
          label: 'Lock Register',
          route: '/financial-suite/pos/lock-register'
        },
        icon: '💰',
        metric: `$${threshold}+`
      };
    }
    
    // Inventory Alert
    if (lowercasePrompt.includes('inventory') || lowercasePrompt.includes('stock')) {
      return {
        id: alertId,
        title: 'Inventory Alert',
        description: 'Low stock on high-margin items',
        severity: 'warning',
        timestamp: 'Just now',
        primaryAction: {
          label: 'Check Inventory',
          route: '/financial-suite/inventory'
        },
        secondaryAction: {
          label: 'Reorder Items',
          route: '/financial-suite/inventory/reorder'
        },
        icon: '📦',
        metric: 'Low Stock'
      };
    }
    
    // Service Time Alert
    if (lowercasePrompt.includes('service time') || lowercasePrompt.includes('wait time')) {
      const threshold = lowercasePrompt.match(/(\d+)/)?.[1] || '15';
      return {
        id: alertId,
        title: 'Service Time Alert',
        description: `Average service time exceeded ${threshold} minutes`,
        severity: 'warning',
        timestamp: 'Just now',
        primaryAction: {
          label: 'Kitchen Performance',
          route: '/financial-suite/reports/kitchen-times'
        },
        secondaryAction: {
          label: 'Alert Kitchen Manager',
          route: '/financial-suite/alerts/kitchen'
        },
        icon: '⏱️',
        metric: `${threshold}+ min`
      };
    }
    
    // Default alert
    return {
      id: alertId,
      title: 'Custom Alert',
      description: prompt,
      severity: 'info',
      timestamp: 'Just now',
      primaryAction: {
        label: 'Investigate',
        route: '/financial-suite/reports/custom'
      },
      icon: '🔔',
      metric: 'New'
    };
  };

  const generateWidgetFromPrompt = (prompt: string): MetricWidget => {
    const lowercasePrompt = prompt.toLowerCase();
    const widgetId = `widget_${Date.now()}`;
    
    // Revenue Summary
    if (lowercasePrompt.includes('revenue summary')) {
      return {
        id: widgetId,
        title: 'Revenue Summary',
        value: '$45,678.90',
        change: '+8.2%',
        changeType: 'positive',
        route: '/financial-suite/reports/sales-summary',
        description: 'Total revenue including tips and taxes',
        breakdown: [
          { label: 'Gross Sales', value: '$38,234.56' },
          { label: 'Tips', value: '$4,123.45' },
          { label: 'Tax Amount', value: '$2,890.34' },
          { label: 'Gratuity', value: '$430.55' }
        ]
      };
    }
    
    // Tip Summary
    if (lowercasePrompt.includes('tip summary') || lowercasePrompt.includes('tips')) {
      return {
        id: widgetId,
        title: 'Tip Summary',
        value: '$3,456.78',
        change: '+12.1%',
        changeType: 'positive',
        route: '/financial-suite/reports/tips-summary',
        description: 'Total tips collected and distributed',
        breakdown: [
          { label: 'Cash Tips', value: '$1,234.56' },
          { label: 'Card Tips', value: '$2,456.78' },
          { label: 'Tips Refunded', value: '$234.56' },
          { label: 'Tips Withheld', value: '$456.78', subtext: 'For withholding enabled' }
        ]
      };
    }
    
    // Cash Summary
    if (lowercasePrompt.includes('cash summary') || lowercasePrompt.includes('cash')) {
      return {
        id: widgetId,
        title: 'Cash Summary',
        value: '$2,345.67',
        change: '+5.8%',
        changeType: 'positive',
        route: '/financial-suite/reports/cash-summary',
        description: 'Cash drawer balance and deposits',
        breakdown: [
          { label: 'Expected Closeout', value: '$2,500.00' },
          { label: 'Actual Closeout', value: '$2,345.67' },
          { label: 'Overage/Shortage', value: '-$154.33', subtext: 'Shortage' },
          { label: 'Expected Deposit', value: '$2,200.00' }
        ]
      };
    }
    
    // Payments Summary
    if (lowercasePrompt.includes('payments summary') || lowercasePrompt.includes('payment')) {
      return {
        id: widgetId,
        title: 'Payments Summary',
        value: '$42,123.45',
        change: '+7.3%',
        changeType: 'positive',
        route: '/financial-suite/reports/payments-summary',
        description: 'Breakdown by payment method',
        breakdown: [
          { label: 'Credit Cards', value: '$28,456.78', subtext: '67.5%' },
          { label: 'Cash', value: '$8,234.56', subtext: '19.5%' },
          { label: 'Gift Cards', value: '$3,456.78', subtext: '8.2%' },
          { label: 'Other', value: '$1,975.33', subtext: '4.8%' }
        ]
      };
    }
    
    // Tax Summary
    if (lowercasePrompt.includes('tax summary') || lowercasePrompt.includes('tax')) {
      return {
        id: widgetId,
        title: 'Tax Summary',
        value: '$3,789.12',
        change: '+6.1%',
        changeType: 'positive',
        route: '/financial-suite/reports/tax-summary',
        description: 'Tax collected by rate',
        breakdown: [
          { label: 'Sales Tax (8.5%)', value: '$2,456.78' },
          { label: 'City Tax (2.0%)', value: '$578.90' },
          { label: 'County Tax (1.5%)', value: '$434.22' },
          { label: 'Non-Taxable Sales', value: '$319.22' }
        ]
      };
    }
    
    // Labor Summary
    if (lowercasePrompt.includes('labor summary') || lowercasePrompt.includes('labor')) {
      return {
        id: widgetId,
        title: 'Labor Summary',
        value: '28.5%',
        change: '-1.2%',
        changeType: 'positive',
        route: '/financial-suite/reports/labor-summary',
        description: 'Labor cost as percentage of sales',
        breakdown: [
          { label: 'Regular Hours', value: '$8,234.56', subtext: '180 hrs' },
          { label: 'Overtime Hours', value: '$1,456.78', subtext: '24 hrs' },
          { label: 'Benefits', value: '$2,345.67' },
          { label: 'Total Labor Cost', value: '$12,036.01' }
        ]
      };
    }
    
    // Service Charge Summary
    if (lowercasePrompt.includes('service charge') || lowercasePrompt.includes('service')) {
      return {
        id: widgetId,
        title: 'Service Charge Summary',
        value: '$1,234.56',
        change: '+4.2%',
        changeType: 'positive',
        route: '/financial-suite/reports/service-charge-summary',
        description: 'Service charges applied',
        breakdown: [
          { label: 'Auto Gratuity (18%)', value: '$856.78', subtext: '24 orders' },
          { label: 'Large Party Fee', value: '$234.56', subtext: '8 parties' },
          { label: 'Delivery Fee', value: '$143.22', subtext: '32 deliveries' }
        ]
      };
    }
    
    // Void Summary
    if (lowercasePrompt.includes('void summary') || lowercasePrompt.includes('void')) {
      return {
        id: widgetId,
        title: 'Void Summary',
        value: '$234.56',
        change: '-8.9%',
        changeType: 'positive',
        route: '/financial-suite/reports/void-summary',
        description: 'Voided orders and items',
        breakdown: [
          { label: 'Void Amount', value: '$234.56' },
          { label: 'Order Count', value: '12', subtext: 'orders' },
          { label: 'Item Count', value: '28', subtext: 'items' },
          { label: 'Amount %', value: '0.6%', subtext: 'of total sales' }
        ]
      };
    }
    
    // Sales Category Summary
    if (lowercasePrompt.includes('sales category') || lowercasePrompt.includes('category')) {
      return {
        id: widgetId,
        title: 'Sales Category Summary',
        value: '$38,456.78',
        change: '+9.2%',
        changeType: 'positive',
        route: '/financial-suite/reports/sales-breakdown',
        description: 'Sales by product category',
        breakdown: [
          { label: 'Food', value: '$28,456.78', subtext: '74.0%' },
          { label: 'Beverages', value: '$6,234.56', subtext: '16.2%' },
          { label: 'Alcohol', value: '$2,765.44', subtext: '7.2%' },
          { label: 'Desserts', value: '$1,000.00', subtext: '2.6%' }
        ]
      };
    }
    
    // Service Mode Summary
    if (lowercasePrompt.includes('service mode') || lowercasePrompt.includes('dining option')) {
      return {
        id: widgetId,
        title: 'Service Mode Summary',
        value: '$38,901.23',
        change: '+9.1%',
        changeType: 'positive',
        route: '/financial-suite/reports/service-mode-summary',
        description: 'Sales by service type',
        breakdown: [
          { label: 'Dine In', value: '$22,456.78', subtext: '57.7%' },
          { label: 'Takeout', value: '$8,234.56', subtext: '21.2%' },
          { label: 'Delivery', value: '$5,678.90', subtext: '14.6%' },
          { label: 'Curbside', value: '$2,530.99', subtext: '6.5%' }
        ]
      };
    }
    
    // Cash Activity Summary
    if (lowercasePrompt.includes('cash activity')) {
      return {
        id: widgetId,
        title: 'Cash Activity Summary',
        value: '$8,456.78',
        change: '+3.4%',
        changeType: 'positive',
        route: '/financial-suite/reports/cash-activity',
        description: 'Cash flow and adjustments',
        breakdown: [
          { label: 'Cash Payments', value: '$8,234.56' },
          { label: 'Cash Adjustments', value: '-$234.56' },
          { label: 'Cash Refunds', value: '-$123.45' },
          { label: 'Tips Paid Out', value: '-$1,456.78' }
        ]
      };
    }
    
    // Unpaid Orders Summary
    if (lowercasePrompt.includes('unpaid orders')) {
      return {
        id: widgetId,
        title: 'Unpaid Orders Summary',
        value: '$1,234.56',
        change: '-15.2%',
        changeType: 'positive',
        route: '/financial-suite/reports/unpaid-orders',
        description: 'Outstanding unpaid amounts',
        breakdown: [
          { label: 'Unpaid Amount', value: '$1,456.78' },
          { label: 'Overpaid Amount', value: '-$222.22', subtext: 'Shows as negative' },
          { label: 'Net Unpaid', value: '$1,234.56' },
          { label: 'Order Count', value: '8', subtext: 'orders' }
        ]
      };
    }
    
    // Deferred Summary
    if (lowercasePrompt.includes('deferred summary') || lowercasePrompt.includes('deferred')) {
      return {
        id: widgetId,
        title: 'Deferred Summary',
        value: '$2,456.78',
        change: '+18.5%',
        changeType: 'positive',
        route: '/financial-suite/reports/deferred-summary',
        description: 'Gift cards and deferred payments',
        breakdown: [
          { label: 'Gross Amount', value: '$2,678.90' },
          { label: 'Discounts', value: '-$123.45' },
          { label: 'Refunds', value: '-$98.67' },
          { label: 'Net Amount', value: '$2,456.78' }
        ]
      };
    }
    
    // Market Position / Benchmarking
    if (lowercasePrompt.includes('market position') || lowercasePrompt.includes('benchmark') || lowercasePrompt.includes('competitor')) {
      return {
        id: widgetId,
        title: 'Market Position',
        value: '#3 of 12',
        change: '↗️ +2 positions',
        changeType: 'positive',
        route: '/financial-suite/benchmarking',
        description: 'Your rank among similar restaurants in your area',
        breakdown: [
          { label: 'Similar Restaurants', value: '12', subtext: 'in 2-mile radius' },
          { label: 'Your Ranking', value: '#3', subtext: 'up from #5' },
          { label: 'Top Performer', value: "Mario's Bistro", subtext: '4.8★ rating' },
          { label: '🔓 Unlock Details', value: 'Upgrade →', subtext: 'See full analysis' }
        ]
      };
    }

    // Price Analysis
    if (lowercasePrompt.includes('price check') || lowercasePrompt.includes('pricing') || lowercasePrompt.includes('menu price')) {
      return {
        id: widgetId,
        title: 'Price Check',
        value: '$18.50',
        change: '+10% vs local',
        changeType: 'neutral',
        route: '/financial-suite/benchmarking/pricing',
        description: 'Your average entrée vs local market',
        breakdown: [
          { label: 'Your Average Entrée', value: '$18.50' },
          { label: 'Local Average', value: '$16.80', subtext: 'within 1 mile' },
          { label: 'Price Premium', value: '+10.1%', subtext: 'above market' },
          { label: '🔓 Full Analysis', value: 'Upgrade →', subtext: 'Menu optimization' }
        ]
      };
    }

    // Performance Score
    if (lowercasePrompt.includes('performance score') || lowercasePrompt.includes('performance benchmark')) {
      return {
        id: widgetId,
        title: 'Performance Score',
        value: '78/100',
        change: 'Above Average',
        changeType: 'positive',
        route: '/financial-suite/benchmarking/performance',
        description: 'Overall performance vs industry benchmarks',
        breakdown: [
          { label: 'Service Speed', value: '85/100', subtext: 'Excellent' },
          { label: 'Customer Satisfaction', value: '82/100', subtext: 'Good' },
          { label: 'Operational Efficiency', value: '71/100', subtext: 'Average' },
          { label: '🔓 Detailed Breakdown', value: 'Upgrade →', subtext: 'Improvement areas' }
        ]
      };
    }

    // Default widget
    return {
      id: widgetId,
      title: 'Custom Metric',
      value: '$1,234.56',
      change: '+5.0%',
      changeType: 'positive',
      route: '/financial-suite/reports/custom',
      description: prompt
    };
  };

  const handleCreateCustomReport = () => {
    navigate('/financial-suite/custom-reports/create');
  };

  const handleViewReports = () => {
    navigate('/financial-suite/reports');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Financial Suite</h1>
              <p className="text-sm text-gray-600 mt-1">
                Comprehensive analytics and custom reporting for your business
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="inline-flex items-center justify-center px-3 py-2 text-sm border border-gray-300 bg-white text-blue-600 hover:bg-gray-50 rounded-md font-medium transition-colors">
                📅 Last 30 days
              </button>
              <button className="inline-flex items-center justify-center px-3 py-2 text-sm border border-gray-300 bg-white text-blue-600 hover:bg-gray-50 rounded-md font-medium transition-colors">
                🔍 Filters
              </button>
              <button className="inline-flex items-center justify-center px-3 py-2 text-sm border border-gray-300 bg-white text-blue-600 hover:bg-gray-50 rounded-md font-medium transition-colors">
                📥 Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="flex space-x-4">
            <button onClick={handleCreateCustomReport} className="inline-flex items-center justify-center px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md font-medium transition-colors">
              ➕ Create Custom Report
            </button>
            <button onClick={handleViewReports} className="inline-flex items-center justify-center px-4 py-2 text-sm border border-gray-300 bg-white text-blue-600 hover:bg-gray-50 rounded-md font-medium transition-colors">
              📊 View All Reports
            </button>
          </div>
        </div>

        {/* Action Center */}
        {actionAlerts.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <h2 className="text-lg font-semibold text-gray-900">🚨 Action Center</h2>
                <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  {actionAlerts.filter(alert => alert.severity === 'critical').length} Critical
                </span>
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  {actionAlerts.filter(alert => alert.severity === 'warning').length} Warning
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowAlertModal(true)}
                  className="inline-flex items-center justify-center px-3 py-2 text-sm border border-gray-300 bg-white text-blue-600 hover:bg-gray-50 rounded-md font-medium transition-colors"
                >
                  ➕ Add Alert
                </button>
                <button 
                  onClick={() => setShowActionCenter(!showActionCenter)}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  {showActionCenter ? '🔽 Collapse' : '🔼 Expand'}
                </button>
              </div>
            </div>
            
            {showActionCenter && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {actionAlerts.map((alert) => {
                  const getSeverityStyles = (severity: string) => {
                    switch (severity) {
                      case 'critical':
                        return 'border-red-200 bg-red-50';
                      case 'warning':
                        return 'border-yellow-200 bg-yellow-50';
                      case 'info':
                        return 'border-blue-200 bg-blue-50';
                      case 'success':
                        return 'border-green-200 bg-green-50';
                      default:
                        return 'border-gray-200 bg-white';
                    }
                  };

                  const getMetricColor = (severity: string) => {
                    switch (severity) {
                      case 'critical':
                        return 'text-red-600';
                      case 'warning':
                        return 'text-yellow-600';
                      case 'info':
                        return 'text-blue-600';
                      case 'success':
                        return 'text-green-600';
                      default:
                        return 'text-gray-600';
                    }
                  };

                  return (
                    <div 
                      key={alert.id}
                      className={`rounded-lg border p-4 ${getSeverityStyles(alert.severity)} hover:shadow-md transition-shadow`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{alert.icon}</span>
                          <div>
                            <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {alert.metric && (
                            <span className={`text-lg font-bold ${getMetricColor(alert.severity)}`}>
                              {alert.metric}
                            </span>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAlert(alert.id);
                            }}
                            className="text-gray-400 hover:text-red-600 transition-colors p-1"
                            title="Remove alert"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{alert.timestamp}</span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => navigate(alert.primaryAction.route)}
                            className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                          >
                            {alert.primaryAction.label}
                          </button>
                          {alert.secondaryAction && (
                            <button
                              onClick={() => navigate(alert.secondaryAction.route)}
                              className="px-3 py-1 text-xs border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                            >
                              {alert.secondaryAction.label}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Key Metrics Dashboard */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Key Metrics</h2>
            <button onClick={() => setShowWidgetModal(true)} className="inline-flex items-center justify-center px-3 py-2 text-sm border border-gray-300 bg-white text-blue-600 hover:bg-gray-50 rounded-md font-medium transition-colors">
              ➕ Add Widget
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metricWidgets.map((widget) => {
              return (
                <div 
                  key={widget.id}
                  className={`bg-white rounded-lg border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow ${
                    widget.breakdown ? 'row-span-2' : ''
                  }`}
                  onClick={() => handleWidgetClick(widget)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      💰
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${
                        widget.changeType === 'positive' 
                          ? 'text-green-600' 
                          : widget.changeType === 'negative'
                          ? 'text-red-600'
                          : 'text-gray-600'
                      }`}>
                        {widget.change}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteWidget(widget.id);
                        }}
                        className="text-gray-400 hover:text-red-600 transition-colors p-1"
                        title="Remove widget"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-600 mb-1">
                      {widget.title}
                    </h3>
                    <p className="text-2xl font-bold text-gray-900">
                      {widget.value}
                    </p>
                  </div>
                  
                  {/* Breakdown Table */}
                  {widget.breakdown && (
                    <div className="border-t pt-4">
                      <div className="space-y-2">
                        {widget.breakdown.map((item, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <div className="flex-1">
                              <span className="text-gray-700">{item.label}</span>
                              {item.subtext && (
                                <span className="text-gray-500 ml-2">({item.subtext})</span>
                              )}
                            </div>
                            <span className={`font-medium ${
                              item.value.startsWith('-') ? 'text-red-600' : 'text-gray-900'
                            }`}>
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Reports */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
              <button className="inline-flex items-center justify-center px-3 py-2 text-sm border border-gray-300 bg-white text-blue-600 hover:bg-gray-50 rounded-md font-medium transition-colors">View All</button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">Sales Summary</p>
                  <p className="text-sm text-gray-600">Last run: 2 hours ago</p>
                </div>
                <button className="inline-flex items-center justify-center px-3 py-2 text-sm border border-gray-300 bg-white text-blue-600 hover:bg-gray-50 rounded-md font-medium transition-colors">View</button>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">Items Performance</p>
                  <p className="text-sm text-gray-600">Last run: 1 day ago</p>
                </div>
                <button className="inline-flex items-center justify-center px-3 py-2 text-sm border border-gray-300 bg-white text-blue-600 hover:bg-gray-50 rounded-md font-medium transition-colors">View</button>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-gray-900">Customer Analysis</p>
                  <p className="text-sm text-gray-600">Last run: 3 days ago</p>
                </div>
                <button className="inline-flex items-center justify-center px-3 py-2 text-sm border border-gray-300 bg-white text-blue-600 hover:bg-gray-50 rounded-md font-medium transition-colors">View</button>
              </div>
            </div>
          </div>

          {/* Custom Reports */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Custom Reports</h3>
              <button onClick={handleCreateCustomReport} className="inline-flex items-center justify-center px-3 py-2 text-sm border border-gray-300 bg-white text-blue-600 hover:bg-gray-50 rounded-md font-medium transition-colors">
                Create New
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">Weekly Performance Dashboard</p>
                  <p className="text-sm text-gray-600">Created: 1 week ago</p>
                </div>
                <button className="inline-flex items-center justify-center px-3 py-2 text-sm border border-gray-300 bg-white text-blue-600 hover:bg-gray-50 rounded-md font-medium transition-colors">Edit</button>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">Product Category Analysis</p>
                  <p className="text-sm text-gray-600">Created: 2 weeks ago</p>
                </div>
                <button className="inline-flex items-center justify-center px-3 py-2 text-sm border border-gray-300 bg-white text-blue-600 hover:bg-gray-50 rounded-md font-medium transition-colors">Edit</button>
              </div>
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">Start building custom reports tailored to your business needs</p>
                <button onClick={handleCreateCustomReport} className="inline-flex items-center justify-center px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md font-medium transition-colors">
                  ➕ Create Your First Custom Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Widget Modal */}
      {showWidgetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add Dashboard Widget</h3>
              <button
                onClick={() => setShowWidgetModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe the widget you want to add
                </label>
                <textarea
                  value={widgetPrompt}
                  onChange={(e) => setWidgetPrompt(e.target.value)}
                  placeholder="e.g., tip summary, labor cost, cash summary..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="border-t pt-4">
                <p className="text-sm font-medium text-gray-700 mb-3">Or choose from common widgets:</p>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                  {[
                    'Revenue Summary',
                    'Tip Summary',
                    'Labor Summary',
                    'Cash Summary',
                    'Market Position',
                    'Price Check',
                    'Performance Score',
                    'Payments Summary',
                    'Tax Summary'
                  ].map((example) => (
                    <button
                      key={example}
                      onClick={() => setWidgetPrompt(example.toLowerCase())}
                      className="text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  onClick={() => setShowWidgetModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateWidget}
                  disabled={!widgetPrompt.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Add Widget
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Alert Modal */}
      {showAlertModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">🚨 Add Action Alert</h3>
              <button
                onClick={() => setShowAlertModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe the alert you want to monitor
                </label>
                <textarea
                  value={alertPrompt}
                  onChange={(e) => setAlertPrompt(e.target.value)}
                  placeholder="e.g., alert me when comps exceed $500, notify when labor cost goes above 30%..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="border-t pt-4">
                <p className="text-sm font-medium text-gray-700 mb-3">Or choose from common alerts:</p>
                <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                  {[
                    'High Comps Alert ($1000+)',
                    'Labor Cost Spike (30%+)',
                    'Sales Drop Alert (20%+)',
                    'Void Activity Spike',
                    'Cash Drawer Variance ($50+)',
                    'Service Time Alert (15+ min)',
                    'Inventory Low Stock',
                    'Payment Failures Spike'
                  ].map((example) => (
                    <button
                      key={example}
                      onClick={() => setAlertPrompt(example.toLowerCase())}
                      className="text-left px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-lg border border-gray-200 hover:border-red-300 transition-colors"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  onClick={() => setShowAlertModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateAlert}
                  disabled={!alertPrompt.trim()}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Create Alert
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
