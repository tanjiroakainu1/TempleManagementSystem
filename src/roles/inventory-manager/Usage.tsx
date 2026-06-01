import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Inventory Manager — usage
 * Route: /inventory-manager/usage
 * @see ./features.ts for role responsibilities
 */
export default function Usage() {
  return <RolePage role={ROLE_KEY} slug="usage" />;
}
