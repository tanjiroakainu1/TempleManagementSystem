/**
 * Standalone data layer — all app data lives in localStorage (`tms_store_v1`).
 * Every CRUD writes to `activity_log` (shared table for all 20 roles).
 */
export { getStore, saveStore, resetStore } from './db';
export { STORE_KEY, SESSION_KEY } from './types';
export {
  logSharedActivity,
  logActivity,
  listActivityLog,
  entityLabel,
  SHARED_ACTIVITY_ROUTE,
  SHARED_ACTIVITY_LIMIT,
} from './activity';
export * from './services';
