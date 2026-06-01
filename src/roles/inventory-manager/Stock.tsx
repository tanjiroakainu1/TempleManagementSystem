import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Inventory Manager — stock
 * Route: /inventory-manager/stock
 * @see ./features.ts for role responsibilities
 */
export default function Stock() {
  return <RolePage role={ROLE_KEY} slug="stock" />;
}
