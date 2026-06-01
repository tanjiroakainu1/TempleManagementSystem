import { Link } from 'react-router-dom';
import { SYSTEM_FLOW } from '@/config/systemFlow';

export default function SystemFlowSection() {
  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6 bg-candy-800 text-white" id="how-it-works">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-candy-200 text-xs sm:text-sm font-bold uppercase tracking-[0.25em] mb-2">
            How it works
          </p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Clear flow from guest to temple operations
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/85 max-w-2xl mx-auto">
            Follow this path through the system — built for clarity across all 20 temple roles.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-8 left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {SYSTEM_FLOW.map((item) => (
              <li
                key={item.step}
                className="landing-flow-card group relative rounded-2xl border border-white/25 bg-white/10 backdrop-blur-md p-5 sm:p-6 text-left hover:bg-white/15 transition-all"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-2xl shadow-inner border border-white/30 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-candy-100/80">
                      Step {item.step}
                    </span>
                    <h3 className="font-display font-bold text-lg text-white mt-0.5">{item.title}</h3>
                    <p className="text-sm text-white/80 mt-2 leading-relaxed">{item.summary}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10 flex flex-col xs:flex-row justify-center gap-3">
          <Link
            to="/login"
            className="rounded-xl bg-white text-candy-700 px-8 py-3.5 font-bold shadow-candy-lg text-center min-h-[48px] flex items-center justify-center hover:bg-candy-50 active:scale-[0.98] transition"
          >
            Start with Demo Login →
          </Link>
          <a
            href="#roles"
            className="rounded-xl border-2 border-white/40 text-white px-8 py-3.5 font-bold text-center min-h-[48px] flex items-center justify-center hover:bg-white/10 transition"
          >
            See all 20 roles
          </a>
        </div>
      </div>
    </section>
  );
}
