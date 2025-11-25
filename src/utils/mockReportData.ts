import { ReportData, ReportRow, REPORT_GRAINS } from '../types/reportData';
import { REPORT_TEMPLATES } from '../data/reportTemplates';

// Sample data pools for generating realistic mock data
const SAMPLE_DATA = {
  items: [
    'Margherita Pizza', 'Pepperoni Pizza', 'Caesar Salad', 'Chicken Wings', 'Burger Deluxe',
    'Fish Tacos', 'Pasta Carbonara', 'Grilled Salmon', 'Ribeye Steak', 'Veggie Wrap',
    'Chocolate Cake', 'Tiramisu', 'Coffee', 'Craft Beer', 'House Wine'
  ],
  categories: [
    'Pizza', 'Salads', 'Appetizers', 'Burgers', 'Seafood', 'Pasta', 'Steaks', 'Wraps', 'Desserts', 'Beverages'
  ],
  employees: [
    'Sarah Johnson', 'Mike Chen', 'Emily Rodriguez', 'David Kim', 'Jessica Brown',
    'Alex Thompson', 'Maria Garcia', 'James Wilson', 'Ashley Davis', 'Ryan Martinez'
  ],
  locations: ['Downtown', 'Mall Location', 'Airport', 'Westside'],
  channels: ['In-Store', 'Online', 'Mobile App', 'Phone Order'],
  paymentMethods: ['Credit Card', 'Debit Card', 'Cash', 'Gift Card', 'Apple Pay', 'Google Pay'],
  cardBrands: ['Visa', 'Mastercard', 'American Express', 'Discover'],
  discountNames: ['Happy Hour 20%', 'Student Discount', 'Senior Discount', 'Employee Meal', 'Loyalty Reward', 'Birthday Special'],
  modifierNames: ['Extra Cheese', 'No Onions', 'Extra Sauce', 'Gluten Free', 'Spicy', 'Large Size', 'Medium Rare', 'Side Salad', 'Extra Bacon', 'No Pickles'],
  modifierSets: ['Pizza Toppings', 'Burger Options', 'Salad Dressings', 'Steak Temperature', 'Drink Sizes', 'Side Options'],
  sections: ['Dining Room', 'Bar', 'Patio', 'Private Room', 'Counter Service', 'Drive Thru'],
  customerTypes: ['New Customer', 'Returning Customer', 'Loyalty Member', 'VIP Member'],
  orderNames: ['Order #1001', 'Order #1002', 'Order #1003', 'Order #1004', 'Order #1005'],
  devices: ['POS Terminal 1', 'POS Terminal 2', 'Mobile Device', 'Tablet', 'Kiosk'],
  itemTypes: ['Food', 'Beverage', 'Dessert', 'Appetizer', 'Main Course', 'Side Dish'],
  
  // Cost data for profitability analysis
  unitCosts: {
    'Margherita Pizza': 4.50,
    'Pepperoni Pizza': 5.25,
    'Caesar Salad': 3.75,
    'Chicken Wings': 6.80,
    'Burger Deluxe': 5.90,
    'Fish Tacos': 7.25,
    'Pasta Carbonara': 4.10,
    'Grilled Salmon': 12.50,
    'Ribeye Steak': 18.75,
    'Veggie Wrap': 3.40,
    'Chocolate Cake': 2.80,
    'Tiramisu': 3.60,
    'Coffee': 0.85,
    'Craft Beer': 2.25,
    'House Wine': 3.50
  },
  laborRates: {
    'Morning': 15.50,    // $/hour
    'Afternoon': 16.00,
    'Evening': 17.25,
    'Late Night': 18.50
  },
  categoryMargins: {
    'Pizza': 0.65,       // 65% margin
    'Salads': 0.72,      // 72% margin
    'Appetizers': 0.68,  // 68% margin
    'Burgers': 0.62,     // 62% margin
    'Seafood': 0.58,     // 58% margin
    'Pasta': 0.70,       // 70% margin
    'Steaks': 0.55,      // 55% margin
    'Wraps': 0.75,       // 75% margin
    'Desserts': 0.78,    // 78% margin
    'Beverages': 0.85    // 85% margin
  }
};

function randomFromArray<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomCurrency(min: number, max: number): number {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

function formatNumber(num: number): string {
  return num.toLocaleString();
}

function formatPercentage(num: number): string {
  return `${(num * 100).toFixed(1)}%`;
}

function getDimensionValue(dimensionId: string): string {
  switch (dimensionId) {
    case 'item_name':
      return randomFromArray(SAMPLE_DATA.items);
    case 'category':
    case 'category_rollup':
      return randomFromArray(SAMPLE_DATA.categories);
    case 'employee_name':
      return randomFromArray(SAMPLE_DATA.employees);
    case 'location':
      return randomFromArray(SAMPLE_DATA.locations);
    case 'payment_method':
      return randomFromArray(SAMPLE_DATA.paymentMethods);
    case 'discount_name':
      return randomFromArray(SAMPLE_DATA.discountNames);
    case 'modifier_name':
      return randomFromArray(SAMPLE_DATA.modifierNames);
    case 'modifier_set':
      return randomFromArray(SAMPLE_DATA.modifierSets);
    case 'section':
      return randomFromArray(SAMPLE_DATA.sections);
    case 'customer_type':
      return randomFromArray(SAMPLE_DATA.customerTypes);
    case 'channel':
      return randomFromArray(SAMPLE_DATA.channels);
    case 'device':
      return randomFromArray(SAMPLE_DATA.devices);
    case 'card_brand':
      return randomFromArray(SAMPLE_DATA.cardBrands);
    case 'order_name':
      return randomFromArray(SAMPLE_DATA.orderNames);
    case 'item_type':
      return randomFromArray(SAMPLE_DATA.itemTypes);
    default:
      return `Sample ${dimensionId.replace('_', ' ')} ${randomNumber(1, 10)}`;
  }
}

export function generateMockReportData(reportId: string, customTemplate?: any): ReportData {
  let template = REPORT_TEMPLATES[reportId];
  
  // Handle custom templates
  if (!template && customTemplate) {
    template = customTemplate;
  }
  
  if (!template) {
    throw new Error(`No template found for report: ${reportId}`);
  }

  const grain = REPORT_GRAINS[template.grain];
  const rowCount = randomNumber(15, 50);
  const data: ReportRow[] = [];

  // Handle both single defaultGroupBy and multiple dimensions
  const dimensions = template.selectedDimensions || (template.defaultGroupBy ? [template.defaultGroupBy] : []);
  const metrics = template.selectedMetrics || template.defaultMetrics || [];

  for (let i = 0; i < rowCount; i++) {
    const row: ReportRow = {};
    
    // Set all dimension values
    dimensions.forEach(dimensionId => {
      row[dimensionId] = getDimensionValue(dimensionId);
    });

    // Generate metric values based on grain type
    metrics.forEach(metricId => {
      const metric = grain.metrics.find(m => m.id === metricId);
      if (!metric) return;

      // Handle profitability metrics with realistic calculations
      if (metricId === 'unit_cost' && row['item_name']) {
        const itemName = row['item_name'] as string;
        row[metricId] = SAMPLE_DATA.unitCosts[itemName] || randomCurrency(2, 15);
        return;
      }

      if (metricId === 'profit_margin' && row['item_sales'] && row['unit_cost']) {
        const sales = Number(row['item_sales']);
        const cost = Number(row['unit_cost']);
        row[metricId] = sales - cost;
        return;
      }

      if (metricId === 'profit_margin_percentage' && row['item_sales'] && row['unit_cost']) {
        const sales = Number(row['item_sales']);
        const cost = Number(row['unit_cost']);
        row[metricId] = sales > 0 ? (sales - cost) / sales : 0;
        return;
      }

      if (metricId === 'food_cost_percentage' && row['category']) {
        const category = row['category'] as string;
        const margin = SAMPLE_DATA.categoryMargins[category] || 0.65;
        row[metricId] = 1 - margin; // Food cost = 1 - margin
        return;
      }

      if (metricId === 'labor_cost_percentage') {
        row[metricId] = randomCurrency(0.25, 0.35); // 25-35% labor cost
        return;
      }

      if (metricId === 'prime_cost_percentage' && row['food_cost_percentage'] && row['labor_cost_percentage']) {
        const foodCost = Number(row['food_cost_percentage']);
        const laborCost = Number(row['labor_cost_percentage']);
        row[metricId] = foodCost + laborCost;
        return;
      }

      switch (metric.type) {
        case 'currency':
          if (metricId.includes('sales') || metricId.includes('collected') || metricId.includes('amount')) {
            row[metricId] = randomCurrency(50, 2000);
          } else if (metricId.includes('cost')) {
            row[metricId] = randomCurrency(2, 15);
          } else if (metricId.includes('margin') || metricId.includes('profit')) {
            row[metricId] = randomCurrency(10, 800);
          } else if (metricId.includes('tax')) {
            row[metricId] = randomCurrency(5, 150);
          } else if (metricId.includes('tip')) {
            row[metricId] = randomCurrency(10, 300);
          } else if (metricId.includes('fee')) {
            row[metricId] = randomCurrency(2, 50);
          } else {
            row[metricId] = randomCurrency(10, 500);
          }
          break;
        case 'count':
          if (metricId.includes('transaction')) {
            row[metricId] = randomNumber(5, 150);
          } else if (metricId.includes('items') || metricId.includes('units')) {
            row[metricId] = randomNumber(1, 500);
          } else {
            row[metricId] = randomNumber(1, 100);
          }
          break;
        case 'number':
          if (metricId.includes('average')) {
            row[metricId] = randomCurrency(15, 85);
          } else if (metricId.includes('hours')) {
            row[metricId] = randomNumber(4, 8);
          } else {
            row[metricId] = randomNumber(1, 50);
          }
          break;
        case 'percentage':
          if (metricId.includes('margin') || metricId.includes('cost')) {
            row[metricId] = Math.random() * 0.5 + 0.1; // 10-60% range for costs/margins
          } else {
            row[metricId] = Math.random();
          }
          break;
      }
    });

    data.push(row);
  }

  // Sort by the first metric in descending order
  const firstMetric = metrics[0] || template.defaultMetrics?.[0];
  if (firstMetric) {
    data.sort((a, b) => (Number(b[firstMetric]) || 0) - (Number(a[firstMetric]) || 0));
  }

  return {
    reportId,
    reportName: template.name,
    grain: template.grain,
    groupByDimension: dimensions[0] || template.defaultGroupBy,
    selectedMetrics: metrics,
    selectedDimensions: dimensions,
    filters: [
      {
        dimension: 'date_range',
        operator: 'between',
        value: { from: '2024-01-01', to: '2024-01-31' }
      }
    ],
    data,
    totalRows: data.length,
    lastUpdated: new Date()
  };
}

export function formatReportValue(value: any, metricId: string, grain: string): string {
  if (value === null || value === undefined) return '-';
  
  const grainData = REPORT_GRAINS[grain];
  const metric = grainData?.metrics.find(m => m.id === metricId);
  
  if (!metric) return String(value);
  
  switch (metric.type) {
    case 'currency':
      return formatCurrency(Number(value));
    case 'count':
    case 'number':
      return formatNumber(Number(value));
    case 'percentage':
      return formatPercentage(Number(value));
    default:
      return String(value);
  }
}

// Generate summary statistics for a report
export function generateReportSummary(data: ReportData): Record<string, any> {
  const summary: Record<string, any> = {};
  
  data.selectedMetrics.forEach(metricId => {
    const values = data.data.map(row => Number(row[metricId]) || 0);
    const total = values.reduce((sum, val) => sum + val, 0);
    const avg = total / values.length;
    
    summary[metricId] = {
      total,
      average: avg,
      min: Math.min(...values),
      max: Math.max(...values),
      count: values.length
    };
  });
  
  return summary;
}
