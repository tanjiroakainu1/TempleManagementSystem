import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * Event Manager — festivals
 * Route: /event-manager/festivals
 * @see ./features.ts for role responsibilities
 */
export default function Festivals() {
  return <RolePage role={ROLE_KEY} slug="festivals" />;
}
