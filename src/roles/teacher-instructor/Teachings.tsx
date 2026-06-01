import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Teacher / Instructor — teachings
 * Route: /teacher-instructor/teachings
 * @see ./features.ts for role responsibilities
 */
export default function Teachings() {
  return <RolePage role={ROLE_KEY} slug="teachings" />;
}
