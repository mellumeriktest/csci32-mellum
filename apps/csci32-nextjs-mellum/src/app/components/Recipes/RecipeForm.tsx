import { Button } from '@repo/ui/button'
import { Input } from '@repo/ui/input'
import { Field } from '@repo/ui/field'
import { FieldGroup } from '@repo/ui/fieldGroup'
import { Flex } from '@repo/ui/flex'
import { Label } from '@repo/ui/label'
import { Variant } from '@repo/ui/variant'
import { useContext, useState } from 'react'
import { createRecipe, CreateRecipeProps, updateRecipe } from '../../hooks/useRecipes'
import { Header } from '@repo/ui/header'
import { RecipeContext } from '@/context/RecipeContext'

export function RecipeForm() {
  const { recipe, recipeId, setShowRecipeForm, mutate, clearForm } = useContext(RecipeContext)
  const [recipeFormData, setRecipeFormData] = useState(recipe || { name: '', description: '' })
  const [ingredients, setIngredients] = useState(
    recipe?.ingredient_measurements || [
      {
        ingredient: {
          name: '',
          description: '',
        },
        unit: '',
        quantity: '',
      },
    ],
  )
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
          ingredient_id: recipe?.ingredient_measurements.find(
            (ingredient) => ingredient.ingredient.name === ingredient_name,
          )?.ingredient.ingredient_id,
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
    const recipeData: CreateRecipeProps = {
      name: recipeName,
      description: recipeDescription,
      ingredient_measurements,
    }
    if (recipeId) {
      await updateRecipe({ recipe_id: recipeId, params: recipeData })
    } else {
      await createRecipe(recipeData)
    }
    setRecipeFormData({ name: '', description: '' })
    clearForm()
    mutate()
    setShowRecipeForm(false)
  }
  return (
    <>
      <Header variant="h2">Create Recipes</Header>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <FieldGroup>
          <Field>
            <Label htmlFor="recipe-name">Recipe Name</Label>
            <Input
              name="recipe-name"
              id="recipe-name"
              placeholder="Recipe name"
              value={recipeFormData.name}
              onChange={(value) => {
                setRecipeFormData({ ...recipeFormData, name: value })
              }}
            />
          </Field>
          <Field>
            <Label htmlFor="recipe-name">Recipe Description</Label>
            <Input
              name="recipe-description"
              id="recipe-description"
              placeholder="Recipe description"
              value={recipeFormData.description}
              onChange={(value) => {
                setRecipeFormData({ ...recipeFormData, description: value })
              }}
            />
          </Field>
        </FieldGroup>
        {ingredients.map(({ ingredient, unit, quantity }, index) => (
          <FieldGroup className="ml-4 p-4 bg-gray-100 shadow-sm rounded-lg" key={`ingredient-${index}`}>
            <Flex className="justify-between mb-2">
              <Label>Ingredient {index + 1}</Label>
              {(index > 0 || ingredients.length > 1) && (
                <Button
                  type="button"
                  variant={Variant.SECONDARY}
                  onClick={() => setIngredients(ingredients.filter((_, i) => i !== index))}
                >
                  Remove
                </Button>
              )}
            </Flex>
            <Input
              variant={Variant.SECONDARY}
              name={`ingredient-name-${index}`}
              id={`ingredient-name-${index}`}
              placeholder="Ingredient name"
              value={ingredient.name}
              onChange={(value) => {
                setIngredients([
                  ...ingredients.slice(0, index),
                  {
                    ...ingredients[index],
                    ingredient: {
                      ...ingredients[index].ingredient,
                      name: value,
                    },
                  },
                  ...ingredients.slice(index + 1),
                ])
              }}
            />
            <Input
              name={`ingredient-quantity-${index}`}
              variant={Variant.SECONDARY}
              id={`ingredient-quantity-${index}`}
              placeholder="Ingredient quantity"
              value={quantity.toString()}
              onChange={(value) => {
                setIngredients([
                  ...ingredients.slice(0, index),
                  {
                    ...ingredients[index],
                    quantity: value,
                  },
                  ...ingredients.slice(index + 1),
                ])
              }}
            />
            <Input
              name={`ingredient-unit-${index}`}
              variant={Variant.SECONDARY}
              id={`ingredient-unit-${index}`}
              placeholder="Ingredient unit"
              value={unit}
              onChange={(value) => {
                setIngredients([
                  ...ingredients.slice(0, index),
                  {
                    ...ingredients[index],
                    unit: value,
                  },
                  ...ingredients.slice(index + 1),
                ])
              }}
            />
          </FieldGroup>
        ))}
        <Flex className="gap-4 justify-end">
          <Button
            type="button"
            onClick={() =>
              setIngredients([
                ...ingredients,
                {
                  ingredient: {
                    name: '',
                    description: '',
                  },
                  unit: '',
                  quantity: '',
                },
              ])
            }
          >
            Add Another Ingredient
          </Button>
          <Button type="submit">Submit</Button>
        </Flex>
      </form>
    </>
  )
}
