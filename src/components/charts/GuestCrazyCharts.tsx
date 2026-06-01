import { useDataVersion } from '@/context/DataContext';
import CrazyChartsBlock from './CrazyChartsBlock';

interface Props {
  variant?: 'guest' | 'strip';
  className?: string;
}

/** Public preview charts on landing, login, register */
export default function GuestCrazyCharts({ variant = 'guest', className }: Props) {
  const version = useDataVersion();
  return (
    <CrazyChartsBlock
      version={version}
      variant={variant}
      className={className}
      showHeader
    />
  );
}
