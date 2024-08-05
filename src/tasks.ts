import { Character } from "./character";
import { getItemsByCode } from "./items";
import { logCharacter } from "./logger";

export type Task = () => Promise<void>

export const createStarterSet = async (personnage: Character, equip: boolean = false) => {
    const items : {[key: string]: {
        name: string, 
        slots: Array<"weapon" | "shield" | "helmet" | "body_armor" | "leg_armor" | "boots" | "ring1" | "ring2" | "amulet" | "artifact1" | "artifact2" | "artifact3" | "consumable1" | "consumable2">}} = {
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
                throw new Error(`L'objet ${name} n'as pas été trouvé`)
            }

            for (const slot of slots) {
                if (equip && (await personnage.getInfos())[`${slot}_slot`] == item.code) {
                    logCharacter(personnage, `L'objet ${name} est déjà équipé`)
                    continue
                }

                await personnage.retrieveOrCraft(item, 1)
                if (equip) {
                    if ((await personnage.getInfos())[`${slot}_slot`] != '') {
                        await personnage.unequip({ slot })
                    }
                    await personnage.equip({ code, slot })
                }
            }
        }
    }
}
