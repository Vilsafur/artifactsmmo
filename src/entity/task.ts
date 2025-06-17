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
