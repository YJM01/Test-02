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
