import { createContext, useState, ReactNode, Provider } from 'react'
import { deleteRecipe, useRecipes } from '../hooks/useRecipes'
import { Recipe } from '@prisma/client'

export type IngredientMeasurement = {
  ingredient: {
    ingredient_id?: string
    name: string
    description: string
  }
  unit: string
  quantity: string
}
export type RecipeType = {
  recipe_id: string
  name: string
  description: string
  ingredient_measurements: IngredientMeasurement[]
}

export type RecipeContextType = {
  recipes: RecipeType[]
  recipeNameQuery: string
  setRecipeNameQuery: (query: string) => void
  ingredients: string[]
  ingredientQuery: string
  setIngredients: (ingredients: string[]) => void
  setIngredientQuery: (query: string) => void
  removeIngredient: (index: string) => void
  showRecipeForm: boolean
  setShowRecipeForm: (showRecipeForm: boolean) => void
  mutate: () => void
  recipeId: string | null
  setRecipeId: (id: string | null) => void
  recipe: RecipeType | null
  setRecipe: (recipe: RecipeType | null) => void
  clearForm: () => void
}

const RecipeContext = createContext<RecipeContextType>({
  recipes: [],
  recipeNameQuery: '',
  setRecipeNameQuery: () => {},
  ingredients: [],
  mutate: () => {},
  ingredientQuery: '',
  setIngredients: () => {},
  setIngredientQuery: () => {},
  removeIngredient: () => {},
  showRecipeForm: false,
  setShowRecipeForm: () => {},
  recipe: null,
  setRecipe: () => {},
  recipeId: null,
  setRecipeId: () => {},
  clearForm: () => {},
})

const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [showRecipeForm, setShowRecipeForm] = useState(false)
  const [recipeNameQuery, setRecipeNameQuery] = useState('')
  const [ingredientQuery, setIngredientQuery] = useState('')
  const [ingredients, setIngredients] = useState<string[]>([])
  const [recipeId, setRecipeId] = useState<string | null>(null)
  const [recipe, setRecipe] = useState<RecipeType | null>(null)
  function removeIngredient(name: string) {
    const newIngredients = ingredients.filter((ingredient) => ingredient !== name)
    console.log('ingredients', newIngredients)
    setIngredients(newIngredients)
  }

  function clearForm() {
    console.log('clearing form')
    setRecipeId(null)
    setRecipe(null)
    setIngredients([])
  }

  const { data: recipes, mutate } = useRecipes({ name: recipeNameQuery, ingredients: ingredients.join(',') })
  return (
    <RecipeContext.Provider
      value={{
        recipes,
        mutate,
        recipeNameQuery,
        setRecipeNameQuery,
        ingredients,
        ingredientQuery,
        removeIngredient,
        setIngredients,
        setIngredientQuery,
        showRecipeForm,
        recipeId,
        setRecipeId,
        recipe,
        setRecipe,
        setShowRecipeForm,
        clearForm,
      }}
    >
      {children}
    </RecipeContext.Provider>
  )
}
export { RecipeContext, RecipeProvider }
