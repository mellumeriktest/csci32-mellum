import { IngredientMeasurement, RecipeContext } from '@/context/RecipeContext'
import { deleteRecipe, getRecipe } from '@/hooks/useRecipes'
import { Button } from '@repo/ui/button'
import { Flex } from '@repo/ui/flex'
import { Header } from '@repo/ui/header'
import { Size } from '@repo/ui/size'
import { Variant } from '@repo/ui/variant'
import { useContext } from 'react'

export type RecipeCardProps = {
  recipe_id: string
  name: string | null
  description: string | null
  ingredient_measurements: IngredientMeasurement[] | null
}

export function RecipeCard({ name, description, ingredient_measurements, recipe_id }: RecipeCardProps) {
  const { mutate, setShowRecipeForm, setRecipeId, setRecipe } = useContext(RecipeContext)
  return (
    <div className=" shadow-md basis-1/4 flex-grow border-2 border-solid border-violet-600 rounded-md overflow-hidden bg-violet-100 min-w-96">
      <Flex className="justify-between bg-violet-200 w-full p-4 gap-2 flex-wrap">
        <Header className="" variant="h6">
          {name}
        </Header>
        <Flex className="gap-2">
          <Button
            className="bg-violet-200"
            variant={Variant.SECONDARY}
            size={Size.XSMALL}
            onClick={async () => {
              const newRecipe = await getRecipe(recipe_id)
              setRecipeId(recipe_id)
              setRecipe(newRecipe)
              setShowRecipeForm(true)
            }}
          >
            Update
          </Button>
          <Button
            className="bg-violet-200"
            variant={Variant.SECONDARY}
            size={Size.XSMALL}
            onClick={async () => {
              await deleteRecipe(recipe_id)
              mutate()
            }}
          >
            Delete
          </Button>
        </Flex>
      </Flex>
      <div className="bg-violet-100 w-full p-4 flex flex-col gap-4">
        <p>{description}</p>
        <ul className="ml-2 bg-violet-300 rounded-md flex flex-col gap-2 p-4">
          {ingredient_measurements?.map(({ ingredient, quantity, unit }) => (
            <li key={ingredient.name} className="w-full">
              <span>
                {quantity} {unit} {ingredient.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
