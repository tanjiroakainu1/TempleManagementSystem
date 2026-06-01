import type { ComponentType } from 'react';
import Profile from './Profile';
import Dashboard from './Dashboard';
import Tasks from './Tasks';
import Records from './Records';
import Report from './Report';
export { ROLE_KEY, ROLE_FOLDER, ROLE_TITLE, ROLE_ORDER, RESPONSIBILITIES, PAGE_SLUGS } from './features';

/** maintenance_staff role pages — /maintenance-staff/:slug */
export const rolePages: Record<string, ComponentType> = {
  'profile': Profile,
  'dashboard': Dashboard,
  'tasks': Tasks,
  'records': Records,
  'report': Report,
};

export const PAGES = ["dashboard","profile","tasks","records","report"] as const;
