import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Donation Manager — donations
 * Route: /donation-manager/donations
 * @see ./features.ts for role responsibilities
 */
export default function Donations() {
  return <RolePage role={ROLE_KEY} slug="donations" />;
}
