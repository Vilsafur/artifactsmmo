import { Task } from "../entity/task";

class  TaskBus {
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
      this.queue.delete(taskId);
    } else {
      console.log(`❌ La tâche avec l'ID ${taskId} n'existe pas dans la file d'attente.`);
    }
  }
}

export default new TaskBus();
