import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Volunteer Coordinator — activities
 * Route: /volunteer-coordinator/activities
 * @see ./features.ts for role responsibilities
 */
export default function Activities() {
  return <RolePage role={ROLE_KEY} slug="activities" />;
}
