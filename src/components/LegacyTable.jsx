function LegacyTable({ recommendations, onSelect, selectedId, emptyMessage }) {
  return (
    <table className="legacy-table">
      <thead>
        <tr>
          <th className="legacy-radio-col" />
          <th>DRP</th>
          <th>Pat Asmt</th>
          <th>Pat Rec</th>
          <th>MD Asmt</th>
          <th>MD Rec</th>
        </tr>
      </thead>
      <tbody>
        {recommendations.map((rec) => (
          <tr
            key={rec.id}
            className={rec.id === selectedId ? 'selected' : ''}
            onClick={() => onSelect(rec.id)}
          >
            <td className="legacy-radio-col">
              <input
                type="radio"
                className="legacy-radio"
                name="legacy-recommendation"
                checked={rec.id === selectedId}
                onChange={() => onSelect(rec.id)}
                aria-label={`Select ${rec.drp}`}
              />
            </td>
            <td>{rec.drp}</td>
            <td>{rec.pat_asmt}</td>
            <td>{rec.pat_rec}</td>
            <td>{rec.md_asmt}</td>
            <td>{rec.md_rec}</td>
          </tr>
        ))}
        {recommendations.length === 0 && emptyMessage && (
          <tr className="empty-row">
            <td colSpan={6}>{emptyMessage}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default LegacyTable
