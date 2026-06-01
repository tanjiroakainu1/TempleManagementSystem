/** Visitor — role scope and page slugs (folder: visitor) */
export const ROLE_KEY = 'visitor' as const;
export const ROLE_FOLDER = 'visitor' as const;
export const ROLE_TITLE = 'Visitor' as const;
export const ROLE_ORDER = 14 as const;

export const RESPONSIBILITIES = [
  "View public information",
  "Register for visits"
] as const;

export const PAGE_SLUGS = [
  'dashboard',
  'profile',
  'info',
  'register-visit',
  'events'
] as const;
