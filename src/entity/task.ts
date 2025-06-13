import { getItemDependency, getQuantityByCraft, isItem } from "../store/item";
import taskBus from "../store/taskBus";
import type { TaskDefinition, TaskStatus, TaskType } from "../types/task";

export class Task {
  id: string;
  name: string;
  code: string;
  dependencies: Set<string>;
  dependents: Set<string> = new Set();
  status: TaskStatus;
  type: TaskType;

  constructor(def: TaskDefinition) {
    this.id = crypto.randomUUID();
    this.name = def.name;
    this.type = def.type;
    this.code = def.code;

    this.dependencies = new Set();
    const dependencies = getItemDependency(def.code);
    for (const dep of dependencies) {
      const depTask = new Task({
        name: dep.code,
        type: isItem(dep.code) ? 'craft' : 'gather',
        code: dep.code,
        quantity: Math.ceil(
          (dep.quantity * def.quantity) /
          (isItem(dep.code) ? getQuantityByCraft(dep.code) : 1)
        ),
        isDependencyFor: this.id
      });
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
