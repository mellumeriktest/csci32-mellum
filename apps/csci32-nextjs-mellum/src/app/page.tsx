'use client'
import Image from 'next/image'
import { add } from '@repo/math/add'
import { SWRConfig } from 'swr'
import { useRecipes } from './hooks/useRecipes'
import { CreateRecipe } from './components/CreateRecipe'

export default function Home() {
  const { data: recipes } = useRecipes()
  console.log(recipes)
  return (
    <div>
      <CreateRecipe />
    </div>
  )
}
