import {
  CreateTaskUseCase,
  DeleteTaskUseCase,
  EndTaskUseCase,
  FindTaskUseCase,
  ListTasksUseCase,
  UpdateTaskUseCase,
} from '@/application/useCases';
import { Router } from 'express';
import { container } from 'tsyringe';

const taskRoutes = Router();

taskRoutes.post('/', async (request, response) => {
  const { name, description } = request.body;

  const createTaskUseCase = container.resolve(CreateTaskUseCase);
  const result = await createTaskUseCase.execute({ name, description });

  return response.status(201).json(result);
});

taskRoutes.get('/', async (request, response) => {
  const listTasksUseCase = container.resolve(ListTasksUseCase);
  const result = await listTasksUseCase.execute();

  return response.json(result);
});

taskRoutes.get('/:id', async (request, response) => {
  const { id } = request.params;

  const findTaskUseCase = container.resolve(FindTaskUseCase);
  const result = await findTaskUseCase.execute(id);

  return response.json(result);
});

taskRoutes.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name, description } = request.body;

  const updateTaskUseCase = container.resolve(UpdateTaskUseCase);
  const result = await updateTaskUseCase.execute({ id, name, description });

  return response.json(result);
});

taskRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteTaskUseCase = container.resolve(DeleteTaskUseCase);
  const result = await deleteTaskUseCase.execute(id);

  return response.status(204).json(result);
});

taskRoutes.patch('/:id/end', async (request, response) => {
  const { id } = request.params;

  const endTaskUseCase = container.resolve(EndTaskUseCase);
  const result = await endTaskUseCase.execute(id);

  return response.status(204).json(result);
});

export { taskRoutes };
