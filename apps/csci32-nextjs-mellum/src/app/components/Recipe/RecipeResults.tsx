import { RecipeContext } from '@/context/RecipeContext'
import { Flex } from '@repo/ui/flex'
import { useContext } from 'react'
import RecipeCard from './RecipeCard'

export default function RecipeResults() {
  const { recipes } = useContext(RecipeContext)
  return (
    <Flex className="gap-4 flex-wrap ">
      {recipes?.map(({ recipe_id, name, description, ingredient_measurements }) => (
        <RecipeCard
          key={recipe_id}
          recipe_id={recipe_id}
          description={description}
          ingredient_measurements={ingredient_measurements}
          name={name}
        />
      ))}
    </Flex>
  )
}
