import { ApplicationError, ITaskRepository, TASK_STATUS_CODE } from '@/domain';
import { inject, injectable } from 'tsyringe';
import { IEndTaskUseCase } from '../types/contracts/IEndTaskUseCase';

@injectable()
export class EndTaskUseCase implements IEndTaskUseCase {
  constructor(
    @inject('TaskRepository') private taskRepository: ITaskRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const foundTask = await this.taskRepository.findOne(id);

    if (!foundTask) {
      throw new ApplicationError('Tarefa não encontrada');
    }

    await this.taskRepository.update({
      id,
      status: {
        code: TASK_STATUS_CODE.COMPLETED,
        updatedAt: new Date(),
      },
    });
  }
}
