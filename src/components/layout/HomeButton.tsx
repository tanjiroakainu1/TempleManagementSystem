import type { LinkProps } from 'react-router-dom';
import { UI_LABELS } from '@/config/uiLabels';
import { HeaderActionLink } from '@/components/layout/HeaderActionButton';

interface HomeButtonProps {
  to: string;
  label?: string;
  className?: string;
  onClick?: LinkProps['onClick'];
}

/** Compact Home control — matches app header action style */
export default function HomeButton({
  to,
  label = UI_LABELS.headerHome,
  className = '',
  onClick,
}: HomeButtonProps) {
  return (
    <HeaderActionLink
      to={to}
      onClick={onClick}
      variant="outline-dark"
      label={label}
      icon="🏠"
      shortLabel={label}
      className={className}
    />
  );
}
