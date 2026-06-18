-- Create bands table
CREATE TABLE IF NOT EXISTS bands (
  id TEXT PRIMARY KEY,
  role TEXT DEFAULT 'band',
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  approved BOOLEAN DEFAULT false,
  genres TEXT,
  description TEXT,
  logo TEXT,
  recent_events TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  role TEXT DEFAULT 'user',
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  favorite_genres TEXT,
  favorite_bands TEXT[],
  description TEXT,
  recent_events TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  date TEXT,
  date_day TEXT,
  date_month TEXT,
  time TEXT,
  band_name TEXT,
  title TEXT,
  place TEXT,
  location TEXT,
  status TEXT,
  status_text TEXT,
  description TEXT,
  progress INTEGER,
  hype INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert default data
INSERT INTO bands (id, role, name, email, password, approved, genres, description, logo, recent_events)
VALUES 
  ('band-1', 'band', 'Silent Road', 'silent@road.band', 'band123', true, 'Рок • Альтернатива • Івано-Франківськ', 'Ми — Silent Road, альтернативний рок-гурт з Івано-Франківська.', '/img/for-band.png', ARRAY['Нова пісня опублікована', 'Заплановано концерт']),
  ('band-2', 'band', 'Дми над містом', 'dmi@city.band', 'city123', false, 'Інді • Акустика', 'Атмосферний гурт, який створює музику для вечірніх зустрічей.', '/img/for-band.png', ARRAY['Запит на модерацію', 'Оновлено профіль']),
  ('band-3', 'band', 'Zypni', 'zypni@band.ua', 'zypni123', true, 'Панк • Психедельний рок', 'Експериментальний гурт, що грає психоделічний панк.', '/img/for-band.png', ARRAY['Запланована тур'])
ON CONFLICT (email) DO NOTHING;

INSERT INTO users (id, role, name, email, password, favorite_genres, favorite_bands, description, recent_events)
VALUES 
  ('user-1', 'user', 'Оля Слухач', 'olya@music.ua', 'user123', 'Рок, Альтернатива', ARRAY['Silent Road', 'Дми над містом'], 'Просто слухачка, яка любить живу музику у місті.', ARRAY['Додано в обране подію Silent Road', 'Підписанося на розсилку']),
  ('user-2', 'user', 'Маша Меломанка', 'masha@music.ua', 'user456', 'Інді, Панк, Психедельний рок', ARRAY['Zypni'], 'Люблю нестандартну музику та експерименти.', ARRAY['Підписалась на Zypni', 'Додала фото з концерту'])
ON CONFLICT (email) DO NOTHING;

INSERT INTO events (id, date, date_day, date_month, time, band_name, title, place, location, status, status_text, description, progress, hype)
VALUES 
  ('e1', '2026-05-24', '24', 'Трав', '19:00', 'METALOBRUCHT', 'Випускний метал-перформанс', 'Wagabundo', 'Wagabundo', 'active', 'Опубліковано', 'Великий сольний концерт із презентацією нових важких синглів.', 90, 142),
  ('e2', '2026-05-25', '25', 'Трав', '20:00', 'final', 'Закрита акустична сесія', 'Бар Блуд', 'Бар Блуд', 'completed', 'Опубліковано', 'Камерний виступ для поціновувачів та друзів гурту.', 100, 89),
  ('e3', '2026-06-02', '02', 'Черв', '18:30', 'Zypni', 'Запис та зведення альбому', 'Urban Space 100', 'Urban Space 100', 'active', 'Чергується', 'Етап підготовки треків до релізу.', 45, 64),
  ('e4', '2026-07-24', '24', 'Лип', '20:00', 'Бенчка Кафе', 'Концерт просто неба', 'Головна сцена', 'Головна сцена', 'planned', 'Опубліковано', 'Літній фестивальний виступ на відкритому майданчику.', 20, 215),
  ('e5', '2026-07-25', '25', 'Лип', '20:00', 'Акустична сцена', 'Вечір інді-музики', 'Ассортиментна Кімната', 'Ассортиментна Кімната', 'planned', 'Опубліковано', 'Ніжний та атмосферний лайв у галерейному просторі.', 15, 110),
  ('e6', '2026-07-26', '26', 'Лип', '18:30', 'Silent Road', 'Презентація довгоочікуваного EP', 'Urban Stage 100', 'Urban Stage 100', 'planned', 'Опубліковано', 'Головна подія літа для шанувальників прогресивної сцени.', 30, 320)
ON CONFLICT (id) DO NOTHING;
