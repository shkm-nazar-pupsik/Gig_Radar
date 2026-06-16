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

export default function Map({ events = [] }) {
  const frankivskCenter = [48.9215, 24.7097]; 
  const activeEvents = events.length > 0 ? events : defaultEvents;

  return (
    <section className="map-placeholder" id="map">
      <div className="map-topbar">
        <div>
          <h2>Карта</h2>
          <p>Оберіть локацію або перегляньте активні події на мапі.</p>
        </div>
        <div className="map-controls">
          <p style={{ color: '#888', fontSize: '0.9rem', margin: 0 }}>
            {activeEvents.length} active events
          </p>
        </div>
      </div>

      <div className="map-box" style={{ padding: 0, overflow: 'hidden', height: '400px', position: 'relative' }}>
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
                  <p className="popup-time">🕒 {event.time} ({event.date})</p>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      <div className="map-summary">
        <p>Всі показані події синхронізовані з розкладом праворуч, тож можна швидко обрати потрібний концерт.</p>
      </div>
    </section>
  );
}