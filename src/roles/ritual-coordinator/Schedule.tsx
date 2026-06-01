import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Ritual Coordinator — schedule
 * Route: /ritual-coordinator/schedule
 * @see ./features.ts for role responsibilities
 */
export default function Schedule() {
  return <RolePage role={ROLE_KEY} slug="schedule" />;
}
