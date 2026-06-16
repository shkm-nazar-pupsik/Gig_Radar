import React, { useMemo, useState } from 'react';
import './App.css';
import Header from './header';
import Home from './Home.jsx';
import AuthPage from './AuthPage.jsx';
import AccountSwitcher from './AccountSwitcher.jsx';
import AdminProfile from './AdminProfile.jsx';
import List from './List';
import Map from './Map';
import Profile from './Profile.jsx';
import UserProfile from './UserProfile.jsx';
import Footer from './footer';

const adminAccounts = [
  { id: 'admin-1', name: 'Admin', email: 'admin@iflive.local', password: 'admin123' },
  { id: 'admin-2', name: 'Friend', email: 'friend@iflive.local', password: 'friend123' },
];

const initialEvents = [
  {
    id: '1',
    time: '19:00',
    bandName: 'Металобрухт',
    place: 'Wagabundo',
    status: 'Активний',
    coordinates: [48.9229, 24.7101] // Вагабундо
  },
  {
    id: '2',
    time: '20:00',
    bandName: 'final',
    place: 'Бар Блуд',
    status: 'Запланований',
    coordinates: [48.9192, 24.7099] // Блуд
  },
  {
    id: '3',
    time: '18:30',
    bandName: 'Zypni',
    place: 'Urban Space 100',
    status: 'Запланований',
    coordinates: [48.9205, 24.7103] // Urban Space
  },
  {
    id: '4',
    time: '18:00',
    bandName: 'Smashed',
    place: 'Бар Блуд',
    status: 'Активний',
    coordinates: [48.9192, 24.7099] // Блуд
  }
]; 

export default function App() {
  const [page, setPage] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);

  const [bandAccounts, setBandAccounts] = useState([
    {
      id: 'band-1',
      role: 'band',
      name: 'Silent Road',
      email: 'silent@road.band',
      password: 'band123',
      approved: true,
      genres: 'Рок • Альтернатива • Івано-Франківськ',
      description: 'Ми — Silent Road, альтернативний рок-гурт з Івано-Франківська.',
      logo: '/img/for-band.png',
      recentEvents: ['Нова пісня опублікована', 'Заплановано концерт'],
    },
    {
      id: 'band-2',
      role: 'band',
      name: 'Дми над містом',
      email: 'dmi@city.band',
      password: 'city123',
      approved: false,
      genres: 'Інді • Акустика',
      description: 'Атмосферний гурт, який створює музику для вечірніх зустрічей.',
      logo: '/img/for-band.png',
      recentEvents: ['Запит на модерацію', 'Оновлено профіль'],
    },
  ]);

  const [userAccounts, setUserAccounts] = useState([
    {
      id: 'user-1',
      role: 'user',
      name: 'Оля Слухач',
      email: 'olya@music.ua',
      password: 'user123',
      favoriteGenres: 'Рок, Альтернатива',
      favoriteBands: ['Silent Road', 'Дми над містом'],
      description: 'Просто слухачка, яка любить живу музику у місті.',
      recentEvents: ['Додано в обране подію Silent Road', 'Підписанося на розсилку'],
    },
  ]);

  const isAdmin = currentUser?.role === 'admin';
  const currentAccount = currentUser?.role || 'guest';

  const accountGroups = useMemo(
    () => [
      { role: 'admin', list: adminAccounts },
      { role: 'band', list: bandAccounts },
      { role: 'user', list: userAccounts },
    ],
    [bandAccounts, userAccounts]
  );

  const accountMap = useMemo(
    () => ({
      guest: null,
      user: userAccounts[0] || null,
      band: bandAccounts[0] || null,
      admin: adminAccounts[0] || null,
    }),
    [bandAccounts, userAccounts]
  );

  const featuredBand = useMemo(
    () => bandAccounts.find((band) => band.approved) || bandAccounts[0] || null,
    [bandAccounts]
  );

  const addActivity = (text) => {
    // activity log currently stored for future use
    console.debug(text);
  };

  const handleRegister = ({ name, email, password, confirm, registerType }) => {
    if (!name || !email || !password || !confirm) {
      return 'Заповніть всі поля форми реєстрації.';
    }

    if (password !== confirm) {
      return 'Паролі не співпадають.';
    }

    const emailExists =
      bandAccounts.some((band) => band.email === email) ||
      userAccounts.some((user) => user.email === email) ||
      adminAccounts.some((admin) => admin.email === email);

    if (emailExists) {
      return 'Користувач з таким email вже існує.';
    }

    if (registerType === 'band') {
      const newBand = {
        id: `band-${Date.now()}`,
        role: 'band',
        name,
        email,
        password,
        approved: false,
        genres: 'Жанри не вказано',
        description: 'Профіль нового гурту. Додайте опис після входу.',
        logo: '/img/for-band.png',
        recentEvents: ['Новий гурт зареєструвався'],
      };
      setBandAccounts((prev) => [newBand, ...prev]);
      setCurrentUser(newBand);
      addActivity(`Гурт ${newBand.name} зареєструвався`);
    } else {
      const newUser = {
        id: `user-${Date.now()}`,
        role: 'user',
        name,
        email,
        password,
        favoriteGenres: 'Рок, Альтернатива',
        favoriteBands: ['Silent Road', 'Дми над містом'],
        description: 'Слухач платформи IF Live.',
        recentEvents: ['Реєстрація користувача'],
      };
      setUserAccounts((prev) => [newUser, ...prev]);
      setCurrentUser(newUser);
      addActivity(`Користувач ${newUser.name} зареєструвався`);
    }

    setPage('profile');
    return null;
  };

  const handleLogin = ({ email, password }) => {
    for (const group of accountGroups) {
      const account = group.list.find((item) => item.email === email && item.password === password);
      if (!account) continue;

      setCurrentUser(account);
      addActivity(
        `${group.role === 'admin' ? 'Адмін' : group.role === 'band' ? 'Гурт' : 'Користувач'} ${account.name} увійшов у систему`
      );
      setPage('profile');
      return null;
    }

    return 'Невірний email або пароль.';
  };

  const handleSwitchAccount = (role) => {
    setCurrentUser(accountMap[role] || null);
    setPage(role === 'guest' ? 'home' : 'profile');
  };

  const toggleBandApproval = (bandId) => {
    setBandAccounts((prev) =>
      prev.map((band) => {
        if (band.id !== bandId) return band;
        const updated = { ...band, approved: !band.approved };
        addActivity(`${updated.name} ${updated.approved ? 'підтверджено' : 'знято з перевірки'}`);
        return updated;
      })
    );
  };

  const renderProfileContent = () => {
    if (!currentUser) {
      return (
        <div className="auth-notice">
          <p>Щоб побачити свій профіль, спочатку увійдіть або зареєструйтесь через кнопку у хедері.</p>
        </div>
      );
    }

    if (currentUser.role === 'user') {
      return (
        <>
          <Profile currentUser={featuredBand} isAdmin={false} />
          <UserProfile currentUser={currentUser} />
        </>
      );
    }

    if (currentUser.role === 'band') {
      return <Profile currentUser={currentUser} isAdmin={isAdmin} />;
    }

    return <AdminProfile bandAccounts={bandAccounts} onToggleApproval={toggleBandApproval} />;
  };
  const [events] = useState(initialEvents);

  return (
    <div className="app-container">
      <Header
        currentPage={page}
        onNavigate={setPage}
        onAuthAction={() => setPage(currentUser ? 'profile' : 'auth')}
        isLoggedIn={Boolean(currentUser)}
      />

      <main className="main-content">
        {page === 'auth' ? (
          <AuthPage
            currentUser={currentUser}
            onLogin={handleLogin}
            onRegister={handleRegister}
            onNavigate={setPage}
          />
        ) : (
          <div className={`page-layout ${page === 'map' ? 'page-layout-full' : ''}`}>
            {page !== 'map' && (
              <AccountSwitcher activeRole={currentAccount} onSwitch={handleSwitchAccount} />
            )}
            <div className="page-main">
              {page === 'home' && <Home />}

              {page === 'map' && (
                <section className="list-map-profile map-layout">
                  <Map />
                  <List events={events} />
                </section>
              )}

              {page === 'profile' && (
                <section className="list-map-profile">
                  {renderProfileContent()}
                </section>
              )}

              {page === 'about' && (
                <section className="about-page">
                  <div className="about-content">
                    <h2>Про GigRadar</h2>
                    <p>
                      GigRadar — це простір для гуртів і слухачів, які хочуть знаходити концерти,
                      ділитися фото та залишати відгуки. Тут гурти можуть публікувати свої події,
                      а слухачі — зберігати улюблені виступи, обирати майбутні заходи та стежити за активністю.
                    </p>
                    <p>
                      Навігація через хедер дає змогу легко переключатися між головною сторінкою,
                      картою з подіями, та інформацією про проєкт.
                    </p>
                  </div>
                </section>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
