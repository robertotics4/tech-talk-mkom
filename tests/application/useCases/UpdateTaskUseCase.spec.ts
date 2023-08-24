import { UpdateTask } from '@/application/types/contracts';
import { UpdateTaskUseCase } from '@/application/useCases';
import { ApplicationError, ITaskRepository, Task } from '@/domain';
import { faker } from '@faker-js/faker';
import { MockProxy, mock } from 'jest-mock-extended';

describe('UpdateTaskUseCase', () => {
  let sut: UpdateTaskUseCase;
  let taskRepositoryStub: MockProxy<ITaskRepository>;

  let input: UpdateTask.Input;
  let fakeTask: Task;

  beforeAll(() => {
    taskRepositoryStub = mock();

    input = {
      id: faker.string.uuid(),
      name: 'any_name',
      description: 'any_description',
    };

    fakeTask = new Task({
      name: 'any_name',
      description: 'any_description',
    });

    taskRepositoryStub.findOne.mockResolvedValue(
      Object.assign(fakeTask, {
        updatedAt: new Date(),
      }),
    );
  });

  beforeEach(() => {
    sut = new UpdateTaskUseCase(taskRepositoryStub);
  });

  it('should call taskRepository.findOne with correct params', async () => {
    await sut.execute(input);

    expect(taskRepositoryStub.findOne).toHaveBeenCalledWith(input.id);
    expect(taskRepositoryStub.findOne).toHaveBeenCalledTimes(1);
  });

  it('should throw if taskRepository.findOne throws', async () => {
    taskRepositoryStub.findOne.mockRejectedValueOnce(new Error());

    const promise = sut.execute(input);

    expect(promise).rejects.toThrow();
  });

  it('should throw applicationError when finding a non-existent task', async () => {
    taskRepositoryStub.findOne.mockResolvedValueOnce(undefined);

    const promise = sut.execute(input);

    expect(promise).rejects.toThrow();
    expect(promise).rejects.toEqual(
      new ApplicationError('Tarefa não encontrada'),
    );
  });

  it('should call taskRepository.update with correct params', async () => {
    await sut.execute(input);

    expect(taskRepositoryStub.update).toHaveBeenCalledWith(input);
    expect(taskRepositoryStub.update).toHaveBeenCalledTimes(1);
  });

  it('should throw if taskRepository.update throws', async () => {
    taskRepositoryStub.update.mockRejectedValueOnce(new Error());

    const promise = sut.execute(input);

    expect(promise).rejects.toThrow();
  });

  it('should return a task on success', async () => {
    const updatedTask = Object.assign(fakeTask, {
      name: 'new_name',
      updatedAt: new Date(),
    });
    taskRepositoryStub.update.mockResolvedValueOnce(updatedTask);

    const result = await sut.execute(input);

    expect(result).toEqual(updatedTask);
  });
});
