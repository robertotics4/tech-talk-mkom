import { ApplicationError, ITaskRepository, Task } from '@/domain';
import { CreateTaskDTO, UpdateTaskDTO } from '@/domain/interfaces/dtos';
import { InMemoryTaskRepository } from '@/infrastructure/repository/implementation/InMemoryTaskRepository';

describe('InMemoryTaskRepository', () => {
  let sut: ITaskRepository;

  beforeEach(() => {
    sut = new InMemoryTaskRepository();
  });

  it('should create a task', async () => {
    const createTaskDTO: CreateTaskDTO = {
      name: 'any_name',
      description: 'any_description',
    };

    const createdTask = await sut.create(createTaskDTO);

    expect(createdTask).toBeInstanceOf(Task);
    expect(createdTask.id).toBeDefined();
    expect(createdTask.name).toBe('any_name');
    expect(createdTask.description).toBe('any_description');
  });

  it('should be able to list all tasks', async () => {
    const tasks = await sut.list();

    expect(Array.isArray(tasks)).toBe(true);
  });

  it('should be able to find a task', async () => {
    const createTaskDTO: CreateTaskDTO = {
      name: 'any_name',
      description: 'any_description',
    };

    const createdTask = await sut.create(createTaskDTO);

    const result = await sut.findOne(createdTask.id);

    expect(result).toEqual(createdTask);
  });

  it('should update a task name', async () => {
    const createTaskDTO: CreateTaskDTO = {
      name: 'any_name',
      description: 'any_description',
    };

    const createdTask = await sut.create(createTaskDTO);

    const updateTaskDTO: UpdateTaskDTO = {
      id: createdTask.id,
      name: 'new_name',
    };

    const updatedTask = await sut.update(updateTaskDTO);

    expect(updatedTask.name).toBe('new_name');
    expect(updatedTask.description).toBe('any_description');
    expect(updatedTask.updatedAt).not.toBe(createdTask.updatedAt);
  });

  it('should update a task description', async () => {
    const createTaskDTO: CreateTaskDTO = {
      name: 'any_name',
      description: 'any_description',
    };

    const createdTask = await sut.create(createTaskDTO);

    const updateTaskDTO: UpdateTaskDTO = {
      id: createdTask.id,
      description: 'new_description',
    };

    const updatedTask = await sut.update(updateTaskDTO);

    expect(updatedTask.name).toBe('any_name');
    expect(updatedTask.description).toBe('new_description');
    expect(updatedTask.updatedAt).not.toBe(createdTask.updatedAt);
  });

  it('should throw when updating a non-existing task', async () => {
    expect(async () => {
      const updateTaskDTO: UpdateTaskDTO = {
        id: 'invalid_id',
        name: 'new_name',
      };

      await sut.update(updateTaskDTO);
    }).rejects.toBeInstanceOf(ApplicationError);
  });

  it('deletes a task', async () => {
    const createTaskDTO: CreateTaskDTO = {
      name: 'any_name',
      description: 'any_description',
    };
    const createdTask = await sut.create(createTaskDTO);

    await sut.delete(createdTask.id);

    const tasks = await sut.list();
    expect(tasks.length).toBe(0);
  });

  it('throws an error when deleting a non-existing task', async () => {
    expect(async () => {
      await sut.delete('invalid_id');
    }).rejects.toBeInstanceOf(ApplicationError);
  });
});
