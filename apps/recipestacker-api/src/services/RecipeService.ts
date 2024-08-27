import { Prisma, PrismaClient } from '@prisma/client'
import { prisma } from '@repo/recipestacker-database'
import { FastifyBaseLogger } from 'fastify'

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export const DEFAULT_TAKE = 15
export const DEFAULT_SKIP = 15

interface RecipeProps {
  logger: FastifyBaseLogger
}

interface FindOneRecipeProps {
  recipe_id: string
}

interface FindManyRecipeProps {
  name: string
  sortColumn?: string
  sortOrder?: SortOrder
  take?: number
  skip?: number
}

interface UpdateOneRecipeProps {
  recipe_id: string
  name: string
  description: string
  user_id: string
  ingredients: {
    ingredient_id: string
  }[]
}

interface CreateOneRecipeProps {
  name: string
  description: string
  user_id: string
  ingredients: {
    ingredient_id: string
  }[]
}

interface GetRecipeOrderByProps {
  sortColumn: string
  sortOrder: SortOrder
}

export class RecipeService {
  logger: FastifyBaseLogger

  constructor({ logger }: RecipeProps) {
    this.logger = logger
  }

  getRecipeOrderBy({ sortColumn, sortOrder }: GetRecipeOrderByProps): Prisma.RecipeOrderByWithRelationInput {
    return {
      [sortColumn]: sortOrder,
    }
  }

  findOneRecipe(props: FindOneRecipeProps) {
    this.logger.info({ props }, 'findOneRecipe')
    const { recipe_id } = props
    return prisma.recipe.findFirst({
      where: {
        recipe_id,
      },
    })
  }

  updateOneRecipe(props: UpdateOneRecipeProps) {
    this.logger.info({ props }, 'updateOneRecipe')
    const { recipe_id } = props
    const { ingredients, user_id, ...rest } = props
    return prisma.recipe.update({
      where: {
        recipe_id,
      },
      data: {
        ...rest,
        user: {
          connect: { user_id },
        },
        ingredients: {
          connect: ingredients,
        },
      },
    })
  }

  findManyRecipes(props: FindManyRecipeProps) {
    this.logger.info({ props }, 'findManyRecipes')
    const { name, sortColumn = 'name', sortOrder = SortOrder.ASC, take = DEFAULT_TAKE, skip = DEFAULT_SKIP } = props
    const orderBy = this.getRecipeOrderBy({ sortColumn, sortOrder })
    return prisma.recipe.findMany({
      where: {
        name,
      },
      orderBy,
      take,
      skip,
    })
  }

  createOneRecipe(props: CreateOneRecipeProps) {
    this.logger.info({ props }, 'createOneRecipe')
    const { ingredients, user_id, ...rest } = props
    return prisma.recipe.create({
      data: {
        ...rest,
        user: {
          connect: { user_id },
        },
        ingredients: {
          connect: ingredients,
        },
      },
    })
  }
}
