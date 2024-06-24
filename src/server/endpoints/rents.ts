import axiosServices from '@/utils/axios';

//INTERFACES
import { IAddToCart } from '@/interfaces/rent';

export const newRent = async () => {};

export const addToCart = async (body: IAddToCart) => {
  const response = await axiosServices.post('/carts', body);
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

export const getClientCart = async (id: string) => {
  const response = await axiosServices.get(`/carts/${id}`);
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};
