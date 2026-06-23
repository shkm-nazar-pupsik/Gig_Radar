import { useState } from 'react';

export default function Header({ currentPage, onNavigate, onAuthAction, isLoggedIn, onLogout }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    onLogout();
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  return (
    <header className="main-header">
      <div className="logo">
        <h2>GigRadar</h2>
      </div>
      <nav className="nav-menu">
        <button
          type="button"
          className={currentPage === 'home' ? 'nav-link active' : 'nav-link'}
          onClick={() => onNavigate('home')}
        >
          Головна
        </button>
        <button
          type="button"
          className={currentPage === 'about' ? 'nav-link active' : 'nav-link'}
          onClick={() => onNavigate('about')}
        >
          Останні події
        </button>
        <button
          type="button"
          className={currentPage === 'map' ? 'nav-link active' : 'nav-link'}
          onClick={() => onNavigate('map')}
        >
          Карта та розклад
        </button>
      </nav>

      <div className="auth-btn">
        {isLoggedIn ? (
          <>
            <button type="button" onClick={onAuthAction}>
              Мій профіль
            </button>
            <button type="button" onClick={handleLogoutClick}>
              Вийти
            </button>
          </>
        ) : (
          <button type="button" onClick={onAuthAction}>
            Увійти
          </button>
        )}
      </div>

      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Підтвердження виходу</h3>
            <p>Ви впевнені, що хочете вийти?</p>
            <div className="modal-buttons">
              <button type="button" className="secondary-btn" onClick={handleLogoutCancel}>
                Скасувати
              </button>
              <button type="button" className="primary-btn" onClick={handleLogoutConfirm}>
                Вийти
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}