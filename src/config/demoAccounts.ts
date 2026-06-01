import { ROLES, type RoleKey } from './roles';

export const GMAIL_HINT = 'Use your @gmail.com account (demo accounts below)';

export interface DemoAccount {
  role: RoleKey;
  label: string;
  icon: string;
  name: string;
  email: string;
  password: string;
  /** Sample records in localStorage for this role (aligned with seed.ts) */
  seededData: string[];
}

/** Totals from seed v2 — keep in sync with src/lib/storage/seed.ts */
const SEED_SUMMARY = {
  donations: '8 donations · ₱16,350',
  rituals: '6 ritual requests',
  events: '5 events · 10 registrations',
  transactions: '8 transactions',
  activity: '25+ shared activity rows',
  users: '23 users (20 roles + 3 community)',
} as const;

const raw: Record<RoleKey, { name: string; email: string; pass: string; seeded: string[] }> = {
  super_admin: {
    name: 'System Administrator',
    email: 'admin@gmail.com',
    pass: 'admin123',
    seeded: [SEED_SUMMARY.users, 'All modules & settings', SEED_SUMMARY.activity, '15 notifications'],
  },
  temple_administrator: {
    name: 'Rajesh Kumar',
    email: 'temple.admin@gmail.com',
    pass: 'demo123',
    seeded: ['6 pending approvals', 'Staff overview (23 users)', 'Operations dashboard', SEED_SUMMARY.activity],
  },
  head_priest: {
    name: 'Pandit Sharma',
    email: 'headpriest@gmail.com',
    pass: 'demo123',
    seeded: ['6 worship schedules', 'Ritual approvals queue', 'Priest supervision', SEED_SUMMARY.rituals],
  },
  priest: {
    name: 'Pandit Venkat',
    email: 'priest@gmail.com',
    pass: 'demo123',
    seeded: ['Today: Morning & Evening Aarti', '3 assigned rituals', '4 service records', 'Inventory usage logged'],
  },
  temple_secretary: {
    name: 'Lakshmi Devi',
    email: 'secretary@gmail.com',
    pass: 'demo123',
    seeded: ['4 temple records', '4 correspondence', '5 public announcements', SEED_SUMMARY.activity],
  },
  treasurer: {
    name: 'Ramesh Gupta',
    email: 'treasurer@gmail.com',
    pass: 'demo123',
    seeded: [SEED_SUMMARY.donations, SEED_SUMMARY.transactions, '5 budgets', 'Financial reports'],
  },
  accountant: {
    name: 'Sunita Patel',
    email: 'accountant@gmail.com',
    pass: 'demo123',
    seeded: [SEED_SUMMARY.transactions, '5 budgets', 'Pending approvals linked', SEED_SUMMARY.donations],
  },
  donation_manager: {
    name: 'Meera Singh',
    email: 'donations@gmail.com',
    pass: 'demo123',
    seeded: [SEED_SUMMARY.donations, '4 unique donors', 'GCash · PayMaya · Cash', 'Donor reports'],
  },
  event_manager: {
    name: 'Arjun Reddy',
    email: 'events@gmail.com',
    pass: 'demo123',
    seeded: [SEED_SUMMARY.events, 'Diwali & Navratri festivals', '10 registrations', 'Volunteer tasks linked'],
  },
  volunteer_coordinator: {
    name: 'Priya Nair',
    email: 'volunteers@gmail.com',
    pass: 'demo123',
    seeded: ['6 volunteer tasks', '3 active volunteers', 'Diwali & bhajan events', SEED_SUMMARY.activity],
  },
  volunteer: {
    name: 'Karthik Menon',
    email: 'volunteer@gmail.com',
    pass: 'demo123',
    seeded: ['2 active tasks', '1 completed task', SEED_SUMMARY.events, 'Festival decoration'],
  },
  member: {
    name: 'Ananya Iyer',
    email: 'member@gmail.com',
    pass: 'demo123',
    seeded: ['4 member requests', '3 event registrations', 'Class attendance', 'Ritual Homa booked'],
  },
  devotee: {
    name: 'Srinivas Rao',
    email: 'devotee@gmail.com',
    pass: 'demo123',
    seeded: ['3 ritual bookings', SEED_SUMMARY.donations.split(' · ')[0] + ' (devotee)', 'Worship schedules', 'Class enrollment'],
  },
  visitor: {
    name: 'Guest Visitor',
    email: 'visitor@gmail.com',
    pass: 'demo123',
    seeded: ['6 visit registrations', '5 public announcements', SEED_SUMMARY.events, 'Open house event'],
  },
  ritual_coordinator: {
    name: 'Deepa Murthy',
    email: 'rituals@gmail.com',
    pass: 'demo123',
    seeded: [SEED_SUMMARY.rituals, 'Priest assignments', 'Scheduled & pending queue', 'Coordinator notifications'],
  },
  education_coordinator: {
    name: 'Dr. Krishna Bhatt',
    email: 'education@gmail.com',
    pass: 'demo123',
    seeded: ['4 classes', '8 attendance rows', '5 progress assessments', 'Teacher: Guru Mahesh'],
  },
  teacher_instructor: {
    name: 'Guru Mahesh',
    email: 'teacher@gmail.com',
    pass: 'demo123',
    seeded: ['3 classes taught', '8 attendance records', '5 student grades', 'Attendance notification'],
  },
  inventory_manager: {
    name: 'Suresh Kumar',
    email: 'inventory@gmail.com',
    pass: 'demo123',
    seeded: ['8 supply items', '3 low-stock alerts', '6 usage logs', 'Ghee · Camphor · Rice'],
  },
  maintenance_staff: {
    name: 'Ravi Worker',
    email: 'maintenance@gmail.com',
    pass: 'demo123',
    seeded: ['6 maintenance records', '3 open · 2 in progress', 'Repair reports', 'Linked to security'],
  },
  security_guard: {
    name: 'Mohan Singh',
    email: 'security@gmail.com',
    pass: 'demo123',
    seeded: ['3 visits today', '4 security incidents', 'Visitor check-in', 'Entrance monitor'],
  },
};

export const DEMO_ACCOUNTS: DemoAccount[] = (Object.keys(raw) as RoleKey[]).map((role) => ({
  role,
  label: ROLES[role].label,
  icon: ROLES[role].icon,
  name: raw[role].name,
  email: raw[role].email,
  password: raw[role].pass,
  seededData: raw[role].seeded,
}));

export function findDemoByEmail(email: string): DemoAccount | undefined {
  const normalized = email.trim().toLowerCase();
  return DEMO_ACCOUNTS.find((a) => a.email.toLowerCase() === normalized);
}

export function getDemoAccount(role: RoleKey): DemoAccount {
  return DEMO_ACCOUNTS.find((a) => a.role === role)!;
}

/** Exported for dashboards / docs */
export { SEED_SUMMARY };
