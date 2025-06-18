import type { SkillName } from "../api/characters/type";
import getAll from "../api/map";
import type { Tile } from "../api/map/type";

export const map: Map<string, Tile> = new Map();

export const loadMap = async () => {
	map.clear();
	console.log(`ℹ️ Récupération de l'ensemble de la carte`);
	const apiItems = await getAll();
	for (const tile of apiItems) {
		map.set(`${tile.x}-${tile.y}`, tile);
	}
	console.log(`ℹ️ Chargement de la carte terminé`);
};

export const getResourceTile = (resourceCode: string): Tile | undefined => {
	for (const tile of map.values()) {
		if (tile.content?.code === resourceCode) {
			return tile;
		}
	}
	console.log(`⚠️ Aucune tuile trouvée pour la ressource ${resourceCode}`);
	return undefined;
};

export const getBankTile = (): Tile => {
	const tile = Array.from(map.values()).find(
		(tile) => tile.content?.type === "bank",
	);
	if (!tile) {
		throw new Error("Aucune tuile de banque trouvée dans la carte");
	}
	return tile;
};

export const getWorkshopTile = (skill: SkillName): Tile => {
	const tile = Array.from(map.values()).find(
		(tile) => tile.content?.type === "workshop" && tile.content?.code === skill,
	);
	if (!tile) {
		throw new Error("Aucune tuile d'atelier trouvée dans la carte");
	}
	return tile;
};
