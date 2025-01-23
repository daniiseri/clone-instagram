import fastifyPlugin from 'fastify-plugin'

export const auth = fastifyPlugin((app) => {
  app.addHook('preHandler', async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch (error) {
      console.log(error)
    }
  })
})