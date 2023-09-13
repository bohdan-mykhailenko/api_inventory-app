export interface OrderDetails {
  id: number;
  productCount: number;
  sumOfPrice: {
    value: number;
    symbol: string;
  }[];
}
