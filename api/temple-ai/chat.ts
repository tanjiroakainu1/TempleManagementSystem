import type { VercelRequest, VercelResponse } from '@vercel/node';
import { postTempleAiChat, type ChatMessage } from '../../lib/templeAiCore.js';

export const config = {
  maxDuration: 60,
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { messages } = (req.body ?? {}) as { messages?: ChatMessage[] };
  const result = await postTempleAiChat(messages ?? []);

  if ('error' in result) {
    res.status(result.status).json({ error: result.error });
    return;
  }

  res.status(200).json({ reply: result.reply });
}
