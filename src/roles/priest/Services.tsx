import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Priest — services
 * Route: /priest/services
 * @see ./features.ts for role responsibilities
 */
export default function Services() {
  return <RolePage role={ROLE_KEY} slug="services" />;
}
