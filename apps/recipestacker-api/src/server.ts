import Fastify, { FastifyInstance } from 'fastify'

export function createServer(): FastifyInstance {
  const fastify = Fastify({
    logger: {
      transport:
        process.env.NODE_ENV === 'development'
          ? {
              target: 'pino-pretty',
              options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
              },
            }
          : undefined,
    },
    // ajv: getAjvConfig() // from KM
    // querystringParser: (str: any) => qs.parse(str),
    // ignoreTrailingSlash: true,
  })

  // .withTypeProvider<TypeBoxTypeProvider>()
  //   void fastify.register(AutoLoad, {
  //   dir: path.join(__dirname, 'plugins'),
  //   options: opts,
  //   forceESM: true,
  // })

  // This loads all plugins defined in routes
  // define your routes in one of these

  // fastify.register(/* autoloads */)
  // fastify.register(/* autoloads */)
  // fastify.register(helmet, { global: true, hsts: { maxAge: 31536000 }})
  // fastify.register(disableCache)
  return fastify
}
