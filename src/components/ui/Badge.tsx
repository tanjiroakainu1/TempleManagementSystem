import { statusBadgeClass } from '@/lib/utils';

export default function Badge({ status }: { status: string }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusBadgeClass(status)}`}>
      {status.replace(/_/g, ' ')}
    </span>
  );
}
