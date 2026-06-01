import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Temple Administrator — dashboard
 * Route: /temple-administrator/dashboard
 * @see ./features.ts for role responsibilities
 */
export default function Dashboard() {
  return <RolePage role={ROLE_KEY} slug="dashboard" />;
}
