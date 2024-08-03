import * as dotenv from 'dotenv'
dotenv.config()

import { getItemsByCode } from './items'
import { Character } from './character'

const actions = async (name: string) => {
  const perso = new Character(name)

  const copper_ring = await getItemsByCode('copper_ring')
  if (!copper_ring) {
    throw new Error(`Le bouclier en bois n'as pas été trouvé !`)
  }
  
  await perso.craft(copper_ring)
  await perso.equip({code: 'copper_ring', slot: 'ring2'})
}

actions('Nendar')
