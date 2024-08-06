export type Slot = "weapon" | "shield" | "helmet" | "body_armor" | "leg_armor" | "boots" | "ring1" | "ring2" | "amulet" | "artifact1" | "artifact2" | "artifact3" | "consumable1" | "consumable2"

export type Skin = "men1" | "men2" | "women1" | "women2" | "men3" | "women3"

export type CharacterRole = "farmer" | "weaponcrafter" | "cooker" | "jewelrycrafter" | "gearcrafter"

export type Skill = "cooking" | "mining" | "woodcutting" | "gearcrafting" | "weaponcrafting" | "jewelrycrafting"

export interface Set {
    [key: string]: {
      name: string,
      slots: Slot[]
    }
  }