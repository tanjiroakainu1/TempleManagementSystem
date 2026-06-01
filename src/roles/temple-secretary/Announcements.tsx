import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Temple Secretary — announcements
 * Route: /temple-secretary/announcements
 * @see ./features.ts for role responsibilities
 */
export default function Announcements() {
  return <RolePage role={ROLE_KEY} slug="announcements" />;
}
