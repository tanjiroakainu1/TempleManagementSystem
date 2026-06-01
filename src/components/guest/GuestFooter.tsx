import { Link } from 'react-router-dom';
import { DEVELOPER } from '@/config/developer';

interface GuestFooterProps {
  variant?: 'light' | 'dark';
}

export default function GuestFooter({ variant = 'light' }: GuestFooterProps) {
  const dark = variant === 'dark';

  return (
    <footer
      className={`mt-auto border-t px-4 py-10 sm:py-12 ${
        dark
          ? 'border-white/15 bg-gradient-to-b from-candy-900 to-candy-950 text-white/70'
          : 'border-candy-200 bg-gradient-to-b from-candy-50/50 to-white text-candy-600'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 text-center lg:text-left">
          <div className="max-w-sm">
            <p className={`font-display text-xl font-bold ${dark ? 'text-white' : 'text-candy-900'}`}>
              🛕 Temple Management System
            </p>
            <p className="text-sm mt-2 leading-relaxed">
              Rituals, donations, events, and community — one beautiful ash-gray platform for every
              temple role.
            </p>
            <p className="text-xs mt-4 opacity-80">
              Crafted by <span className="font-semibold">{DEVELOPER.name}</span> · {DEVELOPER.title}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
            <div>
              <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${dark ? 'text-white/50' : 'text-candy-400'}`}>
                Explore
              </p>
              <div className="flex flex-col gap-2 text-sm font-semibold">
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
            <div>
              <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${dark ? 'text-white/50' : 'text-candy-400'}`}>
                Quick start
              </p>
              <p className={`text-xs leading-relaxed max-w-[200px] ${dark ? 'text-white/60' : 'text-candy-500'}`}>
                Demo: admin@gmail.com / admin123 · Other roles use @gmail.com / demo123
              </p>
            </div>
          </div>
        </div>

        <p className={`text-center text-[11px] mt-8 pt-6 border-t ${dark ? 'border-white/10 text-white/40' : 'border-candy-100 text-candy-400'}`}>
          © {new Date().getFullYear()} Temple MS · Built for learning & demonstration
        </p>
      </div>
    </footer>
  );
}
