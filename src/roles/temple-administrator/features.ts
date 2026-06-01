/** Temple Administrator — role scope and page slugs (folder: temple-administrator) */
export const ROLE_KEY = 'temple_administrator' as const;
export const ROLE_FOLDER = 'temple-administrator' as const;
export const ROLE_TITLE = 'Temple Administrator' as const;
export const ROLE_ORDER = 2 as const;

export const RESPONSIBILITIES = [
  "Manage daily temple operations",
  "Approve records and activities",
  "Generate reports"
] as const;

export const PAGE_SLUGS = [
  'dashboard',
  'profile',
  'operations',
  'approvals',
  'reports',
  'staff'
] as const;
