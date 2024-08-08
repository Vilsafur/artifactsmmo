import * as dotenv from 'dotenv'
dotenv.config()

import { ensureWeHaveConsummable, equipSet } from './tasks'
import { getAllPerso, initialisation } from './team'
import { firstArmorSet } from './data/sets'
import { initializeInterface } from './interface'
import { delay } from './utils'
import { getItems } from './items'
import { getMap } from './map'

process.on('unhandledRejection', async (reason, promise) => {
  await delay(30000)
  console.error('Rejection non gérée détectée à:', promise, 'raison:', reason);
  process.exit(1)
  // Vous pouvez faire autre chose ici, comme enregistrer l'erreur dans un fichier de log
});

const actions = async () => {
  await initialisation()

  const personnages = getAllPerso().map(v => v.getName())

  initializeInterface(personnages, [])

  await Promise.all([
    getItems(),
    getMap()
  ])

  ensureWeHaveConsummable()
  for (const perso of getAllPerso()) {
    perso.addTask({ promise: () => equipSet(perso, firstArmorSet), name: "Equipe le premier set d'armure"})
  }
}

actions()
