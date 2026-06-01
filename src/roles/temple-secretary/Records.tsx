import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Temple Secretary — records
 * Route: /temple-secretary/records
 * @see ./features.ts for role responsibilities
 */
export default function Records() {
  return <RolePage role={ROLE_KEY} slug="records" />;
}
