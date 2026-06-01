/** Education Coordinator — role scope and page slugs (folder: education-coordinator) */
export const ROLE_KEY = 'education_coordinator' as const;
export const ROLE_FOLDER = 'education-coordinator' as const;
export const ROLE_TITLE = 'Education Coordinator' as const;
export const ROLE_ORDER = 16 as const;

export const RESPONSIBILITIES = [
  "Manage religious classes",
  "Schedule training programs"
] as const;

export const PAGE_SLUGS = [
  'dashboard',
  'profile',
  'classes',
  'programs'
] as const;
