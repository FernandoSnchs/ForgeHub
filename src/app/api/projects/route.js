import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req) {
  const userId = req.headers.get('x-user-id')
  const { name } = await req.json()

  if (!name) {
    return NextResponse.json({ error: 'name required' }, { status: 400 })
  }

  const project = await prisma.projects.create({
    data: {
      id: uuidv4(),
      name,
      user_id: userId,
    },
  })

  return NextResponse.json(project)
}

export async function GET(req) {
  const userId = req.headers.get('x-user-id')

  const projects = await prisma.projects.findMany({
    where: { user_id: userId },
    include: { task: true },
    orderBy: { created_at: 'desc' },
  })

  return NextResponse.json(projects)
}