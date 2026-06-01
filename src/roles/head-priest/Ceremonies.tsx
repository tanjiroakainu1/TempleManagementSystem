import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Head Priest — ceremonies
 * Route: /head-priest/ceremonies
 * @see ./features.ts for role responsibilities
 */
export default function Ceremonies() {
  return <RolePage role={ROLE_KEY} slug="ceremonies" />;
}
