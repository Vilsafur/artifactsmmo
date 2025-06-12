import { config } from 'dotenv';
config();

import { delay } from './utils/time';
import { loadItems } from './store/item';
import { loadTeams } from './store/team';
import { CharacterToCreate } from './types/team';
import { loadMap } from './store/map';
import { loadmonsters } from './store/monster';
import { loadResources } from './store/resource';

const characters: CharacterToCreate[] = [
  {name: 'Ares', skin: 'men1'},
  {name: 'Athena', skin: 'women1'},
  {name: 'Hermes', skin: 'men2'},
  {name: 'Hades', skin: 'men3'},
]

async function main() {
  console.log(`🔃 Initialisation...`)
  await loadItems()
  await loadResources()
  await loadMap()
  await loadmonsters()
  await loadTeams(characters)
  console.log(`✅ Initialisation terminée`)
  // Début de la boucle de jeu
  const inGame = false
  while (inGame) {
    // Recherche des objets a crafter

    // Temporisation
    await delay(200)
  }
}

main();
