export interface Item {
  id: string;
  name: string;
  reportingCategory: string;
  locations: string;
  stockOnHand: string;
  availableToSell: string;
  price: string;
  image?: string;
  hasDiscount?: boolean;
}

export const items: Item[] = [
  {
    id: '1',
    name: '50% Off!',
    reportingCategory: 'General Merchandise',
    locations: 'All locations',
    stockOnHand: '-',
    availableToSell: '-',
    price: 'Variable',
    hasDiscount: true
  },
  {
    id: '2',
    name: 'Air Filters',
    reportingCategory: 'General Merchandise',
    locations: 'All locations',
    stockOnHand: '-',
    availableToSell: '-',
    price: '$5.00/ea'
  },
  {
    id: '3',
    name: 'Apparel (Tactical)',
    reportingCategory: 'Tactical',
    locations: 'All locations',
    stockOnHand: '-',
    availableToSell: '-',
    price: 'Variable'
  },
  {
    id: '4',
    name: 'Appliances',
    reportingCategory: 'Other',
    locations: 'All locations',
    stockOnHand: '-',
    availableToSell: '-',
    price: 'Variable'
  },
  {
    id: '5',
    name: 'Bedding / Bath',
    reportingCategory: 'Bedding / Bath',
    locations: 'All locations',
    stockOnHand: '-',
    availableToSell: '-',
    price: '$1.00 - $20.00/ea'
  },
  {
    id: '6',
    name: 'Bottoms',
    reportingCategory: "Women's Clothing",
    locations: 'All locations',
    stockOnHand: '-',
    availableToSell: '-',
    price: '$5.00 - $10.00/ea'
  },
  {
    id: '7',
    name: 'Christmas',
    reportingCategory: 'Other',
    locations: 'All locations',
    stockOnHand: '-',
    availableToSell: '-',
    price: 'Variable'
  },
  {
    id: '8',
    name: 'Coffee',
    reportingCategory: 'Coffee',
    locations: 'All locations',
    stockOnHand: '-',
    availableToSell: '-',
    price: '$20.00 - $29.50/ea'
  },
  {
    id: '9',
    name: 'Dearfoam Slippers',
    reportingCategory: 'Shoes',
    locations: 'All locations',
    stockOnHand: '-',
    availableToSell: '-',
    price: '$10.00/ea'
  },
  {
    id: '10',
    name: 'Electronics',
    reportingCategory: 'Electronics',
    locations: 'All locations',
    stockOnHand: '-',
    availableToSell: '-',
    price: 'Variable'
  },
  {
    id: '11',
    name: 'Element TV',
    reportingCategory: 'TVs',
    locations: 'All locations',
    stockOnHand: '-',
    availableToSell: '-',
    price: 'Variable'
  },
  {
    id: '12',
    name: 'Freight',
    reportingCategory: '',
    locations: 'All locations',
    stockOnHand: '-',
    availableToSell: '-',
    price: 'Variable'
  },
  {
    id: '13',
    name: 'Furniture',
    reportingCategory: 'Furniture',
    locations: 'All locations',
    stockOnHand: '-',
    availableToSell: '-',
    price: 'Variable'
  },
  {
    id: '14',
    name: 'Gen Merch',
    reportingCategory: 'General Merchandise',
    locations: 'All locations',
    stockOnHand: '-',
    availableToSell: '-',
    price: 'Variable'
  },
  {
    id: '15',
    name: 'Halloween',
    reportingCategory: 'Other',
    locations: 'All locations',
    stockOnHand: '-',
    availableToSell: '-',
    price: 'Variable'
  },
  {
    id: '16',
    name: 'Hisense TV',
    reportingCategory: 'TVs',
    locations: 'All locations',
    stockOnHand: '-',
    availableToSell: '-',
    price: 'Variable'
  },
  {
    id: '17',
    name: "Kid's Clothing",
    reportingCategory: "Kid's Clothing",
    locations: 'All locations',
    stockOnHand: '-',
    availableToSell: '-',
    price: 'Variable'
  }
];
