import { Input } from '@repo/ui/input'
import { useContext } from 'react'
import { Header } from '@repo/ui/header'
import { Field } from '@repo/ui/field'
import { Label } from '@repo/ui/label'
import { Flex } from '@repo/ui/flex'
import { IngredientList } from './IngredientList'
import { RecipeContext } from '@/context/RecipeContext'

export default function Search() {
  const { ingredientQuery, ingredients, setIngredients, setIngredientQuery, setRecipeNameQuery } =
    useContext(RecipeContext)
  return (
    <>
      <Header variant="h2">Search Recipes</Header>
      <Flex className="space-between gap-2 flex-wrap">
        <Field className="w-full">
          <Label htmlFor="search-recipe">Ingredients</Label>
          <Input
            className="w-full"
            onChange={setIngredientQuery}
            onEnter={(newIngredient) => {
              setIngredients([...ingredients, newIngredient])
              setIngredientQuery('')
            }}
            value={ingredientQuery}
            name={'Search ingredients'}
            id="search-ingredients"
            placeholder="Add an ingredient to search for recipes"
          />
        </Field>
        <IngredientList />
        <Field className="w-full">
          <Label htmlFor="search-recipe">Recipe name</Label>
          <Input
            className="w-full"
            onEnter={(value) => {
              console.log('WAT', value)
              setRecipeNameQuery(value)
            }}
            name={'Search recipe'}
            id="search-recipe"
            placeholder="Search a recipe by name"
          />
        </Field>
      </Flex>
    </>
  )
}
