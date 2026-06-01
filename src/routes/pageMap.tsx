import { ComponentType } from 'react';
import DashboardPage from '@/features/pages/DashboardPage';
import ConnectedFeaturePage from '@/features/pages/ConnectedFeaturePage';
import DonatePage from '@/features/pages/DonatePage';
import DonationsManagePage from '@/features/pages/DonationsManagePage';
import BookRitualPage from '@/features/pages/BookRitualPage';
import EventsPage from '@/features/pages/EventsPage';
import UsersPage from '@/features/pages/UsersPage';
import TransactionsPage from '@/features/pages/TransactionsPage';
import AnnouncementsPage from '@/features/pages/AnnouncementsPage';
import ApprovalsPage from '@/features/pages/ApprovalsPage';
import ActivityLogPage from '@/features/pages/ActivityLogPage';

/** Maps URL slug → React page (mirrors PHP *.php files) */
export const PAGE_MAP: Record<string, ComponentType> = {
  dashboard: DashboardPage,
  donate: DonatePage,
  donations: DonationsManagePage, // donation-manager, treasurer
  'book-ritual': BookRitualPage,
  events: EventsPage,
  festivals: () => <EventsPage festival />,
  users: UsersPage,
  transactions: TransactionsPage,
  finances: TransactionsPage,
  announcements: AnnouncementsPage,
  approvals: ApprovalsPage,
  'activity-log': ActivityLogPage,
};

export function resolvePage(slug: string): ComponentType {
  return PAGE_MAP[slug] ?? ConnectedFeaturePage;
}
