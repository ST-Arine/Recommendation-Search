import { useState } from 'react'

function SessionSummary({ selectedRecommendation, arm, condition, onSubmit }) {
  const [confidence, setConfidence] = useState(3)
  const [notes, setNotes] = useState('')

  return (
    <div className="session-summary">
      <h3>Task complete</h3>
      <p>
        You selected: <strong>{selectedRecommendation?.condensed_title ?? '—'}</strong>
      </p>

      <p className="moderator-note">
        Moderator reference — this session's Search {arm} = <strong>{condition}</strong>. Record
        any "A vs B" preference against this mapping.
      </p>

      <label className="confidence-label">
        How confident are you in this selection?
        <div className="confidence-scale">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              className={n === confidence ? 'active' : ''}
              onClick={() => setConfidence(n)}
            >
              {n}
            </button>
          ))}
        </div>
      </label>

      <label className="notes-label">
        Moderator notes
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Optional observations..."
        />
      </label>

      <button
        type="button"
        className="submit-summary"
        onClick={() => onSubmit({ confidence, notes })}
      >
        Submit
      </button>
    </div>
  )
}

export default SessionSummary
