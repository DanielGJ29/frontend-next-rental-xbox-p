import axiosServices from '@/utils/axios';

//Interface
import { INewNameconsoles, INewConsole, INewModel, INewGamepad } from '@/interfaces/consoles';

//CRUD CONSOLES
export const getAllConsoles = async () => {
  const response = await axiosServices.get('/videoGames');
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

export const NewConsole = async (body: FormData) => {
  const response = await axiosServices.post('/videoGames', body);
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

export const getByIdConsole = async (id: number) => {
  const response = await axiosServices.get(`/videoGames/${id}`);
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

export const updateConsole = async (id: number, body: FormData) => {
  const response = await axiosServices.patch(`/videoGames/${id}`, body);
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

export const deleteConsole = async (id: number) => {
  const response = await axiosServices.delete(`/videoGames/${id}`);
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

export const getSerialNumberConsole = async () => {
  const response = await axiosServices.get(`/videoGame/serialNumber`);
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

//CRUD NAME CONSOLES
export const getAllConsolesNames = async () => {
  const response = await axiosServices.get('/videoGameName');
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

export const newConsolesNames = async (body: INewNameconsoles) => {
  const response = await axiosServices.post('/videoGameName', body);
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

export const updateConsolesNames = async (id: number, body: INewNameconsoles) => {
  const response = await axiosServices.patch(`/videoGameName/${id}`, body);
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

export const getByIdConsolesNames = async (id: number) => {
  const response = await axiosServices.get(`/videoGameName/${id}`);
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

export const deleteByIdConsolesNames = async (id: number) => {
  const response = await axiosServices.delete(`/videoGameName/${id}`);
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

//CRUD NAME MODELS
export const getAllModels = async () => {
  const response = await axiosServices.get('/videoGameModel');
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

export const newModels = async (body: INewModel) => {
  const response = await axiosServices.post('/videoGameModel', body);
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

export const updateModels = async (id: number, body: INewModel) => {
  const response = await axiosServices.patch(`/videoGameModel/${id}`, body);
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

export const getByIdModels = async (id: number) => {
  const response = await axiosServices.get(`/videoGameModel/${id}`);
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

export const deleteByIdModels = async (id: number) => {
  const response = await axiosServices.delete(`/videoGameModel/${id}`);
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

//CRUD GAMEPADS

export const getGamepads = async () => {
  const response = await axiosServices.get(`/gamepads`);
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

export const getByIdGamepads = async (id: number) => {
  const response = await axiosServices.get(`/gamepads/${id}`);
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

export const newGamepad = async (body: INewGamepad) => {
  const response = await axiosServices.post(`/gamepads`, body);
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

export const updateGamepad = async (id: number, body: INewGamepad) => {
  const response = await axiosServices.patch(`/gamepads/${id}`, body);
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

export const deleteByIdGamepad = async (id: number) => {
  const response = await axiosServices.delete(`/gamepads/${id}`);
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};
