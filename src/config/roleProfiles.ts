import type { RoleKey } from './roles';
import { ROLES } from './roles';
import { ROLE_CAPABILITIES } from './roleCapabilities';
import { getDemoAccount } from './demoAccounts';

export interface RoleFolderProfile {
  roleKey: RoleKey;
  title: string;
  icon: string;
  folder: string;
  order: number;
  department: string;
  accessLevel: string;
  summary: string;
  responsibilities: readonly string[];
  demoName: string;
  demoEmail: string;
  seededData: readonly string[];
  portalModules: string[];
}

const DEPARTMENTS: Record<RoleKey, string> = {
  super_admin: 'Temple Leadership · IT & Governance',
  temple_administrator: 'Temple Administration',
  head_priest: 'Religious Affairs · Priesthood',
  priest: 'Religious Affairs · Worship',
  temple_secretary: 'Administration · Records',
  treasurer: 'Finance · Treasury',
  accountant: 'Finance · Accounting',
  donation_manager: 'Finance · Donations',
  event_manager: 'Programs · Events & Festivals',
  volunteer_coordinator: 'Community · Volunteers',
  volunteer: 'Community · Service',
  member: 'Community · Membership',
  devotee: 'Community · Devotee Services',
  visitor: 'Community · Guest Services',
  ritual_coordinator: 'Religious Affairs · Rituals',
  education_coordinator: 'Education · Religious Programs',
  teacher_instructor: 'Education · Instruction',
  inventory_manager: 'Operations · Inventory',
  maintenance_staff: 'Operations · Facilities',
  security_guard: 'Operations · Security',
};

const ACCESS: Record<RoleKey, string> = {
  super_admin: 'Full system access',
  temple_administrator: 'Administrative · approvals & operations',
  head_priest: 'Religious leadership · ritual approval',
  priest: 'Worship & ritual execution',
  temple_secretary: 'Records & communications',
  treasurer: 'Financial management',
  accountant: 'Ledger & budgets',
  donation_manager: 'Donations & donors',
  event_manager: 'Events & festivals',
  volunteer_coordinator: 'Volunteer management',
  volunteer: 'Tasks & event assistance',
  member: 'Member portal',
  devotee: 'Devotee self-service',
  visitor: 'Public & visit registration',
  ritual_coordinator: 'Ritual scheduling',
  education_coordinator: 'Classes & programs',
  teacher_instructor: 'Teaching & attendance',
  inventory_manager: 'Supplies & stock',
  maintenance_staff: 'Maintenance workflows',
  security_guard: 'Safety & visitor log',
};

const SUMMARIES: Record<RoleKey, string> = {
  super_admin:
    'Supreme oversight of the Temple Management System — users, permissions, settings, reports, and approvals across all 20 roles.',
  temple_administrator:
    'Runs daily temple operations, staff coordination, operational approvals, and administrative reporting.',
  head_priest:
    'Leads religious ceremonies, approves ritual schedules, and supervises the priesthood.',
  priest:
    'Conducts worship, records services, and performs assigned rituals on the temple schedule.',
  temple_secretary:
    'Maintains official records, handles correspondence, and publishes temple announcements.',
  treasurer:
    'Oversees temple finances, donation flows, budgets, and financial reporting.',
  accountant:
    'Records transactions, manages budgets, and prepares financial statements.',
  donation_manager:
    'Tracks all donations, manages donor relationships, and produces giving reports.',
  event_manager:
    'Plans temple events, festivals, and manages attendee registrations.',
  volunteer_coordinator:
    'Recruits volunteers, assigns tasks, and tracks community service activities.',
  volunteer:
    'Serves the temple through assigned tasks, activities, and event support.',
  member:
    'Registered temple member with access to activities, events, and service requests.',
  devotee:
    'Books rituals, makes offerings, and follows temple worship schedules.',
  visitor:
    'Guest access to public information, visit registration, and open events.',
  ritual_coordinator:
    'Schedules rituals, processes devotee requests, and coordinates priest assignments.',
  education_coordinator:
    'Manages religious classes, training programs, and education scheduling.',
  teacher_instructor:
    'Delivers teachings, records attendance, and tracks student progress.',
  inventory_manager:
    'Manages temple supplies, usage logs, and stock-level monitoring.',
  maintenance_staff:
    'Executes maintenance work, updates facility records, and reports repairs.',
  security_guard:
    'Protects the temple, monitors entrances, logs visitors, and responds to incidents.',
};

const PORTAL_MODULES: Record<RoleKey, string[]> = {
  super_admin: ['System Control', 'Users', 'Permissions', 'Settings', 'Reports', 'Approvals'],
  temple_administrator: ['Operations', 'Approvals', 'Reports', 'Staff'],
  head_priest: ['Ceremonies', 'Ritual Approval', 'Priests', 'Schedules'],
  priest: ['Worship Schedule', 'Services', 'Rituals'],
  temple_secretary: ['Records', 'Correspondence', 'Announcements'],
  treasurer: ['Finances', 'Donations', 'Reports'],
  accountant: ['Transactions', 'Budgets', 'Statements'],
  donation_manager: ['Donations', 'Donors', 'Reports'],
  event_manager: ['Events', 'Festivals', 'Registrations'],
  volunteer_coordinator: ['Volunteers', 'Tasks', 'Activities'],
  volunteer: ['Tasks', 'Activities', 'Events'],
  member: ['Activities', 'Events', 'Requests'],
  devotee: ['Book Ritual', 'Donate', 'Schedules'],
  visitor: ['Public Info', 'Register Visit', 'Events'],
  ritual_coordinator: ['Schedule', 'Requests', 'Priests'],
  education_coordinator: ['Classes', 'Programs'],
  teacher_instructor: ['Teachings', 'Attendance', 'Progress'],
  inventory_manager: ['Supplies', 'Usage', 'Stock'],
  maintenance_staff: ['Tasks', 'Records', 'Report Repairs'],
  security_guard: ['Monitor', 'Incidents', 'Visitors'],
};

function buildProfile(role: RoleKey): RoleFolderProfile {
  const cap = ROLE_CAPABILITIES[role];
  const demo = getDemoAccount(role);
  const info = ROLES[role];
  return {
    roleKey: role,
    title: cap.title,
    icon: info.icon,
    folder: info.folder,
    order: cap.order,
    department: DEPARTMENTS[role],
    accessLevel: ACCESS[role],
    summary: SUMMARIES[role],
    responsibilities: cap.responsibilities,
    demoName: demo.name,
    demoEmail: demo.email,
    seededData: demo.seededData,
    portalModules: PORTAL_MODULES[role],
  };
}

export const ROLE_PROFILES: Record<RoleKey, RoleFolderProfile> = (
  Object.keys(ROLES) as RoleKey[]
).reduce(
  (acc, role) => {
    acc[role] = buildProfile(role);
    return acc;
  },
  {} as Record<RoleKey, RoleFolderProfile>
);

export function getRoleProfile(role: RoleKey): RoleFolderProfile {
  return ROLE_PROFILES[role];
}
