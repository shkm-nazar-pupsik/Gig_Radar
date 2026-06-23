import { useEffect, useState } from 'react';
import './Profile.css';
import { eventToProfileCheckpoint } from './utils/checkpointUtils';

export default function Profile({ currentUser, viewingBand, isAdmin, bandEvents = [], onAddCheckpoint, isReadOnly = false, onBack }) {
  const [activeTab, setActiveTab] = useState('checkpoints');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Silent Road',
    genres: 'Рок • Альтернатива • Івано-Франківськ',
    description: 'Ми — Silent Road, альтернативний рок-гурт з Івано-Франківська. Створюємо музику, яка говорить про важливе.',
    logo: '/img/for-band.png',
  });

  const [editForm, setEditForm] = useState(profileData);

  const displayUser = !isReadOnly && currentUser && !isAdmin ? currentUser : null;
  const isBand = displayUser?.role === 'band';
  const isSimpleUser = displayUser?.role === 'user';
  const isViewingBandProfile = isReadOnly && viewingBand;

  const profileSource = (displayUser || viewingBand)
    ? {
        name: (displayUser || viewingBand).name,
        genres: (displayUser || viewingBand).genres || (displayUser || viewingBand).favoriteGenres || profileData.genres,
        description: (displayUser || viewingBand).description || profileData.description,
        logo: (displayUser || viewingBand).logo || profileData.logo,
      }
    : profileData;
  const approvedStatus = (displayUser || viewingBand)?.approved ?? true;

  useEffect(() => {
    const source = displayUser || viewingBand;
    if (source) {
      setEditForm({
        name: source.name,
        genres: source.genres || source.favoriteGenres || profileData.genres,
        description: source.description || profileData.description,
        logo: source.logo || profileData.logo,
      });
    } else {
      setEditForm(profileData);
    }
  }, [displayUser, viewingBand, profileData]);

  const checkpoints = bandEvents.map(eventToProfileCheckpoint);

  const [showCreateCheckpoint, setShowCreateCheckpoint] = useState(false);
  const [newCheckpoint, setNewCheckpoint] = useState({
    title: '',
    date: '',
    day: '',
    location: '',
    time: '',
    status: 'Запланьовано',
  });

  const [mediaItems, setMediaItems] = useState([
    'https://via.placeholder.com/200?text=Photo+1',
    'https://via.placeholder.com/200?text=Photo+2',
    'https://via.placeholder.com/200?text=Photo+3',
    'https://via.placeholder.com/200?text=Photo+4',
    'https://via.placeholder.com/200?text=Photo+5',
    'https://via.placeholder.com/200?text=Photo+6',
    'https://via.placeholder.com/200?text=Photo+7',
    'https://via.placeholder.com/200?text=Photo+8',
  ]);
  const [showAddMedia, setShowAddMedia] = useState(false);
  const [newMediaUrl, setNewMediaUrl] = useState('');

  const activities = [
    {
      id: 1,
      type: 'checkpoint',
      text: 'Новий чекпойнт "Rock Wave" опубліковано',
      date: '16 травня 2024',
    },
    {
      id: 2,
      type: 'photo',
      text: 'Додано нове фото в галерею',
      date: '12 травня 2024',
    },
    {
      id: 3,
      type: 'profile',
      text: 'Профіль групи оновлено',
      date: '10 травня 2024',
    },
  ];

  const displayedActivities = displayUser?.recentEvents
    ? displayUser.recentEvents.map((text, index) => ({
        id: `profile-activity-${index}`,
        type: 'profile',
        text,
        date: new Date().toLocaleDateString('uk-UA', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
      }))
    : activities;

  const handleEditProfile = (e) => {
    e.preventDefault();
    setProfileData(editForm);
    setIsEditingProfile(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewCheckpointChange = (e) => {
    const { name, value } = e.target;
    setNewCheckpoint((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateCheckpointSubmit = (e) => {
    e.preventDefault();
    if (!newCheckpoint.title || !newCheckpoint.date || !newCheckpoint.day || !newCheckpoint.location || !newCheckpoint.time) {
      return;
    }

    onAddCheckpoint?.({ ...newCheckpoint });

    setNewCheckpoint({
      title: '',
      date: '',
      day: '',
      location: '',
      time: '',
      status: 'Запланьовано',
    });
    setShowCreateCheckpoint(false);
  };

  const handleNewMediaUrlChange = (e) => {
    setNewMediaUrl(e.target.value);
  };

  const handleAddMediaSubmit = (e) => {
    e.preventDefault();
    const trimmedUrl = newMediaUrl.trim();
    if (!trimmedUrl) return;

    setMediaItems((prev) => [trimmedUrl, ...prev]);
    setNewMediaUrl('');
    setShowAddMedia(false);
  };

  return (
    <div className="profile-container">
      {/* Header Section */}
      <div className="profile-header">
        <div className="profile-header-content">
          {/* Logo and Info */}
          <div className="header-main">
            <div className="profile-logo">
              <img src={profileSource.logo} alt="Logo" />
            </div>
            <div className="profile-info">
              <div className="profile-title">
                <h1>{profileSource.name}</h1>
                <span className="verified-badge">✓</span>
              </div>
              <div className={`profile-approval ${approvedStatus ? 'approved' : 'pending'}`}>
                {approvedStatus ? 'Перевірено' : 'Очікує підтвердження'}
              </div>
              <p className="profile-genres">{profileSource.genres}</p>
              <p className="profile-description">{profileSource.description}</p>
              <div className="profile-social">
                <a href="#" className="social-icon">
                  <img src="/img/camera.png" alt="Instagram" title="Instagram" />
                </a>
                <a href="#" className="social-icon">
                  <img src="/img/micro.png" alt="YouTube" title="YouTube" />
                </a>
                <a href="#" className="social-icon">
                  <img src="/img/user.png" alt="Лінк" title="Лінк" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Buttons */}
          {isReadOnly && onBack && (
            <div className="header-buttons">
              <button className="edit-profile-trigger" onClick={onBack}>
                ← Назад
              </button>
            </div>
          )}
          {isBand && !isReadOnly && (
            <div className="header-buttons">
              <button className="create-checkpoint-btn" onClick={() => setShowCreateCheckpoint(true)}>
                Створити чекпойнт
                <span>+</span>
              </button>
              <button
                className="edit-profile-trigger"
                onClick={() => {
                  setEditForm(profileSource);
                  setIsEditingProfile(true);
                }}
              >
                Редагувати профіль
              </button>
            </div>
          )}
          {showCreateCheckpoint && isBand && (
            <div className="create-checkpoint-form">
              <h3>Новий чекпойнт</h3>
              <form onSubmit={handleCreateCheckpointSubmit}>
                <div className="form-group">
                  <label htmlFor="checkpoint-title">Назва події</label>
                  <input
                    type="text"
                    id="checkpoint-title"
                    name="title"
                    value={newCheckpoint.title}
                    onChange={handleNewCheckpointChange}
                    placeholder="Наприклад, Rock Wave"
                  />
                </div>
                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="checkpoint-date">Дата</label>
                    <input
                      type="text"
                      id="checkpoint-date"
                      name="date"
                      value={newCheckpoint.date}
                      onChange={handleNewCheckpointChange}
                      placeholder="24 травня"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="checkpoint-day">День тижня</label>
                    <input
                      type="text"
                      id="checkpoint-day"
                      name="day"
                      value={newCheckpoint.day}
                      onChange={handleNewCheckpointChange}
                      placeholder="ПТ"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="checkpoint-location">Локація</label>
                  <input
                    type="text"
                    id="checkpoint-location"
                    name="location"
                    value={newCheckpoint.location}
                    onChange={handleNewCheckpointChange}
                    placeholder="Docker Pub"
                  />
                </div>
                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="checkpoint-time">Час</label>
                    <input
                      type="text"
                      id="checkpoint-time"
                      name="time"
                      value={newCheckpoint.time}
                      onChange={handleNewCheckpointChange}
                      placeholder="19:00"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="checkpoint-status">Статус</label>
                    <input
                      type="text"
                      id="checkpoint-status"
                      name="status"
                      value={newCheckpoint.status}
                      onChange={handleNewCheckpointChange}
                      placeholder="Запланьовано"
                    />
                  </div>
                </div>
                <div className="form-buttons">
                  <button type="submit" className="save-btn">Додати чекпойнт</button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowCreateCheckpoint(false)}
                  >
                    Скасувати
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Section */}
      {isEditingProfile && (
        <div className="edit-profile-section">
          <h3>Редагування профілю</h3>
          <form onSubmit={handleEditProfile}>
            <div className="form-group">
              <label htmlFor="name">Назва гурту</label>
              <input
                type="text"
                id="name"
                name="name"
                value={editForm.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="genres">Жанри</label>
              <input
                type="text"
                id="genres"
                name="genres"
                value={editForm.genres}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Опис</label>
              <textarea
                id="description"
                name="description"
                value={editForm.description}
                onChange={handleInputChange}
                rows="4"
              />
            </div>
            <div className="form-group">
              <label htmlFor="logo">Логотип (URL)</label>
              <input
                type="text"
                id="logo"
                name="logo"
                value={editForm.logo}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-buttons">
              <button type="submit" className="save-btn">Зберегти</button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setIsEditingProfile(false)}
              >
                Скасувати
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="tabs-navigation">
        <button
          className={`tab-btn ${activeTab === 'checkpoints' ? 'active' : ''}`}
          onClick={() => setActiveTab('checkpoints')}
        >
          Мої чекпойнти
        </button>
        <button
          className={`tab-btn ${activeTab === 'media' ? 'active' : ''}`}
          onClick={() => setActiveTab('media')}
        >
          Медіа
        </button>
        <button
          className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
          onClick={() => setActiveTab('activity')}
        >
          Остання активність
        </button>
      </div>

      {/* Content Section */}
      <div className="content-section">
        {/* Checkpoints Tab */}
        {activeTab === 'checkpoints' && (
          <div className="checkpoints-container">
            {isSimpleUser ? (
              <div className="profile-message">
                Ця вкладка доступна тільки для гуртів. Перейдіть на вкладку «Остання активність».
              </div>
            ) : (
              <>
                <div className="section-header">
                  <h2>{isViewingBandProfile ? 'Чекпойнти гурту' : 'Мої чекпойнти'}</h2>
                  <a href="#" className="view-all">Переглянути все →</a>
                </div>
                <div className="checkpoints-grid">
                  {checkpoints.length === 0 ? (
                    <div className="profile-message">
                      У вас ще немає чекпойнтів. Створіть перший — він зʼявиться на афіші подій.
                    </div>
                  ) : (
                    checkpoints.map((checkpoint) => (
                      <div key={checkpoint.id} className="checkpoint-card">
                        <div className="checkpoint-date">
                          <span className="date-number">{checkpoint.date.split(' ')[0]}</span>
                          <span className="date-month">{checkpoint.date.split(' ')[1]}</span>
                        </div>
                        <div className="checkpoint-content">
                          <h3>{checkpoint.title}</h3>
                          <div className="checkpoint-weekday">{checkpoint.day}</div>
                          <div className="checkpoint-detail">
                            <img src="/img/placeholder-filled-point.png" alt="location" className="detail-icon" />
                            <span>{checkpoint.location}</span>
                          </div>
                          <div className="checkpoint-detail">
                            <img src="/img/time-left.png" alt="time" className="detail-icon" />
                            <span>{checkpoint.time}</span>
                          </div>
                        </div>
                        <div className="checkpoint-status">{checkpoint.status}</div>
                        <div className="checkpoint-menu">⋯</div>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Media Tab */}
        {activeTab === 'media' && (
          <div className="media-container">
            {isSimpleUser ? (
              <div className="profile-message">
                Ця вкладка доступна тільки для гуртів. Перейдіть на вкладку «Остання активність».
              </div>
            ) : (
              <>
                <div className="section-header">
                  <h2>{isViewingBandProfile ? 'Медіа гурту' : 'Медіа'}</h2>
                  <a href="#" className="view-all">Переглянути все →</a>
                </div>
                <div className="media-grid">
                  {mediaItems.map((item, index) => (
                    <div key={index} className="media-item">
                      <img src={item} alt={`Media ${index + 1}`} />
                    </div>
                  ))}
                </div>
                <div className="upload-button">
                  {!showAddMedia ? (
                    <button type="button" onClick={() => setShowAddMedia(true)}>
                      <img src="/img/camera.png" alt="camera" className="btn-icon" />
                      Додати фото
                    </button>
                  ) : (
                    <form className="add-media-form" onSubmit={handleAddMediaSubmit}>
                      <input
                        type="text"
                        className="add-media-input"
                        value={newMediaUrl}
                        onChange={handleNewMediaUrlChange}
                        placeholder="Вставте URL картинки"
                      />
                      <div className="add-media-actions">
                        <button type="submit" className="save-btn">Додати</button>
                        <button type="button" className="cancel-btn" onClick={() => setShowAddMedia(false)}>
                          Скасувати
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="activity-container">
            <h2>Остання активність</h2>
            <div className="activity-list">
              {displayedActivities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    {activity.type === 'checkpoint' && <img src="/img/calendar.png" alt="checkpoint" />}
                    {activity.type === 'photo' && <img src="/img/camera.png" alt="photo" />}
                    {activity.type === 'profile' && <img src="/img/user.png" alt="profile" />}
                  </div>
                  <div className="activity-content">
                    <p>{activity.text}</p>
                    <span className="activity-date">{activity.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="view-all-activity">Переглянути всю активність</button>
          </div>
        )}
      </div>
    </div>
  );
}