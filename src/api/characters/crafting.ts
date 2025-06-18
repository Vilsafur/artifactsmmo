import { delay } from "../../utils/time";
import { api } from "../client";
import type { ApiResponse } from "../types";
import type { SkillDataSchema } from "./type";

export default async function crafting(
	name: string,
	itemCode: string,
	quantity: number = 1,
): Promise<SkillDataSchema> {
	const res = await api.post<ApiResponse<SkillDataSchema>>(
		`/my/${name}/action/crafting`,
		{
			code: itemCode,
			quantity: quantity,
		},
	);
	await delay(res.data.data.cooldown.remaining_seconds * 1000);

	return res.data.data;
}
