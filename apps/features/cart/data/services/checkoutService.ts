import { checkoutApi } from '../../api/checkoutApi';
import type {
  CheckoutServiceInput,
  CheckoutServiceOutput,
} from './impl/ICheckoutService';

export async function checkoutService(
  input: CheckoutServiceInput,
): Promise<CheckoutServiceOutput> {
  return checkoutApi(input);
}
