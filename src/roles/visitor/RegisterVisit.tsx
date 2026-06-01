import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Visitor — register-visit
 * Route: /visitor/register-visit
 * @see ./features.ts for role responsibilities
 */
export default function RegisterVisit() {
  return <RolePage role={ROLE_KEY} slug="register-visit" />;
}
