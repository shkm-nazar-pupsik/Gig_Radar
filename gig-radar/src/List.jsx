import React from 'react';

const monthFormatter = new Intl.DateTimeFormat('uk-UA', { month: 'short' });
const weekDayFormatter = new Intl.DateTimeFormat('uk-UA', { weekday: 'long' });

export default function List({ events, selectedDate, onDateChange, onOpenMap, onBandClick }) {
  const handlePrevDay = () => {
    // Безпечно створюємо дату, якщо selectedDate поламаний
    const baseDate = selectedDate && !isNaN(selectedDate.getTime()) ? selectedDate : new Date();
    const newDate = new Date(baseDate);
    newDate.setDate(newDate.getDate() - 1);
    onDateChange(newDate);
  };

  const handleNextDay = () => {
    const baseDate = selectedDate && !isNaN(selectedDate.getTime()) ? selectedDate : new Date();
    const newDate = new Date(baseDate);
    newDate.setDate(newDate.getDate() + 1);
    onDateChange(newDate);
  };

  // НАДІЙНИЙ ЗАХИСТ: якщо дата не валідна, підміняємо її на поточний день
  const validSelectedDate = selectedDate && !isNaN(selectedDate.getTime()) ? selectedDate : new Date();

  // Безпечне форматування поточної дати для верхньої панелі
  let formattedDate = `${validSelectedDate.getDate()} ${monthFormatter.format(validSelectedDate)}, ${weekDayFormatter.format(validSelectedDate)}`;
  
  // Перетворюємо вибрану дату в рядок YYYY-MM-DD для фільтрації
  const selectedDateString = `${validSelectedDate.getFullYear()}-${String(validSelectedDate.getMonth() + 1).padStart(2, '0')}-${String(validSelectedDate.getDate()).padStart(2, '0')}`;
  
  // Фільтруємо події за вибраною датою з перевіркою на наявність даних
  const filteredEvents = (events || []).filter(event => {
    if (!event || !event.date) return false;
    return event.date === selectedDateString;
  });

  return (
    <section className="schedule-container">
      <div className="schedule-topbar">
        <div>
          <h2>Розклад виступів</h2>
          <p className="schedule-subtitle">Всі концертні події Івано-Франківська на одній панелі.</p>
        </div>
        <div className="schedule-actions">
          {onOpenMap && (
            <button className="map-open-btn" type="button" onClick={onOpenMap}>
              Показати на карті
            </button>
          )}
          <div className="schedule-datebox">
            <button className="date-nav" type="button" onClick={handlePrevDay}>‹</button>
            <div className="date-current">{formattedDate}</div>
            <button className="date-nav" type="button" onClick={handleNextDay}>›</button>
          </div>
        </div>
      </div>

      <div className="filters-panel">
        <select className="filter-select">
          <option value="all">Усі жанри</option>
          <option value="thrash">Thrash Metal</option>
          <option value="grunge">Grunge</option>
          <option value="punk">Punk Rock</option>
        </select>

        <select className="filter-select">
          <option value="all">Усі локації</option>
          <option value="Prom">Промприлад</option>
          <option value="Wagabundo">Вагабундо</option>
          <option value="Blood">Бар Блуд</option>
          <option value="urban">Urban Space 100</option>
        </select>
      </div>

      <div className="schedule-meta">
        <span className="events-count">
          {filteredEvents.length}{' '}
          {filteredEvents.length === 1 ? 'подія' : filteredEvents.length > 0 && filteredEvents.length < 5 ? 'події' : 'подій'}
        </span>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="no-events">
          <span className="no-events-icon" aria-hidden="true">🎸</span>
          <p className="no-events-title">На цей день виступів немає</p>
          <p className="no-events-hint">Оберіть іншу дату за допомогою стрілок угорі</p>
        </div>
      ) : (
        <ul className="events-list">
          {filteredEvents.map((event) => {
            const status = event.status || '';
            const isActive = status === 'active' || status === 'Опубліковано' || status === 'Активний' || status.toLowerCase().includes('опуб');
            return (
              <li key={event.id} className="event-card-row">
                <div className="event-time-block">
                  <span className="event-time-value">{event.time || '00:00'}</span>
                  <span className="event-time-label">початок</span>
                </div>
                <div className="event-details">
                  <h3 
                    className="event-band"
                    onClick={() => onBandClick && onBandClick(event.bandName)}
                    style={{ cursor: onBandClick ? 'pointer' : 'default' }}
                  >
                    {event.bandName}
                  </h3>
                  <p className="event-place">
                    <span className="event-place-icon" aria-hidden="true">📍</span>
                    {event.place || event.location}
                  </p>
                </div>
                <span className={"status-pill " + (isActive ? 'active' : 'planned')}>
                  {isActive ? 'Активний' : 'Запланований'}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

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

  if (value === 'active' || value === 'в процесі' || value.includes('опублік') || value.includes('актив') || value.includes('черг')) {
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
  let validIsoDate = '';
  
  // Ukrainian month name to number mapping (both genitive and nominative cases)
  const ukrainianMonths = {
    'січня': '01', 'січень': '01', 'лютого': '02', 'лютий': '02',
    'березня': '03', 'березень': '03', 'квітня': '04', 'квітень': '04',
    'травня': '05', 'травень': '05', 'червня': '06', 'червень': '06',
    'липня': '07', 'липень': '07', 'серпня': '08', 'серпень': '08',
    'вересня': '09', 'вересень': '09', 'жовтня': '10', 'жовтень': '10',
    'листопада': '11', 'листопад': '11', 'грудня': '12', 'грудень': '12'
  };
  
  // Безпечно дістаємо дату з форми створення події
  if (checkpoint && (checkpoint.date || checkpoint.datetime)) {
    const rawDate = checkpoint.date || checkpoint.datetime;
    
    // Try to parse Ukrainian date format (e.g., "24 червня" or "червня 24")
    const dateParts = rawDate.trim().split(/\s+/);
    
    // Format: "24 червня" or "24.06" or "24/06" or "24-06"
    if (dateParts.length >= 2) {
      // Check if first part is a number (day)
      const firstPart = dateParts[0].replace(/[.,\/-]/g, '');
      const secondPart = dateParts[1].toLowerCase().replace(/[.,\/-]/g, '');
      
      const month = ukrainianMonths[secondPart];
      
      if (firstPart && month && /^\d+$/.test(firstPart)) {
        // Format: "24 червня"
        const year = new Date().getFullYear();
        validIsoDate = `${year}-${month}-${firstPart.padStart(2, '0')}`;
      } else if (month && dateParts[1] && /^\d+$/.test(dateParts[1].replace(/[.,\/-]/g, ''))) {
        // Format: "червня 24"
        const year = new Date().getFullYear();
        const day = dateParts[1].replace(/[.,\/-]/g, '').padStart(2, '0');
        validIsoDate = `${year}-${month}-${day}`;
      }
    }
    
    // Try to parse numeric format (e.g., "24.06" or "24/06" or "24-06")
    if (!validIsoDate && /^\d{1,2}[.\/-]\d{1,2}([.\/-]\d{2,4})?$/.test(rawDate.trim())) {
      const parts = rawDate.trim().split(/[.\/-]/);
      if (parts.length >= 2) {
        const day = parts[0].padStart(2, '0');
        const month = parts[1].padStart(2, '0');
        const year = parts[2] ? (parts[2].length === 2 ? `20${parts[2]}` : parts[2]) : new Date().getFullYear();
        validIsoDate = `${year}-${month}-${day}`;
      }
    }
    
    // Try to parse ISO format (e.g., "2026-06-24")
    if (!validIsoDate && /^\d{4}-\d{2}-\d{2}$/.test(rawDate.trim())) {
      validIsoDate = rawDate.trim();
    }
    
    // If Ukrainian/numeric parsing failed, try standard Date parsing
    if (!validIsoDate) {
      const parsedDate = new Date(rawDate);
      if (!isNaN(parsedDate.getTime())) {
        validIsoDate = parsedDate.toISOString().split('T')[0];
      }
    }
  }
  
  if (!validIsoDate) {
    validIsoDate = new Date().toISOString().split('T')[0];
  }

  const dateParts = validIsoDate.split('-'); 
  const dateDay = dateParts[2] || '';
  
  const datePartsRaw = (checkpoint?.date || '').trim().split(/\s+/);
  const monthWord = (datePartsRaw[1] || '').toLowerCase();
  const dateMonth = MONTH_SHORT[monthWord] || (datePartsRaw[1] ? datePartsRaw[1].slice(0, 4) : dateParts[1]);
  
  const statusKey = getStatusKey(checkpoint?.status);

  return {
    id: `cp-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    date: validIsoDate, 
    dateDay,
    dateMonth,
    weekday: checkpoint?.day || '',
    time: checkpoint?.time || (checkpoint?.datetime ? checkpoint.datetime.split('T')[1]?.substring(0, 5) : '19:00'),
    bandName: bandName || 'Невідомий гурт',
    title: checkpoint?.title || checkpoint?.eventName || 'Концерт',
    place: checkpoint?.location || checkpoint?.place || 'Івано-Франківськ',
    location: checkpoint?.location || checkpoint?.place || 'Івано-Франківськ',
    status: statusKey,
    statusText: checkpoint?.status || 'Опубліковано',
    description: [checkpoint?.day, checkpoint?.time].filter(Boolean).join(' · '),
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