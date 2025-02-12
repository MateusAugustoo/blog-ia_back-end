import Fastify from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { ZodTypeProvider, validatorCompiler, serializerCompiler, jsonSchemaTransform } from 'fastify-type-provider-zod'
import { topicRoute } from './routes/topicRoute'

const app = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, { origin: '*' })

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Blog API',
      version: '1.0.0',
    }
  },
  transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.get('/', async (request, reply) => {
  return { message: 'hello world!!' }
})

app.register(topicRoute)

const start = async () => {
  try {
    await app.listen({port: 3333})
    console.log('server running on port 3333')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()