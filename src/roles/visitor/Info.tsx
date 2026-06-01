import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Visitor — info
 * Route: /visitor/info
 * @see ./features.ts for role responsibilities
 */
export default function Info() {
  return <RolePage role={ROLE_KEY} slug="info" />;
}
