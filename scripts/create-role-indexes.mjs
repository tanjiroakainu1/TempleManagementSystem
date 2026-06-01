import fs from 'fs';
import path from 'path';

const roles = {
  'super-admin': ['dashboard', 'system-control', 'users', 'permissions', 'settings', 'reports', 'approvals'],
  'temple-administrator': ['dashboard', 'operations', 'approvals', 'reports', 'staff'],
  'head-priest': ['dashboard', 'ceremonies', 'ritual-approval', 'priests', 'schedules'],
  priest: ['dashboard', 'schedule', 'services', 'rituals'],
  'temple-secretary': ['dashboard', 'records', 'correspondence', 'announcements'],
  treasurer: ['dashboard', 'finances', 'donations', 'reports'],
  accountant: ['dashboard', 'transactions', 'budgets', 'statements'],
  'donation-manager': ['dashboard', 'donations', 'donors', 'reports'],
  'event-manager': ['dashboard', 'events', 'festivals', 'registrations'],
  'volunteer-coordinator': ['dashboard', 'volunteers', 'tasks', 'activities'],
  volunteer: ['dashboard', 'tasks', 'activities', 'events'],
  member: ['dashboard', 'activities', 'events', 'requests'],
  devotee: ['dashboard', 'book-ritual', 'donate', 'schedules'],
  visitor: ['dashboard', 'info', 'register-visit', 'events'],
  'ritual-coordinator': ['dashboard', 'schedule', 'requests', 'priests'],
  'education-coordinator': ['dashboard', 'classes', 'programs'],
  'teacher-instructor': ['dashboard', 'teachings', 'attendance', 'progress'],
  'inventory-manager': ['dashboard', 'supplies', 'usage', 'stock'],
  'maintenance-staff': ['dashboard', 'tasks', 'records', 'report'],
  'security-guard': ['dashboard', 'monitor', 'incidents', 'visitors'],
};

const root = path.join(process.cwd(), 'src', 'roles');
fs.mkdirSync(root, { recursive: true });

for (const [folder, pages] of Object.entries(roles)) {
  const dir = path.join(root, folder);
  fs.mkdirSync(dir, { recursive: true });
  const content = `/**
 * ${folder} role module
 * Routes: /${folder}/:pageSlug
 * PHP reference: /${folder}/*.php
 *
 * Pages: ${pages.join(', ')}
 * Shared: activity-log (via /shared/activity-log)
 *
 * UI components live in src/features/pages/ and are mapped in src/routes/pageMap.tsx
 */
export const ROLE_FOLDER = '${folder}';
export const PAGES = ${JSON.stringify(pages, null, 2)} as const;
export type PageSlug = (typeof PAGES)[number];
`;
  fs.writeFileSync(path.join(dir, 'index.ts'), content);
}

fs.writeFileSync(
  path.join(root, 'index.ts'),
  `/** All 20 temple role modules — mirrors PHP role folders */\n${Object.keys(roles)
    .map((f) => `export * as ${f.replace(/-/g, '_')} from './${f}';`)
    .join('\n')}\n`
);

console.log('Created src/roles/* for all 20 roles');
