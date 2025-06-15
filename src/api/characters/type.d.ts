import { Item, SimpleItem } from "../items/type";
import { Tile } from "../map/type";
import { cooldown } from "../types";

export type Skin = 'men1' | 'men2' | 'men3' | 'women1' | 'women2' | 'women3'
export type SkillName = 'mining' | 'woodcutting' | 'fishing' | 'weaponcrafting' | 'gearcrafting' | 'jewelrycrafting' | 'cooking' | 'alchemy'

interface InventorySlot {
  slot: number;
  code: string;
  quantity: number;
}

// Typage d'un personnage
export interface Character {
  name: string;
  skin: Skin;
  mining_level: number;
  mining_xp: number;
  mining_max_xp: number;
  woodcutting_level: number;
  woodcutting_xp: number;
  woodcutting_max_xp: number;
  fishing_level: number;
  fishing_xp: number;
  fishing_max_xp: number;
  weaponcrafting_level: number;
  weaponcrafting_xp: number;
  weaponcrafting_max_xp: number;
  gearcrafting_level: number;
  gearcrafting_xp: number;
  gearcrafting_max_xp: number;
  jewelrycrafting_level: number;
  jewelrycrafting_xp: number;
  jewelrycrafting_max_xp: number;
  cooking_level: number;
  cooking_xp: number;
  cooking_max_xp: number;
  alchemy_level: number;
  alchemy_xp: number;
  alchemy_max_xp: number;
  x: number;
  y: number;
  inventory: InventorySlot[]
}

export interface CharacterMovementDataSchema {
  cooldown: cooldown;
  destination: Tile;
  character: Character;
}

interface SkillInfo {
  xp: number;
  items: SimpleItem[];
}
export interface SkillDataSchema {
  cooldown: cooldown;
  character: Character;
  details: SkillInfo;
}

export interface BankItemTransactionSchema {
  cooldown: cooldown;
  character: Character;
  item: Item[];
  bank: SimpleItem[];
}