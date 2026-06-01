import { Router, type Request, type Response } from 'express';
import { getTempleAiHealth, postTempleAiChat, type ChatMessage } from '../../lib/templeAiCore.js';

const router = Router();

router.get('/health', (_req: Request, res: Response) => {
  res.json(getTempleAiHealth());
});

router.post('/chat', async (req: Request, res: Response) => {
  const { messages } = req.body as { messages?: ChatMessage[] };
  const result = await postTempleAiChat(messages ?? []);

  if ('error' in result) {
    res.status(result.status).json({ error: result.error });
    return;
  }

  res.json({ reply: result.reply });
});

export default router;
