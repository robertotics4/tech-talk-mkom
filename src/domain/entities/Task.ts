import { randomUUID } from 'node:crypto';

export enum TASK_STATUS_CODE {
  PENDING = 0,
  COMPLETED = 1,
}

export const TASK_STATUS_CODE_STRING = {
  [TASK_STATUS_CODE.PENDING]: 'Pendente',
  [TASK_STATUS_CODE.COMPLETED]: 'Completa',
};

type TaskProps = {
  name: string;
  description?: string;
};

export class Task {
  id: string;

  name: string;

  description?: string;

  status: {
    code: TASK_STATUS_CODE;
    updatedAt: Date;
  };

  createdAt?: Date;

  updatedAt?: Date;

  constructor({ name, description }: TaskProps) {
    this.id = randomUUID();
    this.name = name;
    this.description = description;
    this.status = {
      code: TASK_STATUS_CODE.PENDING,
      updatedAt: new Date(),
    };
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
