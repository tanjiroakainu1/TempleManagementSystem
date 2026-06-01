import type { ComponentType } from 'react';
import Profile from './Profile';
import Dashboard from './Dashboard';
import Volunteers from './Volunteers';
import Tasks from './Tasks';
import Activities from './Activities';
export { ROLE_KEY, ROLE_FOLDER, ROLE_TITLE, ROLE_ORDER, RESPONSIBILITIES, PAGE_SLUGS } from './features';

/** volunteer_coordinator role pages — /volunteer-coordinator/:slug */
export const rolePages: Record<string, ComponentType> = {
  'profile': Profile,
  'dashboard': Dashboard,
  'volunteers': Volunteers,
  'tasks': Tasks,
  'activities': Activities,
};

export const PAGES = ["dashboard","profile","volunteers","tasks","activities"] as const;
