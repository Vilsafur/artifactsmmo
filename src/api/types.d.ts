// Réponse générique d'API (ex: { data: T })
export interface ApiResponse<T> {
	data: T;
	total?: number;
	page?: number;
	size?: number;
	pages?: number;
}

type cooldownReason =
	| "movement"
	| "fight"
	| "crafting"
	| "gathering"
	| "buy_ge"
	| "sell_ge"
	| "buy_npc"
	| "sell_npc"
	| "cancel_ge"
	| "delete_item"
	| "deposit"
	| "withdraw"
	| "deposit_gold"
	| "withdraw_gold"
	| "equip"
	| "unequip"
	| "task"
	| "christmas_exchange"
	| "recycling"
	| "rest"
	| "use"
	| "buy_bank_expansion";

export interface cooldown {
	total_seconds: number;
	remaining_seconds: number;
	started_at: string;
	expiration: string;
	reason: cooldownReason;
}
