import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Super Admin — approvals
 * Route: /super-admin/approvals
 * @see ./features.ts for role responsibilities
 */
export default function Approvals() {
  return <RolePage role={ROLE_KEY} slug="approvals" />;
}
