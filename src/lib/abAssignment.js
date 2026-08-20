// Alternates which condition "Search A" / "Search B" launches on each landing
// page visit, so repeated preference questions ("did you prefer A or B?")
// aren't confounded with which condition is always labeled A.
// The mapping returned here is what ties a participant's "A" or "B" answer
// back to the actual legacy/condensed condition for analysis.

const STORAGE_KEY = 'rec-search-ab-counter'

function readCounter() {
  try {
    return Number(localStorage.getItem(STORAGE_KEY) ?? '0') || 0
  } catch {
    return 0
  }
}

// Pure read — safe to call from a useState initializer (React may invoke
// it more than once per mount in StrictMode dev builds).
export function getAbAssignment() {
  const count = readCounter()
  return count % 2 === 0
    ? { A: 'legacy', B: 'condensed' }
    : { A: 'condensed', B: 'legacy' }
}

// Call exactly once, on the actual "launch" click, so the next landing
// page visit flips the mapping. Kept separate from getAbAssignment so the
// counter only moves on a real user gesture, not on renders/re-mounts.
export function advanceAbCounter() {
  try {
    localStorage.setItem(STORAGE_KEY, String(readCounter() + 1))
  } catch {
    // localStorage unavailable — assignment still works, just won't alternate
  }
}
