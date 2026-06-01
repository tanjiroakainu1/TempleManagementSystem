import RoleProfilePage from '@/roles/_lib/RoleProfilePage';
import { ROLE_KEY } from './features';
import PROFILE from './roleProfileData';

/**
 * Teacher / Instructor — role profile
 * Route: /teacher-instructor/profile
 * @see ./roleProfileData.ts for role information
 */
export default function Profile() {
  return <RoleProfilePage role={ROLE_KEY} profile={PROFILE} />;
}
