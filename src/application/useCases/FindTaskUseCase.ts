import { ITaskRepository, Task } from '@/domain';
import { IFindTaskUseCase } from '../types/contracts';

export class FindTaskUseCase implements IFindTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(id: string): Promise<Task | undefined> {
    const foundTask = await this.taskRepository.findOne(id);
    return foundTask;
  }
}
