import pool from '../db.js';

export async function logActivity(
  userId: number,
  userRole: string,
  action: string,
  entityType: string,
  entityId: number | null,
  summary: string,
  link = '/shared/activity-log'
): Promise<void> {
  try {
    await pool.execute(
      `INSERT INTO activity_log (user_id, user_role, action, entity_type, entity_id, summary, link)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, userRole, action, entityType, entityId, summary.slice(0, 500), link]
    );
  } catch {
    // table may not exist on older DB
  }
}
