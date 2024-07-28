import axiosServices from '@/utils/axios';

//CRUD CLIENT
export const newClient = async (body: FormData) => {
  const response = await axiosServices.post(`/clients`, body);
  const result = response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

export const getClients = async () => {
  const response = await axiosServices.get(`/clients`);
  const result = response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

export const getByIdClients = async (id: number) => {
  const response = await axiosServices.get(`/clients/${id}`);
  const result = response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

export const updateByIdClient = async (id: number, body: FormData) => {
  const response = await axiosServices.patch(`/clients/${id}`, body);
  const result = response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

export const deleteByIdClient = async (id: number) => {
  const response = await axiosServices.delete(`/clients/${id}`);
  const result = response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

//SEARCH CLIENTE

export const searchClientByKeyword = async (keyword: string) => {
  const response = await axiosServices.get(`/clients/searchByKeyword/${keyword}`);
  const result = response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};
