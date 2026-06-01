import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Treasurer — reports
 * Route: /treasurer/reports
 * @see ./features.ts for role responsibilities
 */
export default function Reports() {
  return <RolePage role={ROLE_KEY} slug="reports" />;
}
