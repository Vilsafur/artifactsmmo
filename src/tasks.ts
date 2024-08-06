import { ItemSchema } from "./ApiArtifacts";
import { Character } from "./character";
import { getItemsByCode } from "./items";
import { logCharacter, logItem } from "./logger";
import { Set, Slot } from "./types";

export type Task = () => Promise<void>

/**
 * Créer le set de départ comprenant les objets en cuivre + le bouclier en bois
 *
 * @param personnage Le personnage devant créer le set
 * @param equip Le set doit-il être équipé par le personnage ?
 * @returns void
 */
export const createStarterSet = async (personnage: Character, depositToBank: boolean = false): Promise<void> => {
  return new Promise(async (resolve, reject) => {

    const items: Set = {
      copper_boots: {
        name: 'Copper Boots',
        slots: ['boots']
      },
      copper_helmet: {
        name: 'Copper Helmet',
        slots: ['helmet']
      },
      copper_ring: {
        name: 'Copper Ring',
        slots: ['ring1', 'ring2']
      },
      copper_legs_armor: {
        name: 'Copper Legs Armor',
        slots: ['leg_armor']
      },
      copper_armor: {
        name: 'Copper Armor',
        slots: ['body_armor']
      },
      wooden_shield: {
        name: 'Wooden Shield',
        slots: ['shield']
      },
    }

    await craftItems(personnage, items)
    if (depositToBank) {
      await depositItemsToBank(personnage, items)
    }
    return resolve()
  })
}

/**
 * 
 * @param personnage Le personnage qui doit farmer l'objet
 * @param item L'objet à récupérer
 * @param quantity La quantité à prendre
 * @param depositToBank Si l'objet doit être mis à la banque
 */
export const farm = async(personnage: Character, item: ItemSchema, quantity: number, depositToBank: boolean = false) => {
  await personnage.retrieveOrCraft(item, quantity)
  if (depositToBank) {
    personnage.depositItemToBank(item, quantity)
  }
}

/**
 * Fabrique une liste d'objets
 *
 * @param personnage Le personnage qui doit fabriquer l'objet
 * @param items La liste d'objets à fabriquer
 */
const craftItems = (personnage: Character, items: Set) => {
  return new Promise(async (resolve, reject) => {
    for (const code in items) {
      if (Object.prototype.hasOwnProperty.call(items, code)) {
        const { name, slots } = items[code];
        const item = await getItemsByCode(code)
        if (!item) {
          logItem(`L'objet ${name} n'as pas été trouvé`, 'error')
          return reject()
        }

        for (const slot of slots) {
          try {
            await personnage.retrieveOrCraft(item, 1)
          } catch (error) {
            continue
          }
        }
      }
    }
  })
}

/**
 * Dépose des objets à la banque
 *
 * @param personnage Le personnage qui doit déposer des objets à la banque
 * @param items La liste d'objets à déposer
 */
const depositItemsToBank = (personnage: Character, items: Set) => {
  return new Promise(async (resolve, reject) => {
    for (const code in items) {
      if (Object.prototype.hasOwnProperty.call(items, code)) {
        const { name, slots } = items[code];
        const item = await getItemsByCode(code)
        if (!item) {
          logItem(`L'objet ${name} n'as pas été trouvé`, 'error')
          return reject()
        }

        for (const slot of slots) {
          try {
            await personnage.depositItemToBank(item, 1)
          } catch (error) {
            continue
          }
        }
      }
    }
  })
}
