export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: 'small-plates' | 'mains' | 'desserts';
  ingredients: string[];
  dietaryTags: DietaryTag[];
  flavorProfile: string;
  isSignature?: boolean;
}

export type DietaryTag = 
  | 'GF' 
  | 'Vegan' 
  | 'Vegetarian' 
  | 'Nut-Free' 
  | 'Dairy-Free' 
  | 'Gluten-Free'
  | 'Spicy';

export interface JobListing {
  id: string;
  title: string;
  department: 'FOH' | 'BOH';
  type: 'Full-time' | 'Part-time' | 'Seasonal';
  description: string;
  requirements: string[];
  location: string;
}

export interface ReservationFormData {
  date: string;
  time: string;
  partySize: string;
  name: string;
  phone: string;
  email: string;
  notes?: string;
}

export interface ApplicationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  message: string;
  resume?: File;
}
