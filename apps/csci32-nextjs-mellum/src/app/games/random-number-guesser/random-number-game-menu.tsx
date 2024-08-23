'use client'
import { Button } from '@repo/ui/button'
import { GuessingGameMenuProps } from './page'
import { FormEventHandler, useState } from 'react'
import Input from '@repo/ui/input'

export default function RandomNumberGameMenu({ startGame }: GuessingGameMenuProps) {
  const [showSettings, setShowSettings] = useState(false)

  function onSubmitSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const min = Number(data.get('min'))
    const max = Number(data.get('max'))
    const maxGuessCount = Number(data.get('maxGuessCount'))
    startGame({ min, max, maxGuessCount })
    setShowSettings(false)
  }
  return (
    <div className="flex flex-col gap-4">
      {showSettings ? (
        <div className="flex flex-col gap-4">
          <header>
            <h1 className="text-2xl font-bold">Please enter the minimum and maximum guess values</h1>
          </header>
          <form className="flex flex-col gap-4" onSubmit={onSubmitSettings}>
            <Input defaultValue={0} type="number" placeholder={'Minimum guessing value'} name="min" id="min" />
            <Input defaultValue={10} type="number" placeholder={'Maximum guessing value'} name="max" id="max" />
            <Input
              defaultValue={3}
              type="number"
              placeholder={'Allotted guesses'}
              name="maxGuessCount"
              id="maxGuessCount"
            />
            <Button>Submit</Button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <header className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Welcome to the exotic and exciting random number guessing game. </h1>
            <p>Big prizes and bragging rights are at stake here every day! </p>
            <p>Are you ready to play?</p>
          </header>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setShowSettings(true)
            }}
          >
            <Button>Get started</Button>
          </form>
        </div>
      )}
    </div>
  )
}
