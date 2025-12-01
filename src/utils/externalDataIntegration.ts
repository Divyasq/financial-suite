import { mockWeatherData, mockLocalEvents, mockExternalDataInsights } from '../data/mockExternalData';
import { WeatherData, LocalEvent, ExternalDataInsight } from '../types/external-data';

// Service to integrate external data into other parts of the app
export class ExternalDataService {
  
  // Get current weather context for sales analysis
  static getCurrentWeatherContext(): {
    weather: WeatherData | null;
    impact: string;
    recommendation: string;
  } {
    const currentWeather = mockWeatherData[mockWeatherData.length - 1];
    
    if (!currentWeather) {
      return {
        weather: null,
        impact: 'No weather data available',
        recommendation: 'Enable weather integration for enhanced insights'
      };
    }

    let impact = '';
    let recommendation = '';

    switch (currentWeather.condition) {
      case 'sunny':
        impact = 'Sunny weather typically increases sales by 15%';
        recommendation = 'Consider extending outdoor seating and stocking extra beverages';
        break;
      case 'rainy':
        impact = 'Rainy weather may reduce foot traffic by 15%';
        recommendation = 'Focus on delivery promotions and comfort food specials';
        break;
      case 'stormy':
        impact = 'Severe weather can reduce sales by 35%';
        recommendation = 'Reduce staffing and prepare for lower volume';
        break;
      default:
        impact = 'Weather conditions are neutral';
        recommendation = 'Normal operational procedures';
    }

    return { weather: currentWeather, impact, recommendation };
  }

  // Get upcoming events that might impact business
  static getUpcomingEventsContext(): {
    events: LocalEvent[];
    totalImpact: string;
    recommendations: string[];
  } {
    const upcomingEvents = mockLocalEvents.filter(
      event => new Date(event.date) >= new Date() && new Date(event.date) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    );

    const highImpactEvents = upcomingEvents.filter(event => event.impact === 'high');
    const totalExpectedAttendees = upcomingEvents.reduce((sum, event) => sum + event.attendeeCount, 0);

    let totalImpact = '';
    const recommendations: string[] = [];

    if (highImpactEvents.length > 0) {
      totalImpact = `${highImpactEvents.length} high-impact events expected with ${totalExpectedAttendees.toLocaleString()} total attendees`;
      recommendations.push('Increase staffing by 30-50% during event times');
      recommendations.push('Prepare for 2-3x normal volume');
      recommendations.push('Consider special event menus or promotions');
    } else if (upcomingEvents.length > 0) {
      totalImpact = `${upcomingEvents.length} moderate events expected`;
      recommendations.push('Monitor event times for potential traffic increases');
      recommendations.push('Have backup staff available');
    } else {
      totalImpact = 'No major events scheduled';
      recommendations.push('Normal operational planning');
    }

    return { events: upcomingEvents, totalImpact, recommendations };
  }

  // Get actionable insights for dashboard widgets
  static getActionableInsights(): ExternalDataInsight[] {
    return mockExternalDataInsights.filter(insight => insight.actionable);
  }

  // Enhance sales data with external context
  static enhanceSalesDataWithContext(salesData: any): any {
    const weatherContext = this.getCurrentWeatherContext();
    const eventsContext = this.getUpcomingEventsContext();
    
    return {
      ...salesData,
      externalContext: {
        weather: weatherContext,
        events: eventsContext,
        lastUpdated: new Date().toISOString()
      }
    };
  }

  // Get correlation insights for a specific metric
  static getCorrelationInsights(metric: string): string[] {
    const insights: string[] = [];
    
    // Weather correlations
    if (metric.toLowerCase().includes('sales')) {
      insights.push('Sales increase 2.3% for every 10°F above 65°F');
      insights.push('Rainy days typically reduce sales by 15%');
    }
    
    if (metric.toLowerCase().includes('traffic')) {
      insights.push('Local events within 1 mile increase foot traffic by 35%');
      insights.push('Sports events have highest impact on evening traffic');
    }
    
    if (metric.toLowerCase().includes('labor')) {
      insights.push('Weather impacts staffing needs - sunny days require 20% more patio staff');
      insights.push('Event days may require 40% additional staffing');
    }

    return insights;
  }

  // Generate contextual alerts based on external data
  static generateContextualAlerts(): Array<{
    id: string;
    title: string;
    message: string;
    severity: 'info' | 'warning' | 'critical';
    source: string;
    actionable: boolean;
  }> {
    const alerts = [];
    const weatherContext = this.getCurrentWeatherContext();
    const eventsContext = this.getUpcomingEventsContext();

    // Weather-based alerts
    if (weatherContext.weather?.condition === 'stormy') {
      alerts.push({
        id: 'weather_storm_alert',
        title: 'Severe Weather Impact',
        message: 'Thunderstorms expected - consider adjusting staffing and operations',
        severity: 'warning' as const,
        source: 'Weather Integration',
        actionable: true
      });
    }

    if (weatherContext.weather?.temperature && weatherContext.weather.temperature > 85) {
      alerts.push({
        id: 'weather_heat_alert',
        title: 'High Temperature Opportunity',
        message: 'Hot weather expected - increase cold beverage inventory and patio capacity',
        severity: 'info' as const,
        source: 'Weather Integration',
        actionable: true
      });
    }

    // Event-based alerts
    const highImpactEvents = eventsContext.events.filter(e => e.impact === 'high');
    if (highImpactEvents.length > 0) {
      alerts.push({
        id: 'events_high_impact',
        title: 'Major Event Alert',
        message: `${highImpactEvents.length} high-impact events this week - prepare for increased demand`,
        severity: 'warning' as const,
        source: 'Events Integration',
        actionable: true
      });
    }

    return alerts;
  }

  // Get external data summary for reports
  static getExternalDataSummary(): {
    weather: { condition: string; temperature: number; impact: string };
    events: { count: number; highImpact: number; totalAttendees: number };
    insights: { total: number; actionable: number };
    lastUpdated: string;
  } {
    const weatherContext = this.getCurrentWeatherContext();
    const eventsContext = this.getUpcomingEventsContext();
    const insights = this.getActionableInsights();

    return {
      weather: {
        condition: weatherContext.weather?.condition || 'unknown',
        temperature: weatherContext.weather?.temperature || 0,
        impact: weatherContext.impact
      },
      events: {
        count: eventsContext.events.length,
        highImpact: eventsContext.events.filter(e => e.impact === 'high').length,
        totalAttendees: eventsContext.events.reduce((sum, e) => sum + e.attendeeCount, 0)
      },
      insights: {
        total: mockExternalDataInsights.length,
        actionable: insights.length
      },
      lastUpdated: new Date().toISOString()
    };
  }

  // Format external data for display in widgets
  static formatForWidget(type: 'weather' | 'events' | 'insights'): {
    title: string;
    value: string;
    change: string;
    changeType: 'positive' | 'negative' | 'neutral';
    description: string;
  } {
    switch (type) {
      case 'weather':
        const weather = this.getCurrentWeatherContext();
        return {
          title: 'Weather Impact',
          value: weather.weather?.condition || 'Unknown',
          change: weather.weather?.temperature ? `${weather.weather.temperature}°F` : 'N/A',
          changeType: weather.weather?.condition === 'sunny' ? 'positive' : 
                     weather.weather?.condition === 'rainy' ? 'negative' : 'neutral',
          description: weather.impact
        };

      case 'events':
        const events = this.getUpcomingEventsContext();
        return {
          title: 'Upcoming Events',
          value: events.events.length.toString(),
          change: `${events.events.filter(e => e.impact === 'high').length} high impact`,
          changeType: events.events.filter(e => e.impact === 'high').length > 0 ? 'positive' : 'neutral',
          description: events.totalImpact
        };

      case 'insights':
        const insights = this.getActionableInsights();
        return {
          title: 'AI Insights',
          value: insights.length.toString(),
          change: 'actionable',
          changeType: 'positive',
          description: 'AI-generated recommendations available'
        };

      default:
        return {
          title: 'External Data',
          value: 'N/A',
          change: '',
          changeType: 'neutral',
          description: 'No data available'
        };
    }
  }
}
