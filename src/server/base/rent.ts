import { addToCart, getClientCart, addToCartMultiple, deleteProductTocart, rented } from '../endpoints/rents';

//INTERFACES
import { IAddToCart, IAddToCartMultiple, IDeleteProductFromCart, IRented } from '../../interfaces/rent';

export class RentAPI implements RentAPI {
  addToCart = (body: IAddToCart) => {
    return addToCart(body);
  };

  addToCartMultiple = (body: IAddToCartMultiple) => {
    return addToCartMultiple(body);
  };

  getClientCart = (id: string) => {
    return getClientCart(id);
  };

  deleteProductTocart = (body: IDeleteProductFromCart) => {
    return deleteProductTocart(body);
  };

  rented = (body: IRented) => {
    return rented(body);
  };
}
