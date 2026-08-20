import { useMemo, useState } from 'react'
import LegacyTable from './LegacyTable'
import CondensedCards from './CondensedCards'

function matchesQuery(rec, query) {
  if (!query) return true
  const haystack = [
    rec.drp,
    rec.pat_asmt,
    rec.pat_rec,
    rec.md_asmt,
    rec.md_rec,
    rec.condensed_title,
    rec.condensed_snippet,
  ]
    .join(' ')
    .toLowerCase()
  return haystack.includes(query.toLowerCase())
}

const MAX_LEGACY_RESULTS = 20

// Legacy: search-only, no filter, and nothing renders until a search is submitted.
// Styled to match the production "Add New Recommendation to Patient" modal.
function LegacySearch({ recommendations, selectedId, onSelect, onFinish }) {
  const [query, setQuery] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState(null)

  const matches = useMemo(() => {
    if (submittedQuery === null) return []
    return recommendations.filter((rec) => matchesQuery(rec, submittedQuery))
  }, [recommendations, submittedQuery])

  const tooManyResults = matches.length > MAX_LEGACY_RESULTS
  const filtered = tooManyResults ? matches.slice(0, MAX_LEGACY_RESULTS) : matches

  function handleSubmit(e) {
    e.preventDefault()
    setSubmittedQuery(query)
  }

  function handleCancel() {
    setQuery('')
    setSubmittedQuery(null)
    onSelect(null)
  }

  return (
    <div className="legacy-modal">
      <div className="legacy-modal-header">
        <h2>Add New Recommendation to Patient</h2>
        <button
          type="button"
          className="legacy-modal-close"
          aria-label="Close"
          onClick={handleCancel}
        >
          &times;
        </button>
      </div>

      <form className="legacy-search-row" onSubmit={handleSubmit}>
        <label className="legacy-search-label" htmlFor="legacy-search-input">
          Phrase to search
        </label>
        <div className="legacy-search-input-wrap">
          <div className="legacy-search-field">
            <input
              id="legacy-search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {tooManyResults && (
              <span className="legacy-search-warning">
                Too many returned results. Search terms are too broad. Showing{' '}
                {MAX_LEGACY_RESULTS} results.
              </span>
            )}
          </div>
          <button type="submit" className="legacy-search-icon" aria-label="Search">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
              <line
                x1="20"
                y1="20"
                x2="15.2"
                y2="15.2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </form>

      <div className="legacy-table-wrap">
        <LegacyTable
          recommendations={filtered}
          onSelect={onSelect}
          selectedId={selectedId}
          emptyMessage={submittedQuery !== null ? 'No recommendations match your search.' : undefined}
        />
      </div>

      <div className="legacy-modal-footer">
        <button
          type="button"
          className="legacy-btn-primary"
          disabled={!selectedId}
          onClick={onFinish}
        >
          Add Recommendation
        </button>
        <button type="button" className="legacy-btn-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  )
}

function CaretIcon() {
  return (
    <svg className="modern-caret" viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
      <path d="M3 5.5 L8 10.5 L13 5.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

// Modernized: full dataset loads up front, search and category filter both apply live.
// Styled to match the "Select a Recommendation" modal design.
function ModernSearch({ recommendations, categories, selectedId, onSelect, onFinish }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')

  const filtered = useMemo(
    () =>
      recommendations.filter(
        (rec) =>
          matchesQuery(rec, query) && (category === '' || rec.category === category),
      ),
    [recommendations, query, category],
  )

  function handleCancel() {
    setQuery('')
    setCategory('')
    onSelect(null)
  }

  return (
    <div className="modern-modal">
      <div className="modern-modal-header">
        <h2>Select a Recommendation</h2>
        <button
          type="button"
          className="modern-modal-close"
          aria-label="Close"
          onClick={handleCancel}
        >
          &times;
        </button>
      </div>

      <div className="modern-search-row">
        <div className="modern-search-field">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="button" className="modern-search-btn" aria-label="Search">
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
              <line
                x1="20"
                y1="20"
                x2="15.2"
                y2="15.2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="modern-filter-row">
        <div className="modern-dropdown">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <CaretIcon />
        </div>
        <button type="button" className="modern-dropdown modern-dropdown-placeholder" disabled>
          Dropdown <CaretIcon />
        </button>
        <button type="button" className="modern-dropdown modern-dropdown-placeholder" disabled>
          Dropdown <CaretIcon />
        </button>
        <button type="button" className="modern-dropdown modern-dropdown-placeholder" disabled>
          Dropdown <CaretIcon />
        </button>
      </div>

      <div className="modern-results">
        <CondensedCards recommendations={filtered} onSelect={onSelect} selectedId={selectedId} />
      </div>

      <div className="modern-modal-footer">
        <button type="button" className="modern-btn-secondary" onClick={handleCancel}>
          Cancel
        </button>
        <button
          type="button"
          className="modern-btn-primary"
          disabled={!selectedId}
          onClick={onFinish}
        >
          Add Recommendation
        </button>
      </div>
    </div>
  )
}

function SearchModal({ recommendations, categories, condition, selectedId, onSelect, onFinish }) {
  return condition === 'legacy' ? (
    <LegacySearch
      recommendations={recommendations}
      selectedId={selectedId}
      onSelect={onSelect}
      onFinish={onFinish}
    />
  ) : (
    <ModernSearch
      recommendations={recommendations}
      categories={categories}
      selectedId={selectedId}
      onSelect={onSelect}
      onFinish={onFinish}
    />
  )
}

export default SearchModal
