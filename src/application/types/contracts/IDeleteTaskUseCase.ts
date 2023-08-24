export interface IDeleteTaskUseCase {
  execute(id: string): Promise<void>;
}
