import { FastifyPluginAsync } from 'fastify'

const getRecipeSchema = {
  querystring: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      sortColumn: { type: 'string' },
      sortOrder: { type: 'string' },
      take: { type: 'number' },
      skip: { type: 'number' },
    },
  },
}

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    return { root: true }
  })

  // fastify.get('/recipes', async function (request: any, reply) {
  //   return fastify.recipeService.findManyRecipes({
  //     name: request.query.name,
  //     sortColumn: request.query.sortColumn,
  //     sortOrder: request.query.sortOrder,
  //     take: request.query.take,
  //     skip: request.query.skip,
  //   })
  // })

  // fastify.get('/recipes/:id', async function (request: any, reply) {
  //   return fastify.recipeService.findOneRecipe({
  //     recipe_id: request.params.id,
  //   })
  // })

  // fastify.post('/recipes', async function (request: any, reply) {
  //   return fastify.recipeService.createOneRecipe({
  //     name: request.body.name,
  //     description: request.body.description,
  //     user_id: request.body.user_id,
  //     ingredients: request.body.ingredients,
  //   })
  // })

  // fastify.put('/recipes/:id', async function (request: any, reply) {
  //   return fastify.recipeService.updateOneRecipe({
  //     recipe_id: request.params.id,
  //     name: request.body.name,
  //     description: request.body.description,
  //     user_id: request.body.user_id,
  //     ingredients: request.body.ingredients,
  //   })
  // })
}

export default root
