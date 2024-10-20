'use client'
import { useRecipes } from './hooks/useRecipes'
import Link from 'next/link'
import { Flex } from '@repo/ui/flex'

export default function Home() {
  const { data: recipes } = useRecipes()
  console.log(recipes)
  return (
    <Flex className="flex-col gap-2 p-8">
      <h1>Welcome to home</h1>

      <Link className="text-blue-500 cursor-pointer hover:text-blue-600 active:text-blue-700" href="/recipestacker">
        Go to Recipe Stacker
      </Link>

      <Link className="text-blue-500 cursor-pointer hover:text-blue-600 active:text-blue-700" href="/input">
        Go to Input
      </Link>

      <Link className="text-blue-500 cursor-pointer hover:text-blue-600 active:text-blue-700" href="/button">
        Go to Button
      </Link>

      <Link
        className="text-blue-500 cursor-pointer hover:text-blue-600 active:text-blue-700"
        href="/games/random-number-guesser"
      >
        Go to Random Number Guesser
      </Link>
    </Flex>
  )
}
