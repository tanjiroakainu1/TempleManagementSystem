import { ReactNode } from 'react';

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`card-candy overflow-hidden ${className}`}>{children}</div>
  );
}

export function CardHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-candy-100 bg-gradient-to-r from-candy-50/80 to-white px-4 sm:px-5 py-3 sm:py-4">
      <h2 className="font-display text-base sm:text-lg font-bold text-candy-800 min-w-0 break-words">{title}</h2>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function CardBody({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`p-4 sm:p-5 ${className}`}>{children}</div>;
}
