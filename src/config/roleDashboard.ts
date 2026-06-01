import type { RoleKey } from './roles';

export interface RoleDashboardMeta {
  tagline: string;
  welcome: string;
  accent: 'maroon' | 'gold' | 'emerald' | 'violet' | 'amber';
}

export const ROLE_DASHBOARD: Record<RoleKey, RoleDashboardMeta> = {
  super_admin: {
    tagline: 'Full system control',
    welcome: 'Oversee every module, user, and temple setting from one command center.',
    accent: 'maroon',
  },
  temple_administrator: {
    tagline: 'Daily temple operations',
    welcome: 'Coordinate staff, approvals, and operational reports for smooth temple days.',
    accent: 'maroon',
  },
  head_priest: {
    tagline: 'Spiritual leadership',
    welcome: 'Guide ceremonies, approve rituals, and supervise the priesthood.',
    accent: 'gold',
  },
  priest: {
    tagline: 'Service & worship',
    welcome: 'Conduct rituals, manage your worship schedule, and record sacred services.',
    accent: 'gold',
  },
  temple_secretary: {
    tagline: 'Records & communications',
    welcome: 'Keep temple records organized, correspondence timely, and announcements clear.',
    accent: 'violet',
  },
  treasurer: {
    tagline: 'Temple finances',
    welcome: 'Monitor finances, track donations, and prepare financial summaries.',
    accent: 'emerald',
  },
  accountant: {
    tagline: 'Accounting & budgets',
    welcome: 'Record transactions, manage budgets, and prepare financial statements.',
    accent: 'emerald',
  },
  donation_manager: {
    tagline: 'Donor stewardship',
    welcome: 'Track every offering, nurture donor relationships, and report on generosity.',
    accent: 'emerald',
  },
  event_manager: {
    tagline: 'Events & festivals',
    welcome: 'Organize celebrations, manage festivals, and welcome registrations.',
    accent: 'amber',
  },
  volunteer_coordinator: {
    tagline: 'Volunteer leadership',
    welcome: 'Recruit volunteers, assign meaningful tasks, and track temple service.',
    accent: 'amber',
  },
  volunteer: {
    tagline: 'Temple service',
    welcome: 'See your assignments, join activities, and assist during events.',
    accent: 'amber',
  },
  member: {
    tagline: 'Community member',
    welcome: 'Stay connected with temple activities, events, and your requests.',
    accent: 'violet',
  },
  devotee: {
    tagline: 'Devotion & giving',
    welcome: 'Book rituals, offer donations, and follow worship schedules.',
    accent: 'gold',
  },
  visitor: {
    tagline: 'Welcome, visitor',
    welcome: 'Explore public information, register your visit, and discover events.',
    accent: 'violet',
  },
  ritual_coordinator: {
    tagline: 'Ritual coordination',
    welcome: 'Schedule rituals, manage requests, and coordinate priests.',
    accent: 'gold',
  },
  education_coordinator: {
    tagline: 'Religious education',
    welcome: 'Manage classes and training programs for spiritual growth.',
    accent: 'violet',
  },
  teacher_instructor: {
    tagline: 'Teaching ministry',
    welcome: 'Lead teachings, track attendance, and assess student progress.',
    accent: 'violet',
  },
  inventory_manager: {
    tagline: 'Supplies & stock',
    welcome: 'Manage temple supplies, track usage, and monitor stock levels.',
    accent: 'emerald',
  },
  maintenance_staff: {
    tagline: 'Facilities care',
    welcome: 'Complete maintenance tasks, update records, and report repairs.',
    accent: 'amber',
  },
  security_guard: {
    tagline: 'Safety & security',
    welcome: 'Monitor entrances, log visitors, and respond to incidents.',
    accent: 'maroon',
  },
};
