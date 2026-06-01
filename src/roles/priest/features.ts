/** Priest — role scope and page slugs (folder: priest) */
export const ROLE_KEY = 'priest' as const;
export const ROLE_FOLDER = 'priest' as const;
export const ROLE_TITLE = 'Priest' as const;
export const ROLE_ORDER = 4 as const;

export const RESPONSIBILITIES = [
  "Conduct prayers and rituals",
  "Manage worship schedules",
  "Record religious services"
] as const;

export const PAGE_SLUGS = [
  'dashboard',
  'profile',
  'schedule',
  'services',
  'rituals'
] as const;
