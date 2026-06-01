import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Education Coordinator — programs
 * Route: /education-coordinator/programs
 * @see ./features.ts for role responsibilities
 */
export default function Programs() {
  return <RolePage role={ROLE_KEY} slug="programs" />;
}
