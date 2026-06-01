import { useEffect, useState } from 'react';
import { useDataVersion } from '@/context/DataContext';
import { dataApi } from '@/lib/api';
import { formatDateTime } from '@/lib/utils';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function ApprovalsPage() {
  const version = useDataVersion();
  const [approvals, setApprovals] = useState<Record<string, unknown>[]>([]);

  const load = () => dataApi.approvals().then(({ approvals: a }) => setApprovals(a));

  useEffect(() => { load(); }, [version]);

  const decide = async (id: number, status: 'approved' | 'rejected') => {
    await dataApi.patchApproval(id, status);
    load();
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full min-w-0">
      <h1 className="font-display text-xl sm:text-2xl font-bold text-maroon">Approvals</h1>
      <Card>
        <CardHeader title="Pending & Recent Approvals" />
        <CardBody className="table-scroll p-0 sm:p-5">
          <table className="w-full text-xs sm:text-sm">
            <thead><tr className="border-b text-left text-slate-500">
              <th className="pb-2">Type</th><th>By</th><th>Status</th><th>Date</th><th>Action</th>
            </tr></thead>
            <tbody>
              {approvals.map((a) => (
                <tr key={String(a.id)} className="border-b">
                  <td className="py-2">{String(a.entity_type)} #{String(a.entity_id)}</td>
                  <td>{String(a.requester || a.full_name)}</td>
                  <td><Badge status={String(a.status)} /></td>
                  <td>{formatDateTime(String(a.created_at))}</td>
                  <td>
                    {a.status === 'pending' && (
                      <span className="flex gap-1">
                        <Button className="text-xs py-1" onClick={() => decide(Number(a.id), 'approved')}>Approve</Button>
                        <Button variant="danger" className="text-xs py-1" onClick={() => decide(Number(a.id), 'rejected')}>Reject</Button>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
