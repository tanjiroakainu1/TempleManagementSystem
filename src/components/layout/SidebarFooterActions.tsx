import { UI_LABELS } from '@/config/uiLabels';
import { HeaderActionButton, HeaderActionLink } from '@/components/layout/HeaderActionButton';

interface Props {
  folder: string;
  onSwitchRole: () => void;
}

/** Extra links in sidebar / mobile drawer (Logout lives in the top bar) */
export default function SidebarFooterActions({ folder, onSwitchRole }: Props) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <HeaderActionLink
        to={`/${folder}/profile`}
        variant="outline-light"
        label={UI_LABELS.headerProfile}
        icon="👤"
        className="w-full"
      />
      <HeaderActionLink
        to="/"
        variant="outline-light"
        label={UI_LABELS.headerPublicSite}
        icon="🌐"
        className="w-full"
      />
      <HeaderActionButton
        variant="outline-light"
        label={UI_LABELS.headerSwitchRole}
        icon="🔄"
        onClick={onSwitchRole}
        className="w-full"
      />
    </div>
  );
}
