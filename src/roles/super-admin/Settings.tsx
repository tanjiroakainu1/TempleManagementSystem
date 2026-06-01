import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Super Admin — settings
 * Route: /super-admin/settings
 * @see ./features.ts for role responsibilities
 */
export default function Settings() {
  return <RolePage role={ROLE_KEY} slug="settings" />;
}
