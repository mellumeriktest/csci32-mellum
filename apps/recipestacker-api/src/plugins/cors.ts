import fp from 'fastify-plugin'
import cors from '@fastify/cors'

export default fp(async (fastify, opts) => {
  await fastify.register(cors, {
    origin: /\*/,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Accept', 'Content-Type', 'Authorization'],
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
  })
})
