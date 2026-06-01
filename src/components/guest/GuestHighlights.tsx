const ITEMS = [
  {
    icon: '📿',
    title: 'Rituals & worship',
    desc: 'Book, schedule, and approve sacred services',
    className: 'from-candy-700/90 to-candy-900',
  },
  {
    icon: '🎁',
    title: 'Donations',
    desc: 'Offerings, donors, and treasurer-ready reports',
    className: 'from-zinc-600 to-candy-800',
  },
  {
    icon: '🎉',
    title: 'Events & festivals',
    desc: 'Registrations, volunteers, and calendars',
    className: 'from-candy-600 to-zinc-700',
  },
  {
    icon: '🛕',
    title: 'One temple',
    desc: 'Twenty role portals, one ash-gray experience',
    className: 'from-zinc-700 to-candy-900',
  },
] as const;

export default function GuestHighlights() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {ITEMS.map((item) => (
        <div
          key={item.title}
          className={`guest-highlight-card group relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.className} p-5 text-white shadow-candy-lg border border-white/10`}
        >
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 blur-2xl group-hover:scale-125 transition-transform duration-500" />
          <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-2xl border border-white/20 backdrop-blur">
            {item.icon}
          </span>
          <h3 className="relative font-display font-bold text-lg mt-4">{item.title}</h3>
          <p className="relative text-sm text-white/80 mt-1.5 leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}
