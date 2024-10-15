import { Button } from '@repo/ui/button'
import Input from '@repo/ui/input'
import { Variant } from '@repo/ui/variant'
import { useState } from 'react'
import { createRecipe, CreateRecipeProps } from '../hooks/useRecipes'

export function CreateRecipe() {
  const [ingredients, setIngredients] = useState([
    {
      name: 'Salt',
      unit: 'Tsp',
      quantity: 0,
    },
  ])
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)

    const recipeName = data.get('recipe-name')
    const recipeDescription = data.get('recipe-description')
    const ingredient_measurements = []
    for (const key of data.keys()) {
      if (key.includes('ingredient-name')) {
        const ingredient_name = data.get(key) as string
        const unit = data.get(key.replace('name', 'unit')) as string
        const quantity = Number(data.get(key.replace('name', 'quantity'))) as number
        if (!ingredient_name || !unit || !quantity) {
          return
        }
        ingredient_measurements.push({
          ingredient_name,
          unit,
          quantity,
        })
      }
    }
    if (typeof recipeName !== 'string' || typeof recipeDescription !== 'string') {
      return
    }
    if (ingredient_measurements.length === 0) {
      return
    }
    const recipe: CreateRecipeProps = {
      name: recipeName,
      description: recipeDescription,
      ingredient_measurements,
    }
    console.log('recipe', recipe)
    createRecipe(recipe)
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 m-8 ">
        <div className="flex flex-col gap-2 mb-2">
          <div className="flex w-full flex-col gap-2">
            <h2 className="text-lg font-bold">Recipe Name</h2>
            <Input name="recipe-name" id="recipe-name" placeholder="Recipe name" />
          </div>
          <div className="flex w-full flex-col gap-2">
            <h2 className="text-lg font-bold">Recipe Description</h2>
            <Input name="recipe-description" id="recipe-description" placeholder="Recipe description" />
          </div>
        </div>
        {ingredients.map(({ name, unit, quantity }, index) => (
          <div
            className="flex flex-col gap-4 flex-wrap ml-4 p-4 bg-gray-100 shadow-sm rounded-lg"
            key={`ingredient-${index}`}
          >
            <div className="flex justify-between">
              <h3 className="text-lg font-bold">Ingredient {index + 1}</h3>
              <Button
                type="button"
                variant={Variant.SECONDARY}
                onClick={() => setIngredients(ingredients.filter((_, i) => i !== index))}
              >
                Remove
              </Button>
            </div>
            <Input
              name={`ingredient-name-${index}`}
              id={`ingredient-name-${index}`}
              placeholder="Recipe ingredient name"
            />
            <Input
              name={`ingredient-quantity-${index}`}
              id={`ingredient-quantity-${index}`}
              type="number"
              placeholder="Recipe ingredient quantity"
            />
            <Input
              name={`ingredient-unit-${index}`}
              id={`ingredient-unit-${index}`}
              placeholder="Recipe ingredient unit"
            />
          </div>
        ))}
        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            onClick={() =>
              setIngredients([
                ...ingredients,
                {
                  name: '',
                  unit: '',
                  quantity: 0,
                },
              ])
            }
          >
            Add Another Ingredient
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </>
  )
}
