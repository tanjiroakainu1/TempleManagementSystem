import { ReactNode } from 'react';
import { ROLES, type RoleKey } from '@/config/roles';
import { PAGE_DESCRIPTIONS } from '@/config/navigation';
import { useAuth } from '@/context/AuthContext';
import { useDataVersion } from '@/context/DataContext';
import SharedActivityPreview from '@/components/shared/SharedActivityPreview';
import { CrazyChartsBlock } from '@/components/charts';
import type { ChartVariant } from '@/lib/chartData';
import { APP_PRIVACY } from '@/config/privacy';
import { defaultPageCharts } from '@/components/role/rolePageCharts';

interface RolePageShellProps {
  title: string;
  slug?: string;
  icon?: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
  showSharedActivity?: boolean;
  /** Auto crazy charts — `true` uses page default; `false` disables */
  charts?: boolean | ChartVariant;
}

export default function RolePageShell({
  title,
  slug,
  icon,
  description,
  children,
  actions,
  showSharedActivity,
  charts: chartsProp,
}: RolePageShellProps) {
  const { user } = useAuth();
  const version = useDataVersion();
  const roleInfo = user ? ROLES[user.role as RoleKey] : null;
  const desc = description ?? (slug ? PAGE_DESCRIPTIONS[slug] : '');
  const showActivity =
    APP_PRIVACY.showSharedActivityPreview &&
    (showSharedActivity ?? (slug !== undefined && slug !== 'dashboard' && slug !== 'activity-log'));

  const chartVariant: false | ChartVariant =
    chartsProp === false
      ? false
      : chartsProp === true || chartsProp === undefined
        ? defaultPageCharts(slug)
        : chartsProp;

  const chartBlock =
    chartVariant && user && slug ? (
      <CrazyChartsBlock role={user.role as RoleKey} slug={slug} version={version} variant={chartVariant} />
    ) : null;

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in w-full min-w-0 max-w-full">
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-candy-600 via-candy-700 to-candy-800 text-white shadow-candy-lg">
        <div className="absolute inset-0 bg-candy-mesh opacity-30" />
        <div className="absolute -right-8 -top-8 text-6xl sm:text-8xl opacity-10 pointer-events-none">🛕</div>
        <div className="relative px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-white/80 text-xs sm:text-sm mb-2 font-medium">
              <span>{roleInfo?.icon}</span>
              <span className="truncate max-w-[120px] sm:max-w-none">{roleInfo?.label}</span>
              <span className="text-white/50 hidden xs:inline">›</span>
              <span className="text-white truncate">{title}</span>
            </div>
            <h1 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold flex flex-wrap items-center gap-2 sm:gap-3 break-words">
              <span className="text-2xl sm:text-3xl lg:text-4xl drop-shadow shrink-0">{icon ?? roleInfo?.icon}</span>
              <span className="min-w-0">{title}</span>
            </h1>
            {desc && <p className="mt-2 text-white/90 max-w-2xl text-sm sm:text-base leading-relaxed">{desc}</p>}
          </div>
          {actions && <div className="shrink-0 w-full lg:w-auto flex flex-wrap gap-2">{actions}</div>}
        </div>
      </div>
      <div className="w-full min-w-0 max-w-full space-y-4 sm:space-y-6">
        {chartBlock}
        {children}
      </div>
      {showActivity && <SharedActivityPreview version={version} />}
    </div>
  );
}
