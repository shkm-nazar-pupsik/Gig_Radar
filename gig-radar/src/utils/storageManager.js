import { supabase } from './supabase.js';

// Прості дані за замовчуванням
const defaultBands = [
  {
    id: 'band-1',
    role: 'band',
    name: 'Silent Road',
    email: 'silent@road.band',
    password: 'band123',
    approved: true,
    genres: 'Рок • Альтернатива • Івано-Франківськ',
    description: 'Ми — Silent Road, альтернативний рок-гурт з Івано-Франківська.',
    logo: '/img/for-band.png',
    recentEvents: ['Нова пісня опублікована', 'Заплановано концерт'],
  },
  {
    id: 'band-2',
    role: 'band',
    name: 'Дми над містом',
    email: 'dmi@city.band',
    password: 'city123',
    approved: false,
    genres: 'Інді • Акустика',
    description: 'Атмосферний гурт, який створює музику для вечірніх зустрічей.',
    logo: '/img/for-band.png',
    recentEvents: ['Запит на модерацію', 'Оновлено профіль'],
  },
  {
    id: 'band-3',
    role: 'band',
    name: 'Zypni',
    email: 'zypni@band.ua',
    password: 'zypni123',
    approved: true,
    genres: 'Панк • Психедельний рок',
    description: 'Експериментальний гурт, що грає психоделічний панк.',
    logo: '/img/for-band.png',
    recentEvents: ['Запланована тур'],
  },
];

export const defaultEvents = [
  {
    id: 'e1',
    date: '2026-05-24',
    dateDay: '24',
    dateMonth: 'Трав',
    time: '19:00',
    bandName: 'METALOBRUCHT',
    title: 'Випускний метал-перформанс',
    place: 'Wagabundo',
    location: 'Wagabundo',
    status: 'active',
    statusText: 'Опубліковано',
    description: 'Великий сольний концерт із презентацією нових важких синглів.',
    progress: 90,
    hype: 142,
    createdAt: 1,
  },
  {
    id: 'e2',
    date: '2026-05-25',
    dateDay: '25',
    dateMonth: 'Трав',
    time: '20:00',
    bandName: 'final',
    title: 'Закрита акустична сесія',
    place: 'Бар Блуд',
    location: 'Бар Блуд',
    status: 'completed',
    statusText: 'Опубліковано',
    description: 'Камерний виступ для поціновувачів та друзів гурту.',
    progress: 100,
    hype: 89,
    createdAt: 2,
  },
  {
    id: 'e3',
    date: '2026-06-02',
    dateDay: '02',
    dateMonth: 'Черв',
    time: '18:30',
    bandName: 'Zypni',
    title: 'Запис та зведення альбому',
    place: 'Urban Space 100',
    location: 'Urban Space 100',
    status: 'active',
    statusText: 'Чергується',
    description: 'Етап підготовки треків до релізу.',
    progress: 45,
    hype: 64,
    createdAt: 3,
  },
  {
    id: 'e4',
    date: '2026-07-24',
    dateDay: '24',
    dateMonth: 'Лип',
    time: '20:00',
    bandName: 'Бенчка Кафе',
    title: 'Концерт просто неба',
    place: 'Головна сцена',
    location: 'Головна сцена',
    status: 'planned',
    statusText: 'Опубліковано',
    description: 'Літній фестивальний виступ на відкритому майданчику.',
    progress: 20,
    hype: 215,
    createdAt: 4,
  },
  {
    id: 'e5',
    date: '2026-07-25',
    dateDay: '25',
    dateMonth: 'Лип',
    time: '20:00',
    bandName: 'Акустична сцена',
    title: 'Вечір інді-музики',
    place: 'Ассортиментна Кімната',
    location: 'Ассортиментна Кімната',
    status: 'planned',
    statusText: 'Опубліковано',
    description: 'Ніжний та атмосферний лайв у галерейному просторі.',
    progress: 15,
    hype: 110,
    createdAt: 5,
  },
  {
    id: 'e6',
    date: '2026-07-26',
    dateDay: '26',
    dateMonth: 'Лип',
    time: '18:30',
    bandName: 'Silent Road',
    title: 'Презентація довгоочікуваного EP',
    place: 'Urban Stage 100',
    location: 'Urban Stage 100',
    status: 'planned',
    statusText: 'Опубліковано',
    description: 'Головна подія літа для шанувальників прогресивної сцени.',
    progress: 30,
    hype: 320,
    createdAt: 6,
  },
];

// Завантажити гурти з Supabase
export const loadBands = async () => {
  try {
    const { data, error } = await supabase
      .from('bands')
      .select('*');
    
    if (error) throw error;
    
    if (data && data.length > 0) {
      // Convert snake_case to camelCase for frontend
      return data.map(band => ({
        ...band,
        recentEvents: band.recent_events || [],
      }));
    }
    
    return defaultBands;
  } catch (error) {
    console.error('Error loading bands from Supabase:', error);
    return defaultBands;
  }
};

// Зберегти гурт в Supabase
export const saveBands = async (bands) => {
  try {
    for (const band of bands) {
      const { error } = await supabase
        .from('bands')
        .upsert({
          id: band.id,
          role: band.role,
          name: band.name,
          email: band.email,
          password: band.password,
          approved: band.approved,
          genres: band.genres,
          description: band.description,
          logo: band.logo,
          recent_events: band.recentEvents || [],
        });
      
      if (error) throw error;
    }
  } catch (error) {
    console.error('Error saving bands to Supabase:', error);
  }
};

export const loadEvents = async () => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*');
    
    if (error) throw error;
    
    if (data && data.length > 0) {
      // Convert snake_case to camelCase for frontend
      return data.map(event => ({
        ...event,
        dateDay: event.date_day,
        dateMonth: event.date_month,
        bandName: event.band_name,
        statusText: event.status_text,
      }));
    }
    
    return defaultEvents;
  } catch (error) {
    console.error('Error loading events from Supabase:', error);
    return defaultEvents;
  }
};

export const saveEvents = async (events) => {
  try {
    for (const event of events) {
      const { error } = await supabase
        .from('events')
        .upsert({
          id: event.id,
          date: event.date,
          date_day: event.dateDay,
          date_month: event.dateMonth,
          time: event.time,
          band_name: event.bandName,
          title: event.title,
          place: event.place,
          location: event.location,
          status: event.status,
          status_text: event.statusText,
          description: event.description,
          progress: event.progress,
          hype: event.hype || 0,
        });
      
      if (error) throw error;
    }
  } catch (error) {
    console.error('Error saving events to Supabase:', error);
  }
};

// Очистити все (для localStorage fallback)
export const clearAllData = () => {
  localStorage.removeItem('bands');
  localStorage.removeItem('users');
  localStorage.removeItem('events');
};

