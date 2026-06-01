import type { ComponentType } from 'react';
import Profile from './Profile';
import Dashboard from './Dashboard';
import Ceremonies from './Ceremonies';
import RitualApproval from './RitualApproval';
import Priests from './Priests';
import Schedules from './Schedules';
export { ROLE_KEY, ROLE_FOLDER, ROLE_TITLE, ROLE_ORDER, RESPONSIBILITIES, PAGE_SLUGS } from './features';

/** head_priest role pages — /head-priest/:slug */
export const rolePages: Record<string, ComponentType> = {
  'profile': Profile,
  'dashboard': Dashboard,
  'ceremonies': Ceremonies,
  'ritual-approval': RitualApproval,
  'priests': Priests,
  'schedules': Schedules,
};

export const PAGES = ["dashboard","profile","ceremonies","ritual-approval","priests","schedules"] as const;
