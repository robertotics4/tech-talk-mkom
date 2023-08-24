import { Task } from '@/domain';

export namespace UpdateTask {
  export type Input = {
    id: string;
    name?: string;
    description?: string;
  };
}

export interface IUpdateTaskUseCase {
  execute(data: UpdateTask.Input): Promise<Task>;
}
