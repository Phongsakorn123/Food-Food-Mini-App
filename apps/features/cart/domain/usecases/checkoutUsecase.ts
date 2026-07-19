import { checkoutRepository } from '../../data/repositories/checkoutRepository';
import type {
  CheckoutServiceInput,
  CheckoutServiceOutput,
} from '../../data/services/impl/ICheckoutService';
import type { ICheckoutRepository } from '../../data/repositories/impl/ICheckoutRepository';
import type { ICheckoutUsecase } from './impl/ICheckoutUsecase';

export const checkoutUsecase: ICheckoutUsecase = async (
  input: CheckoutServiceInput,
  repository: ICheckoutRepository = checkoutRepository,
): Promise<CheckoutServiceOutput> => {
  return repository.checkout(input);
};
