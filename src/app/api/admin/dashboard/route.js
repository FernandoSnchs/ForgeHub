import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req) {
  const role = req.headers.get('x-user-role')

  if (role !== 'admin') {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  }

  const users = await prisma.user.findMany({
    include: {
      projects: {
        include: { task: true },
      },
    },
  })

  return NextResponse.json(users)
}