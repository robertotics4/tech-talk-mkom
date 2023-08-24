export enum TASK_STATUS_CODE {
  PENDING = 0,
  COMPLETED = 1,
}

export const TASK_STATUS_CODE_STRING = {
  [TASK_STATUS_CODE.PENDING]: 'Pendente',
  [TASK_STATUS_CODE.COMPLETED]: 'Completa',
};

export class Task {
  id?: string;

  name?: string;

  description?: string;

  status?: {
    code: TASK_STATUS_CODE;
    updatedAt: Date;
  };

  createdAt?: Date;

  updatedAt?: Date;

  constructor(task: Task) {
    Object.assign(this, task);
  }
}
