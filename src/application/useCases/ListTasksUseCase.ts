import { ITaskRepository, Task } from '@/domain';
import { inject, injectable } from 'tsyringe';
import { IListTasksUseCase } from '../types/contracts';

@injectable()
export class ListTasksUseCase implements IListTasksUseCase {
  constructor(
    @inject('TaskRepository') private taskRepository: ITaskRepository,
  ) {}

  async execute(): Promise<Task[]> {
    const tasks = await this.taskRepository.list();
    return tasks;
  }
}
