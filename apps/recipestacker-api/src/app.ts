import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload'
// import Fastify, { FastifyPluginAsync } from 'fastify'
// import { swagger } from './swagger'

import * as path from 'path'
import { fileURLToPath } from 'url'
import { createServer } from './server.js'
import { swagger } from './swagger.js'

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>

const options: AppOptions = {
  options: {},
}

const fastify = createServer()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

void fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'plugins'),
  options,
  forceESM: true,
})

// This loads all plugins defined in routes
// define your routes in one of these
void fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'routes'),
  options,
  forceESM: true,
})

async function start() {
  try {
    await fastify.listen({
      host: '127.0.0.1',
      port: process.env.PORT ? Number(process.env.PORT) : 7000,
    })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()

// const app: FastifyPluginAsync<AppOptions> = async (fastify, opts): Promise<void> => {
//   // Place here your custom code!

//   // Do not touch the following lines

//   // This loads all plugins defined in plugins
//   // those should be support plugins that are reused
//   // through your application
//   void fastify.register(AutoLoad, {
//     dir: path.join(__dirname, 'plugins'),
//     options: opts,
//     forceESM: true,
//   })

//   // This loads all plugins defined in routes
//   // define your routes in one of these
//   void fastify.register(AutoLoad, {
//     dir: path.join(__dirname, 'routes'),
//     options: opts,
//     forceESM: true,
//   })
//   await swagger({ fastify })
// }

// export default app
// export { app, options }
