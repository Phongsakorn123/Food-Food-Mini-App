export const HOME_CATEGORIES = [
	'All',
	'เครื่องดื่ม',
	'ของคาว',
	'ของหวาน',
	'อาหารจานเดียว',
	'เส้น',
	'ทานเล่น',
] as const;

export type HomeCategory = (typeof HOME_CATEGORIES)[number];