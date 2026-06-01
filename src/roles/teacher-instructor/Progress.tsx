import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Teacher / Instructor — progress
 * Route: /teacher-instructor/progress
 * @see ./features.ts for role responsibilities
 */
export default function Progress() {
  return <RolePage role={ROLE_KEY} slug="progress" />;
}
