export type CheckoutApiBody = {
	nextOrderNumber: number;
	orderIdPrefix: string;
	orderDetails: CheckoutApiOrderItem[];
};

export type CheckoutApiOrderItem = {
	foodId: string;
	productName: string;
	quantity: number;
	price: number;
	totalPrice: number;
};

export type CheckoutApiHeaders = {
	'Content-Type': string;
	'x-feature-name': string;
	'x-mock-platform': string;
};

export type CheckoutApiResponse = {
	orderId?: string;
};