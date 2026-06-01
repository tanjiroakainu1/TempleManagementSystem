/** Devotee — role scope and page slugs (folder: devotee) */
export const ROLE_KEY = 'devotee' as const;
export const ROLE_FOLDER = 'devotee' as const;
export const ROLE_TITLE = 'Devotee' as const;
export const ROLE_ORDER = 13 as const;

export const RESPONSIBILITIES = [
  "Book rituals and services",
  "Make donations",
  "View schedules"
] as const;

export const PAGE_SLUGS = [
  'dashboard',
  'profile',
  'book-ritual',
  'donate',
  'schedules'
] as const;
