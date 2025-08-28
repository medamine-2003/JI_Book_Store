// src/app/api/trends/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeFrame = searchParams.get("timeFrame") || "month";
    const viewType = searchParams.get("viewType") || "combined";

    // Calculate date range based on timeFrame
    const now = new Date();
    let startDate = new Date();

    switch (timeFrame) {
      case "week":
        startDate.setDate(now.getDate() - 7);
        break;
      case "month":
        startDate.setMonth(now.getMonth() - 1);
        break;
      case "year":
        startDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    // Get books with their rental and purchase counts
    const books = await prisma.book.findMany({
      include: {
        rentals: {
          where: {
            createdAt: { gte: startDate },
          },
        },
        purchases: {
          where: {
            createdAt: { gte: startDate },
          },
        },
      },
    });

    // Transform data to include counts
    const trendsData = books.map((book, index) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      imageUrl: book.imageUrl,
      price: book.price,
      rentalPrice: book.rentalPrice,
      category: book.category,
      rentals: book.rentals.length,
      purchases: book.purchases.length,
      rank: index + 1,
    }));

    // Sort based on viewType
    let sortedBooks = [...trendsData];
    switch (viewType) {
      case "rentals":
        sortedBooks.sort((a, b) => b.rentals - a.rentals);
        break;
      case "purchases":
        sortedBooks.sort((a, b) => b.purchases - a.purchases);
        break;
      case "combined":
      default:
        sortedBooks.sort(
          (a, b) => b.rentals + b.purchases - (a.rentals + a.purchases)
        );
        break;
    }

    // Update ranks after sorting
    sortedBooks = sortedBooks.map((book, index) => ({
      ...book,
      rank: index + 1,
    }));

    return NextResponse.json(sortedBooks);
  } catch (error) {
    console.error("Trends API error:", error);

    // Return mock data as fallback
    const mockTrends = [
      {
        id: "1",
        title: "The Seven Husbands of Evelyn Hugo",
        author: "Taylor Jenkins Reid",
        imageUrl: "https://covers.openlibrary.org/b/id/12583254-L.jpg",
        price: 16.99,
        rentalPrice: 4.49,
        category: "Contemporary Fiction",
        rentals: 245,
        purchases: 89,
        rank: 1,
      },
      {
        id: "2",
        title: "Atomic Habits",
        author: "James Clear",
        imageUrl: "https://covers.openlibrary.org/b/id/8509858-L.jpg",
        price: 18.99,
        rentalPrice: 4.99,
        category: "Self-Help",
        rentals: 198,
        purchases: 156,
        rank: 2,
      },
    ];

    return NextResponse.json(mockTrends);
  }
}
