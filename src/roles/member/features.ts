/** Member — role scope and page slugs (folder: member) */
export const ROLE_KEY = 'member' as const;
export const ROLE_FOLDER = 'member' as const;
export const ROLE_TITLE = 'Member' as const;
export const ROLE_ORDER = 12 as const;

export const RESPONSIBILITIES = [
  "View temple activities",
  "Register for events",
  "Submit requests"
] as const;

export const PAGE_SLUGS = [
  'dashboard',
  'profile',
  'activities',
  'events',
  'requests'
] as const;
