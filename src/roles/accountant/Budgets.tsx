import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Accountant — budgets
 * Route: /accountant/budgets
 * @see ./features.ts for role responsibilities
 */
export default function Budgets() {
  return <RolePage role={ROLE_KEY} slug="budgets" />;
}
