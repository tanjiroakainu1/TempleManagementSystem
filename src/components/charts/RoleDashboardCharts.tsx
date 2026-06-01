import { useMemo } from 'react';
import type { RoleKey } from '@/config/roles';
import { getChartsForRole } from '@/lib/chartData';
import CrazyChartCard from './CrazyChartCard';

interface Props {
  role: RoleKey;
  version: number;
  compact?: boolean;
}

/** Role-specific analytics from localStorage — updates when data version changes */
export default function RoleDashboardCharts({ role, version, compact = false }: Props) {
  const charts = useMemo(() => getChartsForRole(role), [role, version]);

  const display = compact ? charts.slice(0, 3) : charts;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-display text-lg font-bold text-candy-800 flex items-center gap-2">
          📈 Live analytics
        </h2>
        <span className="text-xs text-candy-600 font-medium">Charts refresh after every CRUD ✨</span>
      </div>
      <div className={`grid gap-4 ${compact ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'}`}>
        {display.map((c) => (
          <CrazyChartCard key={c.id} title={c.meta.title} data={c.data} type={c.meta.type} />
        ))}
      </div>
    </div>
  );
}
