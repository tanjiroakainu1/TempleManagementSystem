import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Ritual Coordinator — requests
 * Route: /ritual-coordinator/requests
 * @see ./features.ts for role responsibilities
 */
export default function Requests() {
  return <RolePage role={ROLE_KEY} slug="requests" />;
}
