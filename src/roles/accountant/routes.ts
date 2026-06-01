import type { ComponentType } from 'react';
import Profile from './Profile';
import Dashboard from './Dashboard';
import Transactions from './Transactions';
import Budgets from './Budgets';
import Statements from './Statements';
export { ROLE_KEY, ROLE_FOLDER, ROLE_TITLE, ROLE_ORDER, RESPONSIBILITIES, PAGE_SLUGS } from './features';

/** accountant role pages — /accountant/:slug */
export const rolePages: Record<string, ComponentType> = {
  'profile': Profile,
  'dashboard': Dashboard,
  'transactions': Transactions,
  'budgets': Budgets,
  'statements': Statements,
};

export const PAGES = ["dashboard","profile","transactions","budgets","statements"] as const;
