import { ItemSchema } from "./ApiArtifacts";
import { Character } from "./character";
import { firstArmorSet } from "./data/sets";
import { getItemsByCode } from "./items";
import { logCharacter, logItem } from "./logger";
import { addRetriveItemTask, getPersoWithRole } from "./team";
import { Set } from "./types";
import { delay, getTotalSlots } from "./utils";

/**
 * Créer le set de départ comprenant les objets en cuivre + le bouclier en bois
 *
 * @param personnage Le personnage devant créer le set
 * @param equip Le set doit-il être équipé par le personnage ?
 * @returns void
 */
export const createStarterSet = async (personnage: Character, depositToBank: boolean = false): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    await craftItems(personnage, firstArmorSet)
    if (depositToBank) {
      await depositItemsToBank(personnage, firstArmorSet)
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
    await personnage.depositItemToBank(item, quantity)
  }
}

/**
 * S'assure qu'il y est assez de consommable pour les personnages
 * 2 consommables par personnages => 10 au total
 * Actuellement : Cooked Gudgeon
 */
export const ensureWeHaveConsummable = async (): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    const itemCode = 'cooked_gudgeon'
    const item = await getItemsByCode(itemCode)

    if (!item) {
      logItem(`L'objet avec le code ${itemCode} n'est pas trouvable`)
      return reject()  
    }

    const personnage = await getPersoWithRole('cooker')
    personnage.addTask({ promise: () => farm(personnage, item, 10), name: `Récupère 10 ${item.name}` })
  })
}

/**
 * Equipe le set d'objet spécifié au personnage
 *
 * @param personnage Le personnage qui doit équiper le set
 * @param items La liste des objets à équiper
 */
export const equipSet = (personnage: Character, items: Set): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    const itemAsk: string[] = []
    const itemEquip: string[] = []
    const totalItemToEquip = getTotalSlots(items)

    for (const code in items) {
      if (Object.prototype.hasOwnProperty.call(items, code)) {
        const { name, slots } = items[code];

        const item = await getItemsByCode(code)
        if (!item) {
          logItem(`L'objet ${name} n'as pas été trouvé`, 'error')
          return reject()
        }


        for (const slot of slots) {
          if ((await personnage.getInfos())[`${slot}_slot`] == code) {
            logCharacter(personnage, `L'objet ${item.name} est déjà équipé à l'emplacement ${slot}`)
            continue
          }
          try {
            await personnage.retrieveOrCraft(item, 1).then(async () => {
              await personnage.equip({ code, slot })
              itemEquip.push(`${code}-${slot}`)
            })
          } catch (error) {
            if (error === 1 && !itemAsk.find(v => v == `${code}-${slot}`)) {
              logCharacter(personnage, `Demande de récupération de l'objet ${item.name}`)
              addRetriveItemTask(item, 1)
              itemAsk.push(`${code}-${slot}`)
            } else if (error === 2) {
              return reject()
            }
          }
        }
      }
    }

    if (itemEquip.length < totalItemToEquip) {
      await delay(1000)
      personnage.addTask({ promise: () => equipSet(personnage, items), name: "Equipe un set" })
    }
    resolve()
  })
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