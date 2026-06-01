import { useEffect, useState } from 'react';
import { useDataVersion } from '@/context/DataContext';
import { dataApi } from '@/lib/api';
import { getRoleLabel } from '@/config/roles';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export default function UsersPage() {
  const version = useDataVersion();
  const [users, setUsers] = useState<Record<string, unknown>[]>([]);

  const load = () => dataApi.users().then(({ users: u }) => setUsers(u));

  useEffect(() => { load(); }, [version]);

  const toggleStatus = async (id: number, current: string) => {
    await dataApi.patchUser(id, { status: current === 'active' ? 'inactive' : 'active' });
    load();
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full min-w-0">
      <h1 className="font-display text-xl sm:text-2xl font-bold text-maroon">Manage Users</h1>
      <Card>
        <CardHeader title={`All Users (${users.length})`} />
        <CardBody className="table-scroll p-0 sm:p-5">
          <table className="w-full text-xs sm:text-sm">
            <thead><tr className="border-b text-left text-slate-500">
              <th className="pb-2">Name</th><th>Email</th><th>Role</th><th>Status</th><th>Action</th>
            </tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={String(u.id)} className="border-b">
                  <td className="py-2 font-medium">{String(u.full_name)}</td>
                  <td>{String(u.email)}</td>
                  <td>{getRoleLabel(String(u.role))}</td>
                  <td><Badge status={String(u.status)} /></td>
                  <td>
                    {u.role !== 'super_admin' && (
                      <Button variant="outline" className="text-xs py-1" onClick={() => toggleStatus(Number(u.id), String(u.status))}>
                        Toggle Status
                      </Button>
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
