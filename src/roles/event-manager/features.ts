/** Event Manager — role scope and page slugs (folder: event-manager) */
export const ROLE_KEY = 'event_manager' as const;
export const ROLE_FOLDER = 'event-manager' as const;
export const ROLE_TITLE = 'Event Manager' as const;
export const ROLE_ORDER = 9 as const;

export const RESPONSIBILITIES = [
  "Organize temple events",
  "Manage festivals and celebrations"
] as const;

export const PAGE_SLUGS = [
  'dashboard',
  'profile',
  'events',
  'festivals',
  'registrations'
] as const;
