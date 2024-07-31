import * as dotenv from 'dotenv'
dotenv.config()

import { move, fight, gathering, unequip, craft, equip } from './actions'
import { getInventory } from './getters'

const actions = async (name: string) => {
  console.log(`Déplacement de ${name}`)
  await move(name, {x: -1, y: 0}).catch(e => console.log(e))
  console.log(`Récupération de l'inventaire de ${name}`)
  let ash_wood = (await getInventory(name))?.find(i => i.code === 'ash_wood')?.quantity ?? 0
  console.log(`Nombre de bois :  ${ash_wood}`)
  
  while (ash_wood < 4) {
    console.log(`Récupération du bois`)
    const data = (await gathering(name)).data
    ash_wood += data.details.items.find(v => v.code === 'ash_wood')?.quantity ?? 0
    console.log(`Nombre de bois :  ${ash_wood}`)
  }
  console.log(`Nous avons assez de bois`)
  console.log(`Déséquipement de l'arme de ${name}`)
  unequip(name, {slot: 'weapon'})
  console.log(`Déplacement de ${name}`)
  await move(name, {x: 2, y: 1}).catch(e => console.log(e))
  console.log(`Craft de l'arme`)
  await craft(name, {code: 'wooden_staff'}).catch(e => console.log(e)).then(e => console.log(e))
  console.log(`Equipement de l'arme`)
  await equip(name, {code: 'wooden_staff', slot: 'weapon'}).catch(e => console.log(e))
}

actions('Nendar')
