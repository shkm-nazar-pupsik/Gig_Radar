import React, { useState, useEffect, useMemo } from 'react';
import './LatestEvents.css';
import { getStatusKey, getStatusLabel } from './utils/checkpointUtils';

export default function LatestEvents({ checkpoints: externalCheckpoints = [] }) {
  const [checkpoints, setCheckpoints] = useState(externalCheckpoints);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [bandFilter, setBandFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    setCheckpoints(externalCheckpoints);
  }, [externalCheckpoints]);

  const handleAddHype = (id) => {
    setCheckpoints(prev =>
      prev.map(item => item.id === id ? { ...item, hype: (item.hype || 0) + 1 } : item)
    );
  };

  const sortedCheckpoints = useMemo(
    () => [...checkpoints].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)),
    [checkpoints]
  );

  const filteredCheckpoints = sortedCheckpoints.filter(item => {
    const matchesSearch =
      (item.title?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (item.bandName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (item.description?.toLowerCase() || '').includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || getStatusKey(item.status) === statusFilter;
    const matchesBand = bandFilter === 'all' || item.bandName === bandFilter;

    return matchesSearch && matchesStatus && matchesBand;
  });

  const uniqueBands = [...new Set(checkpoints.map(c => c.bandName).filter(Boolean))];

  const renderCard = (item, variant = 'grid') => {
    const statusKey = getStatusKey(item.status);
    const location = item.location || item.place || 'Локація не вказана';
    const meta = [location, item.time].filter(Boolean).join(' · ');

    return (
      <article
        key={item.id}
        className={`afisha-card afisha-card--${statusKey} afisha-card--${variant}`}
      >
        <div className="afisha-card__date">
          <span>{item.dateDay || '—'}</span>
          <small>{item.dateMonth || ''}</small>
        </div>

        <div className="afisha-card__main">
          <p className="afisha-card__band">{item.bandName || 'Невідомий гурт'}</p>
          <h3 className="afisha-card__title">{item.title}</h3>
          <p className="afisha-card__meta">{meta}</p>
          {item.description && variant === 'feed' && (
            <p className="afisha-card__desc">{item.description}</p>
          )}
        </div>

        <div className="afisha-card__side">
          <span className={`afisha-card__status afisha-card__status--${statusKey}`}>
            {getStatusLabel(item)}
          </span>
          <button
            type="button"
            onClick={() => handleAddHype(item.id)}
            className="afisha-card__hype"
          >
            🔥 {item.hype || 0}
          </button>
        </div>
      </article>
    );
  };

  return (
    <div className="latest-events-page">
      <header className="afisha-page-head">
        <h2>Афіша подій</h2>
        <p>Усе, що відбувається на сцені — від репетицій до концертів.</p>
      </header>

      <div className="afisha-controls">
        <input
          type="text"
          placeholder="Пошук..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="afisha-controls__search"
        />

        <select
          className="afisha-controls__select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Усі статуси</option>
          <option value="active">В процесі</option>
          <option value="planned">Заплановано</option>
          <option value="completed">Виконано</option>
        </select>

        <select
          className="afisha-controls__select"
          value={bandFilter}
          onChange={(e) => setBandFilter(e.target.value)}
        >
          <option value="all">Усі гурти</option>
          {uniqueBands.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>

        <div className="afisha-controls__view">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'is-active' : ''}
          >
            Сітка
          </button>
          <button
            type="button"
            onClick={() => setViewMode('timeline')}
            className={viewMode === 'timeline' ? 'is-active' : ''}
          >
            Стрічка
          </button>
        </div>
      </div>

      {filteredCheckpoints.length === 0 ? (
        <div className="afisha-empty">
          <p>Нічого не знайдено. Спробуй інший пошук або фільтр.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="afisha-grid">
          {filteredCheckpoints.map((item) => renderCard(item, 'grid'))}
        </div>
      ) : (
        <div className="afisha-feed">
          {filteredCheckpoints.map((item) => renderCard(item, 'feed'))}
        </div>
      )}
    </div>
  );
}
