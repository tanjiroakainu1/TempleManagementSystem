import { Link } from 'react-router-dom';
import { DEVELOPER } from '@/config/developer';

interface GuestFooterProps {
  variant?: 'light' | 'dark';
}

export default function GuestFooter({ variant = 'light' }: GuestFooterProps) {
  const dark = variant === 'dark';

  return (
    <footer
      className={`mt-auto border-t px-4 py-8 sm:py-10 ${
        dark ? 'border-white/15 bg-candy-900/50 text-white/70' : 'border-candy-200 bg-white text-candy-600'
      }`}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <p className={`font-display font-bold ${dark ? 'text-white' : 'text-candy-900'}`}>
            🛕 Temple Management System
          </p>
          <p className="text-xs mt-1">
            Crafted by {DEVELOPER.name} · {DEVELOPER.title}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold">
          <Link to="/" className={dark ? 'text-white/90 hover:text-white' : 'text-candy-700 hover:text-candy-900'}>
            Home
          </Link>
          <Link to="/login" className={dark ? 'text-white/90 hover:text-white' : 'text-candy-700 hover:text-candy-900'}>
            Login
          </Link>
          <Link
            to="/register"
            className={dark ? 'text-white/90 hover:text-white' : 'text-candy-700 hover:text-candy-900'}
          >
            Register
          </Link>
        </div>
      </div>
    </footer>
  );
}
