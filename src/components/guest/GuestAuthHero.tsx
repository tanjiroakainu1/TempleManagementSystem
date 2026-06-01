import { Link } from 'react-router-dom';

interface GuestAuthHeroProps {
  title: string;
  subtitle: string;
  alternate?: { label: string; to: string; prompt: string };
  badge?: string;
}

const STATS = [
  { n: '20', l: 'Roles' },
  { n: '6+', l: 'Modules' },
  { n: '24/7', l: 'Temple Guide' },
] as const;

export default function GuestAuthHero({ title, subtitle, alternate, badge }: GuestAuthHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-candy-800 via-candy-700 to-candy-900 text-white">
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_20%_0%,rgba(255,255,255,0.14),transparent_50%)]" />
      <div className="absolute -right-16 top-1/4 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -left-8 bottom-0 h-40 w-40 rounded-full bg-white/5 blur-2xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-2xl">
            {badge && (
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 px-3 py-1.5 text-xs font-bold mb-4 backdrop-blur">
                <span>🛕</span> {badge}
              </span>
            )}
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-white/60 mb-3">
              Ash gray temple platform
            </p>
            <h1 className="font-display text-2xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight leading-tight">
              {title}
            </h1>
            <p className="mt-4 text-sm sm:text-base text-white/88 leading-relaxed max-w-xl">{subtitle}</p>
            {alternate && (
              <p className="mt-5 text-sm text-white/75">
                {alternate.prompt}{' '}
                <Link
                  to={alternate.to}
                  className="font-bold text-white underline underline-offset-4 decoration-white/40 hover:decoration-white"
                >
                  {alternate.label}
                </Link>
              </p>
            )}
          </div>

          <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-1 lg:pb-0 snap-x">
            {STATS.map((s) => (
              <div
                key={s.l}
                className="snap-start shrink-0 rounded-2xl bg-white/10 border border-white/20 px-5 py-4 backdrop-blur min-w-[100px] text-center"
              >
                <p className="text-2xl sm:text-3xl font-bold">{s.n}</p>
                <p className="text-[10px] uppercase tracking-wider text-white/65 mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
