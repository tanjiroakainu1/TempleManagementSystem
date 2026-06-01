import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Super Admin — system-control
 * Route: /super-admin/system-control
 * @see ./features.ts for role responsibilities
 */
export default function SystemControl() {
  return <RolePage role={ROLE_KEY} slug="system-control" />;
}
