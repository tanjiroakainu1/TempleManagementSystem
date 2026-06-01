import type { ComponentType } from 'react';
import Profile from './Profile';
import Dashboard from './Dashboard';
import Records from './Records';
import Correspondence from './Correspondence';
import Announcements from './Announcements';
export { ROLE_KEY, ROLE_FOLDER, ROLE_TITLE, ROLE_ORDER, RESPONSIBILITIES, PAGE_SLUGS } from './features';

/** temple_secretary role pages — /temple-secretary/:slug */
export const rolePages: Record<string, ComponentType> = {
  'profile': Profile,
  'dashboard': Dashboard,
  'records': Records,
  'correspondence': Correspondence,
  'announcements': Announcements,
};

export const PAGES = ["dashboard","profile","records","correspondence","announcements"] as const;
