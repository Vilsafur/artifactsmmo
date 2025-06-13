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
  return item.craft.quantity
}