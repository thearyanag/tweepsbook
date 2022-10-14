// const app = fastify({
const fastify = require('fastify')({ logger: true })
const PORT = process.env.PORT || 5000

fastify.register(require('@fastify/swagger'), {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
      info: { title: 'Tweepsbook api' },
    },
  })

// register db connector
// fastify.register(dbConnector)
fastify.register(require("@fastify/mongodb"), {
    forceClose: true,
    url: 'mongodb://localhost:27017/tweepsbook'
})
// register routes

fastify.register(require('./routes/userRoutes'))


fastify.get('/', async (request, reply) => {
    return { hello : 'Ansh' }
}
)

const start = async () => {
    try {
        await fastify.listen(PORT)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()