import { AnalyticsEvent, AnalyticsSummary } from '../types/restaurant';

const STORAGE_KEY = 'ebundfoodie_analytics_store_v1';
const SESSION_KEY = 'ebundfoodie_session_id';

class AnalyticsService {
  private summary: AnalyticsSummary;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.summary = this.loadInitial();
    this.trackSession();
  }

  private loadInitial(): AnalyticsSummary {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback
    }

    // Default seeded baseline for Ebun D Foodie
    return {
      pageViews: 1850,
      uniqueVisitors: 1120,
      cartAdditions: 430,
      bookingsConfirmed: 114,
      totalOrderValue: 4850000,
      dishPopularity: {
        'Smallchops Beef Platter': 195,
        'Smokey Party Jollof Rice': 180,
        'Flaky Golden Meatpie (Box of 5)': 142,
        'Beef & Ponmo Stew (2.5L Pot)': 98,
        'Milky Gourmet Chinchin (1L)': 85,
        'VIP Surprise Food Tray': 32,
      },
      events: [
        {
          id: 'ev-init-1',
          type: 'CONFIRM_BOOKING',
          details: 'Event Booking: Mega Smallchops (200 pcs) for Fatima (Lokoja)',
          timestamp: new Date(Date.now() - 1000 * 60 * 18).toLocaleTimeString(),
        },
        {
          id: 'ev-init-2',
          type: 'ADD_TO_CART',
          details: 'Added "Smallchops Beef Platter" (₦16,000) x 2',
          timestamp: new Date(Date.now() - 1000 * 60 * 32).toLocaleTimeString(),
        },
        {
          id: 'ev-init-3',
          type: 'WHATSAPP_CHECKOUT',
          details: 'WhatsApp Order: 2.5L Beef & Ponmo Stew (₦30,000) to 200 Housing',
          timestamp: new Date(Date.now() - 1000 * 60 * 45).toLocaleTimeString(),
        },
      ],
    };
  }

  private persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.summary));
      this.notify();
    } catch {
      // Ignore quota errors
    }
  }

  private notify() {
    this.listeners.forEach((cb) => cb());
  }

  public subscribe(cb: () => void) {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private trackSession() {
    try {
      const hasSession = sessionStorage.getItem(SESSION_KEY);
      if (!hasSession) {
        sessionStorage.setItem(SESSION_KEY, 'sess_' + Date.now());
        this.summary.uniqueVisitors += 1;
      }
      this.summary.pageViews += 1;
      this.persist();
    } catch {
      this.summary.pageViews += 1;
    }
  }

  public track(type: AnalyticsEvent['type'], details: string) {
    const event: AnalyticsEvent = {
      id: 'ev_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      type,
      details,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };

    this.summary.events = [event, ...this.summary.events.slice(0, 49)];

    if (type === 'ADD_TO_CART') {
      this.summary.cartAdditions += 1;
    } else if (type === 'CONFIRM_BOOKING' || type === 'WHATSAPP_CHECKOUT') {
      this.summary.bookingsConfirmed += 1;
    }

    this.persist();
  }

  public trackDishAdd(dishName: string, price: number, quantity = 1) {
    this.summary.dishPopularity[dishName] = (this.summary.dishPopularity[dishName] || 0) + quantity;
    this.summary.totalOrderValue += price * quantity;
    this.track('ADD_TO_CART', `Added "${dishName}" (${quantity}x, ₦${(price * quantity).toLocaleString()})`);
  }

  public getSummary(): AnalyticsSummary {
    return { ...this.summary };
  }

  public reset() {
    this.summary = {
      pageViews: 1,
      uniqueVisitors: 1,
      cartAdditions: 0,
      bookingsConfirmed: 0,
      totalOrderValue: 0,
      dishPopularity: {},
      events: [],
    };
    this.persist();
  }
}

export const analytics = new AnalyticsService();
