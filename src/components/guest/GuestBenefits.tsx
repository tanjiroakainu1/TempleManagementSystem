import { Link } from 'react-router-dom';
import { UI_LABELS } from '@/config/uiLabels';

const BENEFITS = [
  { icon: '📿', title: 'Rituals & worship', desc: 'Book services and follow schedules' },
  { icon: '🎁', title: 'Donations', desc: 'Track offerings with full history' },
  { icon: '🎉', title: 'Events', desc: 'Register for festivals and programs' },
  { icon: '🤝', title: 'Community', desc: 'Volunteer, member, and visitor portals' },
] as const;

interface Props {
  title?: string;
  showCta?: boolean;
}

export default function GuestBenefits({ title = 'What you get', showCta = true }: Props) {
  return (
    <div className="relative rounded-2xl border border-candy-200 bg-gradient-to-br from-candy-50 via-white to-candy-50/80 p-6 sm:p-8 h-full overflow-hidden shadow-candy">
      <div className="absolute top-0 right-0 w-32 h-32 bg-candy-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <h2 className="relative font-display text-lg sm:text-xl font-bold text-candy-900">{title}</h2>
      <p className="relative text-sm text-candy-600 mt-1 mb-6 leading-relaxed">{UI_LABELS.guestBenefitsLead}</p>
      <ul className="relative space-y-3">
        {BENEFITS.map((b, i) => (
          <li
            key={b.title}
            className="flex gap-3 rounded-xl border border-candy-100 bg-white/80 p-3 hover:border-candy-200 hover:shadow-sm transition"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-candy-100 to-candy-200 text-lg border border-candy-200 font-bold text-candy-600 text-xs">
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="font-bold text-candy-900 text-sm flex items-center gap-1.5">
                <span>{b.icon}</span> {b.title}
              </p>
              <p className="text-xs text-candy-600 mt-0.5">{b.desc}</p>
            </div>
          </li>
        ))}
      </ul>
      {showCta && (
        <Link
          to="/login"
          className="relative mt-6 flex w-full items-center justify-center rounded-xl border-2 border-candy-300 text-candy-800 py-3 text-sm font-bold hover:bg-candy-50 transition"
        >
          Already have an account? Sign in
        </Link>
      )}
    </div>
  );
}
