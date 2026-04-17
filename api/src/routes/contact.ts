import { Router } from 'express';
import { pool } from '../db';
import { requireAdmin } from '../auth';

export const contactRouter = Router();

contactRouter.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body ?? {};
  if (typeof name !== 'string' || name.trim().length < 2 ||
      typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email) ||
      typeof message !== 'string' || message.trim().length < 5) {
    return res.status(400).json({ error: 'Моля попълнете коректно полетата.' });
  }
  if (name.length > 200 || email.length > 200 ||
      (subject && (typeof subject !== 'string' || subject.length > 300)) ||
      message.length > 5000) {
    return res.status(400).json({ error: 'Прекалено дълги стойности.' });
  }
  await pool.query(
    `INSERT INTO contact_messages (name, email, subject, message)
     VALUES ($1,$2,$3,$4)`,
    [name.trim(), email.trim(), typeof subject === 'string' ? subject.trim() : null, message.trim()]
  );
  res.status(201).json({ ok: true });
});

contactRouter.get('/', requireAdmin, async (_req, res) => {
  const { rows } = await pool.query(
    'SELECT id, name, email, subject, message, created_at FROM contact_messages ORDER BY created_at DESC'
  );
  res.json(rows);
});
