import { ApplicationError, ITaskRepository } from '@/domain';
import { IDeleteTaskUseCase } from '../types/contracts';

export class DeleteTaskUseCase implements IDeleteTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(id: string): Promise<void> {
    const foundTask = await this.taskRepository.findOne(id);

    if (!foundTask) {
      throw new ApplicationError('Tarefa não encontrada');
    }

    await this.taskRepository.delete(id);
  }
}
