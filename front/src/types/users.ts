export enum JobRole{
  SUPERUSER = 'SUPERUSER',
  ADMIN = 'ADMIN',
  USER = 'USER',
}
export interface CreateUser {
  name: string;
  email: string;
  password: string;
  jobRole: JobRole;
}

export interface User {
  name: string;
  email: string;
  jobRole: JobRole;
}


