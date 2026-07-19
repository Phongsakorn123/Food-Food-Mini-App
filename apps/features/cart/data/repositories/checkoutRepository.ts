import {
  checkoutService,
} from '../services/checkoutService';
import type {
  CheckoutServiceInput,
  CheckoutServiceOutput,
} from '../services/impl/ICheckoutService';
import type { ICheckoutRepository } from './impl/ICheckoutRepository';

export const checkoutRepository: ICheckoutRepository = {
  async checkout(input: CheckoutServiceInput): Promise<CheckoutServiceOutput> {
    return checkoutService(input);
  },
};
