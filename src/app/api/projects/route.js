import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req) {
  const userId = req.headers.get('x-user-id')
  const { name } = await req.json()

  if (!name) {
    return NextResponse.json({ error: 'name required' }, { status: 400 })
  }

  const project = await prisma.project.create({
    data: { name, userId },
  })

  return NextResponse.json(project)
}

export async function GET(req) {
  const userId = req.headers.get('x-user-id')

  const projects = await prisma.project.findMany({
    where: { userId },
    include: { tasks: true },
  })

  return NextResponse.json(projects)
}