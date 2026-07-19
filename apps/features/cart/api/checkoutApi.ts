import { createOrderId } from '../utils/order';
import type {
	CheckoutServiceInput,
	CheckoutServiceOutput,
} from '../data/services/impl/ICheckoutService';

type CartApiService = {
	post<TResponse>(endpoint: string, payload: CheckoutServiceInput): Promise<TResponse>;
};

const cartApiService: CartApiService = {
	async post<TResponse>(
		_endpoint: string,
		payload: CheckoutServiceInput,
	): Promise<TResponse> {
		return {
			orderId: createOrderId(payload.nextOrderNumber, payload.orderIdPrefix),
		} as TResponse;
	},
};

export async function checkoutApi(
	input: CheckoutServiceInput,
): Promise<CheckoutServiceOutput> {
	return cartApiService.post<CheckoutServiceOutput>('/checkout', input);
}
