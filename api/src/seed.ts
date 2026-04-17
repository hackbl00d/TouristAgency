import { pool } from './db';

type Tour = {
  name: string;
  region: string;
  duration_days: number;
  price_bgn: number;
  description: string;
  image_url: string;
};

type Sight = {
  name: string;
  location: string;
  description: string;
  image_url: string;
};

type Hotel = {
  name: string;
  city: string;
  stars: number;
  price_per_night_bgn: number;
  description: string;
  image_url: string;
};

type Transport = {
  type: string;
  route: string;
  price_bgn: number;
  description: string;
};

type Member = {
  full_name: string;
  role: string;
  email: string;
  phone: string;
  bio: string;
};

const tours: Tour[] = [
  {
    name: 'Седемте Рилски езера',
    region: 'Рила',
    duration_days: 2,
    price_bgn: 180,
    description:
      'Двудневен поход до ледниковите езера на връх Дамга с нощувка в планинска хижа.',
    image_url:
      'https://images.unsplash.com/photo-1602001307526-eb7b84a2cbbe?w=1200',
  },
  {
    name: 'Старият Пловдив',
    region: 'Пловдив',
    duration_days: 1,
    price_bgn: 95,
    description:
      'Разходка из Античния театър, Небет тепе и възрожденските къщи на най-стария жив град в Европа.',
    image_url:
      'https://images.unsplash.com/photo-1591806024714-8526f4c8e7c3?w=1200',
  },
  {
    name: 'Перла на Черно море – Созопол и Несебър',
    region: 'Южно Черноморие',
    duration_days: 3,
    price_bgn: 320,
    description:
      'Три дни по крайбрежието с посещение на Стария Несебър (UNESCO) и рибарския Созопол.',
    image_url:
      'https://images.unsplash.com/photo-1601625289863-e7bc3b6b6b1d?w=1200',
  },
  {
    name: 'Велико Търново и Арбанаси',
    region: 'Централна Стара планина',
    duration_days: 2,
    price_bgn: 210,
    description:
      'Средновековната столица Царевец и каменните къщи на Арбанаси.',
    image_url:
      'https://images.unsplash.com/photo-1551649001-7a2482d98d05?w=1200',
  },
  {
    name: 'Пирин и Мелник',
    region: 'Пирин',
    duration_days: 2,
    price_bgn: 230,
    description:
      'Поход в Пирин планина и дегустация в най-малкия град в България – Мелник.',
    image_url:
      'https://images.unsplash.com/photo-1600423115367-87ea7661b6a4?w=1200',
  },
];

const sightseeing: Sight[] = [
  {
    name: 'Рилски манастир',
    location: 'Рила',
    description:
      'Най-голямата и най-известна източноправославна обител в България, обект на ЮНЕСКО.',
    image_url:
      'https://images.unsplash.com/photo-1601113091108-7b4b3e3e0dca?w=1200',
  },
  {
    name: 'Античен театър',
    location: 'Пловдив',
    description:
      'Римски амфитеатър от II век, съхранен и до днес в центъра на Стария град.',
    image_url:
      'https://images.unsplash.com/photo-1591806024714-8526f4c8e7c3?w=1200',
  },
  {
    name: 'Белоградчишки скали',
    location: 'Белоградчик',
    description:
      'Уникални пясъчникови и варовикови скални образувания с крепост на върха.',
    image_url:
      'https://images.unsplash.com/photo-1615529162924-f8605388461d?w=1200',
  },
  {
    name: 'Крепост Царевец',
    location: 'Велико Търново',
    description:
      'Средновековна крепост – сърцето на Второто българско царство.',
    image_url:
      'https://images.unsplash.com/photo-1551649001-7a2482d98d05?w=1200',
  },
  {
    name: 'Шипченски проход',
    location: 'Стара планина',
    description:
      'Мемориал на свободата и паметник на героите от Руско-турската война.',
    image_url:
      'https://images.unsplash.com/photo-1617196035154-1e7e6e28b0db?w=1200',
  },
];

const hotels: Hotel[] = [
  {
    name: 'Хотел „Хебър"',
    city: 'Пазарджик',
    stars: 4,
    price_per_night_bgn: 140,
    description: 'Модерен семеен хотел с изглед към центъра на града.',
    image_url:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
  },
  {
    name: 'Хотел „Болярски"',
    city: 'Велико Търново',
    stars: 4,
    price_per_night_bgn: 165,
    description: 'Бутиков хотел с гледка към Царевец и река Янтра.',
    image_url:
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200',
  },
  {
    name: 'Хотел „Алегра"',
    city: 'Несебър',
    stars: 3,
    price_per_night_bgn: 120,
    description: 'Уютен хотел на две крачки от стария град и плажа.',
    image_url:
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200',
  },
  {
    name: 'Хотел „Борован"',
    city: 'Банско',
    stars: 5,
    price_per_night_bgn: 260,
    description: 'Луксозен СПА хотел в сърцето на Пирин планина.',
    image_url:
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200',
  },
  {
    name: 'Хотел „Пловдив 2000"',
    city: 'Пловдив',
    stars: 4,
    price_per_night_bgn: 150,
    description: 'Централно разположен хотел близо до Главната улица.',
    image_url:
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200',
  },
];

const transportation: Transport[] = [
  {
    type: 'Автобус',
    route: 'София – Пловдив',
    price_bgn: 18,
    description: 'Ежедневни директни линии, продължителност ~2 часа.',
  },
  {
    type: 'Автобус',
    route: 'София – Варна',
    price_bgn: 45,
    description: 'Нощни и дневни линии, продължителност ~7 часа.',
  },
  {
    type: 'Влак',
    route: 'София – Бургас',
    price_bgn: 35,
    description: 'Директен бърз влак, продължителност ~7:30 часа.',
  },
  {
    type: 'Микробус',
    route: 'Пловдив – Смолян',
    price_bgn: 22,
    description: 'Планински маршрут през Родопите.',
  },
  {
    type: 'Трансфер',
    route: 'Летище София – Банско',
    price_bgn: 120,
    description: 'Частен трансфер до ски курорта, до 4 пътника.',
  },
];

const team: Member[] = [
  {
    full_name: 'Александър Весели',
    role: 'Основател и водещ екскурзовод',
    email: 'alex.vesely07@gmail.com',
    phone: '+359 888 123 456',
    bio: 'Планинар и любител на българската история с над 10 години опит.',
  },
  {
    full_name: 'Мария Иванова',
    role: 'Мениджър „Резервации"',
    email: 'maria@ba-tours.bg',
    phone: '+359 888 234 567',
    bio: 'Отговаря за комуникация с клиентите и индивидуалните пакети.',
  },
  {
    full_name: 'Петър Георгиев',
    role: 'Шофьор и планински водач',
    email: 'petar@ba-tours.bg',
    phone: '+359 888 345 678',
    bio: 'Сертифициран планински водач за Рила, Пирин и Родопите.',
  },
  {
    full_name: 'Елена Димитрова',
    role: 'Координатор „Хотели"',
    email: 'elena@ba-tours.bg',
    phone: '+359 888 456 789',
    bio: 'Поддържа мрежата от партньорски хотели в цялата страна.',
  },
];

export async function seedDatabase(): Promise<void> {
  const { rows } = await pool.query<{ count: string }>(
    'SELECT COUNT(*)::text AS count FROM tours'
  );
  if (Number(rows[0].count) > 0) {
    console.log('Seed skipped – данни вече съществуват.');
    return;
  }

  for (const t of tours) {
    await pool.query(
      `INSERT INTO tours (name, region, duration_days, price_bgn, description, image_url)
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [t.name, t.region, t.duration_days, t.price_bgn, t.description, t.image_url]
    );
  }
  for (const s of sightseeing) {
    await pool.query(
      `INSERT INTO sightseeing (name, location, description, image_url)
       VALUES ($1,$2,$3,$4)`,
      [s.name, s.location, s.description, s.image_url]
    );
  }
  for (const h of hotels) {
    await pool.query(
      `INSERT INTO hotels (name, city, stars, price_per_night_bgn, description, image_url)
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [
        h.name,
        h.city,
        h.stars,
        h.price_per_night_bgn,
        h.description,
        h.image_url,
      ]
    );
  }
  for (const tr of transportation) {
    await pool.query(
      `INSERT INTO transportation (type, route, price_bgn, description)
       VALUES ($1,$2,$3,$4)`,
      [tr.type, tr.route, tr.price_bgn, tr.description]
    );
  }
  for (const m of team) {
    await pool.query(
      `INSERT INTO team (full_name, role, email, phone, bio)
       VALUES ($1,$2,$3,$4,$5)`,
      [m.full_name, m.role, m.email, m.phone, m.bio]
    );
  }
}
