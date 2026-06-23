import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import Header from './header';
import Home from './Home.jsx';
import AuthPage from './AuthPage.jsx';
import AdminProfile from './AdminProfile.jsx';
import LatestEvents from './LatestEvents';
import List, { checkpointToEvent } from './List'; // Імпортуємо правильну функцію з розширеною валідацією
import Map from './Map';
import Profile from './Profile.jsx';
import Footer from './footer';
import {
  loadBands,
  loadUsers,
  saveBands,
  saveUsers,
  loadEvents,
  saveEvents,
} from './utils/storageManager';

const adminAccounts = [
  { id: 'admin-1', name: 'Admin', email: 'admin@iflive.local', password: 'admin123' },
  { id: 'admin-2', name: 'Friend', email: 'friend@iflive.local', password: 'friend123' },
];

const PLACE_COORDS = {
  Wagabundo: [48.92137534494465, 24.704859786012975],
  'Скейт парк':[48.911411735977524, 24.68493472023798],
  'Бар Блуд': [48.91964807911288, 24.712541933045188],
  'Urban Space 100': [48.92191410442102, 24.713712191483094],
  'Промприлад': [48.91401470889012, 24.712087661986857],
};

const enrichEventsWithCoordinates = (items) =>
  (items || []).map((event) => ({
    ...event,
    coordinates: event.coordinates || PLACE_COORDS[event.place] || PLACE_COORDS[event.location] || [48.9215, 24.7097],
  }));

export default function App() {
  const [page, setPage] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);
  const [bandAccounts, setBandAccounts] = useState([]);
  const [userAccounts, setUserAccounts] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); 
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    if (page !== 'map') {
      setShowMap(false);
    }
  }, [page]);

  useEffect(() => {
    const loadData = async () => {
      const bands = await loadBands();
      const users = await loadUsers();
      const eventsData = await loadEvents();
      
      setBandAccounts(bands);
      setUserAccounts(users);
      setEvents(enrichEventsWithCoordinates(eventsData));
    };
    loadData();
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      saveEvents(events);
    }
  }, [events]);

  const isAdmin = currentUser?.role === 'admin';

  const featuredBand = useMemo(
    () => bandAccounts.find((band) => band.approved) || bandAccounts[0] || null,
    [bandAccounts]
  );

  const addActivity = (text) => {
    console.debug(text);
  };

  const handleRegister = async ({ name, email, password, confirm, registerType }) => {
    if (!name || !email || !password || !confirm) {
      return 'Заповніть всі поля форми реєстрації.';
    }

    if (password !== confirm) {
      return 'Паролі не співпадають.';
    }

    const bands = await loadBands();
    const users = await loadUsers();
    
    const emailExists =
      bands.some((b) => b.email === email) ||
      users.some((u) => u.email === email) ||
      adminAccounts.some((a) => a.email === email);

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
      const allBands = [...bands, newBand];
      await saveBands(allBands);
      setBandAccounts(allBands);
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
      const allUsers = [...users, newUser];
      await saveUsers(allUsers);
      setUserAccounts(allUsers);
      setCurrentUser(newUser);
      addActivity(`Користувач ${newUser.name} зареєструвався`);
    }

    setPage('profile');
    return null;
  };

  const handleLogin = async ({ email, password }) => {
    const admin = adminAccounts.find((a) => a.email === email && a.password === password);
    if (admin) {
      setCurrentUser(admin);
      addActivity(`Адмін ${admin.name} увійшов у систему`);
      setPage('profile');
      return null;
    }

    const bands = await loadBands();
    const band = bands.find((b) => b.email === email && b.password === password);
    if (band) {
      setCurrentUser(band);
      addActivity(`Гурт ${band.name} увійшов у систему`);
      setPage('profile');
      return null;
    }

    return 'Невірний email або пароль.';
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setPage('home');
  };

  const handleBandClick = (bandName) => {
    const band = bandAccounts.find(b => b.name === bandName);
    if (band) {
      setCurrentUser(band);
      setPage('profile');
    }
  };

  const toggleBandApproval = async (bandId) => {
    const bands = await loadBands();
    const bandIndex = bands.findIndex((b) => b.id === bandId);
    if (bandIndex !== -1) {
      bands[bandIndex].approved = !bands[bandIndex].approved;
      await saveBands(bands);
      setBandAccounts(bands);
      addActivity(`${bands[bandIndex].name} ${bands[bandIndex].approved ? 'підтверджено' : 'знято з перевірки'}`);
    }
  };

  const addCheckpoint = (checkpointData) => {
    const formattedEvent = checkpointToEvent(checkpointData, currentUser?.name || 'Unknown Band');
    
    if (!formattedEvent.date) {
      formattedEvent.date = new Date().toISOString().split('T')[0];
    }
    
    const [enrichedEvent] = enrichEventsWithCoordinates([formattedEvent]);
    setEvents((prevEvents) => [enrichedEvent, ...prevEvents]);
    
    const newDateObj = new Date(enrichedEvent.date);
    setSelectedDate(isNaN(newDateObj.getTime()) ? new Date() : newDateObj);
    
    setPage('map'); 
  };

  const renderProfileContent = () => {
    if (!currentUser) {
      return (
        <div className="auth-notice">
          <p>Щоб побачити свій профіль, спочатку увійдіть або зареєструйтесь через кнопку у хедері.</p>
        </div>
      );
    }

    if (currentUser.role === 'band') {
      const bandCheckpoints = events.filter((event) => event.bandName === currentUser.name);

      return (
        <Profile
          currentUser={currentUser}
          isAdmin={isAdmin}
          bandEvents={bandCheckpoints}
          onAddCheckpoint={addCheckpoint}
        />
      );
    }

    return <AdminProfile bandAccounts={bandAccounts} onToggleApproval={toggleBandApproval} />;
  };

  return (
    <div className="app-container">
      <Header
        currentPage={page}
        onNavigate={setPage}
        onAuthAction={() => setPage(currentUser ? 'profile' : 'auth')}
        isLoggedIn={Boolean(currentUser)}
        onLogout={handleLogout}
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
            <div className="page-main">
              {page === 'home' && <Home events={events} onNavigate={setPage} />}

              {page === 'map' && (
                <section className="list-map-profile map-page">
                  <List
                    events={events}
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                    onOpenMap={() => setShowMap(true)}
                    onBandClick={handleBandClick}
                  />
                  {showMap && (
                    <div
                      className="map-overlay"
                      onClick={(e) => e.target === e.currentTarget && setShowMap(false)}
                      role="presentation"
                    >
                      <div className="map-overlay-panel">
                        <Map
                          events={events}
                          selectedDate={selectedDate}
                          onClose={() => setShowMap(false)}
                        />
                      </div>
                    </div>
                  )}
                </section>
              )}

              {page === 'profile' && (
                <section className="list-map-profile">
                  {renderProfileContent()}
                </section>
              )}

              {page === 'about' && (
                <LatestEvents checkpoints={events} onBandClick={handleBandClick} />
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}