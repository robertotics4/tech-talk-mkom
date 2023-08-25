import { ApplicationError, ITaskRepository } from '@/domain';
import { inject, injectable } from 'tsyringe';
import { IDeleteTaskUseCase } from '../types/contracts';

@injectable()
export class DeleteTaskUseCase implements IDeleteTaskUseCase {
  constructor(
    @inject('TaskRepository') private taskRepository: ITaskRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const foundTask = await this.taskRepository.findOne(id);

    if (!foundTask) {
      throw new ApplicationError('Tarefa não encontrada');
    }

    await this.taskRepository.delete(id);
  }
}
