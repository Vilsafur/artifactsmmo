import { team } from "../../store/team";

export async function debugSkillsLevels() {
	const regex = /level$/i;
	const keys = Object.keys(team[0]).filter((k) => regex.test(k));
	console.table(Object.fromEntries(team.map((p) => [p.name, p])), keys);
}
