export interface INewNameconsoles {
  name: string;
}

export interface INameConsoles extends INewNameconsoles {
  id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
