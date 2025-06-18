export interface SimpleItem {
	code: string;
	quantity: number;
}

export interface Item {
	name: string;
	code: string;
	craft: {
		skill:
			| "weaponcrafting"
			| "gearcrafting"
			| "jewelrycrafting"
			| "cooking"
			| "woodcutting"
			| "mining"
			| "alchemy";
		level: number;
		items: SimpleItem[];
		quantity: number;
	};
}
