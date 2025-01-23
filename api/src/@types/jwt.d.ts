import '@fastify/jwt'

interface JWTUser {
  sub: string
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: JWTUser
  }
}