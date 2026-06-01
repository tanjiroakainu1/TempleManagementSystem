import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Member — activities
 * Route: /member/activities
 * @see ./features.ts for role responsibilities
 */
export default function Activities() {
  return <RolePage role={ROLE_KEY} slug="activities" />;
}
