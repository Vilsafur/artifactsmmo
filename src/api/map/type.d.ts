type ContentType =
	| "monster"
	| "resource"
	| "workshop"
	| "bank"
	| "grand_exchange"
	| "tasks_master"
	| "npc";

export interface Tile {
	name: string;
	skin: string;
	x: number;
	y: number;
	content: {
		type: ContentType;
		code: string;
	};
}
