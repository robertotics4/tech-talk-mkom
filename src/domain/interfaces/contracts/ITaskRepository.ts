import { Task } from '../../entities';
import { CreateTaskDTO, UpdateTaskDTO } from '../dtos';

export interface ITaskRepository {
  create(data: CreateTaskDTO): Promise<Task>;
  list(): Promise<Task[]>;
  update(data: UpdateTaskDTO): Promise<Task>;
  delete(id: string): Promise<void>;
}
