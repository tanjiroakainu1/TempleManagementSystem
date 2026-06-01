import type { ComponentType } from 'react';
import Profile from './Profile';
import Dashboard from './Dashboard';
import Donations from './Donations';
import Donors from './Donors';
import Reports from './Reports';
export { ROLE_KEY, ROLE_FOLDER, ROLE_TITLE, ROLE_ORDER, RESPONSIBILITIES, PAGE_SLUGS } from './features';

/** donation_manager role pages — /donation-manager/:slug */
export const rolePages: Record<string, ComponentType> = {
  'profile': Profile,
  'dashboard': Dashboard,
  'donations': Donations,
  'donors': Donors,
  'reports': Reports,
};

export const PAGES = ["dashboard","profile","donations","donors","reports"] as const;
