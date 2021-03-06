import { ITaskMySuffix } from './task-my-suffix.model';

export interface IJobMySuffix {
  id?: number;
  jobTitle?: string;
  minSalary?: number;
  maxSalary?: number;
  employeeId?: number;
  tasks?: ITaskMySuffix[];
}

export const defaultValue: Readonly<IJobMySuffix> = {};
