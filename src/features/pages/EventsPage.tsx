import { useEffect, useState, FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useDataVersion } from '@/context/DataContext';
import { dataApi } from '@/lib/api';
import { formatDate, formatDateTime } from '@/lib/utils';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function EventsPage({ festival = false }: { festival?: boolean }) {
  const { user } = useAuth();
  const version = useDataVersion();
  const [events, setEvents] = useState<Record<string, unknown>[]>([]);
  const isManager = user?.role === 'event_manager';

  const load = () => dataApi.events(festival).then(({ events: e }) => setEvents(e));

  useEffect(() => { load(); }, [festival, version]);

  const onCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await dataApi.createEvent({
      title: fd.get('title'),
      description: fd.get('description'),
      event_date: fd.get('event_date'),
      event_time: fd.get('event_time') || null,
      location: fd.get('location'),
      is_festival: festival,
    });
    (e.target as HTMLFormElement).reset();
    load();
  };

  const onRegister = async (eventId: number) => {
    try {
      await dataApi.registerEvent(eventId);
      alert('Registered successfully!');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Already registered');
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full min-w-0">
      <h1 className="font-display text-xl sm:text-2xl font-bold text-maroon">{festival ? 'Festivals' : 'Events'}</h1>
      {isManager && (
        <Card>
          <CardHeader title={festival ? 'Create Festival' : 'Create Event'} />
          <CardBody>
            <form onSubmit={onCreate} className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <input name="title" placeholder="Title" required className="input-candy" />
              <input name="event_date" type="date" required className="input-candy" />
              <input name="event_time" type="time" className="input-candy" />
              <input name="location" placeholder="Location" className="input-candy" />
              <textarea name="description" placeholder="Description" rows={2} className="sm:col-span-2 input-candy" />
              <Button type="submit" className="w-full sm:w-auto">Create</Button>
            </form>
          </CardBody>
        </Card>
      )}
      <div className="grid grid-cols-1 gap-4">
        {events.map((ev) => (
          <Card key={String(ev.id)}>
            <CardBody>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                <div>
                  <h3 className="font-semibold text-lg">{String(ev.title)}</h3>
                  <p className="text-sm text-slate-500">{formatDate(String(ev.event_date))} · {String(ev.location || 'Temple')}</p>
                  <p className="text-sm mt-2">{String(ev.description || '')}</p>
                </div>
                <Badge status={String(ev.status)} />
              </div>
              {!isManager && ev.status === 'active' && (
                <Button className="mt-3" onClick={() => onRegister(Number(ev.id))}>Register</Button>
              )}
              <p className="text-xs text-slate-400 mt-2">{formatDateTime(String(ev.created_at))}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
