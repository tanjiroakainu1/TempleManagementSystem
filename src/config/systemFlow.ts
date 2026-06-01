/** Public home page — how the Temple Management System works */
export const SYSTEM_FLOW = [
  {
    step: 1,
    icon: '🏠',
    title: 'Welcome Home',
    summary: 'Explore the ash gray temple platform as a guest — no login required to learn how everything works.',
  },
  {
    step: 2,
    icon: '🔐',
    title: 'Login or Register',
    summary: 'Sign in with a demo @gmail.com account or create a new devotee, member, visitor, or volunteer profile.',
  },
  {
    step: 3,
    icon: '👤',
    title: 'Pick Your Role',
    summary: '20 dedicated portals — each role gets its own folder, dashboard, profile, and sidebar navigation.',
  },
  {
    step: 4,
    icon: '📊',
    title: 'Role Dashboard',
    summary: 'View live stats, charts, quick links, and responsibilities tailored to your temple duties.',
  },
  {
    step: 5,
    icon: '⚡',
    title: 'Manage & Approve',
    summary: 'Record donations, book rituals, run events, track inventory — with approvals flowing to admins.',
  },
  {
    step: 6,
    icon: '🛕',
    title: 'Temple Guide AI',
    summary: 'Ask the floating Temple Guide anything — temple help or general knowledge — powered by Temple Wisdom.',
  },
] as const;

export const SYSTEM_FEATURES = [
  { icon: '🎁', title: 'Donations', desc: 'Track offerings, donors, and payment types' },
  { icon: '📿', title: 'Rituals', desc: 'Book, schedule, and approve religious services' },
  { icon: '🎉', title: 'Events', desc: 'Festivals, registrations, and volunteer tasks' },
  { icon: '💰', title: 'Finance', desc: 'Transactions, budgets, and treasurer reports' },
  { icon: '📋', title: 'Records', desc: 'Secretary records, announcements, correspondence' },
  { icon: '✅', title: 'Approvals', desc: 'Central queue for admins and coordinators' },
] as const;
