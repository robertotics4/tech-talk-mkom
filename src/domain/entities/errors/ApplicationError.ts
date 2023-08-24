export class ApplicationError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}
