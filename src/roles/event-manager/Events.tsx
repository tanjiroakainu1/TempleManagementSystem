import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Event Manager — events
 * Route: /event-manager/events
 * @see ./features.ts for role responsibilities
 */
export default function Events() {
  return <RolePage role={ROLE_KEY} slug="events" />;
}
