// const app = fastify({
const fastify = require('fastify')({ logger: true })
const PORT = process.env.PORT || 5000
require('dotenv').config()

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
    url: process.env.MONGO_URL
})
// register routes

fastify.register(require('./routes/userRoutes'))


fastify.get('/', async (request, reply) => {
    return { hello : 'Ansh' }
}
)

const start = async () => {
    try {
        await fastify.listen(PORT , '0.0.0.0')
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()