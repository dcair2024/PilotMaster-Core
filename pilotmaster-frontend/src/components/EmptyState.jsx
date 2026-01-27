export default function EmptyState({ title, subtitle }) {
  return (
    <div className="pm-empty">
      <h3 className="pm-empty-title">{title}</h3>
      {subtitle && <p className="pm-empty-subtitle">{subtitle}</p>}
    </div>
  );
}
