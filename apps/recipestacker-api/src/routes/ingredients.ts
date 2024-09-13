import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { Type } from '@sinclair/typebox'
import { FastifyPluginAsync } from 'fastify'
import { RecipeNotFoundType } from './recipes.js'

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

const IngredientType = Type.Object({
  ingredient_id: Type.String(),
  name: Type.Union([Type.String(), Type.Null()]),
  description: Type.Union([Type.String(), Type.Null()]),
})

export const CreateRecipeTypeBoxType = Type.Object({
  recipe_id: Type.String(),
  name: Type.String(),
  description: Type.String(),
  ingredient_ids: Type.Array(Type.String()),
  user_id: Type.String(),
})

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  // fastify.withTypeProvider<TypeBoxTypeProvider>().get(
  //   '/recipes',
  //   {
  //     schema: {
  //       tags: ['recipes'],
  //       description: 'Get all recipes',
  //       response: {
  //         200: Type.Array(IngredientType),
  //         404: RecipeNotFoundType,
  //       },
  //     },
  //   },
  //   async function (request: any, reply) {
  //     const recipes = await fastify.recipeService.findManyRecipes({
  //       name: request.query.name,
  //       sortColumn: request.query.sortColumn,
  //       sortOrder: request.query.sortOrder,
  //       take: request.query.take,
  //       skip: request.query.skip,
  //     })
  //     if (recipes) {
  //       return reply.send(recipes)
  //     } else {
  //       return reply.notFound()
  //     }
  //   },
  // )
  // fastify.get('/recipes/:id', async function (request: any, reply) {
  //   return fastify.recipeService.findOneRecipe({
  //     recipe_id: request.params.id,
  //   })
  // })
  // fastify.withTypeProvider<TypeBoxTypeProvider>().post(
  //   '/recipes',
  //   {
  //     schema: {
  //       tags: ['Endpoint: Create a recipe'],
  //       description: 'End to create a recipe',
  //       body: CreateRecipeTypeBoxType,
  //       response: {
  //         200: Type.Object({ recipe_id: Type.String() }),
  //         400: Type.Object({ message: Type.String() }),
  //       },
  //     },
  //   },
  //   async function (request, reply) {
  //     return fastify.recipeService.createOneRecipe({
  //       name: request.body.name,
  //       description: request.body.description,
  //       user_id: request.body.user_id,
  //       ingredient_ids: request.body.ingredient_ids,
  //     })
  //   },
  // )
  // fastify.put('/recipes/:id', async function (request: any, reply) {
  //   return fastify.recipeService.updateOneRecipe({
  //     recipe_id: request.params.id,
  //     name: request.body.name,
  //     description: request.body.description,
  //     user_id: request.body.user_id,
  //     ingredient_ids: request.body.ingredient_ids,
  //   })
  // })
}

export default root
