import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Education Coordinator — classes
 * Route: /education-coordinator/classes
 * @see ./features.ts for role responsibilities
 */
export default function Classes() {
  return <RolePage role={ROLE_KEY} slug="classes" />;
}
