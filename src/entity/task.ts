import { getItemDependency, getQuantityByCraft, isCraftable, isItem } from "../store/item";
import taskBus from "../store/taskBus";
import type { TaskDefinition, TaskStatus, TaskType } from "../types/task";

export class Task {
  id: string;
  name: string;
  code: string;
  quantity: number;
  dependencies: Set<string>;
  dependents: Set<string> = new Set();
  isDependencyFor?: string;
  status: TaskStatus;
  type: TaskType;

  constructor(def: TaskDefinition) {
    this.id = crypto.randomUUID();
    this.name = def.name;
    this.type = def.type;
    this.code = def.code;
    this.quantity = def.quantity;
    this.isDependencyFor = def.isDependencyFor;

    this.dependencies = new Set();
    const dependencies = getItemDependency(def.code);
    for (const dep of dependencies) {
      const depTask = new Task({
        name: dep.code,
        type: isCraftable(dep.code) ? 'craft' : 'gather',
        code: dep.code,
        quantity: Math.ceil(
          (dep.quantity * def.quantity) /
          (isCraftable(dep.code) ? getQuantityByCraft(dep.code) : 1)
        ),
        isDependencyFor: this.id
      });
      console.log(`🔗 Dépendance ajoutée: ${depTask.name} (${depTask.code}) pour ${this.name} (${this.code}, type: ${depTask.type})`);
      this.dependencies.add(depTask.id);
      taskBus.add(depTask);
    }

    this.status =  this.dependencies.size > 0 ? 'blocked' : 'ready';
  }

  isReady(): boolean {
    return this.status === 'ready';
  }

  markDependencyCompleted(depId: string) {
    this.dependencies.delete(depId);

    if (this.dependencies.size === 0) {
      this.status = 'ready';
    }
  }
}
