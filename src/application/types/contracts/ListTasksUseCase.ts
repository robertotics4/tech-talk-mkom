import { Task } from '@/domain';

export interface IListTasksUseCase {
  execute(): Promise<Task[]>;
}
