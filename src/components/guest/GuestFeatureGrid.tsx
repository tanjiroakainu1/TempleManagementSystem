import { SYSTEM_FEATURES } from '@/config/systemFlow';

export default function GuestFeatureGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {SYSTEM_FEATURES.map((f, i) => (
        <article
          key={f.title}
          className="guest-feature-card group relative rounded-2xl border border-candy-200 bg-white p-6 shadow-sm hover:shadow-candy-lg hover:border-candy-300 hover:-translate-y-0.5 transition-all duration-300"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-candy-100/80 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-candy-50 to-candy-100 text-2xl border border-candy-200 group-hover:scale-105 transition-transform">
            {f.icon}
          </span>
          <h3 className="relative font-display font-bold text-lg text-candy-900 mt-5">{f.title}</h3>
          <p className="relative text-sm text-candy-600 mt-2 leading-relaxed">{f.desc}</p>
        </article>
      ))}
    </div>
  );
}
