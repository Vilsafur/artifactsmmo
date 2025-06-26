import { config } from "dotenv";

config();

import { ensureItemIsInBank, loadBankItems } from "./store/bank";
import { loadItems } from "./store/item";
import { loadMap } from "./store/map";
import { loadMonsters } from "./store/monster";
import { loadResources } from "./store/resource";
import { execTask, loadTeams } from "./store/team";
import type { CharacterToCreate } from "./types/team";
import { delay } from "./utils/time";

const characters: CharacterToCreate[] = [
	{ name: "Ares", skin: "men1" },
	{ name: "Athena", skin: "women1" },
	{ name: "Hermes", skin: "men2" },
	{ name: "Hades", skin: "men3" },
];

const minimalInBank: {[code: string]: number} = {
  cooked_gudgeon: 10,
  apple: 5,
  ash_wood: 20,
  copper: 5,
}

async function main() {
	console.log(`🔃 Initialisation...`);
	await loadItems();
	await loadResources();
	await loadMap();
	await loadMonsters();
	await loadBankItems();
	await loadTeams(characters);
	console.log(`✅ Initialisation terminée`);

  // Début de la boucle de jeu
	const inGame = true;
	console.log(`🎮 Début de la boucle de jeu`);
	while (inGame) {
		// Recherche des objets a crafter
		execTask();
    // Vérification des ressources minimales dans la banque
    for (const [code, quantity] of Object.entries(minimalInBank)) {
      ensureItemIsInBank(code, quantity);
    }
		// Temporisation
		await delay(2000);
	}
}

main();
