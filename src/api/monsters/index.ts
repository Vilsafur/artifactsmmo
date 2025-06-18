import { api } from "../client";
import type { ApiResponse } from "../types";
import type { Monster } from "./type";

export default async function getAll(): Promise<Monster[]> {
	const monsters = [];
	console.log(`📡 Récupération de la page 1`);
	let res = await api.get<ApiResponse<Monster[]>>("/maps");
	monsters.push(...res.data.data);

	while ((res.data.page ?? 1) < (res.data.pages ?? 1)) {
		const nextPage = (res.data.page ?? 1) + 1;
		console.log(`📡 Récupération de la page ${nextPage}`);
		res = await api.get<ApiResponse<Monster[]>>(`/maps?page=${nextPage}`);
		monsters.push(...res.data.data);
	}

	return monsters;
}
