// src/lib/structured-data.ts
import { Book, BookStructuredData, OrganizationStructuredData } from "@/types";

export const generateBookStructuredData = (book: Book): BookStructuredData => {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: {
      "@type": "Person",
      name: book.author,
    },
    image: book.imageUrl,
    offers: [
      {
        "@type": "Offer",
        price: book.price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: "BookStore",
        },
      },
    ],
  };
};

export const generateOrganizationStructuredData =
  (): OrganizationStructuredData => {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "BookStore",
      url: "https://bookstore.com",
      logo: "https://bookstore.com/logo.png",
      description: "Online book rental and sales platform",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-800-BOOKSTORE",
        contactType: "customer service",
      },
    };
  };
