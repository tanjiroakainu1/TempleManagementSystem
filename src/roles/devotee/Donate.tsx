import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Devotee — donate
 * Route: /devotee/donate
 * @see ./features.ts for role responsibilities
 */
export default function Donate() {
  return <RolePage role={ROLE_KEY} slug="donate" />;
}
