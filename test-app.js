// Simple test to verify the application data
console.log('Testing data structure...');

console.log('=== Financial Suite Test ===\n');

console.log('Total reports:', standardReports.length);
console.log('Total categories:', reportCategories.length);

console.log('\nCategories:');
reportCategories.forEach(cat => {
  const reports = standardReports.filter(r => r.category === cat.id);
  console.log(`  ${cat.name} (${cat.id}): ${reports.length} reports`);
});

console.log('\nProfitability reports:');
const profitabilityReports = standardReports.filter(r => r.category === 'profitability');
profitabilityReports.forEach(report => {
  console.log(`  - ${report.name}: ${report.description}`);
});

console.log('\nProfitability category details:');
const profitabilityCategory = reportCategories.find(cat => cat.id === 'profitability');
if (profitabilityCategory) {
  console.log(`  Name: ${profitabilityCategory.name}`);
  console.log(`  Visible: ${profitabilityCategory.isVisible}`);
  console.log(`  Order: ${profitabilityCategory.order}`);
} else {
  console.log('  ❌ Profitability category not found!');
}
