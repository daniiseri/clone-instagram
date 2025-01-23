import { FastifyInstance } from "fastify";
import { auth } from "../plugins/auth";
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from "zod";
import { prisma } from "../lib/prisma";

const profileResponseSchema = z.object({
  name: z.string().nullable(),
  username: z.string(),
  profilePhotoURL: z.string().nullable()
}).nullable()

const profileParamsSchema = z.object({
  username: z.string()
})

const postsResponseSchema = z.object({
  posts: z.array(
    z.object({
      url: z.string()
    })
  )
})

const postsParamsSchema = z.object({
  username: z.string()
})

export async function profileRoutes(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get('/users/:username',
      {
        schema: {
          tags: ['Users'],
          summary: 'Get profile user',
          params: profileParamsSchema,
          response: {
            400: z.string(),
            200: profileResponseSchema,
          }
        }
      }
      , async (request, reply) => {
        const { username } = request.params

        const user = await prisma.user.findUnique({
          where: { username },
          select: {
            name: true,
            username: true,
            profilePhotoURL: true
          }
        })

        reply.send(user)
      })

  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get('/users/:username/posts',
      {
        schema: {
          tags: ['Users'],
          summary: 'Get user posts',
          params: postsParamsSchema,
          response: {
            400: z.string(),
            200: postsResponseSchema
          }
        }
      },
      async (request, reply) => {
        const { username } = request.params

        const userFound = await prisma.user.findUnique({
          where: {
            username
          }
        })

        if (!userFound) return reply.status(400).send('Usuário não encontrado')

        const posts = await prisma.photo.findMany({
          where: {
            userId: userFound.id
          },
          select: {
            url: true
          }
        })

        reply.send({ posts })
      }
    )
}