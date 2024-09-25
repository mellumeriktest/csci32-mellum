'use client'
import Image from 'next/image'
import { add } from '@repo/math/add'
import { SWRConfig } from 'swr'
import { useRecipes } from './hooks/useRecipes'

export default function Home() {
  const { data: recipes } = useRecipes()
  console.log({ recipes })
  return <div>Recipestacker</div>
}
