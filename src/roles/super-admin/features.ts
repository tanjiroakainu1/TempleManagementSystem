/** Super Admin — role scope and page slugs (folder: super-admin) */
export const ROLE_KEY = 'super_admin' as const;
export const ROLE_FOLDER = 'super-admin' as const;
export const ROLE_TITLE = 'Super Admin' as const;
export const ROLE_ORDER = 1 as const;

export const RESPONSIBILITIES = [
  "Full system control",
  "Manage all users and permissions",
  "Configure temple settings",
  "View all reports"
] as const;

export const PAGE_SLUGS = [
  'dashboard',
  'profile',
  'system-control',
  'users',
  'permissions',
  'settings',
  'reports',
  'approvals'
] as const;
