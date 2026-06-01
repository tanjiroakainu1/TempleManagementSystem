/** Accountant — role scope and page slugs (folder: accountant) */
export const ROLE_KEY = 'accountant' as const;
export const ROLE_FOLDER = 'accountant' as const;
export const ROLE_TITLE = 'Accountant' as const;
export const ROLE_ORDER = 7 as const;

export const RESPONSIBILITIES = [
  "Record transactions",
  "Manage budgets",
  "Prepare financial statements"
] as const;

export const PAGE_SLUGS = [
  'dashboard',
  'profile',
  'transactions',
  'budgets',
  'statements'
] as const;
