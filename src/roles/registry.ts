import type { ComponentType } from 'react';
import type { RoleKey } from '@/config/roles';
import { rolePages as superAdminPages } from './super-admin/routes';
import { rolePages as templeAdministratorPages } from './temple-administrator/routes';
import { rolePages as headPriestPages } from './head-priest/routes';
import { rolePages as priestPages } from './priest/routes';
import { rolePages as templeSecretaryPages } from './temple-secretary/routes';
import { rolePages as treasurerPages } from './treasurer/routes';
import { rolePages as accountantPages } from './accountant/routes';
import { rolePages as donationManagerPages } from './donation-manager/routes';
import { rolePages as eventManagerPages } from './event-manager/routes';
import { rolePages as volunteerCoordinatorPages } from './volunteer-coordinator/routes';
import { rolePages as volunteerPages } from './volunteer/routes';
import { rolePages as memberPages } from './member/routes';
import { rolePages as devoteePages } from './devotee/routes';
import { rolePages as visitorPages } from './visitor/routes';
import { rolePages as ritualCoordinatorPages } from './ritual-coordinator/routes';
import { rolePages as educationCoordinatorPages } from './education-coordinator/routes';
import { rolePages as teacherInstructorPages } from './teacher-instructor/routes';
import { rolePages as inventoryManagerPages } from './inventory-manager/routes';
import { rolePages as maintenanceStaffPages } from './maintenance-staff/routes';
import { rolePages as securityGuardPages } from './security-guard/routes';

/** Central map: role → slug → dedicated page component */
export const ROLE_PAGE_REGISTRY: Record<RoleKey, Record<string, ComponentType>> = {
  super_admin: superAdminPages,
  temple_administrator: templeAdministratorPages,
  head_priest: headPriestPages,
  priest: priestPages,
  temple_secretary: templeSecretaryPages,
  treasurer: treasurerPages,
  accountant: accountantPages,
  donation_manager: donationManagerPages,
  event_manager: eventManagerPages,
  volunteer_coordinator: volunteerCoordinatorPages,
  volunteer: volunteerPages,
  member: memberPages,
  devotee: devoteePages,
  visitor: visitorPages,
  ritual_coordinator: ritualCoordinatorPages,
  education_coordinator: educationCoordinatorPages,
  teacher_instructor: teacherInstructorPages,
  inventory_manager: inventoryManagerPages,
  maintenance_staff: maintenanceStaffPages,
  security_guard: securityGuardPages,
};

export function resolveRolePage(role: RoleKey, slug: string): ComponentType | undefined {
  return ROLE_PAGE_REGISTRY[role]?.[slug];
}
