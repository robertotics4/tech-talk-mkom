import { Task } from '../../entities';
import { CreateTaskDTO, UpdateTaskDTO } from '../dtos';

export interface ITaskRepository {
  create(data: CreateTaskDTO): Promise<Task>;
  list(): Promise<Task[]>;
  findOne(id: string): Promise<Task | undefined>;
  update(data: UpdateTaskDTO): Promise<Task | undefined>;
  delete(id: string): Promise<boolean>;
}
