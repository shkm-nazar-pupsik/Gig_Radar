import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css'; 
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const defaultEvents = [
  { id: '1', time: '19:00', bandName: 'METALOBRUCHT', place: 'Wagabundo', date: '24 трав.', coordinates: [48.9229, 24.7101] },
  { id: '2', time: '20:00', bandName: 'final', place: 'Бар Блуд', date: '24 трав.', coordinates: [48.9192, 24.7099] },
  { id: '3', time: '18:30', bandName: 'Zypni', place: 'Urban Space 100', date: '24 трав.', coordinates: [48.9205, 24.7103] }
];

function MapResizeFix() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }, [map]);
  return null;
}

export default function Map({ events = [], selectedDate, onClose }) {
  const frankivskCenter = [48.9215, 24.7097];
  
  // Format selected date to YYYY-MM-DD for comparison
  const selectedDateString = selectedDate 
    ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
    : null;
  
  // Filter events by selected date
  const filteredEvents = events.length > 0 
    ? events.filter(event => event.date === selectedDateString)
    : [];
  
  const activeEvents = filteredEvents.length > 0 ? filteredEvents : [];

  return (
    <section className="map-placeholder" id="map">
      <div className="map-topbar">
        <div>
          <h2>Карта</h2>
          <p>События на {selectedDate ? selectedDate.toLocaleDateString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric' }) : 'цей день'}</p>
        </div>
        <div className="map-controls">
          <p className="map-event-count">
            {activeEvents.length} {activeEvents.length === 1 ? 'подія' : 'подій'}
          </p>
          {onClose && (
            <button className="map-close-btn" type="button" onClick={onClose} aria-label="Закрити карту">
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="map-box map-box-modal">
        {activeEvents.length === 0 ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            background: '#0f0f14',
            color: '#a8a2b4',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Немає подій на цей день
          </div>
        ) : (
        <MapContainer 
          center={frankivskCenter} 
          zoom={14} 
          scrollWheelZoom={true} 
          style={{ height: "100%", width: "100%", background: "#e0e0e0" }}
        >
          <MapResizeFix />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          {activeEvents.map((event) => {
            if (!event.coordinates) return null;

            return (
              <Marker key={event.id} position={event.coordinates}>
                <Popup className="custom-leaflet-popup">
                  <h3>{event.bandName}</h3>
                  <p className="popup-place">📍 {event.place}</p>
                  <p className="popup-time">🕒 {event.time}</p>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
        )}
      </div>

      <div className="map-summary">
        <p>Всі показані події синхронізовані з розкладом, тож можна швидко обрати потрібний концерт.</p>
      </div>
    </section>
  );
}