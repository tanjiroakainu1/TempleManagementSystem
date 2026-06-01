import { Link } from 'react-router-dom';

/** Decorative dashboard preview for landing hero */
export default function GuestPortalPreview() {
  return (
    <div className="guest-portal-preview relative w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
      <div className="absolute -inset-4 bg-white/10 rounded-3xl blur-2xl" aria-hidden />
      <div className="relative rounded-2xl border border-white/25 bg-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/15 bg-black/20">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-2 text-[10px] font-semibold text-white/50 uppercase tracking-wider">
            Temple portal
          </span>
        </div>
        <div className="p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/50">Welcome back</p>
              <p className="font-display font-bold text-white text-lg">Temple Dashboard</p>
            </div>
            <span className="text-3xl">🛕</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { l: 'Donations', v: '₱128k', c: 'bg-emerald-500/20 text-emerald-100' },
              { l: 'Events', v: '12', c: 'bg-sky-500/20 text-sky-100' },
              { l: 'Rituals', v: '6', c: 'bg-violet-500/20 text-violet-100' },
              { l: 'Approvals', v: '3', c: 'bg-amber-500/20 text-amber-100' },
            ].map((s) => (
              <div key={s.l} className={`rounded-xl px-3 py-2.5 ${s.c}`}>
                <p className="text-[10px] opacity-80">{s.l}</p>
                <p className="font-bold text-sm">{s.v}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl bg-white/10 border border-white/15 p-3 space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">Live charts</p>
            <div className="flex items-end gap-1 h-12">
              {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-white/30"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
          <Link
            to="/login"
            className="block w-full rounded-xl bg-white text-candy-800 text-center py-2.5 text-sm font-bold hover:bg-candy-50 transition"
          >
            Open your portal →
          </Link>
        </div>
      </div>
    </div>
  );
}
