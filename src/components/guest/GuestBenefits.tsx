const BENEFITS = [
  { icon: '📿', title: 'Rituals & worship', desc: 'Book services and follow schedules' },
  { icon: '🎁', title: 'Donations', desc: 'Track offerings with full history' },
  { icon: '🎉', title: 'Events', desc: 'Register for festivals and programs' },
  { icon: '🤝', title: 'Community', desc: 'Volunteer, member, and visitor portals' },
];

export default function GuestBenefits({ title = 'What you get' }: { title?: string }) {
  return (
    <div className="rounded-2xl border border-candy-200 bg-gradient-to-br from-candy-50 to-white p-6 sm:p-8 h-full">
      <h2 className="font-display text-lg sm:text-xl font-bold text-candy-900">{title}</h2>
      <p className="text-sm text-candy-600 mt-1 mb-6">
        One account connects you to temple operations stored safely in your browser demo.
      </p>
      <ul className="space-y-4">
        {BENEFITS.map((b) => (
          <li key={b.title} className="flex gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-candy-100 text-lg border border-candy-200">
              {b.icon}
            </span>
            <div>
              <p className="font-bold text-candy-900 text-sm">{b.title}</p>
              <p className="text-xs text-candy-600 mt-0.5">{b.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
