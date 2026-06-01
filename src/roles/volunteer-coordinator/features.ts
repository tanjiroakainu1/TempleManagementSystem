/** Volunteer Coordinator — role scope and page slugs (folder: volunteer-coordinator) */
export const ROLE_KEY = 'volunteer_coordinator' as const;
export const ROLE_FOLDER = 'volunteer-coordinator' as const;
export const ROLE_TITLE = 'Volunteer Coordinator' as const;
export const ROLE_ORDER = 10 as const;

export const RESPONSIBILITIES = [
  "Manage volunteers",
  "Assign volunteer tasks",
  "Track volunteer activities"
] as const;

export const PAGE_SLUGS = [
  'dashboard',
  'profile',
  'volunteers',
  'tasks',
  'activities'
] as const;
