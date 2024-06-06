export interface IUser {
  id: number;
  name: string;
  lastName: string;
  motherLastName: string;
  email: string;
  userName: string;
  avatarUrl: string | File;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface INewUser {
  name: string;
  lastName: string;
  motherLastName: string;
  userName: string;
  email: string;
  password: string;
  avatarUrl: string | File;
  role: string;
}
