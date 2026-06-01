import { useEffect, useState, FormEvent } from 'react';
import { useDataVersion } from '@/context/DataContext';
import { dataApi } from '@/lib/api';
import { formatDateTime } from '@/lib/utils';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function AnnouncementsPage() {
  const version = useDataVersion();
  const [items, setItems] = useState<Record<string, unknown>[]>([]);

  const load = () => dataApi.announcements().then(({ announcements: a }) => setItems(a));

  useEffect(() => { load(); }, [version]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await dataApi.createAnnouncement({
      title: fd.get('title'),
      content: fd.get('content'),
      is_public: fd.get('is_public') === 'on',
    });
    (e.target as HTMLFormElement).reset();
    load();
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full min-w-0">
      <h1 className="font-display text-xl sm:text-2xl font-bold text-maroon">Announcements</h1>
      <Card>
        <CardHeader title="Post Announcement" />
        <CardBody>
          <form onSubmit={onSubmit} className="space-y-4 max-w-xl w-full">
            <input name="title" placeholder="Title" required className="input-candy" />
            <textarea name="content" placeholder="Content" required rows={4} className="input-candy" />
            <label className="flex items-center gap-2 text-sm">
              <input name="is_public" type="checkbox" defaultChecked /> Public (members, devotees, visitors)
            </label>
            <Button type="submit">Publish</Button>
          </form>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="All Announcements" />
        <CardBody className="space-y-4">
          {items.map((a) => (
            <div key={String(a.id)} className="border-b pb-4">
              <strong className="text-maroon">{String(a.title)}</strong>
              <p className="mt-2 text-slate-600 whitespace-pre-wrap">{String(a.content)}</p>
              <p className="text-xs text-slate-400 mt-2">By {String(a.full_name)} · {formatDateTime(String(a.created_at))}</p>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}
