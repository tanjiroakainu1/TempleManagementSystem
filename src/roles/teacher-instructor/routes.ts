import type { ComponentType } from 'react';
import Profile from './Profile';
import Dashboard from './Dashboard';
import Teachings from './Teachings';
import Attendance from './Attendance';
import Progress from './Progress';
export { ROLE_KEY, ROLE_FOLDER, ROLE_TITLE, ROLE_ORDER, RESPONSIBILITIES, PAGE_SLUGS } from './features';

/** teacher_instructor role pages — /teacher-instructor/:slug */
export const rolePages: Record<string, ComponentType> = {
  'profile': Profile,
  'dashboard': Dashboard,
  'teachings': Teachings,
  'attendance': Attendance,
  'progress': Progress,
};

export const PAGES = ["dashboard","profile","teachings","attendance","progress"] as const;
