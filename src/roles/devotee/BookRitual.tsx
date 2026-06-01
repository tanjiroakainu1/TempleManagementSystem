import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Devotee — book-ritual
 * Route: /devotee/book-ritual
 * @see ./features.ts for role responsibilities
 */
export default function BookRitual() {
  return <RolePage role={ROLE_KEY} slug="book-ritual" />;
}
