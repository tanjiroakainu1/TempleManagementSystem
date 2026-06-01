#!/usr/bin/env node
/**
 * Generates per-role page files, features.ts, and routes.ts in src/roles/{folder}/
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const ROLES = [
  {
    key: 'super_admin',
    folder: 'super-admin',
    title: 'Super Admin',
    order: 1,
    responsibilities: [
      'Full system control',
      'Manage all users and permissions',
      'Configure temple settings',
      'View all reports',
    ],
    pages: ['dashboard', 'profile', 'system-control', 'users', 'permissions', 'settings', 'reports', 'approvals'],
  },
  {
    key: 'temple_administrator',
    folder: 'temple-administrator',
    title: 'Temple Administrator',
    order: 2,
    responsibilities: [
      'Manage daily temple operations',
      'Approve records and activities',
      'Generate reports',
    ],
    pages: ['dashboard', 'operations', 'approvals', 'reports', 'staff'],
  },
  {
    key: 'head_priest',
    folder: 'head-priest',
    title: 'Head Priest',
    order: 3,
    responsibilities: [
      'Manage religious ceremonies',
      'Approve ritual schedules',
      'Supervise priests',
    ],
    pages: ['dashboard', 'ceremonies', 'ritual-approval', 'priests', 'schedules'],
  },
  {
    key: 'priest',
    folder: 'priest',
    title: 'Priest',
    order: 4,
    responsibilities: [
      'Conduct prayers and rituals',
      'Manage worship schedules',
      'Record religious services',
    ],
    pages: ['dashboard', 'schedule', 'services', 'rituals'],
  },
  {
    key: 'temple_secretary',
    folder: 'temple-secretary',
    title: 'Temple Secretary',
    order: 5,
    responsibilities: [
      'Maintain temple records',
      'Handle correspondence',
      'Manage announcements',
    ],
    pages: ['dashboard', 'records', 'correspondence', 'announcements'],
  },
  {
    key: 'treasurer',
    folder: 'treasurer',
    title: 'Treasurer',
    order: 6,
    responsibilities: [
      'Manage temple finances',
      'Monitor donations',
      'Generate financial reports',
    ],
    pages: ['dashboard', 'finances', 'donations', 'reports'],
  },
  {
    key: 'accountant',
    folder: 'accountant',
    title: 'Accountant',
    order: 7,
    responsibilities: [
      'Record transactions',
      'Manage budgets',
      'Prepare financial statements',
    ],
    pages: ['dashboard', 'transactions', 'budgets', 'statements'],
  },
  {
    key: 'donation_manager',
    folder: 'donation-manager',
    title: 'Donation Manager',
    order: 8,
    responsibilities: [
      'Track donations',
      'Manage donor records',
      'Generate donation reports',
    ],
    pages: ['dashboard', 'donations', 'donors', 'reports'],
  },
  {
    key: 'event_manager',
    folder: 'event-manager',
    title: 'Event Manager',
    order: 9,
    responsibilities: ['Organize temple events', 'Manage festivals and celebrations'],
    pages: ['dashboard', 'events', 'festivals', 'registrations'],
  },
  {
    key: 'volunteer_coordinator',
    folder: 'volunteer-coordinator',
    title: 'Volunteer Coordinator',
    order: 10,
    responsibilities: [
      'Manage volunteers',
      'Assign volunteer tasks',
      'Track volunteer activities',
    ],
    pages: ['dashboard', 'volunteers', 'tasks', 'activities'],
  },
  {
    key: 'volunteer',
    folder: 'volunteer',
    title: 'Volunteer',
    order: 11,
    responsibilities: ['Participate in temple activities', 'Assist during events'],
    pages: ['dashboard', 'tasks', 'activities', 'events'],
  },
  {
    key: 'member',
    folder: 'member',
    title: 'Member',
    order: 12,
    responsibilities: ['View temple activities', 'Register for events', 'Submit requests'],
    pages: ['dashboard', 'activities', 'events', 'requests'],
  },
  {
    key: 'devotee',
    folder: 'devotee',
    title: 'Devotee',
    order: 13,
    responsibilities: ['Book rituals and services', 'Make donations', 'View schedules'],
    pages: ['dashboard', 'book-ritual', 'donate', 'schedules'],
  },
  {
    key: 'visitor',
    folder: 'visitor',
    title: 'Visitor',
    order: 14,
    responsibilities: ['View public information', 'Register for visits'],
    pages: ['dashboard', 'info', 'register-visit', 'events'],
  },
  {
    key: 'ritual_coordinator',
    folder: 'ritual-coordinator',
    title: 'Ritual Coordinator',
    order: 15,
    responsibilities: ['Schedule rituals', 'Manage ritual requests', 'Coordinate priests'],
    pages: ['dashboard', 'schedule', 'requests', 'priests'],
  },
  {
    key: 'education_coordinator',
    folder: 'education-coordinator',
    title: 'Education Coordinator',
    order: 16,
    responsibilities: ['Manage religious classes', 'Schedule training programs'],
    pages: ['dashboard', 'classes', 'programs'],
  },
  {
    key: 'teacher_instructor',
    folder: 'teacher-instructor',
    title: 'Teacher / Instructor',
    order: 17,
    responsibilities: [
      'Conduct religious teachings',
      'Manage student attendance',
      'Assess student progress',
    ],
    pages: ['dashboard', 'teachings', 'attendance', 'progress'],
  },
  {
    key: 'inventory_manager',
    folder: 'inventory-manager',
    title: 'Inventory Manager',
    order: 18,
    responsibilities: [
      'Manage temple supplies',
      'Track inventory usage',
      'Monitor stock levels',
    ],
    pages: ['dashboard', 'supplies', 'usage', 'stock'],
  },
  {
    key: 'maintenance_staff',
    folder: 'maintenance-staff',
    title: 'Maintenance Staff',
    order: 19,
    responsibilities: [
      'Perform maintenance tasks',
      'Update maintenance records',
      'Report repair needs',
    ],
    pages: ['dashboard', 'tasks', 'records', 'report'],
  },
  {
    key: 'security_guard',
    folder: 'security-guard',
    title: 'Security Guard',
    order: 20,
    responsibilities: [
      'Maintain safety and security',
      'Monitor entrances and exits',
      'Respond to incidents',
    ],
    pages: ['dashboard', 'monitor', 'incidents', 'visitors'],
  },
];

function slugToComponent(slug) {
  return slug
    .split('-')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('');
}

for (const role of ROLES) {
  const dir = path.join(root, 'src/roles', role.folder);
  fs.mkdirSync(dir, { recursive: true });

  const featuresContent = `/** ${role.title} — role scope and page slugs (folder: ${role.folder}) */
export const ROLE_KEY = '${role.key}' as const;
export const ROLE_FOLDER = '${role.folder}' as const;
export const ROLE_TITLE = '${role.title}' as const;
export const ROLE_ORDER = ${role.order} as const;

export const RESPONSIBILITIES = ${JSON.stringify(role.responsibilities, null, 2)} as const;

export const PAGE_SLUGS = ${JSON.stringify(role.pages, null, 2)} as const;
`;
  fs.writeFileSync(path.join(dir, 'features.ts'), featuresContent);

  const imports = [];
  const mapEntries = [];

  for (const slug of role.pages) {
    const comp = slugToComponent(slug);
    const fileName = `${comp}.tsx`;
    const content = `import RolePage from '@/roles/_lib/RolePage';
import { ROLE_KEY } from './features';

/**
 * ${role.title} — ${slug}
 * Route: /${role.folder}/${slug}
 * @see ./features.ts for role responsibilities
 */
export default function ${comp}() {
  return <RolePage role={ROLE_KEY} slug="${slug}" />;
}
`;
    fs.writeFileSync(path.join(dir, fileName), content);
    imports.push(`import ${comp} from './${comp}';`);
    mapEntries.push(`  '${slug}': ${comp},`);
  }

  const routesContent = `import type { ComponentType } from 'react';
${imports.join('\n')}
export { ROLE_KEY, ROLE_FOLDER, ROLE_TITLE, ROLE_ORDER, RESPONSIBILITIES, PAGE_SLUGS } from './features';

/** ${role.key} role pages — /${role.folder}/:slug */
export const rolePages: Record<string, ComponentType> = {
${mapEntries.join('\n')}
};

export const PAGES = ${JSON.stringify(role.pages)} as const;
`;

  fs.writeFileSync(path.join(dir, 'routes.ts'), routesContent);

  const indexContent = `export { rolePages, ROLE_KEY, ROLE_FOLDER, PAGES, RESPONSIBILITIES, PAGE_SLUGS } from './routes';
export * from './features';
`;

  fs.writeFileSync(path.join(dir, 'index.ts'), indexContent);
  console.log(`Generated ${role.folder} (${role.pages.length} pages + features.ts)`);
}

console.log('Done — 20 role folders aligned.');
