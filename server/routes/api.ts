import { Router, Response } from 'express';
import pool from '../db.js';
import { authMiddleware, AuthRequest, requireRoles } from '../middleware/auth.js';
import { logActivity } from '../services/activityLog.js';

const router = Router();
router.use(authMiddleware);

function fmtMoney(n: number): string {
  return `₱${Number(n).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Dashboard stats
router.get('/dashboard/stats', async (req: AuthRequest, res: Response) => {
  const role = req.user!.role;
  const uid = req.user!.id;
  const stats: Record<string, number> = {};

  const q = async (sql: string, params: unknown[] = []) => {
    const [rows] = await pool.execute(sql, params);
    return Number((rows as { cnt?: number; total?: number }[])[0]?.cnt ?? (rows as { total?: number }[])[0]?.total ?? 0);
  };

  switch (role) {
    case 'super_admin':
    case 'temple_administrator':
      stats.users = await q('SELECT COUNT(*) as cnt FROM users');
      stats.pending_approvals = await q("SELECT COUNT(*) as cnt FROM approvals WHERE status = 'pending'");
      stats.events = await q("SELECT COUNT(*) as cnt FROM events WHERE status = 'active'");
      stats.donations = await q('SELECT COALESCE(SUM(amount),0) as total FROM donations');
      break;
    case 'head_priest':
      stats.pending_rituals = await q("SELECT COUNT(*) as cnt FROM ritual_requests WHERE status = 'pending'");
      stats.priests = await q("SELECT COUNT(*) as cnt FROM users WHERE role = 'priest' AND status = 'active'");
      stats.today_services = await q('SELECT COUNT(*) as cnt FROM worship_schedules WHERE schedule_date = CURDATE()');
      break;
    case 'priest':
      stats.upcoming = await q('SELECT COUNT(*) as cnt FROM worship_schedules WHERE priest_id = ? AND schedule_date >= CURDATE()', [uid]);
      stats.assigned_rituals = await q("SELECT COUNT(*) as cnt FROM ritual_requests WHERE priest_id = ? AND status = 'scheduled'", [uid]);
      break;
    case 'treasurer':
    case 'accountant':
      stats.total_donations = await q('SELECT COALESCE(SUM(amount),0) as total FROM donations');
      stats.transactions = await q('SELECT COUNT(*) as cnt FROM financial_transactions');
      stats.pending = await q("SELECT COUNT(*) as cnt FROM financial_transactions WHERE status = 'pending'");
      break;
    case 'donation_manager':
      stats.donations = await q('SELECT COUNT(*) as cnt FROM donations');
      stats.total = await q('SELECT COALESCE(SUM(amount),0) as total FROM donations');
      stats.donors = await q('SELECT COUNT(DISTINCT donor_id) as cnt FROM donations');
      break;
    case 'event_manager':
      stats.active_events = await q("SELECT COUNT(*) as cnt FROM events WHERE status = 'active'");
      stats.registrations = await q('SELECT COUNT(*) as cnt FROM event_registrations');
      break;
    case 'volunteer_coordinator':
      stats.volunteers = await q("SELECT COUNT(*) as cnt FROM users WHERE role = 'volunteer' AND status = 'active'");
      stats.open_tasks = await q("SELECT COUNT(*) as cnt FROM volunteer_tasks WHERE status IN ('pending','assigned')");
      break;
    case 'volunteer':
      stats.my_tasks = await q("SELECT COUNT(*) as cnt FROM volunteer_tasks WHERE volunteer_id = ? AND status != 'completed'", [uid]);
      break;
    case 'devotee':
      stats.my_rituals = await q('SELECT COUNT(*) as cnt FROM ritual_requests WHERE devotee_id = ?', [uid]);
      stats.my_donations = await q('SELECT COALESCE(SUM(amount),0) as total FROM donations WHERE donor_id = ?', [uid]);
      break;
    case 'ritual_coordinator':
      stats.pending = await q("SELECT COUNT(*) as cnt FROM ritual_requests WHERE status = 'pending'");
      stats.scheduled = await q("SELECT COUNT(*) as cnt FROM ritual_requests WHERE status = 'scheduled'");
      break;
    case 'education_coordinator':
      stats.classes = await q('SELECT COUNT(*) as cnt FROM education_classes');
      stats.teachers = await q("SELECT COUNT(*) as cnt FROM users WHERE role = 'teacher_instructor' AND status = 'active'");
      break;
    case 'teacher_instructor':
      stats.my_classes = await q('SELECT COUNT(*) as cnt FROM education_classes WHERE teacher_id = ?', [uid]);
      break;
    case 'inventory_manager':
      stats.items = await q('SELECT COUNT(*) as cnt FROM inventory_items');
      stats.low_stock = await q('SELECT COUNT(*) as cnt FROM inventory_items WHERE quantity <= min_stock');
      break;
    case 'maintenance_staff':
      stats.open = await q("SELECT COUNT(*) as cnt FROM maintenance_records WHERE status IN ('open','in_progress')");
      break;
    case 'security_guard':
      stats.incidents = await q("SELECT COUNT(*) as cnt FROM security_incidents WHERE status = 'open'");
      stats.visits_today = await q('SELECT COUNT(*) as cnt FROM visit_registrations WHERE visit_date = CURDATE()');
      break;
    case 'temple_secretary':
      stats.records = await q('SELECT COUNT(*) as cnt FROM temple_records');
      stats.announcements = await q('SELECT COUNT(*) as cnt FROM announcements');
      break;
    case 'member':
      stats.events = await q("SELECT COUNT(*) as cnt FROM events WHERE status = 'active' AND event_date >= CURDATE()");
      stats.requests = await q('SELECT COUNT(*) as cnt FROM member_requests WHERE member_id = ?', [uid]);
      break;
    case 'visitor':
      stats.announcements = await q('SELECT COUNT(*) as cnt FROM announcements WHERE is_public = 1');
      stats.events = await q("SELECT COUNT(*) as cnt FROM events WHERE status = 'active'");
      break;
    default:
      break;
  }
  res.json({ stats });
});

// Activity log
router.get('/activity-log', async (req: AuthRequest, res: Response) => {
  const entity = req.query.entity as string | undefined;
  const action = req.query.action as string | undefined;
  let sql = `SELECT a.*, u.full_name AS actor_name FROM activity_log a JOIN users u ON a.user_id = u.id WHERE 1=1`;
  const params: string[] = [];
  if (entity) { sql += ' AND a.entity_type = ?'; params.push(entity); }
  if (action) { sql += ' AND a.action = ?'; params.push(action); }
  sql += ' ORDER BY a.created_at DESC LIMIT 200';
  const [rows] = await pool.execute(sql, params);
  res.json({ activities: rows });
});

// Users
router.get('/users', requireRoles('super_admin'), async (_req, res) => {
  const [rows] = await pool.execute('SELECT id, full_name, email, phone, role, status, created_at FROM users ORDER BY created_at DESC');
  res.json({ users: rows });
});

router.patch('/users/:id', requireRoles('super_admin'), async (req: AuthRequest, res) => {
  const id = Number(req.params.id);
  const { status, role } = req.body;
  if (status) await pool.execute('UPDATE users SET status = ? WHERE id = ? AND role != "super_admin"', [status, id]);
  if (role) await pool.execute('UPDATE users SET role = ? WHERE id = ? AND role != "super_admin"', [role, id]);
  await logActivity(req.user!.id, req.user!.role, 'update', 'user', id, `Updated user #${id}`);
  res.json({ success: true });
});

// Donations
router.get('/donations', async (req: AuthRequest, res) => {
  const role = req.user!.role;
  if (role === 'devotee') {
    const [rows] = await pool.execute('SELECT * FROM donations WHERE donor_id = ? ORDER BY created_at DESC', [req.user!.id]);
    res.json({ donations: rows });
    return;
  }
  const [rows] = await pool.execute(
    `SELECT d.*, u.full_name AS donor_name FROM donations d JOIN users u ON d.donor_id = u.id ORDER BY d.created_at DESC LIMIT 100`
  );
  res.json({ donations: rows });
});

router.post('/donations', async (req: AuthRequest, res) => {
  const { amount, donation_type, purpose, payment_method, donor_id } = req.body;
  const donorId = donor_id || req.user!.id;
  const [result] = await pool.execute(
    'INSERT INTO donations (donor_id, amount, donation_type, purpose, payment_method, received_by) VALUES (?, ?, ?, ?, ?, ?)',
    [donorId, amount, donation_type || 'general', purpose || '', payment_method || 'cash', req.user!.role === 'donation_manager' ? req.user!.id : null]
  );
  const id = (result as { insertId: number }).insertId;
  await logActivity(req.user!.id, req.user!.role, 'create', 'donation', id, `Donated ${fmtMoney(amount)} (${donation_type || 'general'})`);
  res.json({ success: true, id });
});

// Ritual requests
router.get('/ritual-requests', async (req: AuthRequest, res) => {
  const role = req.user!.role;
  const uid = req.user!.id;
  if (role === 'devotee') {
    const [rows] = await pool.execute('SELECT * FROM ritual_requests WHERE devotee_id = ? ORDER BY created_at DESC', [uid]);
    res.json({ requests: rows });
    return;
  }
  if (role === 'priest') {
    const [rows] = await pool.execute(
      `SELECT rr.*, u.full_name AS devotee_name FROM ritual_requests rr JOIN users u ON rr.devotee_id = u.id WHERE rr.priest_id = ? ORDER BY rr.scheduled_date ASC`,
      [uid]
    );
    res.json({ requests: rows });
    return;
  }
  const [rows] = await pool.execute(
    `SELECT rr.*, u.full_name AS devotee_name FROM ritual_requests rr JOIN users u ON rr.devotee_id = u.id ORDER BY rr.created_at DESC LIMIT 100`
  );
  res.json({ requests: rows });
});

router.post('/ritual-requests', requireRoles('devotee'), async (req: AuthRequest, res) => {
  const { ritual_type, requested_date, notes } = req.body;
  const [result] = await pool.execute(
    "INSERT INTO ritual_requests (devotee_id, ritual_type, requested_date, notes, status) VALUES (?, ?, ?, ?, 'pending')",
    [req.user!.id, ritual_type, requested_date, notes || '']
  );
  const id = (result as { insertId: number }).insertId;
  await logActivity(req.user!.id, req.user!.role, 'create', 'ritual_request', id, `Booked ritual: ${ritual_type}`);
  res.json({ success: true, id });
});

router.patch('/ritual-requests/:id', async (req: AuthRequest, res) => {
  const id = Number(req.params.id);
  const { action, priest_id, scheduled_date, status } = req.body;
  const user = req.user!;
  if (action === 'schedule' && user.role === 'ritual_coordinator') {
    await pool.execute(
      "UPDATE ritual_requests SET priest_id = ?, scheduled_date = ?, coordinator_id = ?, status = 'scheduled' WHERE id = ?",
      [priest_id, scheduled_date, user.id, id]
    );
    await logActivity(user.id, user.role, 'update', 'ritual_request', id, 'Scheduled ritual request');
  } else if (action === 'approve' && user.role === 'head_priest') {
    await pool.execute("UPDATE ritual_requests SET status = 'approved', head_priest_approved = 1 WHERE id = ?", [id]);
    await logActivity(user.id, user.role, 'approve', 'ritual_request', id, 'Approved ritual');
  } else if (action === 'reject' && user.role === 'head_priest') {
    await pool.execute("UPDATE ritual_requests SET status = 'rejected', head_priest_approved = 0 WHERE id = ?", [id]);
    await logActivity(user.id, user.role, 'reject', 'ritual_request', id, 'Rejected ritual');
  } else if (status === 'completed' && user.role === 'priest') {
    await pool.execute("UPDATE ritual_requests SET status = 'completed' WHERE id = ? AND priest_id = ?", [id, user.id]);
    await logActivity(user.id, user.role, 'update', 'ritual_request', id, 'Completed ritual');
  }
  res.json({ success: true });
});

// Events
router.get('/events', async (req: AuthRequest, res) => {
  const festival = req.query.festival === '1';
  const [rows] = await pool.execute(
    `SELECT e.*, (SELECT COUNT(*) FROM event_registrations er WHERE er.event_id = e.id) AS reg_count
     FROM events e WHERE e.is_festival = ? ORDER BY e.event_date DESC`,
    [festival ? 1 : 0]
  );
  res.json({ events: rows });
});

router.post('/events', requireRoles('event_manager'), async (req: AuthRequest, res) => {
  const { title, description, event_date, event_time, location, is_festival } = req.body;
  const [result] = await pool.execute(
    'INSERT INTO events (title, description, event_date, event_time, location, manager_id, is_festival) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [title, description || '', event_date, event_time || null, location || '', req.user!.id, is_festival ? 1 : 0]
  );
  const id = (result as { insertId: number }).insertId;
  await logActivity(req.user!.id, req.user!.role, 'create', 'event', id, `Created event: ${title}`);
  res.json({ success: true, id });
});

router.post('/event-registrations', async (req: AuthRequest, res) => {
  const { event_id } = req.body;
  try {
    await pool.execute('INSERT INTO event_registrations (event_id, user_id) VALUES (?, ?)', [event_id, req.user!.id]);
    await logActivity(req.user!.id, req.user!.role, 'register', 'event_registration', event_id, 'Registered for event');
    res.json({ success: true });
  } catch {
    res.status(400).json({ error: 'Already registered' });
  }
});

// Financial transactions
router.get('/transactions', async (req: AuthRequest, res) => {
  const role = req.user!.role;
  if (role === 'accountant') {
    const [rows] = await pool.execute('SELECT * FROM financial_transactions WHERE recorded_by = ? ORDER BY created_at DESC', [req.user!.id]);
    res.json({ transactions: rows });
    return;
  }
  const [rows] = await pool.execute(
    `SELECT ft.*, u.full_name FROM financial_transactions ft JOIN users u ON ft.recorded_by = u.id ORDER BY ft.created_at DESC LIMIT 100`
  );
  res.json({ transactions: rows });
});

router.post('/transactions', requireRoles('accountant'), async (req: AuthRequest, res) => {
  const { transaction_type, amount, description, category } = req.body;
  const [result] = await pool.execute(
    "INSERT INTO financial_transactions (transaction_type, amount, description, category, recorded_by, status) VALUES (?, ?, ?, ?, ?, 'pending')",
    [transaction_type, amount, description, category || '', req.user!.id]
  );
  const id = (result as { insertId: number }).insertId;
  await logActivity(req.user!.id, req.user!.role, 'create', 'financial_transaction', id, `Recorded ${transaction_type}: ${fmtMoney(amount)}`);
  res.json({ success: true, id });
});

router.patch('/transactions/:id', requireRoles('treasurer'), async (req: AuthRequest, res) => {
  const id = Number(req.params.id);
  const status = req.body.status === 'approved' ? 'approved' : 'rejected';
  await pool.execute('UPDATE financial_transactions SET status = ?, approved_by = ? WHERE id = ?', [status, req.user!.id, id]);
  await logActivity(req.user!.id, req.user!.role, status === 'approved' ? 'approve' : 'reject', 'financial_transaction', id, `${status} transaction #${id}`);
  res.json({ success: true });
});

// Announcements
router.get('/announcements', async (_req, res) => {
  const [rows] = await pool.execute(
    `SELECT a.*, u.full_name FROM announcements a JOIN users u ON a.created_by = u.id ORDER BY a.created_at DESC`
  );
  res.json({ announcements: rows });
});

router.post('/announcements', requireRoles('temple_secretary'), async (req: AuthRequest, res) => {
  const { title, content, is_public } = req.body;
  const [result] = await pool.execute(
    'INSERT INTO announcements (title, content, created_by, is_public) VALUES (?, ?, ?, ?)',
    [title, content, req.user!.id, is_public ? 1 : 0]
  );
  const id = (result as { insertId: number }).insertId;
  await logActivity(req.user!.id, req.user!.role, 'create', 'announcement', id, `Published: ${title}`);
  res.json({ success: true, id });
});

// Generic list helpers
router.get('/approvals', async (_req, res) => {
  const [rows] = await pool.execute(
    `SELECT a.*, u.full_name AS requester FROM approvals a JOIN users u ON a.requested_by = u.id ORDER BY a.created_at DESC`
  );
  res.json({ approvals: rows });
});

router.patch('/approvals/:id', async (req: AuthRequest, res) => {
  const id = Number(req.params.id);
  const status = req.body.status === 'approved' ? 'approved' : 'rejected';
  await pool.execute('UPDATE approvals SET status = ?, approved_by = ? WHERE id = ?', [status, req.user!.id, id]);
  await logActivity(req.user!.id, req.user!.role, status === 'approved' ? 'approve' : 'reject', 'approval', id, `${status} approval #${id}`);
  res.json({ success: true });
});

router.get('/users-by-role/:role', async (req, res) => {
  const [rows] = await pool.execute(
    'SELECT id, full_name, email FROM users WHERE role = ? AND status = "active" ORDER BY full_name',
    [req.params.role]
  );
  res.json({ users: rows });
});

router.get('/notifications', async (req: AuthRequest, res) => {
  const [rows] = await pool.execute(
    'SELECT * FROM notifications WHERE user_id = ? AND read_at IS NULL ORDER BY created_at DESC LIMIT 10',
    [req.user!.id]
  );
  res.json({ notifications: rows });
});

export default router;
