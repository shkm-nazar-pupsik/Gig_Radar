import React, { useState } from 'react';

const monthFormatter = new Intl.DateTimeFormat('uk-UA', { month: 'short' });
const weekDayFormatter = new Intl.DateTimeFormat('uk-UA', { weekday: 'long' });

export default function List({ events }) {
  const [selectedDate, setSelectedDate] = useState(new Date('2026-05-24'));
  
  const handlePrevDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const formattedDate = `${selectedDate.getDate()} ${monthFormatter.format(selectedDate)}, ${weekDayFormatter.format(selectedDate)}`;

  return (
    <section className="schedule-container">
      <div className="schedule-topbar">
        <div>
          <h2>Розклад виступів</h2>
          <p className="schedule-subtitle">Всі концертні події Івано-Франківська на одній панелі.</p>
        </div>
        <div className="schedule-datebox">
          <button className="date-nav" type="button" onClick={handlePrevDay}>‹</button>
          <div className="date-current">{formattedDate}</div>
          <button className="date-nav" type="button" onClick={handleNextDay}>›</button>
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

      {events.length === 0 ? (
        <div className="no-events">
          <p>Поки що немає запланованих виступів. Стань першим гуртом!</p>
        </div>
      ) : (
        <div className="events-table-wrap">
          <table className="events-table">
            <thead>
              <tr>
                <th>Час</th>
                <th>Гурт</th>
                <th>Місце</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => {
                const status = event.status || '';
                const isActive = status === 'Опубліковано' || status === 'Активний' || status.toLowerCase().includes('опуб');
                return (
                  <tr key={event.id}>
                    <td>{event.time}</td>
                    <td>{event.bandName}</td>
                    <td>{event.place}</td>
                    <td>
                      <span className={"status-pill " + (isActive ? 'active' : 'planned')}>
                        {isActive ? 'Активний' : 'Запланований'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
