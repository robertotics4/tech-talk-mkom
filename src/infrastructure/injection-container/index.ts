import { container } from 'tsyringe';
import { ITaskRepository } from '@/domain';
import { InMemoryTaskRepository } from '../repository';

container.registerSingleton<ITaskRepository>(
  'TaskRepository',
  InMemoryTaskRepository,
);
