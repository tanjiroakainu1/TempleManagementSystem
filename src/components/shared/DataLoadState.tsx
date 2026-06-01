interface Props {
  loading?: boolean;
  error?: string;
  empty?: boolean;
  emptyMessage?: string;
  children?: React.ReactNode;
}

/** Standard loading / error / empty wrapper for localStorage-backed lists */
export default function DataLoadState({
  loading,
  error,
  empty,
  emptyMessage = 'No records yet.',
  children,
}: Props) {
  if (loading) {
    return <p className="text-center text-candy-500 py-10 font-medium">Loading…</p>;
  }
  if (error) {
    return (
      <div className="rounded-xl bg-rose-50 border-2 border-rose-200 text-rose-800 px-4 py-3 text-sm text-center">
        {error}
        <p className="text-xs mt-1 text-rose-600">Try signing out and back in, or reset demo data in Temple Settings.</p>
      </div>
    );
  }
  if (empty) {
    return <p className="text-center text-candy-500 py-10">{emptyMessage}</p>;
  }
  return <>{children}</>;
}
