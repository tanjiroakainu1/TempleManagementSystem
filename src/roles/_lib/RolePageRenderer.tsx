import { FormEvent, useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, getRoleFolder } from '@/context/AuthContext';
import { useDataVersion, useDataRefresh } from '@/context/DataContext';
import { ENTITY_TABLE_DEFAULTS, ENTITY_READ_ONLY_SLUGS, CUSTOM_TABLE_FILTERS } from '@/config/entityDefaults';
import type { EntityTable } from '@/lib/storage/services';
import { dataApi } from '@/lib/api';
import { getStore, userName } from '@/lib/storage/db';
import { ROLE_PAGES, type RolePageDef } from '@/config/rolePageConfig';
import { ROLE_DASHBOARD } from '@/config/roleDashboard';
import { ROLES, type RoleKey } from '@/config/roles';
import { getNavItems } from '@/config/navigation';
import RolePageShell from '@/components/role/RolePageShell';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import StatCard from '@/components/ui/StatCard';
import SharedActivityTable from '@/components/shared/SharedActivityTable';
import CrudActivityNotice from '@/components/shared/CrudActivityNotice';
import DataLoadState from '@/components/shared/DataLoadState';
import { CrazyChartsBlock, RoleDashboardCharts, TempleChartsMega } from '@/components/charts';
import { APP_PRIVACY, CRUD_SUCCESS_MSG } from '@/config/privacy';
import { UI_LABELS } from '@/config/uiLabels';
import RoleCapabilitiesCard from '@/roles/_lib/RoleCapabilitiesCard';
import DeveloperCredit from '@/components/layout/DeveloperCredit';
import { DEVELOPER } from '@/config/developer';
import { getRoleCapabilities } from '@/config/roleCapabilities';
import { useData } from '@/hooks/useData';
import { formatDate, formatDateTime, formatMoney } from '@/lib/utils';

interface Props {
  role: RoleKey;
  slug: string;
}

/** After any CRUD: show message, reload hook data, bump global store version */
function useCrudDone(reload: () => void, setMsg?: (s: string) => void) {
  const refresh = useDataRefresh();
  return () => {
    setMsg?.(CRUD_SUCCESS_MSG);
    reload();
    refresh();
  };
}

const STAT_LABELS: Record<string, string> = {
  users: 'Total Users',
  pending_approvals: 'Pending Approvals',
  events: 'Active Events',
  donations: 'Total Donations',
  total_donations: 'Total Donations',
  transactions: 'Transactions',
  pending: 'Pending',
  my_rituals: 'My Rituals',
  my_donations: 'My Donations',
  my_tasks: 'My Tasks',
  active_events: 'Active Events',
  open_tasks: 'Open Tasks',
  pending_rituals: 'Pending Rituals',
  priests: 'Active Priests',
  today_services: "Today's Services",
  upcoming: 'Upcoming Services',
  assigned_rituals: 'Assigned Rituals',
  total: 'Total Amount',
  donors: 'Unique Donors',
  registrations: 'Registrations',
  volunteers: 'Volunteers',
  classes: 'Classes',
  teachers: 'Teachers',
  my_classes: 'My Classes',
  items: 'Inventory Items',
  low_stock: 'Low Stock Items',
  open: 'Open Tasks',
  incidents: 'Open Incidents',
  visits_today: 'Visits Today',
  records: 'Temple Records',
  announcements: 'Announcements',
  requests: 'My Requests',
  scheduled: 'Scheduled Rituals',
  shared_activity: 'Shared Table Entries',
  ceremonies: 'Ceremonies Scheduled',
};

async function loadCustom(custom: string, userId: number): Promise<Record<string, unknown>[]> {
  const s = getStore();
  switch (custom) {
    case 'operations':
      return [
        { metric: 'Pending Approvals', value: s.approvals.filter((a) => a.status === 'pending').length },
        { metric: 'Open Maintenance', value: s.maintenance_records.filter((m) => m.status !== 'completed').length },
        { metric: 'Visits Today', value: s.visit_registrations.filter((v) => String(v.visit_date) === new Date().toISOString().slice(0, 10)).length },
      ];
    case 'priests':
      return (await dataApi.usersByRole('priest')).users as unknown as Record<string, unknown>[];
    case 'my-schedule':
      return s.worship_schedules.filter((w) => w.priest_id === userId);
    case 'my-rituals':
      return (await dataApi.ritualRequests()).requests;
    case 'donors':
      return (await dataApi.donations()).donations;
    case 'volunteers':
      return (await dataApi.usersByRole('volunteer')).users as unknown as Record<string, unknown>[];
    case 'my-tasks':
      return s.volunteer_tasks.filter((t) => t.volunteer_id === userId);
    case 'volunteer-activities':
      return s.volunteer_tasks.filter((t) => t.status !== 'completed').slice(0, 10);
    case 'member-activities':
      return s.events.filter((e) => e.status === 'active').map((e) => ({ activity: e.title, date: e.event_date, status: e.status }));
    case 'public-info':
      return (await dataApi.announcements()).announcements.filter((a) => a.is_public);
    case 'ritual-schedule':
      return s.ritual_requests.filter((r) => r.status === 'scheduled');
    case 'ritual-requests':
      return (await dataApi.ritualRequests()).requests;
    case 'my-teachings':
      return s.education_classes.filter((c) => c.teacher_id === userId);
    case 'stock-monitor':
      return s.inventory_items.map((i) => ({
        ...i,
        alert: Number(i.quantity) <= Number(i.min_stock) ? 'LOW' : 'OK',
      }));
    case 'statements':
      return s.financial_transactions;
    default:
      return [];
  }
}

function applyCreateDefaults(
  table: EntityTable,
  slug: string,
  role: RoleKey,
  userId: number,
  row: Record<string, unknown>
) {
  const numKeys = ['priest_id', 'volunteer_id', 'event_id', 'user_id', 'class_id', 'student_id', 'item_id', 'attendees', 'present', 'capacity', 'amount', 'quantity_used', 'min_stock', 'quantity'];
  numKeys.forEach((k) => {
    if (row[k] !== undefined && row[k] !== '') row[k] = Number(row[k]);
  });

  switch (table) {
    case 'worship_schedules':
      if (!row.priest_id && (role === 'priest' || slug === 'schedule')) row.priest_id = userId;
      if (!row.status) row.status = 'scheduled';
      break;
    case 'worship_records':
      row.priest_id = userId;
      break;
    case 'volunteer_tasks':
      if (role === 'volunteer_coordinator') row.coordinator_id = userId;
      if (!row.status) row.status = 'pending';
      break;
    case 'maintenance_records':
      row.reported_by = userId;
      row.assigned_to = userId;
      if (!row.status) row.status = 'open';
      if (!row.priority) row.priority = 'medium';
      break;
    case 'event_registrations':
      if (!row.user_id) row.user_id = userId;
      break;
    case 'class_attendance':
      row.recorded_by = userId;
      if (row.present === undefined) row.present = 1;
      break;
    case 'student_progress':
      row.teacher_id = userId;
      break;
    case 'inventory_usage':
      row.used_by = userId;
      break;
    case 'security_incidents':
      row.reported_by = userId;
      if (!row.status) row.status = 'open';
      break;
    case 'education_classes':
      row.coordinator_id = userId;
      row.status = 'active';
      break;
    case 'budgets':
      row.created_by = userId;
      break;
    default:
      break;
  }
}

function DataTable({
  rows,
  columns,
  onDelete,
  rowActions,
}: {
  rows: Record<string, unknown>[];
  columns: { key: string; label: string; format?: string }[];
  onDelete?: (id: number) => void;
  rowActions?: (row: Record<string, unknown>) => ReactNode;
}) {
  if (!rows.length) {
    return (
      <div className="text-center py-12 text-slate-400">
        <span className="text-4xl block mb-2">📭</span>
        No records yet.
      </div>
    );
  }
  return (
    <div className="table-scroll">
      <table className="w-full text-xs sm:text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left text-slate-500">
            {columns.map((c) => (
              <th key={c.key} className="pb-2 sm:pb-3 pr-2 sm:pr-4 font-medium whitespace-nowrap">{c.label}</th>
            ))}
            {(onDelete || rowActions) && <th className="pb-2 sm:pb-3 pr-2 sm:pr-4 font-medium w-24 sm:w-32">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={String(row.id ?? i)} className="border-b border-candy-50 hover:bg-candy-50/80">
              {columns.map((c) => (
                <td key={c.key} className="py-2 sm:py-3 pr-2 sm:pr-4">
                  {c.format === 'money' ? formatMoney(Number(row[c.key])) :
                    c.format === 'date' ? formatDate(String(row[c.key])) :
                    c.format === 'datetime' ? formatDateTime(String(row[c.key])) :
                    c.format === 'badge' ? <Badge status={String(row[c.key])} /> :
                    String(row[c.key] ?? '—')}
                </td>
              ))}
              {(onDelete || rowActions) && (
                <td className="py-3 pr-4">
                  <div className="flex flex-wrap gap-1">
                    {rowActions?.(row)}
                    {onDelete && row.id != null && (
                      <Button variant="danger" className="text-xs py-1 px-2" onClick={() => onDelete(Number(row.id))}>
                        Delete
                      </Button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function inferColumns(rows: Record<string, unknown>[]) {
  if (!rows.length) return [{ key: 'id', label: 'ID' }];
  return Object.keys(rows[0])
    .filter((k) => !['password'].includes(k))
    .slice(0, 6)
    .map((key) => ({ key, label: key.replace(/_/g, ' ') }));
}

export default function RolePageRenderer({ role, slug }: Props) {
  const def = ROLE_PAGES[role]?.[slug];
  const { user } = useAuth();
  const version = useDataVersion();
  const [msg, setMsg] = useState('');

  if (!def || !user) {
    return (
      <RolePageShell title="Page Not Found" slug={slug}>
        <Card><CardBody><p className="text-slate-500">This page is not configured for your role.</p></CardBody></Card>
      </RolePageShell>
    );
  }

  return <PageBody role={role} slug={slug} def={def} user={user} version={version} msg={msg} setMsg={setMsg} />;
}

function PageBody({
  role,
  slug,
  def,
  user,
  version,
  msg,
  setMsg,
}: {
  role: RoleKey;
  slug: string;
  def: RolePageDef;
  user: { id: number; full_name: string; role: RoleKey };
  version: number;
  msg: string;
  setMsg: (s: string) => void;
}) {
  const folder = getRoleFolder(role);
  const meta = ROLE_DASHBOARD[role];
  const roleInfo = ROLES[role];

  if (def.type === 'dashboard') {
    return <RoleDashboard role={role} slug={slug} def={def} meta={meta} roleInfo={roleInfo} folder={folder} user={user} version={version} />;
  }

  if (def.type === 'users') {
    return <UsersView def={def} slug={slug} version={version} />;
  }
  if (def.type === 'approvals') {
    return <ApprovalsView def={def} slug={slug} version={version} msg={msg} setMsg={setMsg} userId={user.id} role={role} />;
  }
  if (def.type === 'announcements') {
    return <AnnouncementsView def={def} slug={slug} version={version} />;
  }
  if (def.type === 'donate') {
    return <DonateView def={def} slug={slug} version={version} />;
  }
  if (def.type === 'donations' || def.type === 'donations-readonly') {
    return <DonationsView def={def} slug={slug} version={version} readonly={def.type === 'donations-readonly'} />;
  }
  if (def.type === 'book-ritual') {
    return <BookRitualView def={def} slug={slug} version={version} />;
  }
  if (def.type === 'events' || def.type === 'festivals') {
    return (
      <EventsView def={def} slug={slug} version={version} festival={def.type === 'festivals'} role={role} />
    );
  }
  if (def.type === 'transactions' || def.type === 'finances') {
    return <TransactionsView def={def} slug={slug} version={version} role={role} />;
  }
  if (def.type === 'ritual-approval') {
    return <RitualApprovalView def={def} slug={slug} version={version} setMsg={setMsg} msg={msg} />;
  }
  if (def.type === 'monitor') {
    return <MonitorView def={def} slug={slug} version={version} setMsg={setMsg} msg={msg} />;
  }
  if (def.type === 'settings') {
    return <SettingsView def={def} slug={slug} role={role} version={version} />;
  }
  if (def.type === 'permissions') {
    return <PermissionsView def={def} slug={slug} />;
  }
  if (def.type === 'system-control') {
    return <SystemControlView def={def} slug={slug} version={version} role={role} />;
  }
  if (def.type === 'reports') {
    return <ReportsView def={def} slug={slug} version={version} role={role} />;
  }
  if (def.type === 'entity' && def.entity) {
    return <EntityView def={def} slug={slug} userId={user.id} version={version} msg={msg} setMsg={setMsg} role={role} />;
  }

  return null;
}

function RoleDashboard({
  role,
  slug,
  def,
  meta,
  roleInfo,
  folder,
  user,
  version,
}: {
  role: RoleKey;
  slug: string;
  def: RolePageDef;
  meta: (typeof ROLE_DASHBOARD)[RoleKey];
  roleInfo: (typeof ROLES)[RoleKey];
  folder: string;
  user: { full_name: string };
  version: number;
}) {
  const [stats, setStats] = useState<Record<string, number>>({});
  const nav = getNavItems(role).filter((n) => n.slug !== 'dashboard' && !n.shared);
  const cap = getRoleCapabilities(role);
  const variants = ['default', 'maroon', 'gold', 'green'] as const;
  const { data: recentActivity, loading: activityLoading, error: activityError } = useData(
    () => dataApi.activityLog().then((r) => r.activities),
    [version]
  );

  useEffect(() => {
    dataApi.dashboardStats().then(({ stats: s }) => setStats(s)).catch(() => setStats({}));
  }, [version]);

  const formatVal = (key: string, val: number) => {
    if (key.includes('donation') || key === 'total' || key.includes('income') || key.includes('expense') || key === 'my_donations')
      return formatMoney(val);
    return String(val);
  };

  return (
    <RolePageShell title={def.title} slug={slug} icon={def.icon} description={meta.welcome}>
      <div className="rounded-2xl border-2 border-candy-200 bg-gradient-to-r from-candy-100 via-white to-candy-50 p-5 shadow-candy">
        <p className="text-xs font-bold uppercase tracking-wider text-candy-600">
          {cap.order}. {cap.title} · {meta.tagline}
        </p>
        <p className="mt-1 text-lg font-bold text-candy-900">Welcome back, {user.full_name}</p>
      </div>
      {Object.keys(stats).length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {Object.entries(stats).map(([key, val], i) => (
            <StatCard
              key={key}
              icon={roleInfo.icon}
              value={formatVal(key, val)}
              label={STAT_LABELS[key] ?? key.replace(/_/g, ' ')}
              variant={variants[i % variants.length]}
            />
          ))}
        </div>
      )}
      <RoleCapabilitiesCard role={role} />
      <RoleDashboardCharts role={role} version={version} slug={slug} />
      {(role === 'super_admin' || role === 'temple_administrator') && <TempleChartsMega version={version} />}
      <Card>
        <CardHeader title="Quick actions" />
        <CardBody>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {nav.map((item) => (
              <Link
                key={item.slug}
                to={`/${folder}/${item.slug}`}
                className="group flex items-center gap-3 rounded-2xl border-2 border-candy-200 bg-white p-4 hover:border-candy-600 hover:shadow-candy transition"
              >
                <span className="text-2xl group-hover:scale-110 transition">{item.icon}</span>
                <div>
                  <div className="font-bold text-candy-900">{item.label}</div>
                  <div className="text-xs text-candy-500">Open module →</div>
                </div>
              </Link>
            ))}
          </div>
        </CardBody>
      </Card>
      {APP_PRIVACY.showDashboardActivity &&
        (activityError ? (
          <p className="text-sm text-rose-600">{activityError}</p>
        ) : (
          <SharedActivityTable
            rows={(recentActivity || []) as import('@/components/shared/SharedActivityTable').ActivityRow[]}
            loading={activityLoading}
            compact
            maxRows={8}
            title="Recent updates"
          />
        ))}
    </RolePageShell>
  );
}

function EntityView({
  def,
  slug,
  userId,
  version,
  msg,
  setMsg,
  role,
}: {
  def: RolePageDef;
  slug: string;
  userId: number;
  version: number;
  msg: string;
  setMsg: (s: string) => void;
  role: RoleKey;
}) {
  const ent = def.entity!;
  const table = ent.table;
  const defaults = table ? ENTITY_TABLE_DEFAULTS[table] : undefined;
  const formFields = ent.formFields ?? defaults?.formFields;
  const columns =
    ent.columns ??
    defaults?.columns ??
    (ent.custom === 'stock-monitor'
      ? [
          { key: 'name', label: 'Item' },
          { key: 'quantity', label: 'Qty' },
          { key: 'min_stock', label: 'Min' },
          { key: 'alert', label: 'Stock', format: 'badge' as const },
        ]
      : undefined);

  const interactiveCustom = ent.custom === 'my-tasks' || ent.custom === 'my-rituals';
  const readOnly = ENTITY_READ_ONLY_SLUGS.has(slug) || Boolean(ent.custom && !table && !interactiveCustom);
  const canCreate = Boolean(
    table &&
      formFields?.length &&
      !readOnly &&
      !(role === 'devotee' && table === 'worship_schedules')
  );
  const canDelete = Boolean(table && !readOnly && slug !== 'info');

  const loader = async () => {
    if (table) {
      let rows = (await dataApi.listEntity(table)).rows;
      const filterMeta = ent.custom ? CUSTOM_TABLE_FILTERS[ent.custom] : undefined;
      if (filterMeta) rows = rows.filter((r) => filterMeta.filter(r, userId));
      if (ent.custom === 'stock-monitor') {
        rows = rows.map((i) => ({
          ...i,
          alert: Number(i.quantity) <= Number(i.min_stock) ? 'LOW' : 'OK',
        }));
      }
      return rows;
    }
    if (ent.custom) return loadCustom(ent.custom, userId);
    return [];
  };

  const { data: rows, loading, error, reload } = useData(loader, [slug, version, ent.custom, table]);
  const resolvedColumns = columns ?? inferColumns(rows || []);

  const afterMutate = useCrudDone(reload, setMsg);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!table || !formFields?.length) return;
    const fd = new FormData(e.currentTarget);
    const row: Record<string, unknown> = {};
    formFields.forEach((f) => {
      const v = fd.get(f.name);
      if (v !== null && v !== '') row[f.name] = v;
    });
    applyCreateDefaults(table, slug, role, userId, row);
    if (slug === 'register-visit') {
      row.visitor_id = userId;
      row.status = 'pending';
      row.checked_in = 0;
    }
    if (slug === 'requests') {
      row.member_id = userId;
      row.status = 'pending';
    }
    await dataApi.createEntity(table, row, `Created ${def.title}`);
    (e.target as HTMLFormElement).reset();
    afterMutate();
  };

  const onDelete = canDelete
    ? async (id: number) => {
        if (!confirm('Delete this record?')) return;
        await dataApi.deleteEntity(table!, id, `Deleted from ${def.title}`);
        afterMutate();
      }
    : undefined;

  const patchRow = async (id: number, patch: Record<string, unknown>, summary: string) => {
    if (!table) return;
    await dataApi.updateEntity(table, id, patch, summary);
    afterMutate();
  };

  const rowActions = (row: Record<string, unknown>): ReactNode => {
    if (!row.id) return null;
    const id = Number(row.id);
    const actions: ReactNode[] = [];

    if (table === 'volunteer_tasks' && (role === 'volunteer' || ent.custom === 'my-tasks')) {
      if (row.status !== 'completed') {
        actions.push(
          <Button key="done" className="text-xs py-1 px-2" onClick={() => patchRow(id, { status: 'completed' }, 'Task completed')}>
            Complete
          </Button>
        );
      }
    }
    if (table === 'maintenance_records' && role === 'maintenance_staff') {
      if (row.status === 'open') {
        actions.push(
          <Button key="start" className="text-xs py-1 px-2" onClick={() => patchRow(id, { status: 'in_progress' }, 'Started maintenance')}>
            Start
          </Button>
        );
      }
      if (row.status === 'in_progress') {
        actions.push(
          <Button key="done" className="text-xs py-1 px-2" onClick={() => patchRow(id, { status: 'completed', completed_at: new Date().toISOString() }, 'Completed maintenance')}>
            Done
          </Button>
        );
      }
    }
    if (table === 'visit_registrations' && role === 'security_guard' && !row.checked_in) {
      actions.push(
        <Button key="in" className="text-xs py-1 px-2" onClick={() => patchRow(id, { checked_in: 1, status: 'completed' }, 'Visitor checked in')}>
          Check in
        </Button>
      );
    }
    if (table === 'inventory_items' && ent.custom === 'stock-monitor') {
      actions.push(
        <Button key="restock" className="text-xs py-1 px-2" onClick={() => patchRow(id, { quantity: Number(row.quantity) + 5 }, 'Restocked +5')}>
          +5 stock
        </Button>
      );
    }
    if (ent.custom === 'my-rituals' && role === 'priest' && row.status === 'scheduled') {
      actions.push(
        <Button key="complete" className="text-xs py-1 px-2" onClick={() => dataApi.patchRitualRequest(id, { status: 'completed' }).then(afterMutate)}>
          Complete
        </Button>
      );
    }

    return actions.length ? <>{actions}</> : null;
  };

  const showRitualCards = ent.custom === 'ritual-requests' && role === 'ritual_coordinator';

  return (
    <RolePageShell title={def.title} slug={slug} icon={def.icon}>
      {msg && <CrudActivityNotice message={msg} />}
      {error && <DataLoadState error={error} />}
      {canCreate && (
        <Card>
          <CardHeader title="Add New" />
          <CardBody>
            <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
              {formFields!.map((f) => (
                <div key={f.name}>
                  <label className="block text-sm font-medium mb-1">{f.label}</label>
                  <input name={f.name} type={f.type || 'text'} required={f.type !== 'number'} className="input-candy" />
                </div>
              ))}
              <div className="sm:col-span-2"><Button type="submit">{UI_LABELS.saveButton}</Button></div>
            </form>
          </CardBody>
        </Card>
      )}
      {readOnly && !canCreate && (
        <p className="text-sm text-slate-500 mb-3">View-only list — changes are made on other pages or by coordinators.</p>
      )}
      <Card>
        <CardHeader title="Records" />
        <CardBody>
          <DataLoadState loading={loading} error={error} empty={!(rows || []).length}>
            {showRitualCards ? (
              <div className="space-y-3">
                {(rows || []).map((r) => (
                  <div key={String(r.id)} className="flex flex-col sm:flex-row sm:justify-between gap-3 border rounded-xl p-4">
                    <div>
                      <p className="font-semibold">{String(r.ritual_type)}</p>
                      <p className="text-sm text-slate-500">{String(r.status)} · {formatDate(String(r.preferred_date || r.requested_date))}</p>
                    </div>
                    {r.status === 'pending' && <RitualScheduleInline id={Number(r.id)} ritualType={String(r.ritual_type)} onDone={afterMutate} />}
                  </div>
                ))}
              </div>
            ) : ent.custom === 'my-tasks' ? (
              <div className="space-y-3">
                {(rows || []).map((t) => (
                  <div key={String(t.id)} className="flex flex-col sm:flex-row sm:justify-between gap-3 border rounded-xl p-4">
                    <div>
                      <p className="font-semibold">{String(t.title)}</p>
                      <p className="text-sm text-slate-500">{String(t.description)} · <Badge status={String(t.status)} /></p>
                    </div>
                    {t.status !== 'completed' && (
                      <Button className="text-xs" onClick={() => dataApi.updateEntity('volunteer_tasks', Number(t.id), { status: 'completed' }, 'Task completed').then(afterMutate)}>
                        Mark complete
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            ) : ent.custom === 'my-rituals' ? (
              <div className="space-y-3">
                {(rows || []).map((r) => (
                  <div key={String(r.id)} className="flex flex-col sm:flex-row sm:justify-between gap-3 border rounded-xl p-4">
                    <div>
                      <p className="font-semibold">{String(r.ritual_type)}</p>
                      <p className="text-sm text-slate-500"><Badge status={String(r.status)} /> · {formatDate(String(r.scheduled_date || r.preferred_date))}</p>
                    </div>
                    {r.status === 'scheduled' && (
                      <Button className="text-xs" onClick={() => dataApi.patchRitualRequest(Number(r.id), { status: 'completed' }).then(afterMutate)}>
                        Mark completed
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <DataTable
                rows={rows || []}
                columns={resolvedColumns}
                onDelete={onDelete}
                rowActions={ent.custom === 'ritual-requests' ? undefined : rowActions}
              />
            )}
          </DataLoadState>
        </CardBody>
      </Card>
    </RolePageShell>
  );
}

function RitualScheduleInline({ id, ritualType, onDone }: { id: number; ritualType: string; onDone: () => void }) {
  const [priestId, setPriestId] = useState('');
  const [date, setDate] = useState('');
  const submit = async () => {
    if (!priestId || !date) return;
    await dataApi.patchRitualRequest(id, {
      action: 'schedule',
      priest_id: Number(priestId),
      scheduled_date: date,
    });
    onDone();
  };
  return (
    <div className="flex flex-wrap items-end gap-2">
      <div>
        <label className="text-xs text-slate-500">Priest ID</label>
        <input value={priestId} onChange={(e) => setPriestId(e.target.value)} className="input-candy text-sm w-24" placeholder="ID" />
      </div>
      <div>
        <label className="text-xs text-slate-500">Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input-candy text-sm" />
      </div>
      <Button className="text-xs py-1 px-2" onClick={submit}>Schedule {ritualType}</Button>
    </div>
  );
}

function UsersView({ def, slug, version }: { def: RolePageDef; slug: string; version: number }) {
  const { data, reload } = useData(() => dataApi.users().then((r) => r.users), [version]);
  const done = useCrudDone(reload);
  const toggle = async (id: number, status: string) => {
    await dataApi.patchUser(id, { status: status === 'active' ? 'inactive' : 'active' });
    done();
  };
  return (
    <RolePageShell title={def.title} slug={slug} icon={def.icon}>
      <Card>
        <CardBody className="table-scroll p-0 sm:p-5">
          <DataTable
            rows={(data || []) as Record<string, unknown>[]}
            columns={[
              { key: 'full_name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'role', label: 'Role', format: 'badge' },
              { key: 'status', label: 'Status', format: 'badge' },
            ]}
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {(data || []).slice(0, 8).map((u) => (
              <Button key={u.id} className="text-xs" onClick={() => toggle(u.id as number, String(u.status))}>
                Toggle {String(u.full_name).split(' ')[0]}
              </Button>
            ))}
          </div>
        </CardBody>
      </Card>
    </RolePageShell>
  );
}

function ApprovalsView({
  def,
  slug,
  version,
  msg,
  setMsg,
  userId,
  role,
}: {
  def: RolePageDef;
  slug: string;
  version: number;
  msg: string;
  setMsg: (s: string) => void;
  userId: number;
  role: RoleKey;
}) {
  const { data, loading, error, reload } = useData(() => dataApi.approvals().then((r) => r.approvals), [version]);
  const done = useCrudDone(reload, setMsg);
  const rows = (data || []) as Record<string, unknown>[];
  const pending = rows.filter((a) => a.status === 'pending');
  const approved = rows.filter((a) => a.status === 'approved');
  const rejected = rows.filter((a) => a.status === 'rejected');

  const act = async (id: number, status: 'approved' | 'rejected') => {
    await dataApi.patchApproval(id, status);
    done();
  };

  const onCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await dataApi.createApproval({
      title: fd.get('title'),
      summary: fd.get('summary'),
      entity_type: fd.get('entity_type'),
      requested_by: userId,
    });
    done();
    (e.target as HTMLFormElement).reset();
  };

  return (
    <RolePageShell title={def.title} slug={slug} icon={def.icon} charts={false}>
      {msg && <CrudActivityNotice message={msg} />}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon="⏳" value={pending.length} label="Pending" variant="gold" />
        <StatCard icon="✅" value={approved.length} label="Approved" variant="green" />
        <StatCard icon="❌" value={rejected.length} label="Rejected" variant="maroon" />
      </div>

      <CrazyChartsBlock role={role} slug={slug} version={version} variant="page" />

      <Card>
        <CardHeader title="Submit approval request" />
        <CardBody>
          <form onSubmit={onCreate} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            <div className="sm:col-span-2">
              <label className="block text-sm font-bold text-candy-800 mb-1">Title</label>
              <input name="title" required className="input-candy" placeholder="e.g. New expense approval" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-bold text-candy-800 mb-1">Summary</label>
              <input name="summary" className="input-candy" placeholder="Short description" />
            </div>
            <div>
              <label className="block text-sm font-bold text-candy-800 mb-1">Module</label>
              <select name="entity_type" className="input-candy">
                <option value="approval">General</option>
                <option value="financial_transaction">Transaction</option>
                <option value="member_request">Member Request</option>
                <option value="ritual_request">Ritual</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button type="submit">Add to queue</Button>
            </div>
          </form>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Pending — approve or reject" />
        <CardBody>
          <DataLoadState
            loading={loading}
            error={error}
            empty={!pending.length}
            emptyMessage="No pending approvals. Add one above or check the full list below."
          >
            <div className="space-y-3">
              {pending.map((a) => (
                <div
                  key={String(a.id)}
                  className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-between sm:items-center gap-3 rounded-xl border-2 border-candy-200 bg-candy-50/50 p-3 sm:p-4"
                >
                  <div>
                    <p className="font-bold text-candy-900">{String(a.title || a.summary)}</p>
                    <p className="text-sm text-candy-600">
                      {String(a.requester || a.full_name)} · {String(a.entity_type || 'approval')} ·{' '}
                      {formatDateTime(String(a.created_at))}
                    </p>
                    {String(a.summary || '').length > 0 && (
                      <p className="text-sm text-slate-600 mt-1">{String(a.summary)}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => act(Number(a.id), 'approved')}>Approve</Button>
                    <Button variant="danger" onClick={() => act(Number(a.id), 'rejected')}>
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </DataLoadState>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="All approvals" />
        <CardBody>
          <DataLoadState loading={loading} error={error} empty={!rows.length} emptyMessage="No approvals yet.">
            <DataTable
              rows={rows}
              columns={[
                { key: 'title', label: 'Title' },
                { key: 'requester', label: 'Requester' },
                { key: 'entity_type', label: 'Module', format: 'badge' },
                { key: 'status', label: 'Status', format: 'badge' },
                { key: 'created_at', label: 'Date', format: 'datetime' },
              ]}
            />
          </DataLoadState>
        </CardBody>
      </Card>
    </RolePageShell>
  );
}

function AnnouncementsView({ def, slug, version }: { def: RolePageDef; slug: string; version: number }) {
  const [msg, setMsg] = useState('');
  const { data, reload } = useData(() => dataApi.announcements().then((r) => r.announcements), [version]);
  const done = useCrudDone(reload, setMsg);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await dataApi.createAnnouncement({
      title: fd.get('title'),
      content: fd.get('content'),
      is_public: fd.get('is_public') === '1' ? 1 : 0,
    });
    (e.target as HTMLFormElement).reset();
    done();
  };
  return (
    <RolePageShell title={def.title} slug={slug} icon={def.icon}>
      {msg && <CrudActivityNotice message={msg} />}
      <Card>
        <CardHeader title="New Announcement" />
        <CardBody>
          <form onSubmit={onSubmit} className="space-y-3 max-w-lg">
            <input name="title" placeholder="Title" required className="input-candy" />
            <textarea name="content" placeholder="Content" required rows={3} className="input-candy" />
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="is_public" value="1" /> Public</label>
            <Button type="submit">Publish</Button>
          </form>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="All Announcements" />
        <CardBody>
          <DataTable rows={(data || []) as Record<string, unknown>[]} columns={[{ key: 'title', label: 'Title' }, { key: 'created_at', label: 'Date', format: 'datetime' }]} />
        </CardBody>
      </Card>
    </RolePageShell>
  );
}

function DonateView({ def, slug, version }: { def: RolePageDef; slug: string; version: number }) {
  const [msg, setMsg] = useState('');
  const { data, reload } = useData(() => dataApi.donations().then((r) => r.donations), [version]);
  const done = useCrudDone(reload, setMsg);
  const total = (data || []).reduce((s, d) => s + Number(d.amount), 0);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await dataApi.createDonation({
      amount: Number(fd.get('amount')),
      donation_type: fd.get('donation_type'),
      purpose: fd.get('purpose'),
      payment_method: fd.get('payment_method'),
    });
    done();
  };
  return (
    <RolePageShell title={def.title} slug={slug} icon={def.icon}>
      {msg && <CrudActivityNotice message={msg} />}
      <StatCard icon="🎁" value={formatMoney(total)} label="Total Donated" variant="green" />
      <Card>
        <CardHeader title="Make a Donation" />
        <CardBody>
          <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            <div><label className="text-sm font-medium">Amount (₱)</label><input name="amount" type="number" step="0.01" min="1" required className="input-candy mt-1" /></div>
            <div><label className="text-sm font-medium">Type</label><select name="donation_type" className="input-candy mt-1"><option value="general">General</option><option value="temple_fund">Temple Fund</option><option value="annadanam">Annadanam</option></select></div>
            <div><label className="text-sm font-medium">Payment</label><select name="payment_method" className="input-candy mt-1"><option value="gcash">GCash</option><option value="cash">Cash</option></select></div>
            <div><label className="text-sm font-medium">Purpose</label><input name="purpose" className="input-candy mt-1" /></div>
            <div className="sm:col-span-2"><Button type="submit">Donate Now</Button></div>
          </form>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="My Donation History" />
        <CardBody>
          <DataTable rows={(data || []) as Record<string, unknown>[]} columns={[{ key: 'amount', label: 'Amount', format: 'money' }, { key: 'donation_type', label: 'Type' }, { key: 'payment_method', label: 'Payment' }, { key: 'created_at', label: 'Date', format: 'datetime' }]} />
        </CardBody>
      </Card>
    </RolePageShell>
  );
}

function DonationsView({ def, slug, version, readonly }: { def: RolePageDef; slug: string; version: number; readonly?: boolean }) {
  const [msg, setMsg] = useState('');
  const { data, reload } = useData(() => dataApi.donations().then((r) => r.donations), [version]);
  const done = useCrudDone(reload, setMsg);
  const { data: donors } = useData(() => (readonly ? Promise.resolve([]) : dataApi.usersByRole('devotee').then((r) => r.users)), [version, readonly]);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await dataApi.createDonation({
      donor_id: Number(fd.get('donor_id')),
      amount: Number(fd.get('amount')),
      donation_type: fd.get('donation_type'),
      payment_method: fd.get('payment_method'),
    });
    done();
  };
  return (
    <RolePageShell title={def.title} slug={slug} icon={def.icon}>
      {msg && <CrudActivityNotice message={msg} />}
      {!readonly && (
        <Card>
          <CardHeader title="Record Donation" />
          <CardBody>
            <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              <div><label className="text-sm font-medium">Donor</label><select name="donor_id" required className="input-candy mt-1">{(donors || []).map((d) => <option key={d.id} value={d.id}>{d.full_name}</option>)}</select></div>
              <div><label className="text-sm font-medium">Amount (₱)</label><input name="amount" type="number" step="0.01" min="1" required className="input-candy mt-1" /></div>
              <div className="sm:col-span-2"><Button type="submit">Record</Button></div>
            </form>
          </CardBody>
        </Card>
      )}
      <Card>
        <CardHeader title="All Donations" />
        <CardBody>
          <DataTable rows={(data || []) as Record<string, unknown>[]} columns={[{ key: 'donor_name', label: 'Donor' }, { key: 'amount', label: 'Amount', format: 'money' }, { key: 'donation_type', label: 'Type' }, { key: 'created_at', label: 'Date', format: 'datetime' }]} />
        </CardBody>
      </Card>
    </RolePageShell>
  );
}

function BookRitualView({ def, slug, version }: { def: RolePageDef; slug: string; version: number }) {
  const [msg, setMsg] = useState('');
  const { data, reload } = useData(() => dataApi.ritualRequests().then((r) => r.requests), [version]);
  const done = useCrudDone(reload, setMsg);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await dataApi.createRitualRequest({
      ritual_type: fd.get('ritual_type'),
      preferred_date: fd.get('preferred_date'),
      notes: fd.get('notes'),
    });
    done();
  };
  return (
    <RolePageShell title={def.title} slug={slug} icon={def.icon}>
      {msg && <CrudActivityNotice message={msg} />}
      <Card>
        <CardHeader title="Book a Ritual" />
        <CardBody>
          <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
            <div><label className="text-sm font-medium">Ritual Type</label><input name="ritual_type" required className="input-candy mt-1" placeholder="e.g. Puja, Abhishekam" /></div>
            <div><label className="text-sm font-medium">Preferred Date</label><input name="preferred_date" type="date" required className="input-candy mt-1" /></div>
            <div className="sm:col-span-2"><label className="text-sm font-medium">Notes</label><textarea name="notes" rows={2} className="input-candy mt-1" /></div>
            <Button type="submit">Submit Request</Button>
          </form>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="My Ritual Requests" />
        <CardBody>
          <DataTable rows={(data || []) as Record<string, unknown>[]} columns={[{ key: 'ritual_type', label: 'Type' }, { key: 'status', label: 'Status', format: 'badge' }, { key: 'preferred_date', label: 'Preferred', format: 'date' }]} />
        </CardBody>
      </Card>
    </RolePageShell>
  );
}

function EventsView({ def, slug, version, festival, role }: { def: RolePageDef; slug: string; version: number; festival?: boolean; role: RoleKey }) {
  const isManager = role === 'event_manager';
  const [msg, setMsg] = useState('');
  const { data, reload } = useData(() => dataApi.events(festival).then((r) => r.events), [version, festival]);
  const done = useCrudDone(reload, setMsg);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await dataApi.createEvent({
      title: fd.get('title'),
      event_date: fd.get('event_date'),
      location: fd.get('location'),
      is_festival: festival ? 1 : 0,
    });
    done();
  };
  return (
    <RolePageShell title={def.title} slug={slug} icon={def.icon}>
      {msg && <CrudActivityNotice message={msg} />}
      {isManager && (
        <Card>
          <CardHeader title={festival ? 'Add Festival' : 'Create Event'} />
          <CardBody>
            <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
              <input name="title" placeholder="Title" required className="input-candy w-full" />
              <input name="event_date" type="date" required className="input-candy w-full" />
              <input name="location" placeholder="Location" className="input-candy w-full md:col-span-2" />
              <Button type="submit">Create</Button>
            </form>
          </CardBody>
        </Card>
      )}
      <Card>
        <CardHeader title={festival ? 'Festivals' : 'Events'} />
        <CardBody>
          <div className="space-y-3">
            {((data || []) as Record<string, unknown>[]).map((ev) => (
              <div key={String(ev.id)} className="flex justify-between items-center border rounded-xl p-4 hover:shadow-sm">
                <div>
                  <p className="font-semibold">{String(ev.title)}</p>
                  <p className="text-sm text-slate-500">{formatDate(String(ev.event_date))} · {String(ev.location || 'Temple')}</p>
                </div>
                {!isManager && ev.status === 'active' && (
                  <Button onClick={() => dataApi.registerEvent(Number(ev.id)).then(done)}>Register</Button>
                )}
                {isManager && <Badge status={String(ev.status)} />}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </RolePageShell>
  );
}

function TransactionsView({ def, slug, version, role }: { def: RolePageDef; slug: string; version: number; role: RoleKey }) {
  const canCreate = role === 'accountant';
  const [msg, setMsg] = useState('');
  const { data, reload } = useData(() => dataApi.transactions().then((r) => r.transactions), [version]);
  const done = useCrudDone(reload, setMsg);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await dataApi.createTransaction({
      transaction_type: fd.get('transaction_type'),
      amount: Number(fd.get('amount')),
      description: fd.get('description'),
      category: fd.get('category'),
    });
    done();
  };
  return (
    <RolePageShell title={def.title} slug={slug} icon={def.icon}>
      {msg && <CrudActivityNotice message={msg} />}
      {canCreate && (
        <Card>
          <CardHeader title="New Transaction" />
          <CardBody>
            <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
              <select name="transaction_type" className="input-candy w-full"><option value="income">Income</option><option value="expense">Expense</option></select>
              <input name="amount" type="number" step="0.01" placeholder="Amount" required className="input-candy w-full" />
              <input name="category" placeholder="Category" className="input-candy w-full" />
              <input name="description" placeholder="Description" className="input-candy w-full" />
              <Button type="submit">Record</Button>
            </form>
          </CardBody>
        </Card>
      )}
      <Card>
        <CardHeader title="Transactions" />
        <CardBody>
          <DataTable rows={(data || []) as Record<string, unknown>[]} columns={[{ key: 'transaction_type', label: 'Type', format: 'badge' }, { key: 'amount', label: 'Amount', format: 'money' }, { key: 'category', label: 'Category' }, { key: 'status', label: 'Status', format: 'badge' }]} />
        </CardBody>
      </Card>
    </RolePageShell>
  );
}

function RitualApprovalView({ def, slug, version, msg, setMsg }: { def: RolePageDef; slug: string; version: number; msg: string; setMsg: (s: string) => void }) {
  const { data, reload } = useData(async () => {
    const s = getStore();
    return s.ritual_requests
      .filter((r) => r.status === 'scheduled' && !r.head_priest_approved)
      .map((r) => ({ ...r, devotee_name: userName(s, Number(r.devotee_id)) }));
  }, [version]);
  const done = useCrudDone(reload, setMsg);
  return (
    <RolePageShell title={def.title} slug={slug} icon={def.icon}>
      {msg && <CrudActivityNotice message={msg} />}
      <div className="space-y-3">
        {((data || []) as Record<string, unknown>[]).map((r) => (
          <Card key={String(r.id)}>
            <CardBody className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{String(r.ritual_type)}</p>
                <p className="text-sm text-slate-500">{String(r.devotee_name)} · {formatDate(String(r.scheduled_date))}</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => dataApi.patchRitualRequest(Number(r.id), { action: 'approve' }).then(done)}>Approve</Button>
                <Button variant="danger" onClick={() => dataApi.patchRitualRequest(Number(r.id), { action: 'reject' }).then(done)}>Reject</Button>
              </div>
            </CardBody>
          </Card>
        ))}
        {!data?.length && <p className="text-slate-400 text-center py-8">No rituals pending approval.</p>}
      </div>
    </RolePageShell>
  );
}

function MonitorView({ def, slug, version, msg, setMsg }: { def: RolePageDef; slug: string; version: number; msg: string; setMsg: (s: string) => void }) {
  const today = new Date().toISOString().slice(0, 10);
  const { data, reload } = useData(async () => {
    const s = getStore();
    return s.visit_registrations
      .filter((v) => String(v.visit_date) === today)
      .map((v) => ({ ...v, visitor_name: userName(s, Number(v.visitor_id)) }));
  }, [version]);
  const done = useCrudDone(reload, setMsg);
  return (
    <RolePageShell title={def.title} slug={slug} icon={def.icon}>
      {msg && <CrudActivityNotice message={msg} />}
      <Card>
        <CardBody>
          <div className="space-y-3">
            {((data || []) as Record<string, unknown>[]).map((v) => (
              <div key={String(v.id)} className="flex justify-between items-center border rounded-xl p-4">
                <div>
                  <p className="font-semibold">{String(v.visitor_name)}</p>
                  <p className="text-sm text-slate-500">{String(v.visit_time)} · {String(v.purpose)}</p>
                </div>
                {!v.checked_in && (
                  <Button onClick={() => dataApi.updateEntity('visit_registrations', Number(v.id), { checked_in: 1, status: 'completed' }, 'Checked in').then(done)}>
                    Check In
                  </Button>
                )}
                {!!v.checked_in && <Badge status="completed" />}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </RolePageShell>
  );
}

function SettingsView({ def, slug, role, version }: { def: RolePageDef; slug: string; role: RoleKey; version: number }) {
  const [msg, setMsg] = useState('');
  const { data, reload } = useData(() => dataApi.getStore().then((r) => r.store.temple_settings), [version]);
  const done = useCrudDone(reload, setMsg);
  const onSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const settings: Record<string, string> = {};
    fd.forEach((v, k) => { settings[k] = String(v); });
    await dataApi.saveSettings(settings);
    done();
  };
  return (
    <RolePageShell title={def.title} slug={slug} icon={def.icon}>
      {msg && <CrudActivityNotice message={msg} />}
      <Card>
        <CardBody>
          <form onSubmit={onSave} className="space-y-4 max-w-lg">
            {['temple_name', 'temple_address', 'opening_hours', 'contact_email', 'contact_phone'].map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium mb-1">{key.replace(/_/g, ' ')}</label>
                <input name={key} defaultValue={(data as Record<string, string>)?.[key]} className="input-candy" />
              </div>
            ))}
            <Button type="submit">{UI_LABELS.saveSettings}</Button>
          </form>
        </CardBody>
      </Card>
      {role === 'super_admin' && (
        <Card>
          <CardHeader title="Reset Demo Data" />
          <CardBody>
            <Button variant="danger" onClick={() => { if (confirm('Reset all data?')) dataApi.resetData().then(() => window.location.reload()); }}>
              Reset demo data
            </Button>
          </CardBody>
        </Card>
      )}
      <Card className="border-candy-300/80 overflow-hidden">
        <CardHeader title={`Built by ${DEVELOPER.name}`} />
        <CardBody className="p-0 sm:p-5 sm:pt-0">
          <DeveloperCredit variant="banner" className="border-0 shadow-none rounded-none sm:rounded-2xl" />
        </CardBody>
      </Card>
    </RolePageShell>
  );
}

function PermissionsView({ def, slug }: { def: RolePageDef; slug: string }) {
  const rows = Object.entries(ROLES).map(([key, val]) => ({ role: key, label: val.label, folder: val.folder, icon: val.icon }));
  return (
    <RolePageShell title={def.title} slug={slug} icon={def.icon}>
      <Card>
        <CardBody>
          <DataTable rows={rows} columns={[{ key: 'icon', label: '' }, { key: 'label', label: 'Role' }, { key: 'folder', label: 'Portal' }]} />
        </CardBody>
      </Card>
    </RolePageShell>
  );
}

function SystemControlView({ def, slug, version, role }: { def: RolePageDef; slug: string; version: number; role: RoleKey }) {
  const { data } = useData(async () => {
    const s = getStore();
    return [
      { module: 'Users', count: s.users.length, status: 'active' },
      { module: 'Donations', count: s.donations.length, status: 'active' },
      { module: 'Events', count: s.events.length, status: 'active' },
      { module: 'Activity Log', count: s.activity_log.length, status: 'active' },
    ];
  }, [version]);
  return (
    <RolePageShell title={def.title} slug={slug} icon={def.icon} charts={false}>
      <RoleDashboardCharts role={role} version={version} slug={slug} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(data || []).map((m) => (
          <Card key={String(m.module)}>
            <CardBody>
              <p className="text-2xl font-bold text-candy-600">{String(m.count)}</p>
              <p className="font-semibold">{String(m.module)}</p>
              <Badge status={String(m.status)} />
            </CardBody>
          </Card>
        ))}
      </div>
      <TempleChartsMega version={version} />
    </RolePageShell>
  );
}

function ReportsView({ def, slug, version, role }: { def: RolePageDef; slug: string; version: number; role: RoleKey }) {
  const { data } = useData(async () => {
    const s = getStore();
    const totalDon = s.donations.reduce((a, d) => a + Number(d.amount), 0);
    const base = [
      { report: 'Total Donations', value: formatMoney(totalDon) },
      { report: 'Active Events', value: s.events.filter((e) => e.status === 'active').length },
      { report: 'Registered Users', value: s.users.length },
    ];
    if (role === 'donation_manager') {
      return [...base, { report: 'Donation Count', value: s.donations.length }];
    }
    return [...base, { report: 'Pending Approvals', value: s.approvals.filter((a) => a.status === 'pending').length }];
  }, [version, role]);
  return (
    <RolePageShell title={def.title} slug={slug} icon={def.icon} charts={false}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(data || []).map((r, i) => (
          <Card key={i}>
            <CardBody>
              <p className="text-sm text-slate-500">{String(r.report)}</p>
              <p className="text-2xl font-bold text-candy-600 mt-1">{String(r.value)}</p>
            </CardBody>
          </Card>
        ))}
      </div>
      <RoleDashboardCharts role={role} version={version} slug={slug} />
      <TempleChartsMega version={version} />
    </RolePageShell>
  );
}
