import axiosServices from '@/utils/axios';

//INTERFACES
import { IAddToCart, IAddToCartMultiple, IDeleteProductFromCart, IRented } from '@/interfaces/rent';

export const newRent = async () => {};

//ADD TO CART SINGLE
export const addToCart = async (body: IAddToCart) => {
  const response = await axiosServices.post('/carts', body);
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

//ADD TO CART MULTIPLE
export const addToCartMultiple = async (body: IAddToCartMultiple) => {
  const response = await axiosServices.post('/carts/addMultiple', body);
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

//GET CART CLIENT BY ID
export const getClientCart = async (id: string) => {
  const response = await axiosServices.get(`/carts/${id}`);
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

//DELETE PRODUCT TO CART
export const deleteProductTocart = async (body: IDeleteProductFromCart) => {
  const params = {
    productId: body.productId,
    clientId: body.clientId,
    articleType: body.articleType
  };
  const response = await axiosServices.delete('/carts', { data: params });
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

//New Rented
export const rented = async (body: IRented) => {
  const response = await axiosServices.post('/carts/rented', body);
  const result = await response.data;

  if ((result.status = 'success')) {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};

//ITEMS RETURN  RENTED
export const itemReturns = async (id: number) => {
  const response = await axiosServices.get(`/carts/returnArticle/${id}`);
  const result = await response.data;

  return result;
  console.log('response axios', response);
  if (result.status === 'success') {
    return Promise.resolve(result);
  } else {
    return Promise.reject();
  }
};
