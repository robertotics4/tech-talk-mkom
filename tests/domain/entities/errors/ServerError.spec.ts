import { ServerError } from '@/domain/entities/errors/ServerError';

describe('ServerError', () => {
  it('create an server error', () => {
    const result = new ServerError();

    expect(result.message).toBe('Erro interno do servidor');
    expect(result.statusCode).toBe(500);
  });
});
