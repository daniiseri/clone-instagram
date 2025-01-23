import { FastifyInstance } from "fastify";
import fastifyMultipart from '@fastify/multipart'
import { auth } from "../plugins/auth";
import { pipeline } from 'node:stream/promises'
import fs from 'node:fs'
import { join } from "node:path";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";

const uploadResponseSchema = z.object({
  url: z.string()
})

export async function uploadRoutes(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .register(fastifyMultipart)
    .post('/uploads',
      {
        schema: {
          tags: ['Upload'],
          summary: 'Uploads',
          response: {
            400: z.string(),
            200: uploadResponseSchema
          }
        }
      },
      async (request, reply) => {
        const { sub } = request.user

        const data = await request.file()

        if (!data)
          return reply.status(400).send('Invalid data type')

        const path = join(__dirname, `../../public/uploads/${sub}`)

        if (!fs.existsSync(path))
          fs.mkdirSync(path, { recursive: true })

        const url = join(path, `/${data.filename}`)

        await pipeline(data.file, fs.createWriteStream(url))

        await prisma.photo.create({
          data: {
            userId: sub,
            url: process.env.STORAGE_URL + url.split('public')[1].replace(/\\/g, '/')
          }
        })

        reply.send({
          url: process.env.STORAGE_URL + url.split('public')[1].replace(/\\/g, '/')
        })
      })
}