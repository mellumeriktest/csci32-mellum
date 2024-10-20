'use client'
import RecipeHome from '@/components/Recipe/RecipeHome'
import { RecipeProvider } from '@/context/RecipeContext'

export default function Home() {
  return (
    <RecipeProvider>
      <RecipeHome />
    </RecipeProvider>
  )
}
