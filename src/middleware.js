import { NextResponse } from 'next/server'
import { verifyToken } from '@/lib/jwt'

export async function middleware(req) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '')

  if (!token) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

    try {
    const payload = await verifyToken(token)
    console.log("Conteudo do token:", payload)
    // Se chegou aqui, o token é válido
    const response = NextResponse.next()
    response.headers.set('x-user-id', payload.id)
    response.headers.set('x-user-role', payload.role)
    return response
  } catch (err) { // <--- Note o (err) aqui!
    console.error("DETALHE DO ERRO NO JWT:", err.message); 
    return NextResponse.json({ error: 'invalid token' }, { status: 401 })
  }

}

export const config = {
  matcher: ['/api/projects/:path*', '/api/admin/:path*'],
}