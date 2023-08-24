import { DeleteTaskUseCase } from '@/application/useCases';
import { ApplicationError, ITaskRepository, Task } from '@/domain';
import { MockProxy, mock } from 'jest-mock-extended';

describe('DeleteTaskUseCase', () => {
  let sut: DeleteTaskUseCase;
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
    sut = new DeleteTaskUseCase(taskRepositoryStub);
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

  it('should throw applicationError when finding a non-existent task', async () => {
    taskRepositoryStub.findOne.mockResolvedValueOnce(undefined);

    const promise = sut.execute(fakeTask.id);

    expect(promise).rejects.toThrow();
    expect(promise).rejects.toEqual(
      new ApplicationError('Tarefa não encontrada'),
    );
  });

  it('should call taskRepository.delete with correct params', async () => {
    await sut.execute(fakeTask.id);

    expect(taskRepositoryStub.delete).toHaveBeenCalledWith(fakeTask.id);
    expect(taskRepositoryStub.delete).toHaveBeenCalledTimes(1);
  });

  it('should throw if taskRepository.delete throws', async () => {
    taskRepositoryStub.delete.mockRejectedValueOnce(new Error());

    const promise = sut.execute(fakeTask.id);

    expect(promise).rejects.toThrow();
  });
});
