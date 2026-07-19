export const HOME_CATEGORIES = ['All', 'เครื่องดื่ม', 'ของคาว', 'ของหวาน'] as const;

export type HomeCategory = (typeof HOME_CATEGORIES)[number];