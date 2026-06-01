import type { TMSStore } from './types';
import { getStore, nextId, now, userName } from './db';

/** Max rows kept in localStorage (all roles read the same table) */
export const SHARED_ACTIVITY_LIMIT = 500;

export const SHARED_ACTIVITY_ROUTE = '/shared/activity-log';

/** @deprecated Use CRUD_SUCCESS_MSG from @/config/privacy for UI */
export const CRUD_SAVED_MSG = 'Saved successfully.';

/** Human-readable module names for the shared table */
export const ENTITY_LABELS: Record<string, string> = {
  user: 'User',
  donation: 'Donation',
  ritual_request: 'Ritual',
  event: 'Event',
  event_registration: 'Event Registration',
  financial_transaction: 'Transaction',
  announcement: 'Announcement',
  approval: 'Approval',
  member_requests: 'Member Request',
  visit_registrations: 'Visit',
  volunteer_tasks: 'Volunteer Task',
  education_classes: 'Class',
  class_attendance: 'Attendance',
  student_progress: 'Progress',
  inventory_items: 'Inventory',
  inventory_usage: 'Inventory Usage',
  maintenance_records: 'Maintenance',
  security_incidents: 'Security',
  worship_schedules: 'Worship Schedule',
  worship_records: 'Worship Service',
  temple_records: 'Temple Record',
  correspondence: 'Correspondence',
  budgets: 'Budget',
  temple_setting: 'Settings',
};

export function entityLabel(entityType: string): string {
  return ENTITY_LABELS[entityType] ?? entityType.replace(/_/g, ' ');
}

/**
 * Writes to `activity_log` silently — not advertised in the UI.
 */
export function logSharedActivity(
  store: TMSStore,
  userId: number,
  userRole: string,
  action: string,
  entityType: string,
  entityId: number | null,
  summary: string
): void {
  const id = nextId(store, 'activity_log');
  store.activity_log.unshift({
    id,
    user_id: userId,
    user_role: userRole,
    action,
    entity_type: entityType,
    entity_label: entityLabel(entityType),
    entity_id: entityId,
    summary,
    link: SHARED_ACTIVITY_ROUTE,
    created_at: now(),
    actor_name: userName(store, userId),
  });
  if (store.activity_log.length > SHARED_ACTIVITY_LIMIT) {
    store.activity_log = store.activity_log.slice(0, SHARED_ACTIVITY_LIMIT);
  }
}

export const logActivity = logSharedActivity;

export function listActivityLog(params?: { entity?: string; action?: string }) {
  let rows = getStore().activity_log;
  if (params?.entity) rows = rows.filter((a) => a.entity_type === params.entity);
  if (params?.action) rows = rows.filter((a) => a.action === params.action);
  return rows.slice(0, 200);
}
