import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Security Guard — visitors
 * Route: /security-guard/visitors
 * @see ./features.ts for role responsibilities
 */
export default function Visitors() {
  return <RolePage role={ROLE_KEY} slug="visitors" />;
}
