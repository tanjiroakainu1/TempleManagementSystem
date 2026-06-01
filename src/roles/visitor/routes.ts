import type { ComponentType } from 'react';
import Profile from './Profile';
import Dashboard from './Dashboard';
import Info from './Info';
import RegisterVisit from './RegisterVisit';
import Events from './Events';
export { ROLE_KEY, ROLE_FOLDER, ROLE_TITLE, ROLE_ORDER, RESPONSIBILITIES, PAGE_SLUGS } from './features';

/** visitor role pages — /visitor/:slug */
export const rolePages: Record<string, ComponentType> = {
  'profile': Profile,
  'dashboard': Dashboard,
  'info': Info,
  'register-visit': RegisterVisit,
  'events': Events,
};

export const PAGES = ["dashboard","profile","info","register-visit","events"] as const;
