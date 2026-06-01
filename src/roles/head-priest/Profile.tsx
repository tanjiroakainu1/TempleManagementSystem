import RoleProfilePage from '@/roles/_lib/RoleProfilePage';
import { ROLE_KEY } from './features';
import PROFILE from './roleProfileData';

/**
 * Head Priest — role profile
 * Route: /head-priest/profile
 * @see ./roleProfileData.ts for role information
 */
export default function Profile() {
  return <RoleProfilePage role={ROLE_KEY} profile={PROFILE} />;
}
