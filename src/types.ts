export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string; // Keep as string (e.g. "$18" or "18")
  category: 'appetizers' | 'recommendations' | 'pasta' | 'main' | 'salads' | 'pizza' | 'sides' | 'beverages' | 'cocktails' | 'wines';
  menuType: 'food' | 'beverage' | 'happyhour';
  tags?: string[];
  image?: string;
  isPopular?: boolean;
}

export interface WineSection {
  title: string;
  subtitle: string;
  items: {
    name: string;
    description: string;
    priceGlass?: string;
    priceBottle: string;
    vintage?: string;
    region?: string;
  }[];
}

export interface ReservationData {
  name: string;
  email: string;
  phone: string;
  partySize: number;
  date: string;
  time: string;
  message?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  likes: string;
  comments: string;
  caption: string;
}

export interface LocationInfo {
  id: 'miami' | 'doral';
  name: string;
  fullName: string;
  slogan: string;
  address: string;
  phone: string;
  phoneRaw: string;
  hours: string;
  description: string;
  imageUrl: string;
  bgHeroUrl: string;
}

export const LOCATION_DATA: Record<'miami' | 'doral', LocationInfo> = {
  miami: {
    id: 'miami',
    name: 'Miami Beach',
    fullName: 'Limoncello South Beach',
    slogan: 'Miami Beach Fine Dining',
    address: '1334 Washington Ave, Miami Beach, FL 33139',
    phone: '(305) 397-8226',
    phoneRaw: '3053978226',
    hours: 'Sun - Thu: 5:00 PM - 10:30 PM | Fri - Sat: 5:00 PM - 11:30 PM',
    description: 'Experience Amalfi coast luxury merged with the oceanfront vitality of South Beach, Miami. Famous for candlelit dinners and open coastal dining.',
    imageUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=1200', // Miami Beach vibe
    bgHeroUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1920'
  },
  doral: {
    id: 'doral',
    name: 'Doral',
    fullName: 'Limoncello Doral Estate',
    slogan: 'Doral Luxury Estate & Garden',
    address: '8700 NW 36th St, Doral, FL 33166',
    phone: '(305) 555-0199',
    phoneRaw: '3055550199',
    hours: 'Sun - Thu: 4:30 PM - 10:00 PM | Fri - Sat: 4:30 PM - 11:00 PM',
    description: 'A sun-drenched private dining terrace with Tuscan estate elegance. Beautiful stone masonry, lemon-growing garden pergolas, and cozy hearth tables.',
    imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=1200', // Doral estate vibe
    bgHeroUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1920'
  }
};
