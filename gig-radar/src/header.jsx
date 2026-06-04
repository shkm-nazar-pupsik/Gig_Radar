export default function Header({ currentPage, onNavigate, onAuthAction, isLoggedIn }) {
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
          className={currentPage === 'map' ? 'nav-link active' : 'nav-link'}
          onClick={() => onNavigate('map')}
        >
          Карта та розклад
        </button>
        <button
          type="button"
          className={currentPage === 'about' ? 'nav-link active' : 'nav-link'}
          onClick={() => onNavigate('about')}
        >
          Про проєкт
        </button>
      </nav>

      <div className="auth-btn">
        <button type="button" onClick={onAuthAction}>
          {isLoggedIn ? 'Мій профіль' : 'Увійти'}
        </button>
      </div>
    </header>
  );
}