const MONTH_SHORT = {
  січня: 'Січ',
  лютого: 'Лют',
  березня: 'Бер',
  квітня: 'Кві',
  травня: 'Трав',
  червня: 'Черв',
  липня: 'Лип',
  серпня: 'Сер',
  вересня: 'Вер',
  жовтня: 'Жов',
  листопада: 'Лис',
  грудня: 'Гру',
};

export const getStatusKey = (status) => {
  const value = (status || '').toLowerCase();

  if (value === 'active' || value === 'в процесі' || value.includes('опублік') || value.includes('черг')) {
    return 'active';
  }

  if (value === 'planned' || value.includes('заплан')) {
    return 'planned';
  }

  if (value === 'completed' || value.includes('викон')) {
    return 'completed';
  }

  return 'planned';
};

export const getStatusLabel = (item) => {
  if (item.statusText) return item.statusText;

  const key = getStatusKey(item.status);
  if (key === 'active') return 'В процесі';
  if (key === 'planned') return 'Заплановано';
  return 'Виконано';
};

export const checkpointToEvent = (checkpoint, bandName) => {
  const dateParts = (checkpoint.date || '').trim().split(/\s+/);
  const dateDay = dateParts[0] || '';
  const monthWord = (dateParts[1] || '').toLowerCase();
  const dateMonth = MONTH_SHORT[monthWord] || (dateParts[1] ? dateParts[1].slice(0, 4) : '');
  const statusKey = getStatusKey(checkpoint.status);

  return {
    id: `cp-${Date.now()}`,
    date: checkpoint.date,
    dateDay,
    dateMonth,
    weekday: checkpoint.day,
    time: checkpoint.time,
    bandName: bandName || 'Невідомий гурт',
    title: checkpoint.title,
    place: checkpoint.location,
    location: checkpoint.location,
    status: statusKey,
    statusText: checkpoint.status,
    description: [checkpoint.day, checkpoint.time].filter(Boolean).join(' · '),
    progress: statusKey === 'completed' ? 100 : statusKey === 'active' ? 50 : 15,
    hype: 0,
    createdAt: Date.now(),
  };
};

export const eventToProfileCheckpoint = (event) => {
  const monthLower = (event.dateMonth || '').toLowerCase();
  const monthFull = Object.entries(MONTH_SHORT).find(([, short]) => short.toLowerCase() === monthLower)?.[0];

  return {
    id: event.id,
    date: event.date || `${event.dateDay} ${monthFull || event.dateMonth || ''}`.trim(),
    day: event.weekday || '',
    title: event.title,
    location: event.location || event.place || '',
    time: event.time || '',
    status: event.statusText || getStatusLabel(event),
  };
};
