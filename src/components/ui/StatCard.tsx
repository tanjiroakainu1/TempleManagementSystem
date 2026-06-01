interface StatCardProps {
  icon: string;
  value: string | number;
  label: string;
  variant?: 'default' | 'green' | 'gold' | 'maroon';
}

const variants = {
  default: 'border-candy-200 bg-gradient-to-br from-white to-candy-50',
  green: 'border-candy-mint/50 bg-gradient-to-br from-candy-mint/40 to-white',
  gold: 'border-candy-200 bg-gradient-to-br from-gold-light to-white',
  maroon: 'border-candy-300 bg-gradient-to-br from-candy-100 to-white shadow-candy',
};

export default function StatCard({ icon, value, label, variant = 'default' }: StatCardProps) {
  return (
    <div className={`rounded-2xl border p-4 sm:p-5 shadow-sm transition hover:shadow-candy min-w-0 ${variants[variant]}`}>
      <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{icon}</div>
      <div className="text-xl sm:text-2xl font-bold text-candy-900 truncate">{value}</div>
      <div className="text-xs sm:text-sm text-candy-700/80 mt-1 font-medium break-words">{label}</div>
    </div>
  );
}
