/** Donation Manager — role scope and page slugs (folder: donation-manager) */
export const ROLE_KEY = 'donation_manager' as const;
export const ROLE_FOLDER = 'donation-manager' as const;
export const ROLE_TITLE = 'Donation Manager' as const;
export const ROLE_ORDER = 8 as const;

export const RESPONSIBILITIES = [
  "Track donations",
  "Manage donor records",
  "Generate donation reports"
] as const;

export const PAGE_SLUGS = [
  'dashboard',
  'profile',
  'donations',
  'donors',
  'reports'
] as const;
