import type { RoleKey } from './roles';

export interface RoleCapability {
  /** Display number (1–20) */
  order: number;
  title: string;
  responsibilities: string[];
}

/** Official role scope — aligned with temple management requirements */
export const ROLE_CAPABILITIES: Record<RoleKey, RoleCapability> = {
  super_admin: {
    order: 1,
    title: 'Super Admin',
    responsibilities: [
      'Full system control',
      'Manage all users and permissions',
      'Configure temple settings',
      'View all reports',
    ],
  },
  temple_administrator: {
    order: 2,
    title: 'Temple Administrator',
    responsibilities: [
      'Manage daily temple operations',
      'Approve records and activities',
      'Generate reports',
    ],
  },
  head_priest: {
    order: 3,
    title: 'Head Priest',
    responsibilities: [
      'Manage religious ceremonies',
      'Approve ritual schedules',
      'Supervise priests',
    ],
  },
  priest: {
    order: 4,
    title: 'Priest',
    responsibilities: [
      'Conduct prayers and rituals',
      'Manage worship schedules',
      'Record religious services',
    ],
  },
  temple_secretary: {
    order: 5,
    title: 'Temple Secretary',
    responsibilities: [
      'Maintain temple records',
      'Handle correspondence',
      'Manage announcements',
    ],
  },
  treasurer: {
    order: 6,
    title: 'Treasurer',
    responsibilities: [
      'Manage temple finances',
      'Monitor donations',
      'Generate financial reports',
    ],
  },
  accountant: {
    order: 7,
    title: 'Accountant',
    responsibilities: [
      'Record transactions',
      'Manage budgets',
      'Prepare financial statements',
    ],
  },
  donation_manager: {
    order: 8,
    title: 'Donation Manager',
    responsibilities: [
      'Track donations',
      'Manage donor records',
      'Generate donation reports',
    ],
  },
  event_manager: {
    order: 9,
    title: 'Event Manager',
    responsibilities: [
      'Organize temple events',
      'Manage festivals and celebrations',
    ],
  },
  volunteer_coordinator: {
    order: 10,
    title: 'Volunteer Coordinator',
    responsibilities: [
      'Manage volunteers',
      'Assign volunteer tasks',
      'Track volunteer activities',
    ],
  },
  volunteer: {
    order: 11,
    title: 'Volunteer',
    responsibilities: [
      'Participate in temple activities',
      'Assist during events',
    ],
  },
  member: {
    order: 12,
    title: 'Member',
    responsibilities: [
      'View temple activities',
      'Register for events',
      'Submit requests',
    ],
  },
  devotee: {
    order: 13,
    title: 'Devotee',
    responsibilities: [
      'Book rituals and services',
      'Make donations',
      'View schedules',
    ],
  },
  visitor: {
    order: 14,
    title: 'Visitor',
    responsibilities: [
      'View public information',
      'Register for visits',
    ],
  },
  ritual_coordinator: {
    order: 15,
    title: 'Ritual Coordinator',
    responsibilities: [
      'Schedule rituals',
      'Manage ritual requests',
      'Coordinate priests',
    ],
  },
  education_coordinator: {
    order: 16,
    title: 'Education Coordinator',
    responsibilities: [
      'Manage religious classes',
      'Schedule training programs',
    ],
  },
  teacher_instructor: {
    order: 17,
    title: 'Teacher / Instructor',
    responsibilities: [
      'Conduct religious teachings',
      'Manage student attendance',
      'Assess student progress',
    ],
  },
  inventory_manager: {
    order: 18,
    title: 'Inventory Manager',
    responsibilities: [
      'Manage temple supplies',
      'Track inventory usage',
      'Monitor stock levels',
    ],
  },
  maintenance_staff: {
    order: 19,
    title: 'Maintenance Staff',
    responsibilities: [
      'Perform maintenance tasks',
      'Update maintenance records',
      'Report repair needs',
    ],
  },
  security_guard: {
    order: 20,
    title: 'Security Guard',
    responsibilities: [
      'Maintain safety and security',
      'Monitor entrances and exits',
      'Respond to incidents',
    ],
  },
};

export function getRoleCapabilities(role: RoleKey): RoleCapability {
  return ROLE_CAPABILITIES[role];
}
