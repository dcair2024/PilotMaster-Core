import "../styles/timeline.css";

export default function TimelineEvent({ action, description, date }) {
  return (
    <li className="timeline-item">
      <div className="timeline-marker" />

      <div className="timeline-card">
        <div className="timeline-action">{action}</div>

        {description && (
          <div className="timeline-description">{description}</div>
        )}

        <div className="timeline-date">{date}</div>
      </div>
    </li>
  );
}
