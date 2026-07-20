import { createOrderId } from '../utils/order';
import {
	buildCartApiUrl,
	cartApiService,
} from './base';
import type {
	CheckoutServiceInput,
	CheckoutServiceOutput,
} from '../data/services/impl/ICheckoutService';
import type {
	CheckoutApiBody,
	CheckoutApiHeaders,
	CheckoutApiResponse,
} from './models/checkoutApiModel';

export async function checkoutApi(
	input: CheckoutServiceInput,
): Promise<CheckoutServiceOutput> {
	const mockHeaders: CheckoutApiHeaders = {
		'Content-Type': 'application/json',
		'x-feature-name': 'cart-checkout',
		'x-mock-platform': 'react-native',
	};
	const mockBody: CheckoutApiBody = {
		nextOrderNumber: input.nextOrderNumber,
		orderIdPrefix: input.orderIdPrefix,
		orderDetails: input.orderDetails,
	};

	try {
		const response = await cartApiService.post<
			CheckoutApiResponse,
			CheckoutApiBody,
			CheckoutApiHeaders
		>(
			buildCartApiUrl('/checkout'),
			mockBody,
			mockHeaders,
		);

		return {
			orderId:
				response.orderId ??
				createOrderId(input.nextOrderNumber, input.orderIdPrefix),
		};
	} catch (error) {
		throw error;
	}
}
