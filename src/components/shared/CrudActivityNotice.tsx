import { CRUD_SUCCESS_MSG } from '@/config/privacy';

export default function CrudActivityNotice({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="rounded-xl bg-gradient-to-r from-candy-mint/60 to-candy-50 border-2 border-candy-200 text-candy-900 px-4 py-3 text-sm font-medium shadow-sm">
      {message || CRUD_SUCCESS_MSG}
    </div>
  );
}

/** Message to use after CRUD — never exposes storage internals */
export function crudSuccessMessage(): string {
  return CRUD_SUCCESS_MSG;
}
