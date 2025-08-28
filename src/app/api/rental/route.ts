// src/app/api/rental/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/types";

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse>> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const { bookId, days = 7 } = await request.json();

    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      return NextResponse.json(
        {
          success: false,
          error: "Book not found",
        },
        { status: 404 }
      );
    }

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + days);

    const rental = await prisma.rental.create({
      data: {
        userId: session.user.id,
        bookId: bookId,
        price: book.rentalPrice,
        endDate: endDate,
      },
    });

    return NextResponse.json({
      success: true,
      data: rental,
    });
  } catch (error) {
    console.error("Rental error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal error",
      },
      { status: 500 }
    );
  }
}
