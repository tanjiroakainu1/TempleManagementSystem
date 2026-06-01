import { Link, useLocation } from 'react-router-dom';
import { DEVELOPER } from '@/config/developer';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/login', label: 'Login' },
  { to: '/register', label: 'Register' },
] as const;

export default function GuestNav() {
  const { pathname } = useLocation();
  const onAuth = pathname === '/login' || pathname === '/register';

  return (
    <header className="sticky top-0 z-50 safe-top border-b border-candy-200/80 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-3 px-4 sm:px-6 py-3 min-h-[56px]">
        <Link
          to="/"
          className="flex items-center gap-2.5 min-w-0 font-display font-bold text-candy-900 shrink-0 group"
          aria-label="Temple MS Home"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-candy-600 to-candy-800 text-xl text-white shadow-candy group-hover:scale-105 transition-transform">
            🛕
          </span>
          <span className="hidden xs:block leading-tight">
            <span className="block text-sm sm:text-base">Temple MS</span>
            <span className="block text-[10px] font-semibold text-candy-500 uppercase tracking-wider">
              Ash gray platform
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Guest navigation">
          {NAV.map(({ to, label }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold min-h-[40px] flex items-center transition ${
                  active
                    ? 'bg-candy-800 text-white shadow-sm'
                    : 'text-candy-700 hover:bg-candy-100'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {!onAuth && (
          <Link
            to="/login"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-candy-700 to-candy-600 text-white px-4 py-2 text-sm font-bold shadow-candy hover:opacity-95 transition shrink-0"
          >
            Enter portal →
          </Link>
        )}

        <Link
          to="/login"
          className={`${onAuth ? 'hidden sm:inline-flex' : 'sm:hidden'} items-center gap-1.5 rounded-lg border border-candy-200 bg-candy-50 px-2.5 py-2 text-[10px] font-semibold text-candy-700`}
          title={DEVELOPER.name}
        >
          <span className="developer-avatar-xs !h-6 !w-6 !text-[9px]">{DEVELOPER.initials}</span>
        </Link>
      </div>
    </header>
  );
}
