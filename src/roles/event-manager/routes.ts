import type { ComponentType } from 'react';
import Profile from './Profile';
import Dashboard from './Dashboard';
import Events from './Events';
import Festivals from './Festivals';
import Registrations from './Registrations';
export { ROLE_KEY, ROLE_FOLDER, ROLE_TITLE, ROLE_ORDER, RESPONSIBILITIES, PAGE_SLUGS } from './features';

/** event_manager role pages — /event-manager/:slug */
export const rolePages: Record<string, ComponentType> = {
  'profile': Profile,
  'dashboard': Dashboard,
  'events': Events,
  'festivals': Festivals,
  'registrations': Registrations,
};

export const PAGES = ["dashboard","profile","events","festivals","registrations"] as const;
