import type { ComponentType } from 'react';
import Profile from './Profile';
import Dashboard from './Dashboard';
import Activities from './Activities';
import Events from './Events';
import Requests from './Requests';
export { ROLE_KEY, ROLE_FOLDER, ROLE_TITLE, ROLE_ORDER, RESPONSIBILITIES, PAGE_SLUGS } from './features';

/** member role pages — /member/:slug */
export const rolePages: Record<string, ComponentType> = {
  'profile': Profile,
  'dashboard': Dashboard,
  'activities': Activities,
  'events': Events,
  'requests': Requests,
};

export const PAGES = ["dashboard","profile","activities","events","requests"] as const;
