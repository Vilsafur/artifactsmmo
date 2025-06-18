import type { CharacterToCreate } from "../../types/team";
import { api } from "../client";
import type { Character } from "./type";

export default async function create(
	config: CharacterToCreate,
): Promise<Character> {
	const res = await api.post("/characters/create", {
		name: config.name,
		skin: config.skin,
	});

	return res.data.data;
}
