export default function AccountSwitcher({ activeRole, onSwitch }) {
  return (
    <aside className="account-switcher">
      <div className="switcher-header">
        <h3>Переключити акаунт</h3>
        <p>Швидкий доступ до різних ролей.</p>
      </div>
      <div className="switcher-buttons">
        <button
          type="button"
          className={activeRole === 'guest' ? 'active' : ''}
          onClick={() => onSwitch('guest')}
        >
          Гість
        </button>
        <button
          type="button"
          className={activeRole === 'user' ? 'active' : ''}
          onClick={() => onSwitch('user')}
        >
          Слухач
        </button>
        <button
          type="button"
          className={activeRole === 'band' ? 'active' : ''}
          onClick={() => onSwitch('band')}
        >
          Гурт
        </button>
        <button
          type="button"
          className={activeRole === 'admin' ? 'active' : ''}
          onClick={() => onSwitch('admin')}
        >
          Адмін
        </button>
      </div>
    </aside>
  );
}
