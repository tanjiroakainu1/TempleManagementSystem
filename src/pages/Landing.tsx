import { Link } from 'react-router-dom';
import { DEVELOPER } from '@/config/developer';
import GuestCrazyCharts from '@/components/charts/GuestCrazyCharts';
import {
  GuestNav,
  GuestFooter,
  GuestSectionHeader,
  GuestHighlights,
  GuestPortalPreview,
  GuestRoleGrid,
  GuestFeatureGrid,
  GuestTrustStrip,
} from '@/components/guest';
import SystemFlowSection from '@/components/landing/SystemFlowSection';
import DeveloperCredit from '@/components/layout/DeveloperCredit';
import { UI_LABELS } from '@/config/uiLabels';

export default function Landing() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-cream">
      <GuestNav />

      {/* Hero — split layout */}
      <section className="relative overflow-hidden bg-gradient-to-br from-candy-800 via-candy-700 to-candy-900 text-white">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12),transparent_55%)]" />
        <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-56 w-56 rounded-full bg-white/5 blur-2xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-12 sm:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur border border-white/25 px-4 py-2 text-xs sm:text-sm font-semibold mb-6">
                <span>🛕</span>
                <span>{UI_LABELS.landingHeroBadge}</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.1]">
                Your temple.{' '}
                <span className="text-white/75 block sm:inline">One platform.</span>
              </h1>
              <p className="mt-5 text-base sm:text-lg text-white/88 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {UI_LABELS.landingHeroSubtitle}
              </p>

              <div className="flex flex-col xs:flex-row justify-center lg:justify-start gap-3 mt-8">
                <Link
                  to="/login"
                  className="w-full xs:w-auto rounded-xl bg-white text-candy-800 px-8 py-4 font-bold shadow-candy-lg hover:bg-candy-50 active:scale-[0.98] transition min-h-[52px] flex items-center justify-center"
                >
                  Login to portal →
                </Link>
                <Link
                  to="/register"
                  className="w-full xs:w-auto rounded-xl border-2 border-white/40 text-white px-8 py-4 font-bold hover:bg-white/10 backdrop-blur active:scale-[0.98] transition min-h-[52px] flex items-center justify-center"
                >
                  Create free account
                </Link>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 mt-8 text-sm">
                {[
                  { v: '20', l: 'Role portals' },
                  { v: '100%', l: UI_LABELS.landingOnlineStat },
                  { v: '24/7', l: 'Temple Guide AI' },
                ].map((s) => (
                  <div key={s.l}>
                    <p className="text-2xl sm:text-3xl font-bold">{s.v}</p>
                    <p className="text-white/55 text-xs uppercase tracking-wider mt-1">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            <GuestPortalPreview />
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="relative -mt-6 z-10 px-4 sm:px-6">
        <GuestTrustStrip />
      </section>

      {/* Highlight cards */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <GuestSectionHeader
            eyebrow="Why temples choose us"
            title="Everything your community needs"
            description="From morning puja to festival season — modules that work together, not in silos."
            align="center"
          />
          <GuestHighlights />
        </div>
      </section>

      <SystemFlowSection />

      {/* Features */}
      <section className="py-14 sm:py-18 px-4 sm:px-6 bg-gradient-to-b from-white via-candy-50/40 to-white" id="features">
        <div className="max-w-6xl mx-auto space-y-10">
          <GuestSectionHeader
            eyebrow="Connected modules"
            title="Everything in one temple"
            description="Donations talk to finance. Rituals sync with schedules. One ash-gray experience end to end."
          />
          <GuestFeatureGrid />
        </div>
      </section>

      {/* Charts */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 bg-candy-50 border-y border-candy-200">
        <div className="max-w-6xl mx-auto space-y-8">
          <GuestSectionHeader
            eyebrow="Live preview"
            title="📈 Crazy Charts"
            description={UI_LABELS.landingChartsBlurb}
          />
          <GuestCrazyCharts />
        </div>
      </section>

      {/* Roles */}
      <section className="py-14 sm:py-18 px-4 sm:px-6 bg-candy-800 text-white" id="roles">
        <div className="max-w-6xl mx-auto space-y-10">
          <GuestSectionHeader
            eyebrow="20 dedicated portals"
            title="A role for every duty"
            description="Each role gets its own dashboard, profile, charts, and modules. Pick any demo on login for instant access."
            light
          />
          <GuestRoleGrid />
        </div>
      </section>

      {/* Developer + CTA */}
      <section className="py-12 sm:py-14 px-4 sm:px-6 bg-white border-b border-candy-100">
        <div className="max-w-3xl mx-auto">
          <DeveloperCredit variant="banner" />
        </div>
      </section>

      <section className="py-14 px-4 sm:px-6 bg-gradient-to-b from-candy-50 to-white text-center">
        <div className="max-w-xl mx-auto">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-candy-100 text-4xl border border-candy-200 shadow-sm">
            🛕
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-candy-900 mt-5">
            Ready to enter the temple?
          </h2>
          <p className="text-sm sm:text-base text-candy-600 mt-3 leading-relaxed">
            Built by <span className="font-bold text-candy-800">{DEVELOPER.name}</span>. After login, ask{' '}
            <strong>Temple Guide</strong> on any page for instant help.
          </p>
          <div className="flex flex-col xs:flex-row justify-center gap-3 mt-8">
            <Link
              to="/login"
              className="rounded-xl bg-gradient-to-r from-candy-700 to-candy-600 text-white px-8 py-3.5 font-bold shadow-candy min-h-[48px] flex items-center justify-center hover:opacity-95 transition"
            >
              Open portal →
            </Link>
            <Link
              to="/register"
              className="rounded-xl border-2 border-candy-300 text-candy-800 px-8 py-3.5 font-bold min-h-[48px] flex items-center justify-center hover:bg-white transition"
            >
              Create account
            </Link>
          </div>
        </div>
      </section>

      <GuestFooter variant="light" />
    </div>
  );
}
