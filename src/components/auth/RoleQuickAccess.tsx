import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, getRoleFolder } from '@/context/AuthContext';
import { DEMO_ACCOUNTS, type DemoAccount } from '@/config/demoAccounts';
import { ROLES, type RoleKey } from '@/config/roles';

interface RoleQuickAccessProps {
  variant?: 'login' | 'dashboard';
  className?: string;
}

export default function RoleQuickAccess({ variant = 'login', className = '' }: RoleQuickAccessProps) {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [loadingRole, setLoadingRole] = useState<RoleKey | null>(null);
  const [error, setError] = useState('');

  const handleQuickLogin = async (acc: DemoAccount) => {
    setError('');
    setLoadingRole(acc.role);
    try {
      const u = await login(acc.email, acc.password);
      navigate(`/${getRoleFolder(u.role)}/dashboard`, { replace: variant === 'dashboard' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoadingRole(null);
    }
  };

  const isDashboard = variant === 'dashboard';
  const currentRole = user?.role;

  return (
    <div className={className}>
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-end sm:justify-between gap-2 mb-4">
        <div className="min-w-0">
          <h2 className="font-display text-base sm:text-lg font-bold text-candy-800 flex flex-wrap items-center gap-2">
            ⚡ Quick Access — All 20 Roles
          </h2>
          <p className="text-sm text-candy-600 mt-0.5">One-click sign-in for any role</p>
        </div>
        {isDashboard && (
          <span className="text-xs rounded-full bg-candy-100 text-candy-700 px-3 py-1 font-bold border border-candy-200">
            Switch role anytime
          </span>
        )}
      </div>

      {error && (
        <div className="mb-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 px-3 py-2 text-sm">
          {error}
        </div>
      )}

      <div className={`grid grid-cols-1 gap-3 ${isDashboard ? 'sm:grid-cols-2 xl:grid-cols-3' : 'sm:grid-cols-2'}`}>
        {DEMO_ACCOUNTS.map((acc) => {
          const isActive = currentRole === acc.role;
          const isLoading = loadingRole === acc.role;
          return (
            <button
              key={acc.role}
              type="button"
              disabled={!!loadingRole}
              onClick={() => handleQuickLogin(acc)}
              className={`text-left rounded-2xl border-2 p-3 sm:p-4 transition-all disabled:opacity-60 min-h-[48px] w-full ${
                isActive
                  ? 'border-candy-700 bg-candy-50 ring-2 ring-candy-300 shadow-candy'
                  : 'border-candy-200 bg-white hover:border-candy-500 hover:shadow-candy'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-2xl">{acc.icon}</span>
                {isActive && (
                  <span className="text-[10px] uppercase font-bold text-white bg-candy-800 px-2 py-0.5 rounded-full">
                    Current
                  </span>
                )}
                {isLoading && <span className="text-xs text-candy-400 animate-pulse">Signing in…</span>}
              </div>
              <div className="font-bold text-candy-900 mt-1">{acc.label}</div>
              <div className="text-xs text-candy-600 mt-0.5">{acc.name}</div>
              <div className="mt-2 space-y-1 text-xs font-mono bg-candy-50 rounded-xl p-2 border border-candy-100">
                <div className="flex justify-between gap-2">
                  <span className="text-candy-400">Email</span>
                  <span className="text-candy-800 truncate font-semibold" title={acc.email}>
                    {acc.email}
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-candy-400">Password</span>
                  <span className="text-candy-800">{acc.password}</span>
                </div>
              </div>
              <ul className="mt-2 flex flex-wrap gap-1">
                {acc.seededData.slice(0, isDashboard ? 2 : 3).map((item) => (
                  <li
                    key={item}
                    className="text-[10px] bg-candy-100 text-candy-700 px-1.5 py-0.5 rounded-md border border-candy-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-2 text-xs font-bold text-maroon">→ Open {ROLES[acc.role].label} dashboard</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
