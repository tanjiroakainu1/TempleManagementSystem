import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Ritual Coordinator — priests
 * Route: /ritual-coordinator/priests
 * @see ./features.ts for role responsibilities
 */
export default function Priests() {
  return <RolePage role={ROLE_KEY} slug="priests" />;
}
