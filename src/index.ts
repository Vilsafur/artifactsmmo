import { config } from 'dotenv';
config();

import { delay } from './utils/time';
import { loadItems } from './store/item';

async function main() {
  console.log(`🔃 Initialisation...`)
  await loadItems()
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
