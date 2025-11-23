import { ReportData, ReportRow, REPORT_TEMPLATES, REPORT_GRAINS } from '../types/reportData';

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
  discountNames: ['Happy Hour 20%', 'Student Discount', 'Senior Discount', 'Employee Meal', 'Loyalty Reward', 'Birthday Special']
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

export function generateMockReportData(reportId: string): ReportData {
  const template = REPORT_TEMPLATES[reportId];
  if (!template) {
    throw new Error(`No template found for report: ${reportId}`);
  }

  const grain = REPORT_GRAINS[template.grain];
  const rowCount = randomNumber(15, 50);
  const data: ReportRow[] = [];

  for (let i = 0; i < rowCount; i++) {
    const row: ReportRow = {};
    
    // Set the grouping dimension
    switch (template.defaultGroupBy) {
      case 'item_name':
        row[template.defaultGroupBy] = randomFromArray(SAMPLE_DATA.items);
        break;
      case 'category':
        row[template.defaultGroupBy] = randomFromArray(SAMPLE_DATA.categories);
        break;
      case 'employee_name':
        row[template.defaultGroupBy] = randomFromArray(SAMPLE_DATA.employees);
        break;
      case 'location':
        row[template.defaultGroupBy] = randomFromArray(SAMPLE_DATA.locations);
        break;
      case 'payment_method':
        row[template.defaultGroupBy] = randomFromArray(SAMPLE_DATA.paymentMethods);
        break;
      case 'discount_name':
        row[template.defaultGroupBy] = randomFromArray(SAMPLE_DATA.discountNames);
        break;
      default:
        row[template.defaultGroupBy] = `Sample ${template.defaultGroupBy} ${i + 1}`;
    }

    // Generate metric values based on grain type
    template.defaultMetrics.forEach(metricId => {
      const metric = grain.metrics.find(m => m.id === metricId);
      if (!metric) return;

      switch (metric.type) {
        case 'currency':
          if (metricId.includes('sales') || metricId.includes('collected') || metricId.includes('amount')) {
            row[metricId] = randomCurrency(50, 2000);
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
          row[metricId] = Math.random();
          break;
      }
    });

    data.push(row);
  }

  // Sort by the first metric in descending order
  const firstMetric = template.defaultMetrics[0];
  data.sort((a, b) => (Number(b[firstMetric]) || 0) - (Number(a[firstMetric]) || 0));

  return {
    reportId,
    reportName: template.name,
    grain: template.grain,
    groupByDimension: template.defaultGroupBy,
    selectedMetrics: template.defaultMetrics,
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
