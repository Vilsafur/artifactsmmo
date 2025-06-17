import getAll from "../api/items";
import { Item, SimpleItem } from "../api/items/type";

export const items: Map<string, Item> = new Map()

export const loadItems = async () => {
  items.clear()
  console.log(`ℹ️ Récupération de l'ensemble des objets`)
  const apiItems = await getAll()
  for (const item of apiItems) {
    items.set(item.code, item)
  }
  console.log(`ℹ️ Chargement des objets terminé`)
}

export const get = (itemCode: string): Item | undefined => {
  const item = items.get(itemCode)
  if (!item) {
    console.log(`⚠️ L'objet ${itemCode} n'existe pas`)
    return undefined
  }
  return item
}

export const isItem = (itemCode: string): boolean => {
  return items.has(itemCode)
}

export const isCraftable = (itemCode: string): boolean => {
  const item = items.get(itemCode)
  if (!item) {
    throw new Error(`❌ L'objet ${itemCode} n'existe pas`)
  }
  const craftable = item.craft !== undefined && item.craft !== null
  if (craftable) {
    console.log(`✅ L'objet ${itemCode} est craftable`)
    console.log(`🛠️ Détails du craft :`, item.craft)
  } else {
    console.log(`❌ L'objet ${itemCode} n'est pas craftable`)
  }

  return item.craft !== undefined && item.craft !== null
}

export const getItemDependency = (itemCode: string): SimpleItem[] => {
  const item = items.get(itemCode)
  if (!item) {
    console.log(`⚠️ L'objet ${itemCode} n'existe pas`)
    return []
  }
  return item.craft?.items ?? []
}

export const getQuantityByCraft = (itemCode: string): number => {
  const item = items.get(itemCode)
  if (!item) {
    console.log(`⚠️ L'objet ${itemCode} n'existe pas`)
    return 0
  }
  return item.craft?.quantity ?? 1
}