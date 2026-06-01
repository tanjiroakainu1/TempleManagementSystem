import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Priest — rituals
 * Route: /priest/rituals
 * @see ./features.ts for role responsibilities
 */
export default function Rituals() {
  return <RolePage role={ROLE_KEY} slug="rituals" />;
}
