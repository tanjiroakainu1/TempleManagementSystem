import { Link } from 'react-router-dom';
import { getRoleCapabilities } from '@/config/roleCapabilities';
import { getNavItems } from '@/config/navigation';
import { getRoleFolder } from '@/context/AuthContext';
import type { RoleKey } from '@/config/roles';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';

interface Props {
  role: RoleKey;
}

export default function RoleCapabilitiesCard({ role }: Props) {
  const cap = getRoleCapabilities(role);
  const folder = getRoleFolder(role);
  const modules = getNavItems(role).filter((n) => n.slug !== 'dashboard' && !n.shared);

  return (
    <Card>
      <CardHeader title={`${cap.order}. ${cap.title} — Your Responsibilities`} />
      <CardBody className="space-y-4">
        <p className="text-sm text-candy-600 -mt-2">
          Each sidebar link opens a dedicated page in{' '}
          <code className="text-xs bg-candy-100 text-candy-800 px-1.5 py-0.5 rounded-lg">src/roles/{folder}/</code>
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {cap.responsibilities.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm text-candy-900 rounded-xl bg-gradient-to-r from-candy-50 to-white border border-candy-200 px-3 py-2.5"
            >
              <span className="text-maroon font-bold shrink-0">✓</span>
              {item}
            </li>
          ))}
        </ul>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-candy-500 mb-2">
            Dedicated pages ({modules.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {modules.map((m) => (
              <Link
                key={m.slug}
                to={`/${folder}/${m.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border-2 border-candy-200 bg-white px-3 py-1.5 text-xs font-bold text-candy-700 hover:bg-gradient-to-r hover:from-maroon hover:to-candy-600 hover:text-white hover:border-transparent transition shadow-sm"
              >
                <span>{m.icon}</span>
                {m.label}
              </Link>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
