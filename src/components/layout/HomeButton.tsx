import { Link, type LinkProps } from 'react-router-dom';

interface HomeButtonProps {
  to: string;
  label?: string;
  className?: string;
  onClick?: LinkProps['onClick'];
}

/** Compact Home control for app headers */
export default function HomeButton({
  to,
  label = 'Home',
  className = '',
  onClick,
}: HomeButtonProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-lg border border-white/30 bg-white/10 px-2.5 sm:px-3 py-2 text-xs font-bold text-white hover:bg-white/20 min-h-[40px] shrink-0 ${className}`.trim()}
      aria-label={label}
    >
      <span aria-hidden>🏠</span>
      <span className="hidden xs:inline">{label}</span>
    </Link>
  );
}
