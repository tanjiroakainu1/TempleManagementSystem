import type { RoleKey } from './roles';
import type { EntityTable } from '@/lib/storage/services';

export type PageType =
  | 'dashboard'
  | 'users'
  | 'approvals'
  | 'announcements'
  | 'donate'
  | 'donations'
  | 'donations-readonly'
  | 'book-ritual'
  | 'events'
  | 'festivals'
  | 'transactions'
  | 'finances'
  | 'entity'
  | 'ritual-approval'
  | 'monitor'
  | 'settings'
  | 'permissions'
  | 'system-control'
  | 'reports';

export interface EntityPageConfig {
  table?: EntityTable;
  columns?: { key: string; label: string; format?: 'money' | 'date' | 'datetime' | 'badge' }[];
  formFields?: { name: string; label: string; type?: string }[];
  custom?: string;
}

export interface RolePageDef {
  title: string;
  icon: string;
  type: PageType;
  entity?: EntityPageConfig;
}

/** Every role slug → page definition */
export const ROLE_PAGES: Record<RoleKey, Record<string, RolePageDef>> = {
  super_admin: {
    dashboard: { title: 'Dashboard', icon: '🏠', type: 'dashboard' },
    'system-control': { title: 'System Control', icon: '👑', type: 'system-control' },
    users: { title: 'Manage Users', icon: '👥', type: 'users' },
    permissions: { title: 'Permissions', icon: '🔐', type: 'permissions' },
    settings: { title: 'Temple Settings', icon: '⚙️', type: 'settings' },
    reports: { title: 'All Reports', icon: '📈', type: 'reports' },
    approvals: { title: 'Approvals', icon: '✅', type: 'approvals' },
  },
  temple_administrator: {
    dashboard: { title: 'Dashboard', icon: '🏠', type: 'dashboard' },
    operations: { title: 'Daily Operations', icon: '⚡', type: 'entity', entity: { custom: 'operations' } },
    approvals: { title: 'Approvals', icon: '✅', type: 'approvals' },
    reports: { title: 'Reports', icon: '📈', type: 'reports' },
    staff: { title: 'Staff Overview', icon: '👥', type: 'users' },
  },
  head_priest: {
    dashboard: { title: 'Dashboard', icon: '🏠', type: 'dashboard' },
    ceremonies: { title: 'Ceremonies', icon: '🕉️', type: 'entity', entity: { table: 'worship_schedules' } },
    'ritual-approval': { title: 'Approve Rituals', icon: '✅', type: 'ritual-approval' },
    priests: { title: 'Supervise Priests', icon: '🙏', type: 'entity', entity: { custom: 'priests' } },
    schedules: { title: 'Schedules', icon: '📅', type: 'entity', entity: { table: 'worship_schedules' } },
  },
  priest: {
    dashboard: { title: 'Dashboard', icon: '🏠', type: 'dashboard' },
    schedule: { title: 'Worship Schedule', icon: '📅', type: 'entity', entity: { table: 'worship_schedules', custom: 'my-schedule' } },
    services: { title: 'Record Services', icon: '📝', type: 'entity', entity: { table: 'worship_records' } },
    rituals: { title: 'Conduct Rituals', icon: '📿', type: 'entity', entity: { custom: 'my-rituals' } },
  },
  temple_secretary: {
    dashboard: { title: 'Dashboard', icon: '🏠', type: 'dashboard' },
    records: { title: 'Temple Records', icon: '📁', type: 'entity', entity: { table: 'temple_records', formFields: [{ name: 'title', label: 'Title' }, { name: 'category', label: 'Category' }, { name: 'description', label: 'Description' }] } },
    correspondence: { title: 'Correspondence', icon: '✉️', type: 'entity', entity: { table: 'correspondence', formFields: [{ name: 'subject', label: 'Subject' }, { name: 'party', label: 'Party' }, { name: 'content', label: 'Message' }, { name: 'to_role', label: 'To role (e.g. treasurer)' }] } },
    announcements: { title: 'Announcements', icon: '📢', type: 'announcements' },
  },
  treasurer: {
    dashboard: { title: 'Dashboard', icon: '🏠', type: 'dashboard' },
    finances: { title: 'Manage Finances', icon: '💰', type: 'finances' },
    donations: { title: 'Monitor Donations', icon: '🎁', type: 'donations-readonly' },
    reports: { title: 'Financial Reports', icon: '📈', type: 'reports' },
  },
  accountant: {
    dashboard: { title: 'Dashboard', icon: '🏠', type: 'dashboard' },
    transactions: { title: 'Record Transactions', icon: '💳', type: 'transactions' },
    budgets: { title: 'Manage Budgets', icon: '📊', type: 'entity', entity: { table: 'budgets', columns: [{ key: 'category', label: 'Category' }, { key: 'amount', label: 'Amount', format: 'money' }, { key: 'period', label: 'Period' }], formFields: [{ name: 'category', label: 'Category' }, { name: 'amount', label: 'Amount (₱)', type: 'number' }, { name: 'period', label: 'Period' }] } },
    statements: { title: 'Financial Statements', icon: '📄', type: 'entity', entity: { custom: 'statements' } },
  },
  donation_manager: {
    dashboard: { title: 'Dashboard', icon: '🏠', type: 'dashboard' },
    donations: { title: 'Track Donations', icon: '🎁', type: 'donations' },
    donors: { title: 'Donor Records', icon: '👤', type: 'entity', entity: { custom: 'donors' } },
    reports: { title: 'Donation Reports', icon: '📈', type: 'reports' },
  },
  event_manager: {
    dashboard: { title: 'Dashboard', icon: '🏠', type: 'dashboard' },
    events: { title: 'Organize Events', icon: '🎉', type: 'events' },
    festivals: { title: 'Festivals', icon: '🪔', type: 'festivals' },
    registrations: { title: 'Registrations', icon: '📝', type: 'entity', entity: { table: 'event_registrations' } },
  },
  volunteer_coordinator: {
    dashboard: { title: 'Dashboard', icon: '🏠', type: 'dashboard' },
    volunteers: { title: 'Manage Volunteers', icon: '🤝', type: 'entity', entity: { custom: 'volunteers' } },
    tasks: { title: 'Assign Tasks', icon: '📋', type: 'entity', entity: { table: 'volunteer_tasks', formFields: [{ name: 'title', label: 'Task Title' }, { name: 'description', label: 'Description' }, { name: 'status', label: 'Status' }] } },
    activities: { title: 'Track Activities', icon: '⚡', type: 'entity', entity: { table: 'volunteer_tasks' } },
  },
  volunteer: {
    dashboard: { title: 'Dashboard', icon: '🏠', type: 'dashboard' },
    tasks: { title: 'My Tasks', icon: '📋', type: 'entity', entity: { custom: 'my-tasks' } },
    activities: { title: 'Temple Activities', icon: '⚡', type: 'entity', entity: { custom: 'volunteer-activities' } },
    events: { title: 'Assist at Events', icon: '🎉', type: 'events' },
  },
  member: {
    dashboard: { title: 'Dashboard', icon: '🏠', type: 'dashboard' },
    activities: { title: 'View Activities', icon: '📋', type: 'entity', entity: { custom: 'member-activities' } },
    events: { title: 'Register for Events', icon: '🎉', type: 'events' },
    requests: { title: 'Submit Requests', icon: '📝', type: 'entity', entity: { table: 'member_requests', formFields: [{ name: 'subject', label: 'Subject' }, { name: 'details', label: 'Details' }] } },
  },
  devotee: {
    dashboard: { title: 'Dashboard', icon: '🏠', type: 'dashboard' },
    'book-ritual': { title: 'Book Rituals', icon: '📿', type: 'book-ritual' },
    donate: { title: 'Make Donations', icon: '🎁', type: 'donate' },
    schedules: { title: 'View Schedules', icon: '📅', type: 'entity', entity: { table: 'worship_schedules' } },
  },
  visitor: {
    dashboard: { title: 'Dashboard', icon: '🏠', type: 'dashboard' },
    info: { title: 'Public Information', icon: 'ℹ️', type: 'entity', entity: { custom: 'public-info' } },
    'register-visit': { title: 'Register Visit', icon: '📝', type: 'entity', entity: { table: 'visit_registrations', formFields: [{ name: 'visit_date', label: 'Visit Date', type: 'date' }, { name: 'visit_time', label: 'Time', type: 'time' }, { name: 'purpose', label: 'Purpose' }] } },
    events: { title: 'Temple Events', icon: '🎉', type: 'events' },
  },
  ritual_coordinator: {
    dashboard: { title: 'Dashboard', icon: '🏠', type: 'dashboard' },
    schedule: { title: 'Schedule Worship', icon: '📅', type: 'entity', entity: { table: 'worship_schedules' } },
    requests: { title: 'Ritual Requests', icon: '📿', type: 'entity', entity: { custom: 'ritual-requests' } },
    priests: { title: 'Coordinate Priests', icon: '🙏', type: 'entity', entity: { custom: 'priests' } },
  },
  education_coordinator: {
    dashboard: { title: 'Dashboard', icon: '🏠', type: 'dashboard' },
    classes: { title: 'Manage Classes', icon: '📚', type: 'entity', entity: { table: 'education_classes', formFields: [{ name: 'title', label: 'Class Title' }, { name: 'schedule', label: 'Schedule' }, { name: 'capacity', label: 'Capacity', type: 'number' }] } },
    programs: { title: 'Training Programs', icon: '🎓', type: 'entity', entity: { table: 'education_classes' } },
  },
  teacher_instructor: {
    dashboard: { title: 'Dashboard', icon: '🏠', type: 'dashboard' },
    teachings: { title: 'My Teachings', icon: '✏️', type: 'entity', entity: { custom: 'my-teachings' } },
    attendance: { title: 'Student Attendance', icon: '📋', type: 'entity', entity: { table: 'class_attendance' } },
    progress: { title: 'Assess Progress', icon: '📊', type: 'entity', entity: { table: 'student_progress' } },
  },
  inventory_manager: {
    dashboard: { title: 'Dashboard', icon: '🏠', type: 'dashboard' },
    supplies: { title: 'Manage Supplies', icon: '📦', type: 'entity', entity: { table: 'inventory_items', formFields: [{ name: 'name', label: 'Item Name' }, { name: 'quantity', label: 'Quantity', type: 'number' }, { name: 'min_stock', label: 'Min Stock', type: 'number' }] } },
    usage: { title: 'Track Usage', icon: '📊', type: 'entity', entity: { table: 'inventory_usage' } },
    stock: { title: 'Monitor Stock', icon: '📈', type: 'entity', entity: { table: 'inventory_items', custom: 'stock-monitor' } },
  },
  maintenance_staff: {
    dashboard: { title: 'Dashboard', icon: '🏠', type: 'dashboard' },
    tasks: { title: 'Maintenance Tasks', icon: '🔧', type: 'entity', entity: { table: 'maintenance_records' } },
    records: { title: 'Update Records', icon: '📁', type: 'entity', entity: { table: 'maintenance_records', formFields: [{ name: 'title', label: 'Title' }, { name: 'description', label: 'Description' }, { name: 'location', label: 'Location' }, { name: 'priority', label: 'Priority' }] } },
    report: { title: 'Report Repairs', icon: '⚠️', type: 'entity', entity: { table: 'maintenance_records', formFields: [{ name: 'title', label: 'Title' }, { name: 'description', label: 'Description' }, { name: 'location', label: 'Location' }, { name: 'priority', label: 'Priority' }] } },
  },
  security_guard: {
    dashboard: { title: 'Dashboard', icon: '🏠', type: 'dashboard' },
    monitor: { title: 'Entrance Monitor', icon: '🚪', type: 'monitor' },
    incidents: { title: 'Security Incidents', icon: '⚠️', type: 'entity', entity: { table: 'security_incidents', formFields: [{ name: 'title', label: 'Title' }, { name: 'description', label: 'Description' }, { name: 'severity', label: 'Severity' }] } },
    visitors: { title: 'Visitor Log', icon: '📋', type: 'entity', entity: { table: 'visit_registrations' } },
  },
};
