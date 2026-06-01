import { useMemo } from 'react';
import type { RoleKey } from '@/config/roles';
import {
  getChartsForPage,
  getChartsForRole,
  getGuestCharts,
  type ChartVariant,
} from '@/lib/chartData';
import { UI_LABELS } from '@/config/uiLabels';
import CrazyChartCard from './CrazyChartCard';

interface Props {
  role?: RoleKey;
  slug?: string;
  version: number;
  variant?: ChartVariant;
  className?: string;
  showHeader?: boolean;
}

/** Unified crazy charts — role, page slug, or guest preview */
export default function CrazyChartsBlock({
  role,
  slug,
  version,
  variant = 'page',
  className = '',
  showHeader = true,
}: Props) {
  const charts = useMemo(() => {
    if (variant === 'guest') return getGuestCharts();
    if (!role) return getGuestCharts();
    if (variant === 'full') return getChartsForRole(role);
    if (slug) return getChartsForPage(role, slug, variant);
    return getChartsForPage(role, 'dashboard', variant);
  }, [role, slug, version, variant]);

  const gridClass =
    variant === 'strip'
      ? 'flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory'
      : variant === 'compact'
        ? 'grid grid-cols-1 lg:grid-cols-3 gap-4'
        : 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4';

  return (
    <div className={`space-y-4 ${className}`}>
      {showHeader && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-display text-lg font-bold text-candy-800 flex items-center gap-2">
            📈 Crazy Charts
          </h2>
          <span className="text-xs text-candy-600 font-medium">{UI_LABELS.chartsHint}</span>
        </div>
      )}
      <div className={gridClass}>
        {charts.map((c) => (
          <div key={c.id} className={variant === 'strip' ? 'min-w-[280px] snap-start shrink-0' : undefined}>
            <CrazyChartCard
              title={c.meta.title}
              data={c.data}
              type={c.meta.type}
              height={variant === 'strip' ? 200 : undefined}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
