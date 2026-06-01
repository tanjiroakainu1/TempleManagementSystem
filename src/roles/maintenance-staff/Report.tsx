import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Maintenance Staff — report
 * Route: /maintenance-staff/report
 * @see ./features.ts for role responsibilities
 */
export default function Report() {
  return <RolePage role={ROLE_KEY} slug="report" />;
}
