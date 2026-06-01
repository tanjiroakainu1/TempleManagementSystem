import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Temple Administrator — operations
 * Route: /temple-administrator/operations
 * @see ./features.ts for role responsibilities
 */
export default function Operations() {
  return <RolePage role={ROLE_KEY} slug="operations" />;
}
