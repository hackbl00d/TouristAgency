import { Router } from 'express';
import { pool } from '../db';
import { requireAdmin } from '../auth';

export const hotelsRouter = Router();

hotelsRouter.get('/', async (_req, res) => {
  const { rows } = await pool.query(
    'SELECT * FROM hotels ORDER BY created_at DESC'
  );
  res.json(rows);
});

hotelsRouter.post('/', requireAdmin, async (req, res) => {
  const { name, city, stars, price_per_night_bgn, description, image_url } = req.body ?? {};
  if (!name || !city || !stars || price_per_night_bgn == null || !description) {
    return res.status(400).json({ error: 'Липсват задължителни полета.' });
  }
  const s = Number(stars);
  if (!Number.isInteger(s) || s < 1 || s > 5) {
    return res.status(400).json({ error: 'Звездите трябва да са между 1 и 5.' });
  }
  const { rows } = await pool.query(
    `INSERT INTO hotels (name, city, stars, price_per_night_bgn, description, image_url)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [name, city, s, price_per_night_bgn, description, image_url ?? null]
  );
  res.status(201).json(rows[0]);
});

hotelsRouter.delete('/:id', requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Невалиден идентификатор.' });
  await pool.query('DELETE FROM hotels WHERE id = $1', [id]);
  res.status(204).end();
});
