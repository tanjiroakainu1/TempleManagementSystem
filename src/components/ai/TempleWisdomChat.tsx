import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getRoleByFolder } from '@/config/roles';
import { TEMPLE_WISDOM, buildTempleAiSystemPrompt } from '@/config/templeAi';
import { getQuickQuestions, type AiContextKey } from '@/config/templeAiQuickQuestions';
import { checkTempleAiHealth, sendTempleAiChat, type TempleAiMessage } from '@/lib/templeAiApi';

type UiMessage = { id: string; role: 'user' | 'assistant'; content: string };

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function resolveContext(pathname: string, authRole?: string): AiContextKey {
  const folder = pathname.split('/').filter(Boolean)[0];
  if (folder && ['login', 'register'].includes(folder)) return 'guest';
  if (!folder || folder === '') return 'guest';
  const role = getRoleByFolder(folder);
  if (role) return role;
  return authRole ? (authRole as AiContextKey) : 'guest';
}

export default function TempleWisdomChat() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const context = resolveContext(pathname, user?.role);
  const quickQuestions = getQuickQuestions(context);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState<boolean | null>(null);
  const [error, setError] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    checkTempleAiHealth().then(setReady);
  }, []);

  useEffect(() => {
    if (open && ready === false) {
      checkTempleAiHealth().then(setReady);
    }
  }, [open, ready]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 120);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [open, messages, loading]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      setError('');
      const userMsg: UiMessage = { id: uid(), role: 'user', content: trimmed };
      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setLoading(true);

      try {
        const history: TempleAiMessage[] = [
          { role: 'system', content: buildTempleAiSystemPrompt(context, user?.full_name) },
          ...messages.map((m) => ({ role: m.role, content: m.content })),
          { role: 'user', content: trimmed },
        ];
        const reply = await sendTempleAiChat(history);
        setMessages((prev) => [...prev, { id: uid(), role: 'assistant', content: reply }]);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Something went wrong.';
        setError(msg);
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: 'assistant',
            content: `✨ ${msg} The Temple Guide will try again when the temple winds are calm.`,
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [context, loading, messages, user?.full_name]
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Mobile / tablet backdrop */}
      {open && (
        <button
          type="button"
          className="wisdom-backdrop fixed inset-0 z-[104] bg-black/40 backdrop-blur-[2px] sm:bg-black/25 lg:hidden"
          onClick={close}
          aria-label="Close chat"
        />
      )}

      {/* Floating launcher — hidden on xs when sheet is open */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`temple-wisdom-fab tap-target fixed z-[110] flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-candy-700 via-candy-600 to-candy-500 text-white shadow-candy-lg border-2 border-white/40 font-bold transition-all touch-manipulation
          min-h-[52px] min-w-[52px] sm:min-h-[48px]
          bottom-[max(0.75rem,env(safe-area-inset-bottom))] right-[max(0.75rem,env(safe-area-inset-right))]
          px-3.5 py-3 sm:px-5 sm:py-3
          hover:scale-105 active:scale-95
          ${open ? 'max-sm:opacity-0 max-sm:pointer-events-none max-sm:scale-75' : ''}`}
        aria-label={open ? 'Close Temple Wisdom chat' : 'Open Temple Wisdom chat'}
        aria-expanded={open}
      >
        <span className="text-xl sm:text-2xl animate-dev-float leading-none">{open ? '✕' : '🛕'}</span>
        <span className="hidden sm:inline text-sm max-w-[100px] md:max-w-[120px] truncate">
          {open ? 'Close' : 'Guide'}
        </span>
        {ready === true && !open && (
          <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-emerald-400 border-2 border-white shadow-[0_0_8px_#6ee7b7] animate-pulse" />
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          ref={panelRef}
          className="wisdom-panel temple-wisdom-panel fixed z-[105] flex flex-col bg-white shadow-candy-lg overflow-hidden
            max-sm:inset-x-0 max-sm:bottom-0 max-sm:top-auto max-sm:rounded-t-3xl max-sm:rounded-b-none max-sm:max-h-[min(92dvh,100%)] max-sm:w-full max-sm:animate-wisdom-slide-up
            sm:inset-x-3 sm:bottom-[calc(4.75rem+env(safe-area-inset-bottom))] sm:top-auto sm:rounded-3xl sm:max-h-[min(75dvh,560px)]
            md:inset-x-auto md:right-[max(0.75rem,env(safe-area-inset-right))] md:bottom-[calc(5rem+env(safe-area-inset-bottom))] md:w-[min(100vw-1.5rem,420px)]
            lg:w-[min(100vw-1.5rem,440px)] xl:w-[460px]
            border-2 border-candy-200 sm:bg-white/95 sm:backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label="Temple Wisdom chat"
        >
          <header className="shrink-0 safe-top bg-gradient-to-r from-candy-700 via-candy-600 to-candy-500 text-white px-3 py-3 sm:px-4 flex items-center gap-2 sm:gap-3 min-h-[56px]">
            <span className="text-2xl sm:text-3xl drop-shadow shrink-0">🛕</span>
            <div className="min-w-0 flex-1">
              <h2 className="font-display font-bold text-sm sm:text-base leading-tight truncate">
                {TEMPLE_WISDOM.name}
              </h2>
              <p className="text-[10px] sm:text-[11px] text-white/85 truncate">{TEMPLE_WISDOM.tagline}</p>
            </div>
            <span
              className={`hidden xs:inline-flex text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shrink-0 ${
                ready ? 'bg-emerald-400/30 text-white' : 'bg-white/20'
              }`}
            >
              {ready === null ? '…' : ready ? 'Online' : 'Away'}
            </span>
            <button
              type="button"
              onClick={close}
              className="tap-target shrink-0 rounded-xl bg-white/20 hover:bg-white/30 text-white text-lg leading-none sm:hidden"
              aria-label="Close"
            >
              ×
            </button>
          </header>

          {/* Drag handle — mobile sheet affordance */}
          <div className="sm:hidden flex justify-center py-1.5 bg-gradient-to-r from-candy-700 via-candy-600 to-candy-500 shrink-0">
            <span className="w-10 h-1 rounded-full bg-white/40" />
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4 space-y-3 min-h-0 bg-candy-mesh/30 wisdom-messages"
          >
            {messages.length === 0 && (
              <div className="text-center py-3 sm:py-4 px-2">
                <p className="text-3xl sm:text-4xl mb-2">✨</p>
                <p className="text-xs sm:text-sm text-candy-800 font-medium leading-relaxed">
                  Namaste! Ask me anything about the temple system or the world beyond.
                </p>
                <p className="text-[11px] sm:text-xs text-candy-600 mt-2">
                  {context === 'guest'
                    ? 'Browsing as guest'
                    : `Guiding · ${user?.full_name ?? 'temple user'}`}
                </p>
              </div>
            )}

            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[min(92%,20rem)] rounded-2xl px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                    m.role === 'user'
                      ? 'bg-gradient-to-br from-candy-700 to-candy-600 text-white rounded-br-sm'
                      : 'bg-white border border-candy-100 text-slate-800 rounded-bl-sm'
                  }`}
                >
                  {m.role === 'assistant' && (
                    <span className="text-[9px] sm:text-[10px] font-bold text-candy-500 block mb-0.5 sm:mb-1">
                      {TEMPLE_WISDOM.emoji} {TEMPLE_WISDOM.name}
                    </span>
                  )}
                  <p className="whitespace-pre-wrap break-words [overflow-wrap:anywhere]">{m.content}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-white border border-candy-100 px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-candy-600 max-w-[90%]">
                  <span className="inline-flex gap-1 align-middle">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-candy-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-candy-400 animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-candy-400 animate-bounce [animation-delay:300ms]" />
                  </span>
                  <span className="ml-2">Channeling wisdom…</span>
                </div>
              </div>
            )}
          </div>

          <div className="shrink-0 border-t border-candy-100 bg-white/95 backdrop-blur-sm p-2 sm:p-3 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
            <p className="text-[9px] sm:text-[10px] font-bold text-candy-500 uppercase tracking-wider px-1 mb-1.5">
              Quick questions
            </p>

            {/* Mobile: horizontal snap scroll · Tablet+: wrapped grid */}
            <div className="wisdom-chips-scroll flex gap-1.5 overflow-x-auto pb-2 sm:pb-2.5 -mx-1 px-1 sm:overflow-visible sm:flex-wrap sm:overflow-x-visible max-h-[88px] sm:max-h-none">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  type="button"
                  disabled={loading}
                  onClick={() => sendMessage(q)}
                  className="wisdom-chip shrink-0 sm:shrink rounded-full border border-candy-200 bg-candy-50 hover:bg-candy-100 active:bg-candy-200 text-[10px] sm:text-[11px] text-candy-800 px-2.5 sm:px-3 py-2 sm:py-1.5 font-medium transition disabled:opacity-50 min-h-[40px] sm:min-h-[36px] max-w-[min(85vw,220px)] sm:max-w-none sm:whitespace-normal text-left sm:text-center line-clamp-2 sm:line-clamp-none"
                  title={q}
                >
                  {q}
                </button>
              ))}
            </div>

            {error && <p className="text-[11px] sm:text-xs text-rose-600 px-1 mb-1.5">{error}</p>}

            <form
              onSubmit={onSubmit}
              className="flex flex-col xs:flex-row gap-2 items-stretch xs:items-end w-full min-w-0"
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(input);
                  }
                }}
                placeholder="Ask the Temple Guide…"
                rows={1}
                disabled={loading}
                className="input-candy flex-1 min-h-[48px] max-h-28 resize-none text-base sm:text-sm py-3 sm:py-2.5 w-full min-w-0"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="shrink-0 rounded-xl bg-gradient-to-r from-candy-700 to-candy-600 text-white font-bold min-h-[48px] px-5 disabled:opacity-50 shadow-candy active:scale-[0.98] w-full xs:w-auto touch-manipulation"
              >
                <span className="sm:hidden">Send ✨</span>
                <span className="hidden sm:inline">Send</span>
              </button>
            </form>
            <p className="text-[8px] sm:text-[9px] text-center text-candy-400 mt-1.5 sm:mt-2">
              Temple Wisdom · Private & secure
            </p>
          </div>
        </div>
      )}
    </>
  );
}
