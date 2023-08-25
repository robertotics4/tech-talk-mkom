import { ITaskRepository, Task } from '@/domain';
import { inject, injectable } from 'tsyringe';
import { IFindTaskUseCase } from '../types/contracts';

@injectable()
export class FindTaskUseCase implements IFindTaskUseCase {
  constructor(
    @inject('TaskRepository') private taskRepository: ITaskRepository,
  ) {}

  async execute(id: string): Promise<Task | undefined> {
    const foundTask = await this.taskRepository.findOne(id);
    return foundTask;
  }
}
