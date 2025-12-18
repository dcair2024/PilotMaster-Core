export default function ShipCard({ ship, onEdit }) {
  return (
    <div className="ship-card">

      {/* HEADER */}
      <div className="ship-card-header">
        <h3 className="ship-name">{ship.name}</h3>

        <span
          className={`ship-status ${
            ship.status === "Active" ? "status-active" : "status-inactive"
          }`}
        >
          {ship.status}
        </span>
      </div>

      {/* BODY */}
      <div className="ship-card-body">
        <div className="ship-info">
          <span>GRT</span>
          <strong>{ship.grt}</strong>
        </div>

        <div className="ship-info">
          <span>Draft</span>
          <strong>{ship.draft}</strong>
        </div>

        <div className="ship-info">
          <span>Age</span>
          <strong>{ship.age}</strong>
        </div>

        <div className="ship-info">
          <span>Requires Tug</span>
          <strong>{ship.requiresTug ? "Yes" : "No"}</strong>
        </div>

        <div className="ship-info">
          <span>Deficiency</span>
          <strong
            className={ship.deficiency > 0 ? "text-warning" : ""}
          >
            {ship.deficiency}
          </strong>
        </div>
      </div>

      {/* FOOTER */}
      <div className="ship-card-footer">
        <button className="btn-secondary">
          View
        </button>

        <button
          className="btn-primary"
          onClick={() => onEdit(ship.id)}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
