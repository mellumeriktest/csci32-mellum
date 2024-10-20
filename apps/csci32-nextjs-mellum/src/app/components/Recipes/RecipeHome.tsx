import { RecipeForm } from './RecipeForm'
import RecipeSearch from './RecipeSearch'
import { RecipeContext } from '@/context/RecipeContext'
import { RecipeResults } from './RecipeResults'
import { Wrapper } from '@repo/ui/wrapper'
import { Flex } from '@repo/ui/flex'
import { useContext } from 'react'
import { Button } from '@repo/ui/button'
import { Variant } from '@repo/ui/variant'
import { Header } from '@repo/ui/header'

export default function RecipeHome() {
  const { showRecipeForm, setShowRecipeForm, clearForm } = useContext(RecipeContext)
  return (
    <Wrapper>
      <Flex className=" items-center w-full justify-between">
        <Header variant="h1">Welcome to RecipeStacker</Header>
        <Button
          variant={Variant.TERTIARY}
          onClick={() => {
            clearForm()
            setShowRecipeForm(!showRecipeForm)
          }}
        >
          {showRecipeForm ? 'Search Recipes' : 'Create Recipe'}
        </Button>
      </Flex>

      <Flex className="flex-col gap-y-8 mt-8">
        {showRecipeForm ? (
          <RecipeForm />
        ) : (
          <>
            <RecipeSearch />
            <RecipeResults />
          </>
        )}
      </Flex>
    </Wrapper>
  )
}
