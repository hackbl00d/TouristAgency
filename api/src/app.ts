import express from 'express';
import cors from 'cors';
import { toursRouter } from './routes/tours';
import { sightseeingRouter } from './routes/sightseeing';
import { hotelsRouter } from './routes/hotels';
import { transportationRouter } from './routes/transportation';
import { teamRouter } from './routes/team';
import { contactRouter } from './routes/contact';

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json({ limit: '256kb' }));

  app.get('/api/health', (_req, res) => res.json({ ok: true }));

  app.use('/api/tours', toursRouter);
  app.use('/api/sightseeing', sightseeingRouter);
  app.use('/api/hotels', hotelsRouter);
  app.use('/api/transportation', transportationRouter);
  app.use('/api/team', teamRouter);
  app.use('/api/contact', contactRouter);

  app.use((req, res) => res.status(404).json({ error: 'Не е намерено.' }));

  return app;
}
