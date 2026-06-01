import type { RoleKey } from './roles';
import { APP_PRIVACY } from './privacy';

export interface NavItem {
  label: string;
  slug: string;
  icon: string;
  shared?: boolean;
}

const nav: Record<RoleKey, NavItem[]> = {
  super_admin: [
    { label: 'Dashboard', slug: 'dashboard', icon: '🏠' },
    { label: 'Role Profile', slug: 'profile', icon: '👤' },
    { label: 'System Control', slug: 'system-control', icon: '👑' },
    { label: 'Manage Users', slug: 'users', icon: '👥' },
    { label: 'Permissions', slug: 'permissions', icon: '🔐' },
    { label: 'Temple Settings', slug: 'settings', icon: '⚙️' },
    { label: 'All Reports', slug: 'reports', icon: '📈' },
    { label: 'Approvals', slug: 'approvals', icon: '✅' },
  ],
  temple_administrator: [
    { label: 'Dashboard', slug: 'dashboard', icon: '🏠' },
    { label: 'Role Profile', slug: 'profile', icon: '👤' },
    { label: 'Daily Operations', slug: 'operations', icon: '⚡' },
    { label: 'Approvals', slug: 'approvals', icon: '✅' },
    { label: 'Reports', slug: 'reports', icon: '📈' },
    { label: 'Staff Overview', slug: 'staff', icon: '👥' },
  ],
  head_priest: [
    { label: 'Dashboard', slug: 'dashboard', icon: '🏠' },
    { label: 'Role Profile', slug: 'profile', icon: '👤' },
    { label: 'Ceremonies', slug: 'ceremonies', icon: '🕉️' },
    { label: 'Approve Rituals', slug: 'ritual-approval', icon: '✅' },
    { label: 'Supervise Priests', slug: 'priests', icon: '🙏' },
    { label: 'Schedules', slug: 'schedules', icon: '📅' },
  ],
  priest: [
    { label: 'Dashboard', slug: 'dashboard', icon: '🏠' },
    { label: 'Role Profile', slug: 'profile', icon: '👤' },
    { label: 'Worship Schedule', slug: 'schedule', icon: '📅' },
    { label: 'Record Services', slug: 'services', icon: '📝' },
    { label: 'Conduct Rituals', slug: 'rituals', icon: '📿' },
  ],
  temple_secretary: [
    { label: 'Dashboard', slug: 'dashboard', icon: '🏠' },
    { label: 'Role Profile', slug: 'profile', icon: '👤' },
    { label: 'Temple Records', slug: 'records', icon: '📁' },
    { label: 'Correspondence', slug: 'correspondence', icon: '✉️' },
    { label: 'Announcements', slug: 'announcements', icon: '📢' },
  ],
  treasurer: [
    { label: 'Dashboard', slug: 'dashboard', icon: '🏠' },
    { label: 'Role Profile', slug: 'profile', icon: '👤' },
    { label: 'Manage Finances', slug: 'finances', icon: '💰' },
    { label: 'Monitor Donations', slug: 'donations', icon: '🎁' },
    { label: 'Financial Reports', slug: 'reports', icon: '📈' },
  ],
  accountant: [
    { label: 'Dashboard', slug: 'dashboard', icon: '🏠' },
    { label: 'Role Profile', slug: 'profile', icon: '👤' },
    { label: 'Record Transactions', slug: 'transactions', icon: '💳' },
    { label: 'Manage Budgets', slug: 'budgets', icon: '📊' },
    { label: 'Financial Statements', slug: 'statements', icon: '📄' },
  ],
  donation_manager: [
    { label: 'Dashboard', slug: 'dashboard', icon: '🏠' },
    { label: 'Role Profile', slug: 'profile', icon: '👤' },
    { label: 'Track Donations', slug: 'donations', icon: '🎁' },
    { label: 'Donor Records', slug: 'donors', icon: '👤' },
    { label: 'Donation Reports', slug: 'reports', icon: '📈' },
  ],
  event_manager: [
    { label: 'Dashboard', slug: 'dashboard', icon: '🏠' },
    { label: 'Role Profile', slug: 'profile', icon: '👤' },
    { label: 'Organize Events', slug: 'events', icon: '🎉' },
    { label: 'Festivals', slug: 'festivals', icon: '🪔' },
    { label: 'Registrations', slug: 'registrations', icon: '📝' },
  ],
  volunteer_coordinator: [
    { label: 'Dashboard', slug: 'dashboard', icon: '🏠' },
    { label: 'Role Profile', slug: 'profile', icon: '👤' },
    { label: 'Manage Volunteers', slug: 'volunteers', icon: '🤝' },
    { label: 'Assign Tasks', slug: 'tasks', icon: '📋' },
    { label: 'Track Activities', slug: 'activities', icon: '⚡' },
  ],
  volunteer: [
    { label: 'Dashboard', slug: 'dashboard', icon: '🏠' },
    { label: 'Role Profile', slug: 'profile', icon: '👤' },
    { label: 'My Tasks', slug: 'tasks', icon: '📋' },
    { label: 'Temple Activities', slug: 'activities', icon: '⚡' },
    { label: 'Assist at Events', slug: 'events', icon: '🎉' },
  ],
  member: [
    { label: 'Dashboard', slug: 'dashboard', icon: '🏠' },
    { label: 'Role Profile', slug: 'profile', icon: '👤' },
    { label: 'View Activities', slug: 'activities', icon: '📋' },
    { label: 'Register for Events', slug: 'events', icon: '🎉' },
    { label: 'Submit Requests', slug: 'requests', icon: '📝' },
  ],
  devotee: [
    { label: 'Dashboard', slug: 'dashboard', icon: '🏠' },
    { label: 'Role Profile', slug: 'profile', icon: '👤' },
    { label: 'Book Rituals', slug: 'book-ritual', icon: '📿' },
    { label: 'Make Donations', slug: 'donate', icon: '🎁' },
    { label: 'View Schedules', slug: 'schedules', icon: '📅' },
  ],
  visitor: [
    { label: 'Dashboard', slug: 'dashboard', icon: '🏠' },
    { label: 'Role Profile', slug: 'profile', icon: '👤' },
    { label: 'Public Information', slug: 'info', icon: 'ℹ️' },
    { label: 'Register Visit', slug: 'register-visit', icon: '📝' },
    { label: 'Temple Events', slug: 'events', icon: '🎉' },
  ],
  ritual_coordinator: [
    { label: 'Dashboard', slug: 'dashboard', icon: '🏠' },
    { label: 'Role Profile', slug: 'profile', icon: '👤' },
    { label: 'Schedule Worship', slug: 'schedule', icon: '📅' },
    { label: 'Ritual Requests', slug: 'requests', icon: '📿' },
    { label: 'Coordinate Priests', slug: 'priests', icon: '🙏' },
  ],
  education_coordinator: [
    { label: 'Dashboard', slug: 'dashboard', icon: '🏠' },
    { label: 'Role Profile', slug: 'profile', icon: '👤' },
    { label: 'Manage Classes', slug: 'classes', icon: '📚' },
    { label: 'Training Programs', slug: 'programs', icon: '🎓' },
  ],
  teacher_instructor: [
    { label: 'Dashboard', slug: 'dashboard', icon: '🏠' },
    { label: 'Role Profile', slug: 'profile', icon: '👤' },
    { label: 'My Teachings', slug: 'teachings', icon: '✏️' },
    { label: 'Student Attendance', slug: 'attendance', icon: '📋' },
    { label: 'Assess Progress', slug: 'progress', icon: '📊' },
  ],
  inventory_manager: [
    { label: 'Dashboard', slug: 'dashboard', icon: '🏠' },
    { label: 'Role Profile', slug: 'profile', icon: '👤' },
    { label: 'Manage Supplies', slug: 'supplies', icon: '📦' },
    { label: 'Track Usage', slug: 'usage', icon: '📊' },
    { label: 'Monitor Stock', slug: 'stock', icon: '📈' },
  ],
  maintenance_staff: [
    { label: 'Dashboard', slug: 'dashboard', icon: '🏠' },
    { label: 'Role Profile', slug: 'profile', icon: '👤' },
    { label: 'Maintenance Tasks', slug: 'tasks', icon: '🔧' },
    { label: 'Update Records', slug: 'records', icon: '📁' },
    { label: 'Report Repairs', slug: 'report', icon: '⚠️' },
  ],
  security_guard: [
    { label: 'Dashboard', slug: 'dashboard', icon: '🏠' },
    { label: 'Role Profile', slug: 'profile', icon: '👤' },
    { label: 'Entrance Monitor', slug: 'monitor', icon: '🚪' },
    { label: 'Respond to Incidents', slug: 'incidents', icon: '⚠️' },
    { label: 'Visitor Log', slug: 'visitors', icon: '📋' },
  ],
};

export function getNavItems(role: RoleKey): NavItem[] {
  const items = [...(nav[role] ?? [{ label: 'Dashboard', slug: 'dashboard', icon: '🏠' }])];
  if (APP_PRIVACY.showSharedActivityNav) {
    items.push({ label: 'Activity Log', slug: 'activity-log', icon: '📋', shared: true });
  }
  return items;
}

export const PAGE_DESCRIPTIONS: Record<string, string> = {
  dashboard: 'Role overview, statistics, and quick links to your dedicated modules.',
  profile: 'Full role profile — responsibilities, access level, portal modules, and demo account info.',
  'system-control': 'Full system control — users, data, and temple-wide settings.',
  users: 'Manage all users and permissions across the temple system.',
  permissions: 'Configure role permissions and access levels.',
  settings: 'Configure temple name, hours, and operational settings.',
  reports: 'View and export reports for your role.',
  approvals: 'Approve records, donations, rituals, and other pending items.',
  operations: 'Manage daily temple operations and operational metrics.',
  staff: 'Staff overview — view temple personnel by role.',
  ceremonies: 'Manage religious ceremonies and worship schedules.',
  'ritual-approval': 'Approve ritual schedules submitted by devotees and coordinators.',
  priests: 'Supervise priests and assign ritual duties.',
  schedules: 'View and manage worship and ceremony schedules.',
  schedule: 'Schedule rituals or worship services.',
  services: 'Record religious services performed at the temple.',
  rituals: 'Conduct prayers and rituals assigned to you.',
  records: 'Maintain official temple records and documents.',
  correspondence: 'Handle incoming and outgoing temple correspondence.',
  announcements: 'Create and publish temple announcements.',
  finances: 'Manage temple finances, income, and expenses.',
  donations: 'Track, record, and monitor temple donations.',
  transactions: 'Record financial transactions in the ledger.',
  budgets: 'Create and manage departmental budgets.',
  statements: 'Prepare and review financial statements.',
  donors: 'Manage donor records and giving history.',
  events: 'Organize temple events or register for upcoming events.',
  festivals: 'Manage festivals and special celebrations.',
  registrations: 'Manage event registrations and attendance.',
  volunteers: 'Manage volunteer roster and profiles.',
  tasks: 'View or assign volunteer and maintenance tasks.',
  activities: 'Track temple activities and volunteer participation.',
  requests: 'Submit and track member requests to temple administration.',
  'book-ritual': 'Book rituals and religious services.',
  donate: 'Make a donation to support the temple.',
  info: 'View public temple information and announcements.',
  'register-visit': 'Register your visit to the temple.',
  classes: 'Manage religious education classes.',
  programs: 'Schedule and manage training programs.',
  teachings: 'Conduct religious teachings and lessons.',
  attendance: 'Record and manage student attendance.',
  progress: 'Assess and track student learning progress.',
  supplies: 'Manage temple supplies and inventory items.',
  usage: 'Track inventory usage across departments.',
  stock: 'Monitor stock levels and low-stock alerts.',
  report: 'Report repair needs and facility issues.',
  monitor: 'Monitor temple entrances and visitor flow.',
  incidents: 'Log and respond to security incidents.',
  visitors: 'View visitor registration log.',
  'activity-log': 'Temple audit trail — actions from every role.',
};
