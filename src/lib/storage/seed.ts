import { DEMO_ACCOUNTS } from '@/config/demoAccounts';
import type { RoleKey } from '@/config/roles';
import type { TMSStore, StoredUser } from './types';

/** Bump when seed structure changes — triggers fresh demo data on next load */
export const SEED_VERSION = 2;

function iso(daysOffset = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString();
}

function dateOnly(daysOffset = 0): string {
  return iso(daysOffset).slice(0, 10);
}

function userName(users: StoredUser[], uid: number): string {
  return users.find((u) => u.id === uid)?.full_name ?? 'User';
}

export function seedStore(): TMSStore {
  const users: StoredUser[] = DEMO_ACCOUNTS.map((a, i) => ({
    id: i + 1,
    full_name: a.name,
    email: a.email,
    password: a.password,
    phone: '09' + String(9170000000 + i).slice(-10),
    role: a.role,
    status: 'active' as const,
    created_at: iso(-60 + i),
  }));

  // Extra community accounts (linked in donations, events, classes — not quick-login)
  const extraUsers: StoredUser[] = [
    { id: 21, full_name: 'Maria Santos', email: 'maria.devotee@gmail.com', password: 'demo123', phone: '09171234567', role: 'devotee', status: 'active', created_at: iso(-40) },
    { id: 22, full_name: 'James Lim', email: 'james.member@gmail.com', password: 'demo123', phone: '09181234567', role: 'member', status: 'active', created_at: iso(-35) },
    { id: 23, full_name: 'Elena Cruz', email: 'elena.volunteer@gmail.com', password: 'demo123', phone: '09191234567', role: 'volunteer', status: 'active', created_at: iso(-30) },
  ];
  users.push(...extraUsers);

  const id = (role: RoleKey) => users.find((u) => u.role === role && u.id <= 20)!.id;
  const uid = (n: number) => n;

  const donations = [
    { id: 1, donor_id: id('devotee'), amount: 5100, donation_type: 'general', purpose: 'Temple building fund', payment_method: 'gcash', received_by: id('donation_manager'), created_by: id('devotee'), created_at: iso(-12) },
    { id: 2, donor_id: id('member'), amount: 2500, donation_type: 'festival', purpose: 'Diwali lamps', payment_method: 'paymaya', received_by: id('donation_manager'), created_by: id('donation_manager'), created_at: iso(-10) },
    { id: 3, donor_id: uid(21), amount: 1000, donation_type: 'annadanam', purpose: 'Community meal', payment_method: 'cash', received_by: id('donation_manager'), created_by: id('donation_manager'), created_at: iso(-8) },
    { id: 4, donor_id: id('member'), amount: 750, donation_type: 'general', purpose: 'General support', payment_method: 'gcash', received_by: null, created_by: id('member'), created_at: iso(-6) },
    { id: 5, donor_id: id('devotee'), amount: 3000, donation_type: 'temple_fund', purpose: 'Renovation wing', payment_method: 'bank_transfer', received_by: id('donation_manager'), created_by: id('devotee'), created_at: iso(-4) },
    { id: 6, donor_id: uid(22), amount: 1500, donation_type: 'festival', purpose: 'Navratri', payment_method: 'gcash', received_by: id('donation_manager'), created_by: id('donation_manager'), created_at: iso(-3) },
    { id: 7, donor_id: id('treasurer'), amount: 500, donation_type: 'general', purpose: 'Office supplies', payment_method: 'cash', received_by: id('donation_manager'), created_by: id('treasurer'), created_at: iso(-2) },
    { id: 8, donor_id: id('devotee'), amount: 2000, donation_type: 'annadanam', purpose: 'Saturday feeding', payment_method: 'paymaya', received_by: id('donation_manager'), created_by: id('devotee'), created_at: iso(-1) },
  ];

  const ritual_requests = [
    { id: 1, devotee_id: id('devotee'), ritual_type: 'Abhishekam', preferred_date: dateOnly(7), requested_date: dateOnly(7), notes: 'Morning 6 AM preferred', status: 'pending', coordinator_id: null, priest_id: null, head_priest_approved: 0, scheduled_date: null, created_at: iso(-5) },
    { id: 2, devotee_id: id('devotee'), ritual_type: 'Archana', preferred_date: dateOnly(10), requested_date: dateOnly(10), notes: 'Family of four', status: 'scheduled', coordinator_id: id('ritual_coordinator'), priest_id: id('priest'), head_priest_approved: 0, scheduled_date: dateOnly(10), created_at: iso(-8) },
    { id: 3, devotee_id: id('member'), ritual_type: 'Homa', preferred_date: dateOnly(14), requested_date: dateOnly(14), notes: 'Anniversary ceremony', status: 'approved', coordinator_id: id('ritual_coordinator'), priest_id: id('priest'), head_priest_approved: 1, scheduled_date: dateOnly(14), created_at: iso(-10) },
    { id: 4, devotee_id: id('devotee'), ritual_type: 'Puja', preferred_date: dateOnly(-3), requested_date: dateOnly(-3), notes: 'Completed successfully', status: 'completed', coordinator_id: id('ritual_coordinator'), priest_id: id('priest'), head_priest_approved: 1, scheduled_date: dateOnly(-3), created_at: iso(-15) },
    { id: 5, devotee_id: uid(21), ritual_type: 'Satyanarayan Puja', preferred_date: dateOnly(5), requested_date: dateOnly(5), notes: 'New home blessing', status: 'pending', coordinator_id: null, priest_id: null, head_priest_approved: 0, scheduled_date: null, created_at: iso(-3) },
    { id: 6, devotee_id: id('member'), ritual_type: 'Mundan', preferred_date: dateOnly(21), requested_date: dateOnly(21), notes: 'Child ceremony', status: 'scheduled', coordinator_id: id('ritual_coordinator'), priest_id: id('priest'), head_priest_approved: 0, scheduled_date: dateOnly(21), created_at: iso(-6) },
  ];

  const worship_schedules = [
    { id: 1, priest_id: id('priest'), service_type: 'Morning Aarti', schedule_date: dateOnly(0), schedule_time: '06:00:00', status: 'scheduled', notes: 'Main sanctum', created_at: iso(-2) },
    { id: 2, priest_id: id('priest'), service_type: 'Evening Aarti', schedule_date: dateOnly(0), schedule_time: '18:30:00', status: 'scheduled', notes: '', created_at: iso(-2) },
    { id: 3, priest_id: id('priest'), service_type: 'Special Puja — Diwali', schedule_date: dateOnly(14), schedule_time: '09:00:00', status: 'scheduled', notes: 'Festival prep', created_at: iso(-5) },
    { id: 4, priest_id: id('priest'), service_type: 'Morning Aarti', schedule_date: dateOnly(-1), schedule_time: '06:00:00', status: 'completed', notes: '45 attendees', created_at: iso(-4) },
    { id: 5, priest_id: id('priest'), service_type: 'Bhajan Session', schedule_date: dateOnly(7), schedule_time: '17:00:00', status: 'scheduled', notes: 'Weekly bhajan', created_at: iso(-3) },
    { id: 6, priest_id: id('priest'), service_type: 'Homa Ceremony', schedule_date: dateOnly(14), schedule_time: '10:00:00', status: 'scheduled', notes: 'Linked to ritual #3', created_at: iso(-6) },
  ];

  const worship_records = [
    { id: 1, priest_id: id('priest'), service_type: 'Morning Aarti', service_date: dateOnly(-1), attendees: 45, notes: 'Good attendance', created_at: iso(-1) },
    { id: 2, priest_id: id('priest'), service_type: 'Evening Aarti', service_date: dateOnly(-2), attendees: 60, notes: 'Festival week', created_at: iso(-2) },
    { id: 3, priest_id: id('priest'), service_type: 'Morning Aarti', service_date: dateOnly(-3), attendees: 38, notes: '', created_at: iso(-3) },
    { id: 4, priest_id: id('priest'), service_type: 'Special Puja', service_date: dateOnly(-7), attendees: 120, notes: 'Full moon', created_at: iso(-7) },
  ];

  const events = [
    { id: 1, title: 'Diwali Mahotsav 2026', description: 'Five-day festival — lamps, puja, cultural programs', event_date: dateOnly(14), event_time: '18:00:00', location: 'Main Hall', manager_id: id('event_manager'), status: 'active', is_festival: 1, created_at: iso(-20) },
    { id: 2, title: 'Weekly Bhajan', description: 'Community singing every Saturday', event_date: dateOnly(7), event_time: '17:00:00', location: 'Prayer Hall', manager_id: id('event_manager'), status: 'active', is_festival: 0, created_at: iso(-12) },
    { id: 3, title: 'Youth Cultural Program', description: 'Arts, dance, and temple history', event_date: dateOnly(21), event_time: '16:00:00', location: 'Community Center', manager_id: id('event_manager'), status: 'active', is_festival: 0, created_at: iso(-8) },
    { id: 4, title: 'Navratri Celebrations', description: 'Nine nights of Devi puja', event_date: dateOnly(28), event_time: '19:00:00', location: 'Main Hall', manager_id: id('event_manager'), status: 'active', is_festival: 1, created_at: iso(-5) },
    { id: 5, title: 'Temple Open House', description: 'Guided tours for visitors', event_date: dateOnly(3), event_time: '10:00:00', location: 'Entire Temple', manager_id: id('event_manager'), status: 'active', is_festival: 0, created_at: iso(-3) },
  ];

  const event_registrations = [
    { id: 1, event_id: 1, user_id: id('member'), registered_at: iso(-8) },
    { id: 2, event_id: 1, user_id: id('devotee'), registered_at: iso(-8) },
    { id: 3, event_id: 1, user_id: uid(22), registered_at: iso(-7) },
    { id: 4, event_id: 2, user_id: id('visitor'), registered_at: iso(-4) },
    { id: 5, event_id: 2, user_id: id('member'), registered_at: iso(-3) },
    { id: 6, event_id: 2, user_id: id('volunteer'), registered_at: iso(-3) },
    { id: 7, event_id: 3, user_id: id('devotee'), registered_at: iso(-2) },
    { id: 8, event_id: 3, user_id: uid(22), registered_at: iso(-2) },
    { id: 9, event_id: 4, user_id: id('member'), registered_at: iso(-1) },
    { id: 10, event_id: 5, user_id: id('visitor'), registered_at: iso(0) },
  ];

  const financial_transactions = [
    { id: 1, type: 'expense', transaction_type: 'expense', amount: 8500, description: 'Monthly electricity bill', category: 'Utilities', recorded_by: id('accountant'), status: 'pending', approved_by: null, created_at: iso(-4) },
    { id: 2, type: 'expense', transaction_type: 'expense', amount: 3200, description: 'Fresh flowers for puja', category: 'Ritual Supplies', recorded_by: id('accountant'), status: 'approved', approved_by: id('treasurer'), created_at: iso(-8) },
    { id: 3, type: 'income', transaction_type: 'income', amount: 15000, description: 'Diwali sponsorship advance', category: 'Donations', recorded_by: id('accountant'), status: 'approved', approved_by: id('treasurer'), created_at: iso(-10) },
    { id: 4, type: 'expense', transaction_type: 'expense', amount: 1200, description: 'Cleaning supplies', category: 'Maintenance', recorded_by: id('accountant'), status: 'pending', approved_by: null, created_at: iso(-2) },
    { id: 5, type: 'income', transaction_type: 'income', amount: 5100, description: 'Donation batch — GCash', category: 'Donations', recorded_by: id('accountant'), status: 'approved', approved_by: id('treasurer'), created_at: iso(-6) },
    { id: 6, type: 'expense', transaction_type: 'expense', amount: 4500, description: 'Sound system rental', category: 'Events', recorded_by: id('accountant'), status: 'approved', approved_by: id('treasurer'), created_at: iso(-5) },
    { id: 7, type: 'expense', transaction_type: 'expense', amount: 2800, description: 'Priest stipend — October', category: 'Staff', recorded_by: id('accountant'), status: 'pending', approved_by: null, created_at: iso(-3) },
    { id: 8, type: 'income', transaction_type: 'income', amount: 2500, description: 'Festival stall revenue', category: 'Events', recorded_by: id('accountant'), status: 'approved', approved_by: id('treasurer'), created_at: iso(-1) },
  ];

  const budgets = [
    { id: 1, category: 'Utilities', amount: 8500, period: 'monthly', created_by: id('accountant'), created_at: iso(-30) },
    { id: 2, category: 'Festival Expenses', amount: 200000, period: 'yearly', created_by: id('accountant'), created_at: iso(-30) },
    { id: 3, category: 'Ritual Supplies', amount: 15000, period: 'monthly', created_by: id('accountant'), created_at: iso(-25) },
    { id: 4, category: 'Education Programs', amount: 25000, period: 'yearly', created_by: id('accountant'), created_at: iso(-20) },
    { id: 5, category: 'Security & Maintenance', amount: 12000, period: 'monthly', created_by: id('accountant'), created_at: iso(-15) },
  ];

  const secName = userName(users, id('temple_secretary'));
  const announcements = [
    { id: 1, title: 'Diwali Festival 2026 — Full Schedule', content: 'Join us for five days of celebration. Special pujas at 6 AM and 7 PM daily.', created_by: id('temple_secretary'), is_public: 1, created_at: iso(-12), full_name: secName },
    { id: 2, title: 'Temple Renovation Notice', content: 'West wing closed Nov 1–15. Use south gate entrance.', created_by: id('temple_secretary'), is_public: 1, created_at: iso(-8), full_name: secName },
    { id: 3, title: 'Volunteer Orientation', content: 'New volunteers welcome every Saturday at 10 AM.', created_by: id('temple_secretary'), is_public: 1, created_at: iso(-4), full_name: secName },
    { id: 4, title: 'Navratri Registration Open', content: 'Register for nine nights of Devi puja online or at office.', created_by: id('temple_secretary'), is_public: 1, created_at: iso(-2), full_name: secName },
    { id: 5, title: 'Parking Guidelines — Festival Season', content: 'Please use Lot B during Diwali week.', created_by: id('temple_secretary'), is_public: 1, created_at: iso(-1), full_name: secName },
  ];

  const temple_records = [
    { id: 1, title: 'Annual Audit Report 2025', content: 'Financial audit completed with clean opinion.', record_type: 'administrative', category: 'Finance', created_by: id('temple_secretary'), created_at: iso(-40), full_name: secName },
    { id: 2, title: 'Temple Trust Deed', content: 'Registered trust documentation on file.', record_type: 'legal', category: 'Legal', created_by: id('temple_secretary'), created_at: iso(-90), full_name: secName },
    { id: 3, title: 'Festival Permit 2026', content: 'Municipal permit for public gatherings.', record_type: 'administrative', category: 'Events', created_by: id('temple_secretary'), created_at: iso(-15), full_name: secName },
    { id: 4, title: 'Insurance Policy Renewal', content: 'Property insurance valid through Dec 2026.', record_type: 'administrative', category: 'Finance', created_by: id('temple_secretary'), created_at: iso(-10), full_name: secName },
  ];

  const correspondence = [
    { id: 1, subject: 'Festival Budget Review', content: 'Please review allocations before trustee meeting.', party: 'Trust Board', from_user: id('temple_secretary'), to_role: 'treasurer', is_read: 0, created_at: iso(-6), full_name: secName },
    { id: 2, subject: 'Volunteer Schedule Q4', content: 'Updated volunteer roster attached.', party: 'Volunteer Team', from_user: id('temple_secretary'), to_role: 'volunteer_coordinator', is_read: 0, created_at: iso(-4), full_name: secName },
    { id: 3, subject: 'Ritual Calendar Sync', content: 'Align priest schedule with Diwali events.', party: 'Head Priest Office', from_user: id('temple_secretary'), to_role: 'head_priest', is_read: 1, created_at: iso(-8), full_name: secName },
    { id: 4, subject: 'Inventory Restock Request', content: 'Ghee and camphor below minimum.', party: 'Inventory', from_user: id('temple_secretary'), to_role: 'inventory_manager', is_read: 0, created_at: iso(-2), full_name: secName },
  ];

  const memberName = userName(users, id('member'));
  const approvals = [
    { id: 1, title: 'Facility booking — Dec 15', summary: 'Hall booking for family function', entity_type: 'member_request', entity_id: 1, requested_by: id('member'), approved_by: null, status: 'pending', notes: '', created_at: iso(-2), requester: memberName, full_name: memberName },
    { id: 2, title: 'Electricity bill ₱8,500', summary: 'Monthly utilities expense', entity_type: 'financial_transaction', entity_id: 1, requested_by: id('accountant'), approved_by: null, status: 'pending', notes: '', created_at: iso(-3), requester: userName(users, id('accountant')), full_name: userName(users, id('accountant')) },
    { id: 3, title: 'Ritual Archana approval', summary: 'Scheduled ritual for devotee', entity_type: 'ritual_request', entity_id: 2, requested_by: id('ritual_coordinator'), approved_by: id('head_priest'), status: 'approved', notes: '', created_at: iso(-7), requester: userName(users, id('ritual_coordinator')), full_name: userName(users, id('ritual_coordinator')) },
    { id: 4, title: 'Cleaning supplies ₱1,200', summary: 'Maintenance supplies', entity_type: 'financial_transaction', entity_id: 4, requested_by: id('accountant'), approved_by: null, status: 'pending', notes: '', created_at: iso(-1), requester: userName(users, id('accountant')), full_name: userName(users, id('accountant')) },
    { id: 5, title: 'Special prayer request', summary: 'Anniversary prayer', entity_type: 'member_request', entity_id: 2, requested_by: id('member'), approved_by: id('temple_administrator'), status: 'approved', notes: '', created_at: iso(-8), requester: memberName, full_name: memberName },
    { id: 6, title: 'Priest stipend ₱2,800', summary: 'October stipend', entity_type: 'financial_transaction', entity_id: 7, requested_by: id('accountant'), approved_by: null, status: 'pending', notes: '', created_at: iso(-2), requester: userName(users, id('accountant')), full_name: userName(users, id('accountant')) },
  ];

  const member_requests = [
    { id: 1, member_id: id('member'), subject: 'Facility booking', request_type: 'facility_booking', description: 'Request main hall for family function Dec 15', status: 'pending', reviewed_by: null, created_at: iso(-2) },
    { id: 2, member_id: id('member'), subject: 'Anniversary prayer', request_type: 'special_prayer', description: 'Silver anniversary prayer booking', status: 'approved', reviewed_by: id('temple_administrator'), created_at: iso(-8) },
    { id: 3, member_id: uid(22), subject: 'Parking pass', request_type: 'parking', description: 'Monthly parking for member', status: 'pending', reviewed_by: null, created_at: iso(-4) },
    { id: 4, member_id: id('member'), subject: 'Youth program', request_type: 'program', description: 'Register son for cultural program', status: 'approved', reviewed_by: id('temple_administrator'), created_at: iso(-6) },
  ];

  const visit_registrations = [
    { id: 1, visitor_id: id('visitor'), visit_date: dateOnly(0), visit_time: '09:30:00', purpose: 'Temple tour', status: 'completed', checked_in: 1, created_at: iso(-1) },
    { id: 2, visitor_id: id('visitor'), visit_date: dateOnly(0), visit_time: '14:00:00', purpose: 'Puja attendance', status: 'pending', checked_in: 0, created_at: iso(0) },
    { id: 3, visitor_id: uid(21), visit_date: dateOnly(0), visit_time: '11:00:00', purpose: 'Darshan', status: 'pending', checked_in: 0, created_at: iso(0) },
    { id: 4, visitor_id: id('devotee'), visit_date: dateOnly(1), visit_time: '10:00:00', purpose: 'Ritual consultation', status: 'pending', checked_in: 0, created_at: iso(-1) },
    { id: 5, visitor_id: uid(22), visit_date: dateOnly(0), visit_time: '16:30:00', purpose: 'Event registration', status: 'completed', checked_in: 1, created_at: iso(-2) },
    { id: 6, visitor_id: id('visitor'), visit_date: dateOnly(3), visit_time: '10:00:00', purpose: 'Open house tour', status: 'pending', checked_in: 0, created_at: iso(0) },
  ];

  const volunteer_tasks = [
    { id: 1, title: 'Diwali Hall Decoration', description: 'Setup lights and marigold garlands', coordinator_id: id('volunteer_coordinator'), volunteer_id: id('volunteer'), event_id: 1, status: 'in_progress', due_date: dateOnly(12), created_at: iso(-8) },
    { id: 2, title: 'Annadanam Food Prep', description: 'Kitchen assistance for community meal', coordinator_id: id('volunteer_coordinator'), volunteer_id: id('volunteer'), event_id: null, status: 'assigned', due_date: dateOnly(14), created_at: iso(-6) },
    { id: 3, title: 'Festival Parking', description: 'Direct vehicles to Lot B', coordinator_id: id('volunteer_coordinator'), volunteer_id: uid(23), event_id: 1, status: 'assigned', due_date: dateOnly(14), created_at: iso(-5) },
    { id: 4, title: 'Prayer Hall Cleaning', description: 'Weekly deep clean', coordinator_id: id('volunteer_coordinator'), volunteer_id: id('volunteer'), event_id: null, status: 'completed', due_date: dateOnly(-2), created_at: iso(-12) },
    { id: 5, title: 'Bhajan Setup', description: 'Sound check and seating', coordinator_id: id('volunteer_coordinator'), volunteer_id: uid(23), event_id: 2, status: 'pending', due_date: dateOnly(7), created_at: iso(-3) },
    { id: 6, title: 'Visitor Welcome Desk', description: 'Open house greeting', coordinator_id: id('volunteer_coordinator'), volunteer_id: null, event_id: 5, status: 'pending', due_date: dateOnly(3), created_at: iso(-2) },
  ];

  const education_classes = [
    { id: 1, title: 'Sanskrit Basics — Level 1', description: 'Introduction to Devanagari script', coordinator_id: id('education_coordinator'), teacher_id: id('teacher_instructor'), schedule: 'Saturday 10:00 AM', schedule_day: 'Saturday', schedule_time: '10:00:00', capacity: 25, status: 'active', created_at: iso(-30) },
    { id: 2, title: 'Bhagavad Gita Study', description: 'Chapter-wise weekly study', coordinator_id: id('education_coordinator'), teacher_id: id('teacher_instructor'), schedule: 'Sunday 9:00 AM', schedule_day: 'Sunday', schedule_time: '09:00:00', capacity: 30, status: 'active', created_at: iso(-25) },
    { id: 3, title: 'Children\'s Moral Stories', description: 'Ages 6–12', coordinator_id: id('education_coordinator'), teacher_id: id('teacher_instructor'), schedule: 'Saturday 2:00 PM', schedule_day: 'Saturday', schedule_time: '14:00:00', capacity: 20, status: 'active', created_at: iso(-15) },
    { id: 4, title: 'Temple Priest Training', description: 'Advanced ritual training', coordinator_id: id('education_coordinator'), teacher_id: id('head_priest'), schedule: 'Friday 6:00 AM', schedule_day: 'Friday', schedule_time: '06:00:00', capacity: 5, status: 'active', created_at: iso(-10) },
  ];

  const class_attendance = [
    { id: 1, class_id: 1, student_id: id('member'), attendance_date: dateOnly(-7), present: 1, recorded_by: id('teacher_instructor') },
    { id: 2, class_id: 1, student_id: id('devotee'), attendance_date: dateOnly(-7), present: 1, recorded_by: id('teacher_instructor') },
    { id: 3, class_id: 1, student_id: uid(21), attendance_date: dateOnly(-7), present: 1, recorded_by: id('teacher_instructor') },
    { id: 4, class_id: 2, student_id: id('member'), attendance_date: dateOnly(-3), present: 1, recorded_by: id('teacher_instructor') },
    { id: 5, class_id: 2, student_id: uid(22), attendance_date: dateOnly(-3), present: 0, recorded_by: id('teacher_instructor') },
    { id: 6, class_id: 3, student_id: uid(22), attendance_date: dateOnly(-1), present: 1, recorded_by: id('teacher_instructor') },
    { id: 7, class_id: 1, student_id: id('member'), attendance_date: dateOnly(0), present: 0, recorded_by: id('teacher_instructor') },
    { id: 8, class_id: 2, student_id: id('devotee'), attendance_date: dateOnly(0), present: 1, recorded_by: id('teacher_instructor') },
  ];

  const student_progress = [
    { id: 1, class_id: 1, student_id: id('member'), assessment: 'Mid-term', grade: 'A', teacher_id: id('teacher_instructor'), notes: 'Excellent participation', created_at: iso(-6) },
    { id: 2, class_id: 1, student_id: id('devotee'), assessment: 'Mid-term', grade: 'B+', teacher_id: id('teacher_instructor'), notes: 'Improving', created_at: iso(-6) },
    { id: 3, class_id: 2, student_id: id('member'), assessment: 'Quiz 1', grade: 'A-', teacher_id: id('teacher_instructor'), notes: '', created_at: iso(-4) },
    { id: 4, class_id: 2, student_id: id('devotee'), assessment: 'Quiz 1', grade: 'B', teacher_id: id('teacher_instructor'), notes: '', created_at: iso(-4) },
    { id: 5, class_id: 3, student_id: uid(22), assessment: 'Story recital', grade: 'A+', teacher_id: id('teacher_instructor'), notes: 'Outstanding', created_at: iso(-2) },
  ];

  const inventory_items = [
    { id: 1, name: 'Pure Ghee', category: 'Ritual', quantity: 8, min_stock: 15, unit: 'kg', manager_id: id('inventory_manager'), updated_at: iso(-1) },
    { id: 2, name: 'Camphor', category: 'Ritual', quantity: 50, min_stock: 20, unit: 'pcs', manager_id: id('inventory_manager'), updated_at: iso(-2) },
    { id: 3, name: 'Flower Garlands', category: 'Decoration', quantity: 30, min_stock: 10, unit: 'pcs', manager_id: id('inventory_manager'), updated_at: iso(0) },
    { id: 4, name: 'Incense Sticks', category: 'Ritual', quantity: 200, min_stock: 50, unit: 'pcs', manager_id: id('inventory_manager'), updated_at: iso(-3) },
    { id: 5, name: 'Coconut Oil', category: 'Ritual', quantity: 6, min_stock: 10, unit: 'L', manager_id: id('inventory_manager'), updated_at: iso(-1) },
    { id: 6, name: 'Rice (Annadanam)', category: 'Kitchen', quantity: 40, min_stock: 25, unit: 'kg', manager_id: id('inventory_manager'), updated_at: iso(-2) },
    { id: 7, name: 'Brass Lamps', category: 'Equipment', quantity: 12, min_stock: 8, unit: 'pcs', manager_id: id('inventory_manager'), updated_at: iso(-5) },
    { id: 8, name: 'Cleaning Detergent', category: 'Maintenance', quantity: 4, min_stock: 6, unit: 'bottles', manager_id: id('inventory_manager'), updated_at: iso(-1) },
  ];

  const inventory_usage = [
    { id: 1, item_id: 1, quantity_used: 3, used_by: id('priest'), purpose: 'Daily puja', created_at: iso(-1), item_name: 'Pure Ghee' },
    { id: 2, item_id: 2, quantity_used: 15, used_by: id('priest'), purpose: 'Morning & evening aarti', created_at: iso(-2), item_name: 'Camphor' },
    { id: 3, item_id: 3, quantity_used: 20, used_by: id('volunteer'), purpose: 'Diwali decoration', created_at: iso(-3), item_name: 'Flower Garlands' },
    { id: 4, item_id: 4, quantity_used: 50, used_by: id('priest'), purpose: 'Weekly services', created_at: iso(-4), item_name: 'Incense Sticks' },
    { id: 5, item_id: 6, quantity_used: 10, used_by: id('volunteer_coordinator'), purpose: 'Annadanam prep', created_at: iso(-2), item_name: 'Rice (Annadanam)' },
    { id: 6, item_id: 5, quantity_used: 2, used_by: id('inventory_manager'), purpose: 'Lamp maintenance', created_at: iso(-1), item_name: 'Coconut Oil' },
  ];

  const maintenance_records = [
    { id: 1, title: 'Leaking tap — kitchen', description: 'Water leak near prep area', location: 'Kitchen', status: 'open', priority: 'high', reported_by: id('maintenance_staff'), assigned_to: id('maintenance_staff'), created_at: iso(-3), completed_at: null },
    { id: 2, title: 'AC unit service', description: 'Annual servicing main hall', location: 'Main Hall', status: 'in_progress', priority: 'medium', reported_by: id('temple_administrator'), assigned_to: id('maintenance_staff'), created_at: iso(-8), completed_at: null },
    { id: 3, title: 'Entrance paint touch-up', description: 'Peeling paint near doors', location: 'Entrance', status: 'completed', priority: 'low', reported_by: id('maintenance_staff'), assigned_to: id('maintenance_staff'), created_at: iso(-18), completed_at: iso(-12) },
    { id: 4, title: 'Broken bench — prayer hall', description: 'Loose leg on row 3', location: 'Prayer Hall', status: 'open', priority: 'medium', reported_by: id('security_guard'), assigned_to: id('maintenance_staff'), created_at: iso(-2), completed_at: null },
    { id: 5, title: 'Gutter cleaning', description: 'Monsoon prep', location: 'Roof', status: 'in_progress', priority: 'high', reported_by: id('maintenance_staff'), assigned_to: id('maintenance_staff'), created_at: iso(-6), completed_at: null },
    { id: 6, title: 'Lighting repair', description: 'Flickering lights west wing', location: 'West Wing', status: 'open', priority: 'medium', reported_by: id('temple_secretary'), assigned_to: id('maintenance_staff'), created_at: iso(-1), completed_at: null },
  ];

  const guardName = userName(users, id('security_guard'));
  const security_incidents = [
    { id: 1, title: 'Unauthorized parking', description: 'Vehicle in reserved priest spot', location: 'Parking Lot A', severity: 'low', reported_by: id('security_guard'), status: 'resolved', created_at: iso(-5), full_name: guardName },
    { id: 2, title: 'Visitor without registration', description: 'Walk-in at east gate', location: 'East Gate', severity: 'medium', reported_by: id('security_guard'), status: 'open', created_at: iso(-2), full_name: guardName },
    { id: 3, title: 'Lost item report', description: 'Wallet found in prayer hall', location: 'Prayer Hall', severity: 'low', reported_by: id('security_guard'), status: 'resolved', created_at: iso(-8), full_name: guardName },
    { id: 4, title: 'Crowd overflow', description: 'Diwali prep — extra marshalling needed', location: 'Main Hall entrance', severity: 'medium', reported_by: id('security_guard'), status: 'open', created_at: iso(-1), full_name: guardName },
  ];

  const notifications = [
    { id: 1, user_id: id('ritual_coordinator'), message: 'New ritual request: Abhishekam', link: '/ritual-coordinator/requests', read_at: null, created_at: iso(-4) },
    { id: 2, user_id: id('donation_manager'), message: 'New donation ₱5,100 — Srinivas Rao', link: '/donation-manager/donations', read_at: null, created_at: iso(-10) },
    { id: 3, user_id: id('treasurer'), message: '3 transactions pending approval', link: '/treasurer/finances', read_at: null, created_at: iso(-2) },
    { id: 4, user_id: id('volunteer'), message: 'Task assigned: Diwali Hall Decoration', link: '/volunteer/tasks', read_at: null, created_at: iso(-7) },
    { id: 5, user_id: id('priest'), message: 'Ritual assigned: Archana on ' + dateOnly(10), link: '/priest/rituals', read_at: null, created_at: iso(-7) },
    { id: 6, user_id: id('head_priest'), message: '2 rituals awaiting approval', link: '/head-priest/ritual-approval', read_at: null, created_at: iso(-3) },
    { id: 7, user_id: id('temple_administrator'), message: '4 pending approvals', link: '/temple-administrator/approvals', read_at: null, created_at: iso(-2) },
    { id: 8, user_id: id('event_manager'), message: '10 registrations for Diwali', link: '/event-manager/registrations', read_at: null, created_at: iso(-5) },
    { id: 9, user_id: id('inventory_manager'), message: 'Low stock: Pure Ghee (8/15 kg)', link: '/inventory-manager/stock', read_at: null, created_at: iso(-1) },
    { id: 10, user_id: id('maintenance_staff'), message: 'New repair: Leaking tap', link: '/maintenance-staff/tasks', read_at: null, created_at: iso(-3) },
    { id: 11, user_id: id('security_guard'), message: '2 open security incidents', link: '/security-guard/incidents', read_at: null, created_at: iso(-1) },
    { id: 12, user_id: id('teacher_instructor'), message: 'Attendance due for Sanskrit class', link: '/teacher-instructor/attendance', read_at: null, created_at: iso(-2) },
    { id: 13, user_id: id('member'), message: 'Your facility request is pending', link: '/member/requests', read_at: null, created_at: iso(-2) },
    { id: 14, user_id: id('devotee'), message: 'Donation received — thank you!', link: '/devotee/donate', read_at: iso(-5), created_at: iso(-10) },
    { id: 15, user_id: id('super_admin'), message: 'System demo data loaded (v2)', link: '/super-admin/system-control', read_at: null, created_at: iso(0) },
  ];

  const store: TMSStore = {
    version: SEED_VERSION,
    users,
    counters: {
      users: users.length,
      donations: donations.length,
      ritual_requests: ritual_requests.length,
      worship_schedules: worship_schedules.length,
      worship_records: worship_records.length,
      events: events.length,
      event_registrations: event_registrations.length,
      financial_transactions: financial_transactions.length,
      budgets: budgets.length,
      announcements: announcements.length,
      temple_records: temple_records.length,
      correspondence: correspondence.length,
      approvals: approvals.length,
      member_requests: member_requests.length,
      visit_registrations: visit_registrations.length,
      volunteer_tasks: volunteer_tasks.length,
      education_classes: education_classes.length,
      class_attendance: class_attendance.length,
      student_progress: student_progress.length,
      inventory_items: inventory_items.length,
      inventory_usage: inventory_usage.length,
      maintenance_records: maintenance_records.length,
      security_incidents: security_incidents.length,
      activity_log: 0,
      notifications: notifications.length,
    },
    donations,
    ritual_requests,
    worship_schedules,
    worship_records,
    events,
    event_registrations,
    financial_transactions,
    budgets,
    announcements,
    temple_records,
    correspondence,
    approvals,
    member_requests,
    visit_registrations,
    volunteer_tasks,
    education_classes,
    class_attendance,
    student_progress,
    inventory_items,
    inventory_usage,
    maintenance_records,
    security_incidents,
    activity_log: [],
    notifications,
    temple_settings: {
      temple_name: 'Shree Temple Management System',
      temple_address: '123 Sacred Street, Devotion City, Metro Manila, Philippines',
      opening_hours: '5:00 AM – 9:00 PM daily',
      contact_email: 'info@gmail.com',
      contact_phone: '+63 917 654 3210',
      diwali_dates: 'Nov 1–5, 2026',
      parking_info: 'Use Lot B during festivals',
    },
  };

  const entityLabels: Record<string, string> = {
    user: 'User', donation: 'Donation', ritual_request: 'Ritual', event: 'Event',
    financial_transaction: 'Transaction', announcement: 'Announcement', approval: 'Approval',
    visit_registration: 'Visit', maintenance_record: 'Maintenance', inventory_item: 'Inventory',
    education_class: 'Class', class_attendance: 'Attendance', temple_setting: 'Settings',
    security_incident: 'Security', worship_schedule: 'Worship Schedule', worship_record: 'Worship Service',
    member_requests: 'Member Request', volunteer_tasks: 'Volunteer Task', event_registration: 'Event Registration',
    inventory_usage: 'Inventory Usage', budgets: 'Budget', temple_records: 'Temple Record',
    correspondence: 'Correspondence', student_progress: 'Student Progress',
  };

  const logs: { user_id: number; role: RoleKey; action: string; entity_type: string; entity_id: number | null; summary: string }[] = [
    { user_id: id('super_admin'), role: 'super_admin', action: 'update', entity_type: 'temple_setting', entity_id: null, summary: 'Demo dataset v2 initialized' },
    { user_id: id('temple_secretary'), role: 'temple_secretary', action: 'create', entity_type: 'announcement', entity_id: 1, summary: 'Published: Diwali Festival 2026' },
    { user_id: id('devotee'), role: 'devotee', action: 'create', entity_type: 'donation', entity_id: 1, summary: 'Donated ₱5,100.00 — temple building fund' },
    { user_id: id('devotee'), role: 'devotee', action: 'create', entity_type: 'ritual_request', entity_id: 1, summary: 'Booked ritual: Abhishekam' },
    { user_id: id('event_manager'), role: 'event_manager', action: 'create', entity_type: 'event', entity_id: 1, summary: 'Created event: Diwali Mahotsav 2026' },
    { user_id: id('accountant'), role: 'accountant', action: 'create', entity_type: 'financial_transaction', entity_id: 1, summary: 'Recorded expense ₱8,500 — utilities' },
    { user_id: id('treasurer'), role: 'treasurer', action: 'approve', entity_type: 'financial_transaction', entity_id: 2, summary: 'Approved flowers expense ₱3,200' },
    { user_id: id('priest'), role: 'priest', action: 'create', entity_type: 'worship_record', entity_id: 1, summary: 'Recorded Morning Aarti — 45 attendees' },
    { user_id: id('volunteer_coordinator'), role: 'volunteer_coordinator', action: 'create', entity_type: 'volunteer_tasks', entity_id: 1, summary: 'Task: Diwali Hall Decoration' },
    { user_id: id('member'), role: 'member', action: 'create', entity_type: 'member_requests', entity_id: 1, summary: 'Facility booking request — Dec 15' },
    { user_id: id('visitor'), role: 'visitor', action: 'create', entity_type: 'visit_registration', entity_id: 1, summary: 'Registered temple tour visit' },
    { user_id: id('security_guard'), role: 'security_guard', action: 'update', entity_type: 'visit_registration', entity_id: 1, summary: 'Checked in visitor' },
    { user_id: id('maintenance_staff'), role: 'maintenance_staff', action: 'create', entity_type: 'maintenance_records', entity_id: 1, summary: 'Report: Leaking tap — kitchen' },
    { user_id: id('inventory_manager'), role: 'inventory_manager', action: 'create', entity_type: 'inventory_items', entity_id: 1, summary: 'Stock alert: Pure Ghee below minimum' },
    { user_id: id('education_coordinator'), role: 'education_coordinator', action: 'create', entity_type: 'education_classes', entity_id: 1, summary: 'Class opened: Sanskrit Basics' },
    { user_id: id('teacher_instructor'), role: 'teacher_instructor', action: 'create', entity_type: 'class_attendance', entity_id: 1, summary: 'Recorded class attendance' },
    { user_id: id('ritual_coordinator'), role: 'ritual_coordinator', action: 'update', entity_type: 'ritual_request', entity_id: 2, summary: 'Scheduled Archana — Pandit Venkat' },
    { user_id: id('head_priest'), role: 'head_priest', action: 'approve', entity_type: 'ritual_request', entity_id: 3, summary: 'Approved Homa ceremony' },
    { user_id: id('donation_manager'), role: 'donation_manager', action: 'create', entity_type: 'donation', entity_id: 2, summary: 'Recorded donation ₱2,500 — Ananya Iyer' },
    { user_id: id('temple_administrator'), role: 'temple_administrator', action: 'approve', entity_type: 'approval', entity_id: 5, summary: 'Approved member prayer request' },
    { user_id: uid(21), role: 'devotee', action: 'create', entity_type: 'donation', entity_id: 3, summary: 'Maria Santos donated ₱1,000 annadanam' },
    { user_id: uid(22), role: 'member', action: 'register', entity_type: 'event_registration', entity_id: 3, summary: 'James Lim registered for Diwali' },
    { user_id: uid(23), role: 'volunteer', action: 'update', entity_type: 'volunteer_tasks', entity_id: 3, summary: 'Elena Cruz assigned festival parking' },
    { user_id: id('head_priest'), role: 'head_priest', action: 'create', entity_type: 'worship_schedules', entity_id: 6, summary: 'Scheduled Homa linked to ritual #3' },
    { user_id: id('security_guard'), role: 'security_guard', action: 'create', entity_type: 'security_incidents', entity_id: 4, summary: 'Crowd overflow report — Diwali prep' },
  ];

  store.activity_log = logs.map((l, i) => ({
    id: i + 1,
    user_id: l.user_id,
    user_role: l.role,
    action: l.action,
    entity_type: l.entity_type,
    entity_label: entityLabels[l.entity_type] ?? l.entity_type,
    entity_id: l.entity_id,
    summary: l.summary,
    link: '/shared/activity-log',
    created_at: iso(-25 + i),
    actor_name: userName(users, l.user_id),
  }));
  store.counters.activity_log = store.activity_log.length;

  return store;
}
