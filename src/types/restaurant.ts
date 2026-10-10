export type DietaryTag = 
  | 'Chef Special' 
  | 'Party Pack' 
  | 'Bulk Pot' 
  | 'Spicy' 
  | 'Mild' 
  | 'Sweet Tooth' 
  | 'Fresh Baked' 
  | 'Gluten-Free' 
  | 'Comfort Food';

export type CategoryId = 
  | 'smallchops' 
  | 'meals' 
  | 'soups-stews' 
  | 'pastries-snacks' 
  | 'cakes-trays' 
  | 'catering';

export interface MenuItem {
  id: string;
  name: string;
  portionOrSize?: string;
  description: string;
  price: number; // in NGN (₦)
  category: CategoryId;
  image: string;
  isVeg?: boolean;
  isBestseller?: boolean;
  spiceLevel?: 1 | 2 | 3; // 1 = Mild, 2 = Medium, 3 = Extra Spicy
  rating: number;
  reviewsCount: number;
  prepTime: string;
  dietaryTags: DietaryTag[];
  ingredients: string[];
  pairingRecommendation?: string;
  sizeOptions?: string[];
  whatsAppInquiryText?: string;
}

export interface MenuCategory {
  id: CategoryId;
  name: string;
  label: string;
  image: string;
  description: string;
  itemCount: number;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedOption?: string;
  specialNotes?: string;
}

export type EventType = 
  | 'Birthday Celebration' 
  | 'Anniversary & Surprise Gift' 
  | 'Wedding & Reception' 
  | 'Office Lunch & Corporate Meeting' 
  | 'Hostel & Student Hangout' 
  | 'Family Gathering & Sunday Pot';

export interface EventBooking {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  guestsCount: number;
  packageType: string;
  eventType: EventType;
  venueOrAddress: string;
  deliveryOption: 'Lokoja Doorstep Delivery' | 'Self Pickup (Rock Garden)' | 'Interstate Shipping';
  budgetEstimate?: number;
  specialRequests?: string;
  status: 'Confirmed' | 'Pending';
  createdAt: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  comment: string;
  dishRecommended: string;
  date: string;
  verified: boolean;
}

export interface AnalyticsEvent {
  id: string;
  type: 
    | 'PAGE_VIEW' 
    | 'MENU_FILTER' 
    | 'ADD_TO_CART' 
    | 'VIEW_DISH' 
    | 'INITIATE_BOOKING' 
    | 'CONFIRM_BOOKING' 
    | 'WHATSAPP_CHECKOUT' 
    | 'CHECKOUT_SIMULATION' 
    | 'THEME_TOGGLE';
  details: string;
  timestamp: string;
}

export interface AnalyticsSummary {
  pageViews: number;
  uniqueVisitors: number;
  cartAdditions: number;
  bookingsConfirmed: number;
  totalOrderValue: number;
  dishPopularity: Record<string, number>;
  events: AnalyticsEvent[];
}
