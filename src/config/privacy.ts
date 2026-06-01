/**
 * UI privacy — persistence and activity_log run silently in the background.
 * Set flags to true only for internal / admin debugging.
 */
export const APP_PRIVACY = {
  /** Show internal datastore hints in the UI (keep false in production demos) */
  showStorageHints: false,
  /** Sidebar + header link to shared activity log */
  showSharedActivityNav: false,
  /** Compact activity table at bottom of module pages */
  showSharedActivityPreview: false,
  /** Dashboard "recent activity" block */
  showDashboardActivity: false,
  /** Badge on approvals etc. */
  showStorageBadge: false,
} as const;

/** User-facing save confirmation (no storage / shared-table details) */
export const CRUD_SUCCESS_MSG = 'Saved successfully.';
