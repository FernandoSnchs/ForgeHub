import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { prisma } from '@/lib/prisma'
import { v4 as uuidv4 } from 'uuid' 

export async function POST(req) {
  const body = await req.json()
  const { email, password } = body

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email e senha são obrigatórios' },
      { status: 400 }
    )
  }

  const userExists = await prisma.user.findUnique({
    where: { email },
  })

  if (userExists) {
    return NextResponse.json(
      { error: 'Email já está em uso' },
      { status: 409 }
    )
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
  data: {
    id: uuidv4(),
    email,
    password: hashedPassword,
  },
})

  return NextResponse.json(
    {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    },
    { status: 201 }
  )
}