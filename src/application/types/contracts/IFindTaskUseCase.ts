import { Task } from '@/domain';

export interface IFindTaskUseCase {
  execute(id: string): Promise<Task | undefined>;
}
