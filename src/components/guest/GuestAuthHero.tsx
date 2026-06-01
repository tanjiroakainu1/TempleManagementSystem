import { Link } from 'react-router-dom';

interface GuestAuthHeroProps {
  title: string;
  subtitle: string;
  alternate?: { label: string; to: string; prompt: string };
}

export default function GuestAuthHero({ title, subtitle, alternate }: GuestAuthHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-candy-800 via-candy-700 to-candy-900 text-white">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_50%)]" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="max-w-2xl">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-white/60 mb-3">
            Ash gray temple platform
          </p>
          <h1 className="font-display text-2xl sm:text-4xl font-bold tracking-tight">{title}</h1>
          <p className="mt-3 text-sm sm:text-base text-white/85 leading-relaxed">{subtitle}</p>
          {alternate && (
            <p className="mt-5 text-sm text-white/75">
              {alternate.prompt}{' '}
              <Link to={alternate.to} className="font-bold text-white underline underline-offset-4 hover:text-candy-100">
                {alternate.label}
              </Link>
            </p>
          )}
        </div>
        <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 gap-6 text-center">
          {[
            { n: '20', l: 'Roles' },
            { n: '∞', l: 'Demo data' },
            { n: '1', l: 'Portal' },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl bg-white/10 border border-white/20 px-5 py-4 backdrop-blur min-w-[88px]">
              <p className="text-2xl font-bold">{s.n}</p>
              <p className="text-[10px] uppercase tracking-wider text-white/70 mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
