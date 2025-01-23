import { FastifyInstance } from "fastify";
import { auth } from "../plugins/auth";
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from "zod";
import { prisma } from "../lib/prisma";

const followParamsSchema = z.object({
  username: z.string()
})

const unfollowParamsSchema = z.object({
  username: z.string()
})

const followersParamsSchema = z.object({
  username: z.string()
})

const followersResponseSchema = z.object({
  followers: z.array(z.object({
    username: z.string(),
    name: z.string().nullable(),
    profilePhotoURL: z.string().nullable(),
  }))
})

const followingParamsSchema = z.object({
  username: z.string()
})

const followingResponseSchema = z.object({
  following: z.array(z.object({
    username: z.string(),
    name: z.string().nullable(),
    profilePhotoURL: z.string().nullable(),
  }))
})

export async function followRoutes(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post('/users/:username/follow',
      {
        schema: {
          tags: ['Users'],
          summary: 'Follow user',
          params: followParamsSchema,
          response: {
            400: z.string(),
            200: z.null()
          }
        }
      }
      , async (request, reply) => {
        const { username } = request.params
        const { sub } = request.user

        const followed = await prisma.user.findUnique({
          where: {
            username
          }
        })

        if (!followed) return reply.status(400).send('Usuário não encontrado')

        const follow = await prisma.follow.count({
          where: {
            followedId: followed.id,
            followerId: sub
          }
        })

        if (!follow) {
          await prisma.follow.create({
            data: {
              followedId: followed.id,
              followerId: sub
            }
          })
        }

        reply.send()
      })

  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post('/users/:username/unfollow',
      {
        schema: {
          tags: ['Users'],
          summary: 'Unfollow user',
          params: unfollowParamsSchema,
          response: {
            400: z.string(),
            200: z.null()
          }
        }
      },
      async (request, reply) => {
        const { username } = request.params
        const { sub } = request.user

        const followed = await prisma.user.findUnique({
          where: {
            username
          }
        })

        if (!followed) return reply.status(400).send('Usuário não encontrado')

        const follow = await prisma.follow.count({
          where: {
            followedId: followed.id,
            followerId: sub
          }
        })

        if (follow) {
          await prisma.follow.delete({
            where: {
              followedId_followerId: {
                followerId: sub,
                followedId: followed.id
              }
            }
          })
        }

        reply.send()
      }
    )

  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get('/users/:username/followers',
      {
        schema: {
          tags: ['Users'],
          summary: 'Get followers',
          params: followersParamsSchema,
          response: {
            400: z.string(),
            200: followersResponseSchema
          }
        }
      },
      async (request, reply) => {
        const { username } = request.params

        const followed = await prisma.user.findUnique({
          where: {
            username
          }
        })

        if (!followed) return reply.status(400).send('Usuário não encontrado')

        const followers = await prisma.user.findMany({
          where: {
            followers: {
              some: {
                followedId: followed.id
              }
            }
          },
          select: {
            username: true,
            name: true,
            profilePhotoURL: true
          }
        })

        reply.send({ followers })
      }
    )

  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get('/users/:username/following',
      {
        schema: {
          tags: ['Users'],
          summary: 'Get following',
          params: followingParamsSchema,
          response: {
            400: z.string(),
            200: followingResponseSchema
          }
        }
      },
      async (request, reply) => {
        const { username } = request.params

        const follower = await prisma.user.findUnique({
          where: {
            username
          }
        })

        if (!follower) return reply.status(400).send('Usuário não encontrado')

        const following = await prisma.user.findMany({
          where: {
            followers: {
              some: {
                followerId: follower.id
              }
            }
          },
          select: {
            username: true,
            name: true,
            profilePhotoURL: true
          }
        })

        reply.send({ following })
      }
    )
}