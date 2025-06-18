import { api } from "../client";
import type { SimpleItem } from "../items/type";
import type { ApiResponse } from "../types";

export default async function getAll(): Promise<SimpleItem[]> {
	const items = [];
	console.log(`📡 Récupération de la page 1`);
	let res = await api.get<ApiResponse<SimpleItem[]>>("/my/bank/items");
	items.push(...res.data.data);

	while ((res.data.page ?? 1) < (res.data.pages ?? 1)) {
		const nextPage = (res.data.page ?? 1) + 1;
		console.log(`📡 Récupération de la page ${nextPage}`);
		res = await api.get<ApiResponse<SimpleItem[]>>(`/maps?page=${nextPage}`);
		items.push(...res.data.data);
	}

	return items;
}
