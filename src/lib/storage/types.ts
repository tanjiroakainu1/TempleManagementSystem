import type { RoleKey } from '@/config/roles';

export interface StoredUser {
  id: number;
  full_name: string;
  email: string;
  password: string;
  phone?: string;
  role: RoleKey;
  status: 'active' | 'inactive';
  created_at: string;
}

export interface TMSStore {
  version: number;
  users: StoredUser[];
  donations: Record<string, unknown>[];
  ritual_requests: Record<string, unknown>[];
  worship_schedules: Record<string, unknown>[];
  worship_records: Record<string, unknown>[];
  events: Record<string, unknown>[];
  event_registrations: Record<string, unknown>[];
  financial_transactions: Record<string, unknown>[];
  budgets: Record<string, unknown>[];
  announcements: Record<string, unknown>[];
  temple_records: Record<string, unknown>[];
  correspondence: Record<string, unknown>[];
  approvals: Record<string, unknown>[];
  member_requests: Record<string, unknown>[];
  visit_registrations: Record<string, unknown>[];
  volunteer_tasks: Record<string, unknown>[];
  education_classes: Record<string, unknown>[];
  class_attendance: Record<string, unknown>[];
  student_progress: Record<string, unknown>[];
  inventory_items: Record<string, unknown>[];
  inventory_usage: Record<string, unknown>[];
  maintenance_records: Record<string, unknown>[];
  security_incidents: Record<string, unknown>[];
  activity_log: Record<string, unknown>[];
  notifications: Record<string, unknown>[];
  temple_settings: Record<string, string>;
  counters: Record<string, number>;
}

export const STORE_KEY = 'tms_store_v1';
export const SESSION_KEY = 'tms_session_user_id';
