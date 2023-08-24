import { EndTaskUseCase } from '@/application/useCases';
import {
  ApplicationError,
  ITaskRepository,
  TASK_STATUS_CODE,
  Task,
} from '@/domain';
import { MockProxy, mock } from 'jest-mock-extended';

describe('EndTaskUseCase', () => {
  let sut: EndTaskUseCase;
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
    sut = new EndTaskUseCase(taskRepositoryStub);
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

  it('should call taskRepository.update with correct params', async () => {
    await sut.execute(fakeTask.id);

    expect(taskRepositoryStub.update).toHaveBeenCalledWith({
      id: fakeTask.id,
      status: {
        code: TASK_STATUS_CODE.COMPLETED,
        updatedAt: expect.anything(),
      },
    });
    expect(taskRepositoryStub.update).toHaveBeenCalledTimes(1);
  });

  it('should throw if taskRepository.update throws', async () => {
    taskRepositoryStub.update.mockRejectedValueOnce(new Error());

    const promise = sut.execute(fakeTask.id);

    expect(promise).rejects.toThrow();
  });
});
