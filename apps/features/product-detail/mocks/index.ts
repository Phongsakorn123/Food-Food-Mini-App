import { FOOD_ITEMS } from '../../home/mocks/foods';

export function findMockFoodById(foodId: string) {
  return FOOD_ITEMS.find(food => food.id === foodId) ?? null;
}