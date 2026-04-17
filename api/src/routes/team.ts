import { Router } from 'express';
import { pool } from '../db';

export const teamRouter = Router();

teamRouter.get('/', async (_req, res) => {
  const { rows } = await pool.query(
    'SELECT id, full_name, role, email, phone, bio, photo_url FROM team ORDER BY id'
  );
  res.json(rows);
});
