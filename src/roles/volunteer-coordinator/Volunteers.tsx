import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Volunteer Coordinator — volunteers
 * Route: /volunteer-coordinator/volunteers
 * @see ./features.ts for role responsibilities
 */
export default function Volunteers() {
  return <RolePage role={ROLE_KEY} slug="volunteers" />;
}
