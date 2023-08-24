import { ITaskRepository, TASK_STATUS_CODE } from '@/domain';
import { IEndTaskUseCase } from '../types/contracts/IEndTaskUseCase';

export class EndTaskUseCase implements IEndTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(id: string): Promise<void> {
    const foundTask = await this.taskRepository.findOne(id);

    if (!foundTask) {
      throw new Error('Tarefa não encontrada');
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
