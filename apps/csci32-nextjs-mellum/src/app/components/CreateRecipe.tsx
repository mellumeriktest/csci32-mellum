import { Button } from '@repo/ui/button'
import Input from '@repo/ui/input'
import { useState } from 'react'

export function CreateRecipe() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
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
    const ingredients = []
    for (const key of data.keys()) {
      if (key.includes('ingredient')) {
        // ingredients.push({
        //   name:
        // })
      }
    }
    c
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input name="recipe-name" id="recipe-name" placeholder="Recipe name" onChange={setName} />
        <Input
          name="recipe-description"
          id="recipe-description"
          placeholder="Recipe description"
          onChange={setDescription}
        />
        {ingredients.map(({ name, unit, quantity }, index) => (
          <div className="flex flex-col gap-4 flex-wrap">
            <Input
              name={`ingredient-name-${index}`}
              id={`ingredient-name-${index}`}
              value={name}
              // onChange={(newIngredientName) => {
              //   // update one of the ingredients
              //   ingredients[index] = { ...ingredients[index], name: newIngredientName }
              //   // update the ingredients array
              //   const newIngredients = [...ingredients]
              //   // rerender by calling setIngredients
              //   setIngredients(newIngredients)
              // }}
              placeholder="Recipe ingredient name"
            />
            <Input
              name={`ingredient-unit-${index}`}
              id={`ingredient-unit-${index}`}
              value={unit}
              // onChange={(newIngredientUnit) => {
              //   // update one of the ingredients
              //   ingredients[index] = { ...ingredients[index], unit: newIngredientUnit }
              //   // update the ingredients array
              //   const newIngredients = [...ingredients]
              //   // rerender by calling setIngredients
              //   setIngredients(newIngredients)
              // }}
              placeholder="Recipe ingredient unit"
            />
            <Input
              name={`ingredient-quantity-${index}`}
              id={`ingredient-quantity-${index}`}
              value={quantity}
              // onChange={(newIngredientQuantity) => {
              //   // update one of the ingredients
              //   ingredients[index] = { ...ingredients[index], quantity: newIngredientQuantity }
              //   // update the ingredients array
              //   const newIngredients = [...ingredients]
              //   // rerender by calling setIngredients
              //   setIngredients(newIngredients)
              // }}
              placeholder="Recipe ingredient quantity"
            />
          </div>
        ))}
        <Button
          onClick={() =>
            ingredients.push({
              name: '',
              unit: '',
              quantity: 0,
            })
          }
        >
          Add Another Ingredient
        </Button>
      </form>
    </>
  )
}
