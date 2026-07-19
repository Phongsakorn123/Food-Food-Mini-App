import type {
	CheckoutServiceInput,
	CheckoutServiceOutput,
} from '../../services/impl/ICheckoutService';

export interface ICheckoutRepository {
	checkout(input: CheckoutServiceInput): Promise<CheckoutServiceOutput>;
}
