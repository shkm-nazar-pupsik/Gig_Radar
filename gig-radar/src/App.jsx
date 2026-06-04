import React, { useState } from 'react';
import './App.css';
import Header from './header';
import List from './List';
import Map from './Map';
import Footer from './footer';

const initialEvents = [
  {
    id: 'e1',
    date: '2026-05-24',
    time: '19:00',
    bandName: 'METALOBRUCHT',
    place: 'Wagabundo',
    status: 'Опубліковано',
  },
  {
    id: 'e2',
    date: '2026-05-25',
    time: '20:00',
    bandName: 'final',
    place: 'Бар Блуд',
    status: 'Опубліковано',
  },
  {
    id: 'e3',
    date: '2026-06-02',
    time: '18:30',
    bandName: 'Zypni',
    place: 'Urban Space 100',
    status: 'Чергується',
  },
];  

export default function App() {
  const [events] = useState(initialEvents);

  return (
    <div className="app-container">
      {/* Хедер сайту */}
      <Header />

      {/* Головний контент сайту */}
      <main className="main-content">
        <List events={events} />
        <Map events={events} />
      </main>

      {/* Футер сайту */}
      <Footer />
    </div>
  );
}