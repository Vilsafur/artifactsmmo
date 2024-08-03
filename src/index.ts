import * as dotenv from 'dotenv'
dotenv.config()

import { move, fight, gathering, unequip, craft, equip } from './actions'
import { getInventory } from './getters'
import { getItems } from './items'

const actions = async (name: string) => {
  const items = await getItems()
  console.log(`${items.length} récupérés`)
}

actions('Nendar')
