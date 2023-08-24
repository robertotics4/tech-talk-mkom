import { Task } from '@/domain';

export namespace CreateTask {
  export type Input = {
    name: string;
    description?: string;
  };
}

export interface ICreateTaskUseCase {
  execute(data: CreateTask.Input): Promise<Task>;
}
