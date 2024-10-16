import { Flex } from '@repo/ui/flex'
import { Tag } from '@repo/ui/tag'
import { useContext } from 'react'
import { RecipeContext } from '@/context/RecipeContext'

export function IngredientList() {
  const { ingredients, removeIngredient } = useContext(RecipeContext)

  return (
    <Flex className="gap-4">
      {ingredients.map((ingredient) => (
        <Tag key={ingredient} onClickX={() => removeIngredient(ingredient)}>
          {ingredient}
        </Tag>
      ))}
    </Flex>
  )
}
