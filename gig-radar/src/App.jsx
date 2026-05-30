import React, { useState } from 'react';
import './App.css'; 
import Header from './header';
import List from './List';
import Map from './Map';
import Footer from './footer';

export default function App() {
  // Створюємо головний порожній масив для концертів, 
  // який потім буде заповнюватися з профілів музикантів
  const [events, setEvents] = useState([]);

  return (
    <div className="app-container">
      {/* Хедер сайту */}
      <Header />

      {/* Головний контент сайту */}
      <main className="main-content">
        {/* Передаємо наш порожній масив у компонент списку як пропс */}
        <List events={events} />
        
        {/* Карта (потім сюди теж можна буде передати events) */}
        <Map />
      </main>

      {/* Футер сайту */}
      <Footer />
    </div>
  );
}