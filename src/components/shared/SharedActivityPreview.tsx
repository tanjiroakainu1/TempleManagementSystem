import { APP_PRIVACY } from '@/config/privacy';

interface Props {
  version: number;
  maxRows?: number;
}

/** Hidden from UI by default — activity still logs in the background */
export default function SharedActivityPreview(_props: Props) {
  if (!APP_PRIVACY.showSharedActivityPreview) return null;
  return null;
}
