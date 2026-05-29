import { useState } from 'react';
import './Profile.css';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('checkpoints');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Silent Road',
    genres: 'Рок • Альтернатива • Івано-Франківськ',
    description: 'Ми — Silent Road, альтернативний рок-гурт з Івано-Франківська. Створюємо музику, яка говорить про важливе.',
    logo: '/img/for-band.png',
  });

  const [editForm, setEditForm] = useState(profileData);

  const checkpoints = [
    {
      id: 1,
      date: '24 травня',
      day: 'ПТ',
      title: 'Rock Wave',
      location: 'Docker Pub',
      time: '19:00',
      status: 'Опубліковано',
    },
    {
      id: 2,
      date: '25 травня',
      day: 'СБ',
      title: 'Дми над містом',
      location: 'Ассортиментна Кімната',
      time: '20:00',
      status: 'Опубліковано',
    },
    {
      id: 3,
      date: '02 червня',
      day: 'НД',
      title: 'Underground Live',
      location: 'Urban Space 100',
      time: '18:30',
      status: 'Чергуєтьса',
    },
    {
      id: 4,
      date: '15 червня',
      day: 'ЧТ',
      title: 'Саунд на даху',
      location: 'Панац Потоцяцик',
      time: '19:00',
      status: 'Запланьовано',
    },
  ];

  const mediaItems = [
    'https://via.placeholder.com/200?text=Photo+1',
    'https://via.placeholder.com/200?text=Photo+2',
    'https://via.placeholder.com/200?text=Photo+3',
    'https://via.placeholder.com/200?text=Photo+4',
    'https://via.placeholder.com/200?text=Photo+5',
    'https://via.placeholder.com/200?text=Photo+6',
    'https://via.placeholder.com/200?text=Photo+7',
    'https://via.placeholder.com/200?text=Photo+8',
  ];

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

  return (
    <div className="profile-container">
      {/* Header Section */}
      <div className="profile-header">
        <div className="profile-header-content">
          {/* Logo and Info */}
          <div className="header-main">
            <div className="profile-logo">
              <img src={profileData.logo} alt="Logo" />
            </div>
            <div className="profile-info">
              <div className="profile-title">
                <h1>{profileData.name}</h1>
                <span className="verified-badge">✓</span>
              </div>
              <p className="profile-genres">{profileData.genres}</p>
              <p className="profile-description">{profileData.description}</p>
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
          <div className="header-buttons">
            <button className="create-checkpoint-btn">
              Створити чекпойнт
              <span>+</span>
            </button>
            <button
              className="edit-profile-trigger"
              onClick={() => {
                setEditForm(profileData);
                setIsEditingProfile(true);
              }}
            >
              Редагувати профіль
            </button>
          </div>
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
            <div className="section-header">
              <h2>Мої чекпойнти</h2>
              <a href="#" className="view-all">Переглянути все →</a>
            </div>
            <div className="checkpoints-grid">
              {checkpoints.map((checkpoint) => (
                <div key={checkpoint.id} className="checkpoint-card">
                  <div className="checkpoint-date">
                    <span className="date-number">{checkpoint.date.split(' ')[0]}</span>
                    <span className="date-day">{checkpoint.day}</span>
                  </div>
                  <div className="checkpoint-content">
                    <h3>{checkpoint.title}</h3>
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
              ))}
            </div>
          </div>
        )}

        {/* Media Tab */}
        {activeTab === 'media' && (
          <div className="media-container">
            <div className="section-header">
              <h2>Медіа</h2>
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
              <button>
                <img src="/img/camera.png" alt="camera" className="btn-icon" />
                Додати фото
              </button>
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="activity-container">
            <h2>Остання активність</h2>
            <div className="activity-list">
              {activities.map((activity) => (
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
