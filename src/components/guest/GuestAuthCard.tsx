import type { ReactNode } from 'react';

interface Props {
  icon: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export default function GuestAuthCard({ icon, title, subtitle, children, footer, className = '' }: Props) {
  return (
    <div
      className={`rounded-2xl border border-candy-200/80 bg-white p-6 sm:p-8 shadow-candy-lg guest-auth-card ${className}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-candy-100 to-candy-200 text-2xl border border-candy-200 shadow-sm">
          {icon}
        </span>
        <div>
          <h2 className="font-display text-xl font-bold text-candy-900">{title}</h2>
          {subtitle && <p className="text-xs text-candy-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {children}
      {footer}
    </div>
  );
}
