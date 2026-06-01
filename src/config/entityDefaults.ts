import type { EntityTable } from '@/lib/storage/services';
import type { EntityPageConfig } from './rolePageConfig';

/** Default columns + create form when rolePageConfig omits them */
export const ENTITY_TABLE_DEFAULTS: Partial<
  Record<EntityTable, Pick<EntityPageConfig, 'formFields' | 'columns'>>
> = {
  worship_schedules: {
    formFields: [
      { name: 'service_type', label: 'Service / Ceremony' },
      { name: 'schedule_date', label: 'Date', type: 'date' },
      { name: 'schedule_time', label: 'Time', type: 'time' },
      { name: 'priest_id', label: 'Priest user ID', type: 'number' },
      { name: 'notes', label: 'Notes' },
    ],
    columns: [
      { key: 'service_type', label: 'Service' },
      { key: 'schedule_date', label: 'Date', format: 'date' },
      { key: 'schedule_time', label: 'Time' },
      { key: 'status', label: 'Status', format: 'badge' },
    ],
  },
  worship_records: {
    formFields: [
      { name: 'service_type', label: 'Service Type' },
      { name: 'service_date', label: 'Service Date', type: 'date' },
      { name: 'attendees', label: 'Attendees', type: 'number' },
      { name: 'notes', label: 'Notes' },
    ],
    columns: [
      { key: 'service_type', label: 'Service' },
      { key: 'service_date', label: 'Date', format: 'date' },
      { key: 'attendees', label: 'Attendees' },
      { key: 'notes', label: 'Notes' },
    ],
  },
  event_registrations: {
    formFields: [
      { name: 'event_id', label: 'Event ID', type: 'number' },
      { name: 'user_id', label: 'Member user ID (optional)', type: 'number' },
    ],
    columns: [
      { key: 'event_id', label: 'Event' },
      { key: 'user_id', label: 'User' },
      { key: 'registered_at', label: 'Registered', format: 'datetime' },
    ],
  },
  volunteer_tasks: {
    formFields: [
      { name: 'title', label: 'Task Title' },
      { name: 'description', label: 'Description' },
      { name: 'volunteer_id', label: 'Volunteer user ID', type: 'number' },
      { name: 'due_date', label: 'Due Date', type: 'date' },
      { name: 'status', label: 'Status' },
    ],
    columns: [
      { key: 'title', label: 'Task' },
      { key: 'status', label: 'Status', format: 'badge' },
      { key: 'due_date', label: 'Due', format: 'date' },
      { key: 'volunteer_id', label: 'Volunteer' },
    ],
  },
  maintenance_records: {
    formFields: [
      { name: 'title', label: 'Title' },
      { name: 'description', label: 'Description' },
      { name: 'location', label: 'Location' },
      { name: 'priority', label: 'Priority' },
    ],
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'location', label: 'Location' },
      { key: 'status', label: 'Status', format: 'badge' },
      { key: 'priority', label: 'Priority', format: 'badge' },
    ],
  },
  inventory_usage: {
    formFields: [
      { name: 'item_id', label: 'Item ID', type: 'number' },
      { name: 'quantity_used', label: 'Quantity Used', type: 'number' },
      { name: 'purpose', label: 'Purpose' },
    ],
    columns: [
      { key: 'item_name', label: 'Item' },
      { key: 'quantity_used', label: 'Qty' },
      { key: 'purpose', label: 'Purpose' },
      { key: 'created_at', label: 'When', format: 'datetime' },
    ],
  },
  class_attendance: {
    formFields: [
      { name: 'class_id', label: 'Class ID', type: 'number' },
      { name: 'student_id', label: 'Student user ID', type: 'number' },
      { name: 'attendance_date', label: 'Date', type: 'date' },
      { name: 'present', label: 'Present (1=yes, 0=no)', type: 'number' },
    ],
    columns: [
      { key: 'class_id', label: 'Class' },
      { key: 'student_id', label: 'Student' },
      { key: 'attendance_date', label: 'Date', format: 'date' },
      { key: 'present', label: 'Present' },
    ],
  },
  student_progress: {
    formFields: [
      { name: 'class_id', label: 'Class ID', type: 'number' },
      { name: 'student_id', label: 'Student user ID', type: 'number' },
      { name: 'assessment', label: 'Assessment' },
      { name: 'grade', label: 'Grade' },
      { name: 'notes', label: 'Notes' },
    ],
    columns: [
      { key: 'class_id', label: 'Class' },
      { key: 'student_id', label: 'Student' },
      { key: 'assessment', label: 'Assessment' },
      { key: 'grade', label: 'Grade' },
    ],
  },
  member_requests: {
    formFields: [
      { name: 'subject', label: 'Subject' },
      { name: 'request_type', label: 'Type (e.g. facility_booking)' },
      { name: 'description', label: 'Details' },
    ],
    columns: [
      { key: 'subject', label: 'Subject' },
      { key: 'request_type', label: 'Type', format: 'badge' },
      { key: 'status', label: 'Status', format: 'badge' },
      { key: 'created_at', label: 'Submitted', format: 'datetime' },
    ],
  },
  visit_registrations: {
    columns: [
      { key: 'visit_date', label: 'Date', format: 'date' },
      { key: 'visit_time', label: 'Time' },
      { key: 'purpose', label: 'Purpose' },
      { key: 'status', label: 'Status', format: 'badge' },
    ],
  },
  education_classes: {
    formFields: [
      { name: 'title', label: 'Class Title' },
      { name: 'schedule', label: 'Schedule' },
      { name: 'capacity', label: 'Capacity', type: 'number' },
      { name: 'description', label: 'Description' },
    ],
    columns: [
      { key: 'title', label: 'Class' },
      { key: 'schedule', label: 'Schedule' },
      { key: 'capacity', label: 'Capacity' },
      { key: 'status', label: 'Status', format: 'badge' },
    ],
  },
};

/** Slugs that only view data (no create/delete) */
export const ENTITY_READ_ONLY_SLUGS = new Set([
  'donors',
  'volunteers',
  'priests',
  'info',
  'operations',
  'statements',
  'public-info',
  'member-activities',
  'volunteer-activities',
  'stock',
]);

/** Custom loaders that are filters on a table — still allow CRUD on that table */
export const CUSTOM_TABLE_FILTERS: Record<string, { table: EntityTable; filter: (row: Record<string, unknown>, userId: number) => boolean }> = {
  'my-schedule': {
    table: 'worship_schedules',
    filter: (row, userId) => Number(row.priest_id) === userId,
  },
};
