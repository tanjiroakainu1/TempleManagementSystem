import { useParams } from 'react-router-dom';
import { PAGE_DESCRIPTIONS } from '@/config/navigation';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';

/** Fallback page for role routes — mirrors PHP page shell; extend with API as needed */
export default function RoleFeaturePage() {
  const { pageSlug } = useParams<{ pageSlug: string }>();
  const slug = pageSlug || 'dashboard';
  const title = slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const description = PAGE_DESCRIPTIONS[slug] ?? `Manage ${title.toLowerCase()} — aligned with PHP ${slug}.php`;

  return (
    <div className="space-y-4 sm:space-y-6 w-full min-w-0">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-maroon">{title}</h1>
        <p className="text-sm sm:text-base text-slate-500">{description}</p>
      </div>
      <Card>
        <CardHeader title={`${title} Module`} />
        <CardBody>
          <p className="text-slate-600">
            This module matches the PHP temple management feature at <code className="text-sm bg-slate-100 px-1 rounded">{slug}.php</code>.
            Use the dedicated feature pages (donations, events, rituals, users) where API integration is complete.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
