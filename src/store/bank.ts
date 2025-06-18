import getAll from "../api/bank";
import depositToBank from "../api/characters/depositToBank";
import { moveToBank } from "../api/characters/move";
import withdrawToBank from "../api/characters/withdrawToBank";
import type { SimpleItem } from "../api/items/type";

export const items: Map<string, SimpleItem> = new Map();

export const loadBankItems = async () => {
	items.clear();
	console.log(`ℹ️ Récupération de l'ensemble des items de la banque`);
	const apiItems = await getAll();
	for (const item of apiItems) {
		items.set(item.code, item);
	}
	console.log(`ℹ️ Chargement des items de la banque terminé`);
};

export const add = async (
	characterName: string,
	code: string,
	quantity: number,
) => {
	await moveToBank(characterName);
	await depositToBank(characterName, code, quantity);
	const item = items.get(code);
	const newQuantity = (item?.quantity ?? 0) + quantity;
	items.set(code, {
		code,
		quantity: newQuantity,
	});
	console.log(`🏦 Dépôt de ${quantity} ${code} dans la banque.`);
	console.log(`🏦 Nouvelle quantité : ${newQuantity}`);
};

export const has = (code: string, quantity: number = 1): boolean => {
	const item = items.get(code);
	if (!item) {
		return false;
	}
	return item.quantity >= quantity;
};

export const howHasInBank = (code: string): number => {
	const item = items.get(code);
	if (!item) {
		return 0;
	}
	return item.quantity;
};

export const retrive = async (
	characterName: string,
	code: string,
	quantity: number,
) => {
	if (!has(code, quantity)) {
		throw new Error(`❌ Vous n'avez pas assez de ${code} dans votre banque.`);
	}
	const item = items.get(code);
	if (!item) {
		throw new Error(`❌ L'item ${code} n'existe pas dans la banque.`);
	}
	await moveToBank(characterName);
	await withdrawToBank(characterName, code, quantity);
	const newQuantity = item.quantity - quantity;
	items.set(code, {
		code,
		quantity: newQuantity,
	});
	console.log(`🏦 Retrait de ${quantity} ${code} de la banque.`);
	console.log(`🏦 Nouvelle quantité : ${newQuantity}`);
};
