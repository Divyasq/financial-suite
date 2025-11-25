# Report Consistency Protocol

## 🚨 **CRITICAL RULE: NEVER BREAK REPORT LOADING**

This protocol prevents the systematic "Report Not Found" issue that occurred when reports existed in the Standard Reports listing but had no corresponding templates.

---

## 📋 **THE GOLDEN RULE**

**EVERY report listed in `standardReportsData.ts` MUST have a corresponding template in `reportTemplates.ts`**

---

## 🔍 **BEFORE ADDING ANY NEW REPORT**

### **Step 1: Check Current Consistency**
```bash
cd /Users/divyac/financial-suite-clean

# Get reports from standardReportsData.ts (excluding categories)
grep "id: '" src/data/standardReportsData.ts | \
  sed "s/.*id: '//" | sed "s/',//" | \
  grep -v -E "(sales|accounting|payments|operations|online|inventory|profitability|restaurant|quick-service|coffee-shop|bar-nightlife|retail-store|beauty-wellness|food-truck|professional-services|multi-location|custom)$" | \
  sort > /tmp/reports_in_data.txt

# Get templates from reportTemplates.ts
grep -o "'[^']*': {" src/data/reportTemplates.ts | \
  sed "s/'//g" | sed "s/: {//" | \
  sort > /tmp/templates_available.txt

# Find missing templates
echo "=== MISSING TEMPLATES ==="
comm -23 /tmp/reports_in_data.txt /tmp/templates_available.txt

# Should return EMPTY if consistent
```

### **Step 2: If Adding New Report**
1. **Add to `standardReportsData.ts` first**
2. **Immediately add corresponding template to `reportTemplates.ts`**
3. **Test the new report loads without "Report Not Found"**
4. **Test existing reports still work**

---

## 🛠️ **TEMPLATE STRUCTURE**

### **Minimal Template Structure:**
```typescript
'report-id': {
  id: 'report-id',
  name: 'Report Name',
  description: 'Report description',
  type: 'analysis',
  grain: 'orders', // or 'items', 'payments', 'customers', etc.
  defaultGroupBy: 'location',
  defaultMetrics: ['metric1', 'metric2'],
  category: 'sales', // must match category in standardReportsData.ts
  blocks: [
    {
      id: 'header',
      type: 'header',
      config: {
        header: {
          title: 'Report Name',
          description: 'Report description',
          showDataFreshness: true,
          showOptions: true,
          options: ['export']
        }
      },
      visible: true,
      order: 1
    },
    {
      id: 'controls',
      type: 'controls',
      config: {
        controls: {
          primary: ['time_period', 'location'],
          secondary: ['group_by', 'metrics', 'filters'],
          showGroupBy: true,
          showMetricSelector: true
        }
      },
      visible: true,
      order: 2
    },
    {
      id: 'table',
      type: 'table',
      config: {
        table: {
          collapsible: true,
          defaultCollapsed: false,
          sortable: true,
          filterable: false,
          exportable: true,
          pagination: true,
          pageSize: 25,
          showSummaryRow: true
        }
      },
      visible: true,
      order: 3
    }
  ]
}
```

---

## ✅ **TESTING PROTOCOL**

### **After Any Report Changes:**

1. **Consistency Check:**
```bash
# Run the consistency check from Step 1 above
# Result should be EMPTY
```

2. **Functional Testing:**
```bash
# Test a sample of reports
for report in "sales-summary-v3" "item-analysis" "vendor-sales" "reconciliation"; do
  result=$(curl -s "http://localhost:3000/financial-suite/reports/$report" | grep -o "Report.*Not Found" || echo "✅ WORKING")
  echo "$report: $result"
done
```

3. **Browser Testing:**
   - Open Standard Reports page: `http://localhost:3000/financial-suite/standard-reports`
   - Click on several different reports
   - Verify none show "Report Not Found"

---

## 🚨 **EMERGENCY RECOVERY**

### **If Reports Break Again:**

1. **Immediate Diagnosis:**
```bash
# Check for missing templates
cd /Users/divyac/financial-suite-clean
echo "=== MISSING TEMPLATES ==="
comm -23 <(grep "id: '" src/data/standardReportsData.ts | sed "s/.*id: '//" | sed "s/',//" | grep -v -E "(sales|accounting|payments|operations|online|inventory|profitability|restaurant|quick-service|coffee-shop|bar-nightlife|retail-store|beauty-wellness|food-truck|professional-services|multi-location|custom)$" | sort) <(grep -o "'[^']*': {" src/data/reportTemplates.ts | sed "s/'//g" | sed "s/: {//" | sort)
```

2. **Quick Fix:**
   - Add missing templates using the minimal template structure above
   - Test immediately

3. **Rollback if Needed:**
```bash
# Rollback to last known working version
git reset --hard v1.0.7-stable
```

---

## 📊 **CURRENT STATUS (v1.0.7-stable)**

### **✅ ALL REPORTS WORKING**
- **Total Reports in Standard Data**: 37
- **Total Templates Available**: 37
- **Missing Templates**: 0
- **Status**: ✅ CONSISTENT

### **Fixed Reports (Previously Broken):**
- vendor-sales, gift-cards, sales-taxes, fees, service-charges
- payment-methods, comps, voids, transaction-status, cash-reports
- activity-log, kitchen-performance, team-performance, future-bookings
- inventory-by-category, cost-of-goods-sold, inventory-sell-through
- projected-profit, traffic-sources, purchase-funnel

---

## 🎯 **PREVENTION CHECKLIST**

Before any commit that touches reports:

- [ ] Run consistency check - should return EMPTY
- [ ] Test sample reports load without "Report Not Found"
- [ ] Test Standard Reports page loads without errors
- [ ] No console errors in browser
- [ ] All existing functionality preserved

---

**Last Updated**: 2025-11-25 09:50:00
**Next Review**: Before any report-related changes
