// src/app/api/user/books/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ApiResponse, UserBooksResponse } from '@/types'

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<UserBooksResponse>>> {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ 
        success: false,
        error: 'Unauthorized' 
      }, { status: 401 })
    }

    const purchases = await prisma.purchase.findMany({
      where: { userId: session.user.id },
      include: { book: true },
      orderBy: { createdAt: 'desc' }
    })

    const rentals = await prisma.rental.findMany({
      where: { userId: session.user.id },
      include: { book: true },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ 
      success: true,
      data: { purchases, rentals } 
    })
  } catch (error) {
    console.error('User books error:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Internal error' 
    }, { status: 500 })
  }
} {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}