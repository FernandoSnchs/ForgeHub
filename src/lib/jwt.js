import { SignJWT, jwtVerify } from 'jose'

    const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export async function signToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' }) // Define o algoritmo
    .setIssuedAt()
    .setExpirationTime('2h') // Tempo de expiração (opcional)
    .sign(secret)
}

export async function verifyToken(token){
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jwtVerify(token, secret)
    return payload 
}