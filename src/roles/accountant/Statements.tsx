import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Accountant — statements
 * Route: /accountant/statements
 * @see ./features.ts for role responsibilities
 */
export default function Statements() {
  return <RolePage role={ROLE_KEY} slug="statements" />;
}
