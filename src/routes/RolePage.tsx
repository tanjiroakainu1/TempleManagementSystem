import { useParams, useLocation, Navigate } from 'react-router-dom';
import { getRoleByFolder } from '@/config/roles';
import { useAuth, getRoleFolder } from '@/context/AuthContext';
import { resolveRolePage } from '@/roles/registry';

/** First path segment is role folder, e.g. /super-admin/dashboard → super-admin */
function roleFolderFromPath(pathname: string): string {
  return pathname.split('/').filter(Boolean)[0] ?? '';
}

export default function RolePage() {
  const { pageSlug } = useParams<{ pageSlug: string }>();
  const { pathname } = useLocation();
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  const roleFolder = roleFolderFromPath(pathname);
  const slug = pageSlug || 'dashboard';
  const roleKey = getRoleByFolder(roleFolder);
  const userFolder = getRoleFolder(user.role);

  if (!roleKey || userFolder !== roleFolder) {
    return <Navigate to={`/${userFolder}/${slug}`} replace />;
  }

  const Page = resolveRolePage(roleKey, slug);

  if (!Page) {
    return <Navigate to={`/${userFolder}/dashboard`} replace />;
  }

  return <Page />;
}
