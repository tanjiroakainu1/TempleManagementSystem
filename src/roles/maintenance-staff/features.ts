/** Maintenance Staff — role scope and page slugs (folder: maintenance-staff) */
export const ROLE_KEY = 'maintenance_staff' as const;
export const ROLE_FOLDER = 'maintenance-staff' as const;
export const ROLE_TITLE = 'Maintenance Staff' as const;
export const ROLE_ORDER = 19 as const;

export const RESPONSIBILITIES = [
  "Perform maintenance tasks",
  "Update maintenance records",
  "Report repair needs"
] as const;

export const PAGE_SLUGS = [
  'dashboard',
  'profile',
  'tasks',
  'records',
  'report'
] as const;
