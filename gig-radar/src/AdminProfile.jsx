export default function AdminProfile({ bandAccounts, onToggleApproval }) {
  const approvedCount = bandAccounts.filter((band) => band.approved).length;

  return (
    <div className="admin-profile-container">
      <div className="admin-profile-header">
        <div>
          <h2>Адмінський профіль</h2>
          <p>Управління підтвердженням гуртів.</p>
        </div>
        <div className="admin-profile-stats">
          <div>
            <span>{bandAccounts.length}</span>
            <p>Гуртів</p>
          </div>
          <div>
            <span>{approvedCount}</span>
            <p>Підтверджено</p>
          </div>
        </div>
      </div>

      <div className="admin-band-list">
        {bandAccounts.map((band) => (
          <label key={band.id} className="admin-band-item">
            <div className="admin-band-info">
              <img src={band.logo} alt={band.name} className="admin-band-logo" />
              <div>
                <h3>{band.name}</h3>
                <p>{band.genres}</p>
                <span>{band.email}</span>
              </div>
            </div>
            <div className="admin-band-control">
              <input
                type="checkbox"
                checked={band.approved}
                onChange={() => onToggleApproval(band.id)}
              />
              <span>{band.approved ? 'Підтверджено' : 'Не підтверджено'}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
