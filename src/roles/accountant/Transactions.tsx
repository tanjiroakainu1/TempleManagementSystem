import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Accountant — transactions
 * Route: /accountant/transactions
 * @see ./features.ts for role responsibilities
 */
export default function Transactions() {
  return <RolePage role={ROLE_KEY} slug="transactions" />;
}
