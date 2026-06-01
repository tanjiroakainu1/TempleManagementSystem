import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

type Variant = 'logout' | 'outline-light' | 'outline-dark' | 'ghost';

const VARIANT_CLASS: Record<Variant, string> = {
  logout:
    'bg-gradient-to-r from-maroon to-candy-600 text-white border-transparent shadow-candy hover:opacity-90',
  'outline-light':
    'border border-candy-200 bg-white text-candy-800 hover:bg-candy-50',
  'outline-dark':
    'border border-white/30 bg-white/10 text-white hover:bg-white/20',
  ghost: 'border border-transparent text-white/90 hover:bg-white/10',
};

const BASE =
  'inline-flex items-center justify-center gap-1.5 rounded-lg px-2.5 sm:px-3 py-2 text-xs font-bold min-h-[44px] sm:min-h-[40px] shrink-0 touch-manipulation transition active:scale-[0.98] whitespace-nowrap';

function ActionLabel({
  label,
  shortLabel,
  icon,
}: {
  label: string;
  shortLabel?: string;
  icon?: ReactNode;
}) {
  return (
    <>
      {icon ? (
        <span className="text-base leading-none shrink-0" aria-hidden>
          {icon}
        </span>
      ) : null}
      {shortLabel ? (
        <>
          <span className="sm:hidden">{shortLabel}</span>
          <span className="hidden sm:inline">{label}</span>
        </>
      ) : (
        <span>{label}</span>
      )}
    </>
  );
}

interface SharedProps {
  variant?: Variant;
  className?: string;
  label: string;
  shortLabel?: string;
  icon?: ReactNode;
}

type BtnProps = SharedProps & ButtonHTMLAttributes<HTMLButtonElement>;

type LnkProps = SharedProps & Omit<LinkProps, 'children'> & { to: string };

export function HeaderActionButton({
  variant = 'outline-light',
  className = '',
  label,
  shortLabel,
  icon,
  ...props
}: BtnProps) {
  return (
    <button
      type="button"
      className={`${BASE} ${VARIANT_CLASS[variant]} ${className}`.trim()}
      aria-label={label}
      {...props}
    >
      <ActionLabel label={label} shortLabel={shortLabel} icon={icon} />
    </button>
  );
}

export function HeaderActionLink({
  variant = 'outline-light',
  className = '',
  label,
  shortLabel,
  icon,
  to,
  ...props
}: LnkProps) {
  return (
    <Link
      to={to}
      className={`${BASE} ${VARIANT_CLASS[variant]} ${className}`.trim()}
      aria-label={label}
      {...props}
    >
      <ActionLabel label={label} shortLabel={shortLabel} icon={icon} />
    </Link>
  );
}
