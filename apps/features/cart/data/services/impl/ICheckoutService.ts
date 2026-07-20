export type CheckoutServiceInput = {
  nextOrderNumber: number;
  orderIdPrefix: string;
  orderDetails: CheckoutOrderItem[];
};

export type CheckoutOrderItem = {
  foodId: string;
  productName: string;
  quantity: number;
  price: number;
  totalPrice: number;
};

export type CheckoutServiceOutput = {
  orderId: string;
};
