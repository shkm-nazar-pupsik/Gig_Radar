import { useEffect, useState } from 'react';
import './Profile.css';

export default function UserProfile({ currentUser }) {
  const [activeTab, setActiveTab] = useState('bookmarks');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Оля Слухач',
    favoriteGenres: 'Рок, Альтернатива, Інді',
    bio: 'Люблю живу музику та нові звучання 🎵',
    avatar: '/img/user.png',
  });

  const [editForm, setEditForm] = useState(profileData);

  const profileSource = currentUser
    ? {
        name: currentUser.name,
        favoriteGenres: currentUser.favoriteGenres || profileData.favoriteGenres,
        bio: currentUser.bio || profileData.bio,
        avatar: currentUser.avatar || profileData.avatar,
      }
    : profileData;

  useEffect(() => {
    if (currentUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEditForm({
        name: currentUser.name,
        favoriteGenres: currentUser.favoriteGenres || profileData.favoriteGenres,
        bio: currentUser.bio || profileData.bio,
        avatar: currentUser.avatar || profileData.avatar,
      });
      if (currentUser.favoriteBands) {
        setFollowedBands(currentUser.favoriteBands);
      }
    } else {
      setEditForm(profileData);
    }
  }, [currentUser, profileData]);

  // Bookmarked checkpoints/events that user wants to visit
  const [bookmarkedCheckpoints, setBookmarkedCheckpoints] = useState([
    {
      id: 1,
      date: '24 травня',
      day: 'ПТ',
      title: 'Rock Wave',
      band: 'Silent Road',
      location: 'Docker Pub',
      time: '19:00',
      isBookmarked: true,
    },
    {
      id: 2,
      date: '25 травня',
      day: 'СБ',
      title: 'Дми над містом',
      band: 'Дми над містом',
      location: 'Ассортиментна Кімната',
      time: '20:00',
      isBookmarked: true,
    },
    {
      id: 3,
      date: '02 червня',
      day: 'НД',
      title: 'Underground Live',
      band: 'Various Artists',
      location: 'Urban Space 100',
      time: '18:30',
      isBookmarked: true,
    },
  ]);

  const [followedBands, setFollowedBands] = useState(currentUser?.favoriteBands || ['Silent Road', 'Дми над містом']);

  const [recommendedEvents, setRecommendedEvents] = useState([
    {
      id: 'rec-1',
      title: 'Rock Wave Live',
      band: 'Silent Road',
      location: 'Docker Pub',
      date: '12 червня',
      time: '20:00',
      isBookmarked: false,
    },
    {
      id: 'rec-2',
      title: 'Осінній акорд',
      band: 'Дми над містом',
      location: 'Ассортиментна Кімната',
      date: '18 червня',
      time: '19:30',
      isBookmarked: false,
    },
    {
      id: 'rec-3',
      title: 'Ніч альтернативи',
      band: 'Various Artists',
      location: 'Urban Space 100',
      date: '22 червня',
      time: '21:00',
      isBookmarked: false,
    },
  ]);

  // User's posted photos
  const [userPhotos, setUserPhotos] = useState([
    'https://via.placeholder.com/200?text=Concert+Photo+1',
    'https://via.placeholder.com/200?text=Concert+Photo+2',
    'https://via.placeholder.com/200?text=Concert+Photo+3',
    'https://via.placeholder.com/200?text=Live+Moment+1',
    'https://via.placeholder.com/200?text=Live+Moment+2',
    'https://via.placeholder.com/200?text=Band+Meeting',
  ]);

  const [showAddPhoto, setShowAddPhoto] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  // User's activity
  const [activities] = useState([
    {
      id: 1,
      type: 'bookmark',
      text: 'Додав(ла) "Rock Wave" в обране',
      band: 'Silent Road',
      date: '29 травня 2026',
    },

    {
      id: 2,
      type: 'photo',
      text: 'Розмістив(ла) нове фото із концерту',
      date: '28 травня 2026',
    },
    {
      id: 3,
      type: 'review',
      text: 'Залишив(ла) відгук для гурту Silent Road',
      band: 'Silent Road',
      rating: 5,
      date: '25 травня 2026',
    },
    {
      id: 4,
      type: 'follow',
      text: 'Став(ла) підписник(цею) на гурт Дми над містом',
      band: 'Дми над містом',
      date: '20 травня 2026',
    },
    {
      id: 5,
      type: 'bookmark',
      text: 'Додав(ла) "Underground Live" в обране',
      date: '15 травня 2026',
    },
  ]);

  // Band reviews from user
  const [bandReviews, setBandReviews] = useState([
    {
      id: 'review-1',
      bandName: 'Silent Road',
      bandLogo: '/img/for-band.png',
      rating: 5,
      text: 'Неймовірний гурт! Дивився на їх концерт на Docker Pub. Музика потрясаюча, атмосфера вражаюча. Дуже рекомендую!',
      date: '25 травня 2026',
      helpful: 12,
    },
    {
      id: 'review-2',
      bandName: 'Дми над містом',
      bandLogo: '/img/for-band.png',
      rating: 4,
      text: 'Гарна альтернативна музика. Чудові вокали. Трохи коротким був концерт, але загалом дуже сподобалося.',
      date: '20 травня 2026',
      helpful: 8,
    },
  ]);

  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState({
    bandName: '',
    rating: 5,
    text: '',
  });

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

  const handleAddPhotoSubmit = (e) => {
    e.preventDefault();
    const trimmedUrl = newPhotoUrl.trim();
    if (!trimmedUrl) return;

    setUserPhotos((prev) => [trimmedUrl, ...prev]);
    setNewPhotoUrl('');
    setShowAddPhoto(false);
  };

  const handleRemoveBookmark = (checkpointId) => {
    setBookmarkedCheckpoints((prev) =>
      prev.filter((checkpoint) => checkpoint.id !== checkpointId)
    );
  };

  const toggleFollowBand = (bandName) => {
    setFollowedBands((prev) =>
      prev.includes(bandName) ? prev.filter((name) => name !== bandName) : [...prev, bandName]
    );
  };

  const handleToggleRecommendedBookmark = (eventId) => {
    const eventToToggle = recommendedEvents.find((event) => event.id === eventId);
    if (!eventToToggle) return;

    const nextBookmarked = !eventToToggle.isBookmarked;

    setRecommendedEvents((prev) =>
      prev.map((event) =>
        event.id === eventId ? { ...event, isBookmarked: nextBookmarked } : event
      )
    );

    setBookmarkedCheckpoints((prev) => {
      if (nextBookmarked) {
        if (prev.some((checkpoint) => checkpoint.sourceId === eventId)) {
          return prev;
        }

        return [
          {
            sourceId: eventId,
            id: Date.now(),
            date: eventToToggle.date,
            day: '—',
            title: eventToToggle.title,
            band: eventToToggle.band,
            location: eventToToggle.location,
            time: eventToToggle.time,
            isBookmarked: true,
          },
          ...prev,
        ];
      }

      return prev.filter((checkpoint) => checkpoint.sourceId !== eventId);
    });
  };

  const handleAddReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.bandName || !newReview.text) {
      alert('Заповніть усі поля!');
      return;
    }

    const review = {
      id: `review-${Date.now()}`,
      bandName: newReview.bandName,
      bandLogo: '/img/for-band.png',
      rating: newReview.rating,
      text: newReview.text,
      date: new Date().toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      helpful: 0,
    };

    setBandReviews((prev) => [review, ...prev]);
    setNewReview({
      bandName: '',
      rating: 5,
      text: '',
    });
    setShowAddReview(false);
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value,
    }));
  };

  const renderStars = (rating) => {
    return (
      <div className="stars-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={`star ${star <= rating ? 'filled' : ''}`}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="profile-container">
      {/* Header Section */}
      <div className="profile-header">
        <div className="profile-header-content">
          {/* Avatar and Info */}
          <div className="header-main">
            <div className="profile-logo user-avatar">
              <img src={profileSource.avatar} alt="Avatar" />
            </div>
            <div className="profile-info">
              <div className="profile-title">
                <h1>{profileSource.name}</h1>
              </div>
              <p className="profile-genres">{profileSource.favoriteGenres}</p>
              <p className="profile-description">{profileSource.bio}</p>
              <div className="profile-stats">
                <div className="stat">
                  <span className="stat-number">{bookmarkedCheckpoints.length}</span>
                  <span className="stat-label">Подій у списку</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{userPhotos.length}</span>
                  <span className="stat-label">Фото</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{bandReviews.length}</span>
                  <span className="stat-label">Відгуків</span>
                </div>
              </div>
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
          {isEditingProfile && (
            <div className="create-checkpoint-form">
              <h3>Редагування профілю</h3>
              <form onSubmit={handleEditProfile}>
                <div className="form-group">
                  <label htmlFor="name">Ім'я</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editForm.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="favoriteGenres">Улюблені жанри</label>
                  <input
                    type="text"
                    id="favoriteGenres"
                    name="favoriteGenres"
                    value={editForm.favoriteGenres}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bio">Про себе</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={editForm.bio}
                    onChange={handleInputChange}
                    rows="4"
                  />
                </div>
                <div className="form-buttons">
                  <button type="submit" className="save-btn">
                    Зберегти
                  </button>
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
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tabs-navigation">
        <button
          className={`tab-btn ${activeTab === 'bookmarks' ? 'active' : ''}`}
          onClick={() => setActiveTab('bookmarks')}
        >
          Обране ({bookmarkedCheckpoints.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'photos' ? 'active' : ''}`}
          onClick={() => setActiveTab('photos')}
        >
          Мої фото
        </button>
        <button
          className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Відгуки про гурти
        </button>
        <button
          className={`tab-btn ${activeTab === 'recommended' ? 'active' : ''}`}
          onClick={() => setActiveTab('recommended')}
        >
          Рекомендації ({recommendedEvents.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
          onClick={() => setActiveTab('activity')}
        >
          Активність
        </button>
      </div>

      {/* Content Section */}
      <div className="content-section">
        {/* Bookmarks Tab */}
        {activeTab === 'bookmarks' && (
          <div className="checkpoints-container">
            <div className="section-header">
              <h2>Обране</h2>
              <p className="section-subtitle">Подіїї, на які ви хочете піти</p>
            </div>
            {bookmarkedCheckpoints.length === 0 ? (
              <div className="empty-state">
                <p>Ви ще не додали жодної подіїї в обране</p>
              </div>
            ) : (
              <div className="checkpoints-grid">
                {bookmarkedCheckpoints.map((checkpoint) => (
                  <div key={checkpoint.id} className="checkpoint-card bookmarked">
                    <div className="checkpoint-date">
                      <span className="date-number">{checkpoint.date.split(' ')[0]}</span>
                      <span className="date-month">{checkpoint.date.split(' ')[1]}</span>
                    </div>
                    <div className="checkpoint-content">
                      <h3>{checkpoint.title}</h3>
                      <p className="checkpoint-band">{checkpoint.band}</p>
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
                    <button
                      className="remove-bookmark-btn"
                      onClick={() => handleRemoveBookmark(checkpoint.id)}
                      title="Видалити із обраного"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Photos Tab */}
        {activeTab === 'photos' && (
          <div className="media-container">
            <div className="section-header">
              <h2>Мої фото</h2>
              <p className="section-subtitle">Фото з концертів та подій</p>
            </div>
            {userPhotos.length > 0 && (
              <div className="media-grid">
                {userPhotos.map((photo, index) => (
                  <div key={index} className="media-item">
                    <img src={photo} alt={`Photo ${index + 1}`} />
                  </div>
                ))}
              </div>
            )}
            <div className="upload-button">
              {!showAddPhoto ? (
                <button type="button" onClick={() => setShowAddPhoto(true)}>
                  <img src="/img/camera.png" alt="camera" className="btn-icon" />
                  Додати фото
                </button>
              ) : (
                <form className="add-media-form" onSubmit={handleAddPhotoSubmit}>
                  <input
                    type="text"
                    className="add-media-input"
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    placeholder="Вставте URL фото"
                  />
                  <div className="add-media-actions">
                    <button type="submit" className="save-btn">
                      Додати
                    </button>
                    <button type="button" className="cancel-btn" onClick={() => setShowAddPhoto(false)}>
                      Скасувати
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Recommended Tab */}
        {activeTab === 'recommended' && (
          <div className="recommended-container">
            <div className="section-header">
              <h2>Рекомендовані події</h2>
              <p className="section-subtitle">Оберіть нові концерти та слідкуйте за гуртами.</p>
            </div>
            <div className="recommended-grid">
              {recommendedEvents.map((event) => (
                <div key={event.id} className="recommended-card">
                  <div className="recommended-top">
                    <div>
                      <h3>{event.title}</h3>
                      <p className="recommended-band">{event.band}</p>
                    </div>
                    <button
                      type="button"
                      className={`bookmark-btn ${event.isBookmarked ? 'active' : ''}`}
                      onClick={() => handleToggleRecommendedBookmark(event.id)}
                    >
                      {event.isBookmarked ? 'Збережено' : 'В обране'}
                    </button>
                  </div>
                  <div className="recommended-details">
                    <span>{event.date}</span>
                    <span>{event.time}</span>
                    <span>{event.location}</span>
                  </div>
                  <button
                    type="button"
                    className={`follow-band-btn ${followedBands.includes(event.band) ? 'active' : ''}`}
                    onClick={() => toggleFollowBand(event.band)}
                  >
                    {followedBands.includes(event.band) ? 'Припинити слідкувати' : 'Слідкувати за гуртом'}
                  </button>
                </div>
              ))}
            </div>
            <div className="followed-bands-panel">
              <h3>Ваші підписки</h3>
              <div className="followed-bands-list">
                {followedBands.length === 0 ? (
                  <span>Ви ще не підписані на жоден гурт</span>
                ) : (
                  followedBands.map((band) => (
                    <span key={band} className="followed-band-chip">
                      {band}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="reviews-container">
            <div className="section-header">
              <h2>Відгуки про гурти</h2>
              <p className="section-subtitle">Ваші враження від виступів</p>
            </div>

            <div className="add-review-section">
              {!showAddReview ? (
                <button className="create-checkpoint-btn" onClick={() => setShowAddReview(true)}>
                  Написати відгук
                  <span>+</span>
                </button>
              ) : (
                <form className="review-form" onSubmit={handleAddReviewSubmit}>
                  <div className="form-group">
                    <label htmlFor="bandName">Назва гурту</label>
                    <input
                      type="text"
                      id="bandName"
                      name="bandName"
                      value={newReview.bandName}
                      onChange={handleReviewChange}
                      placeholder="Наприклад, Silent Road"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="rating">Оцінка</label>
                    <div className="rating-input">
                      <select
                        id="rating"
                        name="rating"
                        value={newReview.rating}
                        onChange={handleReviewChange}
                      >
                        <option value="5">⭐⭐⭐⭐⭐ - 5 зірок</option>
                        <option value="4">⭐⭐⭐⭐ - 4 зірки</option>
                        <option value="3">⭐⭐⭐ - 3 зірки</option>
                        <option value="2">⭐⭐ - 2 зірки</option>
                        <option value="1">⭐ - 1 зірка</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="reviewText">Ваш відгук</label>
                    <textarea
                      id="reviewText"
                      name="text"
                      value={newReview.text}
                      onChange={handleReviewChange}
                      placeholder="Поділіться своїми враженнями від виступу..."
                      rows="5"
                    />
                  </div>
                  <div className="form-buttons">
                    <button type="submit" className="save-btn">
                      Опублікувати
                    </button>
                    <button type="button" className="cancel-btn" onClick={() => setShowAddReview(false)}>
                      Скасувати
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="reviews-list">
              {bandReviews.length === 0 ? (
                <div className="empty-state">
                  <p>Ви ще не залишили жодних відгуків</p>
                </div>
              ) : (
                bandReviews.map((review) => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <div className="review-band-info">
                        <img src={review.bandLogo} alt={review.bandName} className="review-band-logo" />
                        <div className="band-name-rating">
                          <h3>{review.bandName}</h3>
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <span className="review-date">{review.date}</span>
                    </div>
                    <p className="review-text">{review.text}</p>
                    <div className="review-footer">
                      <button className="helpful-btn">
                        👍 Корисно ({review.helpful})
                      </button>
                    </div>
                  </div>
                ))
              )}
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
                    {activity.type === 'bookmark' && <img src="/img/calendar.png" alt="bookmark" />}
                    {activity.type === 'photo' && <img src="/img/camera.png" alt="photo" />}
                    {activity.type === 'review' && <img src="/img/user.png" alt="review" />}
                    {activity.type === 'follow' && <img src="/img/user.png" alt="follow" />}
                  </div>
                  <div className="activity-content">
                    <p>{activity.text}</p>
                    {activity.band && <span className="activity-band">{activity.band}</span>}
                    {activity.rating && <div className="activity-rating">{renderStars(activity.rating)}</div>}
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
