import getAll from "../api/map";
import { Tile } from "../api/map/type";

export const map: Map<string, Tile> = new Map()

export const loadMap = async () => {
  map.clear()
  console.log(`ℹ️ Récupération de l'ensemble de la carte`)
  const apiItems = await getAll()
  for (const tile of apiItems) {
    map.set(`${tile.x}-${tile.y}`, tile)
  }
  console.log(`ℹ️ Chargement de la carte terminé`)
}
