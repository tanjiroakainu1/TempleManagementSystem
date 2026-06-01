import { Link } from 'react-router-dom';
import { UI_LABELS } from '@/config/uiLabels';
import { APP_PRIVACY } from '@/config/privacy';
import { HeaderActionButton, HeaderActionLink } from '@/components/layout/HeaderActionButton';

interface Props {
  folder: string;
  roleIcon: string;
  roleLabel: string;
  userName: string;
  initials: string;
  onLogout: () => void;
  onSwitchRole: () => void;
  /** Sidebar / drawer — full-width stacked buttons */
  layout?: 'bar' | 'stack';
}

export default function AppHeaderActions({
  folder,
  roleIcon,
  roleLabel,
  userName,
  initials,
  onLogout,
  onSwitchRole,
  layout = 'bar',
}: Props) {
  const isStack = layout === 'stack';

  const roleBadge = (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-candy-mint/80 border border-emerald-300/50 font-bold text-emerald-900 shrink-0 ${
        isStack
          ? 'w-full justify-center px-3 py-2 text-xs'
          : 'px-2 sm:px-3 py-1.5 text-[10px] sm:text-xs max-w-[88px] xs:max-w-[140px] sm:max-w-none truncate'
      }`}
      title={roleLabel}
    >
      <span aria-hidden>{roleIcon}</span>
      <span className={isStack ? '' : 'truncate'}>{roleLabel}</span>
    </span>
  );

  const profileLink = (
    <Link
      to={`/${folder}/profile`}
      className={`inline-flex items-center gap-2 rounded-lg border border-candy-200 bg-white hover:bg-candy-50 shrink-0 touch-manipulation transition ${
        isStack
          ? 'w-full justify-center px-3 py-2.5 min-h-[44px]'
          : 'pl-1 pr-2 sm:pr-2.5 py-1 min-h-[44px] sm:min-h-[40px]'
      }`}
      aria-label={`${UI_LABELS.headerProfile}: ${userName}`}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-candy-500 to-maroon text-xs font-bold text-white shrink-0">
        {initials}
      </span>
      <span
        className={`text-xs font-semibold text-candy-900 truncate ${
          isStack ? 'max-w-[200px]' : 'max-w-[72px] sm:max-w-[120px] hidden xs:inline'
        }`}
      >
        {userName}
      </span>
      {isStack && (
        <span className="text-xs font-bold text-candy-600 sm:hidden">{UI_LABELS.headerProfile}</span>
      )}
    </Link>
  );

  const actions = (
    <>
      {roleBadge}

      {!isStack && APP_PRIVACY.showSharedActivityNav && (
        <HeaderActionLink
          to="/shared/activity-log"
          variant="outline-light"
          label={UI_LABELS.headerAlerts}
          icon="🔔"
          className="hidden sm:inline-flex"
        />
      )}

      {!isStack && profileLink}
      {isStack && profileLink}

      <HeaderActionLink
        to="/"
        variant={isStack ? 'outline-light' : 'outline-dark'}
        label={UI_LABELS.headerPublicSite}
        icon="🌐"
        shortLabel="Site"
        className={isStack ? 'w-full' : 'hidden md:inline-flex'}
      />

      <HeaderActionButton
        variant="outline-light"
        label={UI_LABELS.headerSwitchRole}
        shortLabel={UI_LABELS.headerSwitchRoleShort}
        icon="🔄"
        onClick={onSwitchRole}
        className={isStack ? 'w-full' : ''}
      />

      <HeaderActionButton
        variant="logout"
        label={UI_LABELS.headerLogout}
        icon="🚪"
        onClick={onLogout}
        className={isStack ? 'w-full' : ''}
      />
    </>
  );

  if (isStack) {
    return <div className="flex flex-col gap-2 w-full">{actions}</div>;
  }

  return (
    <div className="app-header-actions flex items-center gap-1.5 sm:gap-2 ml-auto shrink-0 min-w-0 max-w-[min(100%,calc(100vw-7rem))] sm:max-w-none overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {actions}
    </div>
  );
}
