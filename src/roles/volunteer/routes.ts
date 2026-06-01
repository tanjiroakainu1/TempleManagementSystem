import type { ComponentType } from 'react';
import Profile from './Profile';
import Dashboard from './Dashboard';
import Tasks from './Tasks';
import Activities from './Activities';
import Events from './Events';
export { ROLE_KEY, ROLE_FOLDER, ROLE_TITLE, ROLE_ORDER, RESPONSIBILITIES, PAGE_SLUGS } from './features';

/** volunteer role pages — /volunteer/:slug */
export const rolePages: Record<string, ComponentType> = {
  'profile': Profile,
  'dashboard': Dashboard,
  'tasks': Tasks,
  'activities': Activities,
  'events': Events,
};

export const PAGES = ["dashboard","profile","tasks","activities","events"] as const;
