import { useState, FormEvent, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { PAGE_DESCRIPTIONS } from '@/config/navigation';
import { useAuth } from '@/context/AuthContext';
import { useDataVersion } from '@/context/DataContext';
import { CrazyChartsBlock } from '@/components/charts';
import { UI_LABELS } from '@/config/uiLabels';
import { dataApi } from '@/lib/api';
import { useData } from '@/hooks/useData';
import type { EntityTable } from '@/lib/storage/services';
import { formatDate, formatDateTime, formatMoney } from '@/lib/utils';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { getStore } from '@/lib/storage/db';
import { userName } from '@/lib/storage/db';

type SlugConfig = {
  title: string;
  table?: EntityTable;
  columns?: { key: string; label: string; format?: 'money' | 'date' | 'datetime' | 'badge' }[];
  form?: { fields: { name: string; label: string; type?: string }[] };
  customLoad?: () => Promise<Record<string, unknown>[]>;
};

const SLUG_CONFIG: Record<string, SlugConfig> = {
  'ritual-approval': {
    title: 'Ritual Approval',
    customLoad: async () => {
      const s = getStore();
      return s.ritual_requests
        .filter((r) => r.status === 'scheduled' && !r.head_priest_approved)
        .map((r) => ({ ...r, devotee_name: userName(s, Number(r.devotee_id)) }));
    },
  },
  requests: {
    title: 'Ritual Requests',
    customLoad: async () => {
      const { requests } = await dataApi.ritualRequests();
      return requests;
    },
  },
  requests_member: { title: 'Member Requests', table: 'member_requests' },
  schedule: { title: 'Worship Schedule', table: 'worship_schedules' },
  'maintenance-tasks': { title: 'Maintenance Tasks', table: 'maintenance_records' },
  schedules: { title: 'Schedules', table: 'worship_schedules' },
  ceremonies: { title: 'Ceremonies', table: 'worship_schedules' },
  services: { title: 'Worship Services', table: 'worship_records' },
  rituals: {
    title: 'Conduct Rituals',
    customLoad: async () => dataApi.ritualRequests().then((r) => r.requests),
  },
  records: { title: 'Temple Records', table: 'temple_records' },
  correspondence: { title: 'Correspondence', table: 'correspondence' },
  budgets: {
    title: 'Budgets',
    table: 'budgets',
    columns: [
      { key: 'category', label: 'Category' },
      { key: 'amount', label: 'Amount', format: 'money' },
      { key: 'period', label: 'Period' },
    ],
  },
  statements: { title: 'Financial Statements', table: 'financial_transactions' as EntityTable },
  donors: { title: 'Donor Records', customLoad: async () => dataApi.donations().then((r) => r.donations) },
  registrations: { title: 'Event Registrations', table: 'event_registrations' },
  volunteers: {
    title: 'Volunteers',
    customLoad: async () => dataApi.usersByRole('volunteer').then((r) => r.users as unknown as Record<string, unknown>[]),
  },
  tasks: { title: 'Tasks', table: 'volunteer_tasks' },
  activities: { title: 'Activities', table: 'volunteer_tasks' },
  'register-visit': {
    title: 'Register Visit',
    table: 'visit_registrations',
    form: {
      fields: [
        { name: 'visit_date', label: 'Visit Date', type: 'date' },
        { name: 'visit_time', label: 'Time', type: 'time' },
        { name: 'purpose', label: 'Purpose' },
      ],
    },
  },
  info: {
    title: 'Public Information',
    customLoad: async () => dataApi.announcements().then((r) => r.announcements.filter((a) => a.is_public)),
  },
  classes: { title: 'Education Classes', table: 'education_classes' },
  programs: { title: 'Training Programs', table: 'education_classes' },
  teachings: { title: 'My Teachings', table: 'education_classes' },
  attendance: { title: 'Attendance', table: 'class_attendance' },
  progress: { title: 'Student Progress', table: 'student_progress' },
  supplies: { title: 'Supplies', table: 'inventory_items' },
  usage: { title: 'Inventory Usage', table: 'inventory_usage' },
  stock: {
    title: 'Stock Monitor',
    customLoad: async () => {
      const s = getStore();
      return s.inventory_items.map((i) => ({
        ...i,
        alert: Number(i.quantity) <= Number(i.min_stock) ? 'LOW' : 'OK',
      }));
    },
  },
  report: {
    title: 'Report Repairs',
    table: 'maintenance_records',
    form: {
      fields: [
        { name: 'title', label: 'Title' },
        { name: 'description', label: 'Description' },
        { name: 'location', label: 'Location' },
        { name: 'priority', label: 'Priority' },
      ],
    },
  },
  monitor: {
    title: 'Entrance Monitor',
    customLoad: async () => {
      const today = new Date().toISOString().slice(0, 10);
      const s = getStore();
      return s.visit_registrations
        .filter((v) => String(v.visit_date) === today)
        .map((v) => ({ ...v, visitor_name: userName(s, Number(v.visitor_id)) }));
    },
  },
  incidents: { title: 'Security Incidents', table: 'security_incidents' },
  visitors: { title: 'Visitor Log', table: 'visit_registrations' },
  operations: {
    title: 'Daily Operations',
    customLoad: async () => {
      const s = getStore();
      return [
        { metric: 'Pending Approvals', value: s.approvals.filter((a) => a.status === 'pending').length },
        { metric: 'Open Maintenance', value: s.maintenance_records.filter((m) => m.status !== 'completed').length },
        { metric: 'Visits Today', value: s.visit_registrations.filter((v) => String(v.visit_date) === new Date().toISOString().slice(0, 10)).length },
      ];
    },
  },
  staff: {
    title: 'Staff Overview',
    customLoad: async () => dataApi.users().then((r) => r.users as unknown as Record<string, unknown>[]),
  },
  permissions: {
    title: 'Role Permissions',
    customLoad: async () => {
      const { ROLES } = await import('@/config/roles');
      return Object.entries(ROLES).map(([key, val]) => ({
        role: key,
        label: val.label,
        folder: val.folder,
        icon: val.icon,
      }));
    },
  },
  settings: { title: 'Temple Settings', table: undefined },
  reports: {
    title: 'Reports',
    customLoad: async () => {
      const s = getStore();
      const totalDon = s.donations.reduce((a, d) => a + Number(d.amount), 0);
      return [
        { report: 'Total Donations', value: formatMoney(totalDon) },
        { report: 'Active Events', value: s.events.filter((e) => e.status === 'active').length },
        { report: 'Registered Users', value: s.users.length },
        { report: 'Pending Approvals', value: s.approvals.filter((a) => a.status === 'pending').length },
      ];
    },
  },
  'system-control': {
    title: 'System Control',
    customLoad: async () => {
      const s = getStore();
      return [
        { module: 'Users', count: s.users.length },
        { module: 'Donations', count: s.donations.length },
        { module: 'Events', count: s.events.length },
        { module: 'Activity Log', count: s.activity_log.length },
      ];
    },
  },
  priests: {
    title: 'Priests',
    customLoad: async () => dataApi.usersByRole('priest').then((r) => r.users as unknown as Record<string, unknown>[]),
  },
};

function defaultColumns(rows: Record<string, unknown>[]): SlugConfig['columns'] {
  if (!rows.length) return [{ key: 'id', label: 'ID' }];
  return Object.keys(rows[0])
    .filter((k) => !['password'].includes(k))
    .slice(0, 6)
    .map((key) => ({ key, label: key.replace(/_/g, ' ') }));
}

function resolveConfigKey(slug: string, pathname: string): string {
  if (slug === 'requests' && pathname.includes('/member/')) return 'requests_member';
  if (slug === 'tasks' && pathname.includes('maintenance')) return 'maintenance-tasks';
  return slug;
}

export default function ConnectedFeaturePage() {
  const { pageSlug } = useParams<{ pageSlug: string }>();
  const location = useLocation();
  const slug = pageSlug || 'dashboard';
  const configKey = useMemo(() => resolveConfigKey(slug, location.pathname), [slug, location.pathname]);
  const config = SLUG_CONFIG[configKey] || SLUG_CONFIG[slug] || {
    title: slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    table: undefined,
  };
  const { user } = useAuth();
  const version = useDataVersion();
  const [msg, setMsg] = useState('');

  const loader = async () => {
    if (config.customLoad) return config.customLoad();
    if (config.table) {
      const { rows } = await dataApi.listEntity(config.table);
      return rows;
    }
    return [];
  };

  const { data: rows, loading, reload } = useData(loader, [slug, configKey]);

  const columns = config.columns ?? defaultColumns(rows || []) ?? [{ key: 'id', label: 'ID' }];

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!config.table || !config.form || !user) return;
    const fd = new FormData(e.currentTarget);
    const row: Record<string, unknown> = {};
    config.form.fields.forEach((f) => {
      row[f.name] = fd.get(f.name);
    });
    if (slug === 'register-visit') {
      row.visitor_id = user.id;
      row.status = 'pending';
      row.checked_in = 0;
    }
    if (slug === 'report') {
      row.reported_by = user.id;
      row.status = 'open';
      row.priority = row.priority || 'medium';
    }
    await dataApi.createEntity(config.table, row, `Created ${config.title}`);
    setMsg('Saved successfully.');
    (e.target as HTMLFormElement).reset();
    reload();
  };

  const onCheckIn = async (visitId: number) => {
    if (!user) return;
    await dataApi.updateEntity('visit_registrations', visitId, { checked_in: 1, status: 'completed' }, 'Checked in visitor');
    reload();
  };

  const onApproveRitual = async (id: number, approve: boolean) => {
    await dataApi.patchRitualRequest(id, { action: approve ? 'approve' : 'reject' } as Record<string, unknown>);
    setMsg(approve ? 'Ritual approved.' : 'Ritual rejected.');
    reload();
  };

  if (slug === 'settings') {
    return <SettingsPanel />;
  }

  const description = PAGE_DESCRIPTIONS[slug] ?? config.title;

  return (
    <div className="space-y-4 sm:space-y-6 w-full min-w-0">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-maroon">{config.title}</h1>
        <p className="text-slate-500">{description}</p>
      </div>
      {user && slug !== 'dashboard' && (
        <CrazyChartsBlock role={user.role} slug={configKey} version={version} variant="page" />
      )}
      {msg && <div className="rounded-lg bg-emerald-50 text-emerald-800 px-4 py-2 text-sm">{msg}</div>}
      {config.form && config.table && (
        <Card>
          <CardHeader title="Add New" />
          <CardBody>
            <form onSubmit={onFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl w-full">
              {config.form.fields.map((f) => (
                <div key={f.name}>
                  <label className="block text-sm font-medium mb-1">{f.label}</label>
                  <input name={f.name} type={f.type || 'text'} required className="input-candy" />
                </div>
              ))}
              <div className="md:col-span-2"><Button type="submit">{UI_LABELS.saveButton}</Button></div>
            </form>
          </CardBody>
        </Card>
      )}
      <Card>
        <CardHeader title="Records" />
        <CardBody className="table-scroll p-0 sm:p-5">
          {loading ? (
            <p className="text-slate-500">Loading...</p>
          ) : !rows?.length ? (
            <p className="text-slate-500">No records yet.</p>
          ) : slug === 'ritual-approval' ? (
            <div className="space-y-3">
              {(rows as Record<string, unknown>[]).map((r) => (
                <div key={String(r.id)} className="border rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <strong>{String(r.ritual_type)}</strong> — {String(r.devotee_name)}
                    <p className="text-sm text-slate-500">{formatDate(String(r.scheduled_date))}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => onApproveRitual(Number(r.id), true)}>Approve</Button>
                    <Button variant="danger" onClick={() => onApproveRitual(Number(r.id), false)}>Reject</Button>
                  </div>
                </div>
              ))}
            </div>
          ) : slug === 'monitor' ? (
            <table className="w-full text-sm">
              <thead><tr className="border-b text-left text-slate-500">
                <th className="pb-2">Visitor</th><th>Time</th><th>Status</th><th>Action</th>
              </tr></thead>
              <tbody>
                {(rows as Record<string, unknown>[]).map((v) => (
                  <tr key={String(v.id)} className="border-b">
                    <td className="py-2">{String(v.visitor_name)}</td>
                    <td>{String(v.visit_time)}</td>
                    <td><Badge status={v.checked_in ? 'completed' : 'pending'} /></td>
                    <td>
                      {!v.checked_in && (
                        <Button className="text-xs py-1" onClick={() => onCheckIn(Number(v.id))}>Check In</Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-slate-500">
                  {columns.map((c) => (
                    <th key={c.key} className="pb-2 pr-4">{c.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(rows as Record<string, unknown>[]).map((row, i) => (
                  <tr key={String(row.id ?? i)} className="border-b border-slate-50">
                    {columns.map((c) => (
                      <td key={c.key} className="py-2 pr-4">
                        {c.format === 'money' ? formatMoney(Number(row[c.key])) :
                          c.format === 'date' ? formatDate(String(row[c.key])) :
                          c.format === 'datetime' ? formatDateTime(String(row[c.key])) :
                          c.format === 'badge' ? <Badge status={String(row[c.key])} /> :
                          String(row[c.key] ?? '—')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

function SettingsPanel() {
  const { user } = useAuth();
  const { data, reload } = useData(async () => {
    const { store } = await dataApi.getStore();
    return store.temple_settings;
  }, []);

  const onSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const settings: Record<string, string> = {};
    fd.forEach((v, k) => { settings[k] = String(v); });
    await dataApi.saveSettings(settings);
    reload();
  };

  const s = data || {};

  return (
    <div className="space-y-4 sm:space-y-6 w-full min-w-0">
      <h1 className="font-display text-xl sm:text-2xl font-bold text-maroon">Temple Settings</h1>
      <Card>
        <CardBody>
          <form onSubmit={onSave} className="space-y-4 max-w-lg">
            {['temple_name', 'temple_address', 'opening_hours', 'contact_email', 'contact_phone'].map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium mb-1">{key.replace(/_/g, ' ')}</label>
                <input name={key} defaultValue={s[key]} className="input-candy" />
              </div>
            ))}
            <Button type="submit">{UI_LABELS.saveSettings}</Button>
          </form>
        </CardBody>
      </Card>
      {user?.role === 'super_admin' && (
        <Card>
          <CardHeader title="Data Management" />
          <CardBody>
            <p className="text-sm text-slate-600 mb-3">Reset all demo data to defaults.</p>
            <Button variant="danger" onClick={() => { if (confirm('Reset all data?')) dataApi.resetData().then(() => window.location.reload()); }}>
              Reset Demo Data
            </Button>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
