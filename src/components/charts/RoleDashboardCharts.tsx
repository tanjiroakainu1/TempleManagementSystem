import type { RoleKey } from '@/config/roles';
import CrazyChartsBlock from './CrazyChartsBlock';

interface Props {
  role: RoleKey;
  version: number;
  compact?: boolean;
  slug?: string;
}

/** Role dashboard / reports — full or compact crazy charts */
export default function RoleDashboardCharts({ role, version, compact = false, slug }: Props) {
  return (
    <CrazyChartsBlock
      role={role}
      slug={slug}
      version={version}
      variant={compact ? 'compact' : 'full'}
    />
  );
}
