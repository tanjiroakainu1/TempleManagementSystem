export type RoleKey =
  | 'super_admin'
  | 'temple_administrator'
  | 'head_priest'
  | 'priest'
  | 'temple_secretary'
  | 'treasurer'
  | 'accountant'
  | 'donation_manager'
  | 'event_manager'
  | 'volunteer_coordinator'
  | 'volunteer'
  | 'member'
  | 'devotee'
  | 'visitor'
  | 'ritual_coordinator'
  | 'education_coordinator'
  | 'teacher_instructor'
  | 'inventory_manager'
  | 'maintenance_staff'
  | 'security_guard';

export interface RoleInfo {
  label: string;
  folder: string;
  icon: string;
}

export const ROLES: Record<RoleKey, RoleInfo> = {
  super_admin: { label: 'Super Admin', folder: 'super-admin', icon: '👑' },
  temple_administrator: { label: 'Temple Administrator', folder: 'temple-administrator', icon: '🏛️' },
  head_priest: { label: 'Head Priest', folder: 'head-priest', icon: '🕉️' },
  priest: { label: 'Priest', folder: 'priest', icon: '🙏' },
  temple_secretary: { label: 'Temple Secretary', folder: 'temple-secretary', icon: '📋' },
  treasurer: { label: 'Treasurer', folder: 'treasurer', icon: '💰' },
  accountant: { label: 'Accountant', folder: 'accountant', icon: '📊' },
  donation_manager: { label: 'Donation Manager', folder: 'donation-manager', icon: '🎁' },
  event_manager: { label: 'Event Manager', folder: 'event-manager', icon: '🎉' },
  volunteer_coordinator: { label: 'Volunteer Coordinator', folder: 'volunteer-coordinator', icon: '🤝' },
  volunteer: { label: 'Volunteer', folder: 'volunteer', icon: '💪' },
  member: { label: 'Member', folder: 'member', icon: '👤' },
  devotee: { label: 'Devotee', folder: 'devotee', icon: '🪔' },
  visitor: { label: 'Visitor', folder: 'visitor', icon: '🚶' },
  ritual_coordinator: { label: 'Ritual Coordinator', folder: 'ritual-coordinator', icon: '📿' },
  education_coordinator: { label: 'Education Coordinator', folder: 'education-coordinator', icon: '📚' },
  teacher_instructor: { label: 'Teacher / Instructor', folder: 'teacher-instructor', icon: '✏️' },
  inventory_manager: { label: 'Inventory Manager', folder: 'inventory-manager', icon: '📦' },
  maintenance_staff: { label: 'Maintenance Staff', folder: 'maintenance-staff', icon: '🔧' },
  security_guard: { label: 'Security Guard', folder: 'security-guard', icon: '🛡️' },
};

export function getRoleByFolder(folder: string): RoleKey | undefined {
  return (Object.entries(ROLES).find(([, r]) => r.folder === folder)?.[0] as RoleKey) || undefined;
}

export function getRoleLabel(role: string): string {
  return ROLES[role as RoleKey]?.label ?? role.replace(/_/g, ' ');
}
