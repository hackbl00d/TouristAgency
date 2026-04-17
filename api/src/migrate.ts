import 'dotenv/config';
import { pool } from './db';
import { createSchema } from './schema';
import { seedDatabase } from './seed';

async function main() {
  console.log('→ Създаване на схема...');
  await createSchema();
  console.log('→ Зареждане на примерни данни...');
  await seedDatabase();
  console.log('✓ Готово.');
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
