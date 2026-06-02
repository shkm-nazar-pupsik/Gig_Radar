import React from 'react';

export default function Map({ events = [] }) {
  return (
    <section className="map-placeholder" id="map">
      <div className="map-topbar">
        <div>
          <h2>Карта</h2>
          <p>Оберіть локацію або перегляньте активні події на мапі.</p>
        </div>
        <div className="map-controls">
          <button className="secondary-btn">+</button>
          <button className="secondary-btn">-</button>
        </div>
      </div>

      <div className="map-box">
        <div className="map-legend">
          <span className="marker-pill">1</span>
          <span className="marker-pill">2</span>
          <span className="marker-pill">3</span>
          <span className="marker-pill">4</span>
        </div>
        <div className="map-placeholder-content">
          <p>🗺️ Івано-Франківськ</p>
          <p>{events.length} активних подій</p>
        </div>
      </div>

      <div className="map-summary">
        <p>Всі показані події синхронізовані з розкладом праворуч, тож можна швидко обрати потрібний концерт.</p>
      </div>
    </section>
  );
}
