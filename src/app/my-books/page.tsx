// src/app/my-books/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
/*import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Books - Track Your Reading | BookStore",
  description:
    "Track your purchased and rented books. Monitor rental due dates and manage your personal library.",
  keywords: "my books, reading tracker, book library, rental management",
  openGraph: {
    title: "My Books - Personal Library",
    description: "Track and manage your book collection",
    type: "website",
  },
};*/

interface UserBook {
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

// Mock data
const mockUserBooks: UserBook[] = [
  {
    id: "1",
    book: {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      imageUrl: "https://covers.openlibrary.org/b/id/8225261-L.jpg",
    },
    type: "purchase",
    date: "2024-01-15",
  },
  {
    id: "2",
    book: {
      title: "Dune",
      author: "Frank Herbert",
      imageUrl: "https://covers.openlibrary.org/b/id/8225261-L.jpg",
    },
    type: "rental",
    date: "2024-01-20",
    endDate: "2024-01-27",
    returned: false,
  },
];

export default function MyBooksPage() {
  const { data: session } = useSession();
  const [userBooks, setUserBooks] = useState<UserBook[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "purchased" | "rented">(
    "all"
  );

  useEffect(() => {
    if (session) {
      // Replace with actual API call
      setUserBooks(mockUserBooks);
    }
  }, [session]);

  const filteredBooks = userBooks.filter((book) => {
    if (activeTab === "purchased") return book.type === "purchase";
    if (activeTab === "rented") return book.type === "rental";
    return true;
  });

  const handleReturn = async (bookId: string) => {
    try {
      const response = await fetch(`/api/rental/${bookId}/return`, {
        method: "POST",
      });

      if (response.ok) {
        setUserBooks((prev) =>
          prev.map((book) =>
            book.id === bookId ? { ...book, returned: true } : book
          )
        );
        alert("Book returned successfully!");
      }
    } catch (error) {
      alert("Error returning book");
    }
  };

  if (!session) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Sign In Required
          </h2>
          <p className="text-gray-600">Please sign in to view your books.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">My Books</h1>
        <p className="text-gray-600 mb-6">
          Track your purchased and rented books
        </p>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: "all", label: "All Books", count: userBooks.length },
              {
                id: "purchased",
                label: "Purchased",
                count: userBooks.filter((b) => b.type === "purchase").length,
              },
              {
                id: "rented",
                label: "Rented",
                count: userBooks.filter((b) => b.type === "rental").length,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-red-500 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Books List */}
      <div className="space-y-4">
        {filteredBooks.map((userBook) => (
          <div
            key={userBook.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Image
                  src={userBook.book.imageUrl}
                  alt={userBook.book.title}
                  width={80}
                  height={120}
                  className="rounded-md"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900">
                  {userBook.book.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  by {userBook.book.author}
                </p>

                <div className="flex items-center space-x-4 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      userBook.type === "purchase"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {userBook.type === "purchase" ? "Owned" : "Rented"}
                  </span>

                  <span className="text-gray-500">
                    {userBook.type === "purchase"
                      ? `Purchased on ${new Date(
                          userBook.date
                        ).toLocaleDateString()}`
                      : `Rented ${new Date(
                          userBook.date
                        ).toLocaleDateString()} - ${new Date(
                          userBook.endDate!
                        ).toLocaleDateString()}`}
                  </span>
                </div>

                {userBook.type === "rental" && !userBook.returned && (
                  <div className="mt-2">
                    <span className="text-xs text-orange-600 font-medium">
                      Due: {new Date(userBook.endDate!).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              {userBook.type === "rental" && !userBook.returned && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleReturn(userBook.id)}
                >
                  Return Book
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No books found in this category.
          </p>
        </div>
      )}
    </div>
  );
}
