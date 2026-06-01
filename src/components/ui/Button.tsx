import { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'danger' | 'outline';

const styles: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-candy-700 to-candy-600 text-white shadow-candy hover:from-candy-800 hover:to-candy-700 hover:shadow-candy-lg',
  secondary: 'bg-gradient-to-r from-candy-500 to-candy-600 text-white hover:from-candy-600 hover:to-candy-700 shadow-sm',
  danger: 'bg-gradient-to-r from-rose-600 to-candy-800 text-white hover:from-rose-700 hover:to-candy-900',
  outline:
    'border-2 border-candy-300 text-candy-800 bg-white hover:bg-candy-50 hover:border-candy-600',
};

export default function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-200 disabled:opacity-50 active:scale-[0.98] min-h-[44px] sm:min-h-[40px] touch-manipulation ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
