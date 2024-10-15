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

async function postHelper({ path, params }: { path: string; params: CreateRecipeProps }) {
  console.log('params', params)
  return fetch(`http://127.0.0.1:7000${path}`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  })
}

async function fetcher({ path, urlParams }: { path: string; urlParams: string }) {
  const res = await fetch(`http://127.0.0.1:7000${path}${urlParams}`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  })
  return res.json()
}

type SearchProps = {
  query: string
}

export function useRecipes(params?: SearchProps) {
  const urlParams = new URLSearchParams(params).toString()
  return useSWR(['/recipes', urlParams], ([path, urlParams]) => fetcher({ path, urlParams }))
}

export function createRecipe(params: CreateRecipeProps) {
  return postHelper({ path: '/recipes', params })
}
