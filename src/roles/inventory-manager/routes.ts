import type { ComponentType } from 'react';
import Profile from './Profile';
import Dashboard from './Dashboard';
import Supplies from './Supplies';
import Usage from './Usage';
import Stock from './Stock';
export { ROLE_KEY, ROLE_FOLDER, ROLE_TITLE, ROLE_ORDER, RESPONSIBILITIES, PAGE_SLUGS } from './features';

/** inventory_manager role pages — /inventory-manager/:slug */
export const rolePages: Record<string, ComponentType> = {
  'profile': Profile,
  'dashboard': Dashboard,
  'supplies': Supplies,
  'usage': Usage,
  'stock': Stock,
};

export const PAGES = ["dashboard","profile","supplies","usage","stock"] as const;
