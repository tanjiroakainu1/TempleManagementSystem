/** Ritual Coordinator — role scope and page slugs (folder: ritual-coordinator) */
export const ROLE_KEY = 'ritual_coordinator' as const;
export const ROLE_FOLDER = 'ritual-coordinator' as const;
export const ROLE_TITLE = 'Ritual Coordinator' as const;
export const ROLE_ORDER = 15 as const;

export const RESPONSIBILITIES = [
  "Schedule rituals",
  "Manage ritual requests",
  "Coordinate priests"
] as const;

export const PAGE_SLUGS = [
  'dashboard',
  'profile',
  'schedule',
  'requests',
  'priests'
] as const;
