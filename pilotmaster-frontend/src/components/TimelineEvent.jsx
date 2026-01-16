export default function TimelineEvent({ action, description, date }) {
  return (
    <li className="pm-timeline-item">
      <div className="pm-timeline-line" />
      <div className="pm-timeline-card card">
        <div className="pm-action">{action}</div>
        <div className="pm-context">{description}</div>
        <div className="pm-date">{date}</div>
      </div>
    </li>
  );
}
