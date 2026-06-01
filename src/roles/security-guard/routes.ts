import type { ComponentType } from 'react';
import Profile from './Profile';
import Dashboard from './Dashboard';
import Monitor from './Monitor';
import Incidents from './Incidents';
import Visitors from './Visitors';
export { ROLE_KEY, ROLE_FOLDER, ROLE_TITLE, ROLE_ORDER, RESPONSIBILITIES, PAGE_SLUGS } from './features';

/** security_guard role pages — /security-guard/:slug */
export const rolePages: Record<string, ComponentType> = {
  'profile': Profile,
  'dashboard': Dashboard,
  'monitor': Monitor,
  'incidents': Incidents,
  'visitors': Visitors,
};

export const PAGES = ["dashboard","profile","monitor","incidents","visitors"] as const;
