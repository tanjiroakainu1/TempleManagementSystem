/** Treasurer — role scope and page slugs (folder: treasurer) */
export const ROLE_KEY = 'treasurer' as const;
export const ROLE_FOLDER = 'treasurer' as const;
export const ROLE_TITLE = 'Treasurer' as const;
export const ROLE_ORDER = 6 as const;

export const RESPONSIBILITIES = [
  "Manage temple finances",
  "Monitor donations",
  "Generate financial reports"
] as const;

export const PAGE_SLUGS = [
  'dashboard',
  'profile',
  'finances',
  'donations',
  'reports'
] as const;
