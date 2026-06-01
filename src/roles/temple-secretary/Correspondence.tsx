import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Temple Secretary — correspondence
 * Route: /temple-secretary/correspondence
 * @see ./features.ts for role responsibilities
 */
export default function Correspondence() {
  return <RolePage role={ROLE_KEY} slug="correspondence" />;
}
