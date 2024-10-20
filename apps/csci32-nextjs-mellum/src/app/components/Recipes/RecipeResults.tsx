import { RecipeContext } from '@/context/RecipeContext'
import { useContext } from 'react'
import { RecipeCard } from './RecipeCard'
import { Flex } from '@repo/ui/flex'

export function RecipeResults() {
  const { recipes } = useContext(RecipeContext)
  return (
    <Flex className="flex-wrap gap-4 w-full">
      {recipes?.map(({ name, description, ingredient_measurements, recipe_id }) => (
        <RecipeCard
          name={name}
          description={description}
          ingredient_measurements={ingredient_measurements}
          recipe_id={recipe_id}
        />
      ))}
    </Flex>
  )
}
