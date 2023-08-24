import { ApplicationError, ITaskRepository, Task } from '@/domain';
import { CreateTaskDTO, UpdateTaskDTO } from '@/domain/interfaces/dtos';

export class InMemoryTaskRepository implements ITaskRepository {
  private readonly tasks: Task[] = [];

  async create({ name, description }: CreateTaskDTO): Promise<Task> {
    const task = new Task({ name, description });

    this.tasks.push(task);

    return task;
  }

  async list(): Promise<Task[]> {
    return this.tasks;
  }

  async findOne(id: string): Promise<Task | undefined> {
    const task = this.tasks.find(task => task.id === id);

    return task;
  }

  async update({
    id,
    name,
    description,
    status,
  }: UpdateTaskDTO): Promise<Task> {
    const taskIndex = this.tasks.findIndex(task => task.id === id);

    if (taskIndex < 0) {
      throw new ApplicationError('Tarefa não encontrada');
    }

    const taskFound = this.tasks[taskIndex];

    const updatedTask: Task = {
      id,
      name: name ?? taskFound.name,
      description: description ?? taskFound.description,
      status: status ?? taskFound.status,
      createdAt: taskFound.createdAt,
      updatedAt: new Date(),
    };

    this.tasks[taskIndex] = updatedTask;

    return updatedTask;
  }

  async delete(id: string): Promise<void> {
    const taskIndex = this.tasks.findIndex(task => task.id === id);

    if (taskIndex < 0) {
      throw new ApplicationError('Tarefa não encontrada');
    }

    this.tasks.splice(taskIndex, 1);
  }
}
