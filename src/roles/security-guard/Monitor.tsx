import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Security Guard — monitor
 * Route: /security-guard/monitor
 * @see ./features.ts for role responsibilities
 */
export default function Monitor() {
  return <RolePage role={ROLE_KEY} slug="monitor" />;
}
