import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Head Priest — ritual-approval
 * Route: /head-priest/ritual-approval
 * @see ./features.ts for role responsibilities
 */
export default function RitualApproval() {
  return <RolePage role={ROLE_KEY} slug="ritual-approval" />;
}
