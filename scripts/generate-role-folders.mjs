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

const srcRoot = path.join(process.cwd(), 'src', 'roles');

for (const [folder, pages] of Object.entries(roles)) {
  const dir = path.join(srcRoot, folder);
  fs.mkdirSync(dir, { recursive: true });
  const exports = [];
  for (const slug of pages) {
    const name = slug.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('') + 'Page';
    const file = path.join(dir, `${name}.tsx`);
    if (!fs.existsSync(file)) {
      fs.writeFileSync(
        file,
        `/** Auto-generated role page — mirrors PHP ${folder}/${slug}.php */\nexport { default } from '@/features/pages/${slug === 'dashboard' ? 'DashboardPage' : 'RoleFeaturePage'}';\nexport const pageSlug = '${slug}';\n`
      );
    }
    exports.push(`export { default as ${name} } from './${name}';`);
  }
  fs.writeFileSync(path.join(dir, 'index.ts'), exports.join('\n') + '\n');
}

console.log('Role folders generated under src/roles/');
