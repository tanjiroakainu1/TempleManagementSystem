import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Teacher / Instructor — attendance
 * Route: /teacher-instructor/attendance
 * @see ./features.ts for role responsibilities
 */
export default function Attendance() {
  return <RolePage role={ROLE_KEY} slug="attendance" />;
}
