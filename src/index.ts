import * as dotenv from 'dotenv'
dotenv.config()

import { ensureWeHaveConsummable, equipSet } from './tasks'
import { getAllPerso, initialisation } from './team'
import { firstArmorSet } from './data/sets'
import { initializeInterface } from './interface'

const actions = async () => {
  await initialisation()

  const personnages = getAllPerso().map(v => v.getName())

  initializeInterface(personnages, [])

  ensureWeHaveConsummable()
  for (const perso of getAllPerso()) {
    perso.addTask({ promise: () => equipSet(perso, firstArmorSet), name: "Equipe le premier set d'armure"})
  }
}

actions()
