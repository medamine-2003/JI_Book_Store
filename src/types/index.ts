// src/types/index.ts
export interface Book {
  id: string;
  title: string;
  author: string;
  description: string | null;
  imageUrl: string;
  price: number;
  rentalPrice: number;
  category: string;
  isbn: string | null;
  stock: number;
  available: boolean;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
}

export interface Purchase {
  id: string;
  userId: string;
  bookId: string;
  price: number;
  createdAt: Date;
  user: User;
  book: Book;
}

export interface Rental {
  id: string;
  userId: string;
  bookId: string;
  price: number;
  startDate: Date;
  endDate: Date;
  returned: boolean;
  createdAt: Date;
  user: User;
  book: Book;
}

export interface UserBook {
  id: string;
  book: {
    title: string;
    author: string;
    imageUrl: string;
  };
  type: "purchase" | "rental";
  date: string;
  endDate?: string;
  returned?: boolean;
}

export interface TrendingBook {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  price: number;
  rentalPrice: number;
  category: string;
  rentals: number;
  purchases: number;
  rank: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface UserBooksResponse {
  purchases: Purchase[];
  rentals: Rental[];
}

// Structured Data types
export interface BookStructuredData {
  "@context": string;
  "@type": string;
  name: string;
  author: {
    "@type": string;
    name: string;
  };
  image: string;
  offers: Array<{
    "@type": string;
    price: number;
    priceCurrency: string;
    availability: string;
    seller: {
      "@type": string;
      name: string;
    };
  }>;
}

export interface OrganizationStructuredData {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  logo: string;
  description: string;
  contactPoint: {
    "@type": string;
    telephone: string;
    contactType: string;
  };
}
