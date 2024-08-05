import { Character } from "./character";
import { getItemsByCode } from "./items";
import { logCharacter, logItem } from "./logger";
import { Slot } from "./types";

export type Task = () => Promise<void>

/**
 * Créer le set de départ comprenant les objets en cuivre + le bouclier en bois
 *
 * @param personnage Le personnage devant créer le set
 * @param equip Le set doit-il être équipé par le personnage ?
 * @returns void
 */
export const createStarterSet = async (personnage: Character, equip: boolean = false): Promise<void> => {
  return new Promise(async (resolve, reject) => {

    const items: {
      [key: string]: {
        name: string,
        slots: Slot[]
      }
    } = {
      copper_dagger: {
        name: 'Copper Dagger',
        slots: ['weapon']
      },
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

    for (const code in items) {
      if (Object.prototype.hasOwnProperty.call(items, code)) {
        const { name, slots } = items[code];
        const item = await getItemsByCode(code)
        if (!item) {
          logItem(`L'objet ${name} n'as pas été trouvé`, 'error')
          return reject()
        }

        for (const slot of slots) {
          if (equip && (await personnage.getInfos())[`${slot}_slot`] == item.code) {
            logCharacter(personnage, `L'objet ${name} est déjà équipé`)
            continue
          }

          try {
            await personnage.retrieveOrCraft(item, 1)
            if (equip) {
              if ((await personnage.getInfos())[`${slot}_slot`] != '') {
                await personnage.unequip({ slot })
              }
              await personnage.equip({ code, slot })
            }
          } catch (error) {
            continue            
          }
        }
      }
    }
    resolve()
  })
}
