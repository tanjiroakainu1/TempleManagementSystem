import { getRoleLabel, type RoleKey } from '@/config/roles';
import { getStore } from '@/lib/storage/db';

export interface ChartPoint {
  name: string;
  value: number;
  fill?: string;
}

function countBy<T>(items: T[], keyFn: (item: T) => string): ChartPoint[] {
  const map = new Map<string, number>();
  for (const item of items) {
    const k = keyFn(item) || 'other';
    map.set(k, (map.get(k) ?? 0) + 1);
  }
  return Array.from(map.entries()).map(([name, value]) => ({
    name: name.replace(/_/g, ' '),
    value,
  }));
}

function sumByMonth(
  items: { created_at?: string; amount?: unknown }[],
  amountKey = 'amount'
): ChartPoint[] {
  const map = new Map<string, number>();
  for (const item of items) {
    const d = item.created_at ? new Date(String(item.created_at)) : new Date();
    const label = d.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' });
    const amt = Number(item[amountKey as keyof typeof item] ?? 0);
    map.set(label, (map.get(label) ?? 0) + amt);
  }
  return Array.from(map.entries())
    .map(([name, value]) => ({ name, value }))
    .slice(-8);
}

export function getDonationsTimeline(): ChartPoint[] {
  return sumByMonth(getStore().donations);
}

export function getDonationsByType(): ChartPoint[] {
  const s = getStore();
  const map = new Map<string, number>();
  for (const d of s.donations) {
    const t = String(d.donation_type || 'general');
    map.set(t, (map.get(t) ?? 0) + Number(d.amount));
  }
  return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
}

export function getActivityByAction(): ChartPoint[] {
  return countBy(getStore().activity_log, (a) => String(a.action || 'update'));
}

export function getActivityByRole(): ChartPoint[] {
  return countBy(getStore().activity_log, (a) => getRoleLabel(String(a.user_role || '')));
}

export function getApprovalsByStatus(): ChartPoint[] {
  return countBy(getStore().approvals, (a) => String(a.status || 'pending'));
}

export function getRitualsByStatus(): ChartPoint[] {
  return countBy(getStore().ritual_requests, (r) => String(r.status || 'pending'));
}

export function getEventsByType(): ChartPoint[] {
  const s = getStore();
  return [
    { name: 'Festivals', value: s.events.filter((e) => e.is_festival === 1).length },
    { name: 'Regular Events', value: s.events.filter((e) => e.is_festival !== 1).length },
  ];
}

export function getTransactionsIncomeExpense(): ChartPoint[] {
  const s = getStore();
  let income = 0;
  let expense = 0;
  for (const t of s.financial_transactions) {
    const type = String(t.transaction_type || t.type || '');
    const amt = Number(t.amount);
    if (type === 'income') income += amt;
    else expense += amt;
  }
  return [
    { name: 'Income', value: income },
    { name: 'Expense', value: expense },
  ];
}

export function getUsersByRole(): ChartPoint[] {
  return countBy(getStore().users, (u) => getRoleLabel(String(u.role)));
}

export function getVolunteerTasksByStatus(): ChartPoint[] {
  return countBy(getStore().volunteer_tasks, (t) => String(t.status || 'pending'));
}

export function getInventoryStock(): ChartPoint[] {
  return getStore()
    .inventory_items.slice(0, 8)
    .map((i) => ({ name: String(i.name || `Item ${i.id}`).slice(0, 14), value: Number(i.quantity) }));
}

export function getVisitsThisWeek(): ChartPoint[] {
  return countBy(getStore().visit_registrations, (v) => String(v.visit_date || 'unknown'));
}

export function getModuleCounts(): ChartPoint[] {
  const s = getStore();
  return [
    { name: 'Users', value: s.users.length },
    { name: 'Donations', value: s.donations.length },
    { name: 'Events', value: s.events.length },
    { name: 'Rituals', value: s.ritual_requests.length },
    { name: 'Approvals', value: s.approvals.length },
    { name: 'Activity', value: s.activity_log.length },
  ];
}

export type ChartId =
  | 'donations_timeline'
  | 'donations_type'
  | 'activity_action'
  | 'activity_role'
  | 'approvals_status'
  | 'rituals_status'
  | 'events_type'
  | 'finance_ie'
  | 'users_role'
  | 'volunteer_tasks'
  | 'inventory_stock'
  | 'visits'
  | 'module_counts';

export const CHART_BUILDERS: Record<ChartId, () => ChartPoint[]> = {
  donations_timeline: getDonationsTimeline,
  donations_type: getDonationsByType,
  activity_action: getActivityByAction,
  activity_role: getActivityByRole,
  approvals_status: getApprovalsByStatus,
  rituals_status: getRitualsByStatus,
  events_type: getEventsByType,
  finance_ie: getTransactionsIncomeExpense,
  users_role: getUsersByRole,
  volunteer_tasks: getVolunteerTasksByStatus,
  inventory_stock: getInventoryStock,
  visits: getVisitsThisWeek,
  module_counts: getModuleCounts,
};

/** Which charts each role sees on dashboard + reports */
export const ROLE_CHARTS: Record<RoleKey, ChartId[]> = {
  super_admin: [
    'module_counts',
    'donations_timeline',
    'activity_role',
    'approvals_status',
    'users_role',
    'finance_ie',
  ],
  temple_administrator: ['module_counts', 'approvals_status', 'activity_action', 'events_type', 'volunteer_tasks'],
  head_priest: ['rituals_status', 'activity_action', 'donations_timeline'],
  priest: ['rituals_status', 'donations_timeline', 'activity_action'],
  temple_secretary: ['activity_action', 'module_counts', 'visits'],
  treasurer: ['donations_timeline', 'donations_type', 'finance_ie', 'approvals_status'],
  accountant: ['finance_ie', 'donations_timeline', 'approvals_status', 'activity_action'],
  donation_manager: ['donations_timeline', 'donations_type', 'activity_action'],
  event_manager: ['events_type', 'volunteer_tasks', 'visits', 'activity_action'],
  volunteer_coordinator: ['volunteer_tasks', 'events_type', 'activity_action'],
  volunteer: ['volunteer_tasks', 'events_type', 'activity_action'],
  member: ['events_type', 'rituals_status', 'donations_timeline'],
  devotee: ['rituals_status', 'donations_timeline', 'events_type'],
  visitor: ['visits', 'events_type', 'activity_action'],
  ritual_coordinator: ['rituals_status', 'activity_action', 'approvals_status'],
  education_coordinator: ['module_counts', 'activity_action', 'users_role'],
  teacher_instructor: ['activity_action', 'module_counts'],
  inventory_manager: ['inventory_stock', 'module_counts', 'activity_action'],
  maintenance_staff: ['volunteer_tasks', 'approvals_status', 'activity_action'],
  security_guard: ['visits', 'activity_action', 'approvals_status'],
};

export const CHART_META: Record<ChartId, { title: string; type: 'bar' | 'pie' | 'area' | 'line' | 'radial' }> = {
  donations_timeline: { title: '💰 Donations flow', type: 'area' },
  donations_type: { title: '🎁 Donations by type', type: 'pie' },
  activity_action: { title: '⚡ CRUD actions', type: 'bar' },
  activity_role: { title: '👥 Activity by role', type: 'bar' },
  approvals_status: { title: '✅ Approvals pipeline', type: 'pie' },
  rituals_status: { title: '📿 Ritual requests', type: 'pie' },
  events_type: { title: '🎉 Events mix', type: 'pie' },
  finance_ie: { title: '💳 Income vs expense', type: 'bar' },
  users_role: { title: '🛕 Users by role', type: 'pie' },
  volunteer_tasks: { title: '🤝 Volunteer tasks', type: 'bar' },
  inventory_stock: { title: '📦 Stock levels', type: 'bar' },
  visits: { title: '🚶 Visits', type: 'line' },
  module_counts: { title: '📊 Temple modules', type: 'bar' },
};

export function getChartsForRole(role: RoleKey): { id: ChartId; data: ChartPoint[]; meta: (typeof CHART_META)[ChartId] }[] {
  return ROLE_CHARTS[role].map((id) => ({
    id,
    data: CHART_BUILDERS[id](),
    meta: CHART_META[id],
  }));
}
