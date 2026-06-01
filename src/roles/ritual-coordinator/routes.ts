import type { ComponentType } from 'react';
import Profile from './Profile';
import Dashboard from './Dashboard';
import Schedule from './Schedule';
import Requests from './Requests';
import Priests from './Priests';
export { ROLE_KEY, ROLE_FOLDER, ROLE_TITLE, ROLE_ORDER, RESPONSIBILITIES, PAGE_SLUGS } from './features';

/** ritual_coordinator role pages — /ritual-coordinator/:slug */
export const rolePages: Record<string, ComponentType> = {
  'profile': Profile,
  'dashboard': Dashboard,
  'schedule': Schedule,
  'requests': Requests,
  'priests': Priests,
};

export const PAGES = ["dashboard","profile","schedule","requests","priests"] as const;
