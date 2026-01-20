import "../styles/timeline.css";

const ACTION_CONFIG = {
  CREATED: {
    label: "Criado",
    icon: "➕",
    color: "var(--pm-blue)",
  },
  CANCELLED: {
    label: "Cancelado",
    icon: "✖",
    color: "var(--pm-red)",
  },
  COMPLETED: {
    label: "Concluído",
    icon: "✔",
    color: "var(--pm-green)",
  },
};

export default function TimelineEvent({ action, description, date }) {
  const config = ACTION_CONFIG[action] || {
    label: action,
    icon: "ℹ",
    color: "var(--pm-gray)",
  };

  return (
    <li className="pm-timeline-item">
      {/* Linha vertical */}
      <span className="pm-timeline-line" />

      {/* Ícone */}
      <span
        className="pm-timeline-icon"
        style={{ backgroundColor: config.color }}
      >
        {config.icon}
      </span>

      {/* Conteúdo */}
      <div className="pm-timeline-card">
        <div className="pm-timeline-action">{config.label}</div>

        {description && (
          <div className="pm-timeline-context">
            {description}
          </div>
        )}

        <div className="pm-timeline-date">{date}</div>
      </div>
    </li>
  );
}
