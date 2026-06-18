import React from 'react';

const monthFormatter = new Intl.DateTimeFormat('uk-UA', { month: 'short' });
const weekDayFormatter = new Intl.DateTimeFormat('uk-UA', { weekday: 'long' });

export default function List({ events, selectedDate, onDateChange, onOpenMap }) {
  const handlePrevDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    onDateChange(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    onDateChange(newDate);
  };

  const formattedDate = `${selectedDate.getDate()} ${monthFormatter.format(selectedDate)}, ${weekDayFormatter.format(selectedDate)}`;
  
  // Format selected date to YYYY-MM-DD for filtering
  const selectedDateString = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
  
  // Filter events by selected date
  const filteredEvents = events.filter(event => event.date === selectedDateString);

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

        <label className="today-toggle">
          <input type="checkbox" /> Лише сьогодні
        </label>
      </div>

      <div className="schedule-meta">
        <span className="events-count">
          {filteredEvents.length}{' '}
          {filteredEvents.length === 1 ? 'подія' : filteredEvents.length < 5 ? 'події' : 'подій'}
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
            const isActive = status === 'Опубліковано' || status === 'Активний' || status.toLowerCase().includes('опуб');
            return (
              <li key={event.id} className="event-card-row">
                <div className="event-time-block">
                  <span className="event-time-value">{event.time}</span>
                  <span className="event-time-label">початок</span>
                </div>
                <div className="event-details">
                  <h3 className="event-band">{event.bandName}</h3>
                  <p className="event-place">
                    <span className="event-place-icon" aria-hidden="true">📍</span>
                    {event.place}
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
