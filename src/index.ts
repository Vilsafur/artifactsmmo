import * as dotenv from 'dotenv'
dotenv.config()

import { Character } from './character'
import { playerColors } from './utils'
import { createStarterSet } from './tasks'
import { logCharacter } from './logger'
import { getPersoWithRole, initialisation } from './team'

const actions = async () => {
  await initialisation()

  const perso = getPersoWithRole('gearcrafter')

  perso.addTask(() => createStarterSet(perso, true))
}

actions()
