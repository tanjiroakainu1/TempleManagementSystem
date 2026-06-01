import type { ChartVariant } from '@/lib/chartData';

/** Default crazy charts per page slug (RolePageShell) */
export function defaultPageCharts(slug?: string): false | ChartVariant {
  if (!slug) return 'page';
  if (
    slug === 'dashboard' ||
    slug === 'reports' ||
    slug === 'system-control' ||
    slug === 'activity-log' ||
    slug === 'profile'
  ) {
    return false;
  }
  return 'page';
}
