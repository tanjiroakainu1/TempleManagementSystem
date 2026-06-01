import type { ComponentType } from 'react';
import Profile from './Profile';
import Dashboard from './Dashboard';
import Finances from './Finances';
import Donations from './Donations';
import Reports from './Reports';
export { ROLE_KEY, ROLE_FOLDER, ROLE_TITLE, ROLE_ORDER, RESPONSIBILITIES, PAGE_SLUGS } from './features';

/** treasurer role pages — /treasurer/:slug */
export const rolePages: Record<string, ComponentType> = {
  'profile': Profile,
  'dashboard': Dashboard,
  'finances': Finances,
  'donations': Donations,
  'reports': Reports,
};

export const PAGES = ["dashboard","profile","finances","donations","reports"] as const;
