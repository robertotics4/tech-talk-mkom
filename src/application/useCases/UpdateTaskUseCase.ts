import { ApplicationError, ITaskRepository, Task } from '@/domain';
import { inject, injectable } from 'tsyringe';
import { IUpdateTaskUseCase, UpdateTask } from '../types/contracts';

@injectable()
export class UpdateTaskUseCase implements IUpdateTaskUseCase {
  constructor(
    @inject('TaskRepository') private taskRepository: ITaskRepository,
  ) {}

  async execute({ id, name, description }: UpdateTask.Input): Promise<Task> {
    const foundTask = await this.taskRepository.findOne(id);

    if (!foundTask) {
      throw new ApplicationError('Tarefa não encontrada');
    }

    const result = await this.taskRepository.update({
      id,
      name,
      description,
    });

    return result as Task;
  }
}
