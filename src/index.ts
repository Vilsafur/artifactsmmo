import * as dotenv from 'dotenv'
dotenv.config()

import { Character } from './character'
import { playerColors } from './utils'
import { createStarterSet } from './tasks'
import { logCharacter } from './logger'

const actions = async (name: string) => {
  const perso = new Character(name, playerColors[0])

  perso.addTask(() => createStarterSet(perso, true))
}

actions('Nendar')
