import { pool } from './db';

export async function createSchema(): Promise<void> {
  const statements = [
    `CREATE TABLE IF NOT EXISTS tours (
       id SERIAL PRIMARY KEY,
       name TEXT NOT NULL,
       region TEXT NOT NULL,
       duration_days INT NOT NULL CHECK (duration_days > 0),
       price_bgn NUMERIC(10,2) NOT NULL CHECK (price_bgn >= 0),
       description TEXT NOT NULL,
       image_url TEXT,
       created_at TIMESTAMPTZ DEFAULT NOW()
     )`,
    `CREATE TABLE IF NOT EXISTS sightseeing (
       id SERIAL PRIMARY KEY,
       name TEXT NOT NULL,
       location TEXT NOT NULL,
       description TEXT NOT NULL,
       image_url TEXT,
       created_at TIMESTAMPTZ DEFAULT NOW()
     )`,
    `CREATE TABLE IF NOT EXISTS hotels (
       id SERIAL PRIMARY KEY,
       name TEXT NOT NULL,
       city TEXT NOT NULL,
       stars INT NOT NULL CHECK (stars BETWEEN 1 AND 5),
       price_per_night_bgn NUMERIC(10,2) NOT NULL CHECK (price_per_night_bgn >= 0),
       description TEXT NOT NULL,
       image_url TEXT,
       created_at TIMESTAMPTZ DEFAULT NOW()
     )`,
    `CREATE TABLE IF NOT EXISTS transportation (
       id SERIAL PRIMARY KEY,
       type TEXT NOT NULL,
       route TEXT NOT NULL,
       price_bgn NUMERIC(10,2) NOT NULL CHECK (price_bgn >= 0),
       description TEXT NOT NULL,
       created_at TIMESTAMPTZ DEFAULT NOW()
     )`,
    `CREATE TABLE IF NOT EXISTS team (
       id SERIAL PRIMARY KEY,
       full_name TEXT NOT NULL,
       role TEXT NOT NULL,
       email TEXT,
       phone TEXT,
       bio TEXT,
       photo_url TEXT
     )`,
    `CREATE TABLE IF NOT EXISTS contact_messages (
       id SERIAL PRIMARY KEY,
       name TEXT NOT NULL,
       email TEXT NOT NULL,
       subject TEXT,
       message TEXT NOT NULL,
       created_at TIMESTAMPTZ DEFAULT NOW()
     )`,
  ];

  for (const sql of statements) {
    await pool.query(sql);
  }
}
