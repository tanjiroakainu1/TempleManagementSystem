import { Link } from 'react-router-dom';
import { ROLES, type RoleKey } from '@/config/roles';

const GROUPS: { title: string; desc: string; roles: RoleKey[] }[] = [
  {
    title: 'Leadership',
    desc: 'Oversight & system control',
    roles: ['super_admin', 'temple_administrator'],
  },
  {
    title: 'Spiritual',
    desc: 'Rituals, worship & ceremonies',
    roles: ['head_priest', 'priest', 'ritual_coordinator'],
  },
  {
    title: 'Administration',
    desc: 'Records, finance & donations',
    roles: ['temple_secretary', 'treasurer', 'accountant', 'donation_manager'],
  },
  {
    title: 'Operations',
    desc: 'Events, inventory & security',
    roles: [
      'event_manager',
      'volunteer_coordinator',
      'inventory_manager',
      'maintenance_staff',
      'security_guard',
      'education_coordinator',
      'teacher_instructor',
    ],
  },
  {
    title: 'Community',
    desc: 'Members, devotees & visitors',
    roles: ['member', 'devotee', 'visitor', 'volunteer'],
  },
];

export default function GuestRoleGrid() {
  return (
    <div className="space-y-8">
      {GROUPS.map((group) => (
        <div key={group.title}>
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
            <h3 className="font-display font-bold text-lg text-white">{group.title}</h3>
            <p className="text-xs text-white/60">{group.desc}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {group.roles.map((key) => {
              const r = ROLES[key];
              return (
                <span
                  key={key}
                  className="guest-role-chip inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-2 text-xs sm:text-sm font-medium text-white hover:bg-white/20 hover:border-white/35 transition cursor-default"
                  title={r.label}
                >
                  <span>{r.icon}</span>
                  <span>{r.label}</span>
                </span>
              );
            })}
          </div>
        </div>
      ))}
      <div className="text-center pt-2">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 rounded-xl bg-white text-candy-800 px-8 py-3.5 font-bold shadow-candy-lg hover:bg-candy-50 transition min-h-[48px]"
        >
          Try any role with Quick Access →
        </Link>
      </div>
    </div>
  );
}
