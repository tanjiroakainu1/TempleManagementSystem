/** Teacher / Instructor — role scope and page slugs (folder: teacher-instructor) */
export const ROLE_KEY = 'teacher_instructor' as const;
export const ROLE_FOLDER = 'teacher-instructor' as const;
export const ROLE_TITLE = 'Teacher / Instructor' as const;
export const ROLE_ORDER = 17 as const;

export const RESPONSIBILITIES = [
  "Conduct religious teachings",
  "Manage student attendance",
  "Assess student progress"
] as const;

export const PAGE_SLUGS = [
  'dashboard',
  'profile',
  'teachings',
  'attendance',
  'progress'
] as const;
