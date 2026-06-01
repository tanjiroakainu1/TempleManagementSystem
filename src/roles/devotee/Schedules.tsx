import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Devotee — schedules
 * Route: /devotee/schedules
 * @see ./features.ts for role responsibilities
 */
export default function Schedules() {
  return <RolePage role={ROLE_KEY} slug="schedules" />;
}
