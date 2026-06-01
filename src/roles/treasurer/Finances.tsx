import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Treasurer — finances
 * Route: /treasurer/finances
 * @see ./features.ts for role responsibilities
 */
export default function Finances() {
  return <RolePage role={ROLE_KEY} slug="finances" />;
}
