import { ApplicationError } from '@/domain';

describe('ApplicationError', () => {
  it('create an application error without statusCode', () => {
    const result = new ApplicationError('any_error');

    expect(result.message).toBe('any_error');
    expect(result.statusCode).toBe(400);
  });

  it('create an application error with statusCode', () => {
    const result = new ApplicationError('any_error', 404);

    expect(result.message).toBe('any_error');
    expect(result.statusCode).toBe(404);
  });
});
