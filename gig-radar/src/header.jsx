import React from 'react';

export default function Header() {
  return (
    <header className="main-header">
        <div className="logo">
        <h2>GigRadar</h2>
      </div>
      <nav className="nav-menu">
        <a href="#home">Головна</a>
        <a href="#map">Карта та розклад</a>
        <a href="#about">Про проєкт</a>
      </nav>

      <div className="auth-btn">
        <button>Увійти</button>
      </div>
    </header>
  );
}