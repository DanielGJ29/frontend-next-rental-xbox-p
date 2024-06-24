export interface IAddToCart {
  productId: { id: number; articleType: number };
  clientId: number;
  quantity: number;
}
