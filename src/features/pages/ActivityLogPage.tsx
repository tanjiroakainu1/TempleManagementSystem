import { useEffect, useState } from 'react';
import { useDataVersion } from '@/context/DataContext';
import { dataApi } from '@/lib/api';
import { formatDateTime } from '@/lib/utils';
import { getRoleLabel } from '@/config/roles';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function ActivityLogPage() {
  const version = useDataVersion();
  const [activities, setActivities] = useState<Record<string, unknown>[]>([]);
  const [entity, setEntity] = useState('');
  const [action, setAction] = useState('');

  const load = () =>
    dataApi.activityLog({ entity: entity || undefined, action: action || undefined }).then(({ activities: a }) => setActivities(a));

  useEffect(() => { load(); }, [entity, action, version]);

  return (
    <div className="space-y-4 sm:space-y-6 w-full min-w-0">
      <h1 className="font-display text-xl sm:text-2xl font-bold text-maroon">Temple Activity Log</h1>
      <p className="text-sm sm:text-base text-slate-500">Shared timeline visible to all 20 roles.</p>
      <div className="flex flex-col xs:flex-row flex-wrap gap-3">
        <select value={entity} onChange={(e) => setEntity(e.target.value)} className="input-candy text-sm min-w-0 flex-1 sm:flex-none">
          <option value="">All modules</option>
          <option value="donation">Donations</option>
          <option value="ritual_request">Rituals</option>
          <option value="event">Events</option>
          <option value="financial_transaction">Finance</option>
        </select>
        <select value={action} onChange={(e) => setAction(e.target.value)} className="input-candy text-sm min-w-0 flex-1 sm:flex-none">
          <option value="">All actions</option>
          <option value="create">Create</option>
          <option value="update">Update</option>
          <option value="approve">Approve</option>
        </select>
      </div>
      <Card>
        <CardHeader title="Activity Timeline" />
        <CardBody className="table-scroll p-0 sm:p-5">
          <table className="w-full text-sm">
            <thead><tr className="border-b text-left text-slate-500">
              <th className="pb-2">When</th><th>Action</th><th>Summary</th><th>By</th><th>Role</th>
            </tr></thead>
            <tbody>
              {activities.map((row) => (
                <tr key={String(row.id)} className="border-b">
                  <td className="py-2">{formatDateTime(String(row.created_at))}</td>
                  <td><Badge status={String(row.action)} /></td>
                  <td>{String(row.summary)}</td>
                  <td>{String(row.actor_name)}</td>
                  <td className="text-xs">{getRoleLabel(String(row.user_role))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
