import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import apiRoutes from './routes/api.js';
import templeAiRoutes from './routes/templeAi.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'Temple Management API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/temple-ai', templeAiRoutes);
app.use('/api', apiRoutes);

const server = app.listen(PORT, () => {
  console.log(`Temple API running on http://localhost:${PORT}`);
  console.log(`Temple Wisdom AI: http://localhost:${PORT}/api/temple-ai/health`);
});

server.on('error', (err: NodeJS.ErrnoException) => {
  if (err.code === 'EADDRINUSE') {
    console.error(
      `\nPort ${PORT} is already in use. Stop the other process or run:\n  lsof -ti:${PORT} | xargs kill -9\n  npm run dev\n`
    );
    process.exit(1);
  }
  throw err;
});
