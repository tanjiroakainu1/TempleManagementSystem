import { Link } from 'react-router-dom';
import { ROLES } from '@/config/roles';
import { DEVELOPER } from '@/config/developer';
import { SYSTEM_FEATURES } from '@/config/systemFlow';
import GuestNav from '@/components/guest/GuestNav';
import GuestFooter from '@/components/guest/GuestFooter';
import SystemFlowSection from '@/components/landing/SystemFlowSection';
import DeveloperCredit from '@/components/layout/DeveloperCredit';

export default function Landing() {
  const roleList = Object.values(ROLES);

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <GuestNav />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-candy-800 via-candy-700 to-candy-900 text-white">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12),transparent_55%)]" />
        <div className="absolute -right-20 top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-48 w-48 rounded-full bg-white/5 blur-2xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-14 sm:pb-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur border border-white/25 px-4 py-2 text-xs sm:text-sm font-semibold mb-6">
            <span>🛕</span>
            <span>Ash gray · Temple Management System</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
            Your temple. One platform.{' '}
            <span className="text-white/80">Twenty dedicated portals.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
            Rituals, donations, events, finance, education, security, and community — beautifully
            organized for every role from Super Admin to Visitor. No login needed to explore; sign in
            when you are ready.
          </p>

          <div className="flex flex-col xs:flex-row justify-center gap-3 mt-8 mb-10">
            <Link
              to="/login"
              className="w-full xs:w-auto rounded-xl bg-white text-candy-800 px-8 py-4 font-bold shadow-candy-lg hover:bg-candy-50 active:scale-[0.98] transition min-h-[52px] flex items-center justify-center"
            >
              Login to portal
            </Link>
            <Link
              to="/register"
              className="w-full xs:w-auto rounded-xl border-2 border-white/40 text-white px-8 py-4 font-bold hover:bg-white/10 backdrop-blur active:scale-[0.98] transition min-h-[52px] flex items-center justify-center"
            >
              Create free account
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-sm">
            {[
              { v: '20', l: 'Role portals' },
              { v: '100%', l: 'Browser demo' },
              { v: '24/7', l: 'Temple Guide AI' },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-2xl sm:text-3xl font-bold">{s.v}</p>
                <p className="text-white/60 text-xs uppercase tracking-wider mt-1">{s.l}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs sm:text-sm text-white/60">
            Demo: <code className="bg-white/10 px-2 py-0.5 rounded">admin@gmail.com</code> /{' '}
            <code className="bg-white/10 px-2 py-0.5 rounded">admin123</code>
            <span className="hidden sm:inline"> · Other roles: @gmail.com / demo123</span>
          </p>
        </div>
      </section>

      {/* Light strip — trust / developer */}
      <section className="bg-white border-y border-candy-200 py-10 sm:py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <DeveloperCredit variant="banner" />
        </div>
      </section>

      <SystemFlowSection />

      {/* Features on light background */}
      <section className="py-14 sm:py-18 px-4 sm:px-6 bg-gradient-to-b from-candy-50 to-white" id="features">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-candy-500 mb-2">
              Connected modules
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-candy-900">
              Everything in one temple
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SYSTEM_FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-candy-200 bg-white p-6 shadow-sm hover:shadow-candy hover:border-candy-300 transition text-left"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-candy-100 text-2xl border border-candy-200">
                  {f.icon}
                </span>
                <h3 className="font-display font-bold text-lg text-candy-900 mt-4">{f.title}</h3>
                <p className="text-sm text-candy-600 mt-2 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 bg-candy-800 text-white" id="roles">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold">20 roles · 20 portals</h2>
          <p className="text-sm sm:text-base text-white/80 mt-3 mb-8 max-w-xl mx-auto">
            Each role has its own dashboard, profile, and modules — pick any demo account on the login
            page for instant access.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {roleList.map((r) => (
              <span
                key={r.folder}
                className="rounded-full bg-white/10 border border-white/20 px-3 py-2 text-xs sm:text-sm font-medium hover:bg-white/20 transition"
              >
                {r.icon} {r.label}
              </span>
            ))}
          </div>
          <Link
            to="/login"
            className="inline-flex mt-8 rounded-xl bg-white text-candy-800 px-8 py-3 font-bold shadow-candy hover:bg-candy-50 transition min-h-[48px] items-center"
          >
            Try any role — Quick Access →
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-14 px-4 sm:px-6 bg-white text-center">
        <div className="max-w-xl mx-auto">
          <span className="text-4xl">🛕</span>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-candy-900 mt-4">
            Ready to enter the temple?
          </h2>
          <p className="text-sm text-candy-600 mt-3">
            Built by <span className="font-bold text-candy-800">{DEVELOPER.name}</span>. Use Temple
            Guide on any page after login for instant help.
          </p>
          <div className="flex flex-col xs:flex-row justify-center gap-3 mt-6">
            <Link
              to="/login"
              className="rounded-xl bg-gradient-to-r from-candy-700 to-candy-600 text-white px-8 py-3.5 font-bold shadow-candy min-h-[48px] flex items-center justify-center hover:opacity-95 transition"
            >
              Open portal
            </Link>
            <Link
              to="/register"
              className="rounded-xl border-2 border-candy-300 text-candy-800 px-8 py-3.5 font-bold min-h-[48px] flex items-center justify-center hover:bg-candy-50 transition"
            >
              Register
            </Link>
          </div>
        </div>
      </section>

      <GuestFooter variant="light" />
    </div>
  );
}
