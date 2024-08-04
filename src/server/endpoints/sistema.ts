//Axios
import axiosServices from '@/utils/axios';

const BASE_PATH = '';

//CRUD USERS
export const newUser = async (formData: FormData) => {
  const response = await axiosServices.post('/users', formData);
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

export const editUser = async (id: number, formData: FormData) => {
  console.log('formData', formData);
  const response = await axiosServices.patch(`/users/${id}`, formData);
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

export const getUserList = async () => {
  const response = await axiosServices.get(`/users`);
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

export const getUserById = async (id: number) => {
  const response = await axiosServices.get(`/users/${id}`);
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

export const deleteUserById = async (id: number) => {
  const response = await axiosServices.delete(`/users/${id}`);
  const result = await response.data;
  return result;

  // if ((result.status = 'success')) {
  //   return Promise.resolve(result);
  // } else {
  //   return Promise.reject();
  // }
};

//Roles
export const getAllRoles = async () => {
  const response = await axiosServices.get(`/sistema/roles`);
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

//Menu
export const getAllMenu = async () => {
  const response = await axiosServices.get('/sistema/menu');
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  }
};
