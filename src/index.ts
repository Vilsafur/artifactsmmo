import * as dotenv from 'dotenv'
dotenv.config()

import { getItemsByCode } from './items'
import { Character } from './character'
import { playerColors } from './utils'

const actions = async (name: string) => {
  const perso = new Character(name, playerColors[0])

  const copper_ring = await getItemsByCode('copper_ring')
  if (!copper_ring) {
    throw new Error(`L'anneau en cuivre n'as pas été trouvé !`)
  }
  
  await perso.craft(copper_ring)
  await perso.equip({code: 'copper_ring', slot: 'ring2'})
}

actions('Nendar')
