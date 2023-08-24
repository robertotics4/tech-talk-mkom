import { Task } from '@/domain/entities';

describe('Task', () => {
  it('should create a task', () => {
    const result = new Task({
      name: 'any_name',
      description: 'any_description',
    });

    expect(result).toHaveProperty('id');
    expect(result).toEqual({
      id: expect.any(String),
      name: 'any_name',
      description: 'any_description',
      status: {
        code: 0,
        updatedAt: expect.anything(),
      },
      createdAt: expect.anything(),
      updatedAt: expect.anything(),
    });
  });
});
