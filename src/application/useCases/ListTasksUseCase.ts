import { ITaskRepository, Task } from '@/domain';
import { IListTasksUseCase } from '../types/contracts';

export class ListTasksUseCase implements IListTasksUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(): Promise<Task[]> {
    const tasks = await this.taskRepository.list();
    return tasks;
  }
}
