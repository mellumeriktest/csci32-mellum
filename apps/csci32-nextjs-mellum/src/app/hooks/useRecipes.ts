import useSWR from 'swr'

export type CreateRecipeProps = {
  name: string
  ingredient_measurements: {
    ingredient_name: string
    quantity: number
    unit: string
  }[]
  description: string
}

export type UpdateRecipeProps = {
  name?: string
  ingredient_measurements?: {
    ingredient_name: string
    quantity: number
    unit: string
  }[]
  delete?: boolean
  description?: string
}

async function postHelper({ path, params }: { path: string; params: CreateRecipeProps }) {
  return fetch(`http://127.0.0.1:7000${path}`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  })
}

async function putHelper({ path, params }: { path: string; params: UpdateRecipeProps }) {
  return fetch(`http://127.0.0.1:7000${path}`, {
    method: 'PUT',
    body: JSON.stringify(params),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  })
}

async function fetcher({ path, urlParams }: { path: string; urlParams?: string }) {
  const res = await fetch(`http://127.0.0.1:7000${path}${urlParams ? `?${urlParams}` : ''}`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  })
  return res.json()
}

type SearchProps = {
  name?: string
  ingredients?: string
}

export function useRecipes(params?: SearchProps) {
  const urlParams = new URLSearchParams(params).toString()
  return useSWR(['/recipes', urlParams], ([path, urlParams]) => fetcher({ path, urlParams }))
}

export function updateRecipe({ recipe_id, params }: { recipe_id: string; params: UpdateRecipeProps }) {
  return putHelper({ path: `/recipes/${recipe_id}`, params })
}

export function getRecipe(recipe_id: string) {
  return fetcher({ path: `/recipes/${recipe_id}` })
}

export function createRecipe(params: CreateRecipeProps) {
  return postHelper({ path: '/recipes', params })
}

export function deleteRecipe(recipe_id: string) {
  return putHelper({ path: `/recipes/${recipe_id}`, params: { delete: true } })
}
