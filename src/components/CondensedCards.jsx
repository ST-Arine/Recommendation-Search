function CondensedCards({ recommendations, onSelect, selectedId }) {
  if (recommendations.length === 0) {
    return <p className="empty-state">No recommendations match your search.</p>
  }

  return (
    <div className="condensed-grid">
      {recommendations.map((rec) => (
        <button
          key={rec.id}
          type="button"
          className={`condensed-card ${rec.id === selectedId ? 'selected' : ''}`}
          onClick={() => onSelect(rec.id)}
        >
          <h3>{rec.condensed_title}</h3>
          <p>{rec.condensed_snippet}</p>
        </button>
      ))}
    </div>
  )
}

export default CondensedCards
