import { FindTaskUseCase } from '@/application/useCases';
import { ITaskRepository, Task } from '@/domain';
import { MockProxy, mock } from 'jest-mock-extended';

describe('FindTaskUseCase', () => {
  let sut: FindTaskUseCase;
  let taskRepositoryStub: MockProxy<ITaskRepository>;

  let fakeTask: Task;

  beforeAll(() => {
    taskRepositoryStub = mock();

    fakeTask = new Task({
      name: 'any_name',
      description: 'any_description',
    });

    taskRepositoryStub.findOne.mockResolvedValue(fakeTask);
  });

  beforeEach(() => {
    sut = new FindTaskUseCase(taskRepositoryStub);
  });

  it('should call taskRepository.findOne with correct params', async () => {
    await sut.execute(fakeTask.id);

    expect(taskRepositoryStub.findOne).toHaveBeenCalledWith(fakeTask.id);
    expect(taskRepositoryStub.findOne).toHaveBeenCalledTimes(1);
  });

  it('should throw if taskRepository.findOne throws', async () => {
    taskRepositoryStub.findOne.mockRejectedValueOnce(new Error());

    const promise = sut.execute(fakeTask.id);

    expect(promise).rejects.toThrow();
  });

  it('should return a task on success', async () => {
    const result = await sut.execute(fakeTask.id);

    expect(result).toEqual(fakeTask);
  });
});
