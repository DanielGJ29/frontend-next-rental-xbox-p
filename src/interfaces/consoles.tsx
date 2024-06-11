//Name consoles
export interface INewNameconsoles {
  name: string;
}

export interface INameConsoles extends INewNameconsoles {
  id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

//Consoles
export interface INewConsole {
  nameId: string;
  modelId: string;
  color: string;
  serialNumber: string;
  hardHDD: string;
  img: string | File;
}

export interface IConsole {
  id: number;
  nameId: string;
  modelId: string;
  color: string;
  serialNumber: string;
  hardHDD: string;
  img: string | File;
  videoGameName: { name: string };
  videoGameModel: { model: string };
}

//models consoles
export interface INewModel {
  model: string;
  rentalPrice: number;
}

export interface IModels extends INewModel {
  id: number;
}
