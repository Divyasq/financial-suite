# Financial Suite Dashboard

A comprehensive React-based financial dashboard application built with TypeScript, Vite, and Tailwind CSS.

## Features

### 🏦 Financial Suite Dashboard
- **Key Metrics**: Gross Sales, Net Sales, Returns, Transaction Count
- **Quick Actions**: Create Custom Reports, View All Reports
- **Recent Reports**: Overview of latest generated reports

### 📊 Sales Summary
- **Comprehensive Analytics**: Sales performance with interactive charts
- **Transaction Modal**: Detailed transaction view with customer information
- **External Linkouts**: Direct links to product details and full transactions
- **Visual Charts**: Bar charts for hourly sales and pie charts for top products

### 💳 Deferred Sales Management
- **Payment Tracking**: Monitor pending and overdue payments
- **Customer Management**: Detailed customer and invoice information
- **Payment Processing**: In-app payment handling with amount validation
- **Status Monitoring**: Visual status indicators for payment states

### 📈 Custom Reports
- **Report Builder**: Create custom reports with filters and metrics
- **Search & Filter**: Advanced filtering by report type and content
- **Report Management**: Edit, delete, and organize custom reports
- **Metrics Tracking**: Various financial metrics and KPIs

### 🔄 Transaction Management
- **Transaction History**: Complete transaction log with search and filtering
- **Status Tracking**: Real-time transaction status monitoring
- **Export Functionality**: Export transaction data
- **Detailed Views**: Comprehensive transaction details in modal format

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router DOM v6
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Utilities**: clsx + tailwind-merge for conditional styling
- **Date Handling**: date-fns

## Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── Table.tsx
│   └── layout/            # Layout components
│       ├── AppLayout.tsx
│       ├── Header.tsx
│       └── LeftNav.tsx
├── data/
│   └── mockData.ts        # Mock data for development
├── pages/                 # Page components
│   ├── FinancialSuitePage.tsx
│   ├── SalesSummaryPage.tsx
│   ├── DeferredSalesPage.tsx
│   ├── CustomReportsPage.tsx
│   └── TransactionsPage.tsx
├── types/
│   └── index.ts           # TypeScript type definitions
├── utils/
│   └── cn.ts              # Utility functions
├── App.tsx                # Main app component with routing
└── main.tsx               # App entry point
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Features in Detail

### Navigation Structure
- **Home**: Dashboard overview
- **Items & Services**: Product/service management
- **Financial Suite**: Main financial dashboard with sub-navigation
  - Dashboard
  - Deferred Sales
  - Reports (with nested menu)
    - All Reports
    - Sales Summary
    - Custom Reports
  - Migration Status
- **Transactions**: Transaction history and management

### Key Components

#### Sales Summary with Linkouts
- Interactive charts showing sales by hour and top products
- External link functionality to product details
- Transaction modal with detailed item breakdown
- Export capabilities for reports

#### Deferred Sales Management
- Real-time payment status tracking
- Customer information management
- Payment processing interface
- Overdue payment alerts

#### Transaction Modal System
- Detailed transaction views
- Customer and payment information
- Item-level breakdown
- Status and payment method tracking

#### Custom Reports Builder
- Dynamic report creation
- Filter and metric selection
- Search and categorization
- Report management interface

## Design System

### Colors
- **Primary**: Blue scale (50-900)
- **Gray**: Neutral scale (50-900)
- **Status Colors**: Green (success), Yellow (warning), Red (error)

### Components
- Consistent button variants and sizes
- Card-based layout system
- Modal system for detailed views
- Table components with sorting and filtering
- Form components with validation

## Mock Data

The application includes comprehensive mock data for:
- Transactions with various types and statuses
- Sales summaries with hourly breakdowns
- Deferred sales with customer information
- Custom reports with filters and metrics

## Future Enhancements

- Real-time data integration
- Advanced analytics and reporting
- User authentication and authorization
- Mobile responsiveness improvements
- Export functionality for all data types
- Integration with payment processors
- Advanced search and filtering capabilities

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
