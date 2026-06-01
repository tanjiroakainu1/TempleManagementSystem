interface Props {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
  light?: boolean;
}

export default function GuestSectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  light = false,
}: Props) {
  const centered = align === 'center';
  return (
    <div className={centered ? 'text-center max-w-2xl mx-auto' : 'max-w-2xl'}>
      <p
        className={`text-xs font-bold uppercase tracking-[0.28em] mb-2 ${
          light ? 'text-candy-200' : 'text-candy-500'
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight ${
          light ? 'text-white' : 'text-candy-900'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 text-sm sm:text-base leading-relaxed ${
            light ? 'text-white/80' : 'text-candy-600'
          } ${centered ? 'mx-auto' : ''}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
