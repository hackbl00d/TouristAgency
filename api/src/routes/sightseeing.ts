import { Router } from 'express';
import { pool } from '../db';
import { requireAdmin } from '../auth';

export const sightseeingRouter = Router();

sightseeingRouter.get('/', async (_req, res) => {
  const { rows } = await pool.query(
    'SELECT * FROM sightseeing ORDER BY created_at DESC'
  );
  res.json(rows);
});

sightseeingRouter.post('/', requireAdmin, async (req, res) => {
  const { name, location, description, image_url } = req.body ?? {};
  if (!name || !location || !description) {
    return res.status(400).json({ error: 'Липсват задължителни полета.' });
  }
  const { rows } = await pool.query(
    `INSERT INTO sightseeing (name, location, description, image_url)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [name, location, description, image_url ?? null]
  );
  res.status(201).json(rows[0]);
});

sightseeingRouter.delete('/:id', requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Невалиден идентификатор.' });
  await pool.query('DELETE FROM sightseeing WHERE id = $1', [id]);
  res.status(204).end();
});
