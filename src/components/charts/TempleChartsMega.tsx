import { useMemo } from 'react';
import type { ChartId } from '@/lib/chartData';
import { CHART_BUILDERS, CHART_META } from '@/lib/chartData';
import CrazyChartCard from './CrazyChartCard';

const MEGA_CHARTS: ChartId[] = [
  'module_counts',
  'donations_timeline',
  'donations_type',
  'finance_ie',
  'activity_role',
  'activity_action',
  'approvals_status',
  'rituals_status',
  'events_type',
  'users_role',
  'volunteer_tasks',
  'inventory_stock',
  'visits',
  'maintenance_status',
  'education_status',
  'member_requests',
  'worship_type',
  'event_registrations',
  'security_incidents',
  'announcements_split',
];

interface Props {
  version: number;
}

/** Full chart wall — reports, system control, super admin modules */
export default function TempleChartsMega({ version }: Props) {
  const charts = useMemo(
    () =>
      MEGA_CHARTS.map((id) => ({
        id,
        data: CHART_BUILDERS[id](),
        meta: CHART_META[id],
      })),
    [version]
  );

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border-2 border-candy-300 bg-gradient-to-r from-candy-200 via-candy-100 to-white p-4 shadow-candy">
        <p className="font-display font-bold text-candy-900 text-lg">📈 Crazy Charts — Temple Overview</p>
        <p className="text-sm text-candy-700 mt-1">
          Full analytics wall — updates when you create, approve, or delete records.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
        {charts.map((c) => (
          <CrazyChartCard key={c.id} title={c.meta.title} data={c.data} type={c.meta.type} height={240} />
        ))}
      </div>
    </div>
  );
}
