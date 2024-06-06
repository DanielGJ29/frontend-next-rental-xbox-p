import axiosServices from '@/utils/axios';

//Interface
import { INewNameconsoles } from '@/interfaces/consoles';

export const getAllConsoles = async () => {
  const response = await axiosServices.get('/videoGames');
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

export const newModels = async (body: INewNameconsoles) => {
  const response = await axiosServices.post('/videoGameModel', body);
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

export const updateModels = async (id: number, body: INewNameconsoles) => {
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
