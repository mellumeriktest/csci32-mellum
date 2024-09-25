import useSWR from 'swr'

const postHelper = (params: any) => (url: any) =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(params),
  })

async function fetcher({ url, urlParams }: { url: string; urlParams: string }) {
  const res = await fetch(`http://127.0.0.1:7000${url}${urlParams}`)
  return res.json()
}

type SearchProps = {
  query: string
}

export function useRecipes(params?: SearchProps) {
  const urlParams = new URLSearchParams(params).toString()
  return useSWR(['/recipes', urlParams], ([url, urlParams]) => fetcher({ url, urlParams }))
}
