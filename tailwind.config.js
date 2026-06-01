/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        /** Primary accent — charcoal ash */
        maroon: {
          DEFAULT: '#52525b',
          light: '#71717a',
          dark: '#3f3f46',
        },
        cream: {
          DEFAULT: '#f5f5f4',
          dark: '#e7e5e4',
        },
        gold: {
          DEFAULT: '#a8a29e',
          light: '#d6d3d1',
        },
        /** Ash gray scale (legacy token name `candy` used across UI) */
        candy: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          blush: '#f5f5f4',
          mint: '#ecfdf5',
          lilac: '#f1f5f9',
        },
        ash: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        },
      },
      fontFamily: {
        display: ['Quicksand', 'Nunito', 'system-ui', 'sans-serif'],
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        candy: '0 4px 24px -4px rgba(24, 24, 27, 0.08)',
        'candy-lg': '0 12px 40px -8px rgba(24, 24, 27, 0.14)',
      },
      backgroundImage: {
        'candy-mesh':
          'radial-gradient(at 20% 20%, #e7e5e4 0, transparent 50%), radial-gradient(at 80% 0%, #f5f5f4 0, transparent 45%), radial-gradient(at 50% 100%, #d6d3d1 0, transparent 50%)',
      },
      maxWidth: {
        '8xl': '96rem',
      },
    },
  },
  plugins: [],
};
