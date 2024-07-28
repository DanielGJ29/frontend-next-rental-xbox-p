export interface IAddToCart {
  productId: { id: number; articleType: number };
  clientId: number;
  quantity: number;
}

export interface IAddToCartMultiple {
  productId: { id: number[]; articleType: number };
  clientId: number;
  quantity: number;
}

export interface IDeleteProductFromCart {
  productId: number;
  clientId: number;
  articleType: number;
}

export interface IRented {
  clientId: number;
  startDate: string;
  endDate: string;
  pay: number;
}
