import Fastify from 'fastify'

const app = Fastify()

app.get('/', async (request, reply) => {
  return { message: 'hello world!!' }
})

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