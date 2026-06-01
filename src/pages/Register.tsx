import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '@/lib/api';
import { ROLES, type RoleKey } from '@/config/roles';
import GuestNav from '@/components/guest/GuestNav';
import GuestFooter from '@/components/guest/GuestFooter';
import GuestAuthHero from '@/components/guest/GuestAuthHero';
import GuestBenefits from '@/components/guest/GuestBenefits';
import DeveloperCredit from '@/components/layout/DeveloperCredit';

const REGISTER_ROLES: RoleKey[] = ['devotee', 'member', 'visitor', 'volunteer'];

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get('email')).trim();
    if (!email.toLowerCase().endsWith('@gmail.com')) {
      setError('Please register with a @gmail.com address.');
      return;
    }
    if (fd.get('password') !== fd.get('confirm_password')) {
      setError('Passwords do not match');
      return;
    }
    try {
      await authApi.register({
        full_name: String(fd.get('full_name')),
        email,
        password: String(fd.get('password')),
        phone: String(fd.get('phone') || ''),
        role: String(fd.get('role')),
      });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2200);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-gradient-to-b from-candy-100 via-cream to-white">
      <GuestNav />
      <GuestAuthHero
        title="Join the temple community"
        subtitle="Create a devotee, member, visitor, or volunteer account. Your profile is saved locally for this demo temple portal."
        alternate={{ prompt: 'Already registered?', label: 'Sign in', to: '/login' }}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          <GuestBenefits title="Why create an account?" />

          <div className="rounded-2xl border border-candy-200 bg-white p-6 sm:p-8 shadow-candy-lg">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-candy-100 text-2xl border border-candy-200">
                ✨
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-candy-900">Create account</h2>
                <p className="text-xs text-candy-500">Takes less than a minute</p>
              </div>
            </div>

            {error && (
              <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 text-sm font-medium">
                Account created! Redirecting you to sign in…
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-candy-800 mb-1.5">Full name</label>
                <input name="full_name" required className="input-candy" placeholder="Your full name" />
              </div>
              <div>
                <label className="block text-sm font-bold text-candy-800 mb-1.5">Gmail address</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="input-candy"
                  placeholder="you@gmail.com"
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-candy-800 mb-1.5">Phone (optional)</label>
                <input name="phone" type="tel" className="input-candy" placeholder="+63 …" />
              </div>
              <div>
                <label className="block text-sm font-bold text-candy-800 mb-1.5">I am a…</label>
                <select name="role" required className="input-candy">
                  {REGISTER_ROLES.map((r) => (
                    <option key={r} value={r}>
                      {ROLES[r].icon} {ROLES[r].label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-candy-800 mb-1.5">Password</label>
                  <input
                    name="password"
                    type="password"
                    required
                    minLength={6}
                    className="input-candy"
                    placeholder="Min. 6 characters"
                    autoComplete="new-password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-candy-800 mb-1.5">Confirm</label>
                  <input
                    name="confirm_password"
                    type="password"
                    required
                    className="input-candy"
                    autoComplete="new-password"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={success}
                className="w-full rounded-xl bg-gradient-to-r from-candy-700 to-candy-600 text-white py-3.5 font-bold shadow-candy hover:shadow-candy-lg transition active:scale-[0.99] disabled:opacity-60"
              >
                Create account
              </button>
            </form>

            <p className="text-center text-sm text-candy-600 mt-6">
              <Link to="/login" className="font-bold text-candy-800 hover:underline">
                Sign in instead
              </Link>
              {' · '}
              <Link to="/" className="font-bold text-candy-800 hover:underline">
                Home
              </Link>
            </p>
          </div>
        </div>

        <DeveloperCredit variant="banner" className="mt-8" />
      </main>

      <GuestFooter />
    </div>
  );
}
