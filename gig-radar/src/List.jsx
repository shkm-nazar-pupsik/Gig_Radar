export default function List({ events }) {
  return (
    <section className="list-section">
      <h2>Події</h2>
      {events && events.length > 0 ? (
        <ul>
          {events.map((event) => (
            <li key={event.id}>{event.name || 'Подія'}</li>
          ))}
        </ul>
      ) : (
        <p>Немає доступних подій.</p>
      )}
    </section>
  );
}
    