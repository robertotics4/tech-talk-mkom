import { ITaskRepository, Task } from '@/domain';
import { inject, injectable } from 'tsyringe';
import { CreateTask, ICreateTaskUseCase } from '../types/contracts';

@injectable()
export class CreateTaskUseCase implements ICreateTaskUseCase {
  constructor(
    @inject('TaskRepository')
    private taskRepository: ITaskRepository,
  ) {}

  async execute({ name, description }: CreateTask.Input): Promise<Task> {
    const result = await this.taskRepository.create({
      name,
      description,
    });

    return result;
  }
}
