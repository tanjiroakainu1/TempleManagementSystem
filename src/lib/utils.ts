export function formatMoney(amount: number): string {
  return `₱${amount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatDate(date?: string | null): string {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatDateTime(date?: string | null): string {
  if (!date) return '—';
  return new Date(date).toLocaleString('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function formatPaymentMethod(method?: string): string {
  const map: Record<string, string> = {
    cash: 'Cash',
    gcash: 'GCash',
    paymaya: 'PayMaya',
    bank_transfer: 'Bank Transfer',
    bank: 'Bank Transfer',
    cheque: 'Cheque',
    upi: 'GCash',
  };
  const key = (method || '').toLowerCase();
  return map[key] ?? (key ? key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : '—');
}

const statusClasses: Record<string, string> = {
  pending: 'bg-candy-100 text-candy-800 ring-1 ring-candy-200',
  approved: 'bg-candy-mint text-emerald-800 ring-1 ring-emerald-200',
  rejected: 'bg-rose-100 text-rose-700 ring-1 ring-rose-200',
  active: 'bg-candy-mint text-emerald-800 ring-1 ring-emerald-200',
  completed: 'bg-candy-200 text-candy-800 ring-1 ring-candy-300',
  cancelled: 'bg-rose-100 text-rose-700 ring-1 ring-rose-200',
  scheduled: 'bg-candy-100 text-candy-800 ring-1 ring-candy-300',
  in_progress: 'bg-candy-200 text-candy-900 ring-1 ring-candy-300',
  open: 'bg-gold-light text-candy-800 ring-1 ring-candy-200',
  assigned: 'bg-candy-100 text-candy-800 ring-1 ring-candy-300',
  register: 'bg-candy-100 text-candy-800 ring-1 ring-candy-200',
  create: 'bg-candy-mint text-emerald-800 ring-1 ring-emerald-200',
  update: 'bg-candy-200 text-candy-800 ring-1 ring-candy-300',
  delete: 'bg-rose-100 text-rose-700 ring-1 ring-rose-200',
  approve: 'bg-candy-mint text-emerald-800 ring-1 ring-emerald-200',
  reject: 'bg-rose-100 text-rose-700 ring-1 ring-rose-200',
};

export function statusBadgeClass(status: string): string {
  return statusClasses[status.toLowerCase()] ?? 'bg-candy-50 text-candy-700 ring-1 ring-candy-100';
}

export function phpSlugToPath(slug: string): string {
  return slug.replace(/\.php$/, '');
}
