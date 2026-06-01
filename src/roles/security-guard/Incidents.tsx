import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Security Guard — incidents
 * Route: /security-guard/incidents
 * @see ./features.ts for role responsibilities
 */
export default function Incidents() {
  return <RolePage role={ROLE_KEY} slug="incidents" />;
}
