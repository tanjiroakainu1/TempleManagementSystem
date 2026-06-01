import RoleProfilePage from '@/roles/_lib/RoleProfilePage';
import { ROLE_KEY } from './features';
import PROFILE from './roleProfileData';

/**
 * Accountant — role profile
 * Route: /accountant/profile
 * @see ./roleProfileData.ts for role information
 */
export default function Profile() {
  return <RoleProfilePage role={ROLE_KEY} profile={PROFILE} />;
}
