import { Router } from 'express';
import { pool } from '../db';
import { requireAdmin } from '../auth';

export const transportationRouter = Router();

transportationRouter.get('/', async (_req, res) => {
  const { rows } = await pool.query(
    'SELECT * FROM transportation ORDER BY created_at DESC'
  );
  res.json(rows);
});

transportationRouter.post('/', requireAdmin, async (req, res) => {
  const { type, route, price_bgn, description } = req.body ?? {};
  if (!type || !route || price_bgn == null || !description) {
    return res.status(400).json({ error: 'Липсват задължителни полета.' });
  }
  const { rows } = await pool.query(
    `INSERT INTO transportation (type, route, price_bgn, description)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [type, route, price_bgn, description]
  );
  res.status(201).json(rows[0]);
});

transportationRouter.delete('/:id', requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Невалиден идентификатор.' });
  await pool.query('DELETE FROM transportation WHERE id = $1', [id]);
  res.status(204).end();
});
