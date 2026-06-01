import { Router } from 'express';
import bcrypt from 'bcryptjs';
import pool from '../db.js';
import { authMiddleware, AuthRequest, signToken } from '../middleware/auth.js';
import { logActivity } from '../services/activityLog.js';

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: 'Email and password required' });
    return;
  }
  const [rows] = await pool.execute(
    'SELECT * FROM users WHERE email = ? AND status = "active"',
    [email.trim()]
  );
  const user = (rows as Record<string, unknown>[])[0];
  if (!user || !(await bcrypt.compare(password, String(user.password)))) {
    res.status(401).json({ error: 'Invalid email or password' });
    return;
  }
  const authUser = {
    id: user.id as number,
    role: user.role as string,
    full_name: user.full_name as string,
    email: user.email as string,
  };
  const token = signToken(authUser);
  res.json({ token, user: authUser });
});

router.post('/register', async (req, res) => {
  const { full_name, email, password, phone, role } = req.body;
  if (!full_name || !email || !password || !role) {
    res.status(400).json({ error: 'All required fields must be filled' });
    return;
  }
  const [existing] = await pool.execute('SELECT id FROM users WHERE email = ?', [email.trim()]);
  if ((existing as unknown[]).length > 0) {
    res.status(400).json({ error: 'Email already registered' });
    return;
  }
  const hash = await bcrypt.hash(password, 10);
  const [result] = await pool.execute(
    'INSERT INTO users (full_name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
    [full_name.trim(), email.trim(), hash, phone || null, role]
  );
  const insertId = (result as { insertId: number }).insertId;
  await logActivity(insertId, role, 'create', 'user', insertId, `New user registered: ${full_name} (${role})`);
  res.json({ success: true, message: 'Registration successful' });
});

router.get('/me', authMiddleware, async (req: AuthRequest, res) => {
  const [rows] = await pool.execute(
    'SELECT id, full_name, email, phone, role, status, created_at FROM users WHERE id = ? AND status = "active"',
    [req.user!.id]
  );
  const user = (rows as Record<string, unknown>[])[0];
  if (!user) {
    res.status(401).json({ error: 'User not found' });
    return;
  }
  res.json({ user });
});

export default router;
