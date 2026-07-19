import type { ICheckoutRepository } from '../../../data/repositories/impl/ICheckoutRepository';
import type {
  CheckoutServiceInput,
  CheckoutServiceOutput,
} from '../../../data/services/impl/ICheckoutService';

export interface ICheckoutUsecase {
  (
    input: CheckoutServiceInput,
    repository?: ICheckoutRepository,
  ): Promise<CheckoutServiceOutput>;
}
