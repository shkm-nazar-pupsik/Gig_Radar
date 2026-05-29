import { useState } from 'react'

const popularEvents = [
  { id: 'event-1', title: 'Rock Wave', band: 'Бенчка Кафе', time: '20:00', date: '24', month: 'лип' },
  { id: 'event-2', title: 'Дім над містом', band: 'Акустична сцена', time: '20:00', date: '25', month: 'лип' },
  { id: 'event-3', title: 'Silent Road', band: 'Urban Stage 100', time: '18:30', date: '26', month: 'лип' },
]

function Home() {
  const [openGuide, setOpenGuide] = useState({ bands: false, listeners: false })

  const toggleGuide = (section) => {
    setOpenGuide((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <main>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Жива музика <br /> в <span>Івано-Франківську</span>
          </h1>

          <p>
            Платформа для гуртів та виконавців, які хочуть виступати, та для всіх,
            хто любить живу музику.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">Переглянути події</button>
            <button className="secondary-btn">Дізнатись більше</button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2>Що ви можете зробити на IF Live?</h2>

        <div className="features-grid">
          <div className="feature-card">
            <img src="/img/calendar.png" alt="Розклад" />
            <h3>Для гуртів</h3>
            <p>Публікуйте інформацію про свої виступи: місце, дату, час та інші деталі.</p>
          </div>

          <div className="feature-card">
            <img src="/img/flowers.png" alt="Атмосфера" />
            <h3>Для слухачів</h3>
            <p>Знаходьте концерти та події у місті на зручній карті.</p>
          </div>

          <div className="feature-card">
            <img src="/img/micro.png" alt="Зручно" />
            <h3>Зручно</h3>
            <p>Усі події міста в одному місці.</p>
          </div>

          <div className="feature-card">
            <img src="/img/people.png" alt="Актуально" />
            <h3>Актуально</h3>
            <p>Розклад завжди оновлюється.</p>
          </div>
        </div>
      </section>

      {/* GUIDE */}
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

      {/* EVENTS */}
      <section className="events">
        <div className="section-top">
          <h2>Популярні події</h2>
          <a href="#">Переглянути всі</a>
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
                <p>{ev.band}</p>
                <span>{ev.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SUBSCRIBE */}
      <section className="subscribe">
        <div className="subscribe-content">
          <div>
            <h2>Будьте в курсі подій</h2>
            <p>Підпишіться на розсилку, щоб отримувати новини про концерти.</p>
          </div>

          <div className="subscribe-form">
            <input type="email" placeholder="Ваш email" aria-label="Ваш email" />
            <button>Підписатись</button>
          </div>
        </div>
      </section>

    </main>
  )
}

export default Home
