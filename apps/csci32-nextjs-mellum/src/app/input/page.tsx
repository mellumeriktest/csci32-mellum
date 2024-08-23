'use client'
import { Button } from '@repo/ui/button'
import Input from '@repo/ui/input'
import { Size } from '@repo/ui/size'
import { Variant } from '@repo/ui/variant'
import { useState } from 'react'

export default function ButtonPage() {
  const [name, setName] = useState('')
  const [hobby, setHobby] = useState('')
  const [goal, setGoal] = useState('')
  return (
    <div className="p-24">
      <div className="flex gap-4 flex-wrap">
        <div className="flex gap-2">
          <Input value={name} setValue={setName} size={Size.MEDIUM} variant={Variant.PRIMARY} />
          <Button onClick={() => alert(`Your name is: ${name}`)} size={Size.MEDIUM} variant={Variant.PRIMARY}>
            Name
          </Button>
        </div>
        <div className="flex gap-2">
          <Input value={hobby} setValue={setHobby} size={Size.MEDIUM} variant={Variant.SECONDARY} />
          <Button onClick={() => alert(`Your hobby is: ${hobby}`)} variant={Variant.SECONDARY}>
            Hobby
          </Button>
        </div>
        <div className="flex gap-2">
          <Input value={goal} setValue={setGoal} size={Size.MEDIUM} variant={Variant.TERTIARY} />
          <Button onClick={() => alert(`Your goal is: ${goal}`)} size={Size.MEDIUM} variant={Variant.TERTIARY}>
            Goal
          </Button>
        </div>
      </div>
    </div>
  )
}
