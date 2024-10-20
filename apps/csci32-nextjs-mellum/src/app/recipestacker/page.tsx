'use client'

import { useRecipes } from '@/hooks/useRecipes'
import RecipeHome from '@/components/Recipes/RecipeHome'
import { RecipeProvider } from '@/context/RecipeContext'

export default function Home() {
  const { data: recipes } = useRecipes()

  return (
    <RecipeProvider>
      <RecipeHome />
    </RecipeProvider>
  )
}
