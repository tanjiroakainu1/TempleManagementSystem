import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Volunteer — tasks
 * Route: /volunteer/tasks
 * @see ./features.ts for role responsibilities
 */
export default function Tasks() {
  return <RolePage role={ROLE_KEY} slug="tasks" />;
}
