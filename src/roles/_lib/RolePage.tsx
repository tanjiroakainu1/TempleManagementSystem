import type { RoleKey } from '@/config/roles';
import RolePageRenderer from './RolePageRenderer';

interface RolePageProps {
  role: RoleKey;
  slug: string;
}

/** Renders a role-specific page by role key + URL slug */
export default function RolePage({ role, slug }: RolePageProps) {
  return <RolePageRenderer role={role} slug={slug} />;
}
