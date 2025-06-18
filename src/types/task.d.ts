export type TaskStatus = "blocked" | "ready" | "in-progress" | "completed";
export type TaskType = "craft" | "gather";

export interface TaskDefinition {
	name: string;
	type: TaskType;
	code: string;
	quantity: number;
	isDependencyFor?: string;
}
