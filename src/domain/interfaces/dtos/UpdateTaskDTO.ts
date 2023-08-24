import { TASK_STATUS_CODE } from '@/domain/entities';

export type UpdateTaskDTO = {
  id: string;
  name?: string;
  description?: string;
  status?: {
    code: TASK_STATUS_CODE;
    updatedAt: Date;
  };
};
