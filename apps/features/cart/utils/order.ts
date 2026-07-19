export function createOrderId(orderNumber: number, orderIdPrefix: string) {
  return `${orderIdPrefix}${orderNumber}`;
}
