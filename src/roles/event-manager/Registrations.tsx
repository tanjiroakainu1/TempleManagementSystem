import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Event Manager — registrations
 * Route: /event-manager/registrations
 * @see ./features.ts for role responsibilities
 */
export default function Registrations() {
  return <RolePage role={ROLE_KEY} slug="registrations" />;
}
