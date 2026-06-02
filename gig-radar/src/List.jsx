import React from 'react';

const monthFormatter = new Intl.DateTimeFormat('uk-UA', { month: 'short' });
const weekDayFormatter = new Intl.DateTimeFormat('uk-UA', { weekday: 'long' });

export default function List({ events }) {
  const selectedDate = new Date('2026-05-24');
  const formattedDate = `${selectedDate.getDate()} ${monthFormatter.format(selectedDate)}, ${weekDayFormatter.format(selectedDate)}`;

  return (
    <section className="schedule-container">
      <div className="schedule-topbar">
        <div>
          <h2>Розклад виступів</h2>
          <p className="schedule-subtitle">Всі концертні події Івано-Франківська на одній панелі.</p>
        </div>
        <div className="schedule-datebox">
          <button className="date-nav" type="button">‹</button>
          <div className="date-current">{formattedDate}</div>
          <button className="date-nav" type="button">›</button>
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
          <option value="docker">Docker Pub</option>
          <option value="asort">Асортиментна Кімната</option>
          <option value="urban">Urban Space 100</option>
        </select>

        <label className="today-toggle">
          <input type="checkbox" /> Лише сьогодні
        </label>
      </div>

      {events.length === 0 ? (
        <div className="no-events">
          <p>Поки що немає запланованих виступів. Стань першим гуртом! 🎸</p>
        </div>
      ) : (
        <div className="events-table-wrap">
          <table className="events-table">
            <thead>
              <tr>
                <th>Час</th>
                <th>Гурт</th>
                <th>Місце</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>{event.time}</td>
                  <td>{event.bandName}</td>
                  <td>{event.place}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
