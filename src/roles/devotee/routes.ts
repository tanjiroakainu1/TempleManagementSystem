import type { ComponentType } from 'react';
import Profile from './Profile';
import Dashboard from './Dashboard';
import BookRitual from './BookRitual';
import Donate from './Donate';
import Schedules from './Schedules';
export { ROLE_KEY, ROLE_FOLDER, ROLE_TITLE, ROLE_ORDER, RESPONSIBILITIES, PAGE_SLUGS } from './features';

/** devotee role pages — /devotee/:slug */
export const rolePages: Record<string, ComponentType> = {
  'profile': Profile,
  'dashboard': Dashboard,
  'book-ritual': BookRitual,
  'donate': Donate,
  'schedules': Schedules,
};

export const PAGES = ["dashboard","profile","book-ritual","donate","schedules"] as const;
