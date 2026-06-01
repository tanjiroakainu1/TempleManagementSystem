import type { ComponentType } from 'react';
import Profile from './Profile';
import Dashboard from './Dashboard';
import Operations from './Operations';
import Approvals from './Approvals';
import Reports from './Reports';
import Staff from './Staff';
export { ROLE_KEY, ROLE_FOLDER, ROLE_TITLE, ROLE_ORDER, RESPONSIBILITIES, PAGE_SLUGS } from './features';

/** temple_administrator role pages — /temple-administrator/:slug */
export const rolePages: Record<string, ComponentType> = {
  'profile': Profile,
  'dashboard': Dashboard,
  'operations': Operations,
  'approvals': Approvals,
  'reports': Reports,
  'staff': Staff,
};

export const PAGES = ["dashboard","profile","operations","approvals","reports","staff"] as const;
