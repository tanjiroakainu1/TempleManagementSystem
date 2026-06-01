const TRUST = [
  { icon: '🔒', label: 'Secure sign-in' },
  { icon: '📊', label: 'Live analytics' },
  { icon: '🛕', label: '20 role portals' },
  { icon: '✨', label: 'Temple Guide AI' },
] as const;

export default function GuestTrustStrip({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex flex-wrap justify-center gap-3 sm:gap-6 ${className}`}
      role="list"
      aria-label="Platform highlights"
    >
      {TRUST.map((t) => (
        <div
          key={t.label}
          role="listitem"
          className="inline-flex items-center gap-2 rounded-full border border-candy-200 bg-white/80 backdrop-blur px-4 py-2 text-xs sm:text-sm font-semibold text-candy-700 shadow-sm"
        >
          <span aria-hidden>{t.icon}</span>
          <span>{t.label}</span>
        </div>
      ))}
    </div>
  );
}
