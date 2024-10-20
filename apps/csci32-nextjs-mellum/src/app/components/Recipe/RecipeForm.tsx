import { RecipeContext } from '@/context/RecipeContext'
import { CreateRecipeProps, createRecipe } from '@/hooks/useRecipes'
import { Button } from '@repo/ui/button'
import { Field } from '@repo/ui/field'
import { FieldGroup } from '@repo/ui/fieldGroup'
import { Flex } from '@repo/ui/flex'
import { Header } from '@repo/ui/header'
import { Input } from '@repo/ui/input'
import { Label } from '@repo/ui/label'
import { Variant } from '@repo/ui/variant'
import { useContext, useState } from 'react'

export function RecipeForm() {
  const { setShowRecipeForm } = useContext(RecipeContext)
  const [recipeFormData, setRecipeFormData] = useState({ name: '', description: '' })
  const [ingredientMeasurements, setIngredientMeasurements] = useState([
    {
      ingredient: {
        name: '',
        description: '',
      },
      unit: '',
      quantity: '',
    },
  ])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)

    const recipeName = data.get('recipe-name') as string
    const recipeDescription = data.get('recipe-description') as string
    const ingredient_measurements = []
    for (const key of data.keys()) {
      if (key.includes('ingredient-name')) {
        const ingredient_name = data.get(key) as string
        const unit = data.get(key.replace('ingredient-name', 'ingredient-unit')) as string
        const quantity = Number(data.get(key.replace('ingredient-name', 'ingredient-quantity')))
        if (!ingredient_name || !unit || !quantity) {
          continue
        }
        ingredient_measurements.push({
          ingredient_name,
          unit,
          quantity,
        })
      }
    }
    if (typeof recipeName !== 'string' || typeof recipeDescription !== 'string') {
      return alert('Please fill out all fields')
    }
    if (ingredient_measurements.length === 0) {
      return alert('Please add at least one ingredient')
    }
    const recipeData: CreateRecipeProps = {
      name: recipeName,
      description: recipeDescription,
      ingredient_measurements,
    }
    await createRecipe(recipeData)
    setRecipeFormData({ name: '', description: '' })
    setShowRecipeForm(false)
    alert(`Your recipe ${recipeName} has been created!`)
  }

  return (
    <>
      <Header variant="h2">Create Recipes</Header>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <FieldGroup>
          <Field>
            <Label htmlFor="recipe-name">Recipe name</Label>
            <Input
              name="recipe-name"
              id="recipe-name"
              placeholder="Enter a recipe name"
              value={recipeFormData.name}
              onChange={(newName) => {
                setRecipeFormData({ ...recipeFormData, name: newName })
              }}
            />
          </Field>
          <Field>
            <Label htmlFor="recipe-description">Recipe description</Label>
            <Input
              name="recipe-description"
              id="recipe-description"
              placeholder="Enter a recipe description"
              value={recipeFormData.description}
              onChange={(newDescription) => {
                setRecipeFormData({ ...recipeFormData, description: newDescription })
              }}
            />
          </Field>
        </FieldGroup>
        {ingredientMeasurements.map(({ unit, quantity, ingredient }, index) => {
          return (
            <FieldGroup className="ml-4 bg-gray-100 shadow-sm rounded-lg p-4">
              <Flex>
                <Label>Ingredient {index + 1}</Label>
                {ingredientMeasurements.length > 1 && (
                  <Button
                    variant={Variant.SECONDARY}
                    onClick={() => {
                      const newIngredientMeasurements = ingredientMeasurements.filter((item, idx) => index !== idx)
                      setIngredientMeasurements(newIngredientMeasurements)
                    }}
                  >
                    Remove
                  </Button>
                )}
              </Flex>
              <Input
                name={`ingredient-name-${index}`}
                id={`ingredient-name-${index}`}
                variant={Variant.SECONDARY}
                value={ingredient.name}
                onChange={(newIngredientName) => {
                  const newIngredientMeasurements = [
                    // take the ingredients before the current index
                    ...ingredientMeasurements.slice(0, index),
                    // update the ingredient at the current index
                    {
                      ...ingredientMeasurements[index],
                      ingredient: {
                        ...ingredientMeasurements[index].ingredient,
                        name: newIngredientName,
                      },
                    },
                    // take the ingredients after the current index
                    ...ingredientMeasurements.slice(index + 1),
                  ]
                  setIngredientMeasurements(newIngredientMeasurements)
                }}
                placeholder="Enter an ingredient name"
              />
              <Input
                name={`ingredient-quantity-${index}`}
                id={`ingredient-quantity-${index}`}
                variant={Variant.SECONDARY}
                value={quantity}
                onChange={(newQuantity) => {
                  const newIngredientMeasurements = [
                    // take the ingredients before the current index
                    ...ingredientMeasurements.slice(0, index),
                    // update the ingredient at the current index
                    {
                      ...ingredientMeasurements[index],
                      quantity: newQuantity,
                    },
                    // take the ingredients after the current index
                    ...ingredientMeasurements.slice(index + 1),
                  ]
                  setIngredientMeasurements(newIngredientMeasurements)
                }}
                placeholder="Enter an ingredient quantity"
              />
              <Input
                name={`ingredient-unit-${index}`}
                id={`ingredient-unit-${index}`}
                variant={Variant.SECONDARY}
                value={unit}
                onChange={(newUnit) => {
                  const newIngredientMeasurements = [
                    // take the ingredients before the current index
                    ...ingredientMeasurements.slice(0, index),
                    // update the ingredient at the current index
                    {
                      ...ingredientMeasurements[index],
                      unit: newUnit,
                    },
                    // take the ingredients after the current index
                    ...ingredientMeasurements.slice(index + 1),
                  ]
                  setIngredientMeasurements(newIngredientMeasurements)
                }}
                placeholder="Enter an ingredient unit"
              />
            </FieldGroup>
          )
        })}
        <Flex className="justify-end gap-4">
          <Button
            onClick={() => {
              setIngredientMeasurements([
                ...ingredientMeasurements,
                {
                  ingredient: {
                    name: '',
                    description: '',
                  },
                  unit: '',
                  quantity: '',
                },
              ])
            }}
          >
            Add another ingredient
          </Button>
          <Button type="submit">Submit</Button>
        </Flex>
      </form>
    </>
  )
}
