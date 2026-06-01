import type { RoleKey } from './roles';

export type AiContextKey = RoleKey | 'guest';

/** Quick prompts shown in the floating Temple Wisdom chat — tailored per role */
export const TEMPLE_AI_QUICK_QUESTIONS: Record<AiContextKey, string[]> = {
  guest: [
    'What is the Temple Management System?',
    'How do I login with a demo account?',
    'What are all 20 temple roles?',
    'How do I register as a devotee or member?',
    'Who developed this temple platform?',
    'Can you explain temple donations and rituals?',
  ],
  super_admin: [
    'How do I approve pending records?',
    'How do I reset all demo data?',
    'Explain permissions for all 20 roles',
    'Where is system control vs settings?',
    'How does the shared activity log work?',
    'Tips for managing users and reports',
  ],
  temple_administrator: [
    'What are my daily operations tasks?',
    'How do I handle pending approvals?',
    'How do I view staff by role?',
    'What reports should I run weekly?',
    'Explain temple administrator vs super admin',
  ],
  head_priest: [
    'How do I approve ritual requests?',
    'How do I supervise priests on the schedule?',
    'What ceremonies can I manage today?',
    'How does ritual approval workflow work?',
    'Tips for worship schedule conflicts',
  ],
  priest: [
    'What is on my worship schedule today?',
    'How do I record a religious service?',
    'How do I conduct assigned rituals?',
    'Difference between services and rituals pages',
    'How do devotees book rituals I perform?',
  ],
  temple_secretary: [
    'How do I post a public announcement?',
    'Where do I manage temple records?',
    'How does correspondence tracking work?',
    'Who can see my announcements?',
    'Best practices for temple documentation',
  ],
  treasurer: [
    'How do I monitor temple finances?',
    'How are donations linked to finances?',
    'How do I generate financial reports?',
    'Explain income vs expense transactions',
    'What should treasurer approve?',
  ],
  accountant: [
    'How do I record a new transaction?',
    'How do budgets and statements work?',
    'What is pending transaction approval?',
    'How do I categorize temple expenses?',
    'Month-end closing checklist for temple',
  ],
  donation_manager: [
    'How do I track a new donation?',
    'How do donor records work?',
    'What donation types are available?',
    'How do I run donation reports?',
    'Explain GCash and cash donations in demo',
  ],
  event_manager: [
    'How do I create a temple event?',
    'What is the difference between events and festivals?',
    'How do registrations work?',
    'How do volunteers join my events?',
    'Tips for Diwali or festival planning',
  ],
  volunteer_coordinator: [
    'How do I assign volunteer tasks?',
    'How do I track volunteer activities?',
    'Who are active volunteers in demo data?',
    'Link volunteers to events — how?',
    'Best way to coordinate festival helpers',
  ],
  volunteer: [
    'What tasks are assigned to me?',
    'How do I help at temple events?',
    'How do I see temple activities?',
    'How do I mark a task complete?',
    'Volunteer etiquette at our temple',
  ],
  member: [
    'How do I register for an event?',
    'How do I submit a member request?',
    'What activities can members see?',
    'Member vs devotee — what is different?',
    'How do I book a ritual as a member?',
  ],
  devotee: [
    'How do I book a ritual online?',
    'How do I make a temple donation?',
    'Where do I view worship schedules?',
    'What ritual types can I request?',
    'Payment methods for donations',
  ],
  visitor: [
    'How do I register my temple visit?',
    'What public information is available?',
    'Which events can visitors join?',
    'Visitor vs member account difference',
    'Temple hours and contact in settings',
  ],
  ritual_coordinator: [
    'How do I schedule a ritual?',
    'How do I manage ritual requests?',
    'How do I assign priests to rituals?',
    'Pending vs scheduled rituals explained',
    'Coordinate with head priest — workflow',
  ],
  education_coordinator: [
    'How do I manage religious classes?',
    'How do training programs work?',
    'Assign teachers to classes — how?',
    'Education coordinator demo data overview',
    'Track attendance across programs',
  ],
  teacher_instructor: [
    'Where are my teachings and classes?',
    'How do I record student attendance?',
    'How do I assess student progress?',
    'What classes am I assigned in demo?',
    'Tips for religious instruction sessions',
  ],
  inventory_manager: [
    'How do I manage temple supplies?',
    'What triggers a low stock alert?',
    'How is inventory usage tracked?',
    'Common items: ghee, camphor, rice',
    'Reorder workflow for temple supplies',
  ],
  maintenance_staff: [
    'What maintenance tasks are open?',
    'How do I update maintenance records?',
    'How do I report a repair need?',
    'Link maintenance to security incidents?',
    'Daily facilities checklist',
  ],
  security_guard: [
    'How do I log a security incident?',
    'How does entrance monitoring work?',
    'Where is the visitor log today?',
    'How do visit registrations appear?',
    'Safety protocol for temple festivals',
  ],
};

export function getQuickQuestions(context: AiContextKey): string[] {
  return TEMPLE_AI_QUICK_QUESTIONS[context] ?? TEMPLE_AI_QUICK_QUESTIONS.guest;
}
