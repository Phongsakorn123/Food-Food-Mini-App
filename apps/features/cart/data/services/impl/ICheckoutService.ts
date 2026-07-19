export type CheckoutServiceInput = {
  nextOrderNumber: number;
  orderIdPrefix: string;
};

export type CheckoutServiceOutput = {
  orderId: string;
};
