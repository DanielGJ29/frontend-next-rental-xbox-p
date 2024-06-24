import { addToCart, getClientCart } from '../endpoints/rents';

//INTERFACES
import { IAddToCart } from '../../interfaces/rent';

export class RentAPI implements RentAPI {
  addToCart = (body: IAddToCart) => {
    return addToCart(body);
  };

  getClientCart = (id: string) => {
    return getClientCart(id);
  };
}
