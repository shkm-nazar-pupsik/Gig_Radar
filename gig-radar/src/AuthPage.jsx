import { useState } from 'react';

export default function AuthPage({ currentUser, onLogin, onRegister, onNavigate }) {
  const [authMode, setAuthMode] = useState('login');
  const [registerType, setRegisterType] = useState('band');
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [authError, setAuthError] = useState('');

  const handleAuthChange = (e) => {
    const { name, value } = e.target;
    setAuthForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthError('');

    if (authMode === 'login') {
      const error = onLogin({ email: authForm.email, password: authForm.password });
      if (error) {
        setAuthError(error);
      }
    } else {
      const error = onRegister({
        name: authForm.name,
        email: authForm.email,
        password: authForm.password,
        confirm: authForm.confirm,
        registerType,
      });
      if (error) {
        setAuthError(error);
      }
    }
  };

  if (currentUser) {
    return (
      <section className="auth-section">
        <div className="auth-box">
          <div className="auth-welcome">
            <h2>Вітаємо, {currentUser.name}!</h2>
            <p>Ви вже увійшли в систему.</p>
            <button className="primary-btn" type="button" onClick={() => onNavigate('profile')}>
              Перейти до профілю
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="auth-section">
      <div className="auth-box">
        <div className="auth-tabs">
          <button
            className={authMode === 'login' ? 'active' : ''}
            type="button"
            onClick={() => {
              setAuthMode('login');
              setAuthError('');
            }}
          >
            Увійти
          </button>
          <button
            className={authMode === 'register' ? 'active' : ''}
            type="button"
            onClick={() => {
              setAuthMode('register');
              setAuthError('');
            }}
          >
            Реєстрація
          </button>
        </div>

        <form className="auth-form" onSubmit={handleAuthSubmit}>
          {authMode === 'register' && (
            <>
              <div className="form-group">
                <label>Реєстрація як</label>
                <div className="register-type-row">
                  <label>
                    <input
                      type="radio"
                      name="registerType"
                      value="band"
                      checked={registerType === 'band'}
                      onChange={() => setRegisterType('band')}
                    />
                    Гурт
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="registerType"
                      value="user"
                      checked={registerType === 'user'}
                      onChange={() => setRegisterType('user')}
                    />
                    Користувач
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="name">{registerType === 'band' ? 'Назва гурту' : 'Ім’я користувача'}</label>
                <input
                  id="name"
                  name="name"
                  value={authForm.name}
                  onChange={handleAuthChange}
                  placeholder={registerType === 'band' ? 'Silent Road' : 'Оля Слухач'}
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              value={authForm.email}
              onChange={handleAuthChange}
              placeholder="email@domain.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              name="password"
              type="password"
              value={authForm.password}
              onChange={handleAuthChange}
              placeholder="********"
            />
          </div>
          {authMode === 'register' && (
            <div className="form-group">
              <label htmlFor="confirm">Підтвердіть пароль</label>
              <input
                id="confirm"
                name="confirm"
                type="password"
                value={authForm.confirm}
                onChange={handleAuthChange}
                placeholder="********"
              />
            </div>
          )}
          {authError && <div className="auth-error">{authError}</div>}
          <button type="submit" className="primary-btn auth-submit">
            {authMode === 'login' ? 'Увійти' : 'Зареєструватися'}
          </button>
        </form>

        <div className="auth-note">
          <p>Адміни можуть увійти як:</p>
          <p><strong>admin@iflive.local / admin123</strong></p>
          <p><strong>friend@iflive.local / friend123</strong></p>
        </div>
      </div>
    </section>
  );
}
