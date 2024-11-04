import { Field } from '@repo/ui/field'
import { Flex } from '@repo/ui/flex'
import { Header } from '@repo/ui/header'
import { Input } from '@repo/ui/input'
import { Label } from '@repo/ui/label'
import { IngredientList } from './IngredientList'
import { RecipeContext } from '@/context/RecipeContext'
import { useContext } from 'react'

export default function RecipeSearch() {
  const { setIngredients, setRecipeNameQuery, ingredients } = useContext(RecipeContext)
  return (
    <>
      <Header className="justify-between">Search Recipes</Header>
      <Flex className="flex-col gap-y-2">
        <Field>
          <Label>Ingredients</Label>
          <Input
            name="ingredient-search"
            id="ingredient-search"
            onEnter={(newIngredient) => {
              setIngredients([...ingredients, newIngredient])
            }}
          />
        </Field>
        <IngredientList />
        <Field>
          <Label>Recipe name</Label>
          <Input
            name="recipe-name-search"
            id="recipe-name-search"
            onEnter={(recipeNameQuery) => setRecipeNameQuery(recipeNameQuery)}
          />
        </Field>
      </Flex>
    </>
  )
}
