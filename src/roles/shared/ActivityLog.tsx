import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth, getRoleFolder } from '@/context/AuthContext';
import { useDataVersion } from '@/context/DataContext';
import { dataApi } from '@/lib/api';
import { APP_PRIVACY } from '@/config/privacy';
import RolePageShell from '@/components/role/RolePageShell';
import SharedActivityTable from '@/components/shared/SharedActivityTable';
import { TempleChartsMega, RoleDashboardCharts } from '@/components/charts';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { useData } from '@/hooks/useData';

/** Internal audit log — hidden from navigation when APP_PRIVACY.showSharedActivityNav is false */
export default function SharedActivityLog() {
  const { user } = useAuth();
  const version = useDataVersion();
  const [entity, setEntity] = useState('');
  const [action, setAction] = useState('');

  if (!APP_PRIVACY.showSharedActivityNav) {
    const folder = user ? getRoleFolder(user.role) : 'login';
    return <Navigate to={user ? `/${folder}/dashboard` : '/login'} replace />;
  }

  const { data, loading, error } = useData(
    () =>
      dataApi
        .activityLog({ entity: entity || undefined, action: action || undefined })
        .then((r) => r.activities as import('@/components/shared/SharedActivityTable').ActivityRow[]),
    [entity, action, version]
  );

  return (
    <RolePageShell
      title="Activity Log"
      slug="activity-log"
      icon="📋"
      description="System audit trail for administrators."
      showSharedActivity={false}
    >
      {user && <RoleDashboardCharts role={user.role} version={version} compact />}
      <TempleChartsMega version={version} />

      <Card>
        <CardHeader title="Filter records" />
        <CardBody className="flex flex-wrap gap-3">
          <input
            value={entity}
            onChange={(e) => setEntity(e.target.value)}
            placeholder="Module (e.g. donation, event)"
            className="input-candy min-w-[200px]"
          />
          <input
            value={action}
            onChange={(e) => setAction(e.target.value)}
            placeholder="Action (create, update, approve)"
            className="input-candy min-w-[200px]"
          />
        </CardBody>
      </Card>
      {error && (
        <div className="rounded-xl bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 text-sm mb-4">
          {error}
        </div>
      )}
      <SharedActivityTable
        rows={data || []}
        loading={loading}
        showViewAll={false}
        title="All temple activity"
      />
    </RolePageShell>
  );
}
