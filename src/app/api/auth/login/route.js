import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { prisma } from '@/lib/prisma'
import { signToken } from '@/lib/jwt'

export async function POST(req) {
  const {email, password} = await req.json()

  console.log("tentando logar com:", email)
  const user = await prisma.user.findUnique({where: { email }})
  if(!user) {
    return NextResponse.json(
      {error: "invalid credentials"},
      {status: 401}
    )
  }
 
  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    return NextResponse.json(
      {error: "invalid credentials"},
      {status: 401}
    )
  }
  console.log("DADOS DO BANCO:", user)
  const token = await signToken({
    id: user.id,
    role: user.role
  })

  // ... lógica de verificação anterior ...

return NextResponse.json({ 
  token,
  user: {
    email: user.email,
    id: user.id,
    role: user.role
  },
  
})

}