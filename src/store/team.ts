import crafting from "../api/characters/crafting";
import create from "../api/characters/create";
import deleteCharacter from "../api/characters/delete";
import gathering from "../api/characters/gathering";
import list from "../api/characters/list";
import move from "../api/characters/move";
import type { Character, SkillDataSchema } from "../api/characters/type";
import { Task } from "../entity/task";
import type { CharacterToCreate, TeamCharacter } from "../types/team";
import {
	add as addToBank,
	howHasInBank,
	retrive as retriveInBank,
} from "./bank";
import { get as getItem, isCraftable } from "./item";
import { getResourceTile, getWorkshopTile } from "./map";
import { get as getResource, getResourceWhoDrop } from "./resource";
import taskBus from "./taskBus";

export const team: Map<string, TeamCharacter> = new Map();

export const loadTeams = async (characters: CharacterToCreate[]) => {
	const existing = await list();
	const existingName = existing.map((c) => c.name);

	for (const character of characters) {
		if (existingName.includes(character.name)) {
			console.log(`✅ ${character.name} existe déjà.`);
			const char = existing.find((c) => c.name === character.name);
			if (char === undefined) {
				console.log(
					`❌ Erreur lors de la récupération des informations de ${character.name}`,
				);
				continue;
			}
			team.set(char.name, createTeamCharacter(char));
			continue;
		}

		try {
			const created = await create(character);
			team.set(created.name, createTeamCharacter(created));
			console.log(`🆕 Créé : ${created.name}`);
		} catch (err: any) {
			console.error(
				`❌ Erreur création ${character.name} :`,
				err.response?.data || err.message,
			);
		}
	}

	console.log(`ℹ️ Chargement de l'équipe terminé`);
	for (const [key, _char] of team) {
		debugCharacter(key);
	}
};

const createTeamCharacter = (char: Character): TeamCharacter => {
	return {
		name: char.name,
		position: {
			x: char.x,
			y: char.y,
		},
		status: "Waiting",
		skin: char.skin,
		skills: {
			alchemy: {
				level: char.alchemy_level,
				max_xp: char.alchemy_max_xp,
				xp: char.alchemy_xp,
			},
			cooking: {
				level: char.cooking_level,
				max_xp: char.cooking_max_xp,
				xp: char.cooking_xp,
			},
			fishing: {
				level: char.fishing_level,
				max_xp: char.fishing_max_xp,
				xp: char.fishing_xp,
			},
			gearcrafting: {
				level: char.gearcrafting_level,
				max_xp: char.gearcrafting_max_xp,
				xp: char.gearcrafting_xp,
			},
			jewelrycrafting: {
				level: char.jewelrycrafting_level,
				max_xp: char.jewelrycrafting_max_xp,
				xp: char.jewelrycrafting_xp,
			},
			mining: {
				level: char.mining_level,
				max_xp: char.mining_max_xp,
				xp: char.mining_xp,
			},
			weaponcrafting: {
				level: char.weaponcrafting_level,
				max_xp: char.weaponcrafting_max_xp,
				xp: char.weaponcrafting_xp,
			},
			woodcutting: {
				level: char.woodcutting_level,
				max_xp: char.woodcutting_max_xp,
				xp: char.woodcutting_xp,
			},
		},
		inventory: char.inventory.map((item) => ({
			code: item.code,
			quantity: item.quantity,
		})),
	};
};

export const execTask = async () => {
	const task = taskBus.getNextReadyTask();
	if (!task) {
		return;
	}
	console.log(`🔄 Exécution de la tâche : ${task.name} (type : ${task.type})`);

	// Récupération du personnage ayant la compétence requise la plus élevée et qui est disponible
	const obj =
		task.type === "craft" ? getItem(task.code) : getResourceWhoDrop(task.code);
	if (undefined === obj) {
		console.log(`❌ L'objet ou la ressource ${task.code} n'existe pas.`);
		return;
	}
	const skillName =
		task.type === "craft"
			? getItem(task.code)?.craft?.skill
			: getResourceWhoDrop(task.code)?.skill;
	const skillLevel =
		(task.type === "craft"
			? getItem(task.code)?.craft?.level
			: getResourceWhoDrop(task.code)?.level) ?? 1;
	console.log(
		`🔍 Compétence requise pour la tâche ${task.name} : ${skillName}`,
	);
	if (!skillName) {
		console.log(`❌ La tâche ${task.name} n'a pas de compétence associée.`);
		return;
	}

	const bestCharacter = getBestCharacterForSkill(skillName, skillLevel);
	if (!bestCharacter) {
		console.log(
			`❌ Aucun personnage disponible avec la compétence ${skillName} (Niveau ${skillLevel})`,
		);
		return;
	}

	// Mise à jour du statut du personnage
	bestCharacter.status = "Working";
	console.log(
		`👤 Personnage sélectionné : ${bestCharacter.name} (Niveau ${bestCharacter.skills[skillName as keyof TeamCharacter["skills"]].level})`,
	);

	// Exécution de la tâche en fonction du type
	try {
		task.status = "in-progress";
		if (task.type === "craft") {
			const res = await craft(
				bestCharacter.name,
				obj.code,
				task.quantity,
				task,
			);
			bestCharacter.skills[skillName as keyof TeamCharacter["skills"]].xp =
				res.character[`${skillName}_xp`];
			bestCharacter.skills[skillName as keyof TeamCharacter["skills"]].level =
				res.character[`${skillName}_level`];
			bestCharacter.skills[skillName as keyof TeamCharacter["skills"]].max_xp =
				res.character[`${skillName}_max_xp`];
			console.log(`ℹ️ Compétences mises à jour pour ${bestCharacter.name}`);
			debugCharacter(bestCharacter.name);

			// Déplacement du personnage vers la banque
			console.log(
				`🚶‍♂️ Déplacement de ${bestCharacter.name} vers la banque pour déposer les ressources...`,
			);
			await addToBank(bestCharacter.name, task.code, task.quantity);
		} else if (task.type === "gather") {
			const res = await gather(bestCharacter.name, obj.code, task.quantity);
			bestCharacter.skills[skillName as keyof TeamCharacter["skills"]].xp =
				res.character[`${skillName}_xp`];
			bestCharacter.skills[skillName as keyof TeamCharacter["skills"]].level =
				res.character[`${skillName}_level`];
			bestCharacter.skills[skillName as keyof TeamCharacter["skills"]].max_xp =
				res.character[`${skillName}_max_xp`];
			console.log(`ℹ️ Compétences mises à jour pour ${bestCharacter.name}`);
			debugCharacter(bestCharacter.name);

			// Déplacement du personnage vers la banque
			console.log(
				`🚶‍♂️ Déplacement de ${bestCharacter.name} vers la banque pour déposer les ressources...`,
			);
			await addToBank(bestCharacter.name, task.code, task.quantity);
		}

		// Marquer la tâche comme terminée
		console.log(`✅ Tâche ${task.name} terminée par ${bestCharacter.name}`);
		taskBus.remove(task.id);
	} catch (error) {
		console.error(
			`❌ Erreur lors de l'exécution de la tâche ${task.name} :`,
			error,
		);
	} finally {
		bestCharacter.status = "Waiting"; // Remettre le personnage en attente
	}
};

const gather = async (
	characterName: string,
	resourceCode: string,
	quantity: number,
): Promise<SkillDataSchema> => {
	const character = team.get(characterName);
	if (!character) {
		throw new Error(
			`❌ Le personnage ${characterName} n'existe pas dans l'équipe.`,
		);
	}
	const resource = getResource(resourceCode);
	if (!resource) {
		throw new Error(`❌ La ressource ${resourceCode} n'existe pas.`);
	}

	console.log(
		`🌿 Collecte de ressources pour ${resource.name} par ${characterName}`,
	);
	// Récupération de l'emplacement de la ressource
	const tile = getResourceTile(resourceCode);
	if (!tile) {
		console.log();
		throw new Error(
			`❌ Aucune tuile trouvée pour la ressource ${resourceCode}`,
		);
	}
	console.log(`📍 Emplacement de la ressource : (${tile.x}, ${tile.y})`);
	// Déplacement du personnage vers la ressource
	if (character.position.x === tile.x && character.position.y === tile.y) {
		console.log(`✅ ${characterName} est déjà sur la tuile de la ressource.`);
	} else {
		console.log(
			`🚶‍♂️ Déplacement de ${characterName} vers la tuile de la ressource...`,
		);
		await move(characterName, tile);
	}
	// Récupération de la ressource
	console.log(`🔄 Démarrage de la collecte de ${resource.name}...`);
	let needed = quantity;
	// récupération de la ressource tant que la quantité n'est pas atteinte
	let res: SkillDataSchema;
	do {
		console.log(
			`🔄 Collecte de ${resource.name} en cours... (${needed} restant)`,
		);
		res = await gathering(characterName);
		needed--;
	} while (needed > 0);

	return res;
};

const craft = async (
	characterName: string,
	itemCode: string,
	quantity: number,
	task: Task,
): Promise<SkillDataSchema> => {
	const character = team.get(characterName);
	if (!character) {
		throw new Error(
			`❌ Le personnage ${characterName} n'existe pas dans l'équipe.`,
		);
	}
	const item = getItem(itemCode);
	if (!item) {
		throw new Error(`❌ L'item' ${itemCode} n'existe pas.`);
	}

	// Vérification de la possession des ressources nécessaires
	if (item.craft.items.length > 0) {
		for (const itemNeeded of item.craft.items) {
			const obj = getItem(itemNeeded.code) ?? getResource(itemNeeded.code);
			if (undefined === obj) {
				console.log(
					`❌ L'objet ou la ressource ${itemNeeded.code} n'existe pas.`,
				);
				continue;
			}
			let quantityNeeded = itemNeeded.quantity * quantity;
			const characterResource = character.inventory.find(
				(i) => i.code === itemNeeded.code,
			);
			// Vérification de la disponibilité de la ressource dans l'inventaire du personnage
			if (characterResource) {
				console.log(
					`🔍 Utilisation de ${characterResource.quantity} ${obj.name} de l'inventaire de ${characterName}`,
				);
				quantityNeeded -= characterResource.quantity;
				if (quantityNeeded <= 0) {
					console.log(
						`✅ ${obj.name} est déjà présent dans l'inventaire de ${characterName} (${characterResource.quantity}/${itemNeeded.quantity})`,
					);
					continue;
				}
			}
			console.log(
				`❌ ${characterName} n'a pas assez de ${obj.name} dans son inventaire (${characterResource?.quantity ?? 0}/${itemNeeded.quantity})`,
			);
			// Vérification de la disponibilité de la ressource à la banque
			console.log(
				`🔍 Vérification de la disponibilité de ${obj.name} dans la banque...`,
			);
			const availableInBank = howHasInBank(itemNeeded.code);
			if (availableInBank > 0) {
				console.log(
					`✅ ${availableInBank} ${obj.name} est disponible dans la banque.`,
				);
				if (availableInBank < quantityNeeded) {
					console.log(
						`❌ Il n'y a pas assez de ${obj.name} dans la banque (${availableInBank}/${quantityNeeded})`,
					);
					await retriveInBank(characterName, itemNeeded.code, availableInBank);
					quantityNeeded -= availableInBank;
				} else {
					console.log(
						`✅ ${characterName} a récupéré ${quantityNeeded} ${obj.name} de la banque.`,
					);
					await retriveInBank(characterName, itemNeeded.code, quantityNeeded);
					quantityNeeded = 0; // On considère que la quantité nécessaire est satisfaite
					continue;
				}
			}
			const typeTask = isCraftable(itemNeeded.code) ? "craft" : "gather";
			const newTask = new Task({
				name: `${typeTask === "craft" ? "Fabrication" : "Collecte"} de ${obj.name} pour ${characterName}`,
				type: typeTask,
				code: itemNeeded.code,
				quantity: quantityNeeded,
				isDependencyFor: task.id,
			});
			task.dependencies.add(newTask.id);
			taskBus.add(newTask);
			console.log(
				`📝 Tâche ajoutée pour ${typeTask === "craft" ? "fabriquer" : "collecter"} ${quantityNeeded} ${obj.name} pour ${characterName}`,
			);

			console.log(
				`❌ ${characterName} n'a pas assez de ${obj.name} (${characterResource?.quantity ?? 0}/${quantityNeeded})`,
			);
			console.log(
				`📝 Tâche ajoutée pour collecter ${quantityNeeded} ${obj.name}`,
			);
			task.status = "blocked";
		}
	}
	if (task.status === "blocked") {
		throw new Error(
			`❌ La tâche ${task.name} est bloquée, car les ressources nécessaires ne sont pas disponibles.`,
		);
	}

	console.log(
		`✅ Toutes les ressources nécessaires pour fabriquer ${item.name} sont disponibles.`,
	);
	const workshopTile = getWorkshopTile(item.craft.skill);
	if (!workshopTile) {
		throw new Error(
			`❌ Aucune tuile d'atelier trouvée pour la compétence ${item.craft.skill}`,
		);
	}
	// Déplacement du personnage vers l'atelier
	console.log(`🚶‍♂️ Déplacement de ${characterName} vers l'atelier`);
	await move(characterName, workshopTile);
	// Fabrication de l'objet
	console.log(`🔄 Démarrage de la fabrication de ${item.name}...`);

	const res = await crafting(characterName, item.code, quantity);
	return res;
};

const debugCharacter = (name: string) => {
	const char = team.get(name);
	if (char === undefined) {
		console.log(
			`❌ Erreur lors de la récupération des informations de ${name}`,
		);
		return;
	}

	console.log("══════════════════════════════════════════════════════");
	console.log(`                    👤  ${char.name}                  `);
	console.log("══════════════════════════════════════════════════════");
	console.log(`🎨 Skin      : ${char.skin}`); // à adapter selon type de `Skin`
	console.log(`📌 Statut    : ${char.status}`);
	console.log("📚 Compétences :");

	const skillTable = Object.entries(char.skills).reduce(
		(acc, [skillName, data]) => {
			acc[skillName] = {
				Niveau: data.level,
				XP: `${data.xp} / ${data.max_xp}`,
				Progression: `${Math.round((data.xp / data.max_xp) * 100)}%`,
			};
			return acc;
		},
		{} as Record<string, { Niveau: number; XP: string; Progression: string }>,
	);

	console.table(skillTable);
};

const getBestCharacterForSkill = (
	skillName: keyof TeamCharacter["skills"],
	level: number,
): TeamCharacter | undefined => {
	return Array.from(team.values()).reduce((best, current) => {
		const bestMax = best ? best.skills[skillName].level : -Infinity;
		const currMax = current.skills[skillName].level;
		console.log(
			`🔍 Vérification de ${current.name} pour ${skillName} (Niveau ${level}) : Niveau actuel ${currMax}, Meilleur niveau ${bestMax}`,
		);
		if (currMax > bestMax) {
			console.log(
				`🔍 Meilleur personnage pour ${skillName} (Niveau ${level}) : ${current.name} (Niveau ${currMax})`,
			);
			return current;
		}
		if (currMax < bestMax) {
			console.log(
				`🔍 Meilleur personnage pour ${skillName} (Niveau ${level}) : ${best.name} (Niveau ${bestMax})`,
			);
			return best;
		}

		// Même niveau max, comparer la somme des niveaux
		const bestSum = best
			? Object.values(best.skills).reduce((a, b) => a + b.level, 0)
			: Infinity;
		const currSum = Object.values(current.skills).reduce(
			(a, b) => a + b.level,
			0,
		);
		if (currSum < bestSum) {
			console.log(
				`🔍 Meilleur personnage pour ${skillName} (Niveau ${level}) : ${current.name} (Somme des niveaux : ${currSum})`,
			);
			return current;
		}
		console.log(
			`🔍 Meilleur personnage pour ${skillName} (Niveau ${level}) : ${best.name} (Somme des niveaux : ${bestSum})`,
		);
		return best;
	});
};

export const clear = async () => {
	console.log(`🧹 Effacement de l'équipe...`);
	const existing = await list();
	const existingName = existing.map((c) => c.name);

	for (const name of existingName) {
		try {
			console.log(`🗑️ Suppression de ${name}...`);
			await deleteCharacter(name); // Utilisation de l'API pour supprimer le personnage
			console.log(`✅ ${name} supprimé.`);
		} catch (err: any) {
			console.error(
				`❌ Erreur lors de la suppression de ${name} :`,
				err.response?.data || err.message,
			);
		}
	}
	console.log(`ℹ️ Effacement de l'équipe terminé`);
};
