/** Temple Secretary — role scope and page slugs (folder: temple-secretary) */
export const ROLE_KEY = 'temple_secretary' as const;
export const ROLE_FOLDER = 'temple-secretary' as const;
export const ROLE_TITLE = 'Temple Secretary' as const;
export const ROLE_ORDER = 5 as const;

export const RESPONSIBILITIES = [
  "Maintain temple records",
  "Handle correspondence",
  "Manage announcements"
] as const;

export const PAGE_SLUGS = [
  'dashboard',
  'profile',
  'records',
  'correspondence',
  'announcements'
] as const;
