import { ListTasksUseCase } from '@/application/useCases';
import { ITaskRepository, Task } from '@/domain';
import { faker } from '@faker-js/faker';
import { MockProxy, mock } from 'jest-mock-extended';

function createFakeTaskList(size: number) {
  const taskList: Task[] = [];

  for (let count = 0; count < size; count += 1) {
    const task = new Task({
      name: `Task ${count}`,
      description: 'any_description',
    });

    taskList.push(task);
  }

  return taskList;
}

describe('ListTasksUseCase', () => {
  let sut: ListTasksUseCase;
  let taskRepositoryStub: MockProxy<ITaskRepository>;

  let fakeTaskList: Task[];
  let listSize: number;

  beforeAll(() => {
    taskRepositoryStub = mock();

    listSize = faker.number.int({ min: 0, max: 50 });
    fakeTaskList = createFakeTaskList(listSize);

    taskRepositoryStub.list.mockResolvedValue(fakeTaskList);
  });

  beforeEach(() => {
    sut = new ListTasksUseCase(taskRepositoryStub);
  });

  it('should call taskRepository.list with correct params', async () => {
    await sut.execute();

    expect(taskRepositoryStub.list).toHaveBeenCalledWith();
    expect(taskRepositoryStub.list).toHaveBeenCalledTimes(1);
  });

  it('should throw if taskRepository.list throws', async () => {
    taskRepositoryStub.list.mockRejectedValueOnce(new Error());

    const promise = sut.execute();

    expect(promise).rejects.toThrow();
  });

  it('should return a task list on success', async () => {
    const result = await sut.execute();

    expect(result.length).toBe(listSize);
    expect(result).toEqual(fakeTaskList);
  });
});
