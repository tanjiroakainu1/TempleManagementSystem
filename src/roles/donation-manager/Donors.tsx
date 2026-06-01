import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Donation Manager — donors
 * Route: /donation-manager/donors
 * @see ./features.ts for role responsibilities
 */
export default function Donors() {
  return <RolePage role={ROLE_KEY} slug="donors" />;
}
