import { Ingredient, Prisma, PrismaClient, Recipe, User } from '@prisma/client'
export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export const DEFAULT_TAKE = 15
export const DEFAULT_SKIP = 15

interface RecipeProps {
  prisma: PrismaClient
}

interface FindOneRecipeProps {
  recipeId: string
}

interface FindManyRecipeProps {
  name: string
  sortColumn?: string
  sortOrder?: SortOrder
  take?: number
  skip?: number
}

interface CreateRecipeProps {
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
  prisma: PrismaClient
  constructor({ prisma }: RecipeProps) {
    this.prisma = prisma
  }
  getRecipeOrderBy({ sortColumn, sortOrder }: GetRecipeOrderByProps): Prisma.RecipeOrderByWithRelationInput {
    return {
      [sortColumn]: sortOrder,
    }
  }

  findOneRecipe({ recipeId }: FindOneRecipeProps) {
    return this.prisma.recipe.findFirst({
      where: {
        recipe_id: recipeId,
      },
    })
  }

  findManyRecipes({
    name,
    sortColumn = 'name',
    sortOrder = SortOrder.ASC,
    take = DEFAULT_TAKE,
    skip = DEFAULT_SKIP,
  }: FindManyRecipeProps) {
    const orderBy = this.getRecipeOrderBy({ sortColumn, sortOrder })
    return this.prisma.recipe.findMany({
      where: {
        name,
      },
      orderBy,
      take,
      skip,
    })
  }

  createRecipe({ ingredients, user_id, ...props }: CreateRecipeProps) {
    return this.prisma.recipe.create({
      data: {
        ...props,
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
