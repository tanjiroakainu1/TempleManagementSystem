import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Maintenance Staff — records
 * Route: /maintenance-staff/records
 * @see ./features.ts for role responsibilities
 */
export default function Records() {
  return <RolePage role={ROLE_KEY} slug="records" />;
}
