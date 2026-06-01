import { Link } from 'react-router-dom';
import { formatDateTime } from '@/lib/utils';
import { getRoleLabel } from '@/config/roles';
import { APP_PRIVACY } from '@/config/privacy';
import { SHARED_ACTIVITY_ROUTE } from '@/lib/storage/activity';
import Badge from '@/components/ui/Badge';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';

export interface ActivityRow {
  id?: number;
  created_at?: string;
  actor_name?: string;
  user_role?: string;
  action?: string;
  entity_type?: string;
  entity_label?: string;
  entity_id?: number | null;
  summary?: string;
}

interface SharedActivityTableProps {
  rows: ActivityRow[];
  loading?: boolean;
  compact?: boolean;
  title?: string;
  showViewAll?: boolean;
  maxRows?: number;
}

export default function SharedActivityTable({
  rows,
  loading = false,
  compact = false,
  title = 'Recent activity',
  showViewAll = APP_PRIVACY.showSharedActivityNav,
  maxRows,
}: SharedActivityTableProps) {
  const display = maxRows ? rows.slice(0, maxRows) : rows;

  return (
    <Card className="border-candy-300/60">
      <CardHeader
        title={title}
        action={
          showViewAll ? (
            <Link
              to={SHARED_ACTIVITY_ROUTE}
              className="text-sm font-bold text-candy-600 hover:text-maroon hover:underline"
            >
              View full table →
            </Link>
          ) : undefined
        }
      />
      <CardBody className="p-0">
        {loading ? (
          <p className="text-candy-400 text-center py-10 font-medium">Loading activity…</p>
        ) : !display.length ? (
          <p className="text-candy-400 text-center py-10">
            No activity yet. Updates from all roles will appear here.
          </p>
        ) : (
          <div className="table-scroll">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-candy-50 to-candy-100/80 border-y border-candy-200 text-left text-candy-800">
                  {!compact && <th className="px-2 sm:px-4 py-2 sm:py-3 font-bold w-10 sm:w-12">#</th>}
                  <th className="px-2 sm:px-4 py-2 sm:py-3 font-bold whitespace-nowrap">Date & Time</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 font-bold">Actor</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 font-bold hidden sm:table-cell">Role</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 font-bold">Action</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 font-bold hidden md:table-cell">Module</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 font-bold">Summary</th>
                </tr>
              </thead>
              <tbody>
                {display.map((a, i) => (
                  <tr
                    key={String(a.id ?? i)}
                    className="border-b border-candy-50 hover:bg-candy-50/80 transition-colors"
                  >
                    {!compact && <td className="px-2 sm:px-4 py-2 sm:py-3 text-candy-400">{String(a.id ?? i + 1)}</td>}
                    <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-slate-600">
                      {a.created_at ? formatDateTime(String(a.created_at)) : '—'}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 font-semibold text-candy-900">{String(a.actor_name ?? '—')}</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-candy-700 hidden sm:table-cell">{getRoleLabel(String(a.user_role ?? ''))}</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3">
                      <Badge status={String(a.action ?? 'update')} />
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-candy-700 hidden md:table-cell">
                      {String(a.entity_label ?? a.entity_type ?? '—')}
                      {a.entity_id != null && (
                        <span className="text-candy-400 ml-1">#{String(a.entity_id)}</span>
                      )}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-slate-700 max-w-[120px] sm:max-w-xs truncate" title={String(a.summary)}>
                      {String(a.summary ?? '—')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
