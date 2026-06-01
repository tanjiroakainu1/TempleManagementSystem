import { useEffect, useState, FormEvent } from 'react';
import { useDataVersion } from '@/context/DataContext';
import { dataApi } from '@/lib/api';
import { formatDate, formatDateTime } from '@/lib/utils';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function BookRitualPage() {
  const version = useDataVersion();
  const [requests, setRequests] = useState<Record<string, unknown>[]>([]);
  const [msg, setMsg] = useState('');

  const load = () => dataApi.ritualRequests().then(({ requests: r }) => setRequests(r));

  useEffect(() => { load(); }, [version]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    try {
      await dataApi.createRitualRequest({
        ritual_type: fd.get('ritual_type'),
        requested_date: fd.get('requested_date'),
        notes: fd.get('notes'),
      });
      setMsg('Ritual request submitted. You will be notified when scheduled.');
      (e.target as HTMLFormElement).reset();
      load();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Failed');
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full min-w-0">
      <h1 className="font-display text-xl sm:text-2xl font-bold text-maroon">Book Rituals</h1>
      {msg && <div className="rounded-lg bg-emerald-50 text-emerald-800 px-4 py-3">{msg}</div>}
      <Card>
        <CardHeader title="Request a Ritual" />
        <CardBody>
          <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl w-full">
            <div>
              <label className="block text-sm font-medium mb-1">Ritual Type</label>
              <select name="ritual_type" required className="input-candy">
                <option>Abhishekam</option><option>Archana</option><option>Homa</option><option>Puja</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Requested Date</label>
              <input name="requested_date" type="date" required className="input-candy" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Notes</label>
              <textarea name="notes" rows={3} className="input-candy" />
            </div>
            <Button type="submit">Submit Request</Button>
          </form>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="My Requests" />
        <CardBody className="space-y-3">
          {requests.map((r) => (
            <div key={String(r.id)} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <strong>{String(r.ritual_type)}</strong>
                <Badge status={String(r.status)} />
              </div>
              <p className="text-sm text-slate-500 mt-1">Requested: {formatDate(String(r.requested_date))}</p>
              <p className="text-xs text-slate-400">{formatDateTime(String(r.created_at))}</p>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}
