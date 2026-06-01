import { Link } from 'react-router-dom';
import { useAuth, getRoleFolder } from '@/context/AuthContext';
import type { RoleKey } from '@/config/roles';
import type { RoleFolderProfile } from '@/config/roleProfiles';
import { getNavItems } from '@/config/navigation';
import RolePageShell from '@/components/role/RolePageShell';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import DeveloperCredit from '@/components/layout/DeveloperCredit';

interface Props {
  role: RoleKey;
  profile: RoleFolderProfile;
}

export default function RoleProfilePage({ role, profile }: Props) {
  const { user } = useAuth();
  const folder = getRoleFolder(role);
  const nav = getNavItems(role).filter((n) => !n.shared && n.slug !== 'profile');

  const isCurrentRole = user?.role === role;

  return (
    <RolePageShell title="Role Profile" slug="profile" icon="👤" description={profile.summary}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="lg:col-span-1 border-candy-300/60 overflow-hidden">
          <div className="bg-gradient-to-br from-candy-600 via-candy-700 to-candy-800 px-5 py-8 text-center text-white">
            <span className="text-5xl sm:text-6xl drop-shadow-lg block mb-3">{profile.icon}</span>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-bold">
              Role #{profile.order} of 20
            </p>
            <h2 className="font-display text-xl sm:text-2xl font-bold mt-1">{profile.title}</h2>
            <p className="text-sm text-white/85 mt-2">{profile.department}</p>
            <span className="mt-4 inline-block">
              <Badge status="active" />
            </span>
          </div>
          <CardBody className="space-y-4">
            {isCurrentRole && user && (
              <div className="rounded-xl bg-candy-50 border border-candy-200 p-4">
                <p className="text-[10px] uppercase tracking-wider text-candy-500 font-bold mb-2">
                  Signed in as
                </p>
                <p className="font-bold text-candy-900">{user.full_name}</p>
                <p className="text-sm text-candy-600 truncate">{user.email}</p>
                <p className="text-xs text-candy-500 mt-1">Role ID: {user.id}</p>
              </div>
            )}
            <div>
              <p className="text-xs font-bold text-candy-600 uppercase tracking-wide mb-1">Access level</p>
              <p className="text-sm text-slate-700">{profile.accessLevel}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-candy-600 uppercase tracking-wide mb-1">Portal folder</p>
              <code className="text-xs">/{profile.folder}</code>
            </div>
            <Link
              to={`/${folder}/dashboard`}
              className="block w-full text-center rounded-xl bg-gradient-to-r from-maroon to-candy-600 text-white py-2.5 text-sm font-bold shadow-candy hover:opacity-90 transition min-h-[44px] flex items-center justify-center"
            >
              🏠 Dashboard
            </Link>
          </CardBody>
        </Card>

        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <Card>
            <CardHeader title="About this role" />
            <CardBody>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">{profile.summary}</p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Core responsibilities" />
            <CardBody>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {profile.responsibilities.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 rounded-xl bg-candy-50 border border-candy-100 px-3 py-2.5 text-sm text-candy-900"
                  >
                    <span className="text-maroon shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader title="Portal modules" />
              <CardBody>
                <ul className="space-y-2">
                  {nav.map((item) => (
                    <li key={item.slug}>
                      <Link
                        to={`/${folder}/${item.slug}`}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-candy-800 hover:bg-candy-50 border border-transparent hover:border-candy-200 transition min-h-[44px]"
                      >
                        <span>{item.icon}</span>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardHeader title="Demo persona (seed data)" />
              <CardBody className="space-y-3">
                <div>
                  <p className="text-xs text-candy-500 font-bold uppercase">Sample user</p>
                  <p className="font-semibold text-candy-900">{profile.demoName}</p>
                  <p className="text-sm font-mono text-maroon">{profile.demoEmail}</p>
                </div>
                <div>
                  <p className="text-xs text-candy-500 font-bold uppercase mb-2">Seeded in demo</p>
                  <ul className="space-y-1.5">
                    {profile.seededData.map((line) => (
                      <li
                        key={line}
                        className="text-xs sm:text-sm text-slate-600 rounded-lg bg-slate-50 px-2.5 py-1.5 border border-slate-100"
                      >
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardBody>
            </Card>
          </div>

          <Card className="border-candy-200/80">
            <CardHeader title="Quick reference" />
            <CardBody>
              <div className="table-scroll">
                <table className="w-full text-xs sm:text-sm">
                  <tbody>
                    <tr className="border-b border-candy-50">
                      <td className="py-2 pr-4 font-semibold text-candy-700">Role key</td>
                      <td className="py-2 font-mono">{profile.roleKey}</td>
                    </tr>
                    <tr className="border-b border-candy-50">
                      <td className="py-2 pr-4 font-semibold text-candy-700">Route prefix</td>
                      <td className="py-2 font-mono">/{profile.folder}/profile</td>
                    </tr>
                    <tr className="border-b border-candy-50">
                      <td className="py-2 pr-4 font-semibold text-candy-700">Modules</td>
                      <td className="py-2">{profile.portalModules.join(' · ')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>

          <DeveloperCredit variant="banner" />
        </div>
      </div>
    </RolePageShell>
  );
}
