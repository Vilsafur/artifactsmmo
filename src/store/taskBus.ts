import type { Task } from "../entity/task";

class TaskBus {
	private queue: Map<string, Task> = new Map();

	add(task: Task): void {
		this.queue.set(task.id, task);
	}

	get(taskId: string): Task | undefined {
		return this.queue.get(taskId);
	}

	getNextReadyTask(): Task | undefined {
		for (const task of this.queue.values()) {
			if (task.isReady()) {
				return task;
			}
		}
		return undefined;
	}

	remove(taskId: string): void {
		if (this.queue.has(taskId)) {
			const task = this.queue.get(taskId);
			if (task?.isDependencyFor) {
				const dependentTask = this.queue.get(task.isDependencyFor);
				if (dependentTask) {
					dependentTask.markDependencyCompleted(taskId);
					console.log(
						`✅ La tâche ${task.name} a été supprimée de la file d'attente et la dépendance a été mise à jour pour ${dependentTask.name}.`,
					);
				} else {
					console.log(
						`❌ La tâche dépendante ${task.isDependencyFor} n'existe pas dans la file d'attente.`,
					);
				}
			}
			this.queue.delete(taskId);
		} else {
			console.log(
				`❌ La tâche avec l'ID ${taskId} n'existe pas dans la file d'attente.`,
			);
		}
		if (this.queue.size === 0) {
			console.log(
				`✅ Toutes les tâches ont été traitées et la file d'attente est vide.`,
			);
		}
	}

	hasTask(taskName: string): boolean {
		for (const task of this.queue.values()) {
			if (task.name === taskName) {
				return true;
			}
		}
		return false;
	}
}

export default new TaskBus();
