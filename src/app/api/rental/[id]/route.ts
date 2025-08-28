// src/app/api/rental/[id]/return/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const rental = await prisma.rental.update({
      where: {
        id: params.id,
        userId: session.user.id
      },
      data: {
        returned: true
      }
    })

    return NextResponse.json({ success: true, rental })
  } catch (error){
    console.error('Return rental error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }}
