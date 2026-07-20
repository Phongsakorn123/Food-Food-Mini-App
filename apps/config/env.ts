import {
  API_BASE_URL,
  API_IMAGE_URL,
  APP_ENV,
  PUBLIC_API_BASE_URL,
} from '@env';

export const env = {
  apiBaseUrl: API_BASE_URL,
  apiImageUrl: API_IMAGE_URL,
  appEnv: APP_ENV,
  publicApiBaseUrl: PUBLIC_API_BASE_URL,
} as const;