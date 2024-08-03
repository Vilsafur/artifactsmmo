import * as dotenv from 'dotenv'
dotenv.config()

import { getItemsByCode } from './items'
import { Character } from './character'

const actions = async (name: string) => {
  const perso = new Character(name)

  const cooked_gudgeon = await getItemsByCode('cooked_gudgeon')
  if (!cooked_gudgeon) {
    throw new Error(`Le bouclier en bois n'as pas été trouvé !`)
  }
  
  await perso.craft(cooked_gudgeon)
}

actions('Nendar')
