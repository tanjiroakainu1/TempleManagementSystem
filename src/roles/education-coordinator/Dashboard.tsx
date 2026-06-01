import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Education Coordinator — dashboard
 * Route: /education-coordinator/dashboard
 * @see ./features.ts for role responsibilities
 */
export default function Dashboard() {
  return <RolePage role={ROLE_KEY} slug="dashboard" />;
}
