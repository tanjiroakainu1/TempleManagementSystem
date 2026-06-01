import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Head Priest — priests
 * Route: /head-priest/priests
 * @see ./features.ts for role responsibilities
 */
export default function Priests() {
  return <RolePage role={ROLE_KEY} slug="priests" />;
}
