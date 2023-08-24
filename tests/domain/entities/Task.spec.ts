import { faker } from '@faker-js/faker';
import { TASK_STATUS_CODE, Task } from '@/domain/entities';

describe('Task', () => {
  it('should create a task', () => {
    const randomUUID = faker.string.uuid();

    const fakeTask: Task = {
      id: randomUUID,
      name: 'any_task',
      description: 'any_description',
      status: {
        code: TASK_STATUS_CODE.PENDING,
        updatedAt: new Date(),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = new Task(fakeTask);

    expect(result).toEqual(fakeTask);
  });
});
