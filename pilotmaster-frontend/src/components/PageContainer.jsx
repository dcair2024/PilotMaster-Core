export default function PageContainer({ title, children }) {
  return (
    <div className="pm-page">
      {title && <h1 className="pm-title">{title}</h1>}
      <div className="pm-content">
        {children}
      </div>
    </div>
  );
}
