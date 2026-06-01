import { APP_PRIVACY } from '@/config/privacy';

export default function LocalStorageBadge() {
  if (!APP_PRIVACY.showStorageBadge) return null;
  return null;
}
