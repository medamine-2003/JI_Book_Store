// src/app/services/ServicesClient.tsx
"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { BookCard } from "@/components/ui/BookCard";
import { Button } from "@/components/ui/Button";
import { Book } from "@/types";

// Mock data - replace with actual API calls
const mockBooks: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description:
      "A classic American novel about the Jazz Age and the American Dream.",
    imageUrl: "https://covers.openlibrary.org/b/id/8225261-L.jpg",
    price: 15.99,
    rentalPrice: 3.99,
    category: "Classic",
    isbn: "9780743273565",
    stock: 10,
    available: true,
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A gripping tale of racial injustice and childhood innocence.",
    imageUrl: "https://covers.openlibrary.org/b/id/8226689-L.jpg",
    price: 14.99,
    rentalPrice: 3.49,
    category: "Classic",
    isbn: "9780061120084",
    stock: 15,
    available: true,
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "Dune",
    author: "Frank Herbert",
    description: "Epic science fiction novel set in a distant future.",
    imageUrl: "https://covers.openlibrary.org/b/id/8225261-L.jpg",
    price: 18.99,
    rentalPrice: 4.99,
    category: "Science Fiction",
    isbn: "9780441172719",
    stock: 8,
    available: true,
    createdAt: new Date(),
  },
];

export default function ServicesClient() {
  const { data: session } = useSession();
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const categories = [
    "all",
    "Classic",
    "Science Fiction",
    "Mystery",
    "Romance",
  ];

  // Replace mock data with actual API call
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filter !== "all") params.append("category", filter);
        if (searchTerm) params.append("search", searchTerm);

        const response = await fetch(`/api/books?${params}`);
        if (response.ok) {
          const data: Book[] = await response.json();
          setBooks(data);
        } else {
          // Fallback to mock data if API fails
          console.log("API failed, using mock data");
          setBooks(mockBooks);
        }
      } catch (error) {
        console.log("Error fetching books, using mock data:", error);
        setBooks(mockBooks);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [filter, searchTerm]);

  const filteredBooks = books.filter((book) => {
    const matchesCategory = filter === "all" || book.category === filter;
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBuy = async (bookId: string) => {
    if (!session) {
      alert("Please sign in to purchase books");
      return;
    }

    try {
      const response = await fetch("/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Book purchased successfully!");
        // Optionally refresh the books list or update UI
      } else {
        alert(data.error || "Failed to purchase book");
      }
    } catch (error) {
      console.error("Purchase error:", error);
      alert("Error purchasing book. Please try again.");
    }
  };

  const handleRent = async (bookId: string) => {
    if (!session) {
      alert("Please sign in to rent books");
      return;
    }

    try {
      const response = await fetch("/api/rental", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, days: 7 }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Book rented successfully! Due in 7 days.");
        // Optionally redirect to My Books or show rental details
      } else {
        alert(data.error || "Failed to rent book");
      }
    } catch (error) {
      console.error("Rental error:", error);
      alert("Error renting book. Please try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Book Services</h1>
        <p className="text-gray-600 mb-6">
          Browse our extensive collection of books available for purchase or
          rental
        </p>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search books or authors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Books Grid */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Loading books...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onBuy={handleBuy}
              onRent={handleRent}
            />
          ))}
        </div>
      )}

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No books found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
