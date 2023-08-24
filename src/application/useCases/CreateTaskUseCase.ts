import { ITaskRepository, Task } from '@/domain';
import { CreateTask, ICreateTaskUseCase } from '../types/contracts';

export class CreateTaskUseCase implements ICreateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute({ name, description }: CreateTask.Input): Promise<Task> {
    const result = await this.taskRepository.create({
      name,
      description,
    });

    return result;
  }
}
