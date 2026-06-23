import { useState } from 'react';

export default function Header({ currentPage, onNavigate, onAuthAction, isLoggedIn, onLogout }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleNavClick = (page) => {
    onNavigate(page);
    setShowMobileMenu(false);
  };

  return (
    <header className="main-header">
      <div className="logo">
        <h2>GigRadar</h2>
      </div>

      <nav className={`nav-menu ${showMobileMenu ? 'nav-menu--open' : ''}`}>
        <button
          type="button"
          className={currentPage === 'home' ? 'nav-link active' : 'nav-link'}
          onClick={() => handleNavClick('home')}
        >
          Головна
        </button>
        <button
          type="button"
          className={currentPage === 'about' ? 'nav-link active' : 'nav-link'}
          onClick={() => handleNavClick('about')}
        >
          Останні події
        </button>
        <button
          type="button"
          className={currentPage === 'map' ? 'nav-link active' : 'nav-link'}
          onClick={() => handleNavClick('map')}
        >
          Карта та розклад
        </button>
        
        <div className="auth-btn">
          {isLoggedIn ? (
            <>
              <button type="button" onClick={() => { onAuthAction(); setShowMobileMenu(false); }}>
                Мій профіль
              </button>
              <button type="button" onClick={handleLogoutClick}>
                Вийти
              </button>
            </>
          ) : (
            <button type="button" onClick={() => { onAuthAction(); setShowMobileMenu(false); }}>
              Увійти
            </button>
          )}
        </div>
      </nav>

      <button
        className="burger-menu"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

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