export class ServerError extends Error {
  public readonly statusCode: number;

  constructor() {
    super();
    this.message = 'Erro interno do servidor';
    this.statusCode = 500;
  }
}
