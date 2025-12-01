import { 
  WeatherData, 
  LocalEvent, 
  SalesCorrelation, 
  WeatherImpact, 
  EventImpact,
  ExternalDataInsight,
  BusinessForecast,
  CompetitorData,
  MarketTrend,
  EconomicIndicator
} from '../types/external-data';

// Generate weather data for the past 30 days
export const mockWeatherData: WeatherData[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  
  const conditions = ['sunny', 'cloudy', 'rainy', 'stormy', 'snowy', 'foggy'] as const;
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  
  const baseTemp = 65 + Math.sin((i / 30) * Math.PI * 2) * 15; // Seasonal variation
  const tempVariation = (Math.random() - 0.5) * 20;
  const temperature = Math.round(baseTemp + tempVariation);
  
  return {
    id: `weather_${i}`,
    date: date.toISOString().split('T')[0],
    temperature,
    condition,
    humidity: Math.round(40 + Math.random() * 40),
    windSpeed: Math.round(Math.random() * 15),
    precipitation: condition === 'rainy' || condition === 'stormy' ? Math.random() * 2 : 0,
    uvIndex: Math.round(Math.random() * 10),
    visibility: Math.round(8 + Math.random() * 2),
    description: getWeatherDescription(condition, temperature),
    icon: getWeatherIcon(condition)
  };
});

function getWeatherDescription(condition: string, temp: number): string {
  const descriptions = {
    sunny: [`Bright and sunny, ${temp}°F`, `Clear skies, perfect weather`, `Beautiful sunny day`],
    cloudy: [`Overcast skies, ${temp}°F`, `Partly cloudy conditions`, `Cloudy but mild`],
    rainy: [`Light rain showers`, `Steady rainfall expected`, `Rainy and cool`],
    stormy: [`Thunderstorms likely`, `Severe weather warning`, `Heavy storms expected`],
    snowy: [`Snow flurries`, `Winter weather advisory`, `Light snowfall`],
    foggy: [`Dense fog conditions`, `Low visibility`, `Foggy morning clearing later`]
  };
  
  const options = descriptions[condition as keyof typeof descriptions] || [`${temp}°F`];
  return options[Math.floor(Math.random() * options.length)];
}

function getWeatherIcon(condition: string): string {
  const icons = {
    sunny: '☀️',
    cloudy: '☁️',
    rainy: '🌧️',
    stormy: '⛈️',
    snowy: '❄️',
    foggy: '🌫️'
  };
  return icons[condition as keyof typeof icons] || '🌤️';
}

// Generate local events
export const mockLocalEvents: LocalEvent[] = [
  {
    id: 'event_1',
    title: 'Downtown Food Festival',
    description: 'Annual food festival featuring local restaurants and food trucks',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    startTime: '11:00',
    endTime: '21:00',
    location: 'City Center Plaza',
    category: 'festival',
    attendeeCount: 15000,
    distance: 0.3,
    impact: 'high',
    source: 'City Events'
  },
  {
    id: 'event_2',
    title: 'Local Basketball Game',
    description: 'High school championship game',
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    startTime: '19:00',
    endTime: '21:30',
    location: 'Community Sports Center',
    category: 'sports',
    attendeeCount: 2500,
    distance: 0.8,
    impact: 'medium',
    source: 'Sports Calendar'
  },
  {
    id: 'event_3',
    title: 'Business Networking Conference',
    description: 'Local business leaders networking event',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    startTime: '08:00',
    endTime: '17:00',
    location: 'Convention Center',
    category: 'business',
    attendeeCount: 800,
    distance: 1.2,
    impact: 'medium',
    source: 'Business Events'
  },
  {
    id: 'event_4',
    title: 'Summer Concert Series',
    description: 'Outdoor concert in the park',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    startTime: '18:00',
    endTime: '22:00',
    location: 'Riverside Park',
    category: 'concert',
    attendeeCount: 5000,
    distance: 0.5,
    impact: 'high',
    source: 'Entertainment Weekly'
  },
  {
    id: 'event_5',
    title: 'Holiday Market',
    description: 'Holiday shopping and crafts market',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    startTime: '10:00',
    endTime: '18:00',
    location: 'Main Street',
    category: 'holiday',
    attendeeCount: 3000,
    distance: 0.2,
    impact: 'high',
    source: 'Holiday Events'
  }
];

// Weather impact analysis
export const mockWeatherImpacts: WeatherImpact[] = [
  {
    condition: 'sunny',
    avgSalesMultiplier: 1.15,
    confidence: 0.87,
    sampleSize: 45,
    insights: [
      'Sunny weather increases outdoor dining by 25%',
      'Beverage sales spike 30% on sunny days',
      'Peak hours extend later into evening'
    ]
  },
  {
    condition: 'rainy',
    avgSalesMultiplier: 0.85,
    confidence: 0.92,
    sampleSize: 38,
    insights: [
      'Rainy weather reduces foot traffic by 20%',
      'Delivery orders increase by 40%',
      'Comfort food items see higher demand'
    ]
  },
  {
    condition: 'stormy',
    avgSalesMultiplier: 0.65,
    confidence: 0.95,
    sampleSize: 12,
    insights: [
      'Severe weather drastically reduces walk-ins',
      'Staff scheduling should be reduced',
      'Focus on delivery and takeout services'
    ]
  },
  {
    condition: 'cloudy',
    avgSalesMultiplier: 0.98,
    confidence: 0.78,
    sampleSize: 52,
    insights: [
      'Minimal impact on overall sales',
      'Indoor seating preference increases',
      'Normal operational patterns'
    ]
  }
];

// Event impact analysis
export const mockEventImpacts: EventImpact[] = [
  {
    category: 'festival',
    avgSalesMultiplier: 1.45,
    confidence: 0.91,
    sampleSize: 8,
    insights: [
      'Food festivals drive significant foot traffic',
      'Extended hours recommended',
      'Stock up on popular items'
    ]
  },
  {
    category: 'sports',
    avgSalesMultiplier: 1.25,
    confidence: 0.85,
    sampleSize: 23,
    insights: [
      'Sports events increase pre/post-game dining',
      'Group reservations spike',
      'Alcohol sales increase significantly'
    ]
  },
  {
    category: 'concert',
    avgSalesMultiplier: 1.35,
    confidence: 0.88,
    sampleSize: 15,
    insights: [
      'Concert-goers dine before events',
      'Late-night food service in demand',
      'Younger demographic preferences'
    ]
  },
  {
    category: 'business',
    avgSalesMultiplier: 1.20,
    confidence: 0.82,
    sampleSize: 18,
    insights: [
      'Business events drive lunch traffic',
      'Higher average ticket prices',
      'Professional atmosphere preferred'
    ]
  }
];

// Generate insights
export const mockExternalDataInsights: ExternalDataInsight[] = [
  {
    id: 'insight_1',
    type: 'weather',
    title: 'Sunny Weekend Forecast',
    description: 'This weekend shows sunny skies with temperatures in the mid-70s, historically our best weather for outdoor dining.',
    impact: 'positive',
    confidence: 0.87,
    actionable: true,
    recommendations: [
      'Increase outdoor seating capacity',
      'Stock extra beverages and light menu items',
      'Consider extending patio hours',
      'Schedule additional patio staff'
    ],
    data: { expectedIncrease: '15-20%', peakHours: '12:00-15:00, 18:00-21:00' },
    createdAt: new Date().toISOString()
  },
  {
    id: 'insight_2',
    type: 'event',
    title: 'Downtown Food Festival Impact',
    description: 'The upcoming food festival will bring 15,000+ people within 3 blocks of your location.',
    impact: 'positive',
    confidence: 0.91,
    actionable: true,
    recommendations: [
      'Create special festival menu items',
      'Increase staffing by 40%',
      'Prepare for 2-3x normal weekend volume',
      'Consider pre-orders or express menu'
    ],
    data: { expectedIncrease: '45-60%', duration: '11:00-21:00' },
    createdAt: new Date().toISOString()
  },
  {
    id: 'insight_3',
    type: 'correlation',
    title: 'Rain + Sports = Delivery Surge',
    description: 'When local sports events coincide with rainy weather, delivery orders increase by 65%.',
    impact: 'neutral',
    confidence: 0.94,
    actionable: true,
    recommendations: [
      'Ensure adequate delivery driver coverage',
      'Promote delivery specials during games',
      'Optimize kitchen for higher delivery volume',
      'Consider game-watching promotions'
    ],
    data: { pattern: 'Rain + Sports Events', deliveryIncrease: '65%' },
    createdAt: new Date().toISOString()
  },
  {
    id: 'insight_4',
    type: 'forecast',
    title: 'Stormy Weather Alert',
    description: 'Severe thunderstorms expected Tuesday evening will likely reduce foot traffic by 35%.',
    impact: 'negative',
    confidence: 0.89,
    actionable: true,
    recommendations: [
      'Reduce staff scheduling for Tuesday evening',
      'Focus on delivery and takeout promotions',
      'Prepare comfort food specials',
      'Consider early closure if conditions worsen'
    ],
    data: { expectedDecrease: '35%', timeframe: 'Tuesday 17:00-22:00' },
    createdAt: new Date().toISOString()
  }
];

// Business forecasts
export const mockBusinessForecasts: BusinessForecast[] = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i);
  
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
  const isWeekend = dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
  
  const baseSales = isWeekend ? 8500 : 6200;
  const weatherMultiplier = 0.9 + Math.random() * 0.3;
  const eventMultiplier = Math.random() > 0.7 ? 1.2 : 1.0;
  
  const predictedSales = Math.round(baseSales * weatherMultiplier * eventMultiplier);
  
  return {
    date: date.toISOString().split('T')[0],
    predictedSales,
    confidence: 0.75 + Math.random() * 0.2,
    factors: {
      weather: {
        condition: mockWeatherData[0]?.condition || 'sunny',
        impact: weatherMultiplier - 1
      },
      events: {
        count: Math.floor(Math.random() * 3),
        impact: eventMultiplier - 1
      },
      historical: {
        dayOfWeek,
        seasonality: isWeekend ? 0.15 : -0.05
      }
    },
    recommendations: [
      isWeekend ? 'Increase weekend staffing' : 'Standard weekday operations',
      weatherMultiplier > 1.1 ? 'Prepare for weather boost' : 'Normal weather impact',
      eventMultiplier > 1.1 ? 'Event traffic expected' : 'No major events'
    ]
  };
});

// Competitor data
export const mockCompetitorData: CompetitorData[] = [
  {
    id: 'comp_1',
    name: "Mario's Italian Bistro",
    distance: 0.4,
    priceRange: '$$-$$$',
    rating: 4.6,
    reviewCount: 342,
    popularTimes: {
      '11': 30, '12': 85, '13': 95, '17': 40, '18': 75, '19': 90, '20': 85, '21': 60
    },
    menuHighlights: ['Handmade Pasta', 'Wood-fired Pizza', 'Wine Selection'],
    promotions: ['Happy Hour 4-6pm', 'Wine Wednesday 50% off'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'comp_2',
    name: 'The Local Pub & Grill',
    distance: 0.6,
    priceRange: '$-$$',
    rating: 4.2,
    reviewCount: 567,
    popularTimes: {
      '11': 25, '12': 70, '13': 80, '17': 60, '18': 85, '19': 95, '20': 90, '21': 75
    },
    menuHighlights: ['Craft Burgers', 'Local Beers', 'Game Day Specials'],
    promotions: ['Trivia Tuesday', 'Wing Wednesday $0.50 wings'],
    lastUpdated: new Date().toISOString()
  }
];

// Market trends
export const mockMarketTrends: MarketTrend[] = [
  {
    id: 'trend_1',
    category: 'Plant-Based Options',
    trend: 'rising',
    changePercent: 23,
    timeframe: 'Last 6 months',
    description: 'Demand for plant-based menu options continues to grow',
    source: 'Restaurant Industry Report',
    relevance: 0.85
  },
  {
    id: 'trend_2',
    category: 'Delivery Services',
    trend: 'stable',
    changePercent: 2,
    timeframe: 'Last 3 months',
    description: 'Delivery demand has stabilized post-pandemic',
    source: 'Food Service Analytics',
    relevance: 0.92
  },
  {
    id: 'trend_3',
    category: 'Local Sourcing',
    trend: 'rising',
    changePercent: 18,
    timeframe: 'Last 12 months',
    description: 'Consumers increasingly prefer locally-sourced ingredients',
    source: 'Consumer Preference Study',
    relevance: 0.78
  }
];

// Economic indicators
export const mockEconomicIndicators: EconomicIndicator[] = [
  {
    id: 'econ_1',
    name: 'Local Employment Rate',
    value: 96.2,
    change: 0.3,
    changePercent: 0.31,
    impact: 'positive',
    description: 'Employment rate increased, indicating stronger local economy',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'econ_2',
    name: 'Food Cost Index',
    value: 108.5,
    change: 2.1,
    changePercent: 1.97,
    impact: 'negative',
    description: 'Food costs continue to rise, affecting restaurant margins',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'econ_3',
    name: 'Consumer Spending (Dining)',
    value: 112.3,
    change: 1.8,
    changePercent: 1.63,
    impact: 'positive',
    description: 'Consumer dining spending shows healthy growth',
    lastUpdated: new Date().toISOString()
  }
];
