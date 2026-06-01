/**
 * Data API — standalone localStorage backend (no PHP/MySQL/server required).
 *
 * Flow: React pages → dataApi → storage/services → localStorage (`tms_store_v1`)
 * Every CRUD also appends to `activity_log` (Shared Activity Table — all 20 roles).
 */
import type { RoleKey } from '@/config/roles';
import { resetStore } from '@/lib/storage/db';
import * as store from '@/lib/storage/services';
import { tryGetMe } from '@/lib/storage/services';

/** Wrap sync work in a Promise so throws become rejections (not uncaught on call) */
function run<T>(fn: () => T): Promise<T> {
  return Promise.resolve().then(fn);
}

function uid(): { id: number; role: RoleKey } {
  const session = tryGetMe();
  if (!session) throw new Error('Unauthorized');
  return { id: session.user.id, role: session.user.role as RoleKey };
}

export const authApi = {
  login: (email: string, password: string) =>
    run(() => store.loginUser(email, password)),
  register: (body: Record<string, string>) =>
    run(() => {
      store.registerUser(body);
      return { success: true as const };
    }),
  /** Returns null when not logged in (does not throw) */
  me: () => run(() => tryGetMe()),
};

export const dataApi = {
  dashboardStats: () =>
    run(() => {
      const { id, role } = uid();
      return { stats: store.getDashboardStats(role, id) };
    }),
  activityLog: (params?: { entity?: string; action?: string }) =>
    run(() => ({ activities: store.listActivityLog(params) })),
  users: () => run(() => ({ users: store.listUsers() })),
  patchUser: (id: number, body: Record<string, string>) =>
    run(() => {
      const { id: aid, role } = uid();
      store.patchUser(aid, role, id, body);
      return { success: true as const };
    }),
  donations: () =>
    run(() => {
      const { id, role } = uid();
      return { donations: store.listDonations(role, id) };
    }),
  createDonation: (body: Record<string, unknown>) =>
    run(() => {
      const { id, role } = uid();
      store.createDonation(id, role, body);
      return { success: true as const };
    }),
  ritualRequests: () =>
    run(() => {
      const { id, role } = uid();
      return { requests: store.listRitualRequests(role, id) };
    }),
  createRitualRequest: (body: Record<string, unknown>) =>
    run(() => {
      const { id, role } = uid();
      store.createRitualRequest(id, role, body);
      return { success: true as const };
    }),
  patchRitualRequest: (id: number, body: Record<string, unknown>) =>
    run(() => {
      const { id: uid2, role } = uid();
      store.patchRitualRequest(uid2, role, id, body);
      return { success: true as const };
    }),
  events: (festival?: boolean) =>
    run(() => ({ events: store.listEvents(festival) })),
  createEvent: (body: Record<string, unknown>) =>
    run(() => {
      const { id, role } = uid();
      store.createEvent(id, role, body);
      return { success: true as const };
    }),
  registerEvent: (event_id: number) =>
    run(() => {
      const { id, role } = uid();
      store.registerEvent(id, role, event_id);
      return { success: true as const };
    }),
  transactions: () =>
    run(() => {
      const { id, role } = uid();
      return { transactions: store.listTransactions(role, id) };
    }),
  createTransaction: (body: Record<string, unknown>) =>
    run(() => {
      const { id, role } = uid();
      store.createTransaction(id, role, body);
      return { success: true as const };
    }),
  patchTransaction: (id: number, status: string) =>
    run(() => {
      const { id: uid2, role } = uid();
      store.patchTransaction(uid2, role, id, status);
      return { success: true as const };
    }),
  announcements: () => run(() => ({ announcements: store.listAnnouncements() })),
  createAnnouncement: (body: Record<string, unknown>) =>
    run(() => {
      const { id, role } = uid();
      store.createAnnouncement(id, role, body);
      return { success: true as const };
    }),
  approvals: () => run(() => ({ approvals: store.listApprovals() })),
  createApproval: (body: Record<string, unknown>) =>
    run(() => {
      const { id, role } = uid();
      store.createApproval(id, role, body);
      return { success: true as const };
    }),
  patchApproval: (id: number, status: string) =>
    run(() => {
      const { id: uid2, role } = uid();
      store.patchApproval(uid2, role, id, status);
      return { success: true as const };
    }),
  usersByRole: (role: string) => run(() => ({ users: store.usersByRole(role) })),
  notifications: () =>
    run(() => {
      const { id } = uid();
      return { notifications: store.listNotifications(id) };
    }),
  getStore: () => run(() => ({ store: store.getStoreSnapshot() })),
  listEntity: (table: store.EntityTable) =>
    run(() => ({ rows: store.listEntity(table) })),
  createEntity: (table: store.EntityTable, row: Record<string, unknown>, summary: string) =>
    run(() => {
      const { id, role } = uid();
      store.createEntity(table, row, id, role, summary);
      return { success: true as const };
    }),
  updateEntity: (table: store.EntityTable, id: number, patch: Record<string, unknown>, summary: string) =>
    run(() => {
      const { id: uid2, role } = uid();
      store.updateEntity(table, id, patch, uid2, role, summary);
      return { success: true as const };
    }),
  deleteEntity: (table: store.EntityTable, id: number, summary: string) =>
    run(() => {
      const { id: uid2, role } = uid();
      store.deleteEntity(table, id, uid2, role, summary);
      return { success: true as const };
    }),
  saveSettings: (settings: Record<string, string>) =>
    run(() => {
      const { id, role } = uid();
      store.saveSettings(settings, id, role);
      return { success: true as const };
    }),
  resetData: () =>
    run(() => {
      resetStore();
      store.emitDataChange();
      return { success: true as const };
    }),
};
