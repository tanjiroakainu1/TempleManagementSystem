/** Inventory Manager — role scope and page slugs (folder: inventory-manager) */
export const ROLE_KEY = 'inventory_manager' as const;
export const ROLE_FOLDER = 'inventory-manager' as const;
export const ROLE_TITLE = 'Inventory Manager' as const;
export const ROLE_ORDER = 18 as const;

export const RESPONSIBILITIES = [
  "Manage temple supplies",
  "Track inventory usage",
  "Monitor stock levels"
] as const;

export const PAGE_SLUGS = [
  'dashboard',
  'profile',
  'supplies',
  'usage',
  'stock'
] as const;
