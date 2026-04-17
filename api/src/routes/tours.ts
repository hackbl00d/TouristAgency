import { Router } from 'express';
import { pool } from '../db';
import { requireAdmin } from '../auth';

export const toursRouter = Router();

toursRouter.get('/', async (_req, res) => {
  const { rows } = await pool.query(
    'SELECT * FROM tours ORDER BY created_at DESC'
  );
  res.json(rows);
});

toursRouter.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Невалиден идентификатор.' });
  const { rows } = await pool.query('SELECT * FROM tours WHERE id = $1', [id]);
  if (!rows[0]) return res.status(404).json({ error: 'Турът не е намерен.' });
  res.json(rows[0]);
});

toursRouter.post('/', requireAdmin, async (req, res) => {
  const { name, region, duration_days, price_bgn, description, image_url } = req.body ?? {};
  if (!name || !region || !duration_days || price_bgn == null || !description) {
    return res.status(400).json({ error: 'Липсват задължителни полета.' });
  }
  const { rows } = await pool.query(
    `INSERT INTO tours (name, region, duration_days, price_bgn, description, image_url)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [name, region, duration_days, price_bgn, description, image_url ?? null]
  );
  res.status(201).json(rows[0]);
});

toursRouter.delete('/:id', requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Невалиден идентификатор.' });
  await pool.query('DELETE FROM tours WHERE id = $1', [id]);
  res.status(204).end();
});
