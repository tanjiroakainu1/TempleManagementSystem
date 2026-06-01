export interface TempleAiMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function checkTempleAiHealth(): Promise<boolean> {
  try {
    const res = await fetch('/api/temple-ai/health');
    const data = (await res.json()) as { ready?: boolean };
    return Boolean(data.ready);
  } catch {
    return false;
  }
}

function cleanReply(text: string): string {
  return text.replace(/<\/?assistant>/gi, '').replace(/<\/?think>/gi, '').trim();
}

export async function sendTempleAiChat(messages: TempleAiMessage[]): Promise<string> {
  const res = await fetch('/api/temple-ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });

  const data = (await res.json()) as { reply?: string; error?: string };

  if (!res.ok) {
    throw new Error(data.error || 'Temple Wisdom could not respond.');
  }

  if (!data.reply) {
    throw new Error('Temple Wisdom sent an empty response.');
  }

  return cleanReply(data.reply);
}
