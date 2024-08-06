import * as dotenv from 'dotenv'
dotenv.config()

import { ensureWeHaveConsummable, equipSet } from './tasks'
import { getAllPerso, initialisation } from './team'
import { firstArmorSet } from './data/sets'

const actions = async () => {
  await initialisation()

  ensureWeHaveConsummable()
  for (const perso of getAllPerso()) {
    perso.addTask(() => equipSet(perso, firstArmorSet))
  }
}

actions()
