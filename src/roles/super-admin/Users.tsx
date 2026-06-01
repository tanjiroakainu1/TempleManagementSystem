import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Super Admin — users
 * Route: /super-admin/users
 * @see ./features.ts for role responsibilities
 */
export default function Users() {
  return <RolePage role={ROLE_KEY} slug="users" />;
}
