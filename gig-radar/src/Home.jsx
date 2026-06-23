import { useState, useEffect, useCallback } from 'react'

const defaultPopularEvents = [
  { id: 'event-1', title: 'Rock Wave', band: 'Бенчка Кафе', time: '20:00', date: '24', month: 'лип' },
  { id: 'event-2', title: 'Дім над містом', band: 'Акустична сцена', time: '20:00', date: '25', month: 'лип' },
  { id: 'event-3', title: 'Silent Road', band: 'Urban Stage 100', time: '18:30', date: '26', month: 'лип' },
]

function Home({ events = [], onNavigate, onBandClick }) {
  const [openGuide, setOpenGuide] = useState({ bands: false, listeners: false })
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
  {
    title: 'Відкривай живу музику в Івано-Франківську',
    description:
      'Знаходь концерти, музичні вечори та виступи локальних гуртів на одній інтерактивній платформі.',
  },
  {
    title: 'Для гуртів та виконавців',
    description:
      'Публікуйте свої події, знаходьте нову аудиторію та розповідайте про себе місту.',
  },
  {
    title: 'Усі музичні події поруч',
    description:
      'Зручна карта, актуальний розклад та швидкий пошук концертів поблизу.',
  },
]

  const formatEventsForHome = (eventsList) =>
    eventsList.map((event) => {
      const eventDate = event.date ? new Date(event.date) : null;
      return {
        id: event.id,
        title: event.title || event.bandName || event.band || '',
        band: event.band || event.bandName || '',
        time: event.time || '',
        date: eventDate ? String(eventDate.getDate()).padStart(2, '0') : event.date || '',
        month: eventDate
          ? eventDate.toLocaleDateString('uk-UA', { month: 'short' })
          : event.month || '',
        hype: event.hype || 0,
      };
    });

  const popularEvents = events.length > 0
    ? formatEventsForHome(events)
        .sort((a, b) => (b.hype || 0) - (a.hype || 0))
        .slice(0, 3)
    : defaultPopularEvents;

  const toggleGuide = (section) => {
    setOpenGuide((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const nextSlide = useCallback(() => setCurrentSlide((s) => (s + 1) % slides.length), []);
  const prevSlide = useCallback(() => setCurrentSlide((s) => (s - 1 + slides.length) % slides.length), []);
  const goToSlide = useCallback((i) => setCurrentSlide(i), []);
  const slideKey = currentSlide;

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <main>

      {/* HERO SLIDER */}
      <section className="hero-slider">
        <div className="slider">
          <button className="slider-nav prev" onClick={prevSlide} aria-label="Prev">‹</button>

          <div
  className="hero"
  style={{
    backgroundImage:
      "linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.65)), url('/img/profile-bg.jpg')",
  }}
>
  <div className="hero-content" key={slideKey}>
    <h1 key={`title-${slideKey}`}>{slides[currentSlide].title}</h1>

    <p key={`desc-${slideKey}`}>{slides[currentSlide].description}</p>

    <div className="hero-buttons">
      <button key={`btn-${slideKey}`} className="primary-btn" onClick={() => onNavigate('about')}>
        Переглянути події
      </button>
    </div>
  </div>
</div>

          <button className="slider-nav next" onClick={nextSlide} aria-label="Next">›</button>
        </div>

        <div className="slider-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* POPULAR EVENTS (moved up) */}
      <section className="events">
        <div className="section-top">
          <h2>Популярні події</h2>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('about'); }}>Переглянути всі</a>
        </div>

        <div className="events-grid">
          {popularEvents.map((ev) => (
            <div className="event-card" key={ev.id}>
              <div className="event-meta">
                <span className="event-date">{ev.date}</span>
                <span className="event-month">{ev.month}</span>
              </div>
              <div className="event-info">
                <h3>{ev.title}</h3>
                <p className="event-band" onClick={() => onBandClick && onBandClick(ev.band)}>{ev.band}</p>
                <span>{ev.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GUIDE (kept) */}
      <section className="guide">
        <div className={`guide-card bands ${openGuide.bands ? 'open' : ''}`}>
          <div className="guide-top">
            <div className="guide-title">
              <h2>Для гуртів</h2>
            </div>
            <button
              className="guide-btn"
              type="button"
              onClick={() => toggleGuide('bands')}
              aria-expanded={openGuide.bands}
            >
              {openGuide.bands ? 'Закрити' : 'Відкрити'}
            </button>
          </div>
          <div className="guide-content">
            <div className="step">
              <span>1</span>
              <p>Зареєструйтесь або увійдіть у свій акаунт.</p>
            </div>
            <div className="step">
              <span>2</span>
              <p>Додайте інформацію про свій гурт.</p>
            </div>
            <div className="step">
              <span>3</span>
              <p>Створіть подію: місце, дата, час.</p>
            </div>
            <div className="step">
              <span>4</span>
              <p>Публікуйте виступ та знаходьте аудиторію.</p>
            </div>
          </div>
        </div>

        <div className={`guide-card listeners ${openGuide.listeners ? 'open' : ''}`}>
          <div className="guide-top">
            <div className="guide-title">
              <h2>Для слухачів</h2>
            </div>
            <button
              className="guide-btn"
              type="button"
              onClick={() => toggleGuide('listeners')}
              aria-expanded={openGuide.listeners}
            >
              {openGuide.listeners ? 'Закрити' : 'Відкрити'}
            </button>
          </div>
          <div className="guide-content">
            <div className="step">
              <span>1</span>
              <p>Переглядайте події на карті.</p>
            </div>
            <div className="step">
              <span>2</span>
              <p>Фільтруйте події за жанром або датою.</p>
            </div>
            <div className="step">
              <span>3</span>
              <p>Обирайте концерт та дізнавайтесь деталі.</p>
            </div>
            <div className="step">
              <span>4</span>
              <p>Відвідуйте виступи та підтримуйте гурти.</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}

export default Home
