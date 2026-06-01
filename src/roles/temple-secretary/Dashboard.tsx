import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Temple Secretary — dashboard
 * Route: /temple-secretary/dashboard
 * @see ./features.ts for role responsibilities
 */
export default function Dashboard() {
  return <RolePage role={ROLE_KEY} slug="dashboard" />;
}
