/** Head Priest — role scope and page slugs (folder: head-priest) */
export const ROLE_KEY = 'head_priest' as const;
export const ROLE_FOLDER = 'head-priest' as const;
export const ROLE_TITLE = 'Head Priest' as const;
export const ROLE_ORDER = 3 as const;

export const RESPONSIBILITIES = [
  "Manage religious ceremonies",
  "Approve ritual schedules",
  "Supervise priests"
] as const;

export const PAGE_SLUGS = [
  'dashboard',
  'profile',
  'ceremonies',
  'ritual-approval',
  'priests',
  'schedules'
] as const;
