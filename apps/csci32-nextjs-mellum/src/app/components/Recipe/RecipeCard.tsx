import { IngredientMeasurement } from '@/context/RecipeContext'
import { Button } from '@repo/ui/button'
import { Flex } from '@repo/ui/flex'
import { Header } from '@repo/ui/header'
import { Size } from '@repo/ui/size'
import { Variant } from '@repo/ui/variant'

// props
export type RecipeCardProps = {
  recipe_id: string
  name: string | null
  description: string | null
  ingredient_measurements: IngredientMeasurement[] | null
}

export default function RecipeCard({ name, description, ingredient_measurements }: RecipeCardProps) {
  return (
    <div className="border-2 border-solid border-violet-600 rounded-md bg-violet-100 shadow-md basis-1/4 min-w-96 flex-grow">
      <Flex className="justify-between bg-violet-200 w-full p-4 gap-2 flex-wrap rounded-md">
        <Header variant="h6">{name}</Header>
        <Flex className="gap-2">
          <Button size={Size.XSMALL} variant={Variant.SECONDARY} onClick={() => alert('Update not implemented')}>
            Update
          </Button>
          <Button size={Size.XSMALL} variant={Variant.SECONDARY} onClick={() => alert('Delete not implemented')}>
            Delete
          </Button>
        </Flex>
      </Flex>
      <div className="bg-violet-100 w-full p-4 flex flex-col gap-4 rounded-md">
        <p>{description}</p>
        <ul className="ml-2 bg-violet-300 p-4 gap-2 flex flex-col rounded-md">
          {ingredient_measurements?.map(({ quantity, unit, ingredient }, index) => {
            return (
              <li key={index}>
                {quantity} {unit} {ingredient.name}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
