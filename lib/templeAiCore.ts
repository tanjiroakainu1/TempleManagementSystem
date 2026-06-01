/**
 * Shared Temple Wisdom AI logic — used by Express (local) and Vercel serverless (production).
 * Env: OPENROUTER_API_KEY, OPENROUTER_MODEL (optional), VERCEL_URL (auto on Vercel)
 */

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export function sanitizeReply(text: string): string {
  return text
    .replace(/<\/?assistant>/gi, '')
    .replace(/<\/?think>/gi, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function getTempleAiHealth() {
  const configured = Boolean(process.env.OPENROUTER_API_KEY?.trim());
  return {
    ok: configured,
    service: 'Temple Wisdom',
    ready: configured,
  };
}

function refererHeader(): string {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return process.env.PUBLIC_APP_URL?.trim() || 'http://localhost:5173';
}

export async function postTempleAiChat(
  messages: ChatMessage[]
): Promise<{ reply: string } | { error: string; status: number }> {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();
  const model = process.env.OPENROUTER_MODEL?.trim() || 'openai/gpt-4o-mini';

  if (!apiKey) {
    return {
      status: 503,
      error: 'Temple Wisdom is not configured yet. Please add OPENROUTER_API_KEY in Vercel Environment Variables.',
    };
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return { status: 400, error: 'Please send a message to Temple Wisdom.' };
  }

  const sanitized = messages
    .filter((m) => m && typeof m.content === 'string' && ['system', 'user', 'assistant'].includes(m.role))
    .slice(-24)
    .map((m) => ({
      role: m.role,
      content: String(m.content).slice(0, 8000),
    }));

  try {
    const upstream = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': refererHeader(),
        'X-Title': 'Temple Management System',
      },
      body: JSON.stringify({
        model,
        messages: sanitized,
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    const data = (await upstream.json()) as {
      choices?: { message?: { content?: string } }[];
      error?: { message?: string };
    };

    if (!upstream.ok) {
      console.error('[Temple Wisdom] upstream', upstream.status, data?.error?.message);
      return {
        status: 502,
        error: 'Temple Wisdom could not answer right now. Please try again in a moment.',
      };
    }

    const reply = sanitizeReply(data.choices?.[0]?.message?.content ?? '');
    if (!reply) {
      return { status: 502, error: 'Temple Wisdom sent an empty blessing. Please ask again.' };
    }

    return { reply };
  } catch (err) {
    console.error('[Temple Wisdom] request failed', err);
    return {
      status: 500,
      error: 'Temple Wisdom is meditating offline. Check your connection and try again.',
    };
  }
}
