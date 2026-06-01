import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Inventory Manager — supplies
 * Route: /inventory-manager/supplies
 * @see ./features.ts for role responsibilities
 */
export default function Supplies() {
  return <RolePage role={ROLE_KEY} slug="supplies" />;
}
