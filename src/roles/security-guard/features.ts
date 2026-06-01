/** Security Guard — role scope and page slugs (folder: security-guard) */
export const ROLE_KEY = 'security_guard' as const;
export const ROLE_FOLDER = 'security-guard' as const;
export const ROLE_TITLE = 'Security Guard' as const;
export const ROLE_ORDER = 20 as const;

export const RESPONSIBILITIES = [
  "Maintain safety and security",
  "Monitor entrances and exits",
  "Respond to incidents"
] as const;

export const PAGE_SLUGS = [
  'dashboard',
  'profile',
  'monitor',
  'incidents',
  'visitors'
] as const;
