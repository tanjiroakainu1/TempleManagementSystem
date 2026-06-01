import type { ComponentType } from 'react';
import Profile from './Profile';
import Dashboard from './Dashboard';
import Schedule from './Schedule';
import Services from './Services';
import Rituals from './Rituals';
export { ROLE_KEY, ROLE_FOLDER, ROLE_TITLE, ROLE_ORDER, RESPONSIBILITIES, PAGE_SLUGS } from './features';

/** priest role pages — /priest/:slug */
export const rolePages: Record<string, ComponentType> = {
  'profile': Profile,
  'dashboard': Dashboard,
  'schedule': Schedule,
  'services': Services,
  'rituals': Rituals,
};

export const PAGES = ["dashboard","profile","schedule","services","rituals"] as const;
