import getAll from "../api/items";
import { Item } from "../api/items/type";

export const items: Map<string, Item> = new Map()

export const loadItems = async () => {
  items.clear()
  console.log(`ℹ️ Récupération de l'ensembles des objets`)
  const apiItems = await getAll()
  for (const item of apiItems) {
    items.set(item.code, item)
  }
  console.log(`ℹ️ Chargement des objets terminé`)
}
