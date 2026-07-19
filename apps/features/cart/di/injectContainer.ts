import type { ICheckoutRepository } from '../data/repositories/impl/ICheckoutRepository';
import { checkoutService } from '../data/services/checkoutService';
import type {
  CheckoutServiceInput,
  CheckoutServiceOutput,
} from '../data/services/impl/ICheckoutService';
import { checkoutUsecase as checkoutUsecaseImpl } from '../domain/usecases/checkoutUsecase';
import type { ICheckoutUsecase } from '../domain/usecases/impl/ICheckoutUsecase';

type CheckoutService = (
  input: CheckoutServiceInput,
) => Promise<CheckoutServiceOutput>;

type ServiceDependencies = {
  checkoutService: CheckoutService;
};

type RepositoryDependencies = {
  checkoutRepository: ICheckoutRepository;
};

type UsecaseDependencies = {
  checkoutUsecase: ICheckoutUsecase;
};

export type InjectContainer = {
  services: ServiceDependencies;
  repositories: RepositoryDependencies;
  usecases: UsecaseDependencies;
};

export type InjectContainerOverrides = {
  services?: Partial<ServiceDependencies>;
  repositories?: Partial<RepositoryDependencies>;
  usecases?: Partial<UsecaseDependencies>;
};

export function createInjectContainer(
  overrides: InjectContainerOverrides = {},
): InjectContainer {
  const services: ServiceDependencies = {
    checkoutService: overrides.services?.checkoutService ?? checkoutService,
  };

  const repositories: RepositoryDependencies = {
    checkoutRepository: overrides.repositories?.checkoutRepository ?? {
      checkout(input: CheckoutServiceInput): Promise<CheckoutServiceOutput> {
        return services.checkoutService(input);
      },
    },
  };

  const usecases: UsecaseDependencies = {
    checkoutUsecase:
      overrides.usecases?.checkoutUsecase ??
      ((input: CheckoutServiceInput, repository?: ICheckoutRepository) =>
        checkoutUsecaseImpl(input, repository ?? repositories.checkoutRepository)),
  };

  return {
    services,
    repositories,
    usecases,
  };
}

export const injectContainer = createInjectContainer();
