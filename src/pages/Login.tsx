import { useState, FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, getRoleFolder } from '@/context/AuthContext';
import { DEMO_ACCOUNTS, findDemoByEmail } from '@/config/demoAccounts';
import RoleQuickAccess from '@/components/auth/RoleQuickAccess';
import GuestNav from '@/components/guest/GuestNav';
import GuestFooter from '@/components/guest/GuestFooter';
import GuestAuthHero from '@/components/guest/GuestAuthHero';
import DeveloperCredit from '@/components/layout/DeveloperCredit';

export default function Login() {
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [selectedDemo, setSelectedDemo] = useState<(typeof DEMO_ACCOUNTS)[0] | null>(null);
  const [showCredentials, setShowCredentials] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate(`/${getRoleFolder(user.role)}/dashboard`, { replace: true });
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="min-h-[100dvh] flex flex-col bg-cream">
        <GuestNav />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center space-y-3">
            <p className="text-candy-600 font-bold animate-pulse">Opening temple portal…</p>
            <DeveloperCredit variant="mini" />
          </div>
        </div>
      </div>
    );
  }

  if (user) return null;

  const goDashboard = (u: { role: Parameters<typeof getRoleFolder>[0] }) => {
    navigate(`/${getRoleFolder(u.role)}/dashboard`);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim().toLowerCase().endsWith('@gmail.com')) {
      setError('Please use a @gmail.com address (see demo accounts below).');
      return;
    }
    try {
      const u = await login(email.trim(), password);
      goDashboard(u);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  const fillDemo = (acc: (typeof DEMO_ACCOUNTS)[0]) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setSelectedDemo(acc);
    setError('');
  };

  const matchedDemo = findDemoByEmail(email);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-gradient-to-b from-candy-100 via-cream to-white">
      <GuestNav />
      <GuestAuthHero
        title="Welcome back"
        subtitle="Sign in with your Gmail demo account or use Quick Access to jump into any of the 20 temple roles instantly."
        alternate={{ prompt: 'New here?', label: 'Create an account', to: '/register' }}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Sign-in card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-candy-200 bg-white p-6 sm:p-8 shadow-candy-lg sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-candy-100 text-2xl border border-candy-200">
                  🔐
                </span>
                <div>
                  <h2 className="font-display text-xl font-bold text-candy-900">Sign in</h2>
                  <p className="text-xs text-candy-500">@gmail.com required for demo</p>
                </div>
              </div>

              {error && (
                <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 text-sm">
                  {error}
                </div>
              )}

              {matchedDemo && (
                <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm">
                  <p className="font-semibold text-emerald-900">
                    {matchedDemo.icon} {matchedDemo.label}
                  </p>
                  <p className="text-emerald-700 text-xs mt-1">{matchedDemo.name}</p>
                </div>
              )}

              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-candy-800 mb-1.5">Gmail address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setSelectedDemo(findDemoByEmail(e.target.value) ?? null);
                    }}
                    required
                    className="input-candy"
                    placeholder="yourname@gmail.com"
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-candy-800 mb-1.5">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input-candy"
                    placeholder={selectedDemo ? selectedDemo.password : 'admin123 or demo123'}
                    autoComplete="current-password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-candy-700 to-candy-600 text-white py-3.5 font-bold shadow-candy hover:shadow-candy-lg transition active:scale-[0.99]"
                >
                  Sign in →
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-candy-100">
                <p className="text-xs font-bold text-candy-500 uppercase tracking-wide mb-2">
                  Quick fill — pick a role
                </p>
                <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto">
                  {DEMO_ACCOUNTS.map((acc) => (
                    <button
                      key={acc.role}
                      type="button"
                      onClick={() => fillDemo(acc)}
                      className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition ${
                        selectedDemo?.role === acc.role
                          ? 'bg-candy-800 text-white border-candy-800'
                          : 'border-candy-200 text-candy-700 hover:bg-candy-50'
                      }`}
                    >
                      {acc.icon} {acc.label.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-center text-sm text-candy-600 mt-6">
                <Link to="/" className="font-bold text-candy-800 hover:underline">
                  ← Back to home
                </Link>
              </p>
            </div>
          </div>

          {/* Quick access */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-candy-200 bg-white p-5 sm:p-6 shadow-candy max-h-[min(70vh,720px)] overflow-y-auto">
              <RoleQuickAccess variant="login" />
            </div>

            <details
              className="rounded-2xl border border-candy-200 bg-white shadow-candy overflow-hidden group"
              open={showCredentials}
              onToggle={(e) => setShowCredentials((e.target as HTMLDetailsElement).open)}
            >
              <summary className="cursor-pointer px-5 py-4 bg-candy-50 font-display font-bold text-candy-900 flex items-center justify-between list-none">
                <span>📋 Full demo credentials table</span>
                <span className="text-candy-500 text-sm font-normal group-open:rotate-180 transition">
                  ▼
                </span>
              </summary>
              <div className="table-scroll max-h-80 border-t border-candy-100">
                <table className="w-full text-sm">
                  <thead className="bg-candy-50 sticky top-0">
                    <tr className="text-left text-candy-800 text-xs">
                      <th className="px-4 py-2 font-bold">Role</th>
                      <th className="px-4 py-2 font-bold">Gmail</th>
                      <th className="px-4 py-2 font-bold">Pass</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DEMO_ACCOUNTS.map((acc) => (
                      <tr
                        key={acc.role}
                        className="border-t border-candy-50 hover:bg-candy-50 cursor-pointer"
                        onClick={() => fillDemo(acc)}
                      >
                        <td className="px-4 py-2.5 whitespace-nowrap font-medium">
                          {acc.icon} {acc.label}
                        </td>
                        <td className="px-4 py-2.5 font-mono text-xs text-candy-700">{acc.email}</td>
                        <td className="px-4 py-2.5 font-mono text-xs">{acc.password}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="px-5 py-3 text-xs text-candy-500 border-t border-candy-100">
                Super Admin: <strong>admin123</strong> · All other roles: <strong>demo123</strong>
              </p>
            </details>
          </div>
        </div>

        <DeveloperCredit variant="banner" />
      </main>

      <GuestFooter />
    </div>
  );
}
