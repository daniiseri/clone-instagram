import fastify from 'fastify'
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import websocket from '@fastify/websocket'
import fastifyCors from '@fastify/cors'
import fastifyJWT from '@fastify/jwt'
import fastifyStatic from '@fastify/static'
import { routes } from './routes';
import path from 'node:path';

const app = fastify()
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Clone instagram',
      description: 'Full-stack clone instagram project',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      }
    }
  },
  transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs'
})

app.register(fastifyJWT, {
  secret: 'supersecret',
})

const APP_URL = process.env.APP_URL ? JSON.parse(process.env.APP_URL) : 'http://localhost:3000'

app.register(fastifyCors, {
  origin: APP_URL
})

app.register(fastifyStatic, {
  root: path.join(__dirname, '../public'),
})
app.register(routes)
app.register(websocket)
app.register(async function (fastify) {
  fastify.get('/', { websocket: true, schema: { tags: ['websocket'] } }, (socket, req) => {

  })
})

const PORT = Number(process.env.PORT) || 3000

app.listen({
  host: '0.0.0.0',
  port: PORT
}).then(() => console.log('Server is running'))