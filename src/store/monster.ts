import getAll from "../api/monsters";
import { Monster } from "../api/monsters/type";

export const monsters: Map<string, Monster> = new Map()

export const loadMonsters = async () => {
  monsters.clear()
  console.log(`ℹ️ Récupération de l'ensemble des monstres`)
  const apimonsters = await getAll()
  for (const monster of apimonsters) {
    monsters.set(monster.code, monster)
  }
  console.log(`ℹ️ Chargement des monstres terminé`)
}
