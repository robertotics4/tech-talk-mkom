import { CreateTaskUseCase } from '@/application/useCases';
import { ITaskRepository, TASK_STATUS_CODE, Task } from '@/domain';
import { ServerError } from '@/domain/entities/errors/ServerError';
import { MockProxy, mock } from 'jest-mock-extended';

describe('CreateTaskUseCase', () => {
  let sut: CreateTaskUseCase;
  let taskRepositoryStub: MockProxy<ITaskRepository>;

  beforeAll(() => {
    taskRepositoryStub = mock();

    taskRepositoryStub.create.mockResolvedValue(
      new Task({
        name: 'any_name',
        description: 'any_description',
      }),
    );
  });

  beforeEach(() => {
    sut = new CreateTaskUseCase(taskRepositoryStub);
  });

  it('should call taskRepository.create with correct params', async () => {
    await sut.execute({
      name: 'any_name',
      description: 'any_description',
    });

    expect(taskRepositoryStub.create).toHaveBeenCalledWith({
      name: 'any_name',
      description: 'any_description',
    });
    expect(taskRepositoryStub.create).toHaveBeenCalledTimes(1);
  });

  it('should throw if taskRepository.create throws', async () => {
    taskRepositoryStub.create.mockRejectedValueOnce(new ServerError());

    expect(async () => {
      await sut.execute({
        name: 'any_name',
        description: 'any_description',
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it('should return a task on success', async () => {
    const result = await sut.execute({
      name: 'any_name',
      description: 'any_description',
    });

    expect(result.id).toBeDefined();
    expect(result).toEqual({
      id: expect.any(String),
      name: 'any_name',
      description: 'any_description',
      status: {
        code: TASK_STATUS_CODE.PENDING,
        updatedAt: expect.anything(),
      },
      createdAt: expect.anything(),
      updatedAt: expect.anything(),
    });
  });
});
