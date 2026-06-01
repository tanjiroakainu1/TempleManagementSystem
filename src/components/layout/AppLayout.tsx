import { useEffect, useState, type ReactNode } from 'react';
import { Outlet, NavLink, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth, getRoleFolder } from '@/context/AuthContext';
import { getNavItems } from '@/config/navigation';
import { getRoleLabel } from '@/config/roles';
import { ROLES } from '@/config/roles';
import DeveloperCredit from '@/components/layout/DeveloperCredit';
import HomeButton from '@/components/layout/HomeButton';
import AppHeaderActions from '@/components/layout/AppHeaderActions';

function userInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'TU';
}

function SidebarShell({
  folder,
  nav,
  onNavigate,
  showClose,
  onClose,
  headerActions,
}: {
  folder: string;
  nav: ReturnType<typeof getNavItems>;
  onNavigate?: () => void;
  showClose?: boolean;
  onClose?: () => void;
  headerActions?: ReactNode;
}) {
  const dashboardPath = `/${folder}/dashboard`;

  return (
    <>
      <div className="p-4 sm:p-5 border-b border-white/10 shrink-0 flex items-start justify-between gap-2">
        <Link to={dashboardPath} onClick={onNavigate} className="min-w-0 flex items-center gap-2">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-2xl border border-white/20">
            🛕
          </span>
          <div className="min-w-0">
            <div className="font-display font-bold text-lg leading-tight">Temple MS</div>
            <div className="text-[10px] text-candy-200/80 uppercase tracking-wider">Management</div>
          </div>
        </Link>
        {showClose && (
          <button
            type="button"
            className="tap-target rounded-lg bg-white/10 text-white text-xl leading-none"
            onClick={onClose}
            aria-label="Close menu"
          >
            ×
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
        <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-candy-200/60">
          Navigation
        </p>
        <div className="space-y-1">
          {nav.map((item) => {
            const to = item.shared ? `/shared/${item.slug}` : `/${folder}/${item.slug}`;
            return (
              <NavLink
                key={item.slug}
                to={to}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `nav-app-link flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm min-h-[44px] sm:min-h-[42px] ${
                    isActive ? 'nav-app-link-active' : 'nav-app-link-idle'
                  }`
                }
              >
                <span className="text-lg shrink-0 w-6 text-center">{item.icon}</span>
                <span className="truncate font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      <div className="p-3 sm:p-4 border-t border-white/10 shrink-0 space-y-3">
        {headerActions}
        <DeveloperCredit variant="sidebar" />
      </div>
    </>
  );
}

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  if (!user) return null;

  const nav = getNavItems(user.role);
  const folder = getRoleFolder(user.role);
  const roleInfo = ROLES[user.role];
  const roleLabel = getRoleLabel(user.role);
  const initials = userInitials(user.full_name);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate('/login');
  };

  const handleSwitchRole = () => {
    setMenuOpen(false);
    logout();
    navigate('/login');
  };

  const headerActions = (
    <AppHeaderActions
      folder={folder}
      roleIcon={roleInfo.icon}
      roleLabel={roleLabel}
      userName={user.full_name}
      initials={initials}
      onLogout={handleLogout}
      onSwitchRole={handleSwitchRole}
    />
  );

  const sidebarActions = (
    <AppHeaderActions
      folder={folder}
      roleIcon={roleInfo.icon}
      roleLabel={roleLabel}
      userName={user.full_name}
      initials={initials}
      onLogout={handleLogout}
      onSwitchRole={handleSwitchRole}
      layout="stack"
    />
  );

  return (
    <div className="flex min-h-[100dvh] w-full max-w-[100vw] bg-slate-100">
      {/* Desktop sidebar */}
      <aside className="app-sidebar hidden lg:flex w-[260px] xl:w-[280px] shrink-0 flex-col text-white">
        <SidebarShell folder={folder} nav={nav} headerActions={sidebarActions} />
      </aside>

      {/* Mobile drawer */}
      {menuOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu overlay"
          />
          <aside className="app-sidebar fixed inset-y-0 left-0 z-50 w-[min(100vw-3rem,280px)] flex flex-col text-white animate-drawer-in lg:hidden">
            <SidebarShell
              folder={folder}
              nav={nav}
              onNavigate={() => setMenuOpen(false)}
              showClose
              onClose={() => setMenuOpen(false)}
              headerActions={sidebarActions}
            />
          </aside>
        </>
      )}

      <div className="flex-1 flex flex-col min-w-0 w-full">
        <header className="app-topbar sticky top-0 z-30 safe-top shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2.5 sm:py-3 min-h-[56px] w-full min-w-0">
            <button
              type="button"
              className="lg:hidden tap-target shrink-0 rounded-lg border border-white/30 bg-white/15 text-white font-bold text-lg"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              ☰
            </button>

            <HomeButton to={`/${folder}/dashboard`} />

            <Link
              to={`/${folder}/dashboard`}
              className="font-display font-bold text-white/90 text-sm truncate min-w-0 hidden md:inline max-w-[140px] lg:max-w-none"
            >
              🛕 Temple MS
            </Link>

            <div className="flex-1 min-w-0" />

            {headerActions}
          </div>
        </header>

        <main className="page-content flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
