import { Link } from 'react-router-dom';
import { UI_LABELS } from '@/config/uiLabels';
import { HeaderActionButton } from '@/components/layout/HeaderActionButton';

interface Props {
  folder: string;
  roleIcon: string;
  roleLabel: string;
  userName: string;
  onLogout: () => void;
}

/** Top bar: signed-in role title + Logout only */
export default function AppTopBar({ folder, roleIcon, roleLabel, userName, onLogout }: Props) {
  return (
    <div className="flex items-center gap-3 min-w-0 flex-1">
      <Link
        to={`/${folder}/profile`}
        className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 rounded-lg hover:bg-white/10 transition px-1 py-1 -mx-1"
        aria-label={`${roleLabel} — ${userName}`}
      >
        <span
          className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 border border-white/25 text-lg sm:text-xl"
          aria-hidden
        >
          {roleIcon}
        </span>
        <div className="min-w-0 text-left">
          <p className="font-display font-bold text-sm sm:text-base text-white leading-tight truncate">
            {roleLabel}
          </p>
          <p className="text-[11px] sm:text-xs text-white/70 truncate mt-0.5">{userName}</p>
        </div>
      </Link>

      <HeaderActionButton
        variant="logout"
        label={UI_LABELS.headerLogout}
        onClick={onLogout}
        className="shrink-0"
      />
    </div>
  );
}
