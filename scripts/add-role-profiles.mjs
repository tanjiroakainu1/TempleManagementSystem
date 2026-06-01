#!/usr/bin/env node
/**
 * Adds profile.ts + Profile.tsx and updates features.ts + routes.ts for all 20 roles.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rolesDir = path.join(__dirname, '..', 'src/roles');

const folders = fs.readdirSync(rolesDir).filter((f) => {
  const p = path.join(rolesDir, f);
  return fs.statSync(p).isDirectory() && f !== '_lib' && f !== 'shared';
});

for (const folder of folders) {
  const dir = path.join(rolesDir, folder);
  const featuresPath = path.join(dir, 'features.ts');
  if (!fs.existsSync(featuresPath)) continue;

  const features = fs.readFileSync(featuresPath, 'utf8');
  const keyMatch = features.match(/ROLE_KEY = '([^']+)'/);
  if (!keyMatch) {
    console.warn(`Skip ${folder}: no ROLE_KEY`);
    continue;
  }
  const roleKey = keyMatch[1];

  const profileTs = `import { getRoleProfile } from '@/config/roleProfiles';
import { ROLE_KEY } from './features';

/** ${folder} — role profile metadata (role #${features.match(/ROLE_ORDER = (\d+)/)?.[1] ?? '?'}) */
export const PROFILE = getRoleProfile(ROLE_KEY);
export default PROFILE;
`;
  fs.writeFileSync(path.join(dir, 'roleProfileData.ts'), profileTs);

  const titleMatch = features.match(/ROLE_TITLE = '([^']+)'/);
  const title = titleMatch?.[1] ?? folder;

  const profileTsx = `import RoleProfilePage from '@/roles/_lib/RoleProfilePage';
import { ROLE_KEY } from './features';
import PROFILE from './roleProfileData';

/**
 * ${title} — role profile
 * Route: /${folder}/profile
 * @see ./roleProfileData.ts for role information
 */
export default function Profile() {
  return <RoleProfilePage role={ROLE_KEY} profile={PROFILE} />;
}
`;
  fs.writeFileSync(path.join(dir, 'Profile.tsx'), profileTsx);

  let newFeatures = features;
  if (!features.includes('"profile"')) {
    newFeatures = newFeatures.replace(
      /export const PAGE_SLUGS = (\[[\s\S]*?\]) as const;/,
      (m, arr) => {
        const parsed = JSON.parse(arr.replace(/'/g, '"'));
        if (!parsed.includes('profile')) {
          const idx = parsed.indexOf('dashboard');
          parsed.splice(idx >= 0 ? idx + 1 : 0, 0, 'profile');
        }
        return `export const PAGE_SLUGS = ${JSON.stringify(parsed, null, 2).replace(/"/g, "'")} as const;`;
      }
    );
    fs.writeFileSync(featuresPath, newFeatures);
  }

  const routesPath = path.join(dir, 'routes.ts');
  if (fs.existsSync(routesPath)) {
    let routes = fs.readFileSync(routesPath, 'utf8');
    if (!routes.includes("from './Profile'")) {
      routes = routes.replace(
        /^(import type \{ ComponentType \} from 'react';)\n/m,
        "$1\nimport Profile from './Profile';"
      );
      if (!routes.includes("import Profile")) {
        routes = `import Profile from './Profile';\n` + routes;
      }
      routes = routes.replace(
        /(export const rolePages: Record<string, ComponentType> = \{\n)/,
        "$1  'profile': Profile,\n"
      );
      routes = routes.replace(
        /export const PAGES = (\[[^\]]+\]) as const;/,
        (m, arr) => {
          const parsed = JSON.parse(arr);
          if (!parsed.includes('profile')) {
            const idx = parsed.indexOf('dashboard');
            parsed.splice(idx >= 0 ? idx + 1 : 0, 0, 'profile');
          }
          return `export const PAGES = ${JSON.stringify(parsed)} as const;`;
        }
      );
      fs.writeFileSync(routesPath, routes);
    }
  }

  console.log(`✓ ${folder} (${roleKey})`);
}

console.log('Done — profile files added for all roles.');
