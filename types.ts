
export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Skincare' | 'Lipcare' | 'Serums' | 'Masks';
  images: string[];
  rating: number;
  ingredients?: string[];
  howToUse?: string;
  reviews?: Review[];
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type AppView = 'home' | 'skincare' | 'lipcare' | 'about' | 'product' | 'search' | 'contact' | 'shipping' | 'faq' | 'checkout' | 'newsletter-success' | 'wishlist' | 'account';
