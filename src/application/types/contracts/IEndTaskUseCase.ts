export interface IEndTaskUseCase {
  execute(id: string): Promise<void>;
}
