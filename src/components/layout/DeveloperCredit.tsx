import { DEVELOPER } from '@/config/developer';

type Variant = 'hero' | 'banner' | 'sidebar' | 'bar' | 'mini';

interface DeveloperCreditProps {
  variant?: Variant;
  className?: string;
}

export default function DeveloperCredit({ variant = 'banner', className = '' }: DeveloperCreditProps) {
  if (variant === 'hero') {
    return (
      <div className={`relative mt-14 sm:mt-16 ${className}`}>
        <div className="absolute inset-0 flex justify-center pointer-events-none">
          <div className="h-32 w-32 sm:h-40 sm:w-40 rounded-full bg-white/20 blur-3xl animate-dev-glow" />
        </div>
        <div className="developer-card-hero relative mx-auto max-w-md">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-1 text-lg animate-dev-float">
            <span className="animate-pulse">🛕</span>
            <span>✨</span>
          </div>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-white/70 font-bold mb-2">
            Crafted by
          </p>
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="developer-avatar-lg" aria-hidden>
              {DEVELOPER.initials}
            </span>
            <div className="text-left min-w-0">
              <p className="font-display text-xl sm:text-2xl font-bold text-white drop-shadow-md leading-tight">
                {DEVELOPER.name}
              </p>
              <p className="text-sm text-candy-100 font-semibold flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-300 shadow-[0_0_8px_#6ee7b7] animate-pulse" />
                {DEVELOPER.title}
              </p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-white/80 italic">{DEVELOPER.tagline}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-[10px] font-bold uppercase tracking-wider">
            {['React', 'TypeScript', 'Ash UI', 'Temple MS'].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/15 border border-white/25 px-2.5 py-1 backdrop-blur"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className={`developer-sidebar ${className}`}>
        <div className="flex items-center gap-2.5">
          <span className="developer-avatar-sm shrink-0">{DEVELOPER.initials}</span>
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-candy-100/70 font-bold">Developer</p>
            <p className="text-sm font-bold truncate text-white">{DEVELOPER.name}</p>
          </div>
        </div>
        <p className="text-[10px] text-candy-100/60 mt-1.5 leading-snug">{DEVELOPER.emoji} {DEVELOPER.tagline}</p>
      </div>
    );
  }

  if (variant === 'bar') {
    return (
      <footer
        className={`developer-bar shrink-0 border-t border-candy-200/80 bg-gradient-to-r from-candy-50 via-white to-candy-50 ${className}`}
      >
        <div className="flex flex-col xs:flex-row items-center justify-center gap-2 xs:gap-4 px-3 sm:px-6 py-3 text-center">
          <span className="developer-avatar-xs">{DEVELOPER.initials}</span>
          <p className="text-xs sm:text-sm text-candy-800">
            <span className="text-candy-500 font-semibold">Developed by</span>{' '}
            <span className="font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-maroon to-candy-600 developer-shimmer-text">
              {DEVELOPER.name}
            </span>
            <span className="hidden sm:inline text-candy-400 mx-2">·</span>
            <span className="block xs:inline text-candy-500 text-[11px] sm:text-xs mt-0.5 xs:mt-0">
              {DEVELOPER.tagline}
            </span>
          </p>
          <span className="hidden sm:inline text-lg animate-dev-float" aria-hidden>
            🛕
          </span>
        </div>
      </footer>
    );
  }

  if (variant === 'mini') {
    return (
      <p className={`text-xs text-candy-500 text-center ${className}`}>
        {DEVELOPER.emoji}{' '}
        <span className="font-semibold text-candy-700">{DEVELOPER.name}</span>
        <span className="text-candy-400"> · {DEVELOPER.title}</span>
      </p>
    );
  }

  /* banner — login / register */
  return (
    <div className={`developer-banner ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-candy-100/0 via-candy-200/40 to-candy-100/0 developer-shine pointer-events-none" />
      <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-center sm:text-left">
        <span className="developer-avatar-md">{DEVELOPER.initials}</span>
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-candy-500 font-bold">Lead Developer</p>
          <p className="font-display text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-candy-700 via-maroon to-candy-600">
            {DEVELOPER.name}
          </p>
          <p className="text-xs text-candy-600 mt-0.5">{DEVELOPER.tagline} {DEVELOPER.emoji}</p>
        </div>
        <div className="hidden sm:flex flex-col gap-1 text-[10px] font-bold text-candy-400 uppercase tracking-wider">
          <span>🛕 Temple MS</span>
          <span>v2.0 Ash Edition</span>
        </div>
      </div>
    </div>
  );
}
