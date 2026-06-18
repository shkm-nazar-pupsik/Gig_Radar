import React, { useState } from 'react';

// Масив для автоматичного переведення номера місяця у текстовий формат
const MONTHS_UA = [
  'Січ', 'Лют', 'Бер', 'Квіт', 'Трав', 'Черв',
  'Лип', 'Серп', 'Врес', 'Жовт', 'Лист', 'Груд'
];

export default function Profile({ currentUser, isAdmin, onAddEvent }) {
  // Стейти для полів форми створення нової події
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('19:00');

  // Перевіряємо, чи цей профіль належить гурту
  const isBand = currentUser?.role === 'band';

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !location || !date) {
      alert('Будь ласка, заповніть обовʼязкові поля: Назва, Локація та Дата.');
      return;
    }

    // Розбиваємо стандартну дату "2026-06-16" на окремі частини
    const dateParts = date.split('-'); // ['2026', '06', '16']
    const day = dateParts[2]; // '16'
    const monthIndex = parseInt(dateParts[1], 10) - 1; // індекс від 0 до 11
    const monthText = MONTHS_UA[monthIndex] || 'Черв';

    // Формуємо об'єкт події, який очікує App.jsx
    const newCheckpointData = {
      title,
      location,
      description,
      date,
      time,
      dateDay: day,
      dateMonth: monthText
    };

    // Передаємо дані "нагору" в App.jsx через пропс
    if (onAddEvent) {
      onAddEvent(newCheckpointData);
    }

    // Очищаємо поля форми після успішного створення
    setTitle('');
    setLocation('');
    setDescription('');
    setDate('');
    setTime('19:00');
  };

  if (!currentUser) return null;

  return (
    <div className="profile-container" style={{ padding: '20px', width: '100%' }}>
      
      {/* 1. Блок інформації про гурт/користувача */}
      <div className="profile-card" style={{ marginBottom: '30px', background: '#1e1e1e', padding: '20px', borderRadius: '8px', color: '#fff' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <img 
            src={currentUser.logo || '/img/for-band.png'} 
            alt={currentUser.name} 
            style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} 
          />
          <div>
            <h2 style={{ margin: '0 0 10px 0' }}>{currentUser.name}</h2>
            <span style={{ background: '#ff4757', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
              {currentUser.role === 'band' ? 'Музичний гурт' : 'Слухач'}
            </span>
            <p style={{ margin: '10px 0 0 0', color: '#aaa' }}>
              <strong>Жанри:</strong> {currentUser.genres || 'Альтернатива / Рок'}
            </p>
          </div>
        </div>
        
        <div style={{ marginTop: '20px', borderTop: '1px solid #333', paddingTop: '15px' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>Про нас</h3>
          <p style={{ color: '#ccc', lineHeight: '1.5' }}>{currentUser.description}</p>
        </div>
      </div>

      {/* 2. Форма створення івенту (показується ТІЛЬКИ гурту, коли він залогінений) */}
      {isBand && onAddEvent && (
        <div className="create-event-card" style={{ background: '#1e1e1e', padding: '25px', borderRadius: '8px', color: '#fff' }}>
          <h3 style={{ margin: '0 0 20px 0', borderBottom: '2px solid #ff4757', paddingBottom: '10px' }}>
            Створити новий чекпойнт / подію
          </h3>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '14px', color: '#aaa' }}>Назва події чи етапу *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Наприклад: Випускний метал-перформанс або Запис альбому"
                style={{ padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#2d2d2d', color: '#fff' }}
                required
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '14px', color: '#aaa' }}>Локація / Клуб / Сцена *</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Наприклад: Wagabundo або Urban Space 100"
                style={{ padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#2d2d2d', color: '#fff' }}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1 }}>
                <label style={{ fontSize: '14px', color: '#aaa' }}>Дата *</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{ padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#2d2d2d', color: '#fff' }}
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1 }}>
                <label style={{ fontSize: '14px', color: '#aaa' }}>Час початку</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  style={{ padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#2d2d2d', color: '#fff' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '14px', color: '#aaa' }}>Опис чекпойнту (що буде відбуватися)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Короткий опис для твоїх слухачів..."
                rows="4"
                style={{ padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#2d2d2d', color: '#fff', resize: 'vertical' }}
              />
            </div>

            <button 
              type="submit" 
              style={{ padding: '12px', background: '#ff4757', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', transition: 'background 0.2s' }}
              onMouseOver={(e) => e.target.style.background = '#ff6b81'}
              onMouseOut={(e) => e.target.style.background = '#ff4757'}
            >
              Опублікувати подію
            </button>

          </form>
        </div>
      )}

    </div>
  );
}