import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Accountant — dashboard
 * Route: /accountant/dashboard
 * @see ./features.ts for role responsibilities
 */
export default function Dashboard() {
  return <RolePage role={ROLE_KEY} slug="dashboard" />;
}
