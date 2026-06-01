import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Temple Administrator — staff
 * Route: /temple-administrator/staff
 * @see ./features.ts for role responsibilities
 */
export default function Staff() {
  return <RolePage role={ROLE_KEY} slug="staff" />;
}
