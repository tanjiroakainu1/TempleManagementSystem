import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, getRoleFolder } from '@/context/AuthContext';
import { useDataVersion } from '@/context/DataContext';
import { dataApi } from '@/lib/api';
import { formatMoney } from '@/lib/utils';
import StatCard from '@/components/ui/StatCard';
import { RoleDashboardCharts } from '@/components/charts';
import { getNavItems } from '@/config/navigation';

export default function DashboardPage() {
  const { user } = useAuth();
  const version = useDataVersion();
  const [stats, setStats] = useState<Record<string, number>>({});
  const folder = getRoleFolder(user!.role);
  const nav = getNavItems(user!.role).filter((n) => n.slug !== 'dashboard' && !n.shared);

  useEffect(() => {
    dataApi.dashboardStats().then(({ stats: s }) => setStats(s)).catch(() => setStats({}));
  }, [version]);

  const statEntries = Object.entries(stats);
  const variants = ['default', 'maroon', 'gold', 'green'] as const;

  const formatVal = (key: string, val: number) => {
    if (key.includes('donation') || key === 'total' || key.includes('income') || key.includes('expense'))
      return formatMoney(val);
    return String(val);
  };

  const labelMap: Record<string, string> = {
    users: 'Total Users',
    pending_approvals: 'Pending Approvals',
    events: 'Active Events',
    donations: 'Total Donations',
    total_donations: 'Total Donations',
    pending: 'Pending',
    my_rituals: 'My Rituals',
    my_donations: 'My Donations',
    my_tasks: 'My Tasks',
    active_events: 'Active Events',
    open_tasks: 'Open Tasks',
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full min-w-0">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-maroon">Dashboard</h1>
        <p className="text-sm sm:text-base text-slate-500 truncate">Welcome back, {user?.full_name}</p>
      </div>
      <RoleDashboardCharts role={user!.role} version={version} slug="dashboard" />
      {statEntries.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statEntries.map(([key, val], i) => (
            <StatCard
              key={key}
              icon="📊"
              value={formatVal(key, val)}
              label={labelMap[key] ?? key.replace(/_/g, ' ')}
              variant={variants[i % variants.length]}
            />
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {nav.slice(0, 6).map((item) => (
          <Link
            key={item.slug}
            to={`/${folder}/${item.slug}`}
            className="rounded-xl border border-maroon/20 bg-white px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium text-maroon hover:bg-maroon hover:text-white transition min-h-[44px] inline-flex items-center"
          >
            {item.icon} {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
