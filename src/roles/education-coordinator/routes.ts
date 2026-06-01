import type { ComponentType } from 'react';
import Profile from './Profile';
import Dashboard from './Dashboard';
import Classes from './Classes';
import Programs from './Programs';
export { ROLE_KEY, ROLE_FOLDER, ROLE_TITLE, ROLE_ORDER, RESPONSIBILITIES, PAGE_SLUGS } from './features';

/** education_coordinator role pages — /education-coordinator/:slug */
export const rolePages: Record<string, ComponentType> = {
  'profile': Profile,
  'dashboard': Dashboard,
  'classes': Classes,
  'programs': Programs,
};

export const PAGES = ["dashboard","profile","classes","programs"] as const;
