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

  name?: number;

  description?: number;

  status?: {
    code: TASK_STATUS_CODE;
    updatedAt: Date;
  };

  created_at?: Date;

  updated_at?: Date;

  constructor(task: Task) {
    Object.assign(this, task);
  }
}
