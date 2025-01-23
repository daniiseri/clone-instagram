import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import bcrypt from 'bcrypt'
import { auth } from "../plugins/auth";

const signupBodySchema = z.object({
  name: z.string().optional(),
  username: z.string(),
  email: z.string().email(),
  password: z.string()
})

const signupResponseSchema = z.object({
  token: z.string()
})

const signinBodySchema = z.object({
  email: z.string().email(),
  password: z.string()
})

const signinResponseSchema = z.object({
  token: z.string()
})

const getUserResponseSchema = z.object({
  name: z.string().nullable(),
  username: z.string(),
  email: z.string(),
  profilePhotoURL: z.string().nullable()
})

const getPathsResponseSchema = z.object({
  paths: z.array(z.string())
})

const updateProfilePhotoBodySchema = z.object({
  profilePhotoURL: z.string().nullable()
})

export async function userRoutes(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/paths',
      {
        schema: {
          tags: ['Users'],
          summary: 'Get paths',
          response: {
            200: getPathsResponseSchema
          }
        }
      }
      , async (request, reply) => {
        const users = await prisma.user.findMany({})

        const paths = users.map(({ username }) => username)

        reply.send({
          paths
        })
      })

  app
    .withTypeProvider<ZodTypeProvider>()
    .post('/signup', {
      schema: {
        tags: ['Users'],
        summary: 'Create user',
        body: signupBodySchema,
        response: {
          400: z.string(),
          201: signupResponseSchema,
        }
      }
    }, async (request, reply) => {
      const { email, password, name, username } = request.body

      const foundEmail = await prisma.user.findUnique({
        where: {
          email
        }
      })

      if (foundEmail)
        return reply.status(400).send('Outra conta está usando o mesmo email.')

      const foundUsername = await prisma.user.findUnique({
        where: {
          username
        }
      })

      if (foundUsername)
        return reply.status(400).send('Outra conta está usando o mesmo nome de usuário.')

      const passwordHash = await bcrypt.hash(password, 10)

      const user = await prisma.user.create({
        data: {
          name,
          username,
          email,
          password: passwordHash
        }
      })

      const token = app.jwt.sign({
        sub: user.id
      })

      return reply.status(201).send({ token })
    })

  app
    .withTypeProvider<ZodTypeProvider>()
    .post('/signin', {
      schema: {
        tags: ['Users'],
        summary: 'Auth with email and password',
        body: signinBodySchema,
        response: {
          400: z.string(),
          200: signinResponseSchema
        }
      }
    }, async (request, reply) => {
      const { email, password } = request.body

      const userFound = await prisma.user.findUnique({
        where: {
          email
        }
      })

      if (!userFound)
        return reply.status(400).send('Sua senha está incorreta. Confira-a.')

      const isValidPassword = await bcrypt.compare(password, userFound.password)

      if (!isValidPassword)
        return reply.status(400).send('Sua senha está incorreta. Confira-a.')

      const token = app.jwt.sign({
        sub: userFound.id,
      })

      return reply.send({ token })
    })

  app
    .register(auth)
    .withTypeProvider<ZodTypeProvider>()
    .get('/users', {
      schema: {
        tags: ['Users'],
        summary: 'Get user',
        response: {
          400: z.string(),
          200: getUserResponseSchema
        }
      }
    }, async (request, reply) => {
      const { sub } = request.user
      const userFound = await prisma.user.findUnique({
        where: {
          id: sub
        }
      })

      if (!userFound)
        return reply.status(400).send('Usuário não encontrado')

      return reply.send(userFound)
    })

  app
    .register(auth)
    .withTypeProvider<ZodTypeProvider>()
    .patch('/profile-photo', {
      schema: {
        tags: ['Users'],
        summary: 'Update avatar url',
        body: updateProfilePhotoBodySchema,
        response: {
          200: z.null()
        }
      }
    }, async (request, reply) => {
      const { sub } = request.user
      const { profilePhotoURL } = request.body

      await prisma.user.update({
        where: {
          id: sub
        },
        data: {
          profilePhotoURL
        }
      })

      reply.send()
    })
}