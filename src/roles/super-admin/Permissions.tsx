import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Super Admin — permissions
 * Route: /super-admin/permissions
 * @see ./features.ts for role responsibilities
 */
export default function Permissions() {
  return <RolePage role={ROLE_KEY} slug="permissions" />;
}
