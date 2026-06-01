import type { RoleKey } from '@/config/roles';
import type { TMSStore, StoredUser } from './types';
import { getStore, saveStore, nextId, now, userName } from './db';
import { logSharedActivity } from './activity';
import { SESSION_KEY } from './types';

export { logSharedActivity, logActivity, listActivityLog, entityLabel, SHARED_ACTIVITY_ROUTE, SHARED_ACTIVITY_LIMIT } from './activity';

let listeners: (() => void)[] = [];

export function subscribeData(fn: () => void): () => void {
  listeners.push(fn);
  return () => { listeners = listeners.filter((l) => l !== fn); };
}

export function emitDataChange(): void {
  listeners.forEach((l) => l());
}

function mutate(fn: (store: TMSStore) => void): TMSStore {
  const store = getStore();
  fn(store);
  saveStore(store);
  emitDataChange();
  return store;
}

export function getSessionUserId(): number | null {
  const v = localStorage.getItem(SESSION_KEY);
  return v ? Number(v) : null;
}

export function setSessionUserId(id: number | null): void {
  if (id) localStorage.setItem(SESSION_KEY, String(id));
  else localStorage.removeItem(SESSION_KEY);
}

// ——— Auth ———
export function loginUser(email: string, password: string) {
  const store = getStore();
  const user = store.users.find((u) => u.email === email.trim() && u.password === password && u.status === 'active');
  if (!user) throw new Error('Invalid email or password');
  setSessionUserId(user.id);
  return { user: { id: user.id, role: user.role, full_name: user.full_name, email: user.email } };
}

export function tryGetMe(): { user: Omit<StoredUser, 'password'> } | null {
  const store = getStore();
  const uid = getSessionUserId();
  if (!uid) return null;
  const user = store.users.find((u) => u.id === uid && u.status === 'active');
  if (!user) return null;
  const { password: _, ...safe } = user;
  return { user: safe };
}

/** Requires active session — use inside authenticated API calls only */
export function getMe() {
  const session = tryGetMe();
  if (!session) throw new Error('Unauthorized');
  return session;
}

export function registerUser(body: Record<string, string>) {
  return mutate((store) => {
    if (store.users.some((u) => u.email === body.email.trim())) throw new Error('Email already registered');
    const id = nextId(store, 'users');
    store.users.push({
      id,
      full_name: body.full_name.trim(),
      email: body.email.trim(),
      password: body.password,
      phone: body.phone || '',
      role: body.role as RoleKey,
      status: 'active',
      created_at: now(),
    });
    logSharedActivity(store, id, body.role, 'create', 'user', id, `Registered: ${body.full_name}`);
  });
}

// ——— Dashboard stats ———
export function getDashboardStats(role: RoleKey, userId: number): Record<string, number> {
  const s = getStore();
  const stats: Record<string, number> = {};
  const sum = (arr: Record<string, unknown>[], field: string) =>
    arr.reduce((a, r) => a + Number(r[field] || 0), 0);

  stats.shared_activity = s.activity_log.length;

  switch (role) {
    case 'super_admin':
    case 'temple_administrator':
      stats.users = s.users.length;
      stats.pending_approvals = s.approvals.filter((a) => a.status === 'pending').length;
      stats.events = s.events.filter((e) => e.status === 'active').length;
      stats.donations = sum(s.donations, 'amount');
      break;
    case 'head_priest':
      stats.pending_rituals = s.ritual_requests.filter((r) => r.status === 'scheduled' && !r.head_priest_approved).length;
      stats.priests = s.users.filter((u) => u.role === 'priest' && u.status === 'active').length;
      stats.today_services = s.worship_schedules.filter((w) => String(w.schedule_date) === now().slice(0, 10)).length;
      stats.ceremonies = s.worship_schedules.length;
      break;
    case 'priest':
      stats.upcoming = s.worship_schedules.filter((w) => w.priest_id === userId && String(w.schedule_date) >= now().slice(0, 10)).length;
      stats.assigned_rituals = s.ritual_requests.filter((r) => r.priest_id === userId && r.status === 'scheduled').length;
      break;
    case 'treasurer':
    case 'accountant':
      stats.total_donations = sum(s.donations, 'amount');
      stats.transactions = s.financial_transactions.length;
      stats.pending = s.financial_transactions.filter((t) => t.status === 'pending').length;
      break;
    case 'donation_manager':
      stats.donations = s.donations.length;
      stats.total = sum(s.donations, 'amount');
      stats.donors = new Set(s.donations.map((d) => d.donor_id)).size;
      break;
    case 'event_manager':
      stats.active_events = s.events.filter((e) => e.status === 'active').length;
      stats.registrations = s.event_registrations.length;
      break;
    case 'volunteer_coordinator':
      stats.volunteers = s.users.filter((u) => u.role === 'volunteer').length;
      stats.open_tasks = s.volunteer_tasks.filter((t) => ['pending', 'assigned'].includes(String(t.status))).length;
      break;
    case 'volunteer':
      stats.my_tasks = s.volunteer_tasks.filter((t) => t.volunteer_id === userId && t.status !== 'completed').length;
      stats.active_events = s.events.filter((e) => e.status === 'active').length;
      break;
    case 'devotee':
      stats.my_rituals = s.ritual_requests.filter((r) => r.devotee_id === userId).length;
      stats.my_donations = sum(s.donations.filter((d) => d.donor_id === userId), 'amount');
      break;
    case 'ritual_coordinator':
      stats.pending = s.ritual_requests.filter((r) => r.status === 'pending').length;
      stats.scheduled = s.ritual_requests.filter((r) => r.status === 'scheduled').length;
      break;
    case 'education_coordinator':
      stats.classes = s.education_classes.length;
      stats.teachers = s.users.filter((u) => u.role === 'teacher_instructor').length;
      break;
    case 'teacher_instructor':
      stats.my_classes = s.education_classes.filter((c) => c.teacher_id === userId).length;
      break;
    case 'inventory_manager':
      stats.items = s.inventory_items.length;
      stats.low_stock = s.inventory_items.filter((i) => Number(i.quantity) <= Number(i.min_stock)).length;
      break;
    case 'maintenance_staff':
      stats.open = s.maintenance_records.filter((m) => ['open', 'in_progress'].includes(String(m.status))).length;
      break;
    case 'security_guard':
      stats.incidents = s.security_incidents.filter((i) => i.status === 'open').length;
      stats.visits_today = s.visit_registrations.filter((v) => String(v.visit_date) === now().slice(0, 10)).length;
      break;
    case 'temple_secretary':
      stats.records = s.temple_records.length;
      stats.announcements = s.announcements.length;
      break;
    case 'member':
      stats.events = s.events.filter((e) => e.status === 'active').length;
      stats.requests = s.member_requests.filter((r) => r.member_id === userId).length;
      break;
    case 'visitor':
      stats.announcements = s.announcements.filter((a) => a.is_public).length;
      stats.events = s.events.filter((e) => e.status === 'active').length;
      break;
  }
  return stats;
}

function enrichDonations(store: TMSStore): Record<string, unknown>[] {
  return store.donations.map((d) => ({
    ...(d as Record<string, unknown>),
    donor_name: userName(store, Number(d.donor_id)),
  }));
}

export function listDonations(role: RoleKey, userId: number) {
  const store = getStore();
  if (role === 'devotee') return enrichDonations(store).filter((d) => Number(d.donor_id) === userId);
  return enrichDonations(store);
}

export function createDonation(userId: number, userRole: string, body: Record<string, unknown>) {
  return mutate((store) => {
    const donorId = Number(body.donor_id || userId);
    const id = nextId(store, 'donations');
    const amount = Number(body.amount);
    store.donations.unshift({
      id,
      donor_id: donorId,
      amount,
      donation_type: body.donation_type || 'general',
      purpose: body.purpose || '',
      payment_method: body.payment_method || 'cash',
      received_by: userRole === 'donation_manager' ? userId : null,
      created_at: now(),
      created_by: userId,
      created_by_role: userRole,
    });
    logSharedActivity(store, userId, userRole, 'create', 'donation', id, `Donation ₱${amount.toFixed(2)}`);
    const nid = nextId(store, 'notifications');
    store.notifications.unshift({
      id: nid,
      user_id: store.users.find((u) => u.role === 'donation_manager')?.id,
      message: `New donation ₱${amount.toFixed(2)}`,
      link: '/donation-manager/donations',
      read_at: null,
      created_at: now(),
    });
  });
}

export function listRitualRequests(role: RoleKey, userId: number) {
  const store = getStore();
  let rows = store.ritual_requests;
  if (role === 'devotee') rows = rows.filter((r) => r.devotee_id === userId);
  else if (role === 'priest') rows = rows.filter((r) => r.priest_id === userId);
  return rows.map((r) => ({ ...r, devotee_name: userName(store, Number(r.devotee_id)) }));
}

export function createRitualRequest(userId: number, userRole: string, body: Record<string, unknown>) {
  mutate((store) => {
    const id = nextId(store, 'ritual_requests');
    store.ritual_requests.unshift({
      id,
      devotee_id: userId,
      ritual_type: body.ritual_type,
      requested_date: body.preferred_date || body.requested_date,
      notes: body.notes || '',
      status: 'pending',
      coordinator_id: null,
      priest_id: null,
      head_priest_approved: 0,
      scheduled_date: null,
      created_at: now(),
    });
    logSharedActivity(store, userId, userRole, 'create', 'ritual_request', id, `Booked: ${body.ritual_type}`);
  });
}

export function patchRitualRequest(userId: number, userRole: string, id: number, body: Record<string, unknown>) {
  mutate((store) => {
    const r = store.ritual_requests.find((x) => x.id === id);
    if (!r) return;
    if (body.action === 'schedule' && userRole === 'ritual_coordinator') {
      Object.assign(r, { priest_id: body.priest_id, scheduled_date: body.scheduled_date, coordinator_id: userId, status: 'scheduled' });
      logSharedActivity(store, userId, userRole, 'update', 'ritual_request', id, 'Scheduled ritual');
    } else if (body.action === 'approve' && userRole === 'head_priest') {
      r.status = 'approved';
      r.head_priest_approved = 1;
      logSharedActivity(store, userId, userRole, 'approve', 'ritual_request', id, 'Approved ritual');
    } else if (body.action === 'reject' && userRole === 'head_priest') {
      r.status = 'rejected';
      logSharedActivity(store, userId, userRole, 'reject', 'ritual_request', id, 'Rejected ritual');
    } else if (body.status === 'completed' && userRole === 'priest') {
      r.status = 'completed';
      logSharedActivity(store, userId, userRole, 'update', 'ritual_request', id, 'Completed ritual');
    }
  });
}

export function listEvents(festival?: boolean) {
  const store = getStore();
  return store.events
    .filter((e) => (festival ? e.is_festival === 1 : e.is_festival === 0))
    .map((e) => ({
      ...e,
      reg_count: store.event_registrations.filter((er) => er.event_id === e.id).length,
    }));
}

export function createEvent(userId: number, userRole: string, body: Record<string, unknown>) {
  mutate((store) => {
    const id = nextId(store, 'events');
    store.events.unshift({
      id,
      title: body.title,
      description: body.description || '',
      event_date: body.event_date,
      event_time: body.event_time || null,
      location: body.location || '',
      manager_id: userId,
      status: 'active',
      is_festival: body.is_festival ? 1 : 0,
      created_at: now(),
    });
    logSharedActivity(store, userId, userRole, 'create', 'event', id, `Event: ${body.title}`);
  });
}

export function registerEvent(userId: number, userRole: string, eventId: number) {
  mutate((store) => {
    if (store.event_registrations.some((er) => er.event_id === eventId && er.user_id === userId))
      throw new Error('Already registered');
    const id = nextId(store, 'event_registrations');
    store.event_registrations.push({ id, event_id: eventId, user_id: userId, registered_at: now() });
    logSharedActivity(store, userId, userRole, 'register', 'event_registration', id, 'Registered for event');
  });
}

export function listTransactions(role: RoleKey, userId: number) {
  const store = getStore();
  let rows = store.financial_transactions;
  if (role === 'accountant') rows = rows.filter((t) => t.recorded_by === userId);
  return rows.map((t) => ({ ...t, full_name: userName(store, Number(t.recorded_by)) }));
}

export function createTransaction(userId: number, userRole: string, body: Record<string, unknown>) {
  mutate((store) => {
    const id = nextId(store, 'financial_transactions');
    const amount = Number(body.amount);
    const transaction_type = body.transaction_type || body.type || 'expense';
    store.financial_transactions.unshift({
      id,
      transaction_type,
      amount,
      description: body.description,
      category: body.category || '',
      recorded_by: userId,
      status: 'pending',
      approved_by: null,
      created_at: now(),
    });
    logSharedActivity(store, userId, userRole, 'create', 'financial_transaction', id, `${transaction_type} ₱${amount}`);
    const aid = nextId(store, 'approvals');
    store.approvals.unshift({
      id: aid,
      title: `${transaction_type} transaction ₱${amount.toFixed(2)}`,
      summary: String(body.description || 'Pending treasurer approval'),
      entity_type: 'financial_transaction',
      entity_id: id,
      requested_by: userId,
      approved_by: null,
      status: 'pending',
      notes: '',
      created_at: now(),
    });
  });
}

export function patchTransaction(userId: number, userRole: string, id: number, status: string) {
  mutate((store) => {
    const t = store.financial_transactions.find((x) => x.id === id);
    if (t) {
      t.status = status;
      t.approved_by = userId;
      logSharedActivity(store, userId, userRole, status === 'approved' ? 'approve' : 'reject', 'financial_transaction', id, `${status} #${id}`);
    }
  });
}

export function listAnnouncements() {
  return getStore().announcements;
}

export function createAnnouncement(userId: number, userRole: string, body: Record<string, unknown>) {
  mutate((store) => {
    const id = nextId(store, 'announcements');
    store.announcements.unshift({
      id,
      title: body.title,
      content: body.content,
      created_by: userId,
      is_public: body.is_public ? 1 : 0,
      created_at: now(),
      full_name: userName(store, userId),
    });
    logSharedActivity(store, userId, userRole, 'create', 'announcement', id, `Published: ${body.title}`);
  });
}

export function listApprovals() {
  const store = getStore();
  return store.approvals.map((a) => ({
    ...a,
    requester: userName(store, Number(a.requested_by)),
    full_name: userName(store, Number(a.requested_by)),
  }));
}

export function createApproval(userId: number, userRole: string, body: Record<string, unknown>) {
  mutate((store) => {
    const id = nextId(store, 'approvals');
    const title = String(body.title || 'New approval request');
    store.approvals.unshift({
      id,
      title,
      summary: String(body.summary || ''),
      entity_type: body.entity_type || 'approval',
      entity_id: body.entity_id != null ? Number(body.entity_id) : null,
      requested_by: Number(body.requested_by || userId),
      approved_by: null,
      status: 'pending',
      notes: String(body.notes || ''),
      created_at: now(),
    });
    logSharedActivity(store, userId, userRole, 'create', 'approval', id, `Submitted: ${title}`);
  });
}

export function patchApproval(userId: number, userRole: string, id: number, status: string) {
  mutate((store) => {
    const a = store.approvals.find((x) => x.id === id);
    if (a) {
      a.status = status;
      a.approved_by = userId;
      const title = String(a.title || `Approval #${id}`);
      logSharedActivity(
        store,
        userId,
        userRole,
        status === 'approved' ? 'approve' : 'reject',
        'approval',
        id,
        `${status === 'approved' ? 'Approved' : 'Rejected'}: ${title}`
      );
    }
  });
}

export function listUsers() {
  return getStore().users.map(({ password: _, ...u }) => u);
}

export function patchUser(actorId: number, actorRole: string, id: number, body: Record<string, string>) {
  mutate((store) => {
    const u = store.users.find((x) => x.id === id);
    if (!u || u.role === 'super_admin') return;
    if (body.status) u.status = body.status as 'active' | 'inactive';
    if (body.role) u.role = body.role as RoleKey;
    logSharedActivity(store, actorId, actorRole, 'update', 'user', id, `Updated user #${id}`);
  });
}

export function listNotifications(userId: number) {
  return getStore().notifications.filter((n) => n.user_id === userId && !n.read_at);
}

export function usersByRole(role: string) {
  return getStore().users.filter((u) => u.role === role && u.status === 'active').map((u) => ({ id: u.id, full_name: u.full_name }));
}

// Generic getters for entity pages
export function getStoreSnapshot(): TMSStore {
  return getStore();
}

export type EntityTable = keyof Pick<
  TMSStore,
  | 'member_requests'
  | 'visit_registrations'
  | 'volunteer_tasks'
  | 'maintenance_records'
  | 'security_incidents'
  | 'inventory_items'
  | 'inventory_usage'
  | 'education_classes'
  | 'class_attendance'
  | 'student_progress'
  | 'worship_schedules'
  | 'worship_records'
  | 'temple_records'
  | 'correspondence'
  | 'budgets'
  | 'event_registrations'
>;

export function listEntity(table: EntityTable): Record<string, unknown>[] {
  return [...(getStore()[table] as Record<string, unknown>[])];
}

export function updateEntity(
  table: EntityTable,
  id: number,
  patch: Record<string, unknown>,
  actorId: number,
  actorRole: string,
  logSummary: string
) {
  mutate((store) => {
    const arr = store[table] as Record<string, unknown>[];
    const row = arr.find((x) => x.id === id);
    if (row) {
      Object.assign(row, patch, { updated_at: now(), updated_by: actorId, updated_by_role: actorRole });
    }
    logSharedActivity(store, actorId, actorRole, 'update', table, id, logSummary);
  });
}

export function createEntity(
  table: EntityTable,
  row: Record<string, unknown>,
  actorId: number,
  actorRole: string,
  logSummary: string
) {
  mutate((store) => {
    const id = nextId(store, table);
    const payload: Record<string, unknown> = {
      ...row,
      id,
      created_at: row.created_at ?? now(),
      created_by: actorId,
      created_by_role: actorRole,
    };

    if (table === 'inventory_usage') {
      const itemId = Number(row.item_id);
      const qty = Number(row.quantity_used) || 0;
      const item = store.inventory_items.find((i) => i.id === itemId);
      if (item) {
        payload.item_name = item.name;
        payload.used_by = actorId;
        item.quantity = Math.max(0, Number(item.quantity) - qty);
        item.updated_at = now();
      }
    }
    if (table === 'event_registrations') {
      payload.registered_at = now();
    }
    if (table === 'class_attendance') {
      payload.recorded_by = actorId;
    }
    if (table === 'student_progress') {
      payload.teacher_id = actorId;
      payload.created_at = now();
    }
    if (table === 'education_classes') {
      payload.status = payload.status ?? 'active';
      payload.coordinator_id = payload.coordinator_id ?? actorId;
    }
    if (table === 'worship_schedules') {
      payload.status = payload.status ?? 'scheduled';
    }
    if (table === 'correspondence') {
      payload.from_user = actorId;
      payload.is_read = 0;
      if (payload.notes != null && payload.content == null) {
        payload.content = payload.notes;
        delete payload.notes;
      }
    }
    if (table === 'temple_records') {
      payload.record_type = payload.record_type ?? 'administrative';
      payload.created_by = actorId;
      payload.full_name = userName(store, actorId);
      if (payload.description != null && payload.content == null) {
        payload.content = payload.description;
      }
    }

    (store[table] as Record<string, unknown>[]).unshift(payload);
    logSharedActivity(store, actorId, actorRole, 'create', table, id, logSummary);
  });
}

export function deleteEntity(
  table: EntityTable,
  id: number,
  actorId: number,
  actorRole: string,
  logSummary: string
) {
  mutate((store) => {
    const arr = store[table] as Record<string, unknown>[];
    const idx = arr.findIndex((x) => x.id === id);
    if (idx >= 0) arr.splice(idx, 1);
    logSharedActivity(store, actorId, actorRole, 'delete', table, id, logSummary);
  });
}

export function saveSettings(settings: Record<string, string>, actorId: number, actorRole: string) {
  mutate((store) => {
    store.temple_settings = { ...store.temple_settings, ...settings };
    logSharedActivity(store, actorId, actorRole, 'update', 'temple_setting', null, 'Updated temple settings');
  });
}
