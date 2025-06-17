import { config } from 'dotenv';
config();

import { delay } from './utils/time';
import { loadItems } from './store/item';
import { loadTeams, execTask } from './store/team';
import { CharacterToCreate } from './types/team';
import { loadMap } from './store/map';
import { loadMonsters } from './store/monster';
import { loadResources } from './store/resource';
import taskBus from './store/taskBus';
import { Task } from './entity/task';
import { loadBankItems } from './store/bank';

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
  await loadMonsters()
  await loadBankItems()
  await loadTeams(characters)
  console.log(`✅ Initialisation terminée`)
  // Début de la boucle de jeu
  const inGame = true
  taskBus.add(new Task({
    name: `Fabrication d'un casque en bronze`,
    type: 'craft',
    code: 'copper_helmet',
    quantity: 1
  }));
  console.log(`🎮 Début de la boucle de jeu`)
  while (inGame) {
    // Recherche des objets a crafter
    execTask();
    // Temporisation
    await delay(2000)
  }
}

main();
