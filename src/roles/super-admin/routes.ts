import type { ComponentType } from 'react';
import Profile from './Profile';
import Dashboard from './Dashboard';
import SystemControl from './SystemControl';
import Users from './Users';
import Permissions from './Permissions';
import Settings from './Settings';
import Reports from './Reports';
import Approvals from './Approvals';
export { ROLE_KEY, ROLE_FOLDER, ROLE_TITLE, ROLE_ORDER, RESPONSIBILITIES, PAGE_SLUGS } from './features';

/** super_admin role pages — /super-admin/:slug */
export const rolePages: Record<string, ComponentType> = {
  'profile': Profile,
  'dashboard': Dashboard,
  'system-control': SystemControl,
  'users': Users,
  'permissions': Permissions,
  'settings': Settings,
  'reports': Reports,
  'approvals': Approvals,
};

export const PAGES = ["dashboard","profile","system-control","users","permissions","settings","reports","approvals"] as const;
