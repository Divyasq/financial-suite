import { ScenarioGroup } from '../types/deferredSales';

export const deferredSalesData: ScenarioGroup[] = [
  {
    id: 'gift-card-tracking',
    title: 'Tracking Gift Cards',
    description: 'Gift card purchase, refund, and payment scenarios',
    scenarios: [
      {
        id: 'gc-purchase',
        title: 'Gift Card Purchase',
        description: 'A customer purchases a GC worth $50',
        salesSections: [
          {
            title: 'Sales',
            lines: [
              { label: 'Gross Sales', amount: 0 },
              { label: '          Items', amount: 0 },
              { label: '          Service Charges', amount: 0 },
              { label: 'Returns', amount: 0 },
              { label: 'Discounts & Comps', amount: 0 },
              { label: 'Net Sales', amount: 0 },
              { label: 'Tax', amount: 0 },
              { label: 'Tip', amount: 0 },
              { label: 'Refunds by Amount', amount: 0 }
            ]
          },
          {
            title: 'Deferred Sales',
            lines: [
              { label: '      Gift Card Sales', amount: 50.00 },
              { label: '      Invoices', amount: 0 }
            ],
            total: 50.00
          }
        ],
        paymentSections: [
          {
            title: 'Payments',
            lines: [
              { label: 'Total Collected', amount: 50.00 },
              { label: '     Cash', amount: 0 },
              { label: '     Card', amount: 50.00 },
              { label: '     External', amount: 0 },
              { label: '     Other', amount: 0 },
              { label: '     Gift Card', amount: 0 },
              { label: '     Bank Transfer', amount: 0 },
              { label: '     House Account', amount: 0 },
              { label: '     Fees', amount: 0 }
            ],
            total: 50.00
          }
        ]
      },
      {
        id: 'gc-refund',
        title: 'Gift Card Refund',
        description: 'Customer returns a GC',
        salesSections: [
          {
            title: 'Sales',
            lines: [
              { label: 'Gross Sales', amount: 0 },
              { label: '          Items', amount: 0 },
              { label: '          Service Charges', amount: 0 },
              { label: 'Returns', amount: 0 },
              { label: 'Discounts & Comps', amount: 0 },
              { label: 'Net Sales', amount: 0 },
              { label: 'Tax', amount: 0 },
              { label: 'Tip', amount: 0 },
              { label: 'Refunds by Amount', amount: 0 }
            ]
          },
          {
            title: 'Deferred Sales',
            lines: [
              { label: '      Gift Card Sales', amount: 0 },
              { label: '      GC Refund', amount: -50 },
              { label: '      Invoices', amount: 0 }
            ],
            total: 0
          }
        ],
        paymentSections: [
          {
            title: 'Payments',
            lines: [
              { label: 'Total Collected', amount: -50.00 },
              { label: '     Cash', amount: 0 },
              { label: '     Card', amount: -50.00 },
              { label: '     External', amount: 0 },
              { label: '     Other', amount: 0 },
              { label: '     Gift Card', amount: 0 },
              { label: '     Bank Transfer', amount: 0 },
              { label: '     House Account', amount: 0 },
              { label: '     Fees', amount: 0 }
            ],
            total: -50.00
          }
        ]
      }
    ]
  },
  {
    id: 'gift-card-payment',
    title: 'Tracking Payments via Gift Card',
    description: 'Customer purchases items using gift cards',
    scenarios: [
      {
        id: 'gc-payment-sale',
        title: 'Sale with Gift Card',
        description: 'Customer purchases an item worth $50 via GC',
        salesSections: [
          {
            title: 'Sales',
            lines: [
              { label: 'Gross Sales', amount: 50.00 },
              { label: '          Items', amount: 50.00 },
              { label: '          Service Charges', amount: 0 },
              { label: 'Returns', amount: 0 },
              { label: 'Discounts & Comps', amount: 0 },
              { label: 'Net Sales', amount: 50.00 },
              { label: 'Tax', amount: 0 },
              { label: 'Tip', amount: 0 },
              { label: 'Refunds by Amount', amount: 0 }
            ]
          },
          {
            title: 'Deferred Sales',
            lines: [
              { label: '      Gift Card Sales', amount: 0 },
              { label: '      Invoices', amount: 0 }
            ],
            total: 50.00
          }
        ],
        paymentSections: [
          {
            title: 'Payments',
            lines: [
              { label: 'Total Collected', amount: 50.00 },
              { label: '     Cash', amount: 0 },
              { label: '     Card', amount: 0 },
              { label: '     External', amount: 0 },
              { label: '     Other', amount: 0 },
              { label: '     Gift Card', amount: 50.00 },
              { label: '     Bank Transfer', amount: 0 },
              { label: '     House Account', amount: 0 },
              { label: '     Fees', amount: 0 }
            ],
            total: 50.00
          }
        ]
      },
      {
        id: 'gc-payment-refund',
        title: 'Refund with Gift Card',
        description: 'Customer returns item purchased with gift card',
        salesSections: [
          {
            title: 'Sales',
            lines: [
              { label: 'Gross Sales', amount: 0 },
              { label: '          Items', amount: 0 },
              { label: '          Service Charges', amount: 0 },
              { label: 'Returns', amount: -50.00 },
              { label: 'Discounts & Comps', amount: 0 },
              { label: 'Net Sales', amount: -50.00 },
              { label: 'Tax', amount: 0 },
              { label: 'Tip', amount: 0 },
              { label: 'Refunds by Amount', amount: 0 }
            ]
          },
          {
            title: 'Deferred Sales',
            lines: [
              { label: '      Gift Card Sales', amount: 0 },
              { label: '      Invoices', amount: 0 }
            ],
            total: -50.00
          }
        ],
        paymentSections: [
          {
            title: 'Payments',
            lines: [
              { label: 'Total Collected', amount: -50.00 },
              { label: '     Cash', amount: 0 },
              { label: '     Card', amount: 0 },
              { label: '     External', amount: 0 },
              { label: '     Other', amount: 0 },
              { label: '     Gift Card', amount: -50.00 },
              { label: '     Bank Transfer', amount: 0 },
              { label: '     House Account', amount: 0 },
              { label: '     Fees', amount: 0 }
            ],
            total: -50.00
          }
        ]
      }
    ]
  },


  {
    id: 'invoices-option-b',
    title: 'Tracking Partial payments/Deposits',
    description: 'Alternative approach tracking deposits as negative amounts in deferred sales',
    scenarios: [
      {
        id: 'deposit-day',
        title: 'Deposit Day',
        description: 'Customer pays $100 deposit towards a $1000 invoice',
        salesSections: [
          {
            title: 'Sales',
            lines: [
              { label: 'Gross Sales', amount: 0 },
              { label: '          Items', amount: 0 },
              { label: '          Service Charges', amount: 0 },
              { label: 'Returns', amount: 0 },
              { label: 'Discounts & Comps', amount: 0 },
              { label: 'Net Sales', amount: 0 },
              { label: 'Tax', amount: 0 },
              { label: 'Tip', amount: 0 },
              { label: 'Refunds by Amount', amount: 0 }
            ]
          },
          {
            title: 'Deferred Sales',
            lines: [
              { label: '      Gift Card Sales', amount: 0 },
              { label: '      Invoices', amount: 100.00 },
              { label: '      Square Online', amount: 0 }
            ],
            total: 100.00
          }
        ],
        paymentSections: [
          {
            title: 'Payments',
            lines: [
              { label: 'Total Collected', amount: 100.00 },
              { label: '     Cash', amount: 0 },
              { label: '     Card', amount: 100.00 },
              { label: '     External', amount: 0 },
              { label: '     Other', amount: 0 },
              { label: '     Gift Card', amount: 0 },
              { label: '     Bank Transfer', amount: 0 },
              { label: '     House Account', amount: 0 },
              { label: '     Fees', amount: 0 }
            ],
            total: 100.00
          }
        ]
      },
      {
        id: 'remaining-payment-option-b',
        title: 'Remaining Payment',
        description: 'Customer pays remaining $900 - deposit tracked as negative in deferred sales',
        salesSections: [
          {
            title: 'Sales',
            lines: [
              { label: 'Gross Sales', amount: 1000.00 },
              { label: '          Items', amount: 1000.00 },
              { label: '          Service Charges', amount: 0 },
              { label: 'Returns', amount: 0 },
              { label: 'Discounts & Comps', amount: 0 },
              { label: 'Net Sales', amount: 1000.00 },
              { label: 'Tax', amount: 0 },
              { label: 'Tip', amount: 0 },
              { label: 'Refunds by Amount', amount: 0 }
            ]
          },
          {
            title: 'Deferred Sales',
            lines: [
              { label: '      Gift Card Sales', amount: 0 },
              { label: '      Invoices', amount: 0 },
              { label: '      Deposit Redeemed', amount: -100.00 },
              { label: '      Square Online', amount: 0 }
            ],
            total: 900.00
          }
        ],
        paymentSections: [
          {
            title: 'Payments',
            lines: [
              { label: 'Total Collected', amount: 900.00 },
              { label: '     Cash', amount: 0 },
              { label: '     Card', amount: 900.00 },
              { label: '     External', amount: 0 },
              { label: '     Other', amount: 0 },
              { label: '     Gift Card', amount: 0 },
              { label: '     Bank Transfer', amount: 0 },
              { label: '     House Account', amount: 0 },
              { label: '     Fees', amount: 0 }
            ],
            total: 900.00
          }
        ]
      },
      {
        id: 'full-cycle-option-b',
        title: 'Full Cycle',
        description: 'Complete transaction showing both deposit and final payment',
        salesSections: [
          {
            title: 'Sales',
            lines: [
              { label: 'Gross Sales', amount: 1000.00 },
              { label: '          Items', amount: 1000.00 },
              { label: '          Service Charges', amount: 0 },
              { label: 'Returns', amount: 0 },
              { label: 'Discounts & Comps', amount: 0 },
              { label: 'Net Sales', amount: 1000.00 },
              { label: 'Tax', amount: 0 },
              { label: 'Tip', amount: 0 },
              { label: 'Refunds by Amount', amount: 0 }
            ]
          },
          {
            title: 'Deferred Sales',
            lines: [
              { label: '      Gift Card Sales', amount: 0 },
              { label: '      Invoices', amount: 100.00 },
              { label: '      Deposit Redeemed', amount: -100.00 },
              { label: '      Square Online', amount: 0 }
            ],
            total: 1000.00
          }
        ],
        paymentSections: [
          {
            title: 'Payments',
            lines: [
              { label: 'Total Collected', amount: 1000.00 },
              { label: '     Cash', amount: 0 },
              { label: '     Card', amount: 1000.00 },
              { label: '     External', amount: 0 },
              { label: '     Other', amount: 0 },
              { label: '     Gift Card', amount: 0 },
              { label: '     Bank Transfer', amount: 0 },
              { label: '     House Account', amount: 0 },
              { label: '     Fees', amount: 0 }
            ],
            total: 1000.00
          }
        ]
      }
    ]
  },
  {
    id: 'catering-so',
    title: 'Tracking Catering (Square Online)',
    description: 'Catering order placed in advance with payment collected upfront',
    scenarios: [
      {
        id: 'catering-order',
        title: 'Catering Order Placed',
        description: 'Catering order for $1000 placed on Apr 28, 2025 to be fulfilled May 15, 2025',
        salesSections: [
          {
            title: 'Sales',
            lines: [
              { label: 'Gross Sales', amount: 0 },
              { label: '          Items', amount: 0 },
              { label: '          Service Charges', amount: 0 },
              { label: 'Returns', amount: 0 },
              { label: 'Discounts & Comps', amount: 0 },
              { label: 'Net Sales', amount: 0 },
              { label: 'Tax', amount: 0 },
              { label: 'Tip', amount: 0 },
              { label: 'Refunds by Amount', amount: 0 }
            ]
          },
          {
            title: 'Deferred Sales',
            lines: [
              { label: '      Gift Card Sales', amount: 0 },
              { label: '      Square Online', amount: 1000.00 },
              { label: '      Invoices', amount: 0 }
            ],
            total: 1000.00
          }
        ],
        paymentSections: [
          {
            title: 'Payments',
            lines: [
              { label: 'Payments', amount: 1000.00 },
              { label: 'Prior Payments', amount: 0 },
              { label: '       Deposit Redeemed', amount: 0 },
              { label: 'Total Collected', amount: 1000.00 },
              { label: '     Cash', amount: 0 },
              { label: '     Card', amount: 1000.00 },
              { label: '     External', amount: 0 },
              { label: '     Other', amount: 0 },
              { label: '     Gift Card', amount: 0 },
              { label: '     Bank Transfer', amount: 0 },
              { label: '     House Account', amount: 0 },
              { label: '     Fees', amount: 0 }
            ],
            total: 1000.00
          }
        ]
      },
      {
        id: 'catering-fulfilled',
        title: 'Catering Order Fulfilled',
        description: 'Revenue recognized on May 15, 2025 when service is fulfilled',
        salesSections: [
          {
            title: 'Sales',
            lines: [
              { label: 'Gross Sales', amount: 1000.00 },
              { label: '          Items', amount: 1000.00 },
              { label: '          Service Charges', amount: 0 },
              { label: 'Returns', amount: 0 },
              { label: 'Discounts & Comps', amount: 0 },
              { label: 'Net Sales', amount: 1000.00 },
              { label: 'Tax', amount: 0 },
              { label: 'Tip', amount: 0 },
              { label: 'Refunds by Amount', amount: 0 }
            ]
          },
          {
            title: 'Deferred Sales',
            lines: [
              { label: '      Gift Card Sales', amount: 0 },
              { label: '      Invoices', amount: 0 },
              { label: '      Square Online', amount: -1000.00 }
            ],
            total: 0
          }
        ],
        paymentSections: [
          {
            title: 'Payments',
            lines: [
              { label: 'Payments', amount: 0 },
              { label: 'Prior Payments', amount: 0 },
              { label: '       Deposit Redeemed', amount: 0 },
              { label: 'Total Collected', amount: 0 },
              { label: '     Cash', amount: 0 },
              { label: '     Card', amount: 0 },
              { label: '     External', amount: 0 },
              { label: '     Other', amount: 0 },
              { label: '     Gift Card', amount: 0 },
              { label: '     Bank Transfer', amount: 0 },
              { label: '     House Account', amount: 0 },
              { label: '     Fees', amount: 0 }
            ],
            total: 0
          }
        ]
      }
    ]
  }
];
